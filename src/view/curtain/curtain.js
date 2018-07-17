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
 
  render(){
    const { curtains, type } = this.props.curtainState
    console.log(curtains)
    return(
      <div styleName='curtain_bg'>
         {/* <SlidePot num={curtains.length} activeIndex={this.countActive} /> */}
         <div styleName="curtainwrap clearfix" >
          {
            curtains.length===1?curtains.map((curtain, index) => <CurtainOne  curtain={curtain} key={curtain[0].id}/>):
            <Tabs>
            {
              curtains.map((curtain, index)=> (
                <TabPane tab={curtain[0].name} key={index} >
                  <CurtainOne  curtain={curtain} />
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

export default Curtain