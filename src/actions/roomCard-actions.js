import { Toast } from 'antd-mobile'
import { hashHistory } from 'react-router'

import { request, config } from '../utlis'

const deviceType = 'FINGERPRINT_LOCK';
const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')
const customerId_session = sessionStorage.getItem('customerId')

export function dataSuccess(data) {
  return {
    type: 'ROOMCARD-DATASUCCESS',
    payload: data
  }
}

export function initialState() {
  
  return (dispatch, getStore) => {
    const token = token_session || getStore().toObject().idStore.token
    const houseId = houseId_session || getStore().toObject().idStore.houseId
    request.get(config.api.base + config.api.queryHostDeviceByType, { houseId: houseId, token: token, deviceType: deviceType })
      .then(res => {
       
        if (res && res.success) {
         
          if (res && res.success && res.dataObject.devices.length > 0)
            dispatch(initail(res.dataObject.devices[0].deviceId))
        }
      })
  }
}

export function initail(deviceId) {
  return {
    type: 'INITIAL',
    deviceId: deviceId
  }
}
// 开门
export function openTheDoor(deviceId) {
  return (dispatch, getStore) => {
    const token = token_session || getStore().toObject().idStore.token
    const houseId = houseId_session || getStore().toObject().idStore.houseId
    const customerId = customerId_session || getStore().toObject().idStore.customerId
    request.get(config.api.base + config.api.smartHostControl, {
        token: token,
        houseId: houseId,
        deviceType: deviceType,
        deviceId: deviceId,
        customerId: customerId
      })
      .then(res => {
        
        if (res && res.success) {
          Toast.info('开锁成功')
          request.get(config.api.base + config.api.powerControl, {
              hostId: sessionStorage.getItem('powerHostId'),
              action: 'jdqoff'
            })
            .then(res => {
              
            })
          setTimeout(() => {
            hashHistory.goBack()
          }, 2000)
        }
      })
  }
}
// 梯控
export function elevator({floor, hotelId}) {
  return (dispatch, getState) => {
    const token = token_session || getState().toObject().idStore.token
    request.get(config.api.base + config.api.queryElevatorHost, {
        token: token,
        hotelId: hotelId,
      })
      .then(res => {
        if (res.success) {
          dispatch(dataSuccess({elevatorList: res.dataObject}))
        }
      })

  }
}

export function smartHostControl(info,cb) {
  return (dispatch,getState) => {
    const token = token_session || getState().toObject().idStore.token
    request.get(config.api.base + config.api.smartHostControl, {
              token: token,
              ...info
            })
            .then(res => {
              if (res && res.success) {
                return cb?cb():null
              
              }
            })
  }
}
export function source() {
  return (dispatch, getState) => {
    request.get(config.api.base + config.api.powerControl, {
        hostId: sessionStorage.getItem('powerHostId'),
        action: 'jdqon'
      })
      .then(res => {
        
        if (res&&res.success) {
          Toast.info('断电成功')
          setTimeout(() => {
            hashHistory.goBack()
          }, 2000)
        }
      })
  }
}
