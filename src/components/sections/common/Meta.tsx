'use client';

import React, { useEffect, useState } from 'react';

/** Ticking local time in Ho Chi Minh City. */
export const LocalTime = () => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const update = () => setTime(formatter.format(new Date()));

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="tabular-nums">{time ?? '--:--:--'} (UTC+7)</span>;
};

/** Status dot with the current availability. */
export const Availability = () => (
  <span className="flex items-start gap-2">
    {/* Pinned to the first line in case the label wraps in a narrow column */}
    <span className="bg-contrast-medium mt-[calc(0.5lh-0.25rem)] size-2 shrink-0 rounded-full" />
    Currently unavailable
  </span>
);
