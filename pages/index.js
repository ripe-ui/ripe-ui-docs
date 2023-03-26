import { Button, Content } from "@ripe-ui/react";
import { Header } from "../components/header";
import { Hero } from "@ripe-ui/react";
import { useRouter } from "next/navigation";
import { FormattedMessage, useIntl } from "react-intl";

export default function Home() {
  const router = useRouter();

  const intl = useIntl();

  const title = intl.formatMessage({ id: "page.home.hero.title" });
  const subtitle = intl.formatMessage({ id: "page.home.hero.title" });

  return (
    <div>
      <Header showMobileMenu={false} />
      <Content>
        <Hero title={title} subtitle={subtitle} color="white">
          <Button onClick={() => router.push(`/basics/getting-started`)}>
            <FormattedMessage id="page.home.start.button" />
          </Button>
          <Button href="https://github.com/ripe-ui/ripe-ui">
            <FormattedMessage id="page.home.github.button" />
          </Button>
        </Hero>
      </Content>
    </div>
  );
}
