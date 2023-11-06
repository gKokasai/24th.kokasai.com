# 23rd.kokasai.com

## 開発

### コマンド

#### 依存関係の導入
```shell
npm install
```

#### 初期プロジェクトの作成
```shell
npm create-react-app [プロジェクト名]
```

#### テストサーバーの起動
```shell
npm start
```

#### ビルド
```shell
npm build
```

#### gh-pagesの導入
```shell
npm install gh-pages --save-dev
```

package.jsonを以下のように変更
```shell
{
  ...,
  "scripts": {
    ...,
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  ...,
  "homepage": "https://(Githubユーザー名).github.io/(Repository名)/"
}

```

#### gh-pagesでのビルド
```shell
npm run deploy
```