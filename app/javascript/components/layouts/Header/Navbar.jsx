import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useMatch, Link } from "react-router-dom";
import { Typography, Breadcrumb } from "antd";
import { Layout, Menu, theme } from "antd";
import { siteInfo } from "../../../utils/content";

const navigations = [
  {
    label: "TOP",
    key: "/home",
  },
  {
    label: "入庫処理",
    key: "/in_process",
  },
  {
    label: "出庫処理",
    key: "/configout_process",
  },
  {
    label: "在庫管理",
    key: "/inventory_control",
  },
  {
    label: "入金処理",
    key: "/deposit_process",
  },
  {
    label: "請求処理",
    key: "/billing_process",
  },
  {
    label: "マスタ保守",
    key: "/maintenance",
    children: [
      {
        label: "品名一覧",
        key: "/product",
      },
      {
        label: "荷主一覧",
        key: "/shipper",
      },
      {
        label: "単価区分マスタ",
        key: "/warehouse_fee",
      },
    ],
  },
];

// const NavbarSection = () => {
//   const [currentMenu, setCurrentMenu] = useState({});
//   const [selectedKeys, setSelectedKeys] = useState([]);
//   const [title, setTitle] = useState("");
//   const { Header } = Layout;
//   const { Title } = Typography;
//   const navigate = useNavigate();
//   let flattenNavigations = [];

//   useEffect(() => {
//     flattenNavigations = navigations.reduce(
//       (a, b) => a.concat(b.children ? b.children : b),
//       []
//     );
//   }, []);

//   useEffect(() => {
//     console.log("FEFE", selectedKeys)
//   }, [selectedKeys])

//   const handleMenuClick = ({ key }) => {
//     const flattenNavigations = navigations.reduce(
//       (a, b) => a.concat(b.children ? b.children : b),
//       []
//     )
//     console.log("fwfwef", flattenNavigations)
//     const { url } = flattenNavigations.find((item) => item.key === key) || {};
//     const { label } = flattenNavigations.find((item) => item.key === key) || {};
//     setTitle(label);

//     if (url) {
//       navigate(url);
//     }

//     setSelectedKeys([key]);
//     setCurrentMenu({ key, label })
//   };


//   return (
//     <Layout>
//       <Header
//         style={{
//           display: "flex",
//           alignItems: "right",
//           backgroundColor: "#fff",
//         }}
//       >
//         <div className="demo-logo " style={{ marginRight: "100px" }}>
//           <Title level={4} style={{ marginTop: 15 }}>
//             {siteInfo.title}
//           </Title>
//         </div>
//         <Menu
//           theme="light"
//           mode="horizontal"
//           selectedKeys={selectedKeys}
//           items={navigations}
//           style={{ flex: 1, minWidth: 0 }}
//           onClick={handleMenuClick}
//         />
//       </Header>
//       <NewHeader />
//       <Breadcrumb
//         items={[
//           {
//             title,
//           },
//         ]}
//         style={{ padding: "10px 50px " }}
//       />
//     </Layout>
//   );
// };

// export default NavbarSection;

const NavbarSection = () => {

  const { Title } = Typography;
  const { Header } = Layout;

  const navigate = useNavigate();
  const [current, setCurrent] = useState('');
  const [title, setTitle] = useState('')

  const onMenuClick = (e) => {
    const flattenNavigations = navigations.reduce(
      (a, b) => a.concat(b.children ? b.children : b),
      []
    )
    const { label } = flattenNavigations.find((item) => item.key === e.key) || {};
    setTitle(label);
    setCurrent(e.key);
    navigate(e.key)
  };
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "right",
          backgroundColor: "#fff",
        }}
      >
        <div className="demo-logo " style={{ marginRight: "100px" }}>
          <Title level={4} style={{ marginTop: 15 }}>
            <Link to='home'>{siteInfo.title}</Link>
          </Title>
        </div>
        <Menu
          onClick={onMenuClick}
          selectedKeys={[current]}
          mode="horizontal"
          style={{ flex: 1, minWidth: 0 }}
          items={navigations}
        />
      </Header>
      <Breadcrumb
        items={[
          { title },
        ]}
        style={{ padding: "10px 50px " }}
      />
    </Layout>

  );

}

export default NavbarSection