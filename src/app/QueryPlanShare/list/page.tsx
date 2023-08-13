"use client";
import React, { useEffect, useState } from "react";

import useStore from "@/store";
import List from "@/app/components/Organisms/QueryPlanShare/List";
const guest_user_id = process.env.NEXT_PUBLIC_GUEST_USER_ID;

function ThisPage() {
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
    <section className="mb-2 w-5/6 mx-auto">
      <List userId={userId} />
      {/* <Container /> */}
    </section>
  );
}

export default ThisPage;
