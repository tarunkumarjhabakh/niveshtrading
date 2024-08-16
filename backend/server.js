import axios from "axios";
import { connect,ipAddress,publicAddress,placeorder,fetchOrderStatus } from "./placeorder.js";
import dotenv from 'dotenv'
dotenv.config()

const authToken = await connect();
const {localIp,macAddress} = ipAddress();
const publicIp = await publicAddress()

var headers = { 
    'Authorization': `Bearer ${authToken}`, 
    'Content-Type': 'application/json', 
    'Accept': 'application/json', 
    'X-UserType': 'USER', 
    'X-SourceID': 'WEB', 
    'X-ClientLocalIP': localIp, 
    'X-ClientPublicIP': publicIp, 
    'X-MACAddress': macAddress, 
    'X-PrivateKey': process.env.API_KEY
}

let orderid = await placeorder("SBIN","3045","1","1",headers)
fetchOrderStatus(orderid,headers)