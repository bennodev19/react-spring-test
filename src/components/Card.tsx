import React from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

// https://codesandbox.io/embed/rj998k4vmm

const calculateRotation = (x: number, y: number) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
];

const Card = () => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1], // Can't do this with an object.. because react-spring can't handle objects.
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  return (
    <Container>
      <AnimatedCard
        onMouseMove={({ clientX: x, clientY: y }) =>
          set({
            xys: calculateRotation(x, y),
          })
        }
        onMouseLeave={() =>
          set({
            xys: [0, 0, 1],
          })
        }
        style={{
          transform: props.xys.interpolate(
            // @ts-ignore (Kind of wired normally the object property should be xys.. but somehow they split it up)
            (x, y, s) =>
              `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
          ),
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

const AnimatedCard = styled(animated.div)`
position: relative;
  width: 45ch;
  height: 45ch;
  background: grey;
  border-radius: 5px;
  background-image: url(https://drscdn.500px.org/photo/435236/q%3D80_m%3D1500/v2?webp=true&sig=67031bdff6f582f3e027311e2074be452203ab637c0bd21d89128844becf8e40);
  background-size: cover;
  background-position: center center;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.5s;
  border: 15px solid white;

  &:hover {
    box-shadow: 0px 30px 100px -10px rgba(0, 0, 0, 0.4);
  }
`;

export default Card;
