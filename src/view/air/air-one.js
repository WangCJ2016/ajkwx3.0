import React from 'react'
import CSSModules from 'react-css-modules'


import styles from './air.css'
import { numToarray } from '../../utlis'

@CSSModules(styles, { allowMultiple: true })
class AirOne extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      speed:3,
      switchKey:'ON',
      temIndex:-1,
      currentTemArray:[],
      model:'cold'
    }
  }
  componentDidMount(){
    this.setState({
      currentTemArray:this.props.air.coolWays
    })
  }
  //开关
  switchClick(deviceId){
    const key = this.state.switchKey === 'ON'?'OFF':'ON'
    if (key === 'ON') {
      this.props.actions.airswitch('OFF',deviceId)
      this.setState({
      switchKey:key,
      temIndex:0
      })
    }else{
      const {coolWays} = this.props.air
      const temIndex =  Math.round(coolWays.length/2)
      this.props.actions.airswitch(coolWays[temIndex],deviceId)
      this.setState({
      switchKey:key,
      temIndex:temIndex
    })
    }
  }
  //温度加减
  temChange(type,deviceId){
    if (this.props.deviceType === 'VIRTUAL_AIR_REMOTE'){
        const index = type === 'plus'?(this.state.temIndex+1 >=this.state.currentTemArray.length?this.state.temIndex:this.state.temIndex+1):
                                      (this.state.temIndex-1 >= 0?this.state.temIndex-1:0)
        this.setState({
          temIndex:index,
          switchKey:'OFF'
        },function(){
          this.props.actions.changeTem(this.state.currentTemArray[this.state.temIndex],deviceId)
        })
      
    }

    if(this.props.deviceType === 'VIRTUAL_CENTRAL_AIR_REMOTE'){
        const index = type === 'plus'?(this.state.temIndex+1 >=this.state.currentTemArray.length?this.state.temIndex:this.state.temIndex+1):
                                   (this.state.temIndex-1 > 0?this.state.temIndex-1: 0)
        this.setState({
          temIndex:index,
          switchKey:'OFF'
        },function(){
          this.props.actions.centerchangeTem(this.state.currentTemArray[this.state.temIndex],deviceId,this.state.model,this.state.speed)
        })
    }
  }
  //风速改变
  speedChange(deviceId){
    if (this.props.deviceType === 'VIRTUAL_AIR_REMOTE') return
    this.setState({
      speed:(this.state.speed+1)%4
    },function(){
      this.props.actions.centerchangeTem(this.state.currentTemArray[this.state.temIndex],deviceId,this.state.model,this.state.speed)
    })
  }
  speedRender(){
    const arry = numToarray(this.state.speed)
    return arry.map((speed,index) => {
      return <img key={index} styleName='speed_img' src={require(`../../assets/imgs/air/speed_${index}.png`)} alt=""/>
    })
  }
  //模式改变
  modelChange(deviceId){
    if(this.state.switchKey==='ON') return
    const currentModel = this.state.model==='cold'?'制热':'制冷'
    const currentTemArray = currentModel==='制冷'?this.props.air.coolWays:this.props.air.warmWays
    const centerIndex = currentTemArray.indexOf(25) > -1 ? currentTemArray.indexOf(25) : 0
    if(this.props.deviceType === 'VIRTUAL_AIR_REMOTE'){
       this.setState({
         model:this.state.model==='cold'?'hot':'cold',
         temIndex:0,
         currentTemArray:currentTemArray
      },function(){ 
        this.props.actions.changeTem(this.state.currentTemArray[this.state.temIndex],deviceId)
      })
    }
    if(this.props.deviceType === 'VIRTUAL_CENTRAL_AIR_REMOTE'){
      this.setState({
        model:this.state.model==='cold'?'hot':'cold',
        temIndex: centerIndex,
        currentTemArray:currentModel==='制冷'?this.props.air.coolWays:this.props.air.warmWays
      },function(){
      this.props.actions.centerchangeTem(this.state.currentTemArray[this.state.temIndex],deviceId,this.state.model,this.state.speed)
      })
    }
    
  }
 
  render(){
    const { deviceId } = this.props.air
    const { switchKey,temIndex,model,currentTemArray} = this.state
    const { deviceType }  = this.props
   
    return(
        <div styleName='air_wrap' style={{width:this.props.width}}>
          <div styleName="air_display">
           <div styleName="air_box">
            <div styleName="air_display_box">
              <span styleName='air_display_title'>风速</span>
              <div styleName="air_speed">
                {this.speedRender()}
              </div>
            </div>
            <div styleName="air_display_box air_box_down">
              <span styleName='air_display_title'>模式</span>
              <div styleName="air_model">
                <img src={require(`../../assets/imgs/air/${model}.png`)} alt=""/>
                <span>{model==='cold'?'制冷':'制热'}</span>
              </div>
            </div>
          </div>
          <div styleName="air_divide">
            <p></p>
          </div>
          <div styleName="air_box">
            <div styleName="air_display_box">
              <span styleName='air_display_title'>当前</span>
              <div styleName="tem">20℃</div> 
            </div>
            <div styleName="air_display_box air_box_down">
              <span styleName='air_display_title'>设置</span>
              <div styleName="tem">{switchKey==='OFF'?(currentTemArray?deviceType === 'VIRTUAL_CENTRAL_AIR_REMOTE' ? currentTemArray[temIndex]+'℃':currentTemArray[temIndex].slice(-2)+'℃':'25℃'):''}</div>
            </div>
          </div>
        </div>
        <div styleName="air_round">
          <div styleName="middle_round" onClick={this.switchClick.bind(this,deviceId)}>
            {switchKey}
          </div>
          <span styleName="small_round up"></span>
          <span styleName="small_round down"></span>
          <span styleName="small_round left"></span>
          <span styleName="small_round right"></span>
        </div>
        <div styleName="air_btn">
          <figure styleName='air_figure' onClick={this.temChange.bind(this,'plus',deviceId)} >
            <div styleName="air_figure_img">
              <img styleName='btn_tmp' src={require('../../assets/imgs/air/plus.png')} alt=""/>
            </div>
            <figcaption>温度+</figcaption>
          </figure>
           <figure styleName='air_figure' onClick={this.temChange.bind(this,'minus',deviceId)}>
            <div styleName="air_figure_img">
             <img styleName='btn_tmp' src={require('../../assets/imgs/air/minus.png')} alt=""/>
            </div>
            <figcaption>温度-</figcaption>
          </figure>
           <figure styleName='air_figure' onClick={this.speedChange.bind(this,deviceId,deviceId)}>
            <div styleName="air_figure_img">
              <img styleName='btn_speed' src={require('../../assets/imgs/air/speed.png')} alt=""/>
            </div>
            <figcaption>风速</figcaption>
          </figure>
           <figure styleName='air_figure' onClick={this.modelChange.bind(this,deviceId)}>
            <div styleName="air_figure_img">
              <img styleName='btn_speed' src={require('../../assets/imgs/air/air_model.png')} alt=""/>
            </div>
            <figcaption>模式</figcaption>
          </figure>
        </div>
        </div>
    )
  }
}

export default AirOne