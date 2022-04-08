import { getCookie } from "cookies-next";
import React, { useContext, useEffect } from "react";
import PostsThatIHaveLiked from "../../../components/Profile/PostsThatIHaveLiked";
import { UserContext } from "../../../context/User";
import { useUser } from "../../../hooks/useUser";
import { image } from "../../../public/images/error.png";

const jwt = require("jsonwebtoken");
export default function LikedPosts({ userName }) {
  const activeUser = useContext(UserContext);
  const { data } = useUser(activeUser?.uid);
  // useEffect(() => {}, [data]);
  return (
    <div className="flex justify-center mt-2 bg-gray-100">
      {data ? (
        <div className="w-full">
          {" "}
          {userName === data?.userName ? (
            <div className="flex justify-center">
              {" "}
              <PostsThatIHaveLiked username={userName} />
            </div>
          ) : (
            <div className="h-screen">
              <div className="bg-gray-100">
                <div className="flex items-center justify-center w-9/12 min-h-screen px-6 py-16 m-auto">
                  <div className="pb-8 overflow-hidden rounded-md shadow-md sm:rounded-lg">
                    <div className="pt-8 text-center border-t border-gray-200">
                      <h3 className="py-8 text-6xl font-normal">
                        <span className="text-indigo-500">405:</span> Not
                        Allowed!
                      </h3>
                      <p className="px-12 pb-8 text-2xl font-medium">
                        You are not permitted to visit the page you have
                        requested for.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : //TODO:Add Spinner Here
      null}
    </div>
  );
}
export async function getServerSideProps(context) {
  const { userName } = context.params;
  return {
    props: {
      userName,
    }, // will be passed to the page component as props
  };
}
