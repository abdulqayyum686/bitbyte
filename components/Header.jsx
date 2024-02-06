import React from "react";
import { headersArray } from "@/utils/headerArray";
import { useRouter } from "next/router";
import { useDeleteUserAccount, useUser } from "@/utils/hooks";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Header = () => {
  const router = useRouter();

  const { mutate: deleteUser } = useDeleteUserAccount();

  const { isLoading, data: currentUser } = useUser();
  // console.log("currentuser===", currentUser);
  const moveNext = (url, title) => {
    if (title === "Logout") {
      cookies.remove("usertoken");
    } else if (title === "Delete Account") {
      deleteUser(currentUser?.result?._id);
    }
    router.push(url);
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {headersArray(currentUser?.result?.userName)?.map(
                  ({ title, url }, index) => {
                    return (
                      <div
                        key={index}
                        className=" text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-700 hover:text-white"
                        onClick={() => moveNext(url, title)}
                      >
                        {title}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative ml-3">
                <div className="text-white">
                  {currentUser?.result?.userName}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          {headersArray(currentUser?.result?.userName)?.map(
            ({ title, url }, index) => {
              return (
                <div
                  key={index}
                  className=" text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-700 hover:text-white"
                  onClick={() => moveNext(url, title)}
                >
                  {title}
                </div>
              );
            }
          )}
        </div>
        <div className="border-t border-gray-700 pt-4 pb-3">
          <div className="flex items-center px-5">
            <div className="ml-3">
              <div className="text-sm font-medium leading-none text-gray-400">
                {currentUser?.result?.userName}
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1 px-2"></div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
