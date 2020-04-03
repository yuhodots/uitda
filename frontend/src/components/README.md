## Components 디렉토리

**스타일된 컴포넌트를 저장하는 디렉토리.** 

웹 어플리케이션의 페이지 단위로 구분된 각각의 Container에서 사용되는 컴포넌트들을 묶은 세부 디렉토리와 (Board, BoardDetail, Carpool, Chatting, Edit, Home, Manage), 여러 페이지에 사용되는 컴포넌트를 코드 리팩토링해서 만든 컴포넌트들을 모은 Structure 디렉토리를 갖는다.



### 디렉토리 구성원

* Board/

  BoardContainer.js에서 사용하는 컴포넌트들이 모여있는 디렉토리

* BoardDetail/

  BoardDetailContainer.js에서 사용하는 컴포넌트들이 모여있는 디렉토리

* Carpool/

  CarpoolContainer.js에서 사용하는 컴포넌트들이 모여있는 디렉토리

* Chatting/

  ChattingContainer.js에서 사용하는 컴포넌트들이 모여있는 디렉토리

* Edit/

  EditContainer.js에서 사용하는 컴포넌트들이 모여있는 디렉토리

* Home/

  HomeContainer.js에서 사용하는 컴포넌트들이 모여있는 디렉토리

* Manage/

  ManageContainer.js에서 사용하는 컴포넌트들이 모여있는 디렉토리

* Structure/

  한 페이지 이상에서 사용되는 컴포넌트들의 리팩토링된 컴포넌트들이 모여있는 디렉토리

* App.js, App.css

  url 규칙에 따라 Page 컴포넌트를 render하는 규칙이 담긴 컴포넌트와 Body 및 #root의 스타일을 정의한 파일. App.js는 최상위 컴포넌트인 Root.js의 바로 아래인 컴포넌트이다.







