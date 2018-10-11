import React from 'react'
import CSSModules from 'react-css-modules'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Tabs } from 'antd-mobile'

import styles from './air.css'
import AirOne from './air-one'
import * as airActions from '../../actions/air-actions'

const TabPane = Tabs.TabPane

@connect(
  state => ({airState:state.toObject().airStore}),
  dispatch => ({
    airActions: bindActionCreators(airActions, dispatch),
  })
)

@CSSModules(styles, { allowMultiple: true })
class Air extends React.PureComponent {
  constructor() {
    super()
    this.count = 0 
    this.countActive = 0
  }
  
  componentDidMount(){
    this.props.airActions.initialAirCondition(this.props.location.query.serverId) 
    const { airs } = this.props.airState
    if (airs.length > 0) {
      document.title = '空调'
      //Object.keys(airs[this.countActive])[0].replace(/[0-9$]/g, '')
    }
  }

  render(){
    const {airs,deviceType} = this.props.airState
    
    return(
      <div styleName='air_bg'>
        {
          airs.length === 1 ?airs.map((air,index) => <AirOne key={index} deviceType={deviceType} air={air} actions={this.props.airActions}/>):
          <Tabs>
            {
              airs.map((air)=> (
                <TabPane tab={air.name} key={air.deviceId} >
                  <AirOne  deviceType={deviceType} air={air} actions={this.props.airActions}/>
                </TabPane>
            ))
            }
          </Tabs>       
        }
      </div>
      
    )
  }
}

export default Air