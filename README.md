## enactus unist uitda





  
- **업데이트 내용**

  \[19.07.11] EC2 + Nginx + Git 서버 구축, Express 프로젝트 생성 

  \[19.07.30] S3 서버 구축, 이미지 파일 연동 : [설명링크1](https://uhou.tistory.com/114?category=843815)

  \[19.08.03] 서버 컴퓨터 내 DB 구축, 회원가입 임시 차단 : [설명링크1](https://uhou.tistory.com/106?category=835403) [설명링크2](https://uhou.tistory.com/107?category=835403)
  
  \[19.08.09] uitda.net ACM 인증서 발급, ELB 레코드셋 생성, HTTPS 접속만 허용 : [설명링크1](https://uhou.tistory.com/121) [설명링크2](https://uhou.tistory.com/123)


- **해야 할 일**

  보안 이슈 처리: [참고링크](https://expressjs.com/ko/advanced/best-practice-security.html#dont-use-deprecated-or-vulnerable-versions-of-express)
  
  서버 관리 공부: [참고링크](https://blog.carbonfive.com/2014/06/02/node-js-in-production/)
  
  gitignore 처리해야 하는 파일 & 디렉토리 생각하기
 

- **유잇다 프로젝트**

  우리 학교는 학부생과 대학원생을 합쳐 5천명 정도의 학생이 다니고 있고, 이 중 92퍼센트가 기숙사에 입주 해 살고있습니다. 이렇게 많은 학생이 기숙사에 입주 한 이유는 캠퍼스가 외부와 지리적으로 단절되어 있다는 특징 때문입니다. 학생들은 이 점 때문에 생기는 많은 불편함을 토로합니다.

 

  저희 학교 학생들이 겪고 있는 지리적 단절은 학교라는 생활공간에 충분한 편의 시설이 없다는 것과, 교통 인프라가 빈약하다는 것으로 문제가 구체적으로 드러납니다. 생필품 구매조차도 값비싼 편의점 또는 택배라는 비합리적인 소비를 강요받고, 식사의 경우 제한적인 교내 식당 또는 추가 배달 비용이 붙는 비싼 배달 음식이라는 차악을 가리는 2중 택일의 선택지에 놓여 있습니다. 부족한 교통 시설로 인해 학생들은 택시를 타야하는 상황에 많이 놓이게 됩니다. 즉, 고립된 환경은 생필품, 옷, 음식, 교통 등 다양한 부분에서의 공급이 매우 적고, 이는 개개인에게 부담되는 비용이 높아지는 것으로 이어집니다. 

 

  이를 해결하기 위해 유잇다 프로젝트가 찾아낸 솔루션은 내부 구성원들의 생활을 연결하는 방법입니다. 실제로 페이스북을 통해 교내 학생들 사이 이루어 지고 있는 카풀과 중고거래는, 페이스북 거래 시스템의 많은 불편함에도 불구하고, 돈을 절약할 수 있다는 이점 덕분에 많은 거래가 이루어 지고 있었기 때문입니다. 그래서 우리는 사람들을 연결하는 '채널'이 되어 학교 구성원들의 삶을 연결하는 웹(앱) 서비스 제작’ 프로젝트를 시작했습니다.

 

  우리의 서비스는 ‘Market’, ‘Networking’, ’Car pool’ 로 크게 세 가지 카테고리를 가지고 있습니다. ’Market’ 카테고리에서는 학생들 사이에 물건 판매, 중고물품 거래가 이루어집니다. 판매자는 사이즈가 맞지 않는 옷, 전공 서적 등 잉여물품을 판매하여 소득을 창출 할 수 있으며, 구매자는 저렴한 가격에 제품을 구매하여 절약을 할 수 있습니다. ‘Networking’ 카테고리는 학생들의 연결고리 역할을 합니다. 배달음식 같이 주문, 구매 대행 부탁, 연구실 피실험자 모집 등 다양한 퀘스트와 보상을 함께 제시하여 학생들이 교내 물적, 인적 자원을 최대로 활용할 수 있도록 돕습니다. ’Car pool’ 카테고리에서는 같은 방향으로 이동하는 학생들의 카풀이 이루어집니다. 지리적 요건 때문에 많은 학생들의 교외 이동경로가 거의 일치합니다. 그렇기 때문에 이러한 학생들이 카풀을 통해 저렴한 가격에 택시 승차를 할 수 있습니다.

 

 

  우리 프로젝트의 비즈니스 모델은 두 가지 방법으로 생각하고 있습니다. 첫 번째는 ‘로컬 광고 수입’ 입니다. 유잇다 서비스 사용자들의 특징은 저희 학교 재학생이라는 명확한 이용 층을 가지고 있습니다. 그렇기 때문에 이를 대상으로 하는 광고가 효과가 있을 것이라 생각됩니다. 두 번째는 ‘공동구매 진행’ 입니다. 교내 거주하는 다수의 학생들에게 공통적으로 수요가 높은 품목을 뽑자면, 생필품과 자연 식품이 있습니다. 하지만 앞서 말했듯 이 품목들에 대한 소비는 대부분 택배와 편의점을 통해 이루어지기 때문에 비교적 높은 금액이 책정됩니다. 우리 프로젝트는 ‘Market’ 카테고리 내에서 이 품목에 대한 공동구매를 진행하여 학생들이 비교적 싼 값에 생필품과 자연 식품을 구매할 수 있도록 도울 것이며, 이에 대한 수수료를 우리 서비스가 가져가는 형태의 비즈니스 모델을 구상했습니다. 수수료를 우리가 가져가더라도 학생들은 기존에 편의점, 택배를 통한 소비보다 훨씬 싼 값에 소비가 이루어집니다. 
