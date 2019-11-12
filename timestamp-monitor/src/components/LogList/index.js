import React from "react";
import { StyledList } from "./styles";
import { List, Icon } from "antd";

function LogList({ data, rollbackState }) {
  return (
    <StyledList
      header={<div>Events log</div>}
      bordered
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item
          actions={[
            <a onClick={() => rollbackState(data, index)}>
              <Icon type="clock-circle" />
            </a>
          ]}
        >
          {`${item.client} atualizou sua timestamp para ${item.timestamp} e a do servidor para ${item.server_ts}`}
        </List.Item>
      )}
    />
  );
}

export default LogList;
