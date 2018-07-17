import { Toast } from 'antd-mobile'
import { encode64, config, request } from '../utlis'
import { hashHistory } from 'react-router'


export function getLoginCode(userName) {
    return function(dispatch) {
        // dispatch(getLoginCodeStart())
        request.get(config.api.base + config.api.getLoginCode, { telephone: userName })
            .then(res => {
                if (res && res.success) {
                    Toast.info('获取密码成功', 2)
                } else {
                    Toast.info(res.msg, 2)
                }
            });

    };
}
export function goHome(username, password, isRemenber) {
    return function(dispatch) {
        request.get(config.api.base + config.api.login, { username: username, password: password })
            .then(res => {
                 
                if (res.success) {
                    //sessionStorage.setItem('houseId',encode64(res.dataObject.house.id.toString()))
                    sessionStorage.setItem('customerId',encode64(res.dataObject.id.toString()))
                    sessionStorage.setItem('token', res.dataObject.token)
                    dispatch(saveTokenHouseId(res.dataObject.token, encode64(res.dataObject.id.toString())))
                    //hashHistory.push('selectHome')
                    goRouter(encode64(res.dataObject.id.toString()))
                    if (isRemenber) {
                        localStorage.setItem('userName', username)
                        localStorage.setItem('password', password)
                        localStorage.setItem('isRemenber', isRemenber)
                        localStorage.setItem('deleteTime', new Date().getTime() + 7 * 24 * 3600 * 1000)
                    } else {
                        localStorage.removeItem('userName')
                        localStorage.removeItem('password')
                        localStorage.removeItem('isRemenber')
                    }
                } else {
                    Toast.info('用户名和密码不匹配', 2)
                }
            });

    };
}

function goRouter(id) {
    request.get(config.api.base + config.api.queryHotelHouses ,{customerId: id})
    .then(res => {
        let roomNum = 0
        let rooms = []
        for(const i in res.dataObject) {
            roomNum = roomNum + res.dataObject[i].length 
            rooms = [...rooms, ...res.dataObject[i]] 
        }
        if(roomNum > 1) {
            hashHistory.push('selectHome')
        }else{
            if(rooms[0].subOrderCode) {
                const room = rooms[0]
                const basement = room.basement ? room.basement : 0
                const floor = room.hotelHouse.floor + basement
                hashHistory.push(`/home?name=${room.hotelHouse.name}&houseId=${room.houseId}&floor=${floor}&hotelId=${room.hotelHouse.hotelId}&subOrderCode=${room.subOrderCode}`)
              }else{
                const room = rooms[0]
                const basement = room.basement ? room.basement : 0
                const floor = room.hotelHouse.floor + basement
                hashHistory.push(`/home?name=${room.hotelHouse.name}&houseId=${room.houseId}&floor=${floor}&hotelId=${room.hotelHouse.hotelId}&recordId=${room.id}`)
              }
        }
    })
 
}


export function changeUserAndPassword(name, value) {
    return {
        type: 'CHANGEUSERANDPASSWORD',
        name: name,
        value: value
    };
}
export function changeRemember(value) {
    return {
        type: 'CHANGEREMEMBER',
        value: value
    };
}

//保存token houseid
export function saveTokenHouseId(token, customerId) {
    return {
        type: 'SAVE',
        token: token,
        customerId:customerId
    };
}

export function dataSuccess(data) {
    return {
        type: "DATASUCCESS",
        payload: data
    }
}