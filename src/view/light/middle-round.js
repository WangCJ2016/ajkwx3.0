import React from 'react'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/light-actions'

import styles from './light.css'

@connect(
  state => ({lightStore:state.toObject().lightStore,idStore:state.toObject().idStore}),
  dispatch => ({
    lightActions: bindActionCreators(actions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true })
class MiddleRound extends React.PureComponent {
  constructor(props) {
    super()
    const classarray = ['卫生间','卧室','走廊','其他']
    let middle_round_rotate= 0
    let _index = 1
    classarray.forEach((value, index) => {
      if (value === props.middleRoundStatus) {
        middle_round_rotate=index*25-25
        _index = index
      }
    })
     
    this.state={
      middle_round_rotate:middle_round_rotate,
      middle_roundIndex:_index
      }
  }
  typeClick(middle_round_rotate, index, classs) {
    this.setState({middle_round_rotate:middle_round_rotate,middle_roundIndex:index})
    this.props.middleRoundClick(classs)
    this.props.lightActions.largeRoundRotate(0)
  } 
  lightclassRender(){
    const classarray = ['卫生间','卧室','走廊','其他']
    return classarray.map((classs,index) => {
      const rotate =-index*25+30
      const middle_round_rotate=index*25-25
      const stylename =  classNames({
        class_title:true,
        class_title_active:index === this.state.middle_roundIndex
      }) 
      return (
      <p 
        styleName={stylename}
        style={{transform:`rotateZ(${rotate}deg)`,WebkitTransform:`rotateZ(${rotate}deg)`}}
        key={index}
        onClick={this.typeClick.bind(this, middle_round_rotate, index, classs)}>
        {classs}
      </p>
      )
    })
  }
  
  render(){
    return(
      <div styleName="middle_round" style={{transform:`rotateZ(${this.state.middle_round_rotate}deg)`,WebkitTransform:`rotateZ(${this.state.middle_round_rotate}deg)`}}>
            {this.lightclassRender()}
      </div>
    )
  }
}

export default MiddleRound