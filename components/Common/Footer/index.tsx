import Link from "next/link";

import LogoGray from "~/assets/img/LogoGray";
import FooterBottom from "~/assets/img/FooterBottom";
import FooterLeft from "~/assets/img/FooterLeft";
import FooterRight from "~/assets/img/FooterRight";
import { FooterWrapper, LinksWrapper } from "./styled";

const Footer = () => {
  return (
    <FooterWrapper>
      <LinksWrapper>
        <ul>
          <li>
            <Link href="/about">About Us</Link>
          </li>
          <li>
            <Link href="/faqs">FAQs</Link>
          </li>
          <li>
            <Link href="/faqs">Contact Us</Link>
          </li>
          <li>
            <Link href="/faqs">Give Feedback</Link>
          </li>
        </ul>
      </LinksWrapper>
      <div className="logo-copy">
        <Link href="/">
          <a className="logo">
            <LogoGray />
          </a>
        </Link>
        <h6>Copyright &copy; {new Date().getFullYear()}</h6>
      </div>
      <FooterLeft className="left" />
      <FooterRight className="right" />
      <FooterBottom className="bottom" />
    </FooterWrapper>
  );
};

export default Footer;
