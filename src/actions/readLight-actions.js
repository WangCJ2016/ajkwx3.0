import { request, config } from '../utlis'


const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')

export function getInitialState() {
  return (dispatch, getState) => {
    const token =  token_session || getState().toObject().idStore.token
    const houseId =  houseId_session || getState().toObject().idStore.houseId
    request.get(config.api.base + config.api.queryHostDeviceByType, { houseId: houseId, token: token, deviceType: 'DIMMER' })
      .then(res => {
       
        if (res && res.success && res.dataObject.devices.length > 0) {
          // const wayIds = res.dataObject.devices[0].ways.reduce((previousValue, currentValue) => {
          //   if (currentValue.name.indexOf('白光') > -1) {
          //     return { ...previousValue, baiguangWayid: currentValue.wayId }
          //   }
          //   if (currentValue.name.indexOf('暖') > -1) {
          //     return { ...previousValue, nuanguangWayid: currentValue.wayId }
          //   }
          //   return { ...previousValue, otherWayid: currentValue.wayId }
          // }, {})
          dispatch(initialState(res.dataObject.devices[0].ways))
        }
      })
  }
}

export function initialState(wayIds) {
  return {
    type: 'INITALSTATE',
    wayIds: wayIds
  }
}

export function rangeChange(value, wayId) {
  return (dispatch, getStore) => {
   const token =  token_session || getStore().toObject().idStore.token
    const houseId =  houseId_session || getStore().toObject().idStore.houseId
    request.get(config.api.base + config.api.smartHostControl, {
        houseId: houseId,
        deviceType: 'SWITCH',
        token: token,
        actionType : 'OPEN',
        wayId : wayId,
        brightness : value
      })
      .then(res => {
       
      })
  }
}

export function changeState(key, value) {
  return {
    type: 'CHANGESTATE',
    key: key,
    value: value
  }
}
export function switchClick(actionType) {
  return (dispatch, getStore) => {
    const token =  token_session || getStore().toObject().idStore.token
    const houseId =  houseId_session || getStore().toObject().idStore.houseId
    const wayIds = getStore().toObject().readLightStore.wayIds

    Promise.all(wayIds.map(light => runAsync(light.wayId)))
    .then(res => {
      dispatch(changeState('status', actionType))
    })

    function runAsync(wayId){
      setTimeout(function() {
        request.get(config.api.base + config.api.smartHostControl, {
        houseId: houseId,
        deviceType: 'SWITCH',
        token: token,
        actionType : actionType,
        wayId : wayId,
        brightness : 50
      })
        .then(res => {
          return true
        })
      },2000)
 }
  }
  
}


