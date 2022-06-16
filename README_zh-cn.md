# Tenver

[English](README.md)

本项目为网球落点监测系统的后端。前端可以在 [tenweb](https://github.com/Pcrab/tenweb) 上找到。

## 前提

* [Node.js](https://nodejs.org/en/)
* [Python](https://www.python.org/)
* [MongoDB](https://www.mongodb.com/)

## 安装

```shell
git clone https://github.com/Pcrab/tenver
cd tenver
```

### Node 依赖

npm

```shell
npm install
```

yarn

```shell
yarn install
```

pnpm

```shell
pnpm install
```

### Python 依赖

```shell
pip install --user opencv-python numpy websocket-server
```

## 使用

要正常使用，需要同时启动 Node 和 Python。

Python 需要在 `cv` 目录下运行。

同时，请确保 mongodb 在 27017 端口上后台运行，且不要开启身份认证。

### 密钥

* Windows: 运行 `private.ps1` 和 `public.ps1`, 或运行 `private.bat` 和 `public.bat`
* MacOS / Linux: 运行 `private.sh` 和 `public.sh`

### Node

#### 开发环境

npm

```shell
npm run dev
```

yarn

```shell
yarn dev
```

pnpm

```shell
pnpm dev
```

#### 生产环境

npm

```shell
npm build
npm start
```

yarn

```shell
yarn build
yarn start
```

pnpm

```shell
pnpm build
pnpm start
```

### Python

```shell
cd cv
python quyu.py
```

## Todo
