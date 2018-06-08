import { request, config } from '../utlis'

const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')
const deviceType = 'CURTAIN'

export function initialCurtain() {
  return (dispatch,getState)=> {
    const token =  token_session || getState().toObject().idStore.token
    const houseId =  houseId_session || getState().toObject().idStore.houseId
    request.get(config.api.base + config.api.queryCurtains,{houseId:houseId,token:token,deviceType:deviceType})
    .then(res => {
    
      if(res&&res.success){
        let curtainsArray = []
        for(let i in res.dataObject.curtains) {
          curtainsArray.push(res.dataObject.curtains[i])
        }
      
        dispatch(initialState(curtainsArray))
        dispatch(initialStateType(res.dataObject.type))
      }
    })
  }
}
export function changeCurtainStatus(wayId,key,brightness){
  return (dispatch,getState)=>{
    const token =  token_session || getState().toObject().idStore.token
    const houseId =  houseId_session || getState().toObject().idStore.houseId
    request.get(config.api.base + config.api.smartHostControl,{token:token,houseId:houseId,deviceType:deviceType,wayId:wayId,actionType:key,brightness:brightness})
    .then(res => {
      
    })
  };
}



function initialState(data){
  return {
    type:'INITIALSTATE',
    data:data
  };
}

function initialStateType(data){
  return {
    type:'INITIALSTATETYPE',
    data:data
  };
}
