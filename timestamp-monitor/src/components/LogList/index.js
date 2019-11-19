import React from "react";
import { StyledList } from "./styles";
import { List, Icon } from "antd";

function LogList({ data, rollbackState, indexSelectedState }) {
  return (
    <StyledList
      header={<div>Events log</div>}
      bordered
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item
          style={!item.alive ? { background: "#fa6e7c" } : {}}
          actions={[
            <a onClick={() => rollbackState(data, index)}>
              {indexSelectedState !== index && <Icon type="clock-circle" />}
            </a>
          ]}
        >
          {item.alive
            ? `${item.client} atualizou sua timestamp para ${item.timestamp} e a do servidor para ${item.server_ts}`
            : `${item.client} morreu e atualizou a timestamp do servidor para ${item.server_ts}`}
        </List.Item>
      )}
    />
  );
}

export default LogList;
