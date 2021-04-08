import { useState } from "react";
import AnimateHeight from "react-animate-height";
import Link from "next/link";

import { LinkSidebar } from "./styled";

const PrimaryLinkSidebar = ({ buttonName, links }: Props) => {
  const [height, setHeight] = useState<string | number>(0);

  return (
    <LinkSidebar>
      <button onClick={() => (height === 0 ? setHeight("auto") : setHeight(0))}>
        {buttonName}
      </button>

      <AnimateHeight duration={300} height={height}>
        {links.map((link, i) => (
          <Link key={`${link.linkHref}-${i}`} href={link.linkHref}>
            {link.linkName}
          </Link>
        ))}
      </AnimateHeight>
    </LinkSidebar>
  );
};

type Props = {
  buttonName: string;
  links: LinkProps[];
};

type LinkProps = {
  linkHref: string;
  linkName: string;
};

export default PrimaryLinkSidebar;
