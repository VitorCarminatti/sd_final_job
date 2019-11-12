import React from "react";
import { MonitorWrapper, StyledTitle, StyledCounter } from "./styles";

function Monitor({ title, value }) {
  return (
    <MonitorWrapper>
      <StyledTitle>{title}</StyledTitle>
      <StyledCounter end={value} duration={3} />
    </MonitorWrapper>
  );
}

export default Monitor;
