import React, { useState, useEffect } from "react";

import Link from "next/link";

import Modal from "~/components/Modal";
import JoinUsForm from "~/components/JoinUsForm";
import LoginForm from "~/components/LoginForm";

import Searchbar from "~/components/Searchbar";

import { NavbarContainer, NavBarButtons, NavbarWrapper } from "./styled";
import WhiteLogo from "~/assets/img/white-logo.svg";
import Button from "~/components/Button";

const Navbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [whichModal, setWhichModal] = useState(0);
  const [navbar, setNavbar] = useState(false);

  const showNavbar = () =>
    window.scrollY >= 100 ? setNavbar(true) : setNavbar(false);

  useEffect(() => {
    window.addEventListener("scroll", showNavbar);
    return () => {
      window.removeEventListener("scroll", showNavbar);
    };
  }, [navbar]);

  const cta = [
    {
      id: 1,
      name: "Login",
      bg: "white",
    },
    {
      id: 2,
      name: "Join Us!",
      bg: "lightYellow",
    },
  ];

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
          {cta.map((btn) => (
            <Button
              key={btn.id}
              bg={btn.bg}
              onClick={() => {
                setModalIsOpen(true);
                setWhichModal(btn.id);
              }}
            >
              {btn.name}
            </Button>
          ))}
        </NavBarButtons>

        {cta.map((mdl) => (
          <Modal
            key={mdl.id}
            isOpen={modalIsOpen}
            closeModal={() => setModalIsOpen(false)}
            headerLabel={whichModal === 1 ? "Login" : "Join Us!"}
          >
            {whichModal === 1 ? <LoginForm /> : <JoinUsForm />}
          </Modal>
        ))}
      </NavbarContainer>
    </NavbarWrapper>
  );
};

export default Navbar;
