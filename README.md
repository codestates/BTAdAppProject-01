# BTAdAppProject-01

## 팀 소개

### BTA 03 01조

- **팀명 : LION**
- **팀장 : 홍유진**
- **팀원 : 반영훈, 채윤영**
- Date : 2022/10/25 - 2022/10/30

### 역할 분담

| 이름 | 포지션 |
| --- | --- |
| 홍유진 | NFT Minting |
| 채윤영 | NFT Explorer |
| 반영훈 | Wallet, My Page |

## 프로젝트 소개

### ✏️ 프로젝트 목표

<aside>
💡 NFT Explorer를 구현하며 NFT와 ERC721에 대해 이해하고, Web에서 RPC Call을 통해 스마트 컨트랙트를 사용한다.

</aside>

### ✏️  프로젝트 기능

- [x]  메타마스크 지갑 연동하여 로그인
- [ ]  전체 NFT Collections 조회
    - [ ]  Collections 내의 NFT 조회
        - [ ]  NFT의 상세 페이지로 이동하여 NFT의 상세 정보(History, root) 확인
- [x]  My NFT 조회
- [ ]  Top Sales by Collection
    - [ ]  NFT 상세페이지
- [ ]  이더리움 외 체인 조회
- [x]  NFT 민팅
    - [ ]  IPFS 연결

## 프로젝트 상세

### 💻 유저 시나리오

**[Home]**

- 기본 홈 화면
- 상단 Navbar의 로고를 누르면 홈으로 이동한다.

**[Connect Wallet]**

- 사용자 지갑이 연결되지 않은 상황에서 Navbar의 Connect를 눌렀을 때 연결 모달을 띄운다.
- 지갑 연결을 클릭하면 MetaMask 연결 모달창이 나타난다.
- 지갑에 로그인하면 사이트에 로그인된다.

**[My Page]**

- Navbar의 사용자 아바타 클릭시 마이페이지로 이동한다.
- 연결된 계정 주소를 확인할 수 있다.
- 사용자의 NFT 목록과 history를 조회할 수 있다.

**[Explorer]**

- Navbar의 Explorer를 누르면 이동한다.
- 외부 API를 통해 NFT 목록을 불러와 리스트업 한다.
- NFT를 선택하여 클릭하면, 해당 NFT의 상세 페이지로 이동한다.

**[Create NFT]**

- 사용자가 Create 버튼을 눌렀을 때 이동한다.
- 클라이언트는 사용자에게 NFT CreatFrom을 제공한다.
- 사용자는 이미지와 정보를 입력하고 Create 버튼을 클릭한다.
- 이미지를 IPFS에 저장 후 이미지 IPFS URI를 입력한 정보에 추가하여 metadata.json 파일을 IPFS에 업로드한다.

### 💻 구현 기능

**[필수 구현]**

- 지갑 연결 로그인
- 내가 소유한 NFT 목록 및 히스토리 조회
- Explorer에 외부 데이터를 받아서 NFT 목록 표시
- NFT Create를 하면 데이터베이스에 저장

**[추가 기능 구현]**

- 내가 만든 NFT 컬렉션 페이지 조회
- 작가별 NFT 페이지 조회
- Explorer NFT 목록 정렬 기능 (가격순, 최신순 등)

### 💻 Flow Chart
![Lion NFT](https://user-images.githubusercontent.com/99964401/198909259-9a2ecb7c-ebaf-4742-93cb-dbb3fb0f96a9.png)

