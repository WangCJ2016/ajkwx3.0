import { request, config } from '../utlis'

const houseId_session = sessionStorage.getItem('houseId')
const token_session = sessionStorage.getItem('token')
const deviceType = 'SCENE';

export function initialModel(){
  return (dispatch,getState)=>{
    const token =  token_session || getState().toObject().idStore.token
    const houseId =  houseId_session || getState().toObject().idStore.houseId
    request.get(config.api.base + config.api.queryHostScenes, { houseId: houseId, token: token })
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
 
export function changeModel(scenceId){
  return (dispatch,getState) => {
    const token =  token_session || getState().toObject().idStore.token
    const houseId =  houseId_session || getState().toObject().idStore.houseId
    request.get(config.api.base + config.api.smartHostControl, {
      token:token,
      houseId:houseId,
      sceneId:scenceId,
      deviceType:deviceType
    })
    .then(res => {
      
    })
  }
}
