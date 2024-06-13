import { connect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";

connect()


export async function POST(req: NextRequest) {
    try {
        
    } catch (error:any) {
        return NextResponse.json({message:error.message})
    }
}