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
    if(this.state.model_activeIndex === index && this.delayIf) {
       return
    }
    this.setState({
      model_activeIndex:index
    })  
    this.props.modelActions.changeModel(scenceId, this.delayClick)
  }
  delayClick = () => {
    this.delayIf = true
    setTimeout(()=>{
      this.delayIf = false
    }, 2000)
  }
  modelRender_type1(){
    const modelArray = this.props.modelState.models.scenes
    const scenes = modelArray.filter((scence) => scence.name.indexOf('情景') === 0)

    return scenes.map((model,index) => {
          let stylename = classNames({
                figure:true,
                [model.name.replace('情景', '')]:true,
                active:index === this.state.model_activeIndex,
                
             })
            return( 
              <figure styleName={stylename} key={model.name} onClick={this.changeModel.bind(this,index, model.sceneId)}>
                  <div  >
                  </div>
                  <figcaption styleName='figcaption'>
                    {model.name.replace('情景', '')}
                  </figcaption>
                  {
                    index === this.state.model_activeIndex?
                    <img styleName='checked' src={require('../../assets/imgs/models/checked.png')} alt=""/>:null
                  }
              </figure>
              )
          })
      }
    //东方君悦模式
  modelRender_type2() {
    const { scenes } = this.props.modelState.models
    if (scenes) {
      return scenes.map((model,index) => {
        let stylename = classNames({
          figure:true,
          [model.name.replace('情景', '')]:true,
          active:index === this.state.model_activeIndex,
          })
          return( 
            <figure styleName={stylename} key={model.id} onClick={this.changeModel.bind(this,index,model.sceneId)}>
                <div>
                </div>
                <figcaption styleName='figcaption'>
                  { model.name.indexOf('模式') > -1 ? model.name.slice(0, -2): model.name }
                </figcaption>
                {
                  index === this.state.model_activeIndex?
                  <img styleName='checked' src={require('../../assets/imgs/models/checked.png')} alt=""/>:null
                }
            </figure>
            )
        })
    }
  }
  render(){
    const { type } = this.props.modelState.models
    return(
      <div styleName='models_bg'>
          { type === 0 ? this.modelRender_type1() : this.modelRender_type2() }
      </div>
    )
  }
}

export default Models