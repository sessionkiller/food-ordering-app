import cookie from "cookie";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    const body = await request.json();

    const { username, password } = body;
    const token = process.env.TOKEN;
    
    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD && 
        token
      ) {

        
        return NextResponse.json('Succesfull', {
            status: 200,
            headers: { 'Set-Cookie': cookie.serialize("token", token, {
                maxAge: 60 * 60,
                sameSite: "strict",
                path: "/",
              }) },
        })
    } else {
        return NextResponse.json('Wrong Credentials!', {
            status: 400
        });
    }
}