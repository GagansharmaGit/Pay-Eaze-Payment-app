"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function createOnrampTransaction(amount:number , provider:string){
    const session = await getServerSession(authOptions);
    const userIdCurrent = session.user.id;
    const token = (Math.random()*1000).toString();
    console.log(session);
    if(!userIdCurrent){
        return {
            message : 'User Not Logged in'
        }
    }
    await prisma.onRampTransaction.create({
        data:{
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number(userIdCurrent),
            amount: amount
        }
    });
    return {
        message : "On Ramp Transaction added"
    }
}