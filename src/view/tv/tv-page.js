import React from 'react'
import CSSModules from 'react-css-modules'

import TvButton from './TvButton'


class TvPage extends React.Component {
  state = {  }
  render() {
    return (
      <div style={{position:'absolute',left:0,right:0,top:'40px',bottom:0}}>
      <div styleName="tvBox">
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
  </div>
    )
  }
}

export default TvPage