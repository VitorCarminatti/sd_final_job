import React from "react";
import { StyledList } from "./styles";
import { List, Icon } from "antd";

function LogList({ data, rollbackState, indexSelectedState }) {
  const deadOrAliveStyle = item => {
    if (item.started) {
      item.reborn = true;
      return { background: "#88e07e" };
    } else if (!item.alive) {
      return { background: "#fa6e7c" };
    } else {
      return {};
    }
  };

  const composeLogText = item => {
    if (!item.alive) {
      return `${item.client} morreu e atualizou a timestamp do servidor para ${item.server_ts}`;
    } else if (item.started) {
      return `${item.client} iniciou e atualizou a timestamp do servidor para ${item.server_ts}`;
    } else {
      return `${item.client} atualizou sua timestamp para ${item.timestamp} e a do servidor para ${item.server_ts}`;
    }
  };

  return (
    <StyledList
      header={<div>Log dos eventos</div>}
      bordered
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item
          style={deadOrAliveStyle(item, data)}
          actions={[
            <a onClick={() => rollbackState(data, index)}>
              {indexSelectedState !== index && <Icon type="clock-circle" />}
            </a>
          ]}
        >
          {composeLogText(item)}
        </List.Item>
      )}
    />
  );
}

export default LogList;
