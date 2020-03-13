# 유잇다 - Soogeun Task 진행 사항



### 1. 9 (목)

* Login Action CORS 에러 해결
* Manage Edit 상단바 디자인



### 1.11 (토)

* Board 컴포넌트 오래된 코드 개선 (Minheight 속성 부여)
* Board Search Icon 디자인 개선 및 오래된 코드 개선 (styled component, ant-design 사용)
* Home으로 접근 시, '/board/market'으로 리다이렉트 요청. (임시로 홈페이지 default를 market 게시판으로 설정)
* DropZone 렌더링 오류 해결
* 드랍존 ant-design 컴포넌트로 업로드 되는거 확인 !!!



### 1.12 (일)

* Detail Page에서 TypeError: Cannot read property 'length' of undefined 에러 해결
* DropZone 사진 여러개 선택
* DropZone 사진 미리보기



### 1.13 (월)

* DropZone 디자인 완료 !!!! (DropZone 사진 리스트에 style 추가)
* Detail - PhotoBox에 사진이 있는 글에서만 렌더링이 되도록 함



### 1.14 (화)

* Detail 초기화 액션 (unmount 시 실행되도록 함)
* 백앤드 댓글 리스트 -> 프론트 댓글 리스트 변환 함수 생성 (reducers/board 에 만듦)
* 댓글 띄우기 성공 !! ( Comment READ )



### 1.16 (목)

* create 액션
* create 적용
* CommentInput에서 내용이 없으면 alert('내용을 입력하십시오') 출력
* 답글 생성
* 더보기 + update, delete Component (UI)
* 답글 없는 댓글 delete 완료
* 답글 있는 댓글의 경우 답글까지 모두 삭제되도록 함 (delete 완료)



### 1. 21 (화)

* 더보기를 새로운 컴포넌트 파일로 뽑아내기 (코드 리펙토링)
* hover 시에만 댓글의 update, delete 버튼 생성
* 삭제 버튼 클릭 시, popover 창은 사라지게 함



### 1.22 (수)

* 댓글 삭제 modal을 confirm 형태로 바꿈으로써 state의 visible property를 없애고, 관련 함수를 줄이고
  popover의 visible을 추가하면서 modal의 visible 값이 제대로 변경되지 않던 오류를 해결 



### 1.23 (목)

* CommentBox 컴포넌트를 이루는 sub 컴포넌트 (Input, Item, UD)를 Comment_Materials 디렉토리에 따로 보관 함으로써 구조를 깔끔하게 변경함
* getStatusRequest 액션 만들고, BoardDeatilContainer와 ManageContainer에서 해당 메서드를 통해 user 객체를 auth reducer에 저장하도록 함
* Comment Create 시, 로그인이 되어 있지 않으면, 로그인 안내 메시지만 띄우고 Create 액션을 보내지 않기
* 댓글 작성자와 접속된 유저가 일치한 경우에만 해당 댓글에 update/delete 아이콘이 뜨도록 함
* 답글에 대한 코드를 subCommentItem 컴포넌트로 뽑아냄 (코드 리팩토링)
* 답글에도 update / delete UI 뜨도록 함
* 답글 delete action 완료
* 댓글 update 액션 생성
* 댓글 update 액션 적용
* 댓글 수정하기 클릭 시, 이전 내용이 default 값으로 담기게 하기



### 1.28 (화)

* 답글 수정하기 액션 적용 
* 답글 수정하기 취소 컴포넌트 추가
* esc 키를 누르면 취소, enter키 누르면 입력완료 되도록
* 수정하기 시, 수정 태그에 포커스 맞추도록
* 댓글에 shift+enter로 '\n'으로 저장된 데이터를 span 태그와 br 태그를 이용해 줄 띄어지게 render 성공



### 2.1 (토)

* manage edit 상단 바의 BIUS front 작업
* BIUS의 스타일 정보 (state)를 app state인 edit_spanStyle에 저장



### 2.4 (화)

* p 태그 text Align 속성 선택하는 UI 작업 (react-icon 사용해서 align-justify 추가)
* manage 상단바 position fix시킴



### 2.11 (화)

* Board, Manage의 min-height 속성값 정상적으로 부여
  (container에 addEventListener('resize')를 통해 화면 크기가 변하면 windowHeight값도 변경되도록 함  )



### 2.13 (목)

