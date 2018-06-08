import React from 'react'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'

import styles from './home.css'
import * as homeActions from '../../actions/home-actions'
import HomeEnvir from './components/home-envir/home-envir'
import HomeName from './components/homeName'
import LockBtn from './components/lockBtn'

@connect(
  state => ({idState:state.toObject().idStore, homeState: state.toObject().homeStore}),
  dispatch => ({
    homeActions: bindActionCreators(homeActions, dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class Home extends React.PureComponent {
  constructor(){
    super()
    this.state = {
      activeIndex:-1
    }
  }
  componentDidMount(){
    document.title = this.props.location.query.name
    this.props.homeActions.initialState(this.props.location.query.houseId)
    this.props.homeActions.saveHouseId(this.props.location.query.houseId)
  }
  figuresRender(){
    const figures = [
      {name:'light',title:'灯',path:`light?houseId=${this.props.location.query.houseId}&serveId=${this.props.homeState.serveId}`},
      {name:'air',title:'空调',path:`air?houseId=${this.props.location.query.houseId}`},
      {name:'tv',title:'电视',path:`tv?houseId=${this.props.location.query.houseId}`},
    {name:'curtain',title:'窗帘',path:`curtain?houseId=${this.props.location.query.houseId}`},
    // {name:'lock',title:'门锁',path:`lock?name=${this.props.location.query.name}&houseId=${this.props.location.query.houseId}&floor=${this.props.location.query.floor}&hotelId=${this.props.location.query.hotelId}`},
    {name:'model',title:'情景',path:`model?houseId=${this.props.location.query.houseId}`},
    {name:'service',title:'服务',path:`service?${this.props.location.search.slice(1)}`},
    {name:'dianti',title:'电梯',path:`model?houseId=${this.props.location.query.houseId}`},
   
   ]
   return figures.map((figure,index) => {
      const stylename = classNames({
            [figure.name]:true,
            home_figure:true,
            figure_active: this.state.activeIndex === index
           })
      return (
        <Link to={figure.path} key={figure.name} activeClassName='active'>
          <figure styleName={stylename} key={figure.name}  onClick={this.goDetail.bind(this,index,figure.path)}>
            <img src={require(`../../assets/imgs/home/${figure.name}.png`)} alt="" />
            <figcaption>{figure.title}</figcaption>
          </figure>
        </Link>
      )
   })
  }
  goDetail(index,path){
    this.setState({
      activeIndex:index
    })
  }
  render(){
    const {temp, pm, hum} = this.props.idState.envir 
    return(
      <div styleName='home_bg'>
        <HomeEnvir temp={temp} pm={pm} hum={hum} />
        <HomeName></HomeName>
        <LockBtn></LockBtn>
        <div styleName='figure_wrap'>
        {
          this.figuresRender()
        }
        </div>
      </div>
    )
  }
}

export default Home