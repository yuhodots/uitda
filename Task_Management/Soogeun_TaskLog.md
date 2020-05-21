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



### 3.14 (토)

* Carpool Subcomponents 디렉토리 구조 정리
* 더보기 UI 작업
* 카풀 일정 삭제 기능 구현 완료
* Common Component인 UnderLineTextArea 생성
* 카풀 일정 수정하기 시간 관련된 내용 빼고 모두 구현



### 3.15 (일)

* Uitda Time Picker 컴포넌트 제작



### 3.16 (월)

* 카풀 일정 수정하기 구현 완료 !!!
* Calendar state update와 관련된 render 오류 해결
* 모달 헤더 user, created update
* date info box 리스트 scroll 기능 추가
* info modal 에러 해결



### 3.17 (화)

* 카풀 마감, 마감취소, 신청, 신청 취소 액션 제작
* 이벤트 마감 기능 구현
* 신청 기능 제작 (확인 X)
* 로그인 되어 있지 않으면 모든 컨테이너에서 Home컨테이너(enterpage)로 이동하고, 로그인 된 상태에서는 '/'로 이동했을 때 '/board/market'으로 이동하도록 함
* fake card render 함수 기능 수정



### 3.24 (화)

* SideBar Menu Box 코드개선

  code 리펙토링: 아이콘 이미지를 styles/images 디렉토리로 이동, MenuItem을 분리
  css -> styled Component

* Chatting page, container 컴포넌트 생성

* Board, Manage, Edit, Chatting의 Header 컴포넌트의 공통부분을 묶는 BaseHeader 컴포넌트 생성



### 3.25 (수)

* BackgroundTemplate 공통 컴포넌트 제작



### 3. 26 (목)

* Chatting Body 뼈대 structure component 제작
* Bell, Messenger Icon svg 파일 제작
* User Badge Box 생성



### 3. 27 (금)

* Components, Container 디렉토리 구조 개선 (Manage, Edit 분리)
* Manage, Edit 헤더가 Base Header를 사용하도록 코드 개선



### 3. 29 (일)

* 공통 컴포넌트의 MoreButton을 UitdaPopover로 변경하고, Popover의 공통 속성을 갖는 컴포넌트로 변경.
  Popover의 특성은 이용하되, Popover 트리거가 MoreIcon으로 고정된 것을 변경함
* Header의 User 사진 아이콘에서 계정관리, Logout 기능을 추가함
* manage user photo upload



### 3.30 (월)

* local login 구현
* Message 보내기 클릭 시 chatting page로 이동



### 4.2 (목)

* Redux dev tool 사용

* didmount시 홈으로 redirect되는 에러 해결
  component Did Mount 함수 내에서 getStatusRequest의 실행 완료보다, setState(isLoaded:true)의 실행이 빨라서 모든 컨테이너가 처음 생성될 때 (새로고침 포함) EnterPage로 이동되었다가 market board로 리다이렉트되던 오류를 해결함

  container의 state.isloaded를 이용하지 않고, app의 isGetStatusDone과 해당 컨테이너의 데이터 get이 완료된 후 container 컴포넌트가 render되도록 함

* manage state에 IsManageItemsLoading 추가하고 관련된 action, reducer 제작



### 4.3 (금)

* Carpool Room Modal의 Popover Content 코드 리펙토링
* Chatting Box Header 생성
* Chatting Reducer, Action 생성



### 4.4 (토)

* Chatting Begining Request action 및 reducer 제작



### 4.5 (일)

* Uitda Popover의 Content List Item 중 link type의 아이템을 render하는 기능 추가

* 메시지 보내기를 window.location.assign 대신 link태그를 이용하도록 변경

* 브라우저의 url 입력을 통해 채팅방 이동을 막음

  내부의 React Router Link를 통한 url 변경일 때만 채팅방을 render하고,
  그 외의 경우 index를 render한다.

* Chatting Room List Box UI 작업

