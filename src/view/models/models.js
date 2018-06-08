import React from 'react'
import classNames from 'classnames'
import CSSModules from 'react-css-modules'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import styles from './models.css'
import * as modelActions from '../../actions/model-actions'

@connect(
  state => ({modelState:state.toObject().modelStore}),
  dispatch => ({
    modelActions: bindActionCreators(modelActions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
 class Models extends React.PureComponent {
  constructor(){
    super()
    this.state = {
      model_activeIndex:-1
    }
    this.changeModel = this.changeModel.bind(this)
  }
  componentDidMount(){
    this.props.modelActions.initialModel()
  }
  changeModel(index, scenceId){
    this.setState({
      model_activeIndex:index
    })
    this.props.modelActions.changeModel(scenceId)
  }

  modelRender_type1(){
    const modelArray = this.props.modelState.models.scenes
    const scenes = modelArray.filter((scence) => scence.name.indexOf('情景') === 0)

    return scenes.map((model,index) => {
          let stylename 
           if (index%2 === 1) {
             stylename = classNames({
                img_wrap:true,
                [model.name.replace('情景', '')]:true,
                active:index === this.state.model_activeIndex,
                second: true
             })
           } else {
             stylename = classNames({
            img_wrap:true,
            [model.name.replace('情景', '')]:true,
            active:index === this.state.model_activeIndex
           })
           }
            return( 
              <figure styleName='figure' key={model.name} >
                  <div styleName={stylename} onClick={this.changeModel.bind(this,index, model.sceneId)}>
                    <div styleName='img_getup' alt=""/>
                  </div>
                  <figcaption styleName='figcaption'>
                    {model.name.replace('情景', '')}
                  </figcaption>
              </figure>
              )
          })
      }
    //东方君悦模式
    modelRender_type2() {
      const { scenes } = this.props.modelState.models
      if (scenes) {
       return scenes.map((model,index) => {
         let stylename 
           if (index%2 === 1) {
             stylename = classNames({
            img_wrap:true,
            [model.name]:true,
            active:index === this.state.model_activeIndex,
            second: true
           })
           } else {
             stylename = classNames({
            img_wrap:true,
            [model.name]:true,
            active:index === this.state.model_activeIndex
           })
           }
          
            return( 
              <figure styleName='figure' key={model.id} >
                  <div styleName={stylename} onClick={this.changeModel.bind(this,index,model.sceneId)}>
                    <div styleName='img_getup' alt=""/>
                  </div>
                  <figcaption styleName='figcaption'>
                    { model.name.indexOf('模式') > -1 ? model.name.slice(0, -2): model.name }
                  </figcaption>
              </figure>
              )
          })
      }
    }
  render(){
    const { type } = this.props.modelState.models
    return(
      <div styleName='models_bg'>
        <div styleName='model_item'>
          { type === 0 ? this.modelRender_type1() : this.modelRender_type2() }
        </div>
      </div>
    )
  }
}

export default Models