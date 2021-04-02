import Cookies from "js-cookie";

export default function useCurrentUser() {
  if (typeof window === "undefined") {
    return {};
  }

  return {
    accessToken: Cookies.get("access_token") || "",
    userData: Cookies.get("user_data") || "",
  };
}
