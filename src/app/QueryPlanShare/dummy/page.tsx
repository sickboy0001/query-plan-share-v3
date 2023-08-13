"use client";
import React, { useEffect, useState } from "react";

// import useStore from "@/store";
import Dummy from "@/app/components/Organisms/QueryPlanShare/Dummy";

const guest_user_id = process.env.NEXT_PUBLIC_GUEST_USER_ID;

export default function Page() {
  const [userId, setUserId] = useState("");

  return (
    <section className="mb-2 w-full mx-auto">
      <Dummy userId={userId} />
      {/* <Container /> */}
    </section>
  );
}
