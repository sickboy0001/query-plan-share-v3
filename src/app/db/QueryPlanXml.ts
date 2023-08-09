"use client"
import { Database } from "@/lib/database.types";
import { createServerComponentClient,createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// import { cookies } from "next/headers";

const supabase = createClientComponentClient<Database>();


export const InsertQueryPlanXml = async(user_id:string ,xml:string)=>{
    //  console.log(`insertTask = async(user_id:${user_id} contents:${xml})`)
    const { data, error } = await supabase
        .from('qpv_query_plans')
        .insert([
        { user_id: user_id ,xml: xml ,is_filed: false,    is_archive :false}
        ])
        .select();
        return data;
};