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







## 해야 할 일

#### Board FrontEnd

* 검색창에 자동완성 기능 추가
* 사진 넘기기 아이콘 ant-design 적용
* 사진 Ant Design의 Carousel Component 검토
* postlist 초기화 및 중복 요청 제거
* 무한 스크롤 islast 점검
* 상세 페이지에서 다시 돌아올때는 초기화 X



#### Detail FrontEnd

* 댓글 create, delete시 뜨는 proxy 에러 원인 찾기 -> reload를 실행해서 그러함. socket.io를 이용한다면 해결될 문제.
* 삭제 modal이 안사라지는 이유좀
* 더보기 UI 본인이 쓴 댓글만 뜨도록
* 더보기 답글에도 나타나도록 디자인
* create할 때, create Action 보내지 않고 user 없으면 경고창 뜨도록 하기
* 수정하기 클릭 시, Comment Input으로 변경
* 수정 시 수정 내역 보이게
* update 액션
* update front
* 사진이 없는 글 디자인 고려
* 사진 Ant Design의 Carousel Component 검토
* Detail Container 렌더링 시, 로딩 페이지를 만들기
* 댓글 더보기 기능
* 답글 더보기 기능
* socket.io 공부하기
* socket.io를 이용해 클라이언트의 데이터 실시간 업데이트 되도록 하기
* 유저 이름 앞 뒤에 불필요한 요소 제거
* board에서 글 들어갔다가 뒤로가기 후 매니지의 아무 글 클릭하면 post에 데이터가 담기지 않는 에러



#### Login FrontEnd

* Login 페이지 디자인
* Outlook 로그아웃 한 상태로, 데스크탑으로 Login 기능 확인



#### Home FrontEnd

* Home 페이지 디자인



#### Manage FrontEnd

* 작성하다가 삭제를 했을 때, DropZone 미리보기와 실제 업로드 되는 사진이 다른 오류
* DropZone PhotoList의 width값 고정된거 없애기
* Edit Page 나가기 전에 '나가시겠습니까 묻기'
* Edit update 시, 사진이 뜨도록
* Edit Page 상단 바 디자인
* Edit 상단 아이콘 기능 구현
* Edit Create 시, default Board값을 받아올 수 있도록 하기
* Edit 스타일을 지닌 태그들을 어떻게 저장할 것인지 구상
* Edit update 시, 삭제되는 이미지는 id, 새로 추가되는 이미지는 이전처럼 보내주기
* 사진 업로드 최대 개수 (현재 6개)
* 사진 순서 변경 기능





#### Header FrontEnd

* 유저 아이콘 배치





#### User BackEnd

* 현재 user status를 알 수 있는 api 만들기



