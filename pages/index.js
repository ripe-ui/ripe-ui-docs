import { Button, Content } from "@ripe-ui/react";
import { Header } from "../components/header";
import { Hero } from "@ripe-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
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
