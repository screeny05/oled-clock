import React, { useState, memo } from "react";
import useInterval from "@use-it/interval";
import './index.css';

export default memo(function ClockDigital({ fontSize, opacity, variant }: { fontSize: number, opacity: number, variant: string }) {
  const [time, setTime] = useState(new Date());
  useInterval(() => setTime(new Date()), 10000);

  return (
    <div className={`clock-basic clock-basic--${variant}`} style={{ fontSize: `${fontSize}px`, opacity }}>
      {new Intl.DateTimeFormat([], {
        hour: "2-digit",
        minute: "2-digit"
      }).format(time)}
      <br />
      <div className="clock-basic__date">
        {new Intl.DateTimeFormat([], {
          month: "long",
          day: "numeric",
          weekday: "short"
        }).format(time)}
      </div>
    </div>
  );
})
