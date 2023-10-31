import React, { useState } from "react";
import "./carousel.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faHome } from "@fortawesome/free-solid-svg-icons";
import { useSwipeable } from "react-swipeable";

function Carousel({
  items,
  itemsToShow = 1,
  direction,
  showCrossIcon,
  onClickCross,
  onClickItem,
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setActiveIndex(Math.min(activeIndex + 1, items.length - itemsToShow)),
    onSwipedRight: () => setActiveIndex(Math.max(activeIndex - 1, 0)),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="carousel-container" {...handlers}>
      <div
        className={`carousel-wrapper ${direction}`}
        style={{
          transform: `translateX(-${200 * activeIndex}px)`,
        }}
      >
        {items.map((item, index) => (
          <div
            onClick={() => {
              if (onClickItem) onClickItem(index);
            }}
            key={index}
            className="carousel-slide"
          >
            {showCrossIcon && index !== 0 && (
              <button className="action-icon">
                <FontAwesomeIcon
                  onClick={() => {
                    onClickCross(index);
                  }}
                  icon={faClose}
                  className="icon icon-close"
                />
              </button>
            )}
            <div className="content-wrapper">
              <FontAwesomeIcon icon={faHome} size="3x" className="icon" />
              <p>{item}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
