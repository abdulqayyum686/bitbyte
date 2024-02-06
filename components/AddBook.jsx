import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import { useAddSuperheroData, EditBook } from "@/utils/hooks";

const AddBook = () => {
  let token = cookies.get("usertoken");
  if (token) {
    var decoded = jwt_decode(token);
  }
  const router = useRouter();
  const data = router.query;
  const book = JSON.parse(router?.query?.book || "{}");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { mutate: editbook } = EditBook();
  const { mutate: addBook } = useAddSuperheroData();

  const onSubmit = (data2) => {
    if (Object.keys(book).length != 0) {
      editbook({ ...data2, _id: book?._id });
    } else {
      addBook({ ...data2, userId: decoded?._id, type: "ptr" });
    }
  };

  return (
    <div className="h-[90vh] w-full  bg-cover flex items-center justify-center flex-col gap-4">
      <h1 className="text-[2rem] text-[#E2703A] theme-font text-center mx-auto">
        {data.edit && "Edit Book"}
        {!data.edit && "Add Book"}
      </h1>
      <form
        className="flex items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex-col gap-2 flex w-[26rem]">
          <div className="bg-black bg-opacity-30 rounded pr-3">
            <input
              placeholder="book title"
              defaultValue={book.title}
              {...register("title", { required: true, maxLength: 100 })}
              className="w-full autofill-none text-[#82354f] placeholder:text-[#82354f] bg-transparent outline-none p-3 required-cstm-inp"
            />
          </div>
          {errors?.title?.type === "required" && (
            <p className="text-[#82354f]">This field is required</p>
          )}
          <div className="bg-black bg-opacity-30 rounded pr-3">
            <input
              defaultValue={book.authorName}
              placeholder="book author name"
              {...register("authorName", { required: true, maxLength: 100 })}
              className="w-full autofill-none text-[#82354f] placeholder:text-[#82354f] bg-transparent outline-none p-3 required-cstm-inp"
            />
          </div>
          {errors?.authorName?.type === "required" && (
            <p className="text-[#82354f]">This field is required</p>
          )}

          <div className="bg-black bg-opacity-30 rounded pr-3">
            <input
              defaultValue={book.publicationHouse}
              placeholder="book  publication house"
              {...register("publicationHouse", {
                required: true,
                maxLength: 100,
              })}
              className="w-full autofill-none text-[#82354f] placeholder:text-[#82354f] bg-transparent outline-none p-3 required-cstm-inp"
            />
          </div>
          {errors?.publicationHouse?.type === "required" && (
            <p className="text-[#82354f]">This field is required</p>
          )}

          <div className="bg-black bg-opacity-30 rounded pr-3">
            <input
              defaultValue={book.Genre}
              placeholder="book genre"
              {...register("Genre", { required: true, maxLength: 100 })}
              className="w-full autofill-none text-[#82354f] placeholder:text-[#82354f] bg-transparent outline-none p-3 required-cstm-inp"
            />
          </div>
          {errors?.Genre?.type === "required" && (
            <p className="text-[#82354f]">This field is required</p>
          )}
          <div className="bg-black bg-opacity-30 rounded pr-3">
            <input
              type="date"
              defaultValue={book.createdAt}
              placeholder="book publication date"
              {...register("publicationDate", {
                required: true,
                maxLength: 100,
              })}
              className="w-full autofill-none text-[#82354f] placeholder:text-[#82354f] bg-transparent outline-none p-3 required-cstm-inp"
            />
          </div>
          {errors?.publicationDate?.type === "required" && (
            <p className="text-[#82354f]">This field is required</p>
          )}

          <button
            type="submit"
            className="w-full rounded-3xl border py-3 italic bg-white"
          >
            {data.edit && "Edit Book"}
            {!data.edit && "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
