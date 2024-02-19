import React, { useState, useEffect } from "react";
import messages from "../utils/content/jp.json";
import ClientTable from "../components/Client/ClientTable";
import { Button } from 'antd';
import { makeHttpReq, makeHttpOptions } from "../utils/helper";
import { getUserAuthURL, getClientPageURL } from "../utils/contants";
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const ClientPage = () => {
  const [userAuthData, setUserAuthData] = useState([]);
  const [clientPageData, setClientPageData] = useState([]);

  const getAllUserAuth = () => {
    makeHttpReq(makeHttpOptions({}, "get", getUserAuthURL))
      .then((res) => {
        setUserAuthData(res.data.data.map((item, index) => ({ ...item, key: index + 1 })));
      })
      .catch((error) => {
        console.error("Error fetching user auth data:", error);
      });
  };

  const getAllClientPage = () => {
    makeHttpReq(makeHttpOptions({}, "get", getClientPageURL))
      .then((res) => {
        setClientPageData(res.data.data.map((item, index) => ({ ...item, key: index + 1 })));
      })
      .catch((error) => {
        console.error("Error fetching client page data:", error);
      });
  };

  const sendCheckbox = () => {
    // Handle checkbox save functionality
  };

  const tabItems = userAuthData.map((row, rowIndex) => ({
    key: `${rowIndex + 1}`,
    tab: row.name,
  }));


  const handleTabChange = (key) => {
    
  }

  useEffect (()=> {
    getAllUserAuth();
    getAllClientPage();
  }, []);

  return (
    <>
      <Button onClick={sendCheckbox}>{messages.buttons.save}</Button>
      <div style={{ display: "flex", gap: "100px", alignItems: "center", justifyContent: "center" }}>
        <Tabs defaultActiveKey="1" tabPosition="left" onChange={handleTabChange} >
          {userAuthData.map((row, rowIndex) => (
            <TabPane tab={row.name} key={rowIndex + 1}>
            </TabPane>
          ))}
        </Tabs>
        <div>
          <ClientTable
            data = {clientPageData}
          />
        </div>
      </div>
    </>
  );
};

export default ClientPage;
