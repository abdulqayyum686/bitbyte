import Router from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteData, fetchData, postData, updateData } from "./apifunctions";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("usertoken");

const addBook = (bookdetails) => {
  return postData("/api/user/books/addbook", bookdetails);
};
const UserSignUp = (userData) => {
  return postData("/api/user/register", userData);
};

const changeBookStatus = (bookdetails) => {
  return updateData("/api/user/books/specificbook", bookdetails);
};
const editbook = (bookdetails) => {
  return updateData("/api/user/books/specificbook", bookdetails);
};
const deleteBookData = (bookdetails) => {
  return deleteData(`/api/user/books/${bookdetails._id}`);
};

const deleteUser = (userId) => {
  // console.log("data=", userId);
  return deleteData(`/api/user/deleteuser?userId=${userId}`);
};

export const useAddSuperheroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addBook, {
    onMutate: (data) => {
      queryClient.invalidateQueries(["get-user-books"]);
    },
    onSuccess: (data) => {
      alert("book added");
      Router.push("/");
    },
    onError: () => {
      alert("there was an error");
    },
  });
};
export const useUpdateSuperheroData = () => {
  const queryClient = useQueryClient();
  return useMutation(changeBookStatus, {
    // onMutate: (data) => {
    //   queryClient.invalidateQueries("get-user-books");
    // },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["get-user-books"]);
      alert("book updated");
    },
    onError: () => {
      alert("there was an error");
    },
  });
};

export const useDeleteSuperheroData = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteBookData, {
    // onMutate: (data) => {
    //   queryClient.invalidateQueries(["get-user-books"]);
    // },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["get-user-books"]);
      alert("book deleted");
    },
    onError: () => {
      alert("there was an error");
    },
  });
};
export const useDeleteUserAccount = () => {
  return useMutation(deleteUser, {
    onSuccess: (data) => {
      alert("User  deleted");
    },
    onError: () => {
      alert("there was an error");
    },
  });
};
export const signupUser = () => {
  return useMutation(UserSignUp, {
    onSuccess: (data) => {
      alert("user rigester");
    },
    onError: () => {
      alert("there was an error");
    },
  });
};
export const EditBook = () => {
  const queryClient = useQueryClient();
  return useMutation(editbook, {
    onMutate: (data) => {
      queryClient.invalidateQueries(["get-user-books"]);
    },
    onSuccess: (data) => {
      alert("book updated");
      Router.push("/");
    },
    onError: () => {
      alert("there was an error");
    },
  });
};

export const userLogin = (onSuccess) =>
  useMutation(async (data) => await postData("/api/user/login", data), {
    onSuccess,
    onError: (error) => {
      console.log(err.response.data);
      alert(error.message);
    },
  });

export const useUser = () => {
  let userId;
  if (token) userId = jwt_decode(token)._id;
  return useQuery(
    ["user"],
    async () => await fetchData(`/api/user/get-current-user/${userId}`),
    {
      refetchOnWindowFocus: false,
      cacheTime: 60 * 1000,
      staleTime: 60 * 1000,
    }
  );
};

export const useGetALLBooks = () => {
  let userId;
  if (token) userId = jwt_decode(token)._id;
  return useQuery(
    ["get-user-books"],
    async () => await fetchData(`/api/user/books/${userId}`),
    {
      refetchOnWindowFocus: false,
      cacheTime: 60 * 1000,
      staleTime: 60 * 1000,
    }
  );
};
