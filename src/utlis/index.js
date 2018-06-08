import {_} from 'lodash'
import queryString from 'query-string'
import 'whatwg-fetch'
import 'es6-promise'

export function encode64(input) {
  var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/=";
  var output = "";
  var chr1, chr2, chr3 = "";
  var enc1, enc2, enc3, enc4 = "";
  var i = 0;
  do {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
  } while (i < input.length);
  return output;
}

//api配置
 export const config = {
  header: {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
  api: {
    base: 'http://47.100.123.83/aijukex/', // http://47.100.123.83/aijukex http://www.live-ctrl.com/aijukex
    websocket: 'www.live-ctrl.com/aijukex',
    getLoginCode: 'we/we_generatePassword',
    login: 'we/we_loginx',
    queryHotelHouses: 'we/we_queryHotelHouses', //获取房间
    queryHostDeviceByType:"we/we_queryHostDeviceByType",//主机信息
    queryHostScenes:"we/we_queryHostScenes",
    queryLightsStatus: "we/we_queryLightsStatus",
    smartHostControl:"we/we_smartHostControl",//控制
    querySmartDeviceWays:"we/we_querySmartDeviceWays",//获取路数信息
    queryDeviceType:"we/we_queryDeviceType",//获取设备类型
    queryTvDevices:"we/we_queryTvDevices", //获取电视信息
    modifyWaysStatus:"we/we_modifyWaysStatus", //上传灯的状态
    queryCurtains: "we/we_queryCurtains", // 获取窗帘数据
    whetherCanOperate: 'we/we_whetherCanOperate',  // 验证房间是否可以入住
    queryElevatorHost: 'we/we_queryElevatorHost',
    queryEnvDatas: 'we/we_queryEnvDatas', // 获取房间环境
    powerControl: 'we/we_powerControl',
    checkout: 'we/we_customerLeave'
  }
}
//get/post请求
export const request = {
  get(url,params) {
    if(params) {
      url += '?' + queryString.stringify(params)
    }
    return fetch(url)
    .then((res)=>res.json())
  },
  post(url,body){
    const options = _.extend(config.header,{
      body: JSON.stringify(body)
    })
    return fetch(url,options)
      .then(res=>res.json())
  }
}

//判断象限
export function quadrant(x,x0,y,y0){
  if (x<=x0 && y<=y0) {
    return 3
  }
  if (x<x0 && y>y0) {
    return 4
  }
  if(x>x0 && y<y0) {
    return 2
  }
  if(x>=x0 && y>=y0) {
    return 1
  }
}

//根据数字转化成数组
export function numToarray(num) {
  const arry = []
  for (var i = num - 1; i >= 0; i--) {
    arry[i]=1
  }
  return arry
}

