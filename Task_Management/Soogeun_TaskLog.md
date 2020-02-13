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
* 







## 해야 할 일

#### Board FrontEnd

* 디테일 페이지에서 뒤로가기 했을 때, render가 안되는 오류 (아주 가끔 ?)
* 검색창에 자동완성 기능 추가
* 사진 넘기기 아이콘 ant-design 적용
* 사진 Ant Design의 Carousel Component 검토
* postlist 초기화 및 중복 요청 제거
* 무한 스크롤 islast 점검
* 상세 페이지에서 다시 돌아올때는 초기화 X
* 검색 창 띄우기 아이콘이 안 보일 때 위치에 갖다대면 cursor 모양으로 바뀌는 에러



#### Detail FrontEnd

* 댓글 create, delete시 뜨는 proxy 에러 원인 찾기 -> reload를 실행해서 그러함. socket.io를 이용한다면 해결될 문제.

* console 창에 뜨는 props 타입 관련 에러 메시지 -> type script로 변경하지 않는 이상 해결되지 않을 것 같음. (혹은 콘솔 에러 메시지를 없애기 위해 지저분한 코드를 만들어야 함.)
  기능상에 문제는 전혀 없기 때문에 넘어갑시다.

  
  
* 댓글 수정 시 (수정 됨) 을 추가하기

* board에서 글 들어갔다가 뒤로가기 후 매니지의 아무 글 클릭하면 post에 데이터가 담기지 않는 에러

  일단 뒤로가기로는 componentWillUnmount 실행되지 않음.

  (추가) 처음 rendering 되고 manage 들어가서 상세페이지를 들어갔을 때도 오류남 (post에 안담긴듯)

* 스타일이 적용된 태그를 포함한 내용을 DescriptionBox 컴포넌트에 렌더링 시키기

* 가끔 댓글 전체가 안담기는 에러가 있음. 백엔드 문제인지 프론트 문제인지 확인 필요

  

* 사진이 없는 글 디자인 고려

* 사진 Ant Design의 Carousel Component 검토

* Detail Container 렌더링 시, 로딩 페이지를 만들기

* 댓글 더보기 기능

* 답글 더보기 기능

* socket.io 공부하기

* socket.io를 이용해 클라이언트의 데이터 실시간 업데이트 되도록 하기

* 유저 이름 앞 뒤에 불필요한 요소 제거



#### Login FrontEnd

* Login 페이지 디자인

* Outlook 로그아웃 한 상태로, 데스크탑으로 Login 기능 확인

* 로그인 시 아래의 에러가 뜨면서 로그인이 안됨

  ```
  Error: Failed to lookup view "error" in views directory "/Users/soogeun/Documents/GitHub/uitda/BackEnd/views"
  ```

* 로그인 완료 후 로그인 페이지로 오기 이전에 페이지로 redirect하기






#### Home FrontEnd

* Home 페이지 디자인



#### Manage FrontEnd

* edit 상단바가 스크롤 내리면 위에 tooltip 생기는 거 고치기

* edit update 구현

* 수정 페이지에 사진 리스트 뜨기

* Edit Page 나가기 전에 '나가시겠습니까 묻기'

* Edit Create 시, default Board값을 받아올 수 있도록 하기

  

* 작성하다가 삭제를 했을 때, DropZone 미리보기와 실제 업로드 되는 사진이 다른 오류

* DropZone PhotoList의 width값 고정된거 없애기

* Edit update 시, 사진이 뜨도록

* Edit Page 상단 바 디자인

* Edit 상단 아이콘 기능 구현

* Edit 스타일을 지닌 태그들을 어떻게 저장할 것인지 구상

* Edit update 시, 삭제되는 이미지는 id, 새로 추가되는 이미지는 이전처럼 보내주기

* 사진 업로드 최대 개수 (현재 6개)

* 사진 순서 변경 기능 (백앤드 작업 이후)

* manage에 이름 박수근 -> 사용자 이름

* 내용이 없이 create 했을 때, 경고 메시지 창 띄우기



#### Header FrontEnd

* 유저 아이콘 배치



#### FrontEnd

* App state에 유저 등록



#### User BackEnd

* 현재 user status를 알 수 있는 api 만들기



---

### 논의 사항

* 한 기기에서 한 아이디만 사용할 수 있는 문제

  * 로그 아웃 시, 아웃룩까지 로그 아웃 가능 ?
  * 로그인 시, 아웃룩에 이 아이디로 로그인 하실 것인가요 묻기 가능 ?

* 





### 요청 사항

* comment, board의 시간을 작성 시간 기준으로 할 지, 수정 시간을 기준으로 할 지

