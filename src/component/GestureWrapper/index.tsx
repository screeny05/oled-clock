import React, { useState } from "react";
import { useGesture } from "react-use-gesture";
import './index.css';

const DEFAULT_FONT_SIZE = 110;
const DEFAULT_OPACITY = 1;

export default function GestureWrapper({ render }: { render(props: any): any }) {
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [opacity, setOpacity] = useState(DEFAULT_OPACITY);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const bind = useGesture(
    {
      onPinch: ({ da, first, memo, delta }) => {
        if (!first) {
          setFontSize(fontSize + da[0] - memo);
        }

        return da[0];
      },
      onDrag: ({ delta, dragging, pinching, direction }) => {
        if (pinching) {
          return;
        }
        const newDragXOffset = Math.min(
          Math.max(dragX + (delta[0] / window.innerWidth) * 1.5, 0),
          1
        );
        const [directionX] = direction;
        let newDragX = newDragXOffset;
        if (!dragging) {
          const toggleThreshold = directionX > 0 ? 0.2 : 0.8;
          newDragX = newDragX > toggleThreshold ? 1 : 0;
        }

        setIsDragging(dragging);
        setDragX(newDragX);
        setOpacity(
          Math.max(
            Math.min(opacity - (delta[1] / window.innerHeight) * 1.5, 1),
            0
          )
        );
      },
      onDoubleClick: () =>
        document.fullscreenElement === null
          ? document.documentElement.requestFullscreen()
          : document.exitFullscreen()
    },
    {
      drag: {
        rubberband: true,
        lockDirection: true
      }
    }
  );

  return (
    <div {...bind()} className="gesture-wrapper">
      {render({ fontSize, opacity, dragX, isDragging })}
    </div>
  );
}
