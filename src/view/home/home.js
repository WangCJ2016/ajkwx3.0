import React from 'react'
import CSSModules from 'react-css-modules'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'


import styles from './home.css'
import * as homeActions from '../../actions/home-actions'
import * as roomCardActions from '../../actions/roomCard-actions'
import { elevator } from '../../actions/elevtor-actions'
import HomeEnvir from './components/home-envir/home-envir'
import HomeName from './components/homeName'
import LockBtn from './components/lockBtn'

@connect(
  state => ({
    idState:state.toObject().idStore, 
    homeState: state.toObject().homeStore,
    deviceId:state.toObject().roomCardStore.deviceId,
    elevatorIf: state.toObject().elevtorStore.elevatorIf
  }),
  dispatch => ({
    homeActions: bindActionCreators(homeActions, dispatch),
    roomCardActions: bindActionCreators(roomCardActions, dispatch),
    elevator: bindActionCreators(elevator,dispatch),
  })
)
@CSSModules(styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })
class Home extends React.PureComponent {
  constructor(){
    super()
    this.state = {
      activeIndex:-1,
      ifFirst: !localStorage.getItem('ifFirst')
    }
  }
  componentDidMount(){
    document.title = this.props.location.query.name
    this.props.homeActions.initialState(this.props.location.query.houseId)
    this.props.homeActions.saveHouseId(this.props.location.query.houseId)

    const houseId = this.props.location.query.houseId
    this.props.roomCardActions.initialState(houseId)

    const hotelId = this.props.location.query.hotelId
    const floor = this.props.location.query.floor
    this.props.elevator({floor: floor,hotelId: hotelId})
  }
  figuresRender(){
    let figures = [
      {name:'light',title:'灯',path:`light?houseId=${this.props.location.query.houseId}&serveId=${this.props.homeState.serveId}`},
      {name:'air',title:'空调',path:`air?houseId=${this.props.location.query.houseId}`},
      {name:'tv',title:'电视',path:`tv?houseId=${this.props.location.query.houseId}`},
    {name:'curtain',title:'窗帘',path:`curtain?houseId=${this.props.location.query.houseId}`},
    // {name:'lock',title:'门锁',path:`lock?name=${this.props.location.query.name}&houseId=${this.props.location.query.houseId}&floor=${this.props.location.query.floor}&hotelId=${this.props.location.query.hotelId}`},
    {name:'model',title:'情景',path:`model?houseId=${this.props.location.query.houseId}`},
    {name:'service',title:'服务',path:`service?${this.props.location.search.slice(1)}`},
   ]
   figures = this.props.elevatorIf?[...figures,{name:'dianti',title:'电梯',path:`elevtor?hotelId=${this.props.location.query.hotelId}&floor=${this.props.location.query.floor}`}]: figures
   figures =  Array.from(new Set(figures))
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
  modalClick = () => {
    this.setState({
      ifFirst: false
    })
    localStorage.setItem('ifFirst',1)
  }
  openDoor = () => {
    this.props.roomCardActions.openTheDoor(this.props.deviceId)
  }
  render(){
    const {temp, pm, hum} = this.props.idState.envir 
    return(
      <div styleName='home_bg'>
        <div styleName='top_item'>
          <HomeName name={this.props.location.query.name}/>
        </div>
        <HomeEnvir temp={temp} pm={pm} hum={hum} />
       
        <LockBtn openDoor={this.openDoor}></LockBtn>
        <div styleName='figure_wrap'>
        {
          this.figuresRender()
        }
        </div>
        {
          this.state.ifFirst?
          <div styleName='first_modal' onClick={this.modalClick}>
            <img src={require('../../assets/imgs/home/tip.png')} alt=""/>
            <div styleName='modal_wrap'>
              <LockBtn openDoor={this.openDoor}></LockBtn>
            </div>
          </div>:null
        }
        
      </div>
    )
  }
}

export default Home