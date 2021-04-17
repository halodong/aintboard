import Link from "next/link";
import Router from "next/router";
import LogoGray from "~/assets/img/logo_gray.svg";
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

  if (user.accessToken) Router.push("/admin/dashboard");

  return (
    <AdminPageWrapper>
      <Link href="/">
        <LogoContainer>
          <LogoGray />
        </LogoContainer>
      </Link>

      <AdminPageText>Admin Login</AdminPageText>

      <AdminLoginContainer>
        <AdminLoginHeader>Login</AdminLoginHeader>
        <LoginForm isAdmin closeModal={() => {}} />
      </AdminLoginContainer>
    </AdminPageWrapper>
  );
};

export default AdminPage;
