import React from 'react'
import CSSModules from 'react-css-modules'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Tabs } from 'antd-mobile'

import styles from './tv.css'
import * as tvActions from '../../actions/tv-actions'

import TvOne from './tv-one'
import SwipeType from '../../components/swipeTypeHoc/SwipeType'

const TabPane = Tabs.TabPane

@connect(
  state => ({tvState:state.toObject().tvStore}),
  dispatch => ({
    tvActions: bindActionCreators(tvActions, dispatch),
  })
)
@SwipeType
@CSSModules(styles, { allowMultiple: true })
class Tv extends React.PureComponent {
  constructor() {
    super()
    this.count = 0 
    this.countActive = 0
  }
  componentDidMount(){
    const houseId = this.props.location.query.houseId
    this.props.tvActions.initialTv(houseId)
    this.props.componentDidMount()
    const { tvs } = this.props.tvState
    if (tvs.length > 0) {
      if(this.props.tvState.tvSwitch) {
        document.title = '电视机'
      }else {
        document.title = '机顶盒'
      }
    }
    window.addEventListener("orientationchange", function (e) {
      console.log(e)
      e.preventDefault();

  }, false);
  }
  componentDidUpdate() {
    const { tvs } = this.props.tvState
    if (tvs.length > 0) {
      if(this.props.tvState.tvSwitch) {
        document.title = '电视机'
      }else {
        document.title = '机顶盒'
      }
    }
  }
  render(){

    const { tvs } = this.props.tvState
    return (
      <div styleName='tv_bg'>
        <div styleName="tvwrap clearfix"  
          >
          {
            tvs.length===1?tvs.map((tv,index) => <TvOne  tvSwitch={this.props.tvState.tvSwitch}  tv={tv} actions={this.props.tvActions} key={index}/>):
            <Tabs>
            {
              tvs.map((tv)=> (
                <TabPane tab={Object.keys(tv)[0]} key={tv.deviceId} >
                  <TvOne  tvSwitch={this.props.tvState.tvSwitch}  tv={tv} actions={this.props.tvActions}/>
                </TabPane>
            ))
            }
            </Tabs>
          }
        </div>
      </div>
    )
  }
}

export default Tv