import dbConnect from '../../../utils/mongo'
import Product from '../../../models/Product'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';

export async function GET(request: Request) {

    await dbConnect();

    try {
        const products = await Product.find();
        return NextResponse.json(products)
    } catch (error) {
        return NextResponse.json(error, {
            status: 500
        })
    }
  }

export async function POST(request: Request) {

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
        const product = await Product.create(body);
        return NextResponse.json(product, {
            status: 201
        })
    } catch (error) {
        return NextResponse.json(error, {
            status: 500
        })
    }
}