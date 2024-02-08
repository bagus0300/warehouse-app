import React from "react";
import { Form, Layout, Select, Space, Input, DatePicker, Divider, Button, Modal} from "antd";

import NavbarSection from "../components/layouts/Header/Navbar";
import FooterSection from "../components/layouts/Footer/Index";
import DepositTable from "../components/Deposit/DepositTable";
import localeJP from "antd/es/date-picker/locale/ja_JP";
import messages from "../utils/content/jp.json";
import { useState } from "react";

const { Search } = Input;
const { Content } = Layout;


const DepositPage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    



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
                    <div>
                        <Button onClick={showModal}>{messages.buttons.signUp}</Button>
                        <Modal title={messages.Modal.depositRegist} open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={[
                            <Button key="ok" onClick={handleOk}>
                                {messages.buttons.change}
                            </Button>,
                            <Button key="cancel" onClick={handleCancel}>
                                {messages.buttons.delete}
                            </Button>
                            ]}>
                            <div>
                                {/* <Input name='shipperId' label={messages.Modal.shipperId} /> */}
                                <Form.Item
                                label={messages.Modal.shipperId}
                                name="shipperId"
                                style={{ display: "inline-block", width: 300, marginBottom: 0 }}
                                >
                                    <Select
                                        // defaultValue={storeVal.label}
                                        style={{ width: 150, marginLeft: 45 }}
                                        // onChange={selStoreChange}
                                        // options={storeOptions}
                                    />
                                </Form.Item>
                                <Form.Item
                                label={messages.DepositPage.shipperName}
                                name="shipperName"
                                style={{ display: "", width: 400, marginBottom: 0, flexFlow: "nowrap" }}
                                >
                                    <Input
                                        // defaultValue={shipperVal.label}
                                        style={{ width: 200, marginLeft: 43  }}
                                        // onChange={selShipperChange}
                                        // options={shipperOptions}
                                    />
                                </Form.Item>
                                <Divider/>
                                <Form.Item
                                name="depositDate"
                                label={messages.Modal.depositDate}
                                style={{
                                    display: "inline-block",
                                    width: 400,
                                    marginBottom: 0,
                                }}
                                >
                                    <DatePicker placeholder={messages.Modal.depositDate} style={{marginLeft: 15, width: 150}} locale={localeJP} />
                                </Form.Item>
                                <Form.Item
                                label={messages.Modal.depositAmount}
                                name="shipperName"
                                style={{ display: "", width: 400, marginBottom: 0, flexFlow: "nowrap" }}
                                >
                                    <Input
                                        // defaultValue={shipperVal.label}
                                        style={{ width: 150, marginLeft: 43 }}
                                        // onChange={selShipperChange}
                                        // options={shipperOptions}
                                    />
                                </Form.Item>
                            </div>
                        </Modal>
                    </div>
                    <div style={{ height: 50}}></div>
                    <Form.Item
                    label={messages.DepositPage.payDay}
                    name="username"
                    style={{
                        display: "inline-block",
                        width: 800,
                        marginLeft: 0,
                        marginBottom: 0,
                    }}
                    >
                        <DatePicker placeholder={messages.DepositPage.payDayFrom}  locale={localeJP} />
                        <span>～</span>
                        <DatePicker placeholder={messages.DepositPage.payDayTo}  locale={localeJP} />
                    </Form.Item>
                    <div style={{ height: 15 }}></div>
                    <Form.Item
                    label={messages.IncomePageJp.shipper}
                    name="username"
                    style={{ display: "", width: 300, marginBottom: 0, flexFlow: "nowrap" }}
                    >
                        <Select
                            // defaultValue={shipperVal.label}
                            style={{ width: 200, marginLeft: 14  }}
                            placeholder={messages.DepositPage.shipperName}
                            // onChange={selShipperChange}
                            // options={shipperOptions}
                        />
                    </Form.Item>
                    <div style={{ height: 15 }}></div>
                    <Form.Item
                    label={messages.DepositPage.processingDate}
                    name="username"
                    style={{
                        display: "inline-block",
                        width: 1000,
                        marginLeft: 0,
                        marginBottom: 0,
                    }}
                    >
                        <DatePicker placeholder={messages.DepositPage.processingDateFrom}  locale={localeJP} />
                        <span>～</span>
                        <DatePicker placeholder={messages.DepositPage.processingDateTo}   locale={localeJP} />
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