* edit update 미리보기 이미지 띄우기 성공 !!
* 사진 create 에러 해결 (file.originFileObj에 저장한 File 객체를 넘겨줌)
* edit update 페이지 init + get 요청 동기화 문제 해결
  edit 페이지에 title, description 데이터가 안담기는 에러 해결 



### 2.16 (일)

* manage update 사진 삭제 성공
* manage update 구현 완료 (테스트 완료)
* Detail page 렌더링 에러 해결 (초기화를 component did mount 시점으로 이동)
* Detail page 로딩 페이지 제작



### 2.17 (월)

* board, detail 페이지 **초기화 -> 데이터 요청 액션 -> 렌더링** 의 일련의 동기화 처리 완료 
* carpool edit 페이지 디자인



### 2.18 (화)

* Manage 페이지에 min-width 속성 추가
* manage Post의 상태 선택 컴포넌트 (ConditionSelector) 생성
* manage post 관리 버튼 (수정, 삭제, 상태변경)의 공통 style을 정의하고, ant design의 button을 채택 



### 2.19 (수)

* manage 포스팅 상태 변경 기능 완료
* edit page default 보드 기능 완료 (react-router-last-location 패키지 설치)
* edit container의 create isload 값을 state의 didmount 값으로 대체 (이제 반드시 초기화된 이후에 렌더링 됨)
* edit page의 카테고리 값을 앱 state로 옮김
* ManageHeader > EditComponent의 subcomponents 디렉토리 생성, CategorySelectBox 코드 리펙토링



### 2.20 (목)

* EditBody 코드 리펙토링
  EditPaper > EditBoard / EditCarpool 분할
  EditComponents (Title, Dropzone, Description) > EditBoard의 Subcomponents



### 2.23 (일)

* 검색바 디자인 작업 및 css -> styled Component
* Structure/CommonComponents에 Logo.js 생성
  Header, SideBar, ManageHeader에서 사용하는 로고 컴포넌트 통합



### 2.25 (화)

* Full Calendar 스타일링  완료



### 2.27 (목)

* 캘린더의 date 클릭 액션 처리 작업 완료
* Edit header Right Box 코드 리펙토링



### 2.28 (금)

* manage carpool 캘린더의 반응형 웹 디자인 적용 (padding, margin 값 변경, font-size 변경)
* Room Title Input 컴포넌트 제작
* 출발지 도착지 Input 컴포넌트 제작 
* 출발 시각 TimePicker 컴포넌트 제작
* SubTitle 컴포넌트 코드 리펙토링
* SubInfoBox 컴포넌트 제작
* DescriptionBox 컴포넌트 제작



### 3.1 (일)

* Calendar 컴포넌트 디자인



### 3.2 (월)

* 캘린더 컴포넌트 이동 (Base_Calendar로 작업)
* 캘린더의 _findDayElWithDate(), _changeDayElStyle(), _today() 메서드로 오늘이 default로 설정되고, today 버튼 클릭 시 today에 색이 들어오도록 함.
  (html DOM를 받아오기 성공)



### 3.3 (화)

* 카풀 데이터 앱 state로 저장
* 카풀 이벤트 등록 액션 완성



### 3.4 (수)

* 코드 리펙토링
  HeaderContainer, Structure > Header, store > structure action, structure reducer로 구분되어 있던 게시판 전용 헤더를 Board 내부로 이동
  Components > Board 디렉토리를 정리
  SideBar를 컨테이너 레벨에서 컴포넌트 레벨로 이동
  BoardDetail, Carpool도 구조 변화 작업



### 3.5 (목)

* 카풀탭 박스영역 스타일링
* 카풀에 캘린더 띄우기



### 3.6 (금)

* 캘린더 이벤트 관련 액션 프로토타입 제작
  initCalenderEvents,
  renderTotalEvents,
  renderMyEvents,
  changeClosedEvents



### 3.7 (토)

* 캘린더에 이벤트 띄우기 성공



### 3.8 (일)

* 캘린더 day header 부분 hover 시에도 여백 부분 hover와 동일한 스타일 주기 성공
* Date Info Box에 선택된 날짜 띄우기
* 선택된 날짜에 해당되는 이벤트만을 저장하는 리스트 생성 (eventsOnSelectedDate)
* Date Info Box에 해당 날짜의 이벤트 목록 띄우기
* 이벤트 클릭 시, 해당 이벤트의 데이터가 app state에 저장되기 성공
* 이벤트 클릭 시, Modal 띄우기 성공



### 3.11 (수)

* 카풀 DateInfoBox UI 작업
* 패키지 업데이트 (antd v3 -> v4)
* 카풀 UI 디자인 작업



