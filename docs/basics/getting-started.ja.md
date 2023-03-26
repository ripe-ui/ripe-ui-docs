---
title: "Getting Started"
order: 1
description: "Start by installing Ripe UI for React, with your package manager of choice."
---

Running one of the following commands will add Ripe UI to your React Project.

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

Once the package has been added you will need to add the ThemeProvider for the application, this is usually done in a file called index.js but might also be index.jsx, or index.tsx.

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

You are now ready to start building your application with any of the Ripe UI components available.
