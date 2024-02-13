import React, { useState, useEffect } from "react";
import { Form, Layout, Select, Space, Input, DatePicker, Divider, Button, Modal} from "antd";
import axios from 'axios';
import { makeHttpReq, makeHttpOptions } from "../utils/helper";
import NavbarSection from "../components/layouts/Header/Navbar";
import FooterSection from "../components/layouts/Footer/Index";
import DepositTable from "../components/Deposit/DepositTable";
import localeJP from "antd/es/date-picker/locale/ja_JP";
import messages from "../utils/content/jp.json";
import {
    shipperURL,
  } from "../utils/contants";

const { Search } = Input;
const { Content } = Layout;


const DepositPage = () => {

// ----------Modal---------
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleOK = () => {
      setIsModalOpen(false);
      initDataValue();
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    // -----------Modal Value------------
    const [shipperId, setShipperId] = useState();
    const [shipperOptions, setShipperOptions] = useState();
    const selShipperChange = (value, option) => {
        setShipperId(value);
        console.log(value,"wwwwwwwww")
    }
    
    const [depositDate, setDepositDate] = useState();
    const selDepositDate = (value) => {
        setDepositDate(value);
        console.log(value,"wwwwwwwww");
    }
    
    
    const [amount, setAmount] = useState();
    const selAmount = (value) => {
        setAmount(value);
        console.log(value,"wwwwwwwww");
    }    

    // -------Initize modal values when we click save button-------
    const initDataValue = () =>{
        setShipperId('');
        setDepositDate('');
        setAmount('');
    }
    
    
    // ------Get shipperId and shipperName for select value------
    const getAllShipper = () => {
        makeHttpReq(makeHttpOptions({}, "get", shipperURL)).then((res) => {
          
          let index = 0
          const shipper = res.data.data.map((item) => {
            return {
              value:item.name,
              label : item.name,
              key: index++,
              id: item.id
            };
          });
          setShipperOptions(shipper);
        })
    };


    const data = () => {
        
    }

// ----------Modal End------------

    useEffect(() => {
        getAllShipper();
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
                    autoComplete="off"
                    style={{ margin: "50px 0 0px 0" }}
                >
                    <div>
                        <Button style={{ width: 120 }} onClick={showModal}>{messages.buttons.register}</Button>
                        <Modal 
                        title={messages.buttons.register} 
                        open={isModalOpen}
                        onOk={handleOK}
                        onCancel={handleCancel}
                        footer={[
                            <Button onClick={handleOK}>
                                {messages.buttons.save}
                            </Button>,
                            <Button  key="cancel" onClick={handleCancel}>
                                {messages.buttons.cancel}
                            </Button>
                            ]}>
                            <Form>
                                <Form.Item
                                label={messages.Maintenance.shipperName}
                                style={{ display: "", width: 300, marginBottom: 0, flexFlow: "nowrap" }}
                                >
                                    <Select
                                        style={{ width: 200, marginLeft: 43  }}
                                        options={shipperOptions}
                                        value={shipperId}
                                        onChange={selShipperChange}
                                    />
                                </Form.Item>
                                <Divider/>
                                <Form.Item
                                label={messages.DepositPage.depositDate}
                                style={{
                                    display: "inline-block",
                                    width: 400,
                                    marginBottom: 0,
                                }}
                                >
                                    <Input
                                        type="date"
                                        placeholder={messages.DepositPage.depositDate} 
                                        style={{marginLeft: 15, width: 200}} 
                                        value={depositDate}
                                        onChange={(e) => selDepositDate(e.target.value)}
                                    />
                                </Form.Item>
                                <div style={{ height: 20 }}></div>
                                <Form.Item
                                label={messages.DepositPage.amount}
                                style={{ display: "", width: 400, marginBottom: 0, flexFlow: "nowrap" }}
                                >
                                    <Input
                                        style={{ width: 200, marginLeft: 43 }}
                                        value={amount}
                                        type="number"
                                        onChange={(e) => selAmount(e.target.value)}
                                    />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                    <div style={{ height: 50}}></div>
                    <Form.Item
                    label={messages.DepositPage.received_on}
                    style={{
                        display: "inline-block",
                        width: 800,
                        marginLeft: 0,
                        marginBottom: 0,
                    }}
                    >
                        <DatePicker 
                        placeholder={messages.DepositPage.received_onFrom}  
                        locale={localeJP} />
                        <span>～</span>
                        <DatePicker 
                        placeholder={messages.DepositPage.received_onTo}  
                        locale={localeJP} />
                    </Form.Item>
                    <div style={{ height: 15 }}></div>
                    <Form.Item
                    label={messages.IncomePageJp.shipper}
                    // name="username"
                    style={{ display: "", width: 300, marginBottom: 0, flexFlow: "nowrap" }}
                    >
                        <Select
                            // defaultValue={shipperVal.label}
                            style={{ width: 200, marginLeft: 14  }}
                            placeholder={messages.Maintenance.shipperName}
                            // onChange={selShipperChange}
                            // options={shipperOptions}
                        />
                    </Form.Item>
                    <div style={{ height: 15 }}></div>
                    <Form.Item
                    label={messages.DepositPage.processing_on}
                    // name="username"
                    style={{
                        display: "inline-block",
                        width: 1000,
                        marginLeft: 0,
                        marginBottom: 0,
                    }}
                    >
                        <DatePicker 
                        placeholder={messages.DepositPage.processing_onFrom} 
                         locale={localeJP} />
                        <span>～</span>
                        <DatePicker placeholder={messages.DepositPage.processing_onTo}   locale={localeJP} />
                        <Button style={{width: 120, marginLeft: 60}}>{messages.IncomePageJp.search}</Button>
                        <Button style={{width: 150, marginLeft: 60}}>{messages.buttons.csvExchange}</Button>
                    </Form.Item>
                </div>
                <Divider/>
                <DepositTable/>
                <div style={{    display: "flex", marginTop: 20, justifyContent: "flex-end"}}>
                    <Button style={{width: 120, }}>{messages.buttons.next}</Button>
                </div>
            </Content>
            <FooterSection />
        </div>
    );
};

export default DepositPage;