import { request, config } from '../utlis'
import { hashHistory } from 'react-router'
import { Toast } from 'antd-mobile'

const customerId_session = sessionStorage.getItem('customerId')

export function initialState(customerId) {
  const _customerId = customerId || customerId_session
  return (dispatch, getState) => {
    request.get(config.api.base + config.api.queryHotelHouses ,{customerId: _customerId})
      .then(res => {
        
        if (res && res.dataObject) {
          let rooms = []
          for(const i in res.dataObject) {
            rooms = [...rooms, ...res.dataObject[i]] 
          }
          dispatch(initial(rooms))
        }
      })
  }
}

function initial(rooms) {
  return {
    type: 'INTIAL',
    rooms: rooms
  }
}

export function whetherCanOperate(houseName, houseId, id, type, floor, hotelId, powerHostId) {
  let roomsType = ''
  if (type === 'recordId') {
    roomsType = 'offline'  
  }
  if (type === 'subOrderCode') {
    roomsType = 'online'  
  }
  return () => {
    request.get(config.api.base + config.api.whetherCanOperate ,{type: roomsType, [type]: id})
    .then((res) => {
      if (res.success) {
        sessionStorage.setItem('hotelId', hotelId)
        sessionStorage.setItem('houseId', houseId)
        sessionStorage.setItem('powerHostId', powerHostId)
        hashHistory.push(`/home?name=${houseName}&houseId=${houseId}&floor=${floor}&hotelId=${hotelId}&${type}=${id}`)
      } else {
        Toast.info(res.msg, 2);
      }
    })
  }

}
