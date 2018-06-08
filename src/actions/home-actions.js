import {request, config ,encode64 } from '../utlis'
const token_session = sessionStorage.getItem('token')

export function initialState(houseId) {
  return (dispatch, getState) => {
    const token =  token_session || getState().toObject().idStore.token
    request.get(config.api.base + config.api.querySmartDeviceWays, 
         { houseId: encode64(houseId),
          token: token,
          deviceType: 'SWITCH' 
      })
      .then(res => {
        if(res&&res.success){
        sessionStorage.setItem('serveId',res.dataObject.serverId)
        dispatch(saveserverId(res.dataObject.serverId))
     }
    })

    request.get(config.api.base + config.api.queryEnvDatas, 
         { hostId: sessionStorage.getItem('powerHostId')})
      .then(res => {
          if (res&& res.success) {
            dispatch(saveEnvir(res.dataObject))
          }
        })

  }
}

export function saveEnvir(envir) {
  return {
    type: 'SAVEENVIR',
    envir: envir
  }
}

export function saveHouseId(houseId) {
  sessionStorage.setItem('houseId', encode64(houseId))
  return {
    type: 'SAVEHOUSEID',
    houseId: encode64(houseId)
  }
}

export function saveserverId(id) {
    return {
        type: 'SERVERID',
        data:id
    };
}