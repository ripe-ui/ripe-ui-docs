import { Button, Content } from "@ripe-ui/react";
import { Header } from "../components/header";
import { Hero } from "@ripe-ui/react";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Ripe UI - Accessable React Apps Made Easy</title>
      </Head>
      <Header />
      <Content>
        <Hero
          title="Creating Accessable React Apps Made Easy."
          subtitle="Ripe UI Gives developers the power to create user friendly React apps without any styling knowledge."
          color="white"
        >
          <Button onClick={() => router.push(`/basics/getting-started`)}>
            Get Started
          </Button>
          <Button href="https://github.com/ripe-ui/ripe-ui">GitHub</Button>
        </Hero>
      </Content>
    </div>
  );
}
