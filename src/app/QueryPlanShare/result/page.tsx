"use client";
import React, { useEffect, useState } from "react";

// import useStore from "@/store";
import Result from "@/app/components/Organisms/QueryPlanShare/Result";
import useStore from "@/store";

const guest_user_id = process.env.NEXT_PUBLIC_GUEST_USER_ID;

export default function Page() {
  const [userId, setUserId] = useState("");

  const { user } = useStore();

  useEffect(() => {
    const getUser = async () => {
      const this_userid = user.id
        ? user.id
        : guest_user_id
        ? guest_user_id
        : ""; //guest_user_id === undefined ? "" : guest_user_id;
      setUserId(this_userid);
    };
    getUser();
  }, [user]);

  return (
    <section className="mb-2 w-full mx-auto">
      <Result userId={userId} />
      {/* <Container /> */}
    </section>
  );
}
