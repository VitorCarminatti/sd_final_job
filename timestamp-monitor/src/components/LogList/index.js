import React from "react";
import { StyledList } from "./styles";
import { List } from "antd";

function LogList({ data }) {
  return (
    <StyledList
      header={<div>Log de eventos</div>}
      bordered
      dataSource={data}
      renderItem={item => (
        <List.Item>
          {`${item.client} atualizou sua timestamp para ${item.timestamp} e a do servidor para ${item.server_ts}`}
        </List.Item>
      )}
    />
  );
}

export default LogList;
