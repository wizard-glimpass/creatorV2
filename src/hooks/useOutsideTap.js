import { useEffect } from "react";

function useOutsideTap(ref, action) {
  useEffect(() => {
    function handleTapOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        action();
      }
    }

    // Bind the event listener for touch events
    document.addEventListener("touchstart", handleTapOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("touchstart", handleTapOutside);
    };
  }, [ref, action]);
}

export default useOutsideTap;
