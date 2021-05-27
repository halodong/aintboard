import React from "react";
import * as Styles from "./styled";
import AdminSidebar from "~/components/Admin/AdminSidebar";
import Button from "~/components/Common/Button";
import Avatar from "~/components/Avatar";

import useSWR, { mutate } from "swr";
import fetcher from "util/fetch";
import { UserApiResponse } from "types/types";
import axios from "axios";
import { useRouter } from "next/router";

const AdminUsers = () => {
  const router = useRouter();

  const { data: usersData } = useSWR<UserApiResponse>(`/api/users`, fetcher);

  const userData = usersData?.response?.data?.users || [];

  const deleteUser = async (id: string) => {
    if (userData[0].role === "admin") {
      await axios.delete(`/api/user/delete/${id}`);
    }

    mutate(`/api/users`);
  };

  return (
    <Styles.AdminUsersWrapper>
      <AdminSidebar />
      <Styles.AdminUsersContainer>
        <Styles.AdminTitle>Users</Styles.AdminTitle>
        {userData.map((u, index) => (
          <Styles.UserContainer key={index}>
            <Styles.AvatarContainer>
              <Avatar iconType={u.avatar} />
            </Styles.AvatarContainer>
            <Styles.Username>{u.username}</Styles.Username>
            <Styles.UserCTA>
              <Button
                bg="white"
                onClick={() => router.push(`/user/${u.username}`)}
              >
                See Details
              </Button>
              {Array.isArray(userData) && userData?.[0]?.role === "admin" && (
                <Button bg="errorRed" onClick={() => deleteUser(u._id)}>
                  Delete
                </Button>
              )}
            </Styles.UserCTA>
          </Styles.UserContainer>
        ))}
      </Styles.AdminUsersContainer>
    </Styles.AdminUsersWrapper>
  );
};

export default AdminUsers;
