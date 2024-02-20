import React, { useState, useEffect } from "react";
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
import { API } from "../utils/helper";
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
import { Content } from "antd/es/layout/layout";
import { dateFormat } from "../utils/contants";

const OutStockPage = () => {
  const [editMode, setEditMode] = useState("new");
  const [isDisabledProduct, setDiabledProduct] = useState(false);

  // ---------Warehouse--------
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState({
    value: "",
    label: "",
  });

  // ------------Shipper-----------
  const [shipperOptions, setShipperOptions] = useState();
  const [seletedShipper, setSeletedShipper] = useState({
    value: "",
    label: "",
  });

  // ---------product----------
  const [productOptions, setProductOptions] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({
    value: "",
    label: "",
  });

  const [outStockDate, setOutStockDate] = useState();

  // -----------packing---------
  const [packaging, setPackaging] = useState("");

  // --------storagePrice-------
  const [storagePrice, setStoragePrice] = useState("");

  // ----------handlePrice------------
  const [handlePrice, setHandlePrice] = useState("");

  // -------------lotNumber-----------
  const [lotNumber, setLotNumber] = useState("");

  // ---------------libraryNumber---------------
  const [libraryNumber, setLibraryNumber] = useState("");

  // -------------amount--------------
  const [amount, setStock] = useState("");

  //  -------init prepareProductItem--------
  const initPrepareProductItem = () => {
    setLotNumber("");
    setStock("");
    setLibraryNumber("");
  };

  const getWarehouses = () => {
    API.get(warehouseURL)
      .then((res) => {
        debugger;
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
      })
      .catch((err) => {});
    // makeHttpReq(makeHttpOptions({}, "get", warehouseURL)).then((res) => {

    // });
  };

  // --------Get shipper data--------
  const getShippers = () => {
    API.get(shipperURL)
      .then((res) => {
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
      })
      .catch((err) => {});
  };

  // ----------Get product data-----------
  const getProducts = () => {
    API.get(productURL)
      .then((res) => {
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
      })
      .catch((err) => {});
  };

  const onChangeWarehouse = (value, option) => {
    setSelectedWarehouse({ value: value, label: option.label });
  };

  const onChangeShipper = (value, option) => {
    setSeletedShipper({ value: value, label: option.label });
  };

  const onChangeProduct = (value, option) => {
    console.log("--------- change product -----------");
    setSelectedProduct({ value: value, label: option.label });

    API.get(productDetailURL(value))
      .then((res) => {
        const warehouseFee = res.data.data.data.attributes.warehouse_fee;

        setPackaging(warehouseFee.packaging);
        setStoragePrice(warehouseFee.storage_fee_rate);
        setHandlePrice(warehouseFee.handling_fee_rate);
      })
      .catch((err) => {});
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
      libraryNumber: libraryNumber,
      amount: amount,
      warehouse_id: selectedWarehouse.value,
      warehouse_name: selectedWarehouse.label,
      shipper_id: seletedShipper.value,
      shipper_name: seletedShipper.label,
      inout_on: departureDate,
      idx: index++,
      category: 0,
    };

    selectedProductArr.push(newData);

    setPrepareProducts(selectedProductArr);
    initPrepareProductItem();

    // setAddButtonVisability(true);
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
    updateData.inout_on = departureDate;

    updateData.lot_number = lotNumber;
    updateData.libraryNumber = libraryNumber;
    updateData.amount = amount;

    //
    setPrepareProducts(oldData);

    setDiabledProduct(false);
    setAddButtonVisability(false);
  };

  const cancelEditProduct = () => {
    setAddButtonVisability(false);
    initPrepareProductItem();
    setDiabledProduct(false);
  };

  useEffect(() => {
    getWarehouses();
    getShippers();
    getProducts();
  }, []);
  return (
    <div>
      <Content
        style={{ width: 1280, marginTop: 20 }}
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
              libraryNumber: "",
              amount: "",
            }}
          >
            <Row className="my-2">
              <Col span={1}>
                <label>{$lang.inStock.warehouse}: </label>
              </Col>
              <Col span={6}>
                <Select
                  placeholder={$lang.inStock.warehouse}
                  style={{ width: 150, marginLeft: 14 }}
                  value={selectedWarehouse}
                  options={warehouseOptions}
                  onChange={onChangeWarehouse}
                />
              </Col>
            </Row>
            <Row className="my-2">
              <Col span={1}>
                <label>{$lang.inStock.shipper}:</label>
              </Col>
              <Col span={6}>
                <Select
                  style={{ width: 300, marginLeft: 14 }}
                  onChange={onChangeShipper}
                  options={shipperOptions}
                  value={seletedShipper.value}
                  defaultValue={""}
                  placeholder={$lang.inStock.shipper}
                />
              </Col>
            </Row>
            <Row className="my-2">
              <Col span={1}>
                <label>{$lang.outStock.outStockDate}:</label>
              </Col>
              <Col span={6}>
                <div className="ml-2">
                  <DatePicker
                    style={{ width: 150 }}
                    value={outStockDate}
                    onChange={(date, dt) => {
                      if (dt == "") {
                        setOutStockDate(dayjs(currentDate, dateFormat));
                      } else {
                        setOutStockDate(dayjs(date, dateFormat));
                      }
                    }}
                    placeholder={$lang.outStock.outStockDate}
                    className="ml-1"
                    format={dateFormat}
                  />
                </div>
              </Col>
            </Row>
            <Row className="my-2">
              <Col span={1}>
                <label>{$lang.inStock.productName}:</label>
              </Col>
              <Col span={10}>
                <Space.Compact block className="ml-3">
                  <Select
                    placeholder={$lang.inStock.productName}
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
                    placeholder={$lang.inStock.packing}
                    value={packaging}
                    readOnly
                  />
                  <Input
                    style={{ width: 100 }}
                    placeholder={$lang.inStock.cargoPrice}
                    value={storagePrice}
                    readOnly
                  />
                  <Input
                    style={{ width: 100 }}
                    placeholder={$lang.inStock.storagePrice}
                    value={handlePrice}
                    readOnly
                  />
                </Space.Compact>
              </Col>
            </Row>
            <Row>
              <Col span={1}></Col>
              <Col span={8} style={{ display: "flex" }}>
                <Space.Compact block className="ml-3">
                  <Input
                    style={{ width: 100 }}
                    placeholder={$lang.outStock.outStockDate}
                    value={outStockDate}
                    onChange={(e) => {
                      setOutStockDate(e.target.value);
                    }}
                    readOnly
                  />
                  <Select
                    style={{ width: 100 }}
                    placeholder={$lang.inStock.lotNumber}
                    value={lotNumber}
                    onChange={(e) => {
                      setLotNumber(e.target.value);
                    }}
                  />
                </Space.Compact>
                <Space.Compact className="ml-3">
                  <Input
                    style={{ width: 100 }}
                    placeholder={$lang.outStock.libraryNumber}
                    value={libraryNumber}
                    onChange={(e) => {
                      setLibraryNumber(e.target.value);
                    }}
                    readOnly
                  />
                  <Input
                    style={{ width: 100 }}
                    placeholder={$lang.outStock.shipmentNumber}
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
                  visability={editMode != "edit"}
                />
                <CustomButton
                  onClick={updatePrepareProduct}
                  className="px-5 ml-2 btn-bg-black"
                  title={$lang.buttons.change}
                  visability={editMode == "edit"}
                />
                <CustomButton
                  onClick={cancelEditProduct}
                  className="px-5 ml-2 default"
                  title={$lang.buttons.cancel}
                  visability={editMode == "edit"}
                />
              </Col>
            </Row>
          </Form>
        </Card>
      </Content>
    </div>
  );
};

export default OutStockPage;
