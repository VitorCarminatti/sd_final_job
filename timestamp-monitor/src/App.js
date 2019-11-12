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

    data.map(item => {
      switch (item.client) {
        case "client1": {
          setClient1Ts(item.timestamp);
          break;
        }
        case "client2": {
          setClient2Ts(item.timestamp);
          break;
        }
        case "client3": {
          setClient3Ts(item.timestamp);
          break;
        }
        default: {
          break;
        }
      }
      setServerTs(item.server_ts);
    });
  };

  const rollbackState = (data, index) => {
    const newData = data.slice(0, index + 1);

    populateMonitors(newData);
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
        <Monitor title={"Client 1"} value={client1Ts} />
        <Monitor title={"Client 2"} value={client2Ts} />
        <Monitor title={"Client 3"} value={client3Ts} />
      </ClientMonitorWrapper>

      <ListWrapper>
        <LogList data={data} rollbackState={rollbackState} />
      </ListWrapper>
    </div>
  );
}

export default App;
