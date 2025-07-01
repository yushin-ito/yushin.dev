# yushin.dev

![version](https://img.shields.io/badge/version-1.0.0-red.svg)
![stars](https://img.shields.io/github/stars/yushin-ito/yushin.dev?color=yellow)
![commit-activity](https://img.shields.io/github/commit-activity/t/yushin-ito/yushin.dev)
![license](https://img.shields.io/badge/license-MIT-green)

<br/>

## 📝 Overview

yushin.devは、私のポートフォリオサイトです。ダッシュボードやエディタなどの機能を備えています。なるべくシンプルなデザインを心がけて作成しました。

<br/>

## ✨ Features

### コンテンツ

コンテンツには、主に5つのページがあります。他のユーザーに公開されています。

- **Top**<br/>
  Topでは、自分のプロフィールを載せています。

  ![top](https://github.com/user-attachments/assets/21040a61-92e2-4d47-9526-a97ea023a7d6)

<br/>

- **About**<br/>
  Aboutでは、自分の自己紹介を載せています。

  ![about](https://github.com/user-attachments/assets/7860d08b-e9f0-47a8-bab1-257499a3006a)

<br/>

- **Works**<br/>
  Worksでは、自分の作品を載せています。

  ![works](https://github.com/user-attachments/assets/a383417b-1eff-4ecd-974b-910cc5fd97c1)

<br/>

- **Blog**<br/>
  Blogでは、自分のブログを載せています。

  ![blog](https://github.com/user-attachments/assets/c29553f6-0960-49a3-83bb-b81935baa36c)

<br/>

- **Contact**<br/>
  Contactでは、自分のお問い合せを載せています。

  ![contact](https://github.com/user-attachments/assets/f2d07361-6bb7-4a3e-9ec1-f20d6aa37650)

<br/>

### ダッシュボード

ダッシュボードには、主に3つのページがあります。他のユーザーに公開されていません。

- **Posts**<br/>
  Postsでは、自分の記事を管理できます。

  ![posts](https://github.com/user-attachments/assets/69a8cf05-2b9c-47de-a506-aed7a21068d6)

<br/>

- **Analytics**<br/>
  Analyticsでは、自分の記事を分析できます。

  ![analytics](https://github.com/user-attachments/assets/71a2473f-4047-448a-a71b-3baa190232f4)

<br/>

- **Settings**<br/>
  Settingsでは、自分のプロフィールを変更できます。

  ![settings](https://github.com/user-attachments/assets/bfda0d0b-f07f-4b97-9297-cd163f54c5ce)

<br/>

### エディター

エディターでは、自分のブログを執筆することができます。

![editor](https://github.com/user-attachments/assets/5ffa4f4a-42ef-42b3-ac39-63fad1aa2ef8)

<br/>

## ⚡️ Structure

```
yushin.dev/
├── actions/            # サーバーアクション
├── app/
│   ├── (auth)/         # 認証ページ
│   ├── (content)/      # コンテンツページ
│   ├── (dashboard)/    # ダッシュボードページ
│   ├── (editor)/       # エディターページ
│   └── api/            # API
├── components/         # コンポーネント
│   └── ui/
├── config/             # アプリ設定
├── content/            # マークダウン
├── emails/             # メール
├── extensions/         # 拡張機能
├── hooks/              # カスタムフック
├── i18n/               # 国際化
├── lib/                # ユーティリティ
├── messages/           # 言語ファイル
├── prisma/             # データベーススキーマ
├── public/             # アセット
├── schemas/            # フォームスキーマ
├── styles/             # スタイル
└── types/              # 型定義
```

<br/>

## 🚀　Install

1. リポジトリをクローン

   ```bash
   git clone https://github.com/yourusername/yushin.dev.git
   cd yushin.dev
   ```

2. パッケージのインストール

   ```bash
   pnpm install
   ```

3. 環境変数の設定

   ```bash
   touch .env
   ```

4. データベースのマイグレーション

   ```bash
   pnpm prisma migrate dev
   ```

5. 開発サーバーの起動

   ```bash
   pnpm dev
   ```

6. ブラウザで [http://localhost:3000](http://localhost:3000) にアクセス

<br/>

## 🤝 Contributor

<a href="https://github.com/yushin-ito">
  <img  src="https://avatars.githubusercontent.com/u/75526539?v=4" width="64px">
</a>

<br/>

## 📜 LICENSE

[MIT LICENSE](LICENSE)
