import Link from "next/link";
import Image from "next/image";
import Router from "next/router";
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
          <Image alt="aintboard logo" src="/img/logo_gray.png" layout="fill" />
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
