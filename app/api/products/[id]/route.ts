import dbConnect from '../../../../utils/mongo'
import Product from '../../../../models/Product'
import { NextResponse } from 'next/server'

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

export async function POST(request: Request) {

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