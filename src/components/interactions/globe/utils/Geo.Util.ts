import * as THREE from 'three';
import { GLOBE_CONFIG } from '../config/Globe.Config';

type GeoCoord = [number, number];
type GeoRing = GeoCoord[];

interface GeoGeometry {
  type: string;
  coordinates: unknown;
}

interface GeoFeatureCollection {
  features?: {
    geometry: GeoGeometry | null;
    properties?: { ADM0_A3?: string } | null;
  }[];
}

export interface GeoCountry {
  /** ISO 3166-1 alpha-3 style code, e.g. `VNM`. */
  code: string;
  rings: GeoRing[];
}

export function latLonToVector3(
  lat: number,
  lon: number,
  radius: number = GLOBE_CONFIG.radius,
  target = new THREE.Vector3()
): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);

  return target.set(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/** Rotation that places a coordinate at the given direction (in the globe's parent space). */
export function getViewQuaternion(
  lat: number,
  lon: number,
  direction: THREE.Vector3
): THREE.Quaternion {
  const surfaceNormal = latLonToVector3(lat, lon, 1);
  return new THREE.Quaternion().setFromUnitVectors(
    surfaceNormal,
    direction.clone().normalize()
  );
}

const X_AXIS = new THREE.Vector3(1, 0, 0);
const Y_AXIS = new THREE.Vector3(0, 1, 0);
const Z_AXIS = new THREE.Vector3(0, 0, 1);
const tiltQuat = new THREE.Quaternion();
const spinQuat = new THREE.Quaternion();

/**
 * Rotation that turns a coordinate toward the camera (+Z) with north up, then rolls it around
 * the view axis. Unlike `getViewQuaternion`, interpolating lat/lon gives a path across the
 * surface instead of the shortest arc.
 */
export function getFacingQuaternion(
  lat: number,
  lon: number,
  roll = 0,
  target = new THREE.Quaternion()
): THREE.Quaternion {
  const { degToRad } = THREE.MathUtils;
  tiltQuat.setFromAxisAngle(X_AXIS, degToRad(lat));
  spinQuat.setFromAxisAngle(Y_AXIS, -degToRad(lon + 90));
  return target
    .setFromAxisAngle(Z_AXIS, roll)
    .multiply(tiltQuat)
    .multiply(spinQuat);
}

/** Camera distance at which the whole globe fits the viewport, never closer than `minDistance`. */
export function getOverviewDistance(
  fov: number,
  aspect: number,
  minDistance: number,
  fitMargin: number,
  radius: number = GLOBE_CONFIG.radius
): number {
  const halfFov = THREE.MathUtils.degToRad(fov / 2);
  const halfHorizontalFov = Math.atan(Math.tan(halfFov) * aspect);
  const fitDistance = (radius * fitMargin) / Math.sin(halfHorizontalFov);
  return Math.max(minDistance, fitDistance);
}

/** Flattens [a, b, c, ...] point lists into line-segment pairs: [a, b, b, c, ...]. */
function pushRingSegments(target: number[], ring: GeoRing, radius: number) {
  if (ring.length < 2) return;

  const point = new THREE.Vector3();
  let prev: [number, number, number] | null = null;

  for (const [lon, lat] of ring) {
    latLonToVector3(lat, lon, radius, point);
    const current: [number, number, number] = [point.x, point.y, point.z];
    if (prev) target.push(...prev, ...current);
    prev = current;
  }
}

function extractGeoRings(geometry: GeoGeometry): GeoRing[] {
  switch (geometry.type) {
    case 'Polygon':
    case 'MultiLineString':
      return geometry.coordinates as GeoRing[];
    case 'MultiPolygon':
      return (geometry.coordinates as GeoRing[][]).flat();
    case 'LineString':
      return [geometry.coordinates as GeoRing];
    default:
      return [];
  }
}

export function buildGraticulePositions(
  radius: number,
  step: number
): Float32Array {
  const positions: number[] = [];

  // Parallels
  for (let lat = -90 + step; lat < 90; lat += step) {
    const ring: GeoRing = [];
    for (let lon = -180; lon <= 180; lon += step) ring.push([lon, lat]);
    pushRingSegments(positions, ring, radius);
  }

  // Meridians
  for (let lon = -180; lon < 180; lon += step) {
    const ring: GeoRing = [];
    for (let lat = -90; lat <= 90; lat += step) ring.push([lon, lat]);
    pushRingSegments(positions, ring, radius);
  }

  return new Float32Array(positions);
}

let countriesPromise: Promise<GeoCountry[]> | null = null;

/** Fetches country outlines once per session; later calls reuse the same request. */
export function loadCountries(): Promise<GeoCountry[]> {
  countriesPromise ??= fetch(GLOBE_CONFIG.countriesUrl)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load countries: ${res.status}`);
      return res.json() as Promise<GeoFeatureCollection>;
    })
    .then((collection) =>
      (collection.features ?? []).flatMap((feature) =>
        feature.geometry
          ? [
              {
                code: feature.properties?.ADM0_A3 ?? '',
                rings: extractGeoRings(feature.geometry),
              },
            ]
          : []
      )
    )
    .catch(() => {
      // Allow a retry on the next mount instead of caching the failure.
      countriesPromise = null;
      return [];
    });

  return countriesPromise;
}

export function buildRingPositions(
  rings: GeoRing[],
  radius: number
): Float32Array {
  const positions: number[] = [];
  for (const ring of rings) pushRingSegments(positions, ring, radius);
  return new Float32Array(positions);
}
