import React, { Component } from 'react';
import './Login.css';

/* componenets load */
import PhotoBox from './PhotoBox';

/* ant-design popover */
import 'antd/dist/antd.css';
import { Popover, Button, Modal } from 'antd';

/* image import */
import UI_uni from './img/UI_uni.png';
import notice from './img/notice.png';
import market from './img/market.png';
import networking from './img/networking.png';
import carpool from './img/carpool.png';
import outlook from './img/outlook.png';

import mp1 from './img/market_preview1.png';
import mp2 from './img/market_preview2.png';
import np1 from './img/networking_preview1.png';
import np2 from './img/networking_preview2.png';
import cp1 from './img/carpool_preview1.png';
import cp2 from './img/carpool_preview2.png';

const button_href = 'http://uitda.net/login'

class Login extends Component {

  /* ant-design modal */
  state = { 
    visible: false,
    previewImageList: null
  };

  componentDidMount() {
    this.setState({
        photoOrder: 0
    })
    window.addEventListener('resize', this._updateWindowSize);  // window 사이즈 변경 시, 변경된 값을 state에 저장

    this._updateWindowSize();
  }

  _ClickPrevButton = () => {
    this.setState({
        photoOrder: this.state.photoOrder - 1
    })
  }

  _ClickNextButton = () => {
    this.setState({
        photoOrder: this.state.photoOrder + 1
    })
  }

  _ClickCircleButton = (i) => {
    console.log(i);
    this.setState({
        ...this.state,
        photoOrder: i
    })
  }

  marketClick = () => { 
    this.setState({
       visible: true,
       previewImageList: [mp1,mp2]
    }); 
  };

  networkingClick = () => { 
    this.setState({
       visible: true,
       previewImageList: [np1,np2]
    }); 
  };

  carpoolClick = () => { 
    this.setState({
       visible: true,
       previewImageList: [cp1,cp2]
    }); 
  };

  handleCancel = e => { 
    this.setState({ visible: false }); 
    this.setphotoOrder(0);
  };

  setphotoOrder = e => {
    this.setState({ photoOrder: 0 }); 
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._updateWindowSize);
  }

  _updateWindowSize = () => {
    this.setState({
        ...this.state,
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
    })  
}

  render() {

    /* ant-design popover */
    const tempStyle={
      padding: "10px 10px 0px 10px",
      fontSize: "small"
    }

    const tempStyle2={
      paddingTop: `${(this.state.windowHeight-660)/2}px`
    }

    const content = (
      <div style={tempStyle}>
        <div>
          <p>별도의 <strong>회원가입 없이</strong> outlook 로그인 후 유잇다를 이용하실 수 있습니다.<br></br>
          개인 정보 보호를 위해 공용 PC에서 로그아웃 상태를 <strong>반드시</strong> 확인해주세요.</p>
        </div>
      </div>
    );

    

    /* rendering */
    return (
      <>
      {((this.state.windowWidth)>700)?
      <div>

        {/* 왼쪽 컨테이너 (파란색 배경) */}
        <div className="Container_Left">

          <div className="Image"><img src={UI_uni}></img></div>
          <div className="Description">
            <h1>유니스트를 잇다!</h1>
            <p>학우들에게 팔고 싶은 물건이 있거나, 부탁하고 싶은 퀘스트가 있으신가요?<br></br>
              유잇다를 통해 가막골 유니스타의 삶의 질을 한 단계 높여보아요</p>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <Popover content={content}>
              <Button className="Button" href={button_href}>
                <img src={outlook}></img>
                <strong>Outlook 로그인</strong>
              </Button>
            </Popover>
          </div>
          <div className="Privacy">
            <a href="/개인정보처리방침.pdf">개인정보처리방침 </a>
             | 
            <a href="/서비스이용약관.pdf"> 서비스이용약관</a>
          </div>
      
        </div>

        {/* 오른쪽 컨테이너 (흰색 배경) */}
        <div className="Container_Right" style={tempStyle2}>
          
          <div className="Notice">
            <img src={notice}></img>
          </div>

          <div className="Block">
            <div className="Block_Image"><img src={market} onClick={this.marketClick}></img></div>
            <div className="Block_Description">
              <p> 유니마켓은 학생들 간 물품 거래가 이루어지는 공간입니다. 사이즈가 맞지 않는 옷이나 더 이상 필요가 없는
                전자기기 등 잉여 물품을 판매하거나, 애타게 구하던 신발, 급하게 필요한 전공 서적 등을 구매할 수 있습니다. </p>
            </div>
          </div>

          <div className="Block">
            <div className="Block_Image"><img src={networking} onClick={this.networkingClick}></img></div>
            <div className="Block_Description">
              <p> 배송비를 절약하고 싶은 분, 다양한 퀘스트를 가지고 있는 분, 유니스트에 숨겨진 고수를 찾는 분이라면 
              네트워킹 게시판을 이용해 보세요. 보상도 함께 적어주신다면 더 빠른 참여를 유도해내실 수 있습니다.</p>
            </div>
          </div>

          <div class="Block">
            <div class="Block_Image"><img src={carpool} onClick={this.carpoolClick}></img></div>
            <div class="Block_Description">
              <p>택시카풀 게시판에서는 같은 방향으로 이동하는 학우들과 택시를 동승하여 교통비를 절약할 수 있습니다.
                캘린더 UI를 통해 일정을 직관적으로 확인하고 간편하게 카풀 인원을 모아서 빠르게 목적지에 도착해 보아요.</p>
            </div>
          </div>

        </div>

        <Modal 
          width="70%" 
          visible={this.state.visible} 
          footer={null} 
          onCancel={this.handleCancel}>
          <PhotoBox 
                filelist={this.state.previewImageList}
                boardName={null}
                postId={null}
                photoOrder = {this.state.photoOrder}
                _ClickPrevButton = {this._ClickPrevButton}
                _ClickNextButton = {this._ClickNextButton}
                _ClickCircleButton = {this._ClickCircleButton}
          />
        </Modal>
        
      </div>:
        <div className="Container_Left2">

        <div className="Image"><img src={UI_uni}></img></div>
        <div className="Description">
          <h1>유니스트를 잇다!</h1>
          <p>학우들에게 팔고 싶은 물건이 있거나, 부탁하고 싶은 퀘스트가 있으신가요?<br></br>
            유잇다를 통해 가막골 유니스타의 삶의 질을 한 단계 높여보아요</p>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          <Popover content={content}>
            <Button className="Button" href={button_href}>
              <img src={outlook}></img>
              <strong>Outlook 로그인</strong>
            </Button>
          </Popover>
        </div>
        <div className="Privacy">
          개인정보처리방침 | 서비스이용약관
        </div>
        
      </div>
      }
      </>
    );
  } 
}

export default Login;