import dbConnect from '../../../../utils/mongo'
import Product from '../../../../models/Product'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';

export async function GET(request: Request, {
    params,
  }: {
    params: { id: string };
  }) {

    await dbConnect();
    
    try {
        const product = await Product.findById(params.id);
        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json(error, {
            status: 500
        })
    }
  }

export async function DELETE(request: Request, {
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

    try {
        await Product.findByIdAndDelete(params.id);
        return NextResponse.json('Deleted')
    } catch (error) {
        return NextResponse.json(error, {
            status: 500
        })
    }
}