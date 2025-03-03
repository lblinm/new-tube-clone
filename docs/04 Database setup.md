# Database setup

## PostgreSQL 数据库

Docker compose 安装：
https://github.com/felipewom/docker-compose-postgres
https://anasdidi.dev/articles/200713-docker-compose-postgres/

注意 pgadmin4 连接 Postgres , 地址要填 `host.docker.internal`：pgadmin 运行在 docker 里，所以 host 不能写 localhost，而 host.docker.internal 代表宿主机

## DrizzleORM

```sh
pnpm add drizzle-orm pg dotenv
pnpm add -D drizzle-kit @types/pg
```

## users schema

## 迁移数据

```sh
pnpm drizzle-kit push
```

## drizzle-kit

可视化管理数据库，不用 pgadmin4

```sh
pnpm drizzle-kit studio

# Drizzle Studio is up and running on https://local.drizzle.studio
```
