import { useState } from "react";
import AnimateHeight from "react-animate-height";
import Link from "next/link";
import { useDispatch } from "react-redux";

import { chooseModal } from "redux/slices/modalSlice";
import { LinkSidebar } from "./styled";

const PrimaryLinkSidebar = ({ buttonName, links }: Props) => {
  const [height, setHeight] = useState<string | number>(0);
  const dispatch = useDispatch();

  return (
    <LinkSidebar>
      <button onClick={() => (height === 0 ? setHeight("auto") : setHeight(0))}>
        {buttonName}
      </button>

      <AnimateHeight duration={300} height={height}>
        {links.map((link, i) => {
          return link.button ? (
            <button
              key={`${link.key}-${i}`}
              onClick={() => dispatch(chooseModal(link.type))}
              className="link"
            >
              {link.linkName}
            </button>
          ) : (
            <Link key={`${link.key}-${i}`} href={link.linkHref}>
              {link.linkName}
            </Link>
          );
        })}
      </AnimateHeight>
    </LinkSidebar>
  );
};

type Props = {
  buttonName: string;
  links: LinkProps[];
};

type LinkProps = {
  key: string;
  linkHref: string;
  linkName: string;
  type?: string;
  button?: boolean;
};

export default PrimaryLinkSidebar;