* Chatting Room List Item 선택된 방 스타일



### 4.11 (토)

* Chatting Room out 구현
* Chatting Room List Item 스타일링



### 4.12 (일)

* socket emit on chat message 기능 제작
* Message Board 작업 중



### 4.16 (목)

* 채팅 메시지 스타일링
* 채팅 메시지 Input 박스에서 엔터키로 전송 기능 사용 구현
* 채팅방 들어갔을 때, 스크롤을 가장 아래로 위치하도록 하기



### 4.23 (목)

* board 넘어갈 때, 흰 페이지에서 넘어가지 않는 오류 해결 (NoPhoto render)

* Market, Network Card => Photo, NoPhoto Card

* PhotoBox에 ant design의 carousel을 적용

  자연스러운 애니메이션

  a태그 대신 Link 태그

  Button을 띄우는 조건 추가 - isHover, 사진이 1개라도 있을 때. Button은 carousel 메서드 이용

  버튼 스타일링

  BlackMask는 NoPhoto인 경우만 hover 효과

* Board Body의 min-width 스타일 추가



### 4.26 (일)

* PostCard 스타일링
  라벨 Circle 추가
  NoPhoto Card 스타일 추가 (Info box 위치 변경, Description Box 사이즈 변경)
  네트워킹 카테고리에서는 가격 태그 제거
  가격 업데이트
* PhotoCard, NoPhotoCard 리팩토링 => PostCard에 통합하고, props를 변경하는 것으로 리팩토링 성공
* UserPhoto의 basic 이미지를 '윤이'로 설정
* Detail Page 스타일링
  Header Info 스타일링 UserPhoto, Username, Created, Status 스타일링
  NoPhoto 글은 세로 구분선 없앰
  Comment Box는 하단에 위치 고정
  하얀 배경 max-width 설정
  Description Box 줄 띄어쓰기 (\n) 제대로 처리



### 4.30 (목)

* Detail Page 하얀 배경의 좌우 Border 스타일을 추가. 가로길이를 축소했을 때, 세로 구분선이 생기도록 함.
* Uitda Popover list item에 theme danger 속성 추가
  theme danger 인 경우, 글자 색이 빨간색
* Detail Page Header Box 코드 리펙토링
  HeaderBox -> InfoTextBox 분리, renderPopoverContent 분리
* 게시글 수정 / 삭제 기능 추가. 게시글 페이지 우측 상단에 popover 컴포넌트 추가.
  내 글인 경우 수정하기, 삭제하기가 뜨고, 수정하기는 edit page로 이동하고 삭제하기는 게시글 삭제 후 board로 이동하는 기능
  내 글이 아닌 경우, 관심글 등록, 메시지 보내기 항목이 나타나도록 함



### 5.1 (금)

* Chatting Frontend 작업
  Chatting Input css 스타일링 작업
  UserPhoto 컴포넌트로 업데이트



### 5.2 ~ 5.7

* Comment Front 작업 완료



### 5.9 (토)

* Manage Side Category Box 카테고리 수정 / 스타일링 작업



### 5.11 (월)

* Manage Content Header 컴포넌트 생성 (Content 공통 컴포넌트)
* Manage Profile 생성
* Manage Profile 디자인 작업 
* Manage Footer 추가
* Edit Board 카테고리의 Header 글자 스타일 관련 내용 주석처리
* 잉력시장, 다판다 게시글 수정 후 다시 수정하기를 했을 때, manage 페이지로 redirect되는 오류 해결



### 5.13 (수)

* app.css에 body font 추가
* Edit Carpool Style Update
* carpool 참가신청 front error 해결



### 5.14, 5.15 (목,금)

* actions/ POST request action refactoring

* 프로필 사진 업로드, 삭제 / POST 요청 액션 및 reducer 작업 완료

* Manage Profile 뼈대 컴포넌트 생성 (PhotoEdit / UsageHistory )

