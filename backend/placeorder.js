import axios from "axios";
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import { SmartAPI } from 'smartapi-javascript';
import { authenticator } from "otplib";
import os from 'os';

dotenv.config();

const app = express();
app.use(cors());

const api_key = process.env.API_KEY;
const client_code = process.env.CLIENT_CODE;
const pwd = process.env.PASSWORD;
const token = process.env.TOKEN;

export const connect = async () => {
    try {
        let smartApi = new SmartAPI({ api_key:api_key });
        let totp = authenticator.generate(token);
        let session = await smartApi.generateSession(client_code, pwd, totp);
        if (session.status) {
            return session.data.jwtToken;
        } else {
            console.error('Invalid Credentials')
        }
    } catch (error) {
        console.error('Error generating session:', error);
    }
};

export const ipAddress = () => {
    let networkInterfaces = os.networkInterfaces();
    let localIp = null;
    let macAddress = null;

    for (let iface of Object.values(networkInterfaces)) {
        for (let alias of iface) {
            if (alias.family === 'IPv4' && !alias.internal) {
                localIp = alias.address;
                macAddress = alias.mac;
                break;
            }
        }
        if (localIp) break;
    }
    return { localIp, macAddress };
};

export const publicAddress = async () => {
    let res = await axios.get('https://api.ipify.org?format=json')
    return res.data.ip
}

export const placeorder = async (symbol,symboltoken,price,quantity,headers) => {
    var data = JSON.stringify({
        "variety":"NORMAL",
        "tradingsymbol":`${symbol}-EQ`,
        "symboltoken":symboltoken,
        "transactiontype":"BUY",
        "exchange":"NSE",
        "ordertype":"MARKET",
        "producttype":"INTRADAY",
        "duration":"DAY",
        "price":price,
        "squareoff":"0",
        "stoploss":"0",
        "quantity":quantity
    });
    
    var config = {
        method: 'post',
        url: 'https://apiconnect.angelbroking.com/rest/secure/angelbroking/order/v1/placeOrder',
        headers: headers,
        data : data
    }

    const res = await axios(config)
    if (res.data.status === true) {
        console.log(res.data)
        return res.data.data.uniqueorderid
    } else {
        console.error('Could not place order')
        console.error(res.data.message)
    }
}

export const fetchOrderStatus = async (orderid,headers) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    var config = {
        method: 'get',
        url: `https://apiconnect.angelbroking.com/rest/secure/angelbroking/order/v1/details/${orderid}`,
        headers: headers
    }
    console.log(config.url)

    const res = await axios(config)
    if (res.data.status === true) {
        console.log(res.data.data.status)
    } else {
        console.error(res.data.message)
    }
}