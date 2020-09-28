import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

// https://codesandbox.io/embed/01yl7knw70

const RotateImage = () => {
  const [flipped, setFlipped] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`, // Perspective: https://3dtransforms.desandro.com/perspective
    config: { mass: 5, tension: 500, friction: 80 }, // Physic Config of the interpolation
  });

  return (
    <Container>
      <div onClick={() => setFlipped(!flipped)}>
        <AnimatedImage
          url={
            "https://images.unsplash.com/photo-1544511916-0148ccdeb877?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1901&q=80i&auto=format&fit=crop"
          }
          style={{
            // '.interpolate' updates the 'default' interpolation
            opacity: opacity.interpolate((o) => 1 - (o as any)), // Revert opacity
            transform,
          }}
        />

        <AnimatedImage
          url={
            "https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&w=1181&q=80&auto=format&fit=crop"
          }
          style={{
            opacity,
            transform
          }}
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnimatedImage = styled(animated.div)<{ url: string }>`
  position: absolute;
  max-width: 500px;
  max-height: 500px;
  width: 50ch;
  height: 50ch;

  background-size: cover;
  background-image: url(${(props) => props.url});
`;

export default RotateImage;
