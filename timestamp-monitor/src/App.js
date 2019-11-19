import React, { useState, useEffect } from "react";
import Monitor from "./components/Monitor";
import LogList from "./components/LogList";
import {
  StyledTitle,
  SeverMonitorWrapper,
  ClientMonitorWrapper,
  ListWrapper
} from "./styles";
import data from "./data_report.json";

function App() {
  const [serverTs, setServerTs] = useState(0);
  const [client1Ts, setClient1Ts] = useState(0);
  const [client2Ts, setClient2Ts] = useState(0);
  const [client3Ts, setClient3Ts] = useState(0);
  const [indexSelectedState, setIndexSelectedState] = useState(0);
  const [client1Alive, setClient1Alive] = useState(true);
  const [client2Alive, setClient2Alive] = useState(true);
  const [client3Alive, setClient3Alive] = useState(true);

  const verifyNullMonitors = (client1, client2, client3) => {
    !client1 ? setClient1Ts(0) : console.log("Tem Valor");
    !client2 ? setClient2Ts(0) : console.log("Tem Valor");
    !client3 ? setClient3Ts(0) : console.log("Tem Valor");
  };

  const populateMonitors = data => {
    const client1Null = data.find(item => item.client === "client1");
    const client2Null = data.find(item => item.client === "client2");
    const client3Null = data.find(item => item.client === "client3");

    verifyNullMonitors(client1Null, client2Null, client3Null);

    data.map((item, index) => {
      switch (item.client) {
        case "client1": {
          setClient1Ts(item.timestamp);
          setClient1Alive(item.alive);
          break;
        }
        case "client2": {
          setClient2Ts(item.timestamp);
          setClient2Alive(item.alive);
          break;
        }
        case "client3": {
          setClient3Ts(item.timestamp);
          setClient3Alive(item.alive);
          break;
        }
        default: {
          break;
        }
      }
      setServerTs(item.server_ts);
      setIndexSelectedState(index);
    });
  };

  const rollbackState = (data, index) => {
    const newData = data.slice(0, index + 1);

    populateMonitors(newData);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    populateMonitors(data);
  }, []);

  return (
    <div>
      <StyledTitle>Timestamp Monitor</StyledTitle>

      <SeverMonitorWrapper>
        <Monitor title={"Server"} value={serverTs} />
      </SeverMonitorWrapper>

      <ClientMonitorWrapper>
        {client1Alive && <Monitor title={"Client 1"} value={client1Ts} />}
        {client2Alive && <Monitor title={"Client 2"} value={client2Ts} />}
        {client3Alive && <Monitor title={"Client 3"} value={client3Ts} />}
      </ClientMonitorWrapper>

      <ListWrapper>
        <LogList
          data={data}
          rollbackState={rollbackState}
          indexSelectedState={indexSelectedState}
        />
      </ListWrapper>
    </div>
  );
}

export default App;
