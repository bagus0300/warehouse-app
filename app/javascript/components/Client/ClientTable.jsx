import React, { useState, useEffect } from "react";
import { Table, Checkbox } from "antd";

const UserTable = ({ data, onCheckChange }) => {
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
      title: "編集",
      dataIndex: "is_edit",
      key: "is_edit",
      render: (_, record) => (
        <Checkbox
          checked={record.is_edit}
          onChange={(e) => handleCheckboxChange(e, record, "is_edit")}
        />
      ),
    },
    {
      title: "読み込み専用",
      dataIndex: "is_read",
      key: "is_read",
      render: (_, record) => (
        <Checkbox
          checked={record.is_read}
          onChange={(e) => handleCheckboxChange(e, record, "is_read")}
        />
      ),
    },
  ];

  const handleCheckboxChange = (e, record, checkboxName) => {
    const isChecked = e.target.checked;
  
    // Update the status of the clicked checkbox
    record[checkboxName] = isChecked;
  
    // If the clicked checkbox is "Edit", also update the "Readonly" checkbox
    // if (checkboxName === "is_edit" && isChecked === true) {
    //   record.is_read = isChecked; // Update the "Readonly" checkbox to match the "Edit" checkbox
    // }

    // if (checkboxName === "is_read" && isChecked === false) {
    //   record.is_edit = isChecked;
    // }

    const updatedRows = data.map((item) =>
      item.key === record.key ? { ...item, [checkboxName]: isChecked } : item
    );
    setSelectedRows(updatedRows);
    onCheckChange(updatedRows);
  };

  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default UserTable;
