# Tenver

[中文简体](README_zh-cn.md)

Tenver is the backend of the tennis placement detection system. The frontend
can be found at [tenweb](https://github.com/Pcrab/tenweb).

## Prerequisite

* [Node.js](https://nodejs.org/en/)
* [Python](https://www.python.org/)
* [MongoDB](https://www.mongodb.com/)

## Installation

```shell
git clone https://github.com/Pcrab/tenver
cd tenver
```

### Node dependencies

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

### Python dependencies

```shell
pip install --user opencv-python numpy websocket-server
```

## Usage

Node and python should both be started in order to work correctly.

Python command should be run in the `cv` directory.

Also make sure mongodb is running in the background on port 27017
without authentication.

### Key

* Windows: run `private.ps1` and `public.ps1`, or `private.bat` and `public.bat`
* MacOS / Linux: run `private.sh` and `public.sh`

### Node

#### Development

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

#### Production

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

