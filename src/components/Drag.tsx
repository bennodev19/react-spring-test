import React from "react";
import { useSpring, animated, interpolate } from "react-spring";
import styled from "styled-components";
import { useDrag } from "react-use-gesture";

// https://codesandbox.io/s/react-use-gesture-simple-i5e0j

const Drag = () => {
  const [props, set] = useSpring(() => ({
    x: 0,
    y: 0,
    size: 1,
    background: "#ff6681",
    config: { mass: 5, tension: 500, friction: 50 },
  }));

  // https://use-gesture.netlify.app/
  const bind = useDrag(
    ({
      down, // = wether its on his orginal position or not (boolean)
      movement: [x, y], // = the current position of the box ([x, y])
    }) => {
      // useSpring with new values..
      set({
        x: down ? x : 0,
        y: down ? y : 0,
        size: down ? 1.2 : 1,
        background: x < 0 ? "#ff6681" : "#ffe966",
        immediate: down,
      });
    }
  );

  return (
    <Container>
      <AnimatedBox
        {...bind()}
        style={{
          transform: interpolate(
            [props.x, props.y, props.size],
            (x, y, size) => `translate3d(${x}px,${y}px,0) scale(${size})`
          ),
          background: props.background,
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnimatedBox = styled(animated.div)`
position: relative;
  width: 80px;
  height: 80px;
  border-radius: 16px;
`;

export default Drag;
