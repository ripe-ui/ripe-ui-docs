---
title: "スタートガイド"
order: 1
description: "まずは、Ripe UI for Reactをお好みのパッケージマネージャーでインストールします。"
---

以下のいずれかのコマンドを実行することで、ReactプロジェクトにRipe UIが追加されます。

### npm

```bash
npm install @ripe-ui/react
```

### yarn

```bash
yarn add @ripe-ui/react
```

### pnpm

```bash
pnpm add @ripe-ui/react
```

パッケージが追加されたら、アプリケーションのThemeProviderを追加する必要があります。これは通常、index.jsというファイルで行われますが、index.jsxやindex.tsxという場合もあります。

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@ripe-ui/react";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = {
  primaryColor: "PRIMARY_COLOR",
  secondaryColor: "SECONDARY_COLOR",
  fontFamily: "FONT_FAMILY",
  bg: "BACKGROUND_COLOR",
};

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

これで、利用可能なRipe UIコンポーネントのいずれかを使用してアプリケーションの構築を開始する準備が整いました。
