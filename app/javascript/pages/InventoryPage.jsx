// import React from "react";
// import { Form, Layout, Select, Space, Input, DatePicker, Divider, Button } from "antd";

// import NavbarSection from "../components/layouts/Header/Navbar";
// // import FooterSection from "../components/layouts/Footer/Index";
// // import IncomeTable from "../components/Income/IncomeTable";
// import localeJP from "antd/es/date-picker/locale/ja_JP";
// import messages from "../utils/content/jp.json";
// import { useState,  useEffect } from "react";


// const InventoryPage = () => {


//     const [data, setData] = useState([]);

//     const [storeVal, setStoreVal] = useState(storeOptions[0]);
//     const [shipperVal, setShipperVal] = useState(shipperOptions[0]);
//     const [receiptDate, setReceiptDate] = useState();
//     // const [searchResult, setSearchResult] = useState({});

//     // const handleSubmit = (e) = {

//     // };

//     const selStoreChange = (value) => {
//         setStoreVal(storeOptions[value]);
//     };

//     const selShipperChange = (value) => {
//         setShipperVal(shipperOptions[value]);
//     }

//     const onChangeDate = (date, dateString) => {
//         setReceiptDate(dateString);
//     };

//     // const onSearch = (value, _e, info) => {
//     //     const result = products.filter(product => product.product_id == value)[0];
//     //     console.log(result);
//     //     setSearchResult(result);
//     // }


//     return( 
//     <div>
//       <NavbarSection />
//         <Content
//             style={{ width: 1024 }}
//             className="mx-auto flex flex-col justify-content content-h"
//             >
//             <div
//             name="basic"
//             initialValues={{ remember: true }}
//             autoComplete="off"
//             style={{ margin: "50px 0 0px 0" }}
//             >
//             <Space style={{ display:"flex", flexDirection: "column", alignItems:"flex-start", }}>
//                 <Form.Item
//                 label={messages.IncomePageJp.warehouse}
//                 name="username"
//                 style={{ display: "inline-block", width: 200, marginBottom: 0 }}
//                 >
//                 <Select
//                     defaultValue={storeVal.label}
//                     onChange={selStoreChange}
//                     style={{ width: 140, marginLeft: 14 }}
//                     options={storeOptions}
//                 />
//                 </Form.Item>
//                 <Form.Item
//                 label={messages.IncomePageJp.shipper}
//                 name="username"
//                 style={{ display: "", width: 500, marginBottom: 0, flexFlow: "nowrap" }}
//                 >
//                 <Select
//                     defaultValue={shipperVal.label}
//                     style={{ width: 300, marginLeft: 14  }}
//                     onChange={selShipperChange}
//                     options={shipperOptions}
//                 />
//                 </Form.Item>
//                 <Form.Item
//                 label={messages.IncomePageJp.receiptDate}
//                 name="username"
//                 style={{
//                     display: "inline-block",
//                     width: 250,
//                     marginLeft: 0,
//                     marginBottom: 0,
//                 }}
//                 >
//                 <DatePicker value={receiptDate} onChange={onChangeDate} locale={localeJP} />
//                 </Form.Item>
//             </Space>
//             </div>
//         </Content>
//     </div>
//     )
// };

// export default InventoryPagePage;

