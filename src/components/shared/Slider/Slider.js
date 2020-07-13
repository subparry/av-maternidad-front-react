import React, { useState } from "react";
import "./slider.scss";

const Slider = ({ items, itemWidthInPx }) => {
  const [startingIdx, setStartingIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const viewportWidth = window.innerWidth;
  const itemsQty = Math.floor(viewportWidth / (parseInt(itemWidthInPx) + 10));
  const totalItemsFitInViewport = () => items.length <= itemsQty;
  const nextDisabled = () =>
    startingIdx === items.length - itemsQty ||
    isTransitioning ||
    totalItemsFitInViewport();
  const prevDisabled = () =>
    startingIdx === 0 || isTransitioning || totalItemsFitInViewport();
  const shiftDisabled = (delta) =>
    delta < 0 ? prevDisabled() : nextDisabled();
  const transitionClassName = () => {
    if (!isTransitioning) return "";
    if (isTransitioning < 0) {
      return "transition-left";
    } else {
      return "transition-right";
    }
  };

  const handleShift = (delta) => () => {
    if (shiftDisabled(delta)) return;
    setIsTransitioning(delta);
  };

  const handleAnimationEnd = () => {
    setStartingIdx((prev) => prev + isTransitioning);
    setIsTransitioning(false);
  };

  return (
    <div className="apa-slider-container" data-testid="apa-slider">
      <button
        className="apa-slider-arrow apa-slider-prev-arrow"
        onClick={handleShift(-1)}
        disabled={prevDisabled()}
      >
        Prev
      </button>
      <div className={`apa-slider-items-wrapper`}>
        <div
          className={`apa-slider-items-container ${transitionClassName()}`}
          style={{
            "--item-width": `${itemWidthInPx}px`,
            "--item-width-negative": `-${itemWidthInPx}px`,
          }}
          onAnimationEnd={handleAnimationEnd}
        >
          {items.slice(startingIdx, startingIdx + itemsQty)}
        </div>
        <div className="apa-slider-items-overlay" />
      </div>
      <button
        className="apa-slider-arrow apa-slider-next-arrow"
        onClick={handleShift(1)}
        disabled={nextDisabled()}
      >
        Next
      </button>
    </div>
  );
};

export default Slider;
