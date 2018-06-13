import { request, config } from '../utlis'

const token_session = sessionStorage.getItem('token')


export function dataSuccess(data) {
  return {
    type: 'ELEVTOR-DATASUCCESS',
    payload: data
  }
}

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
          dispatch(dataSuccess({elevatorIf: res.dataObject.length === 0 ? false : true}))
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