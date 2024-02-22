import React, { 
  useEffect, 
  useState 
} from 'react';

import { 
  Input, 
  Button 
} from 'antd';

import {
  getUserURL
} from "../utils/contants";

import { 
  makeHttpReq, 
  makeHttpOptions 
} from "../utils/helper";

import { 
  getAuthUsername, 
  getAuthUserToken 
} from "../utils/helper";


const  ChangePassword = () => {
  const token = getAuthUserToken();
  const username = getAuthUsername();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');



  const handleChangePassword = async () => {
    // console.log()
    makeHttpReq(makeHttpOptions({
      username,
      currentPassword,
      newPassword
    }, "post", getUserURL))
    .then((res) => {
      
    })
    .catch((error) => {
      console.error("Error fetching client page data:", error);
    });
  };
  useEffect(()=> {
    console.log(username, "------------");
    console.log(token, "1111111111111")
  
  })

  return (
    <div style={{display:"flex", justifyContent:"center"}}>
      <div style={{width:"500px", borderStyle:"solid", borderColor:"black", borderWidth:"2px", borderRadius:"5px", height:"500px", padding:"15px"}}>
        <h2 style={{fontSize:"30px", textAlign:"center"}}>Change Password</h2>
        <div style={{height:"30px"}}></div>
        <label style={{width: 100, fontSize:"20px"}} htmlFor="currentPassword">Current Password:</label>
        <Input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <div style={{height:"30px"}}></div>
        <label style={{width: 100, fontSize:"20px"}} htmlFor="newPassword">New Password:</label>
        <Input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <div style={{height:"30px"}}></div>
        <label style={{width: 100, fontSize:"20px"}} htmlFor="confirmNewPassword">Confirm New Password:</label>
        <Input
          type="password"
          id="confirmNewPassword"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <div style={{height:"30px"}}></div>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <div style={{textAlign:"center"}}>
          <Button onClick={handleChangePassword}>Change Password</Button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