### 3.12 (목)

* 앱에서 사용되는 모든 Date 데이터의 timezone을 UTC로 설정
* owner_closed, guest_closed 라벨 처리 완료



### 3.13 (금)

* Common Component인 UserPhoto, MoreButton 생성
* 캘린더 크기에 따라 한 칸에 들어가는 이벤트 개수 설정
* 이벤트 Modal UI 작업 진행중







## 해야 할 일

#### Board FrontEnd

* 디테일 페이지에서 뒤로가기 했을 때, render가 안되는 오류
* 반응형 웹 - 가로 개수에 맞게 fake카드 렌더링
* 무한 스크롤 islast 점검 (간혹 2번 요청이 가는 경우가 있음)



* 로딩 바 css 스타일 다듬기
* 검색창에 자동완성 기능 추가
* 사진 넘기기 아이콘 ant-design 적용
* 사진 Ant Design의 Carousel Component 검토
* postlist 초기화 및 중복 요청 제거
* 상세 페이지에서 다시 돌아올때는 초기화 X
* 검색 창 띄우기 아이콘이 안 보일 때 위치에 갖다대면 cursor 모양으로 바뀌는 에러



#### Detail FrontEnd

* 댓글 create, delete시 뜨는 proxy 에러 원인 찾기 -> reload를 실행해서 그러함. socket.io를 이용한다면 해결될 문제.

* console 창에 뜨는 props 타입 관련 에러 메시지 -> type script로 변경하지 않는 이상 해결되지 않을 것 같음. (혹은 콘솔 에러 메시지를 없애기 위해 지저분한 코드를 만들어야 함.)
  기능상에 문제는 전혀 없기 때문에 넘어갑시다.

  
  
* 댓글 수정 시 (수정 됨) 을 추가하기

* 스타일이 적용된 태그를 포함한 내용을 DescriptionBox 컴포넌트에 렌더링 시키기

* 가끔 댓글 전체가 안담기는 에러가 있음. 백엔드 문제인지 프론트 문제인지 확인 필요

* 렌더링 되기 이전에 페이지 못찾음이 아닌 로딩 페이지로

* CommonComponents의 UserPhoto와 MoreButton을 이용하기

  

* 사진이 없는 글 디자인 고려

* 사진 Ant Design의 Carousel Component 검토

* 댓글 더보기 기능

* 답글 더보기 기능

* socket.io 공부하기

* socket.io를 이용해 클라이언트의 데이터 실시간 업데이트 되도록 하기




#### Login FrontEnd

* Login 페이지 디자인
* Outlook 로그아웃 한 상태로, 데스크탑으로 Login 기능 확인
* 로그인 완료 후 로그인 페이지로 오기 이전에 페이지로 redirect하기
* 첫 로그인 시, outlook을 통해 회원가입 되었습니다. 메시지 뜨기
* 모든 컨테이너에서 user data 가 없는 경우 로그인 페이지로 이동하도록 하기



#### Home FrontEnd

* Home 페이지 디자인



#### Manage FrontEnd

* edit carpool 페이지 mount 될 때, init시키기
* edit carpool에서 필수 데이터 입력 안 했을 시, post request하기 전에 경고 띄우기
* edit carpool Room Info Box 스타일링
* '/manage' 로 시작하는 URL을 브라우저 창에 입력하고 enter를 누르면 강제로 '/board/market'으로 리다이렉트 되는 에러
  Redirect 문제 (포스트 delete 시, '/board/market'으로 이동)
  reload (새로고침) 하는데 왜 '/board/market' 으로 이동할까 ?
  예상 -> manage container의 user가 없는 경우 auth/login 가고 auth/login에서 /로 갈 듯



* Carpool 탭의 Time Picker에서 OK 안누르고 바깥을 눌러도 저장되도록 변경
* Manage Carpool Calendar의 경우, 옛날 날짜를 선택하는 경우 경고 메시지 띄우기
  * 1) 날짜 누를 때 방지 2) 등록하기 버튼을 누를 때 날짜를 확인하세요라고 경고
