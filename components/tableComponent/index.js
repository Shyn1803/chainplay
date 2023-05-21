"use client";

import React from "react";
import { Pagination, Table } from "antd";

const TableComponent = (props) => {
  const { columns, data, total, currentPage, showingText } = props;

  const onChangePagination = (page, pageSize) => {
    if (props?.onChangePagination) {
      props.onChangePagination(page, pageSize);
    }
  };
  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
      <div className="flex relative mt-6 justify-center">
        <span className="absolute left-0 top-[5px] text-gray-500">{showingText}</span>
        <Pagination
          current={currentPage}
          total={total}
          showSizeChanger={false}
          onChange={onChangePagination}
        />
      </div>
    </>
  );
};

export default TableComponent;
