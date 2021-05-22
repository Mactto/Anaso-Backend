# 최⭐강⭐ Backend 팀

### 👨‍👧‍👦 멤버(Member)

* [이남준](https://github.com/ningpop) (Backend Developer)

* [김율희](https://github.com/yulhee741) (Backend Developer)

* [최세환](https://github.com/Mactto) (Backend Developer)

### 🔧 기술 스택(Technology Stack)

* Node.js

* Express

* MongoDB

### 📐 코드 컨벤션 (Code Convention)

* 변수명/클래스명/메소드명은 기본적으로 카멜케이스를 사용한다.
ex) getName(), User()...

* Rest API 설계법 준수 (Get, Post, Put, Fetch, Delete)

* 함수는 1개의 기능 단위로 작성

* if 문 중첩 자제

* return시 else문 자제
ex. if (true) {
          return true;
      }
      return false;

* 화살표 함수 안쓰기

* github PR요청 시 
ex) [BE] 개발:: 로그인기능 구현 (율희)
     [BE] 수정, 디버깅 :: 구현 사항 (율희)
     
---

※ 참고링크
* Google JavaScript Style Guide
* Standard JS
* Airbnb js style guide
* Airbnb js style guide 번역본



---
## 💻서버 구동
1. key 파일 위치 시키기
2. nodemon 설치
> npm install nodemon --save-dev
3. 아래 명령어 입력
> export JWT_SECRET=secret
4. npm run start
> npm run start
