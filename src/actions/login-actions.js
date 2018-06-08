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
                    hashHistory.push('/selectHome')
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
