import { request, config } from '../utlis'

const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')
const deviceType = 'SCENE';

export function initialModel(){
  return (dispatch,getState)=>{
    const token =  getState().toObject().idStore.token || token_session
    const houseId = getState().toObject().idStore.houseId || houseId_session
    request.get(config.api.queryHostScenes, { houseId: houseId, token: token })
         .then(res => {
          dispatch(initialState(res.dataObject))
         })
  };
}
function initialState(data){
  return{
    type:'INITIALSTATE',
    data:data
  };
}
 
export function changeModel(scenceId, cb){
  return (dispatch,getState) => {
    const token =   getState().toObject().idStore.token || token_session
    const houseId =  getState().toObject().idStore.houseId || houseId_session
    request.get(config.api.smartHostControl, {
      token:token,
      houseId:houseId,
      sceneId:scenceId,
      deviceType:deviceType,
      operate: 'V1ZNeGNVeFhjM1JqTWpGb1kyNVNSR1JJU25NPQ=='
    })
    .then(res => {
      if(res.success) {
        if(cb) cb()
      }
    })
  }
}
