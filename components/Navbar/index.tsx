import React, { useState, useEffect } from "react";

import Link from "next/link";

import Modal from "~/components/Modal";
import JoinUsForm from "~/components/JoinUsForm";

import Searchbar from "~/components/Searchbar";

import { NavbarContainer, NavBarButtons, NavbarWrapper } from "./styled";
import WhiteLogo from "~/assets/img/white-logo.svg";
import Button from "~/components/Button";

const Navbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [navbar, setNavbar] = useState(false);

  const showNavbar = () =>
    window.scrollY >= 100 ? setNavbar(true) : setNavbar(false);

  useEffect(() => {
    window.addEventListener("scroll", showNavbar);
    return () => {
      window.removeEventListener("scroll", showNavbar);
    };
  }, [navbar]);

  return (
    <NavbarWrapper>
      <NavbarContainer isFixed={navbar}>
        <Link href="/">
          <a className="logo">
            <WhiteLogo />
          </a>
        </Link>

        {navbar && <Searchbar scrolling={navbar} />}

        <NavBarButtons>
          <Button bg="white" onClick={() => {}}>
            Login
          </Button>
          <Button bg="lightYellow" onClick={() => setModalIsOpen(true)}>
            Join us!
          </Button>
        </NavBarButtons>

        <Modal
          isOpen={modalIsOpen}
          closeModal={() => setModalIsOpen(false)}
          headerLabel="Join Us"
        >
          <JoinUsForm />
        </Modal>
      </NavbarContainer>
    </NavbarWrapper>
  );
};

export default Navbar;
