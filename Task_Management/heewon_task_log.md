Task log

2020년 1월 23일 
1.채팅 부분 구현해둔 것 json 형태로 변환

해야할 일
채팅에서 writer에 대한 정보도 같이 넘길 수 있도록 수정하기
Q: frontend에 보냈던 정보를 다시 받을 수 있는지? ex) user정보와 room정보!
  관련 파일 : lib/chatting.js -> frontend -> socket.js에서 다시 받아야 메세지 내용을 저장할 수 있음
              원래는 req.user.username과 req.params.id로 바로 받을 수 있지만 socket.io를 거치는 바람에 url변화 없이 정보를 프론트엔드에서 받아야 함.
채팅방 삭제 구현
postman 공부하기
