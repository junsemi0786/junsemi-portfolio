# JUNgenius · 제이유엔지니어스

반도체 Legacy 장비 개조·수명연장과 PLC·SCADA 기술 서비스 홈페이지입니다.

- [프로젝트 관리·검색 설정·배포 안내](RENEWAL_GUIDE.md)
- [검증 기록](VERIFICATION.md)
- [추가 Case Study 준비 자료](CASE_STUDY_DRAFTS.md)

## 미리보기

의존성이 설치되어 있다면 macOS에서 `미리보기 시작.command`를 실행합니다. 화면에 표시되는 주소를 열고, 프로젝트 관리에 필요한 로컬 비밀번호는 같은 실행 창에서 확인합니다. 이 실행 파일은 운영 Redis 연결을 끄고 별도 로컬 데이터만 사용합니다.

```sh
npm ci
npm run dev -- --hostname 127.0.0.1 --port 3000
```

운영 환경은 기존 Vercel 프로젝트와 Redis를 유지합니다. 배포 설정은 `RENEWAL_GUIDE.md`를 확인하세요. `.env.local`과 `.local-data/`는 Git에 포함하지 않습니다.
