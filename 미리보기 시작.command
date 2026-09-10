#!/bin/zsh
cd "$(dirname "$0")" || exit 1
export REDIS_URL=""
export LOCAL_CONTENT=true
export SITE_INDEXABLE=false
export ADMIN_PASSWORD="$(python3 - <<'PYCODE'
import json,secrets
from pathlib import Path
p=Path('.local-data/admin_password_local.json')
print(json.loads(p.read_text()) if p.exists() else secrets.token_urlsafe(18))
PYCODE
)"
printf '미리보기: http://127.0.0.1:3000/\n관리자: http://127.0.0.1:3000/admin\n로컬 관리자 비밀번호: %s\n이 창을 닫으면 미리보기가 종료됩니다.\n' "$ADMIN_PASSWORD"
exec npm run dev -- --hostname 127.0.0.1 --port 3000
