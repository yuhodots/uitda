Task log

### 2020년 1월 23일 
1.채팅 부분 구현해둔 것 json 형태로 변환

2.채팅에서 writer에 대한 정보도 같이 넘길 수 있도록 수정하기

3.Q: frontend에 보냈던 정보를 다시 받을 수 있는지? ex) user정보와 room정보!

  관련 파일 : lib/chatting.js -> frontend -> socket.js에서 다시 받아야 메세지 내용을 저장할 수 있음
  
              원래는 req.user.username과 req.params.id로 바로 받을 수 있지만 socket.io를 거치는 바람에 url변화 없이 정보를 프론트엔드에서 받아야 함.
              -> 가능한걸로~

4.채팅방 삭제 구현

5.postman 공부하기 ->다음번까지

### 2020년 1월 28일

-이미지 주소만 가리키는 거 하나만 있으면 될듯 

-포스트맨 공부하기 

### 2020년 1월 30일

-게시글 마켓에서 지우기(댓글 지우기) 

### 2020년 2월 2일
-댓글 수정됨 표시할 수 있도록 모델 is_modified  추가 &update에서도 수정해야함 // 확인 완료
-정규표현식 공부하기 (학생) (~학부) 삭제하고 데이터베이스에 저장하기 

### 2020년 2월 4일

  socket.io 메세지 숫자를 어떻게 해야 할지,,?
  
  ->chatting_room에서 author1과 author2에 따른 안읽은 메세지 개수를 db에 저장하는 방식으로, 
  
  ->이후 room에 들어갔을 경우, 안읽은 메세지 개수 0으로 reset 하기
  
  ->총 개수를 frontend에 전달하는 방식
  
 댓글도,,,,,! 댓글 달린거에 대한 이벤트 user에 저장 
 
 종   내가 쓴 글에 대한 댓글/ 답글
 
메세지 안읽은 메세지
### 2020년 2월 6일

채팅 숫자 추가 완료.(socket.js 수정)

### 2020년 2월 9일

chatting_room, chatting_message 모델에 email 정보 추가 

socket.js도 수정

username 

이메일 확인할 수 있도록

### 2020년 2월 13일

이후 room에 들어갔을 경우, 안읽은 메세지 개수 0으로 reset 하기-> 확인 완료

메세지 입력 잘 되는 것 확인


*문제 발생

socket.id 를 통해 특정인에게 알림을 띄우고자 했으나, 상대방의 socket.id를 받을 방법이 없음.

(현재 홈페이지에 접속하지 않을 유저는, 그냥 홈페이지에 접속할때 db에 저장된 알림을 받으면 돼서 상관이 X 
그러나 현재 접속해 있는 유저는 계속해서 페이지를 이동할 것이고 그렇다면 socket.id가 계속 변경되는 바람에 문제가 발생함..ㅠㅠ)

하나의 해결책으로, users db에 socket_id라는 column을 생성하여 "connection"일 때, 현재의 socket.id를 user db에 update을 해둔다. "disconnect"되면, socket_id를 ""로 만들어 접속하지 않고 있다는 것을 의미하게 한다..

### 2020년 2월 13일

user db에 socket.id 넣고 connection할 때마다 socket_id 넣을 수 있음..

not found를 frontend에 보내는 방법 찾기->response로 찾아보면 될 듯하다....!

board_id 가 없을 때

### 2020년 2월 18일
not found 프론트엔드 보내기.


### 2020년 2월 23일
로그인 화면 디자인

### 2020 3월 2일

개인 정보 처리방침 수정
이용약관 만들기

### 2020년 3월 4일


#### 완료

#### 해야할 일
1.제안하기 CRUD
2.로그인 unist.ac.kr 로

#### 진행중 
