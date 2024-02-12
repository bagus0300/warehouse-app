import React from "react";
import { Form, Layout, Select, Space, Input, DatePicker, Divider, Button, notification } from "antd";

import NavbarSection from "../components/layouts/Header/Navbar";
import FooterSection from "../components/layouts/Footer/Index";
import IncomeTable from "../components/Income/IncomeTable";
// import localeJP from "antd/es/date-picker/locale/ja_JP";
import messages from "../utils/content/jp.json";
import { useState, useEffect  } from "react";
import axios from "axios";

const { Search } = Input;
const { Content } = Layout;

const IncomePage = () => {

  // backend data start

  const storeOptions = [
    {value: 0, label: "一般倉庫"},
    {value: 1, label: "編集"},
    {value: 2, label: "削除"},
    {value: 3, label: "代替テキスト"}
  ];

  

  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);

  const [storeVal, setStoreVal] = useState(storeOptions[0]);
  const [shipperVal, setShipperVal] = useState();
  const [receiptDate, setReceiptDate] = useState();
  const [proNumber, setProNumber] = useState();  
  const [searchResult, setSearchResult] = useState({});
  const [name, setName] = useState();
  const [openDay, setOpenDay] = useState();
  const [productName, setProductName] = useState('');
  const [productNumber, setProductNumber] = useState('');
  const [price, setPrice] = useState();
  const [priceId, setPriceId] = useState();
  const [productPacking, setProductPacking] = useState('');
  const [productUnitPriceId, setProductUnitPriceId] = useState('');



  const selStoreChange = (value) => {
    setStoreVal(storeOptions[value]);
  };

  const selShipperChange = (value) => {
    setShipperVal(value);
  }

  const onChangeDate = (value, dataString) => {
    setReceiptDate(value);
  };

  const onSearch = (value) => {
    setProNumber(value);
  }

  const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());



  const editRow = (idx) => {
    console.log('edit', idx);
  }

  
  const deleteRow = (id) => {
    const newData = data.slice();
    console.log('delete', id);
    const delData = newData.filter((data) => data.product_id == id)[0];
    console.log(delData);
    const index = newData.indexOf(delData);
    console.log('========',index);
    newData.splice(index, 1);
    console.log('========',newData);
    setData(newData);
  }


  const insertData = () => {
    const newData = data.slice();
    newData.push(searchResult);
    setData(newData);
    console.log(data);
  };

  
 
      
      
  const getAllShipper = () => {
    axios.get('http://127.0.0.1:3000/api/shipper').then((res) => {

      let index = 0
      const shipperName = res.data.data.map((item) => {
        return {
          value:item.name,
          label : item.name,
          key: index++,
        };
      });
      
      const day = res.data.data.map((item) => {
        return {
          value:item.created_at,
          label : item.created_at,
          key: index++,
        };
      });
      
      
      setName(shipperName);
      setOpenDay(day);
    })
  };
  
  const getAllProduct = () => {
    axios.get('http://127.0.0.1:3000/api/product').then((res) => {
      console.log(res.data.data, "1234")
      let index = 0
      const productData = res.data.data.map((item) => {
        return {
          ...item,
          key: index++,
        };
      });

      const number1 = res.data.data.map((item) => {
        return {
          value: item.data.attributes.name,
          label: item.data.attributes.name,
          key: index++
        }
      })

      console.log(number1, "123445555555555")
      setProductNumber(number1);
      console.log(productData,  "1111111111111")
      setAllData(productData);

    });
  };

  const getAllPrice = () => {
    axios.get('http://127.0.0.1:3000/api/unit_price').then((res) => {
      let index = 0
      const priceData = res.data.data.map((item) => {
        return {
          ...item,
          key: index++
        };
      });
      setPrice(priceData);
      const priceIds = priceData.map(item => {
        console.log(item.id,  "======")
        item.id
      })
      setPriceId(priceIds)
    })
  }  
  const handleSearch = () => {

    if (productName && productNumber && productPacking && productUnitPriceId) {
      axios.post('http://127.0.0.1:3000/api/product', {
        name: name,
        number: productNumber,
        packing: productPacking,
        unit_price_id: productUnitPriceId,
      })
      console.log(name, "1231434231")
        .then((res) => {
          notification.success({ message: "Success"})
          setProductName(productName);
          setProductNumber(productNumber);
          setProductPacking(productPacking);
          setProductUnitPriceId(productUnitPriceId);
        })
    };
  };

  useEffect(() => {
    // getWareHouseName();
    getAllShipper();
    getAllProduct();
    getAllPrice();
  }, [])

  return (
    <div>
      <NavbarSection />
      <Content
        style={{ width: 1280 }}
        className="mx-auto flex flex-col justify-content content-h"
      >
        <div
          name="basic"
          initialValues={{ remember: true }}
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
                placeholder={messages.IncomePageJp.warehouse}
                defaultValue={storeVal.label}
                onChange={selStoreChange}
                style={{ width: 140, marginLeft: 14 }}
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
                options={name}
                value={shipperVal}
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
              <Select 
                value={receiptDate} 
                onChange={onChangeDate} 
                options={openDay}
                placeholder={messages.IncomePageJp.receiptDate}
              />
            </Form.Item>
          </Space>
          <Divider />
          <div>
            <Space direction="horizontal" style={{ margin: "0 0 20px 0" }}>
              <Form.Item
                label={messages.IncomePageJp.productNumber}
                name="username"
                style={{
                  display: "inline-block",
                  width: 350,
                  marginBottom: 0,
                }}
              >
                <Select
                  placeholder={messages.IncomePageJp.productNumber}
                  // allowClear
                  style={{marginLeft: 15 }}
                  // enterButton="検索"
                  options={productNumber}
                  value={proNumber}
                  onSearch={onSearch}
                  onSelect={handleSearch}
                />
              </Form.Item>
            </Space>
          </div>
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
                <Space.Compact>
                  <Input 
                    placeholder={messages.IncomePageJp.productName}
                    style={{marginLeft: 15,}}
                    onChange={(e)=> {setProductName(e.target.value)}}/>
                </Space.Compact>
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
                  <Input placeholder={messages.IncomePageJp.packing} 
                  onChange={(e)=> {setProductNumber(e.target.value)}}/>
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
                    style={{width: 100,}} 
                    placeholder={messages.IncomePageJp.cargoPrice} 
                    onChange={(e)=> {setProductPacking(e.target.value)}}/>
                  <Input style={{width: 80}}/>
                  <Input style={{width: 100}} placeholder={messages.IncomePageJp.storagePrice} 
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
                <Input style={{ width: 150 }} placeholder={messages.IncomePageJp.lotNumber} value={searchResult.lotNumber} />
                <Input style={{ width: 100 }} placeholder={messages.IncomePageJp.weight+"(kg)"} value={searchResult.weight}/>
                <Input style={{ width: 100 }} placeholder={messages.IncomePageJp.itemNumber} value={searchResult.stock}/>
              </Form.Item>
              <Button onClick={ insertData } style={{fontWeight: "bold", width: "100px", fontSize: "15px"}}>{messages.IncomePageJp.addition}</Button>
            </Space>
          </div>
          <Divider />
        </div>
        <IncomeTable
          data={data}
          editRow={editRow}
          deleteRow={deleteRow}
          pagination={false}
        />
        <div style={{height:15}}></div>
        <div style={{justifyContent: "flex-end", display: "flex"}}>
          <Button style={{width: 150,}}>{messages.buttons.csvExchange}</Button>
          <div style={{width: 40}}></div>
          <Button style={{width: 150,}} >{messages.buttons.confirmDeparture}</Button>
      </div>
      </Content>
      <FooterSection />
    </div>
  );
};

export default IncomePage;
