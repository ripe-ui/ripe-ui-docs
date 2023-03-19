import { Navbar, NavbarSection, NavbarItem, SectionType } from "@ripe-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "./header";
import Head from "next/head";

export default function DetailsLayout({ children, components, basics }) {
  const router = useRouter();
  const [path, setPath] = useState("");

  useEffect(() => {
    console.log(window.location.pathname);
    setPath(window.location.pathname);
  }, [router.isReady]);

  const getActive = (linkPath) => {
    console.log(linkPath);
    console.log(path);
    console.log(linkPath == path);
    return linkPath == path;
  };

  return (
    <>
      <Head>
        <title>Ripe UI - Accessable React Apps Made Easy</title>
      </Head>
      <Header></Header>

      <div style={{ display: "flex" }}>
        <div style={{ width: "250px", position: "static" }}>
          <Navbar wide transparent>
            <NavbarSection
              section={SectionType.Main}
              wide
              transparent
              label="The Basics"
            >
              {basics.map((link) => (
                <NavbarItem
                  key={link.id}
                  wide
                  transparent
                  active={getActive(`/basics/${link.id}`)}
                  label={link.title}
                  onClick={() => router.push(`/basics/${link.id}`)}
                />
              ))}
            </NavbarSection>
            <NavbarSection section={SectionType.Main} wide label="Components">
              {components.map((link) => (
                <NavbarItem
                  key={link.id}
                  wide
                  transparent
                  label={link.name}
                  active={getActive(`/components/${link.id}`)}
                  onClick={() => router.push(`/components/${link.id}`)}
                />
              ))}
            </NavbarSection>
          </Navbar>
        </div>
        <div
          style={{
            margin: "20px",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "800px",
            padding: "20px",
            width: "100%",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
