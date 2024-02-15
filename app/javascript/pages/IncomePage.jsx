import React, { useState, useEffect } from "react";
import moment from "moment";
import dayjs from "dayjs";
import {
  Form,
  Layout,
  Select,
  Space,
  Input,
  DatePicker,
  Divider,
  Card,
  Row,
  Col,
  Popconfirm,
  Button,
} from "antd";
import NavbarSection from "../components/layouts/Header/Navbar";
import FooterSection from "../components/layouts/Footer/Index";
import IncomeTable from "../components/Income/IncomeTable";
import { makeHttpReq, makeHttpOptions } from "../utils/helper";
import { openNotificationWithIcon } from "../components/common/notification";

import {
  warehouseURL,
  shipperURL,
  warehouseFeeURL,
  productURL,
  productDetailURL,
  saveStockInoutUrl,
} from "../utils/contants";

import CustomButton from "../components/common/CustomButton";
import $lang from "../utils/content/jp.json";

const { Content } = Layout;
const dateFormat = "YYYY/MM/DD";

const IncomePage = () => {
  const [isVisibleAddButton, setAddButtonVisability] = useState(false);
  const [prepareProducts, setPrepareProducts] = useState([]);
  const [isDisabledProduct, setDiabledProduct] = useState(false);

  // ---------Warehouse--------
  const [selectedWarehouse, setSelectedWarehouse] = useState({
    value: "",
    label: "",
  });
  const [warehouseOptions, setWarehouseOptions] = useState([]);

  // ------------Shipper-----------
  const [seletedShipper, setSeletedShipper] = useState({
    value: "",
    label: "",
  });
  const [shipperOptions, setShipperOptions] = useState();

  // ----------------Openday--------------
  // const [receiptDate, setInoutOn] = useState(moment("2024-02-16"));
  const [receiptDate, setInoutOn] = useState(dayjs("2015/01/01", dateFormat));

  // ---------product----------
  const [selectedProduct, setSelectedProduct] = useState({
    value: "",
    label: "",
  });

  const [productOptions, setProductOptions] = useState("");

  // -----------packing---------
  const [packaging, setPackaging] = useState("");

  // --------storagePrice-------
  const [storagePrice, setStoragePrice] = useState("");

  // ----------handlePrice------------
  const [handlePrice, setHandlePrice] = useState("");

  // -------------lotNumber-----------
  const [lotNumber, setLotNumber] = useState("");

  // ---------------weight---------------
  const [weight, setWeight] = useState("");

  // -------------amount--------------
  const [amount, setStock] = useState("");

  const [editMode, setEditMode] = useState("new");
  //  -------init prepareProductItem--------
  const initPrepareProductItem = () => {
    setLotNumber("");
    setStock("");
    setWeight("");
  };

  const setPrepareProductItem = (editData) => {
    setLotNumber(editData.lot_number);
    setStock(editData.amount);
    setWeight(editData.weight);
    setPackaging(editData.product_type);
    setHandlePrice(editData.handling_fee_rate);
    setStoragePrice(editData.storage_fee_rate);
    setSelectedWarehouse({
      value: editData.warehouse_id,
      name: editData.warehouse_name,
    });
    setSeletedShipper({
      value: editData.shipper_id,
      name: editData.shipper_name,
    });
    setSelectedProduct({
      value: editData.product_id,
      label: editData.product_name,
    });
    setInoutOn(dayjs(editData.inout_on, dateFormat));
  };

  const onChangeWarehouse = (value, option) => {
    setSelectedWarehouse({ value: value, label: option.label });
  };

  const onChangeShipper = (value, option) => {
    setSeletedShipper({ value: value, label: option.label });
  };

  const onChangeProduct = (value, option) => {
    setSelectedProduct({ value: value, label: option.label });

    makeHttpReq(makeHttpOptions({}, "get", productDetailURL(value))).then(
      (res) => {
        const warehouseFee = res.data.data.data.attributes.warehouse_fee;

        setPackaging(warehouseFee.packaging);
        setStoragePrice(warehouseFee.storage_fee_rate);
        setHandlePrice(warehouseFee.handling_fee_rate);
      }
    );
  };

  //  -------Get warehouse names--------
  const getWarehouses = () => {
    makeHttpReq(makeHttpOptions({}, "get", warehouseURL)).then((res) => {
      const warehouses = res.data.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });

      setWarehouseOptions(warehouses);

      if (warehouses.length > 0)
        setSelectedWarehouse({
          value: warehouses[0].value,
          label: warehouses[0].label,
        });
    });
  };

  // --------Get shipper data--------
  const getShippers = () => {
    makeHttpReq(makeHttpOptions({}, "get", shipperURL)).then((res) => {
      const shippers = res.data.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });

      setShipperOptions(shippers);

      if (shippers.length > 0)
        setSeletedShipper({
          value: shippers[0].value,
          label: shippers[0].label,
        });
    });
  };

  // ----------Get product data-----------
  const getProducts = () => {
    makeHttpReq(makeHttpOptions({}, "get", productURL)).then((res) => {
      const products = res.data.data.map((item) => {
        return {
          value: item.data.attributes.id,
          label: item.data.attributes.name,
        };
      });

      setProductOptions(products);

      if (products.length > 0)
        setSelectedProduct({
          value: products[0].value,
          label: products[0].label,
        });
      onChangeProduct(products[0].value, {
        value: products[0].value,
        label: products[0].label,
      });
    });
  };

  const savePrepareProducts = () => {
    makeHttpReq(
      makeHttpOptions(
        { stock_inout: prepareProducts },
        "post",
        saveStockInoutUrl
      )
    )
      .then((res) => {
        setPrepareProducts([]);
        openNotificationWithIcon("success", "", $lang.messages.success);
      })
      .catch((err) => {
        openNotificationWithIcon("error", "error", err.messages);
      });
  };

  const isReadyPrepareProducts = () => {
    if (receiptDate == "") {
      openNotificationWithIcon(
        "warning",
        "",
        $lang.messages.input_in_stock_date
      );
      return false;
    } else if (lotNumber == "") {
      openNotificationWithIcon("warning", $lang.messages.input_lotNumber);
      return false;
    } else if (amount == "") {
      openNotificationWithIcon("warning", "", $lang.messages.input_stock);
      return false;
    } else if (weight == "") {
      openNotificationWithIcon("warning", "", $lang.messages.input_weight);
      return false;
    }

    return true;
  };

  const doPrepareProducts = () => {
    if (!isReadyPrepareProducts()) return;

    let index = 0;
    let selectedProductArr = prepareProducts.slice();

    const newData = {
      handling_fee_rate: handlePrice,
      storage_fee_rate: storagePrice,
      product_id: selectedProduct.value,
      product_name: selectedProduct.label,
      product_type: packaging,
      catagory: 0,
      lot_number: lotNumber,
      weight: weight,
      amount: amount,
      warehouse_id: selectedWarehouse.value,
      warehouse_name: selectedWarehouse.label,
      shipper_id: seletedShipper.value,
      shipper_name: seletedShipper.label,
      inout_on: receiptDate,
      idx: index++,
      category: 0,
    };

    selectedProductArr.push(newData);

    setPrepareProducts(selectedProductArr);
    initPrepareProductItem();

    // setAddButtonVisability(true);
  };

  const editRow = (productId) => {
    setEditMode("edit");
    const oldData = prepareProducts.slice();
    const editData = oldData.filter((data) => data.product_id == productId)[0];

    setPrepareProductItem(editData);
    setDiabledProduct(true);
  };

  const deleteRow = (id) => {
    const newData = prepareProducts.slice();
    const delData = newData.filter((data) => data.product_id == id)[0];
    const index = newData.indexOf(delData);
    newData.splice(index, 1);
    setPrepareProducts(newData);
  };

  const cancelEditProduct = () => {
    setAddButtonVisability(false);
    initPrepareProductItem();
    setDiabledProduct(false);
  };

  const confirmInitPrepareProducts = () => {
    if (prepareProducts.length > 0) setPrepareProducts([]);
    else openNotificationWithIcon("warning", "", "no data");
  };

  const updatePrepareProduct = () => {
    let oldData = prepareProducts.slice();
    const updateData = oldData.filter(
      (item) => item.product_id == selectedProduct.value
    )[0];

    updateData.warehouse_id = selectedWarehouse.value;
    updateData.warehouse_name = selectedWarehouse.label;
    updateData.shipper_id = seletedShipper.value;
    updateData.shipper_name = seletedShipper.label;
    updateData.inout_on = receiptDate;

    updateData.lot_number = lotNumber;
    updateData.weight = weight;
    updateData.amount = amount;

    //
    setPrepareProducts(oldData);

    setDiabledProduct(false);
    setAddButtonVisability(false);
  };

  // ----------When rerender, get all data------
  useEffect(() => {
    getWarehouses();
    getShippers();
    getProducts();
  }, []);

  return (
    <div>
      <NavbarSection />
      <Content
        style={{ width: 1280, marginTop: 100 }}
        className="mx-auto flex flex-col justify-content content-h"
      >
        <Card
          style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
          className="py-2 my-2"
          bordered={false}
        >
          <Form
            name="basic"
            autoComplete="off"
            initialValues={{
              warehouse: "",
              shipper: "",
              receipDate: "",
              product: "",
              packaging: "",
              storagePrice: "",
              handlePrice: "",
              lotNumber: "",
              weight: "",
              amount: "",
            }}
          >
            <Row className="my-2">
              <Col span={1}>
                <label>{$lang.IncomePageJp.warehouse}: </label>
              </Col>
              <Col span={6}>
                <Select
                  placeholder={$lang.IncomePageJp.warehouse}
                  style={{ width: 150, marginLeft: 14 }}
                  value={selectedWarehouse}
                  options={warehouseOptions}
                  onChange={onChangeWarehouse}
                />
              </Col>
            </Row>
            <Row className="my-2">
              <Col span={1}>
                <label>{$lang.IncomePageJp.shipper}:</label>
              </Col>
              <Col span={6}>
                <Select
                  style={{ width: 300, marginLeft: 14 }}
                  onChange={onChangeShipper}
                  options={shipperOptions}
                  value={seletedShipper.value}
                  defaultValue={""}
                  placeholder={$lang.IncomePageJp.shipper}
                />
              </Col>
            </Row>
            <Row className="my-2">
              <Col span={1}>
                <label>{$lang.IncomePageJp.receiptDate}:</label>
              </Col>
              <Col span={6}>
                <div className="ml-2">
                  <DatePicker
                    style={{ width: 150 }}
                    value={receiptDate}
                    onChange={(date, dateStr) => {
                      if (dateStr == "") {
                        setInoutOn(dayjs("2024/02/20", dateFormat));
                      } else setInoutOn(dayjs(dateStr, dateFormat));
                    }}
                    placeholder={$lang.IncomePageJp.receiptDate}
                    className="ml-1"
                    format={dateFormat}
                  />
                </div>
              </Col>
            </Row>
            <Row className="my-2">
              <Col span={1}>
                <label>{$lang.IncomePageJp.productName}:</label>
              </Col>
              <Col span={10}>
                <Space.Compact block className="ml-3">
                  <Select
                    placeholder={$lang.IncomePageJp.productName}
                    style={{ width: 200 }}
                    value={selectedProduct.value}
                    options={productOptions}
                    onChange={onChangeProduct}
                    disabled={isDisabledProduct}
                    defaultValue={{
                      value: "",
                      label: "",
                    }}
                  />
                  <Input
                    style={{ width: 150 }}
                    placeholder={$lang.IncomePageJp.packing}
                    value={packaging}
                    readOnly
                  />
                  <Input
                    style={{ width: 100 }}
                    placeholder={$lang.IncomePageJp.cargoPrice}
                    value={storagePrice}
                    readOnly
                  />
                  <Input
                    style={{ width: 100 }}
                    placeholder={$lang.IncomePageJp.storagePrice}
                    value={handlePrice}
                    readOnly
                  />
                </Space.Compact>
              </Col>
            </Row>
            <Row>
              <Col span={1}></Col>
              <Col span={8}>
                <Space.Compact block className="ml-3">
                  <Input
                    style={{ width: 100 }}
                    placeholder={$lang.IncomePageJp.lotNumber}
                    value={lotNumber}
                    onChange={(e) => {
                      setLotNumber(e.target.value);
                    }}
                  />
                  <Input
                    style={{ width: 100 }}
                    placeholder={$lang.IncomePageJp.weight + "(kg)"}
                    value={weight}
                    onChange={(e) => {
                      setWeight(e.target.value);
                    }}
                  />
                  <Input
                    style={{ width: 100 }}
                    placeholder={$lang.IncomePageJp.itemNumber}
                    value={amount}
                    onChange={(e) => {
                      setStock(e.target.value);
                    }}
                  />
                </Space.Compact>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={1}></Col>
              <Col span={6}>
                <CustomButton
                  onClick={doPrepareProducts}
                  className="px-5 ml-2 btn-bg-black"
                  title={$lang.buttons.add}
                  htmlType="submit"
                  visability={!isVisibleAddButton}
                />
                <CustomButton
                  onClick={updatePrepareProduct}
                  className="px-5 ml-2 btn-bg-black"
                  title={$lang.buttons.change}
                  visability={isVisibleAddButton}
                />
                <CustomButton
                  onClick={cancelEditProduct}
                  className="px-5 ml-2 default"
                  title={$lang.buttons.cancel}
                  visability={isVisibleAddButton}
                />
              </Col>
            </Row>
          </Form>
        </Card>
        <Card
          style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
          className="py-4 my-2"
          bordered={false}
        >
          <IncomeTable
            data={prepareProducts}
            editRow={(key) => editRow(key)}
            deleteRow={deleteRow}
            pagination={false}
          />
          <div style={{ height: 15 }}></div>
          <div style={{ justifyContent: "flex-end", display: "flex" }}>
            <CustomButton
              title={$lang.buttons.csvExchange}
              className="mr-2 btn-bg-black"
              visability={true}
              onClick={() =>
                openNotificationWithIcon("warning", "", "on working")
              }
            ></CustomButton>
            <CustomButton
              onClick={savePrepareProducts}
              title={$lang.buttons.confirmDeparture}
              visability={true}
            ></CustomButton>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={confirmInitPrepareProducts}
              okText="Yes"
              cancelText="No"
              className=" ml-2"
            >
              <Button type="primary" danger>
                {$lang.buttons.init}
              </Button>
            </Popconfirm>
          </div>
        </Card>
      </Content>

      <FooterSection />
    </div>
  );
};

export default IncomePage;
