# 配置环境

## bun

1. es6 imports, typescript 支持
2. 减少关于 react 19 的依赖问题

```sh
powershell -c "irm bun.sh/install.ps1|iex" # powershell 安装 bun

# vscode终端无法识别bun命令，安装后重启

bun --version # 1.2.4

# 由于 bun create next-app@15.1.6 始终报错，因此改回 pnpm ...
```

## nextjs15

```sh
pnpm create next-app@15.1.6
```

## shadcn

```sh
pnpm dlx shadcn@2.1.8 init
pnpm dlx shadcn@2.1.8 add --all
```

## vscode 扩展

1. tailwind css intellisense
