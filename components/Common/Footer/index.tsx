import Link from "next/link";

import FooterLeft from "~/assets/img/footer-left.svg";
import FooterRight from "~/assets/img/footer-right.svg";
import LogoGray from "~/assets/img/logo_gray.svg";
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
        <h6>Copyright &copy; 2021</h6>
      </div>
      <FooterLeft className="left" />
      <FooterRight className="right" />
      <div className="bottom">
        <svg
          width="100%"
          height="73"
          viewBox="0 0 1440 73"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1440 0.274414H0V29.3745H1440V0.274414Z" fill="#568481" />
          <path d="M1440 29.3745H0V72.9745H1440V29.3745Z" fill="#234C4C" />
          <path d="M1440 0.274414H0V7.77441H1440V0.274414Z" fill="#76AAA4" />
        </svg>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
