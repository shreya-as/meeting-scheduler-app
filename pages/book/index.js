import { useRouter } from "next/router";
import React from "react";
import DisplayInfo from "../../components/DisplayInfo";

const Book = () => {
  let router = useRouter();
  console.log(router, "router");
  return <>{/* <DisplayInfo /> */}</>;
};
export default Book;
