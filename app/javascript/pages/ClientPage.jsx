import React, { useState, useEffect } from "react";
import messages from "../utils/content/jp.json";
import ClientTable from "../components/Client/ClientTable";
import { Button } from 'antd';
import { makeHttpReq, makeHttpOptions } from "../utils/helper";
import { getUserAuthURL, getClientPageURL, getAuthDataURL, setAuthDataURL } from "../utils/contants";
import { Tabs } from 'antd';
import CustomButton from "../components/common/CustomButton";

const { TabPane } = Tabs;

const ClientPage = () => {

  const [userAuthData, setUserAuthData] = useState([]);
  const [clientPageData, setClientPageData] = useState([]);
  const [allAuthData, setAllAuthData] = useState([]);
  const [authorityId, setAuthorityId] = useState(1);
  const [isClick, setIsClick] = useState(false);

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
        setClientPageData(res.data.data.map((item, index) => ({
            id: item.id,
            name: item.name,
            path: item.path,
            key: index+1,
            is_read: false,
            is_edit: false,
          })
        ));
      })
      .catch((error) => {
        console.error("Error fetching client page data:", error);
      });
  };

  const getAuthData = () => {
    makeHttpReq(makeHttpOptions({}, "get", getAuthDataURL))
    .then((res) => {
      setAllAuthData(res.data.data);
    })
    .catch((error)=> {
      console.error("Error fetching auth data", error);
    });
  }

  
  useEffect (()=> {
    getAllUserAuth();
    getAllClientPage();
    getAuthData();
    setIsClick(false);
  }, [isClick]);

  // useEffect (() => {
  // }, [isClick])

  useEffect (() => {
    updateTable(authorityId);
  }, [allAuthData ]);

  const saveAuthData = () => {
    setIsClick(true);
    const sendData = clientPageData.map(item => ({ user_authority_id: authorityId, client_page_id: item.id, is_edit: item.is_edit, is_read: item.is_read }));
    makeHttpReq(makeHttpOptions(sendData, "post", setAuthDataURL))
    .then((res) => {
      console.log("Checkbox data sent successfully:", sendData);
    })
    .catch((error) => {
      console.error("Error sending checkbox data:", error);
    });
  };


  const handleTabChange = (key) => {
    setAuthorityId(key);
    updateTable(key);
  }

  const updateTable = (key) => {
    const authdata = allAuthData.filter(data => data.user_authority_id == key);
    let newpagedata = clientPageData.slice();
    newpagedata.map((pagedata, index) => {
      pagedata.is_edit = false;
      pagedata.is_read = false;
      authdata.map(data => {
        if (pagedata.id == data.client_page_id) {
          pagedata.is_edit = data.is_edit;
          pagedata.is_read = data.is_read;
        }
      });
    });
    setClientPageData(newpagedata);
  }

  const onCheckChange = (updateRow) => {
    console.log(updateRow);
  }

  return (
    <>
      <div style={{ display: "flex", gap: "100px", alignItems: "center", justifyContent: "center" }}>
        <Tabs defaultActiveKey="1" tabPosition="left" onChange={handleTabChange} >
          {userAuthData.map((row) => (
            <TabPane tab={row.name} key={row.id}>
            </TabPane>
          ))}
        </Tabs>
        <div>
          <ClientTable
            data = {clientPageData}
            onCheckChange = {onCheckChange}
          />
        </div>
      </div>
      <div style={{textAlign: "center"}}>
        <Button 
          onClick={saveAuthData}
          style={{backgroundColor: "#000", color: "#fff", width: 200, height: 40, marginTop: 40, }}
        >
          {messages.buttons.save}
        </Button>
      </div>
    </>
  );
};

export default ClientPage;
