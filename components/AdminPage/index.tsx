import React, { useEffect } from "react";

import Link from "next/link";
import Router from "next/router";
import WhiteLogo from "~/assets/img/white-logo.svg";
import LoginForm from "~/components/LoginForm";

import useCurrentUser from "~/hooks/useCurrentUser";

import {
  AdminPageWrapper,
  LogoContainer,
  AdminPageText,
  AdminLoginContainer,
  AdminLoginHeader,
} from "./styled";

const AdminPage = () => {
  const user = useCurrentUser();

  // if user is already logged in and you go to /admin it will redirect to dashboard
  useEffect(() => {
    if (user.accessToken) Router.push("/admin/dashboard");
  });

  return (
    <AdminPageWrapper>
      <Link href="/">
        <LogoContainer>
          <WhiteLogo />
        </LogoContainer>
      </Link>

      <AdminPageText>ADMIN LOGIN</AdminPageText>

      <AdminLoginContainer>
        <AdminLoginHeader>LOGIN</AdminLoginHeader>
        <LoginForm isAdmin closeModal={() => {}} />
      </AdminLoginContainer>
    </AdminPageWrapper>
  );
};

export default AdminPage;
