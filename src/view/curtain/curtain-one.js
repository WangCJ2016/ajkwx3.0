import React from 'react'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'

import styles from './curtain.css'
import InputRange from '../../components/inputRange/inputRange'

@CSSModules(styles, { allowMultiple: true })
class CurtainOne extends React.PureComponent {
  constructor() {
    super()
    this.state = {
    chuanglianActiveIndex:-1,
    chuangshaActiveIndex:-1
    }
  }
  
  curtainCtrl(wayId,key,index,type){
    this.setState({
      [type]:index
    })
    this.props.actions.changeCurtainStatus(wayId,key,100)
  }
  rangeChange(wayId,e){
    e.stopPropagation() 
    e.preventDefault()
    this.props.actions.changeCurtainStatus(wayId,'OPEN',e.target.value)
  }
  touchStart(e){
    e.stopPropagation() 
    e.preventDefault()
  }
  touchMove(e){
    e.stopPropagation() 
    e.preventDefault()
  }
  btnRender(way, curtainType){
    let activeIndex,type
    if (way.name.indexOf('窗帘')>-1) {
      activeIndex = this.state.chuanglianActiveIndex
      type = 'chuanglianActiveIndex'
    }
    if (way.name.indexOf('纱帘')>-1 || way.name.indexOf('窗纱')>-1) {
      activeIndex = this.state.chuangshaActiveIndex
      type = 'chuangshaActiveIndex'
    }
    let curtainBtns = []
    curtainType === 0 ? curtainBtns = [{title:'打开',type:'OPEN'},{title:'停止',type:'STOP'},{title:'关闭',type:'CLOSE'}] : 
     curtainBtns = [{title:'打开',type:'OPEN'},{title:'关闭',type:'CLOSE'}]
    return curtainBtns.map((btn,index) => {
      const style = classNames({
        curtain_btn:true,
        active:index === activeIndex
      })
      return <p key={btn.title} styleName={style} onClick={this.curtainCtrl.bind(this,way.wayId,btn.type,index,type)}>{btn.title}</p>
    })
  }
  curtainTpe0Render(ways, type) {
    return ways?ways.map(way => {
              return (
                <div key={way.id}>
                   <p styleName="curtain_name">{way.name}</p>
                   <div styleName="curtain_group">
                    {this.btnRender(way, type)}
                  </div>
                  <InputRange touchStart={this.touchStart.bind(this)} touchMove={this.touchMove.bind(this)} touchEnd={this.rangeChange.bind(this,way.wayId)}/>       
                </div>
              )
            }):null
  }
   curtainTpe1Render(ways, type) {
     return ways?ways.map(way => {
              return (
                <div key={way.id}>
                   <p styleName="curtain_name">{way.name}</p>
                   <div styleName="curtain_group">
                    {this.btnRender(way, type)}
                  </div>
                </div>
              )
            }):null
  }
  render(){
    const ways  = this.props.curtain
    const type = this.props.type
    return(
      <div styleName="curtain_wrap" style={{width:this.props.width}}>
          {
            type === 0 ? this.curtainTpe0Render(ways, type) : this.curtainTpe1Render(ways, type)
          }
      </div>
    )
  }
}

export default CurtainOne