* PhotoEditbox 가능한 프론트 작업 완료

  * Title / SubInfo 텍스트, 프로필 사진 DropZone + UserInfo, ButtonBox 배치

  * DropZone 사진 띄우기 = uploadedProfileImage, isProfileImageDeleted 이용 => 

    > upload 액션: uploaded에 업로드한 파일을 저장
    > delete 액션: uploaded를 초기화 하고, isdelete를 true로 설정
    > init 액션: uploaded와 isdelete를 초기화
    >
    > uploaded가 있으면 무조건 그 사진 띄움, isDelete가 아니고 user_pic_location 있으면 현재 프사를 띄우고 그 외는 기본 이미지

  * uploaded가 있거나, user_pic_location이 있으면서 isdelete가 false인 경우, hover 시 '지우기 / 바꾸기'가 나타나도록 함

  * 변경사항이 있을 때, (uploaded가 있거나, isDelete가 true인 경우) 취소 / 변경 버튼 컨테이너가 나타남

  * 변경 버튼 클릭 시 uploaded가 있는 경우는 수정 요청을, 그 외에는 삭제 요청을 보냄 (하지만 아직 삭제하는 건 Backend 구현이 안됨)



### 5. 17 (일)

* post carpool request 함수 에러 해결
* Edit Carpool Room 정보 입력 창 데스크탑 버전 스타일 추가
* Time Picker가 맨 처음에는 오전 0시 0분이 선택되도록 함
* Calendar 상단 클릭 시, opacity 스타일 변화 handle
* Edit Carpool에서 출발지, 도착지 정보가 없으면 에러 메시지 띄우기



### 5.20 (수)

* Calender Elem Header 클릭 애니메이션 추가



### 5. 21 (목)

* Board 무한 스크롤 점검 (처음 render할 때, 가끔 2번 씩 get 요청이 되던 오류 해결)











## 해야 할 일

#### Board FrontEnd

* 디테일 페이지에서 뒤로가기 했을 때, render가 안되는 오류
* 무한 스크롤 islast 점검 (간혹 2번 요청이 가는 경우가 있음)
* 첫 get 요청 후 Render 되기 전에 Board Loading 페이지 제작



* 배경 컴포넌트를 BackgroundTemplate로 코드 리펙토링
* Header를 BaseHeader로 코드 리펙토링
* 로딩 바 css 스타일 다듬기
* 검색창에 자동완성 기능 추가
* postlist 초기화 및 중복 요청 제거
* 상세 페이지에서 다시 돌아올때는 초기화 X
* 검색 창 띄우기 아이콘이 안 보일 때 위치에 갖다대면 cursor 모양으로 바뀌는 에러



#### Detail FrontEnd

* socket.io를 이용해 클라이언트의 데이터 실시간 업데이트 되도록 하기
* 사진 Ant Design의 Carousel Component 검토
* 



* 가로 길이가 많이 줄어들면, 좌측 탭이 사라지는 대신 상단의 헤더로 이동하기
* CommonComponents의 UserPhoto와 MoreButton을 이용하기
* 가끔 댓글 전체가 안담기는 에러가 있음. 백엔드 문제인지 프론트 문제인지 확인 필요
* 배경 컴포넌트를 BackgroundTemplate로 코드 리펙토링



* 댓글 수정 시 (수정 됨) 을 추가하기
* 댓글 create, delete시 뜨는 proxy 에러 원인 찾기 -> reload를 실행해서 그러함. socket.io를 이용한다면 해결될 문제.
* console 창에 뜨는 props 타입 관련 에러 메시지 -> type script로 변경하지 않는 이상 해결되지 않을 것 같음. (혹은 콘솔 에러 메시지를 없애기 위해 지저분한 코드를 만들어야 함.)
  기능상에 문제는 전혀 없기 때문에 넘어갑시다.

* 스타일이 적용된 태그를 포함한 내용을 DescriptionBox 컴포넌트에 렌더링 시키기






