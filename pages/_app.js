import React, { useEffect } from "react";

import Header from "@/components/Header";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const currentUrl = router.asPath;
  const queryClient = new QueryClient();
  let token = cookies.get("usertoken");

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);
  // console.log("currentUrl", currentUrl);
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
