import { request, config } from '../utlis'

const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')

const deviceType = 'SWITCH';

export function initailState(){
  return function(dispatch,getState){
       const token =   getState().toObject().idStore.token || token_session
    const houseId =  getState().toObject().idStore.houseId || houseId_session
     request.get( config.api.querySmartDeviceWays, { houseId: houseId, token: token, deviceType: 'SWITCH' })
            .then(res => {
                if(res.success) {

                  let lights = []
                  lights = res.dataObject.ways.filter(function(light) {
                      return light.name.indexOf('请勿打扰') > -1 ||light.name.indexOf("请即清理") > -1
                  })
                  dispatch(setWayId(lights))
                }
            })
  }
}

function setWayId(lights){
  return {
    type:'SETWAY',
    lights:lights
  };
}

export function submitService(wayId,action){
  return function(dispatch,getState){
    const token =  getState().toObject().idStore.token || token_session
    const houseId =  getState().toObject().idStore.houseId || houseId_session
    request.get( config.api.smartHostControl,
      {
        token:token,
        houseId:houseId,
        actionType:action,
        deviceType:deviceType,
        wayId:wayId,
        brightness:80,
        operate: 'V1ZNeGNVeFhjM1JqTWpGb1kyNVNSR1JJU25NPQ=='
      })
    .then(res => {
     
    })
  };
}

export function checkout(info) {
  return (dispatch,getState) => {
    const token =  sessionStorage.getItem('token')
    request.get( config.api.checkout,{...info,token: token})
      .then(res => {
       
      })
  }
}