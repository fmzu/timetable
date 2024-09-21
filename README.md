```
bun install
bun run --cwd api dev
bun run --cwd ui dev
```

デプロイ(どっちもdeployするときはapiの方から順番に)

```
bun run --cwd api deploy
bun run --cwd ui deploy
```

Drizzleスキーマに基づいてマイグレーションを生成する

```
bun drizzle-kit generate
```
shadcnで必要なコンポーネントだけ取得する(bunxの際はcdでファイル移動する)

```
bunx shadcn@latest add button 
```