const initialState = {
  
}
export default (state = initialState,action)=>{
  switch (action.type) {
    case 'INITAIL':
      return {...state, token:action.token, customerId:action.customerId}
    case 'SERVERID':
      return  {...state, 'serveId': action.data}
    case 'SAVEHOUSEID':
      return {...state,'houseId':action.houseId}
    default:
      return state;
  }
};