import React, { useState, useEffect  }  from "react";
import axios from "axios";
import { Form, Layout, Select, Space, Input, DatePicker, Divider, Button,  notification } from "antd";
import NavbarSection from "../components/layouts/Header/Navbar";
import FooterSection from "../components/layouts/Footer/Index";
import IncomeTable from "../components/Income/IncomeTable";
import messages from "../utils/content/jp.json";
import moment from "moment";
import $ from "jquery";

const { Search } = Input;
const { Content } = Layout;

const IncomePage = () => {

  const [insertProducts, setInsertProducts] = useState([]);
  const [allData, setAllData] = useState([]);

  // ---------WarehouseName--------
  const [warehouseId, setWarehouseId] = useState();
  const [warehouseOptions, setWarehouseOptions] = useState([]);

  const [storeVal, setStoreVal] = useState();
  const [shipperVal, setShipperVal] = useState();

  // ------------ShipperName-----------
  const [shipperId, setShipperId] = useState();
  const [shipperOptions, setShipperOptions] = useState();

  // ------------productNumber--------------
  const [proNumber, setProNumber] = useState();  
  const [productNumber, setProductNumber] = useState('');
  
  // ----------------Openday--------------
  const [receiptDate, setReceiptDate] = useState(moment('2024-02-16'));

  // ---------productName----------
  const [insertProduct, setInsertProduct] = useState({id: "", name: ""});
  const [productOptions, setProductOptions] = useState('');
  
  const [priceId, setPriceId] = useState();
  const [price, setPrice] = useState();

  // -----------packing---------
  const [packaging, setPackaging] = useState();

  // --------storagePrice-------
  const [storagePrice, setStoragePrice] = useState();

  // ----------handlePrice------------
  const [handlePrice, setHandlePrice] = useState();

  // -------------lotNumber-----------
  const [lotNumber, setLotNumber] = useState();

  // ---------------weight---------------
  const [weight, setWeight] = useState();

  // -------------stock--------------
  const [stock, setStock] = useState();

  const [btnName, setBtnName] = useState('messages.IncomePageJp.addition');

  const selWarehouseChange = (value, option) => {
    setWarehouseId(option.id);
  };

  const selShipperChange = (value, option) => {
    setShipperId(option.id);
  };
  
  const onChangeName = (value, option) => {
      setInsertProduct({id:option.id, name: value});
      axios.get(`http://127.0.0.1:3000/api/product_dd?id=${option.id}`).
      then((res) => {
        setPackaging(res.data.data.data.attributes.warehouse_fee.packaging)
        setStoragePrice(res.data.data.data.attributes.warehouse_fee.storage_fee_rate)
        setHandlePrice(res.data.data.data.attributes.warehouse_fee.handling_fee_rate)
      })
  };
  
  
  
  //  -------Get warehouse names--------
  const getWarehouse = () => {
    axios.get('http://127.0.0.1:3000/api/warehouse').then((res) => {
      let index = 0
      const warehouses = res.data.data.map((item) => {
        return {
          value: item.name,
          label: item.name,
          key: index++,
          id: item.id
        };
      });
      setWarehouseOptions(warehouses);
    })
  }
  
  // --------Get shipper data--------
  const getAllShipper = () => {
    axios.get('http://127.0.0.1:3000/api/shipper').then((res) => {
      
      let index = 0
      const shipperName = res.data.data.map((item) => {
        return {
          value:item.name,
          label : item.name,
          key: index++,
          id: item.id
        };
      });
      setShipperOptions(shipperName);
    })
  };
  
  // ----------Get product data-----------
  const getAllProduct = () => {
    axios.get('http://127.0.0.1:3000/api/product').then((res) => {
      let index = 0
      const productData = res.data.data.map((item) => {
        return {
          ...item,
          key: index++,
        };
      });
      const numberData = res.data.data.map((item) => {
        return {
          value: item.data.attributes.name,
          label: item.data.attributes.name,
          key: index++,
          id: item.data.attributes.id
        }
      })
      
      setProductOptions(numberData);
      setAllData(productData);
      
    });
  };
  
  
  // ------------Get warehouse fees-----------
  const getWarehouseFee = () => {
    axios.get('http://127.0.0.1:3000/api/warehouse_fee').then((res) => {
      let index = 0
      const priceIds = res.data.data.map(item => {
        return {
          ...item,
          item: item.id,
          key: index++
        }
      })
      setPriceId(priceIds)
    })
  }  

  const insertData = () => {
    let insertProductArr = insertProducts.slice();
    const newData = {
      handling_fee_rate : handlePrice,
      storage_fee_rate : storagePrice,
      product_id : insertProduct.id,
      product_name : insertProduct.name,
      product_type : packaging,
      catagory : 0,
      lotNumber : lotNumber,
      weight : weight,
      stock : stock,
      warehouse_id : warehouseId,
      shipper_id : shipperId,
      inout_on : receiptDate,
      key: insertProductArr.length+1
    };
    console.log(newData);
    
    insertProductArr.push(newData);
    
    setInsertProducts(insertProductArr);

    setHandlePrice('');
    setLotNumber('');
    setStock('');
    setStoragePrice('');
    setPackaging('');
    setInsertProduct('');
    setWeight('');
  };
  
  const editRow = (id) => {
    console.log($("#sel_warehouse"));
    const newData = insertProducts.slice();
    const editData = newData.filter((data) => data.product_id == id)[0];
    const index = newData.indexOf(editData);
    console.log(insertProducts[index]);
    setLotNumber(insertProducts[index].lotNumber);
    setStock(insertProducts[index].stock);
    setWeight(insertProducts[index].weight);
    setPackaging(insertProducts[index].product_type);
    setHandlePrice(insertProducts[index].handling_fee_rate);
    setStoragePrice(insertProducts[index].storage_fee_rate);
    // setWarehouseId(insertProducts[index].warehouse_id);
    // setShipperId(insertProducts[index].shipper_id);
    // setInsertProduct(insertProducts[index].name);
    // setInsertProduct(insertProducts[index].id);
    setReceiptDate(insertProducts[index].inout_on);
  }
  
  
  const deleteRow = (id) => {
    const newData = insertProducts.slice();
    const delData = newData.filter((data) => data.product_id == id)[0];
    const index = newData.indexOf(delData);
    newData.splice(index, 1);
    setInsertProducts(newData);
  }

  const handleSubmit = () => [
    axios.post('http')
  ]
  // ----------When rerender, get all data------
  useEffect(() => {
    getWarehouse();
    getAllShipper();
    getAllProduct();
    getWarehouseFee('');  
  }, [weight])
  
  return (
    <div>
      <NavbarSection />
      <Content
        style={{ width: 1280 }}
        className="mx-auto flex flex-col justify-content content-h"
        >
        <div
          name="basic"
          autoComplete="off"
          style={{ margin: "50px 0 0px 0" }}
          >
          <Space style={{ display:"flex", flexDirection: "column", alignItems:"flex-start", }}>
            <Form.Item
              label={messages.IncomePageJp.warehouse}
              name="username"
              style={{ display: "inline-block", width: 200, marginBottom: 10 }}
              >
              <Select
                id="sel_warehouse"
                placeholder={messages.IncomePageJp.warehouse}
                onChange={selWarehouseChange}
                style={{ width: 140, marginLeft: 14 }}
                value={warehouseId}
                options={warehouseOptions}
              />
            </Form.Item>
            <Form.Item
              label={messages.IncomePageJp.shipper}
              name="username"
              style={{ display: "", width: 500, marginBottom: 10, flexFlow: "nowrap" }}
            >
              <Select
                style={{ width: 300, marginLeft: 14  }}
                onChange={selShipperChange}
                options={shipperOptions}
                value={shipperId}
                placeholder={messages.IncomePageJp.shipper}
              />
            </Form.Item>
            <Form.Item
              label={messages.IncomePageJp.receiptDate}
              name="username"
              style={{
                display: "inline-block",
                width: 350,
                marginLeft: 0,
                marginBottom: 0,
              }}
            >
              <DatePicker
                value={receiptDate} 
                onChange={(date, dateStr) => {
                  setReceiptDate(dateStr)}} 
                placeholder={messages.IncomePageJp.receiptDate}
              />
            </Form.Item>
          </Space>
          <Divider />
          {/* <div style={{ height: 0}}>
            <Space direction="horizontal" style={{ margin: "0" }}>
              <Form.Item
                label={messages.IncomePageJp.productNumber}
                name="username"
                style={{
                  display: "none",
                  width: 350,
                  marginBottom: 0,
                }}
              >
                <Select
                  placeholder={messages.IncomePageJp.productNumber}
                  style={{marginLeft: 15 }}
                  options={productOptions}
                  value={insertProduct}
                  onChange={onChangeNumber}
                  // onSelect={handleSearch}
                />
              </Form.Item>
            </Space>
          </div> */}
          <div>
            <Space direction="horizontal" style={{ margin: "0 0 20px 0" }}>
              <Form.Item
                label={messages.IncomePageJp.productName}
                name="username"
                style={{
                  display: "inline-block",
                  width: 250,
                  marginBottom: 0,
                }}
              >
                {/* <Space.Compact> */}
                  <Select
                    placeholder={messages.IncomePageJp.productName}
                    style={{marginLeft: 15,}}
                    value={insertProduct.id}
                    options={productOptions}
                    onChange={onChangeName}
                  />
                {/* </Space.Compact> */}
              </Form.Item>
              <Form.Item
                label={messages.IncomePageJp.packing}
                name="username"
                style={{
                  display: "inline-block",
                  width: 250,
                  marginLeft: 30,
                  marginBottom: 0,
                }}
              >
                <Space.Compact>
                  <Input 
                    style={{width: 150,}} 
                    placeholder={messages.IncomePageJp.packing}
                    value = {packaging}
                    onChange={(e) => {setPackaging(e.target.value)}}
                  />                
                </Space.Compact>
              </Form.Item>
              <Form.Item
                name="username"
                style={{
                  display: "inline-block",
                  width: 450,
                  marginLeft: 30,
                  marginBottom: 0,
                }}
              >
                <Space.Compact>
                  <Input 
                    style={{width: 100}} 
                    placeholder={messages.IncomePageJp.cargoPrice}
                    value = {storagePrice} 
                    onChange={(e) => {setStoragePrice(e.target.value)}}
                  />
                  <Input 
                    style={{width: 100}} 
                    placeholder={messages.IncomePageJp.storagePrice} 
                    value={handlePrice}
                    onChange={(e) => {setHandlePrice(e.target.value)}}
                  />
                </Space.Compact>
              </Form.Item>
            </Space>
            <Space>
              <Form.Item
                style={{
                  display: "inline-block",
                  width: 400,
                  marginLeft: 55,
                  marginBottom: 0,
                }}
              >
                <Input 
                  style={{ width: 150 }} 
                  placeholder={messages.IncomePageJp.lotNumber} 
                  value={lotNumber} 
                  onChange={(e) => {
                    setLotNumber(e.target.value);
                  }}
                />
                <Input 
                  style={{ width: 100 }} 
                  placeholder={messages.IncomePageJp.weight+"(kg)"} 
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                  }}
                />
                <Input 
                  style={{ width: 100 }} 
                  placeholder={messages.IncomePageJp.itemNumber} 
                  value={stock}
                  onChange={(e) => {
                    setStock(e.target.value);
                  }}
                />
              </Form.Item>
              <Button 
                onClick={ insertData } 
                style={{fontWeight: "bold", width: "100px", fontSize: "15px"}}
                >
              </Button>
            </Space>
          </div>
          <Divider />
        </div>
        <IncomeTable
          data={insertProducts}
          editRow={editRow}
          deleteRow={deleteRow}
          pagination={false}
        />
        <div style={{height:15}}></div>
        <div style={{justifyContent: "flex-end", display: "flex"}}>
          <Button style={{width: 150,}}>
            {messages.buttons.csvExchange}
          </Button>
          <div style={{width: 40}}></div>
          <Button style={{width: 150,}} 
          onSubmit={(e) => {
          handleSubmit(e);
        }}>
            {messages.buttons.confirmDeparture}
          </Button>
      </div>
      </Content>
      <FooterSection />
    </div>
  );
};

export default IncomePage;
