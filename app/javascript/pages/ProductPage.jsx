import React, { useState, useEffect } from "react";
import axios from "axios";
import moment, { lang } from "moment";
import { feeUrl, productURL, warehouseURL } from "../utils/contants";
import CTable from "../components/CTable/CCTable";
// import moment from "moment";
import {
  Form,
  Input,
  InputNumber,
  Layout,
  Popconfirm,
  DatePicker,
  Table,
  Button,
  Select,
  Modal,
  notification,
  Pagination,
  Card,
  Flex,
} from "antd";

import {
  TrashIcon,
  PencilSquareIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

import $lang from "../utils/content/jp.json";

let plan_color, star_color, plan_text;

const { Content } = Layout;

const ProductPage = () => {
  const [form] = Form.useForm();

  const [searchText, setSearchText] = useState("");
  const [updateData, setUpdateData] = useState({});
  const [isposted, setIsPosted] = useState(false);

  const [updateStatus, setUpdateStatus] = useState("Create");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allData, setAllData] = useState([]);
  const [showData, setShowData] = useState([]);
  //fee
  const [feeData, setFeeData] = useState([]);
  const [feePackaging, setFeePackaging] = useState("");
  const [feeID, setFeeID] = useState("");

  const [handlingFeeRate, setHandlingFeeRate] = useState("");
  const [feeCategory, setFeeCategory] = useState("");
  const [storageFeeRate, setStorageFeeRate] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchBtn, setSearchBtn] = useState(false);

  const handlePageChange = (page, pageSize) => {
    console.log(page, "page")
    console.log(pageSize, "pageSize")
    setCurrentPage((page - 1) * pageSize);
    setItemPerPage(pageSize);
  };

  const getAllProduct = () => {

    const urlParam = `${productURL}?offset=${currentPage}&limit=${itemsPerPage}&keyword=${searchText}`
    axios.get(urlParam).then((res) => {
      let index = 1;
      let products = res.data.data.map((item) => {
        let feeData = item.data.attributes.warehouse_fee;
        return {
          key: index++,
          name: item.data.attributes.name,
          packaging: feeData.packaging,
          storage_fee_rate: feeData.storage_fee_rate,
          handling_fee_rate: feeData.handling_fee_rate,
          fee_category: feeData.fee_category,
        };
      });
      console.log(products, 'filterdata');
      console.log(res.data.count, 'res.data.count');
      setTotal(res.data.count);
      console.log('============');
      setAllData(products);
    });
  };

  const getAllFeeData = () => {
    axios.get(`${feeUrl}`).then((res) => {
      let index = 1;
      const priceData = res.data.data.map((item) => {
        return {
          ...item,
          key: index++,
        };
      });
      setFeeData(priceData);
      const feePackaging = priceData.map((item) => item.packaging);
      setFeePackaging(feePackaging);
    });
  };

  const onSubmit = async () => {
    try {
      let product = await form.validateFields();
      if (updateData) {
        await axios.put(`${productURL}`, {
          id: updateData.id,
          ...product,
        });
        notification.success({ message: "Update Success", duration: 1 });
        setIsModalOpen(false);
        setIsPosted(!isposted);
      } else {
        const postProduct = { ...product, warehouse_fee_id: feeID };
        await axios.post(`${productURL}`, {
          ...product,
          warehouse_fee_id: feeID,
        });
        notification.success({ message: "Create Success", duration: 1 });
        setIsModalOpen(false);
        setIsPosted(!isposted);
      }
    } catch (err) {
      notification.error({
        message: "Complete All Input Fields.",
        duration: 1,
      });
    }
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleSelect = (value) => {
    const selectedFeeData = feeData.find((item) => item.packaging === value);

    if (selectedFeeData) {
      setHandlingFeeRate(selectedFeeData.handling_fee_rate);
      setFeeCategory(selectedFeeData.fee_category);
      setStorageFeeRate(selectedFeeData.storage_fee_rate);
      setFeeID(selectedFeeData.id);
    } else {
      setHandlingFeeRate("");
      setFeeCategory("");
      setStorageFeeRate("");
    }
  };
  useEffect(() => {
    getAllProduct();
    getAllFeeData();
  }, []);

  useEffect(() => {
    getAllProduct();

  }, [searchText, currentPage, itemsPerPage, isposted]);

  const onAction = async (item) => {
    if (item) {
      form.setFieldsValue({
        name: item.name,
        code: item.code,
        specification: item.specification,
        packaging: item.packaging,
      });
      setHandlingFeeRate(item.handling_fee_rate);
      setFeeCategory(item.fee_category);
      setStorageFeeRate(item.storage_fee_rate);
    } else {
      form.resetFields();
      setHandlingFeeRate("");
      setFeeCategory("");
      setStorageFeeRate("");
    }
    setIsModalOpen(true);
    setUpdateData(item);
  };

  const onDelete = async (item) => {
    try {
      const response = await axios.delete("http://127.0.0.1:3000/api/product", {
        data: { id: item.id },
      });
      setIsPosted(!isposted);
      notification.success({ message: "Delete Success.", duration: 1 });
    } catch (error) {
      notification.error({ message: "Server Error", duration: 1 });
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };



  const productListColumns = [
    {
      title: "No",
      dataIndex: "key",
      sorter: true,
      align: "center",
      width: "5%",
    },
    {
      title: `${$lang.Maintenance.productName}`,
      key: "name",
      width: "20%",
      dataIndex: "name",
      align: "center",
      // render: (text, record, dataIndex) => {
      //   return (
      //     <div>
      //       {record.name.slice(0, 18)}
      //       {text.length >= 18 ? "..." : ""}
      //     </div>
      //   );
      // },
    },
    {
      title: `${$lang.Maintenance.handlingFee}`,
      dataIndex: "handling_fee_rate",
      key: "handling_fee_rate",
      align: "center",
      // render: (text, record, dataIndex) => {
      //   return (
      //     <div>
      //       {record.tel.slice(0, 18)}
      //       {text.length >= 18 ? "..." : ""}
      //     </div>
      //   );
      // },
    },
    {
      title: `${$lang.Maintenance.storageFee}`,
      dataIndex: "storage_fee_rate",
      key: "storage_fee_rate",
      align: "center",
      // render: (text, record, dataIndex) => {
      //   return (
      //     <div>
      //       {record.tel.slice(0, 18)}
      //       {text.length >= 18 ? "..." : ""}
      //     </div>
      //   );
      // },
    },
    {
      title: `${$lang.Maintenance.billingClass}`,
      dataIndex: "fee_category",
      align: "center",
      key: "fee_category",
      // render: (text, record, dataIndex) => {
      //   return (
      //     <div>
      //       {record.tel.slice(0, 18)}
      //       {text.length >= 18 ? "..." : ""}
      //     </div>
      //   );
      // },
    },
    {
      title: `${$lang.buttons.change}`,
      dataIndex: "operation",
      render: (text, record, dataIndex) => {
        return (
          <div className="flex justify-center">
            <div className="hidden rounded-full">
              {(star_color = record.done == true ? "text-yellow-500" : "")}
            </div>
            <div className="p-2 rounded-full cursor-pointer text-center">
              <PencilSquareIcon
                shape="circle"
                className="w-20"
                style={{ marginRight: "5px" }}
                onClick={() => {
                  setUpdateStatus("Edit");
                  onAction(record);
                }}
              />
            </div>
            <div className="p-2 rounded-full cursor-pointer items-center text-center">
              <TrashIcon
                shape="circle"
                className="w-20"
                onClick={() => {
                  onDelete(record);
                }}
              />
            </div>
          </div>
        );
      },
      align: "center",
    },
  ];

  return (
    <div>
      <Content style={{ width: 1024 }} className="mx-auto content-h">
        <Card
          style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
          className="py-2 my-2"
          bordered={false}
        >
          <div>
            <div className="mt-5">
              <div className="">
                <Flex gap="middle" align="start">
                  <Flex
                    style={{
                      width: "100%",
                    }}
                    justify="space-between"
                  >
                    <Input.Search
                      value={searchText}
                      className="w-190"
                      placeholder={"Search"}
                      onChange={handleSearchText}
                    />
                    {/* <Button
                      onClick={() => setSearchBtn(true)}
                      style={{ width: 120, marginLeft: 60 }}
                      className="btn-bg-black"
                    >
                      {$lang?.buttons?.search}
                    </Button> */}
                    <Button
                      // style={{ marginLeft: "640px" }}
                      onClick={() => {
                        onAction();
                        setUpdateStatus("Create");
                      }}
                      className="btn-bg-black"
                    >
                      {$lang?.Maintenance?.addNew}
                    </Button>
                  </Flex>
                </Flex>
              </div>
              <Modal
                title={$lang.Maintenance.productMaster}
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
                      label={$lang.Maintenance.productName}
                      name={"name"}
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
                      label={$lang.Maintenance.productPacking}
                      name={"specification"}
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
                      label={$lang.Maintenance.packing}
                      name={"packaging"}
                      rules={[
                        {
                          required: true,
                          message: `${$lang.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Select
                        options={[...feePackaging].map((item) => ({
                          key: item,
                          value: item,
                          label: item,
                        }))}
                        onChange={handleSelect}
                      />
                    </Form.Item>
                    <Form.Item
                      label={$lang.Maintenance.handlingFee}
                      rules={[
                        {
                          required: true,
                          message: `${$lang.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Input value={handlingFeeRate} />
                    </Form.Item>
                    <Form.Item
                      label={$lang.Maintenance.storageFee}
                      rules={[
                        {
                          required: true,
                          message: `${$lang.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Input value={storageFeeRate} />
                    </Form.Item>
                    <Form.Item
                      label={$lang.Maintenance.billingClass}
                      rules={[
                        {
                          required: true,
                          message: `${$lang.tableCommon.warning}`,
                        },
                      ]}
                    >
                      <Input value={feeCategory} />
                    </Form.Item>
                  </Form>
                </div>
              </Modal>
            </div>
            <div className="mt-5">
              <CTable
                rowKey={(node) => node.key}
                dataSource={allData}
                columns={productListColumns}
              />
              <div className="flex justify-center w-full bg-base-200 rounded-md mt-5">
                <Pagination
                  current={currentPage}
                  pageSize={itemsPerPage}
                  total={total}
                  onChange={handlePageChange}
                  pageSizeOptions={[10, 20, 50, 100]}
                  showSizeChanger
                  className="p-1"
                  style={{ float: "right" }}
                />
              </div>
            </div>
          </div>
        </Card>
      </Content>
    </div >
  );
};
export default ProductPage;
