import React, { useState } from "react";
import "./carousel.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useSwipeable } from "react-swipeable";

function Carousel({ items, itemsToShow = 1 }) {
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
        className="carousel-wrapper"
        style={{
          transform: `translateX(-${(100 / itemsToShow) * activeIndex}%)`,
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="carousel-slide">
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
