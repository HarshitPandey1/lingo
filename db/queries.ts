
import {cache} from "react";
import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs";
import { courses, userProgress } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUserProgress=cache(async ()=>{
    const {userId}=await auth();

    if(!userId){
        return null;
    }

    const data=await db.query.userProgress.findFirst({
        where:eq(userProgress.userId,userId),
        with:{
            activeCourses:true,
        },
    });
    return data;
});


export const getCourses=cache(async()=>{
    const data=await db.query.courses.findMany();
    return data;
});


export const getCourseById=cache(async(courseId:number)=>{
    const data=await db.query.courses.findFirst({
        where:eq(courses.id,courseId)
        //TODO :POPULATE UNITS AND LESSONS
    });

    return data;
});







