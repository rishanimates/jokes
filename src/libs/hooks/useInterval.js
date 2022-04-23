import { useEffect, useRef } from "react";
/* Dan Abramov useInterval hook - https://overreacted.io/making-setinterval-declarative-with-react-hooks/ */

const useInterval = function(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
  
      if (delay !== null) {
        let id = setInterval(tick, delay);
  
        //cleaning function set for the future (autoexecuted when "delay" change)
        return () => {
          clearInterval(id);
        };
      }
    }, [delay]);
  }
  
  export default useInterval;