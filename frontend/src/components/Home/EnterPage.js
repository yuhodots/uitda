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

const button_href = 'http://uitda.net/Login'
/* nginx 설정바꾸기 */
// listen 80;
// server_name uitda.net;
// location /Login {
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
              <p>과학기술 특성화 대학 및 SW 중심 대학의 강좌가 더 많은 사람들에게 나누어지도록 교육 기회를 제공하고 있습니다. 
                우수 대학의 명품 강좌를 만나보세요. 과학기술 특성화 대학 : KAIST, POSTECH, UNIST, DGIST, GIST</p>
            </div>
          </div>

          <div className="Block">
            <div className="Block_Image"><img src={networking} onClick={this.networkingClick}></img></div>
            <div className="Block_Description">
              <p>학생들이 지금까지 배운 내용 마스터 할 수 있도록 전 영역에 걸쳐 문제를 제공합니다. 
                이 기능을 통해 학습자의 진도를 한눈에 파악할 수 있습니다. 수준에 따라 자동으로 제공되는 문제로 완전학습을 경험해보세요.</p>
            </div>
          </div>

          <div class="Block">
            <div class="Block_Image"><img src={carpool} onClick={this.carpoolClick}></img></div>
            <div class="Block_Description">
              <p>커넥트티처는 커넥트재단이 양성하고 인증한 소프트웨어 교육 전문가입니다. 
                소프트웨어 교육 전문강사를 희망하는 누구나 교육을 받고 평가, 인증과정을 거쳐 커넥트티처로 가입할 수 있습니다.</p>
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