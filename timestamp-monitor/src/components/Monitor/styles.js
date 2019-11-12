import styled from "styled-components";
import CountUp from "react-countup";

export const MonitorWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledTitle = styled.h2`
  font-size: 50px;
  font-family: "Russo One", sans-serif;
`;

export const StyledCounter = styled(CountUp)`
  font-size: 40px;
  font-family: "Russo One", sans-serif;
  text-align: center;
`;
