import { Container } from "@mui/material";
import { FooterStyle } from "./FooterStyle";
import { LinkSection } from "./LinkSection/LinkSection";
import { LogoSection } from "./LogoSection/LogoSection";
import { SocialSection } from "./SocialSection/SocialSection";

export const Footer = () => {
  return (
    <Container
      component="footer"
      sx={FooterStyle.footerContainer}
      maxWidth={false}
    >
      <LogoSection />
      <LinkSection />
      <SocialSection />
    </Container>
  );
};
