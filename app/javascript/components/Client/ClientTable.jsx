import React, { useState, useEffect } from "react";
import { Table, Input, Checkbox } from "antd";


const UserTable = ({ data  }) => {

  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    {
      title: "NO",
      dataIndex: "key",
      key: "key",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "ページ名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "読み込み専用",
      dataIndex:"readonly",
      key: "readonly",
      render: (_, record) => (
        <Checkbox
          checked={record.readonly}
          onChange={(e) => handleCheckboxChange(e, record, 'readonly')}        />
      ),
    },
    {
      title: "編集",
      dataIndex: "edit",
      key: "edit",
      render: (_, record) => (
        <Checkbox
          checked={record.edit}
          onChange={(e) => handleCheckboxChange(e, record, 'edit')}
      />
      ),
    },
  ];

  const handleCheckboxChange = (e, record, checkboxName) => {
    const isChecked = e.target.checked;
    const updatedRows = [...selectedRows];
    
    record[checkboxName] = isChecked;

    if (record.readonly && record.edit) {
      updatedRows.push(record);
    } else {
      const index = updatedRows.findIndex((row) => row.key === record.key);
      if (index !== -1) {
        updatedRows.splice(index, 1);
      }
    }

    setSelectedRows(updatedRows);
  };

  return (
    <Table columns={columns} dataSource={data} pagination={false} />
  )
};

export default UserTable;
