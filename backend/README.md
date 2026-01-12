## 開発環境

- Go 1.24.11
- PostgreSQL 15.15

Vercel Functionsで動く予定。

ローカル用に、`.env`に以下のようなものをかく。

```
# Postgres
POSTGRES_USER=xxx
POSTGRES_PASSWORD=yyy
POSTGRES_DB=zzz
DATABASE_URL=postgres://xxx:yyy@db:5432/zzz?sslmode=disable
```

## DB

ローカルではマイグレーションするほどのことがないのでとりあえず毎回作り直しする。

```bash
docker compose exec -T db sh -lc 'psql "$DATABASE_URL"' < schema.sql
```

本番は手動。

## 動作確認

```bash
curl 'http://localhost:8080/api/likes?dreamId=supiki_png'
```

```bash
curl -X POST 'http://localhost:8080/api/likes' \
  -H 'Content-Type: application/json' \
  -d '{"dreamId":"supiki_png"}'
```
