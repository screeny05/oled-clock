import React, { useRef, useState, memo } from "react";
import useComponentSize from "@rehooks/component-size";
import useInterval from "@use-it/interval";
import './index.css';

const MOVE_INTERVAL = 60000;

export default memo(function OledSaver({ children }: any) {
  const ref = useRef(null);
  const size = useComponentSize(ref);
  const [offset, setOffset] = useState([0.5, 0.5]);
  const [isActive, setIsActive] = useState(false);
  const [x, y] = offset;

  useInterval(() => {
    setIsActive(true);
    setOffset([Math.random(), Math.random()]);
  }, MOVE_INTERVAL);

  return (
    <div
      className={`oled-saver ${isActive ? "oled-saver--active" : ""}`}
      style={{
        transform: `translate(${x * 100}%, ${y * 100}%)`,
        width: `calc(100% - ${size.width}px)`,
        height: `calc(100% - ${size.height}px)`
      }}
    >
      <div ref={ref} className="oled-saver__child">
        {children}
      </div>
    </div>
  );
})