#### Login FrontEnd

* Outlook 로그아웃 한 상태로, 데스크탑으로 Login 기능 확인
* 첫 로그인 시, outlook을 통해 회원가입 되었습니다. 메시지 뜨기





#### Manage FrontEnd

* edit carpool 페이지 mount 될 때, init시키기
* edit carpool에서 필수 데이터 입력 안 했을 시, post request하기 전에 경고 띄우기
* edit carpool Room Info Box 스타일링
* '/manage' 로 시작하는 URL을 브라우저 창에 입력하고 enter를 누르면 강제로 '/board/market'으로 리다이렉트 되는 에러
  Redirect 문제 (포스트 delete 시, '/board/market'으로 이동)
  reload (새로고침) 하는데 왜 '/board/market' 으로 이동할까 ?
  예상 -> manage container의 user가 없는 경우 auth/login 가고 auth/login에서 /로 갈 듯
* Manage Profile - 글 작성 => 더보기 버튼



* Manage Board 사진 부분 확인하기



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
* Header를 BaseHeader로 코드 리펙토링
* 배경 컴포넌트를 BackgroundTemplate로 코드 리펙토링



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

* 카풀 일정 업데이트 시에는 modal이 닫히지 않도록 할 것
* 카풀 데이터 하나도 없을 때에도 화면이 뜰 수 있도록



* socket을 적용할 때, selected event id를 저장하고, modal 액션 (이벤트 수정, 마감, 참가 상태 변경) 으로 해당 이벤트가 변할 때, 띄어진 모달 창의 데이터가 변할 수 있도록 작업하기
* 카풀 일정 삭제하기 클릭 시, 경고창 띄우기
* manage에서 작성 이후 carpool로 redirect될 때, carpool 이벤트가 DB에 담기기 전에 get 요청을 함
* 화면의 높이를 줄일때 캘린더 높이가 변화되지 않음
* manage 캘린더에 이벤트 띄우고 없애는 버튼 만들기
* 모달의 참가신청 UI를 구현한 이후, 시간이 지난 일정에 대해서는 방장의 UI에서 마감 버튼 disabled
  마찬가지로, 참여자 입장에서는 마감된 후에는 참가 신청 비활성화
* 카풀 이용 안내 모달 창 만들기
* 배경 컴포넌트를 BackgroundTemplate로 코드 리펙토링
* Calendar의 이벤트로 인해 생기는 skeleton때문에 빈칸에서 배경색의 hover 효과가 나타나지 않음
* container의 isloaded에 들어간 isCarpoolGet을 carpoolbody로 가져와서 sidebar는 먼저 띄워질 수 있도록 하기



* carpool action type 이름 정리
* carpool 시작 전 로딩 페이지 띄우기



#### Header FrontEnd

* 유저 아이콘 배치




#### Chatting FrontEnd

* Chatting 관련 액션 제작
  * 컨테이너 did mount 시, Room List Get 액션
  * Room In 액션
  * Room out 액션
  * 메시지 전송 액션
  * 메시지 받는 액션
  * 검색창 이동 시, 데이터 GET
  * 검색 시 GET
* socket on chat message 시, 스크롤 아래로 이동
* chat message send 시, 인풋태그 내용 clear
* websocket handshake error



#### FrontEnd

* ant-modal css 전체 속성과 카풀 modal 고유 속성 구분할 수 있도록 하기







---

### 논의 사항

* board 에서 개별 포스팅의 user 객체 넘겨줄 때, id도 포함해주면 좋을 듯

  lib/board.js에서 make_writer 함수를 보면 username, email, pic_location 3가지만 담는 것으로 확인
  179 라인 같은 경우, find_one(where : )에서 user.email을 사용하던데, user.id를 사용하는게 더 빠르지 않을까 ?



