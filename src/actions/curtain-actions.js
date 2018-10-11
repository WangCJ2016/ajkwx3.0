import { request, config } from '../utlis'

const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')
const deviceType = 'CURTAIN'

export function initialCurtain() {
  return (dispatch,getState)=> {
    const token =  getState().toObject().idStore.token || token_session
    const houseId =  getState().toObject().idStore.houseId || houseId_session
    request.get(config.api.queryCurtains,{
      houseId:houseId,
      token:token,
      deviceType:deviceType,
      operate: 'V1ZNeGNVeFhjM1JqTWpGb1kyNVNSR1JJU25NPQ=='})
    .then(res => {
      if(res&&res.success){
        dispatch(initialState(res.dataObject.curtains))
        dispatch(initialStateType(res.dataObject.type))
      }
    })
  }
}
export function changeCurtainStatus(wayId,key,brightness){
  return (dispatch,getState)=>{
    const token =   getState().toObject().idStore.token || token_session 
    const houseId =  getState().toObject().idStore.houseId || houseId_session 
  
    request.get(config.api.smartHostControl,{
      token:token,
      houseId:houseId,
      deviceType:deviceType,
      wayId:wayId,
      actionType:key,
      brightness:brightness,
      operate: 'V1ZNeGNVeFhjM1JqTWpGb1kyNVNSR1JJU25NPQ=='})
    .then(res => {
      
    })
  };
}



function initialState(data){
  return {
    type:'CURTAIN-INITIALSTATE',
    data:data
  };
}

function initialStateType(data){
  return {
    type:'INITIALSTATETYPE',
    data:data
  };
}

// function  curtainArrCount(arr) {
//   if(arr.lenght > 2) {
//     let arrType = arr.map((item, index) => 
//       item.name.slice(-2)
//     )
//     arrType = Array.from(new Set(arrType))
//     let newArr = []
//     arrType.forEach(type => {
//       const typeArr = arr.filter(item => item.name.includes(type))
//       newArr = [...newArr, typeArr]
//     })
//   return newArr
//   } else {
//     return [arr]
//   }
// }