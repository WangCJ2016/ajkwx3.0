import { request, config } from '../utlis'

const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')

export function rgbClick(deviceId, key) {
  return (dispatch, getState) => {
    const token =  token_session || getState().toObject().idStore.token
    const houseId =  houseId_session || getState().toObject().idStore.houseId
    request.get(config.api.base + config.api.smartHostControl, 
      { 
        token: token, 
        deviceType : 'VIRTUAL_RGB_REMOTE', 
        houseId: houseId, 
        deviceId : deviceId,
        key: key.toUpperCase(),
        rgb : "*"
       })
       .then(res => {
       
       })
  }
}