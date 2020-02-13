# Yuho's local repo update

### 19.09.08 (일)

- routesv 디렉토리 `Create`
  - routes내 **모든 파일** 복사 붙여넣기 (res.render 형태)
  - **모든파일**  /api 로 되어있던것 /view로 수정
- routes 디렉토리 `Update`
  - **모든 파일** res.render를 res.json으로 수정
- views 디렉토리 `Update`
  - **모든파일** 상단바 클릭 링크 /api 로 되어있던것 /view로 수정
- app.js 파일 `Update`
  - /* Router: view */ 파트 추가
  - /* Middleware installation : Router: view */ 파트 추가
- config.template.json 파일 `Create`



### 19.09.09 (월)

- routesv, routes 디렉토리 manage.js `Update`
  - moment.format() 코드 오타 수정
- routesv, routes 디렉토리 manage.js, market.js, networking.js `Update`
  - moment-timezone 한국 시간 설정
- routesv, routes 디렉토리 market.js, networking.js `Update`
  - scrolling 구현
    - scroll = 0 이면 가장 최신 포스트
    - 가장 오래된 포스트까지 스크롤 하면 postlist:undefined



### 19.09.20 (금)

- routesv, routes 디렉토리 market.js, networking.js `Update`
  - postlist가 랜덤한 순서로 전송되는 오류가 발생해서 이를 수정
  - postlist.push(post)를 postlist[i] = post 형태로 수정함



### 19.09.29 (일)

- routesv, routes 디렉토리 market.js, networking.js `Update`
  - isLast 라는 key값 추가하여 마지막 scroll 인지 확인 가능하도록 구현



### 19.10.10 (목)

- routesv, routes 디렉토리 networking.js `Update`
  - filelist에 잘못된 값 담기는 문제해결 (한 줄 수정)




### 19.11.01 (금)

- lib 디렉토리 board.js, boardv.js `Create`
  - postlist 메소드, post 메소드, delete 메소드 `Create`
- routesv, routes 디렉토리 market.js, networking.js `Update`
  - 동기식으로 리팩토링



### 19.11.13 (수)

