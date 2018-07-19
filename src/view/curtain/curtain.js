import React from 'react'
import CSSModules from 'react-css-modules'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Tabs } from 'antd-mobile'

import styles from './curtain.css'
import CurtainOne from './curtain-one'
import * as curtainActions from '../../actions/curtain-actions'
const TabPane = Tabs.TabPane

@connect(
  state => ({curtainState:state.toObject().curtainStore}),
  dispatch => ({
    curtainActions: bindActionCreators(curtainActions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class Curtain extends React.PureComponent {
  constructor() {
    super()
    this.count = 0 
    this.countActive = 0
  }
  componentDidMount(){
    this.props.curtainActions.initialCurtain()
    document.title = '窗'
  }
 
  curtainRender() {
    const { curtains, type } = this.props.curtainState
    console.log(curtains) 
    const keys = Object.keys(curtains)
    if( keys.length > 1) {
      return (
        <Tabs>
          {
            keys.map((key, index)=> (
              <TabPane tab={key} key={index} >
                <CurtainOne  curtain={curtains[key]} type={type} />
              </TabPane>
            ))
          }
         </Tabs>
      ) 
    } else {
      return (
        <CurtainOne type={type} curtain={curtains[keys[0]]} />
      ) 
    }
  }

  render(){
    const { curtains, type } = this.props.curtainState
    console.log(curtains)
    return(
      <div styleName='curtain_bg'>
        {this.curtainRender()}
      </div>
    )
  }
}

export default Curtain