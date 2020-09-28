import React from "react";
import { useSpring, animated, interpolate } from "react-spring";
import styled from "styled-components";
import { useDrag } from "react-use-gesture";

// https://codesandbox.io/embed/zrj66y8714

const Slider = () => {
  const [props, set] = useSpring(() => ({
    x: 0,
    background: "red",
    size: 1,
    justifySelf: "end",
    config: { mass: 5, tension: 500, friction: 80 }
  }));

  const bind = useDrag(
    ({
      down, // = wether its on his orginal position or not (boolean)
      movement: [x, y], // = the current position of the box ([x, y])
    }) => {
      // useSpring with new values..
      set({
        x: down ? x : 0,
        background: x < 0 ? "red" : "blue",
        size: down ? 1.2 : 1,
        justifySelf: x < 0 ? "end" : "start",
        immediate: down,
      });
    }
  );

  const pointSize = props.x.interpolate({
    // @ts-ignore
    map: Math.abs,
    range: [50, 300],
    output: ["scale(0.5)", "scale(1)"],
    extrapolate: "clamp",
  });

  console.log(props.background);

  return (
    <Container>
      <Item {...bind()} style={{ background: props.background }}>
        <Point
          style={{
            transform: pointSize,
            justifySelf: props.justifySelf,
          }}
        />
        <Top
          style={{
            transform: interpolate(
              [props.x, props.size],
              (x, size) => `translate3d(${x}px,0,0) scale(${size})`
            ),
          }}
        >
          Hallo
        </Top>
      </Item>
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
  background: #f0f0f0;
`;

const Item = styled(animated.div)`
  position: relative;
  width: 300px;
  height: 100px;
  padding-left: 32px;
  padding-right: 32px;
  box-sizing: border-box;
  display: grid;
  align-items: center;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.2);
`;

const Top = styled(animated.div)`
  background-color: #272727;
  color: rgba(255, 255, 255, 0.8);
  position: absolute;
  height: 100%;
  width: 100%;
  display: grid;
  align-items: center;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.2);
  font-size: 3em;
  user-select: none; // Disable TextSelection

  // Css Animation
  &:active {
    box-shadow: 0px 15px 30px -5px rgba(200, 9, 9, 0.4);
  }
`;

const Point = styled(animated.div)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ffffff;
`;

export default Slider;