- manage 리팩토링

  1. REST API 형태로 변경, url 링크도 변경

  `manage.js`에 있던 create, update를 모두 `market.js`, `networking.js`, `carpool.js` 로 옮김

  2. board.js`  create, delete 메소드 추가

  3. routesv와 관련된 `view폴더`, `routesv폴더`, `boardv.js` 삭제 / `app.js` 수정 

     작업내용 확인은 postman을 통해서 확인해야 함

- board 리팩토링
  
  - scroll 값이 없어도 default로 0  할당



###19.11.20 (수)

- Postman 로그인 성공
  - CRUD 기능 정상작동 확인완료

- react-dropzone
  - redux-project/Dropzone 연습 참고



### 19.11.28 (목)

- react - nginx 배포
  - nginx config 파일 수정완료
  - BackEnd config 파일들 설정완료
  - FrontEnd module 처리완료 
    - npm ci로 package-lock.json 처리: npm ci가 어떤 기능을 하는지 알아보기
    - 깃헙의 .gitignore 수정



### 19.12.05 (목)

- react-dropzone create 기능완료
  - 참고1: https://basketdeveloper.tistory.com/55
  - 참고2: https://developer.mozilla.org/ko/docs/Web/API/FormData/append
  - file 제대로 전송되게 수정하기
    - Dropzone.js: react component 지원안함 / multer의 req 그대로 사용가능
    - react-dropzone.js: react component 지원 / multer 그대로 사용불가, 백엔드 수정해야함



###20.01.03 (금)

- react-dropzone 기본작업 완료: Uitda local/Dropzone.js 파일
  - react-dropzone으로 게시글 update 기능 구현
  - formData.append를 통해 구현하였음
  - 주의할 점: 로그인 해야 작동함!



###20.01.05 (일)

- carpool BackEnd
  
  - routes/carpool.js 수정
  - models/cal_events.js 수정
  
  - CRUD 작동확인
  
- carpool FrontEnd

  - FullCalendar 컴포넌트 띄우기 완료
  - events 띄우기 완료
- BackEnd 작업 Github push 완료



### 20.01.08 (수)

- scroll 요청 6개에서 12개로 수정

- 백엔드 데이터 null로 들어오는 것 처리
  - 비동기 때문에 생기는 문제
  - (i+1) == projects.length 이면 res.json인데 i가 10보다 11인 경우가 먼저 실행되는 상황 발생, 그래서 i = 10에 대한 정보가 제대로 안담겨서 null
  - (i+1) 대신 (counter+1) 처리 했음. 이상적인 방법은 아니고 임시 방편이긴 하지만, 작동은 아마 제대로 될 것

- login 프론트엔드 문제 해결
  - axios로 하면 자꾸 CORS 문제 발생함
  - 겁나 삽질하다가 걍 \<a> 태그로 하면 된다는 것 발견해서 해결
  - 로그인 성공시 redirect를 기존의 localhost:3000에서 localhost:4000 으로 바꿔놓음  



### 20.01.12 (일)

- models/comment.js `Create`
  - id,  type_board, board_id, description, author, created, is_re_comment, parent_comment
- routes/comment.js `Create`
  - id (백엔드 확인용) 
  - create: 프론트엔드에서 description, type_board, board_id, is_re_comment, parent_comment 전송
  - update: 프론트엔드에서 description 전송
  - delete

- lib/board.js `Update`
  - post 메소드에 commentlist 객체 추가

- update시 req.body에 데이터가 제대로 안담기는 문제, 원인을 알아냄
  - [블로그 참고](https://forteleaf.tistory.com/entry/axiospost-에-form-데이터를-넣기)
  - **application/x-www-form-urlencoded**: GET방식과 마찬가지로 BODY에 key 와 value 쌍으로 데이터를 넣는다. 똑같이 구분자 &를 쓴다.
  - **text/plain**: BODY에 단순 txt를 넣는다.
  - **multipart/form-data**: 파일전송을 할때 많이 쓰는데 BODY의 데이터를 바이너리 데이터로 넣는다는걸 알려준다.



###20.01.14 (화)

- postlist 순서 변경
  - 12개 씩 차례대로가 아니라 역순으로 전송
  - postlist[projects.length - 1 - i] = post 

- routes/market.js, routes/networking.js  `Update`
  - 프론트엔드의 get update 요청에 대해 응답하는 부분
  - /update/:id url에 대해, /:id url과 동일한 데이터 전송
  - 다만 여기에 isOwner, sameOwner 메소드로 작성자 확인하는 코드 추가



###20.01.15 (수)

- lib/board.js `Update`

  - 프론트엔드의 post update 요청에 대해 응답하는 부분

  - 프론트엔드에서 받는 정보

    1. 삭제된 파일이 무엇인지: array 형태로 req.body.deleted_files에 file의 id값 담아서 전달

       - postman에서는 key를 deleted_files[0], deleted_files[1].. 이런 형태로

    2. 추가된 파일이 무엇인지: 프론트엔드에서 name 필드를 'added'로 설정
  
       백엔드에서 upload.array('added', 6) 설정
    
       - postman에서는 working directory내 파일들을 사용하고 key값은 added를 주면 됨



###20.01.19 (일)

- routes/users.js `Update`
  - localhost:3000/api/users 요청시 현재 로그인 유저 반환
- lib/comment.js
  - create, update, delete에 대해서 res.end() 응답으로 바꿔놓음
  - 그 외에는 아직 바꾼내용 없음
- multer-s3
  - 로그인 안해도 S3서버로 파일이 전송처리 됨
  - create, update post 요청에 대해서 usercheck이라는 콜백함수 추가
  - 로그인 하지 않은 유저에 대해서 S3 업로드가 막히는 것 확인



### 20.01.21 (화)

- lib/carpool.js `Create`
  - cal_events에 대해서 create, update, delete 메소드 생성, 작동확인 완료
  - cal_events 응답하는 eventlist 메소드 생성



### 20.01.23 (목)

- carpool 기능에 대한 생각
  - 현재 캘린더의 모습에서 더 추가하지 않아도 될 것이라 생각
  - 캘린더의 각 이벤트를 누르면 방에 대한 상세보기가 뜸
    - 상세보기:  작성자, 카풀 방향, 출발 시간, 집합 장소, 연락방법 (전화번호), 제목, 내용
    - 완벽한 구현보다는 빠른 구현이 중요하니까 연락은 일단 전화번호를 통해..
  - 글 생성 삭제는 market, networking과 마찬가지로 manage에서 하는 형태



### 20.01.28 (화)

- carpool model 수정

  - 이벤트 아이디, 제목, 출발지, 도착지, 집합시간, 집합장소, 연락방법, 내용

  - id, title, departure, destination,  start, meeting_place, contact, description
  - username(작성자)는 자동으로 추가



### 20.01.30 (목)

- carpool 백엔드 CRUD 확인완료
- carpool 프론트엔드
  - week 단위 list로 출력



### 20.02.02 (일)

- carpool 프론트엔드 꾸미기
  - 한국어 출력
  - css 적용, 전체 사이즈 조정
  - Event Popover 처리 ('+more' 버튼)
  - 클릭했을 때 상세보기 출력 (ant-design modal 사용)



### 20.02.04 (화)

- carpool 프론트엔드 
  - modal의 ok, cancel 삭제
- comment 백엔드
  - 희원이가 전해준 자료 코드에 적용



### 20.02.06 (목)

- username이 아니라 email로 유저 확인하기

  - market, networking, carpool model 수정

  - DB에 post, comment, cal_event 저장시 email 정보도 추가
  - sameOwner 메소드 email로 유저 정보 확인하도록 변경 
  - CRUD 확인완료

- 회원 탈퇴기능 추가

  - post: /api/users/delete
  - email 값 넘겨줘야함
  - **s3 서버에 대해서는 아직 확인해보지 않음**

- carpool 프론트엔드 
  - 자신의 이벤트에 대해 색 추가



### 20.02.13 (목)

- **list 옆에 작성자 & 마감상태 이름 출력하기 실패 (구현하지 못할 가능성이 있음)**
  - 이벤트마다 갖는 고유의 값이 있는게 아니라, 그냥 시간 순서대로 뜨는거라 처리가 상당히 힘듦
  - this.states.eventlist에는 달 별로 이벤트가 '작성순서'로 쌓이는데 (시간순서가 아님), listweek view는 주 별로 이벤트가 '시간순서'로 쌓이는 데다가 식별자 값이 하나도 없어서 처리가 매우매우 힘듦
  - 웬만한 dangerous html 방식 다 막혀있는듯? (띄어쓰기도 두번 불가)
- 일단 Calenadr.js 컴포넌트 여러개로 나뉘어있던거 하나로 정리해놓음

- modal 출력 다듬기
  - title 대신 destination이 이벤트에 출력되도록 바꿈
  - 시간 출력형태 바꿈



### 해야할 일

- 이제 뭐 해야할지 고민

