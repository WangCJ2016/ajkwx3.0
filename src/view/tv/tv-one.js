import React from 'react'
import CSSModules from 'react-css-modules'

import styles from './tv.css'
import TvButton from './TvButton'

@CSSModules(styles, { allowMultiple: true })
class TvOne extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      tv:'OFF',
      tvBox:'OFF'
    }
  }  
  numClick(type,e){
    if(type==='tv') {
      this.tvCtrl(e.target.getAttribute('data-key'))
    }else{
      this.tvBoxCtrl(e.target.getAttribute('data-key'))
    }
  }
  tvCtrl(key){
    let deviceId
    for(let i in this.props.tv){
      if (i.indexOf('电视机')>-1) {
        deviceId = this.props.tv[i]
      }
    }
    if (key === 'ON'||key === 'OFF') {
      this.setState({
        tv:key ==='ON'?'OFF':'ON'
      },function(){
        this.props.actions.tvCtrl(this.state.tv,deviceId)
      })
    }else{
      this.props.actions.tvCtrl(key,deviceId)
    }
  }
  tvBoxCtrl(key){
     let deviceId
    for(let i in this.props.tv){
      if (i.indexOf('机顶盒')>-1) {
        deviceId = this.props.tv[i]
      }
    }
    if (key === 'ON'||key === 'OFF') {
      this.setState({
        tvBox:key ==='ON'?'OFF':'ON'
      },function(){
        this.props.actions.tvCtrl(this.state.tvBox,deviceId)
      })
    }else{
      this.props.actions.tvCtrl(key,deviceId)
    }
  }
  render(){
    const {width} = this.props
    return (
      <div styleName="tv_wrap" style={{width:width}}>

      {this.props.tvSwitch?
         <div style={{marginTop: '20px'}}>
            <div styleName="tvBox">
              <div styleName='tv_switch' onClick={()=>this.props.actions.tvSwitch()}>
                 <span styleName="switch_btn">
                   {this.props.tvSwitch?'TV':'AV'}
                 </span>
              </div>
              <TvButton classType={`tv_${this.state.tv}`} click={this.tvCtrl.bind(this,this.state.tv)}/>
              <TvButton classType='plus_off' click={this.tvCtrl.bind(this,'VOL_PLUS')}/>
              <TvButton classType='minus_off' click={this.tvCtrl.bind(this,'VOL_SUB')}/>
          </div>
          <div styleName="dir_control">
            <div styleName="channel_voice">
              <span styleName="arr_up round" onClick={this.tvCtrl.bind(this,'UP')}></span>
              <span styleName="arr_title">频道</span>
              <span styleName="arr_down round" onClick={this.tvCtrl.bind(this,'DOWN')}></span>
            </div>
            <div styleName="arr_round" >
              <span styleName="round_up round" data-key='up' onClick={this.tvCtrl.bind(this,'UP')}>
              </span>
              <span styleName="round_down round" onClick={this.tvCtrl.bind(this,'DOWN')}></span>
              <span styleName="round_left round" onClick={this.tvCtrl.bind(this,'LEFT')}></span>
              <span styleName="round_right round" onClick={this.tvCtrl.bind(this,'RIGHT')}></span>
              <div styleName="arr_center">
                <div styleName="arr_ok" onClick={this.tvCtrl.bind(this,'OK')}>
                  ok
                </div>
              </div>
            </div>
            <div styleName="channel_voice">
              <span styleName="arr_up round" onClick={this.tvCtrl.bind(this,'VOL_PLUS')}></span>
              <span styleName="arr_title">音量</span>
              <span styleName="arr_down round" onClick={this.tvCtrl.bind(this,'VOL_SUB')}></span>
            </div>
          </div>
          <div styleName="review_tv">
            <p styleName="review_btn" onClick={this.tvCtrl.bind(this, 'STOP')}>点播</p>
            <p styleName='home_btn' onClick={this.tvCtrl.bind(this, 'HOME')}>
              <img src={require('../../assets/imgs/tv/home.png')} alt=""/>
            </p>
            <p styleName="review_btn" onClick={this.tvCtrl.bind(this, 'PLAY')}>回看</p>
          </div>
          <div styleName="tv_num" onClick={this.numClick.bind(this,'tv')}>
            <div styleName="num_item">
              <span styleName="num" data-key='1'>1</span>
              <span styleName="num" data-key='2'>2</span>
              <span styleName="num" data-key='3'>3</span>
            </div>
            <div styleName="num_item">
              <span styleName="num" data-key='4'>4</span>
              <span styleName="num" data-key='5'>5</span>
              <span styleName="num" data-key='6'>6</span>
            </div>
            <div styleName="num_item">
              <span styleName="num" data-key='7'>7</span>
              <span styleName="num" data-key='8'>8</span>
              <span styleName="num" data-key='9'>9</span>
            </div>
            <div styleName="num_item_last">
              <span styleName="num" data-key='0'>0</span>
            </div>
          </div>
        </div>:
        <div style={{position:'absolute',left:0,right:0,top:'20px',bottom:0}}>
          <div styleName="tvBox tvBox2">
          <div styleName='tv_switch' onClick={()=>this.props.actions.tvSwitch()}>
              <span styleName="switch_btn">
                {this.props.tvSwitch?'TV':'AV'}
              </span>
          </div>
            <TvButton classType={`tv_${this.state.tvBox}`} click={this.tvBoxCtrl.bind(this,this.state.tvBox)} />
            <TvButton classType='mute_off' click={this.tvBoxCtrl.bind(this,'MUTE')}/>
            <TvButton classType='return_off' click={this.tvBoxCtrl.bind(this,'RETURN')}/>
          </div>
          <div styleName="dir_control">
            <div styleName="channel_voice">
              <span styleName="arr_up round" onClick={this.tvBoxCtrl.bind(this,'UP')}></span>
              <span styleName="arr_title">频道</span>
              <span styleName="arr_down round" onClick={this.tvBoxCtrl.bind(this,'DOWN')}></span>
            </div>
            <div styleName="arr_round" >
              <span styleName="round_up round" data-key='up' onClick={this.tvBoxCtrl.bind(this,'UP')}>
              </span>
              <span styleName="round_down round" onClick={this.tvBoxCtrl.bind(this,'DOWN')}></span>
              <span styleName="round_left round" onClick={this.tvBoxCtrl.bind(this,'LEFT')}></span>
              <span styleName="round_right round" onClick={this.tvBoxCtrl.bind(this,'RIGHT')}></span>
              <div styleName="arr_center">
                <div styleName="arr_ok" onClick={this.tvBoxCtrl.bind(this,'OK')}>
                  ok
                </div>
              </div>
            </div>
            <div styleName="channel_voice">
              <span styleName="arr_up round" onClick={this.tvBoxCtrl.bind(this,'VOL_PLUS')}></span>
              <span styleName="arr_title">音量</span>
              <span styleName="arr_down round" onClick={this.tvBoxCtrl.bind(this,'VOL_SUB')}></span>
            </div>
          </div>
          <div styleName="review_tv">
            <p styleName="review_btn" onClick={this.tvBoxCtrl.bind(this, 'STOP')}>点播</p>
            <p styleName='home_btn' onClick={this.tvCtrl.bind(this, 'HOME')}>
              <img src={require('../../assets/imgs/tv/home.png')} alt=""/>
            </p>
            <p styleName="review_btn" onClick={this.tvBoxCtrl.bind(this, 'PLAY')}>回看</p>
          </div>
          <div styleName="tv_num" onClick={this.numClick.bind(this,'tvBox')}>
            <div styleName="num_item">
              <span styleName="num" data-key='1'>1</span>
              <span styleName="num" data-key='2'>2</span>
              <span styleName="num" data-key='3'>3</span>
            </div>
            <div styleName="num_item">
              <span styleName="num" data-key='4'>4</span>
              <span styleName="num" data-key='5'>5</span>
              <span styleName="num" data-key='6'>6</span>
            </div>
            <div styleName="num_item">
              <span styleName="num" data-key='7'>7</span>
              <span styleName="num" data-key='8'>8</span>
              <span styleName="num" data-key='9'>9</span>
            </div>
            <div styleName="num_item_last">
              <span styleName="num" data-key='0'>0</span>
            </div>
          </div>
        </div>}
      </div>
    )
  }
}

export default TvOne