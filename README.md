```
bun run --cwd api dev
bun run --cwd ui dev
```

Drizzle-studio

```
bun run --cwd api studio
```

デプロイ(どっちもdeployするときはapiの方から順番に)

```
bun run --cwd api deploy
bun run --cwd ui deploy
```

DBの作成
```
bun --cwd api wrangler d1 create timetable
```

Drizzleスキーマに基づいてマイグレーションを生成する

```
bun --cwd api drizzle-kit generate
```

ローカルのデータベースを更新

```
bun --cwd api wrangler d1 migrations apply timetable --local
```

本番環境のデータベースを更新

```
bun --cwd api wrangler d1 migrations apply timetable --remote
```

shadcnで必要なコンポーネントだけ取得する(bunxの際はcdでファイル移動する)

```
bunx shadcn@latest add button 
```

### インストール

bun iするときは--cwdを使う

```
bun i --cwd ui react
```

## ログイン可能

```
email: a@hascii.com
password: 1234
```

```
email: b@hascii.com
password: 1234
```

## 残り課題

- [ ] 時間割の欄同じ時間に複数個授業があった場合の処理
