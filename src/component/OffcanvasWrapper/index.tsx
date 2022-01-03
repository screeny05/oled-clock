import React, { useState } from "react";
import './index.css';

export default function OffcanvasWrapper({
  children,
  dragX,
  isDragging,
  menu
}: any) {
  return (
    <div
      className={`offcanvas ${dragX > 0.1 ? "offcanvas--active" : ""} ${
        isDragging ? "offcanvas--dragging" : "offcanvas--still"
      }`}
    >
      <div className="offcanvas__menu">{menu}</div>
      <div
        className="offcanvas__main"
        style={{ transform: `translateX(${dragX * 50}%)` }}
      >
        <div
          className="offcanvas__clock-wrapper"
          style={{ transform: `scale(${1 - dragX * 0.5})` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
