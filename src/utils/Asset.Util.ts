/**
 * Assets the page loader waits for beyond the DOM's own images and fonts, such as a lazily loaded
 * WebGL scene. A component registers a pending task and resolves it once its asset is ready.
 */
type AssetTaskListener = (task: Promise<void>) => void;

const tasks: Promise<void>[] = [];
const listeners = new Set<AssetTaskListener>();

/** Registers a pending asset; call the returned function once it is ready. */
export const createAssetTask = () => {
  let resolve!: () => void;
  const task = new Promise<void>((done) => (resolve = done));

  tasks.push(task);
  listeners.forEach((listener) => listener(task));
  return resolve;
};

/** Hands over every task registered so far, then each new one until unsubscribed. */
export const subscribeToAssetTasks = (listener: AssetTaskListener) => {
  tasks.forEach(listener);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
