import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';

/* ant-design popover */
import 'antd/dist/antd.css';
import { Popover, Button, Modal } from 'antd';

/* image import */
import UI_uni from './UI_uni.png';
import notice from './notice.png';
import market from './market.png';
import networking from './networking.png';
import carpool from './carpool.png';
import outlook from './outlook.png';

import market_preview from './market_preview.png';
import networking_preview from './networking_preview.png';
import carpool_preview from './carpool_preview.png';

const button_href = 'http://uitda.net/login'
/* nginx 설정바꾸기 */
// listen 80;
// server_name uitda.net;
// location /login {
//    proxy_pass http://127.0.0.1:3000/api/login/outlook;
// }
// 출처: https://medium.com/sjk5766/nginx-reverse-proxy-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-e11e18fcf843

class Login extends Component {

  /* ant-design modal */
  state = { 
    visible: false,
    title: null,
    previewImage: null
  };

  marketClick = () => { 
    this.setState({
       visible: true,
       title: "유니마켓: 사용하지 않는 전공 서적을 팔고 싶으신가요?",
       previewImage: market_preview
    }); 
  };

  networkingClick = () => { 
    this.setState({
       visible: true,
       title: "네트워킹: 음식을 같이 주문하고 배달비를 줄여보아요.",
       previewImage: networking_preview
    }); 
  };

  carpoolClick = () => { 
    this.setState({
       visible: true,
       title: "택시카풀: KTX 울산역까지 택시 타고 같이 가요!",
       previewImage: carpool_preview
    }); 
  };

  handleCancel = e => { this.setState({ visible: false }); };


  render() {

    /* ant-design popover */
    const tempStyle={
      padding: "10px 10px 0px 10px",
      fontSize: "small"
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
      <div>

        {/* 왼쪽 컨테이너 (파란색 배경) */}
        <div className="Container_Left">

          <div className="Image"><img src={UI_uni}></img></div>
          <div className="Description">
            <h1>유니스트를 잇다!</h1>
            <p>학우들에게 팔고 싶은 물건이 있거나, 부탁하고 싶은 퀘스트가 있으신가요?<br></br>
              유잇다를 통해 가막골 유니스타의 삶의 질을 한 단계 높여보아요</p>
          </div>
          <Popover content={content}>
            <Button className="Button" href={button_href}>
              <img src={outlook}></img>
              <strong>Outlook 로그인</strong>
            </Button>
          </Popover>
          <div className="Privacy">
            개인정보처리방침 | 서비스이용약관
          </div>
      
        </div>

        {/* 오른쪽 컨테이너 (흰색 배경) */}
        <div className="Container_Right">
          
          <div className="Notice">
            <img src={notice}></img>
          </div>

          <div className="Block">
            <div className="Block_Image"><img src={market} onClick={this.marketClick}></img></div>
            <div className="Block_Description">
              <p>사용하지 않는 전공 서적이나 사이즈가 맞지 않는 옷들은 유니마켓 게시판에 등록하여 판매해 보세요. 
              중고 장터의 장점을 그대로 가져와 구매자에게는 합리적 소비를, 판매자에게는 소소한 용돈 벌이 기회를 제공합니다.</p>
            </div>
          </div>

          <div className="Block">
            <div className="Block_Image"><img src={networking} onClick={this.networkingClick}></img></div>
            <div className="Block_Description">
              <p>배송비를 절약하고 싶은 분, 다양한 퀘스트를 가지고 있는 분, 유니스트에 숨겨진 고수를 찾는 분이라면 
              네트워킹 게시판을 이용해 보세요. 보상도 함께 적어주신다면 더 빠른 참여를 유도해내실 수 있습니다.</p>
            </div>
          </div>

          <div class="Block">
            <div class="Block_Image"><img src={carpool} onClick={this.carpoolClick}></img></div>
            <div class="Block_Description">
              <p>택시카풀 게시판에서는 같은 방향으로 이동하는 학우들과 택시를 동승하여 택시비를 절약할 수 있습니다.
                캘린더를 통해 일정을 직관적으로 확인하고 간편하게 일정을 만들어 빠르게 목적지에 도착해 보아요.</p>
            </div>
          </div>

        </div>

        <Modal 
          width="70%" 
          title={this.state.title} 
          visible={this.state.visible} 
          footer={null} 
          onCancel={this.handleCancel}>
          <img style={{ width: '100%' }} src={this.state.previewImage} />
        </Modal>
        
      </div>
    );
  }
}

export default Login;