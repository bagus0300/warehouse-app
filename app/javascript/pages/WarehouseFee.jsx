import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import CTable from "../components/CTable";
import { feeUrl } from "../utils/contants";
import { warehouseFeeURL } from "../utils/contants";

import {
  Form,
  Input,
  Layout,
  Select,
  Button,
  Modal,
  notification,
  Card,
} from "antd";

import {
  TrashIcon,
  PencilSquareIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

import CustomButton from "../components/common/CustomButton";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import $lang from "../utils/content/jp.json";
import { openNotificationWithIcon } from "../components/common/notification";

const { Content } = Layout;

const WarehouseFee = ({ is_edit }) => {
  const [form] = Form.useForm();

  const [searchText, setSearchText] = useState("");
  const [reget, setReget] = useState([]);
  const [detailData, setDetailData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [isposted, setIsPosted] = useState(false);

  const [updateStatus, setUpdateStatus] = useState("Create");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allData, setAllData] = useState([]);

  const getAllUnitPrice = () => {
    axios.get(`${warehouseFeeURL}`).then((res) => {
      let index = 1;
      const feeData = res.data.data.map((item) => {
        return {
          ...item,
          key: index++,
        };
      });
      setAllData(feeData);
    });
  };

  const onSubmit = async () => {
    try {
      let fee = await form.validateFields();
      if (updateData) {
        await axios.put(`${feeUrl}`, {
          id: updateData.id,
          ...fee,
        });

        openNotificationWithIcon(
          "success",
          $lang.popConrimType.error,
          $lang.messages.succes
        );
        setIsModalOpen(false);
        setIsPosted(!isposted);
      } else {
        await axios.post(`${feeUrl}`, fee);
        openNotificationWithIcon(
          "success",
          $lang.popConrimType.success,
          $lang.messages.succes
        );
        setIsModalOpen(false);
        setIsPosted(!isposted);
      }
    } catch (err) {
      openNotificationWithIcon(
        "error",
        $lang.popConrimType.error,
        $lang.messages.complete_all_nput_fields
      );
    }
  };

  const onDelete = async (item) => {
    try {
      const response = await axios.delete(`${feeUrl}`, {
        data: { id: item.id },
      });
      setIsPosted(!isposted);
      //getAllShipper();

      openNotificationWithIcon(
        "success",
        $lang.popConrimType.error,
        $lang.messages.success
      );
    } catch (error) {
      notification.error({ message: "Server Error", duration: 1 });

      openNotificationWithIcon(
        "error",
        $lang.popConrimType.error,
        "Server Error"
      );
    }
  };

  useEffect(() => {
    getAllUnitPrice();
  }, [isposted]);

  const onAction = async (item) => {
    if (item) {
      form.setFieldsValue({
        packaging: item.packaging,
        handling_fee_rate: item.handling_fee_rate,
        storage_fee_rate: item.storage_fee_rate,
        fee_category: item.fee_category,
        code: item.code,
      });
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
    setUpdateData(item);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const feeListColumns = [
    {
      title: "No",
      dataIndex: "key",
      sorter: true,
      align: "center",
      width: "5%",
    },
    {
      title: `${$lang.Maintenance.packing}`,
      key: "packaging",
      dataIndex: "packaging",
      align: "center",
      render: (text, record, dataIndex) => {
        return (
          <div>
            {record.packaging.slice(0, 18)}
            {text.length >= 18 ? "..." : ""}
          </div>
        );
      },
    },
    {
      title: `${$lang.Maintenance.handlingFeeUnitPrice}`,
      dataIndex: "handling_fee_rate",
      key: "handling_fee_rate",
      align: "center",
    },
    {
      title: `${$lang.Maintenance.storageFeeUnitPrice}`,
      dataIndex: "storage_fee_rate",
      key: "storage_fee_rate",
      align: "center",
    },
    {
      title: `${$lang.Maintenance.billingClass}`,
      dataIndex: "fee_category",
      key: "fee_category",
      align: "center",
    },
    is_edit === 1 ? (
      {
        title: `${$lang.buttons.change}`,
        dataIndex: "operation",
        render: (text, record, dataIndex) => {
          return (
            <div className="flex justify-center items-center">
              <div className="hidden rounded-full"></div>
              <div className="p-2 rounded-full cursor-pointer items-center text-center">
                <CustomButton
                  onClick={() => {
                    setUpdateStatus("Edit");
                    onAction(record);
                  }}
                  title={$lang.buttons.change}
                  icon={<EditOutlined />}
                  size="small"
                  className="btn-default btn-hover-black"
                  style={{ backgroundColor: "transparent", color: "#000" }}
                  visability={true}
                />{" "}
              </div>
              <div className="p-2 rounded-full cursor-pointer items-center text-center ml-2">
                <CustomButton
                  onClick={() => onDelete(record)}
                  title={$lang.buttons.delete}
                  icon={<DeleteOutlined />}
                  style={{ backgroundColor: "transparent", color: "#000" }}
                  size="small"
                  className="btn-default btn-hover-black"
                  visability={true}
                />
              </div>
            </div>
          );
        },
        align: "center",
      }
    ) : (
      <div></div>
    ),
  ];

  return (
    <div>
      <Content
        style={{ width: 1024 }}
        className="mx-auto flex flex-col content-h"
      >
        <Card
          style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
          className="py-2 my-2"
          bordered={false}
        >
          <div>
            <div className="mt-2" style={{ marginLeft: "880px" }}>
              {is_edit === 1 ? (
                <Button
                  onClick={() => {
                    onAction();
                    setUpdateStatus("Create");
                  }}
                  className="px-5 btn-bg-black"
                >
                  {$lang?.Maintenance?.addNew}
                </Button>
              ) : (
                <div></div>
              )}

              <Modal
                title={$lang.Maintenance.shipperMaster}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                  <Button key="ok" onClick={onSubmit}>
                    {$lang.Maintenance.register}
                  </Button>,
                  <Button key="cancel" onClick={handleCancel}>
                    {$lang.buttons.cancel}
                  </Button>,
                ]}
              >
                <div>
                  <Form
                    form={form}
                    size="middle"
                    scrollToFirstError
                    labelCol={{ span: 7 }}
                    labelAlign="left"
                  >
                    <Form.Item
                      label={$lang.Maintenance.packing}
                      name={"packaging"}
                      rules={[
                        {
                          required: true,
                          message: `${$lang.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={$lang.shipper.code}
                      name={"code"}
                      rules={[
                        {
                          required: true,
                          message: `${$lang.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={$lang.Maintenance.handlingFeeUnitPrice}
                      name={"handling_fee_rate"}
                      rules={[
                        {
                          required: true,
                          message: `${$lang.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={$lang.Maintenance.storageFeeUnitPrice}
                      name={"storage_fee_rate"}
                      rules={[
                        {
                          required: true,
                          message: `${$lang.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={$lang.Maintenance.billingClass}
                      name={"fee_category"}
                      rules={[
                        {
                          required: true,
                          message: `${$lang.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Select
                        defaultValue={$lang.Maintenance.fullTimeRequest}
                        options={[
                          {
                            value: "0",
                            label: `${$lang.Maintenance.fullTimeRequest}`,
                          },
                          {
                            value: "1",
                            label: `${$lang.Maintenance.firstBilling}`,
                          },
                        ]}
                      />
                    </Form.Item>
                  </Form>
                </div>
              </Modal>
            </div>
            <div className="mt-5">
              <CTable
                rowKey={(node) => node.id}
                dataSource={allData}
                columns={feeListColumns}
                pagination={true}
              />
            </div>
          </div>
        </Card>
      </Content>
    </div>
  );
};
export default WarehouseFee;