* store/manage에 있는 selectDate 액션 및 selectedDate는 Carpool로 통일해도 좋을 듯 
* edit board 앱 데이터 및 저장 액션 리펙토링
* carpool 수정 UX/UI 고려
* carpool room input style 코드 리팩토링
* edit 상단바 funcbox 코드 리펙토링
* edit 상단바가 스크롤 내리면 위에 tooltip 생기는 거 고치기
* Edit Page 나가기 전에 '나가시겠습니까 묻기'
* edit carpool 작성 완료 시 카풀 페이지 나왔을 때 바로 카풀 이벤트가 뜨지 않음 (시간이 필요함)
* 다판다, 잉력시장 글 관리 서로 넘어갈 때, 로딩 페이지로 부드럽게 넘어가도록



* 글 쓰기로 edit 페이지 들어갈 때, undefined가 들어가서 렌더링 안되는 오류 (/manage/posts/undefined)

* edit 페이지에서 뒤로가기로 manage로 이동했을 때 흰색 화면 에러
DevTools failed to parse SourceMap: http://localhost:4000/main.8ae3c3b0b675dda1e918.hot-update.js.map
  
  
  
* 작성하다가 삭제를 했을 때, DropZone 미리보기와 실제 업로드 되는 사진이 다른 오류 (현재 발견되지 않음)

* DropZone PhotoList의 width값 고정된거 없애기

* Edit Page 상단 바 디자인

* Edit 상단 아이콘 기능 구현

* Edit 스타일을 지닌 태그들을 어떻게 저장할 것인지 구상

* 사진 업로드 최대 개수 (현재 6개)

* 사진 순서 변경 기능 (백앤드 작업 이후)

* 내용이 없이 create 했을 때, 경고 메시지 창 띄우기



#### Carpool FrontEnd

* 이벤트 클릭 시 해당 이벤트 모달 출력
* MenuBox UI
* DateInfoBox UI
* manage에서 작성 이후 carpool로 redirect될 때, carpool 이벤트가 DB에 담기기 전에 get 요청을 함
* 화면의 높이를 줄일때 캘린더 높이가 변화되지 않음
* manage 캘린더에 이벤트 띄우고 없애는 버튼 만들기
* date info box의 리스트 최대 개수 정하기



* carpool action type 이름 정리
* carpool 시작 전 로딩 페이지 띄우기



#### Header FrontEnd

* 유저 아이콘 배치

  

#### FrontEnd

* 



#### User BackEnd

* 현재 user status를 알 수 있는 api 만들기



---

### 논의 사항

* 한 기기에서 한 아이디만 사용할 수 있는 문제

  * 로그 아웃 시, 아웃룩까지 로그 아웃 가능 ?
  * 로그인 시, 아웃룩에 이 아이디로 로그인 하실 것인가요 묻기 가능 ?
  



* 내가 참여한 카풀 일정을 안내할 방법
  1. modal 부분에 댓글을 달 수 있도록 하고, 내가 댓글 단 카풀 일정을 표시
     내 카풀 일정에는 내가 방장인 이벤트 + 내가 댓글 단 이벤트를 구분해서 나타내기
  2. modal 페이지에 참가 신청 추가 / 현재 참여 신청한 인원 및 완료한 인원 표시
     참가자에게 '방장이 확인할 수 있도록 연락을 드리는 것을 권장합니다' 안내 창 띄우기
     방장에게는 알림과 함께 modal에 참여 신청한 인원 목록 + 목록별 승락 거절 버튼 제공
     내 카풀 일정에는 내가 방장인 이벤트(노랑) + (참여 신청한 이벤트 + 참여 완료된 이벤트)(초록)으로 구분하고, 참여 신청한 이벤트는 거절 또는 날짜가 지난 경우 내 카풀에서 제외
     카풀 페이지에 참여 신청 / 완료를 구분하여 안내하고, 현재 모바일 알림기능이 구현되지 않았기 때문에 직접 연락이 필요한 점을 설명하고, 직접 연락해서 결정한 내용을 기준으로 약속이 정해짐을 안내
  



* 카풀 탭에 user, 알림, 메시지 아이콘을 놓을 공간이 없음. 해결 방법 
* 카풀 일정에 Title이 필요할까 ? 작성 시간은 ?
* 기본 description: '연락처로 직접 연락 주시길 바랍니다.' : '메시지 부탁드립니다.'
* 연락처, 집합 장소 빈칸 처리 방법





### 요청 사항

* comment, board의 시간을 작성 시간 기준으로 할 지, 수정 시간을 기준으로 할 지

* Carpool 게시판 페이지 디자인

* 로그인이 안될 때 안내 문구

* 공용 PC에서 outlook 로그아웃 방법

* carpool 이벤트 model에 username 대신 user 객체

* carpool 이벤트 model에 작성시간 추가

  

