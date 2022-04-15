import styled, { keyframes } from "styled-components";
import styles from "./Diode.module.css";
import React from "react";

const Diode = React.memo(({ ratio, period }) => {
  const colorCode = period < 50 ? ~~(255 - 255 * ratio) : 255;
  let duration = period < 50 ? 0 : period;
  duration = duration > 10000 ? duration / 1000 + "s" : duration + "ms";
  const shadow =
    period < 50 && ratio !== 0
      ? `inset #660000 0 -2px 9px, rgba(255, 0, 0, ${ratio}) 0 2px 12px`
      : "inset #444444 0 -2px 9px";
  const blinkerAnimation = keyframes`
  ${~~(100 - 100 * ratio)}%{
    background-color: rgb(255, 80, 80);
    box-shadow: rgba(0, 0, 0, 0.2) 0 -2px 7px 2px, inset #660000 0 -2px 9px, rgba(255, 0, 0, 1) 0 2px 12px;
  }
  `;
  const Blink = styled.div`
    width: 26px;
    height: 26px;
    background-color: rgb(255, ${colorCode}, ${colorCode});
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.2) 0 -2px 7px 2px, ${shadow};
    animation: ${blinkerAnimation} ${duration} steps(1, end) infinite;
  `;
  return (
    <div className={styles.diode}>
      <Blink />
    </div>
  );
});

export default Diode;
