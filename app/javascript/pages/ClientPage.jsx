import React, { useState, useEffect } from "react";

import AuthTable from "../components/Client/AuthTable";

import ClientTable from "../components/Client/ClientTable";

import { 
  makeHttpReq, 
  makeHttpOptions 
} from "../utils/helper";

import {
  getUserAuthURL,
  getClientPageURL
} from "../utils/contants"

const ClientPage = () => {

  const [userAuthData, setUserAuthData] = useState();
  const [clientPageData, setClientPageData] = useState();

  const getAllUserAuth = () => {
    makeHttpReq(makeHttpOptions({}, "get", getUserAuthURL)).then((res) => {
      let index=1;
      console.log("res", res.data.data)
      const auth = res.data.data.map((item) => {
        return {
          ...item,
          key: index++,
        };
      });
      setUserAuthData(auth);
    }
  )};

  const getAllClientPage = () => {
    makeHttpReq(makeHttpOptions({}, "get", getClientPageURL)).then((res) => {
      let index=1;
      console.log("res", res.data.data)
      const clientData = res.data.data.map((item) => {
        return {
          ...item,
          key: index++,
        };
      });
      setClientPageData(clientData);
    }
  )};

  useEffect (()=> {
    getAllUserAuth();
    getAllClientPage();
  }, [])
  
  return(
    <>
      <div style={{display:"flex", gap:"100px", alignItems: "center", justifyContent:"center"}}>
        <AuthTable
          data = {userAuthData}
        />
        <ClientTable
         data = {clientPageData}
        />
      </div>
    </>
  )
}

export default ClientPage;