* Board socket에서 room을 구현하기 -> 게시글 별로 room name을 갖도록 ('board_type' + 'posting_id')
  Backend의 socket on 'comment_create, comment_update, comment_delete'에서 각각 해당 socket room에 join한 모든 유저들에게 해당 comment 데이터를 보내줘야 함.
* create: 새로 생성한 댓글의 모든 정보 (comment id, type board, board id, user, description 등 모델의 모든 데이터)
  update: 업데이트한 댓글의 comment id와 description
  delete: 지운 댓글의 comment id 



* 댓글 더보기 기능 필요 ? -> 한 번에 GET 요청하는 댓글 개수 제한 (10개 정도 씩) X
* 댓글 순서 논의
* 댓글에 사진 업로드 기능 필요 ? X



* market의 가격에 대한 논의. Edit 페이지에서 가격 입력란

  가격을 입력하고 싶지 않은 게시글 논의 -> edit page에서의 UI



* 채팅방 시간 정보
  인스타: 8분 전 / 2시간 전 / 어제 / 2주 ... => 데이터 갱신 필요, GET 요청할 때에만 변경되는 것으로 보여짐
  페북: 오후 1시 43분 / 4월 11일 / 19. 11. 21.
  카톡: 오후 1시 43분 / 어제 / 2020-4-10



* 백앤드에서 'chat_message' 보내줄 때, room_id도 필요. 
  받는 사람 입장에서 현재 그 방에 들어가 있다면 current_room의 message_list에 받은 메시지 데이터를 추가하고, 다른 방에 있는 경우에는 message_list에 추가하면 안되기 때문



* 메시지에서 사진 업로드 기능 추가 ?

  카톡, 인스타: 사진 업로드 시 바로 전송됨
  facebook: 사진을 선택 후 전송버튼 눌러야 전송됨

  message의 description을 변경 ? => 변경안 type: enum [text / image], value: text(메시지 내용 또는 pic_location)



* find user 할 때, id 대신 email 쓰는 이유 ?
  message의 email부분을 user_id로 변경 ?



* 채팅방(current_room) 기본값을 {id:0, opponent_user:0, messageList:[]} 로 변경 





* api/chatting/user/:userID 에서 채팅방이 없는 상대에게 보냈을 때, opponent_user 값에 상대방 유저가 안 담기는 것 확인 필요



* socket id를 저장하는 이유 ?





* Manage에서 sidebar 사진은 크게 보기, 삭제만 가능하고 사진 upload는 계정관리 페이지에서 



* Manage Carpool Calendar의 경우, 옛날 날짜를 선택하는 경우 경고 메시지 띄우기
  * 1) 날짜 누를 때 방지 2) 등록하기 버튼을 누를 때 날짜를 확인하세요라고 경고



* comment, board의 시간을 작성 시간 기준으로 할 지, 수정 시간을 기준으로 할 지



* logout은 uitda 로그아웃 뿐만 아니라 outlook 로그아웃도 할 수 있도록 하는 것에 대해



* Uitda 소켓 서버

  필요한 곳: 

  * carpool - 1개의 전체 서버. carpool 탭에 있을 때 connetion, 나가면 disconnection
  * BoardDetail-Comment - 페이지마다 Room 존재해야하며, 해당 게시글에 들어갔을 때 connetion, 나가면 disconnetion
  * Notification - 홈페이지 로그인 할 때부터 로그아웃할 때까지 계속 connection
  * Message - 채팅 방마다 Room 존재. 해당 방에 들어가면 connection 나가면 disconnection. 채팅 방 list는 Notification으로 할지, Message로 할 지 고민

  Namespace





### 요청 사항

* 로그인이 안될 때 안내 문구
* 공용 PC에서 outlook 로그아웃 방법
* 카풀, manage의 created 형태 바꾸기
* 카풀 일정 GET 에서 아무것도 없을 때 빈 리스트 보내주도록 backend
* chatting backent url '/api/chatting/:user_id' => 'api/chatting/user/:user_id' 



















