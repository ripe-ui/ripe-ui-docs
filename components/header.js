import {
  Header as HeaderComponent,
  Logo,
  HeaderRight,
  IconButton,
  ButtonSize,
  DesktopOnlyContainer,
} from "@ripe-ui/react";
import { FaGithub } from "react-icons/fa";
import { SearchBox } from "./searchBox";
import Link from "next/link";
export const Header = ({ onHeaderClicked, showMobileMenu }) => {
  return (
    <HeaderComponent
      bg="#181818"
      dividerColor="rgb(58, 58, 58)"
      showMobileMenu={showMobileMenu}
      mobileMenuOnClick={onHeaderClicked}
    >
      <Logo style={{ color: "white" }}>
        <Link href="/" style={{ all: "unset", cursor: "pointer" }}>
          Ripe UI
        </Link>
      </Logo>
      <HeaderRight>
        <DesktopOnlyContainer>
          <SearchBox />
        </DesktopOnlyContainer>
        <IconButton
          bg="#181818"
          color="white"
          size={ButtonSize.Large}
          icon={<FaGithub />}
          href="https://github.com/ripeplan/ripe-ui"
        />
      </HeaderRight>
    </HeaderComponent>
  );
};
