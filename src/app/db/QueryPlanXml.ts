"use client"
import { Database } from "@/lib/database.types";
import { createServerComponentClient,createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// import { cookies } from "next/headers";

const supabase = createClientComponentClient<Database>();


export const InsertQueryPlanXml = async(user_id:string ,xml:string,name:string)=>{
    console.log([{user_id,name,xml}])
    try{
        const { data, error } = await supabase
        .from('qpv_query_plans')
        .insert([
        { user_id: user_id ,xml: xml ,name:name , is_filed: false,    is_archive :false}
        ])
        .select();
        return data;

    }catch(error){
        console.log(error)
        alert(error);
    }
};

export const selectQueryPlanXmls = async(user_id:string)=>{
    console.log([{user_id}])
    try{
        const { data, error } = await supabase.from('qpv_query_plans').select("*")
        .eq("user_id",user_id)
        .order('created_at',  {ascending: true });
        return data;

    }catch(error){
        console.log(error)
        alert(error);
        return ;
    }
};
export const selectQueryPlanXml = async(queryplan_id:string)=>{
    console.log([{queryplan_id}])
    try{
        const { data, error } = await supabase.from('qpv_query_plans').select("*")
        .eq("id",queryplan_id)
        if(data){
            return data[0];
        }
        return "";

    }catch(error){
        console.log(error)
        alert(error);
        return ;
    }
};

export const updateQueryPlanXmlName = async(queryplan_id:string,name:string)=>{
    console.log([{queryplan_id}])
    try{
        // const { data, error } = await supabase.from('qpv_query_plans').
        // select("*")
        // .eq("id",queryplan_id)

        const { error } = await supabase
            .from('qpv_query_plans')
            .update({ name: name})
            .eq("id",queryplan_id)

        // if(data){
        //     return data[0];
        // }
        return "";

    }catch(error){
        console.log(error)
        alert(error);
        return ;
    }
};

//readQueryPlanXmlUserName
export const readQueryPlanXmlUserName = async(user_id:string)=>{
    const guest_user_id = process.env.NEXT_PUBLIC_GUEST_USER_ID;
    if(user_id===guest_user_id){
        return 'guest';
    }
    return 'user1';

};
