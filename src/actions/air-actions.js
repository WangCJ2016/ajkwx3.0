import { request, config } from '../utlis'
let deviceType
const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')

export function initialAirCondition() {
    return function(dispatch, getState) {
         const token =  token_session || getState().toObject().idStore.token
    const houseId =  houseId_session || getState().toObject().idStore.houseId
        request.get(config.api.base + config.api.queryDeviceType, { token: token, deviceName: encodeURI('空调'), houseId: houseId })
            .then(res => {
                if (res && res.success) {
                    deviceType = res.dataObject
                    dispatch(initialData(deviceType, 'deviceType'))
                    request.get(config.api.base + config.api.queryHostDeviceByType, { token: token, houseId: houseId, deviceType: res.dataObject })
                        .then(res => {
                            
                            let airs = []
                            if (res && res.success) {
                                if (deviceType === 'VIRTUAL_AIR_REMOTE') {
                                    res.dataObject.devices.forEach((air) => {
                                        let airInfo = {},
                                            coolWays, warmWays
                                        if (air.ways) {
                                            coolWays = air.ways.filter(way => {
                                                if (way.remoteKey.indexOf('COOL') > -1) {
                                                    return way;
                                                }else{
                                                    return null
                                                }
                                            }).map(way => {
                                                return way.remoteKey;
                                            })
                                            warmWays = air.ways.filter(way => {
                                                if (way.remoteKey.indexOf('WARM') > -1) {
                                                    return way;
                                                }else{
                                                    return null
                                                }
                                            }).map(way => {
                                                return way.remoteKey;
                                            });
                                        }
                                        airInfo.deviceId = air.deviceId
                                        airInfo.coolWays = coolWays
                                        airInfo.warmWays = warmWays
                                        airInfo.name = air.name
                                        
                                        airs.push(airInfo)
                                    })
                                } else {
                                  
                                    res.dataObject.devices.forEach((air) => {
                                        let airInfo = {},
                                            coolWays, warmWays
                                        coolWays = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28, 29, 30]
                                        warmWays = [20, 21, 22, 23, 24, 25, 26, 28, 29, 30]
                                        airInfo.deviceId = air.deviceId
                                        airInfo.coolWays = coolWays
                                        airInfo.warmWays = warmWays
                                        airInfo.name = air.name
                                       
                                        airs.push(airInfo)
                                    })
                                }
                            }

                            dispatch(initialData(airs, 'airs'))
                        })
                }
            })
    };
}

function initialData(airs, style) {
    return {
        type: 'INTIALDATA',
        style: style,
        data: airs
    }
}
//普通空调温度变化
export function changeTem(key, deviceId) {

    return function(dispatch, getState) {
        const token =  token_session || getState().toObject().idStore.token
    const houseId =  houseId_session || getState().toObject().idStore.houseId
        request.get(config.api.base + config.api.smartHostControl, {
                houseId: houseId,
                deviceType: deviceType,
                token: token,
                deviceId: deviceId,
                key: key
            })
            .then(res => {
                
            })
    }
}
//中央空调温度变化
export function centerchangeTem(key, deviceId, model, speed) {
    const mode = model === 'cold' ? 'COOL' : 'WARM'
    return function(dispatch,getState) {
        const token =  token_session || getState().toObject().idStore.token
    const houseId =  houseId_session || getState().toObject().idStore.houseId
        request.get(config.api.base + config.api.smartHostControl, {
                houseId: houseId,
                deviceType: deviceType,
                token: token,
                deviceId: deviceId,
                mode: mode,
                temp: key,
                wind: speed
            })
            .then(res => {
                
            })
    }
}
//开关空调
export function airswitch(key, deviceId) {
    let data
    return function(dispatch,getState) {
       const token =  token_session || getState().toObject().idStore.token
    const houseId =  houseId_session || getState().toObject().idStore.houseId
        if (deviceType === 'VIRTUAL_AIR_REMOTE') {
            data = {
                houseId: houseId,
                deviceType: deviceType,
                token: token,
                deviceId: deviceId,
                key: key
            }
        }
        if (deviceType === 'VIRTUAL_CENTRAL_AIR_REMOTE') {
            if (key === 'OFF') {
                data = {
                    houseId: houseId,
                    deviceType: deviceType,
                    token: token,
                    deviceId: deviceId,
                    onOff : "OFF",
                    mode: 'COOL',
                    wind: 0,
                    temp: 25
                }
            } else {
                data = {
                    houseId: houseId,
                    deviceType: deviceType,
                    token: token,
                    deviceId: deviceId,
                    mode: 'COOL',
                    temp: key,
                    wind: 0
                }
            }
        }
       request.get(config.api.base + config.api.smartHostControl, data)
            .then(res => {
                
            })
    }
}