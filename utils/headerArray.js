import Cookies from "universal-cookie";
const cookies = new Cookies();

export const headersArray = (token) => {
  let array = !token
    ? [
        { title: "Dashboard", url: () => router.push("/") },
        { title: "Add Book", url: "/addbook" },
        { title: "login", url: "/login" },
        { title: "Register", url: "/signup" },
        {
          title: "Logout",
          url: "/login",
        },
      ]
    : [
        { title: "Dashboard", url: "/" },
        { title: "Add Book", url: "/addbook" },
        {
          title: "Logout",
          url: "/login",
        },
        {
          title: "Delete Account",
          url: "/login",
        },
      ];

  return array;
};
