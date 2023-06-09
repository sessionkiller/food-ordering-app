import dbConnect from '../../../utils/mongo'
import Order from '../../../models/Order'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {

    await dbConnect();

    try {
        const orders = await Order.find();
        return NextResponse.json(orders)
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
        const order = await Order.create(body);
        return NextResponse.json(order, {
            status: 201
        })
    } catch (error) {
        return NextResponse.json(error, {
            status: 500
        })
    }
}