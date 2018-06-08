import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import styles from './light.css'
import * as actions from '../../actions/light-actions'
import LightTab from './component/ligthTab'
import LightCard from './component/lightCard'
import { config } from '../../utlis' 


@connect(
  state => ({lightStore:state.toObject().lightStore,idStore:state.toObject().idStore}),
  dispatch => ({
    lightActions: bindActionCreators(actions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class Light extends React.PureComponent {
  constructor(props) {
    
    super(props)
    this.state = {
    modelActiveIndex:-1,
    
    //largeRoundShouldReset: false
    } 
  }
  componentDidMount(){
    document.title = '灯'
    this.props.lightActions.initialLights({serverId: this.props.location.query.serveId})
    this.props.lightActions.yuedudeng()
   
    this.websocket = new WebSocket(`ws://${config.api.websocket}/stServlet.st?serverId=` + this.props.serveId) 
    this.websocket.onopen = () => {
      console.log('websocket已链接')
    }
    this.websocket.onmessage = (event) => {
      
      console.log(event.data)
      let lights = this.props.lights
      const lightNow = event.data.split('.WAY.')
      const changelihts = lights.map((light, index) => {
        if(light.id === lightNow[0]) {
          return {...light, status: lightNow[1]}
        }else {
          return light
        }
      })
      this.props.getLightsWays(changelihts)
     }
  }
  
  middelRoundClick = (type) => {
    this.props.lightActions.changeMiddleStatus(type)
  }
  lightSelector = () => {
    const {lights,middleRoundStatus} = this.props.lightStore
    return lights
    .filter((light) => light.name&&light.name.indexOf(middleRoundStatus) > -1)
  }

  render() {
    const {lights, middleRoundStatus} = this.props.lightStore
    console.log(this.props.lightStore)
    const serveId = this.props.idStore.serveId ||sessionStorage.getItem('serveId')
    const houseId =  this.props.location.query.houseId
    const {lightsClick,getLightsWays, dengdaiClick} = this.props.lightActions
    return (
      <div styleName='light_bg' >
        <LightTab 
          type={middleRoundStatus}
          middelRoundClick={this.middelRoundClick}
        />
        <LightCard 
          lights={this.lightSelector()}
        />
      </div>
   )
  }
}

export default Light