import React from 'react'
import CSSModules from 'react-css-modules'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Modal } from 'antd-mobile'
import styles from './service.css'
import * as serviceActions from '../../actions/service-actions'
const alert = Modal.alert

@connect(
  state => ({serviceState:state.toObject().serviceStore}),
  dispatch => ({
    serviceActions: bindActionCreators(serviceActions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class Service extends React.PureComponent {
  constructor() {
    super()
    this.state = {
    clean:'CLOSE',
    disturb:'CLOSE',
    checkoutStatus: 'CLOSE'
    }
  }
  componentDidMount(){
    document.title = '服务'
    this.props.serviceActions.initailState()
  }
  submitService(type){
    const { lights } = this.props.serviceState 
    const status = this.state[type]==='CLOSE'?'OPEN':'CLOSE'
    let antherTpye = ''
    if (status === 'OPEN') {
      if (type === 'clean') {
        antherTpye = 'disturb'
      }else{
        antherTpye = 'clean'
      }
    }
    this.setState({
      [type]:status,
      [antherTpye]:'CLOSE'
    },function(){
      if (type==='clean') {
        const cleanlight = lights.filter(light => light.name === "请即清理")
        this.props.serviceActions.submitService(cleanlight[0].wayId,this.state[type])
      }
      if (type==='disturb') {
        const cleanlight = lights.filter(light => light.name === "请勿打扰")
        this.props.serviceActions.submitService(cleanlight[0].wayId,this.state[type])
      }
    })
  }
  checkout = () => {
    this.props.history.replace('selectHome')
    const query = this.props.location.query
    this.props.serviceActions.checkout({
      houseName: encodeURI(query.name),
      [query.subOrderCode?'subOrderCode':'recordId']: query.subOrderCode?query.subOrderCode:query.recordId
    })
    this.setState({
      checkoutStatus: this.state.checkoutStatus === 'CLOSE'?'OPEN':'CLOSE'
    })
  }
  propmtVisit = ()=> {
    alert('退房', '确定退房么?', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确定', onPress: () => this.checkout() },
    ])
  }
  render() {
    
    const cleanStyle = classNames({
      service_item:true,
      active:this.state.clean==='CLOSE'?false:true
    })
     const disturbStyle = classNames({
      service_item:true,
      active:this.state.disturb==='CLOSE'?false:true
    })
    const checkoutStyle = classNames({
      service_item:true,
      active:this.state.checkoutStatus==='CLOSE'?false:true
    })
    return (
      <div styleName='service_bg'>
        <div styleName='rect' >
          <div styleName={cleanStyle} style={{color:'#63a0cb'}} onClick={this.submitService.bind(this,'clean')}>
            <img src={require('../../assets/imgs/service/swape.png')} alt="" styleName='swape'/>
            <p styleName='content'>请即清理</p>
           
          </div>
          <div styleName={disturbStyle} style={{color:'#ffb097'}} onClick={this.submitService.bind(this,'disturb')}>
            <img src={require('../../assets/imgs/service/ring.png')} alt="" styleName='ring'/>
            <p styleName='content'>请勿打扰</p>
           
          </div>
        </div>
        <div styleName='rect'>
          <div styleName={checkoutStyle} style={{color:'#21aa89'}} onClick={this.propmtVisit}>
            <img src={require('../../assets/imgs/service/checkout_icon.png')} alt="" styleName='swape'/>
            <p styleName='content'>退房</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Service