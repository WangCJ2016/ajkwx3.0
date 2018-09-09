import { config, request } from '../utlis'

const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')
const deviceType = 'VIRTUAL_TV_DVD_REMOTE';

export function initialTv(serverId) {
  return async function(dispatch,getState){
    const token =  getState().toObject().idStore.token || token_session
    const houseId =  getState().toObject().idStore.houseId || houseId_session
    const response = await request.get(config.api.base + config.api.queryTvDevices,{houseId:houseId,token:token})
   
    if (response&&response.success) {
      let arry = []
      for(let i in response.dataObject){
        arry.push({...response.dataObject[i], title: '电视机' + i})
      }
      
      console.log(arry)
      for(let i in arry){
        const tvStatus = await getTvAirStatus(serverId, getTvId(arry[i])) 
        const tvBoxStatus = await getTvAirStatus(serverId, getTvBoxId(arry[i])) 
        arry[i].tvStatus = tvStatus
        arry[i].tvBoxStatus = tvBoxStatus
      }
      dispatch(initialState(arry))
    } 
    
  };
}

function getTvId (obj) {
  for(let i in obj) {
    if(i.indexOf('电视机') > -1) {
      return obj[i]
    }
  }
}
function getTvBoxId (obj) {
  for(let i in obj) {
    if(i.indexOf('机顶盒') > -1) {
      return obj[i]
    }
  }
} 
export function tvCtrl(key,deviceId){
  return (dispatch,getState)=>{
    const token =   getState().toObject().idStore.token || token_session
    const houseId =  getState().toObject().idStore.houseId || houseId_session
    request.get(config.api.base + config.api.smartHostControl,{houseId:houseId,token:token,deviceType:deviceType,deviceId:deviceId,key:key})
    .then(res => {
  
    })
  };
}

// 获取 空调 状态
function  getTvAirStatus(serverId, deviceId) {
  return request.get(config.api.base + config.api.getTvAirStatus, {
           serverId: serverId,
           deviceId: deviceId,
       })
       .then(res => {
           return res.dataObject
       })

}

export function tvSwitch() {
  return {
    type: 'TVSwitch'
  }
}

function initialState(tv){
  return {
    type:'INITAILSTATE',
    tv:tv
  };
}
