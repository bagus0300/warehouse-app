import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import {
  Form,
  Select,
  Space,
  Input,
  DatePicker,
  Divider,
  Card,
  Row,
  Col,
} from "antd";
import { API } from "../utils/helper";
import {
  warehouseURL,
  shipperURL,
  saveStockInoutUrl,
  productSetUrl,
  productStockURL,
} from "../utils/contants";

import { Content } from "antd/es/layout/layout";
import { dateFormat } from "../utils/contants";

import CustomButton from "../components/common/CustomButton";
import $lang from "../utils/content/jp.json";
import OutStockTable from "../components/OutStock/OutStockTable";
import { openNotificationWithIcon } from "../components/common/notification";

const OutStockPage = ({ is_edit }) => {
  const [editMode, setEditMode] = useState("new");

  // ---------Warehouse--------
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState({
    value: "",
    label: "",
  });

  // ------------Shipper-----------
  const [shipperOptions, setShipperOptions] = useState([]);
  const [seletedShipper, setSeletedShipper] = useState({
    value: "",
    label: "",
  });
  const [shipperDisctription, setShipperDescription] = useState({
    code: "",
    closingDate: "",
  });
  // ---------product----------
  const [productOptions, setProductOptions] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({
    value: "",
    label: "",
    inout_on: "",
    lot_number: "",
  });

  const [outStockDate, setOutStockDate] = useState("");

  // -----------packing---------
  const [packaging, setPackaging] = useState("");

  // --------storagePrice-------
  const [storagePrice, setStoragePrice] = useState("");

  // ----------handlePrice------------
  const [handlePrice, setHandlePrice] = useState("");

  const [inStockDate, setInStockDate] = useState("");

  // ---------------outStockAmount---------------
  const [outStockAmount, setOutStockAmount] = useState("");

  // -------------amount--------------
  const [stockAmount, setStock] = useState("");

  const [prepareProducts, setPrepareProducts] = useState([]);

  const initWarehouseFee = () => {
    setPackaging("");
    setStoragePrice("");
    setHandlePrice("");
    setInStockDate("");
    setStock("");
  };
  //  -------init prepareProductItem--------
  const initPrepareProductItem = () => {
    setOutStockAmount("");
  };

  const getWarehouses = () => {
    API.get(warehouseURL)
      .then((res) => {
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
      .catch((err) => { });
  };

  // --------Get shipper data--------
  const getShippers = () => {
    API.get(shipperURL)
      .then((res) => {
        const shippers = res.data.data.map((item) => {
          return {
            value: item.id,
            label: item.name,
            code: item.code,
            closingDate: item.closing_date,
          };
        });

        setShipperOptions(shippers);

        if (shippers.length > 0) {
          setSeletedShipper({
            value: shippers[0].value,
            label: shippers[0].label,
          });

          setShipperDescription({
            code: shippers[0].code,
            closingDate: shippers[0].closingDate,
          });
        }
      })
      .catch((err) => { });
  };

  // ----------Get product data-----------
  const getProducts = () => {
    const url = API.get(
      productSetUrl(selectedWarehouse.value, seletedShipper.value)
    )
      .then((res) => {
        // product_id, log_number, name, warehouse_fee_id
        const products = res.data.data.map((item) => {
          return {
            value: item.id,
            label: item.product_name,
            inout_on: item.inout_on,
            lot_number: item.lot_number,
            weight: item.weight,
            product_id: item.product_id,
            stock_inout_id: item.stock_inout_id,
            stock_inout_amount: item.stock_inout_amount,
          };
        });
        setProductOptions(products);

        if (products.length > 0) {
          setSelectedProduct({
            value: products[0].value,
            label: products[0].label,
            inout_on: products[0].inout_on,
            lot_number: products[0].lot_number,
            weight: products[0].weight,
            product_id: products[0].product_id,
            stock_inout_id: products[0].stock_inout_id,
            stock_inout_amount: products[0].stock_inout_amount,
          });

          onChangeProduct(products[0].value, {
            value: products[0].value,
            label: products[0].label,
            inout_on: products[0].inout_on,
            lot_number: products[0].lot_number,
            weight: products[0].weight,
            product_id: products[0].product_id,
            stock_inout_id: products[0].stock_inout_id,
            stock_inout_amount: products[0].stock_inout_amount,
          });
        } else {
          setSelectedProduct({
            value: "",
            label: "",
            inout_on: "",
            lot_number: "",
            weight: "",
            product_id: "",
            stock_inout_id: "",
            stock_inout_amount: "",
          });
          initWarehouseFee();
        }
      })
      .catch((err) => { });
  };

  const onChangeWarehouse = (value, option) => {
    setSelectedWarehouse({ value: value, label: option.label });
  };

  const onChangeShipper = (value, option) => {
    setSeletedShipper({ value: value, label: option.label });
  };

  const onChangeProduct = (value, option) => {
    setSelectedProduct({
      value: value,
      label: option.label,
      lot_number: option.lot_number,
      inout_on: option.inout_on,
      weight: option.weight,
      product_id: option.product_id,
      stock_inout_id: option.stock_inout_id,
      stock_inout_amount: option.stock_inout_amount,
    });

    API.get(
      productStockURL(
        value,
        option.product_id,
        selectedWarehouse.value,
        seletedShipper.value
      )
    )
      .then((res) => {
        const warehouseFee = res.data.data.data.attributes.warehouse_fee;
        setPackaging(warehouseFee.packaging);
        setStoragePrice(warehouseFee.storage_fee_rate);
        setHandlePrice(warehouseFee.handling_fee_rate);
        setInStockDate(option.inout_on);
        setStock(res.data.stock.total_amount);
      })
      .catch((err) => { });
  };

  const setPrepareProductItem = (editData) => {
    setStock(editData.stock_amount);
    setOutStockAmount(editData.amount);
    setPackaging(editData.packaging);
    setHandlePrice(editData.handling_fee_rate);
    setStoragePrice(editData.storage_fee_rate);

    setSelectedWarehouse({
      value: editData.warehouse_id,
      label: editData.warehouse_name,
    });

    setSeletedShipper({
      value: editData.shipper_id,
      label: editData.shipper_name,
    });

    setSelectedProduct({
      value: editData.stock_inout_id,
      label: editData.product_name,
      inout_on: editData.inout_on,
      lot_number: editData.lot_number,
      stock_inout_id: editData.stock_inout_id,
      stock_inout_amount: editData.stock_amount,
      weight: editData.weight,
    });

    setInStockDate(editData.inout_on);
    setStock(editData.stock_amount);

    setInStockDate(editData.inout_on);
    setOutStockDate(dayjs.tz(new Date(editData.outstock_date), "Asia/Tokyo"));
  };

  const isReadyPrepareProducts = () => {
    if (outStockDate == "") {
      openNotificationWithIcon(
        "warning",
        $lang.popConrimType.warning,
        $lang.messages.input_out_stock_date
      );
      return false;
    } else if (outStockAmount == "") {
      openNotificationWithIcon(
        "warning",
        $lang.popConrimType.warning,
        $lang.messages.input_out_amount
      );
      return false;
    }

    return true;
  };

  const doPrepareProducts = () => {
    if (!isReadyPrepareProducts()) return;
    if (outStockAmount > selectedProduct.stock_inout_amount) {
      openNotificationWithIcon(
        "warning",
        $lang.popConrimType.warning,
        $lang.messages.stockAmountError
      );
      return;
    }

    let selectedProductArr = prepareProducts.slice();
    const outStockDateStr = new Date(outStockDate.toString())
      .toISOString()
      .substring(0, 10)
      .replace(/\-/g, "/");

    selectedProduct.label.substring(0, selectedProduct.label.indexOf("("));

    const newData = {
      product_id: selectedProduct.value,
      stock_inout_id: selectedProduct.stock_inout_id,
      product_name: selectedProduct.label.substring(
        0,
        selectedProduct.label.indexOf("(")
      ),
      product_type: packaging,
      catagory: 1,
      lot_number: selectedProduct.lot_number,
      weight: selectedProduct.weight,
      amount: outStockAmount,
      stock_amount: selectedProduct.stock_inout_amount,
      warehouse_id: selectedWarehouse.value,
      warehouse_name: selectedWarehouse.label,
      shipper_id: seletedShipper.value,
      shipper_name: seletedShipper.label,
      outstock_date: outStockDateStr,
      inout_on: inStockDate,
      idx: selectedProductArr.length + 1,
      packaging: packaging,
      handling_fee_rate: handlePrice,
      storage_fee_rate: storagePrice,
      category: 1,
    };
    selectedProductArr.push(newData);
    setPrepareProducts(selectedProductArr);
    initPrepareProductItem();
  };

  const updatePrepareProduct = () => {
    let oldData = prepareProducts.slice();
    const updateData = oldData.filter(
      (item) => item.product_id == selectedProduct.value
    )[0];

    updateData.amount = outStockAmount;
    updateData.outstock_date = dayjs
      .tz(new Date(outStockDate), "Asia/Tokyo")
      .format(dateFormat);

    setPrepareProducts(oldData);
    setEditMode("new");
  };
  const EditPrepareProduct = (stockInoutId) => {
    const oldData = prepareProducts.slice();
    const editData = oldData.filter(
      (data) => data.stock_inout_id == stockInoutId
    )[0];

    const url = API.get(
      productSetUrl(editData.warehouse_id, editData.shipper_id)
    ).then((res) => {
      // product_id, log_number, name, warehouse_fee_id
      const products = res.data.data.map((item) => {
        return {
          value: item.id,
          label: item.product_name,
          inout_on: item.inout_on,
          lot_number: item.lot_number,
          weight: item.weight,
          product_id: item.product_id,
          stock_inout_id: item.stock_inout_id,
          stock_inout_amount: item.stock_inout_amount,
        };
      });

      setProductOptions(products);
      setPrepareProductItem(editData);
      // setDiabledProduct(true);
      setEditMode("edit");
    });
  };
  const cancelEditProduct = () => {
    setEditMode("new");
    setOutStockAmount("");
  };

  const deletePrepareProduct = (stockInoutId) => {
    const newData = prepareProducts.slice();
    const delData = newData.filter(
      (data) => data.stock_inout_id == stockInoutId
    )[0];

    const index = newData.indexOf(delData);
    newData.splice(index, 1);
    setPrepareProducts(newData);
  };

  const savePrepareProducts = () => {
    API.post(saveStockInoutUrl, { stock_inout: prepareProducts })
      .then((res) => {
        setPrepareProducts([]);
        initPrepareProductItem();
        openNotificationWithIcon(
          "success",
          $lang.popConrimType.success,
          $lang.messages.success
        );
      })
      .catch((err) => {
        openNotificationWithIcon(
          "error",
          $lang.popConrimType.error,
          err.messages
        );
      });
  };
  useEffect(() => {
    getWarehouses();
    getShippers();
  }, []);

  useEffect(() => {
    if (
      seletedShipper.value != "" &&
      selectedWarehouse.value != "" &&
      editMode != "edit"
    ) {
      getProducts();
    }
  }, [seletedShipper, selectedWarehouse]);

  useEffect(() => {
    const shipper = shipperOptions.filter(
      (item) => item.value == seletedShipper.value
    );
    setShipperDescription({
      code: shipper.length > 0 ? shipper[0].code : "",
      closingDate: shipper.length > 0 ? shipper[0].closingDate : "",
    });
  }, [seletedShipper]);

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
              inStockDate: "",
              outStockAmount: "",
              stockAmount: "",
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
                  disabled={editMode == "edit"}
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
                  disabled={editMode == "edit"}
                />
                {shipperOptions.length > 0 && (
                  <span className="" style={{ marginLeft: 16 }}>
                    {$lang.inStock.shipper} :&nbsp;&nbsp;
                    {shipperDisctription.code} &nbsp;/ &nbsp;
                    {shipperDisctription.closingDate}
                  </span>
                )}{" "}
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
                    showSearch
                    placeholder={$lang.inStock.productName}
                    style={{ width: 200 }}
                    value={selectedProduct.value}
                    options={productOptions}
                    onChange={onChangeProduct}
                    defaultValue={{
                      value: "",
                      label: "",
                    }}
                    disabled={editMode == "edit"}
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
              <Col span={5} style={{ display: "flex" }}>
                <Space.Compact block className="ml-3">
                  <Input
                    style={{ width: 100 }}
                    placeholder={$lang.inStock.inStockDate}
                    value={inStockDate}
                    readOnly
                  />
                </Space.Compact>
                <Space.Compact className="ml-3">
                  <Input
                    type="number"
                    style={{ width: 100 }}
                    placeholder={$lang.outStock.stockAmount}
                    value={selectedProduct.stock_inout_amount}
                    readOnly
                  />
                  <Input
                    style={{ width: 100 }}
                    type="number"
                    placeholder={$lang.outStock.outStockAmount}
                    value={outStockAmount}
                    onChange={(e) => {
                      setOutStockAmount(e.target.value);
                    }}
                  />
                </Space.Compact>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={1}></Col>
              {is_edit === 1 ? (<Col span={6}>
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
              </Col>) : (<></>)}
            </Row>
          </Form>
        </Card>
        <Card
          style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
          className="py-4 my-2"
          bordered={false}
        >
          <OutStockTable
            data={prepareProducts}
            editRow={(key) => EditPrepareProduct(key)}
            deleteRow={deletePrepareProduct}
            pagination={false}
            is_edit={is_edit}
          ></OutStockTable>
          <div
            style={{
              justifyContent: "flex-end",
              display: "flex",
              marginTop: 15,
            }}
          >
            {is_edit === 1 ? (<CustomButton
              onClick={savePrepareProducts}
              title={$lang.buttons.confirmDeparture}
              visability={true}
            ></CustomButton>) : (<></>)}
          </div>
        </Card>
      </Content>
    </div>
  );
};

export default OutStockPage;
