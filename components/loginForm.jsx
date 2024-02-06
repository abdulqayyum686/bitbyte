import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { postData } from "@/utils/apifunctions";
import Cookies from "universal-cookie";
import { userLogin } from "@/utils/hooks";

const cookies = new Cookies();

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSuccess = (data) => {
    cookies.set("usertoken", data.token);
    alert("success");
    router.push("/");
  };

  const { mutate, isLoading } = userLogin(onSuccess);


  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <>
      <div className="h-[90vh] w-full flex items-center justify-center flex-col gap-4">
        <h1 className="text-[2rem] text-[#E2703A] theme-font text-center mx-auto">
          Login
        </h1>
        <form className="flex items-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-col gap-2 flex w-[26rem]">
            <div className="bg-black bg-opacity-30 rounded">
              <input
                placeholder="Email"
                {...register("email", { required: true, maxLength: 100 })}
                className="w-full autofill-none placeholder:text-[#82354f] text-lg bg-transparent outline-[#82354f] p-3 required-cstm-inp"
              />
            </div>
            {errors?.email?.type === "required" && (
              <p className="text-[#82354f]">This field is required</p>
            )}
            <div className="bg-black bg-opacity-30 rounded">
              <input
                placeholder="Password"
                {...register("password", { required: true, maxLength: 100 })}
                className="w-full autofill-none placeholder:text-[#82354f] text-lg bg-transparent outline-[#82354f] p-3 required-cstm-inp"
              />
            </div>
            {errors?.password?.type === "required" && (
              <p className="text-[#82354f]">This field is required</p>
            )}

            <button
              type="submit"
              className="w-full text-lg font-medium rounded-3xl border py-3 italic bg-white"
            >
              Login
            </button>
            <span
              onClick={() => router.push("/signup")}
              className="cursor-pointer text-blue-700"
            >
              Want to Register?
            </span>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
};

export default LoginForm;
