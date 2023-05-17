import dbConnect from '../../../../utils/mongo'
import Order from '../../../../models/Order'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';

export async function GET(request: Request, {
    params,
  }: {
    params: { id: string };
  }) {

    await dbConnect();
    
    try {
        const order = await Order.findById(params.id);
        return NextResponse.json(order)
    } catch (error) {
        return NextResponse.json(error, {
            status: 500
        })
    }
  }

export async function PUT(request: Request, {
    params,
  }: {
    params: { id: string };
  }) {

    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if(token?.value !== process.env.TOKEN){
        return NextResponse.json('Not authenticated!', {
            status: 401
        })
    }

    await dbConnect()

    const body = await request.json();

    try {
        const order = await Order.findByIdAndUpdate(params.id, body, {new: true});
        return NextResponse.json(order)
    } catch (error) {
        return NextResponse.json(error, {
            status: 500
        })
    }
}