import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

function getAnimationSettings(originXA, originXB) {
  return {
    startVelocity: 30,
    spread: 500,
    ticks: 60,
    zIndex: 0,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2,
    },
  };
}

export default function Fireworks() {
  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState(400);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
    }
  }, []);
  const stopAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
    refAnimationInstance.current && refAnimationInstance.current.reset();
  }, [intervalId]);
  useEffect(() => {
    setIntervalId(setInterval(nextTickAnimation, 500));

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  setTimeout(stopAnimation, 5000);
  return (
    <>
      <div>{/* <button onClick={startAnimation}>Start</button> */}</div>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </>
  );
}
