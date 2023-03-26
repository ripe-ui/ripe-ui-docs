import dynamic from "next/dynamic";
import React from "react";
import { ThemeProvider } from "@ripe-ui/react";
import { Nunito } from "next/font/google";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-hooks-web";
import { IntlProvider } from "react-intl";
import { useRouter } from "next/router";

import ja from "../lang/ja.json";
import en from "../lang/en.json";

const messages = {
  en,
  ja,
};

import "prismjs/themes/prism-tomorrow.css";

const nunito = Nunito({ subsets: ["latin"] });
const searchClient = algoliasearch(
  "CN3D1FX1U1",
  "4c4d37d60ce0cb0df4b65b11caa9fade"
);

const App = ({ Component, pageProps }) => {
  const { locale } = useRouter();

  return (
    <InstantSearch searchClient={searchClient} indexName="ripe_ui">
      <IntlProvider locale={locale} messages={messages[locale]}>
        <ThemeProvider
          theme={{
            primaryColor: "rgba(243, 220, 81, 1)",
            secondaryColor: "red",
            fontFamily: nunito.style.fontFamily,
            bg: "#333333",
          }}
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </IntlProvider>
    </InstantSearch>
  );
};
export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
