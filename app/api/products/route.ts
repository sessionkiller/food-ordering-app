import dbConnect from '../../../utils/mongo'
import Product from '../../../models/Product'
import { NextResponse } from 'next/server'

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