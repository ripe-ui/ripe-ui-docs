import {
  Navbar,
  NavbarSection,
  NavbarItem,
  SectionType,
  AppContainer,
  Content,
} from "@ripe-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "./header";

export default function DetailsLayout({ children, components, basics }) {
  const router = useRouter();
  const [path, setPath] = useState("");
  const [navbarOpen, setNavbarOpen] = useState(false);

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
      <Header
        showMobileMenu
        onHeaderClicked={() => {
          setNavbarOpen(!navbarOpen);
        }}
      ></Header>

      <AppContainer navbarOpen={navbarOpen}>
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
        <Content>
          <div
            style={{
              margin: "20px",
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "800px",
              padding: "20px",
            }}
          >
            {children}
          </div>
        </Content>
      </AppContainer>
    </>
  );
}
