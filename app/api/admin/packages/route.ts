import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const list = await prisma.package.findMany({
      include: { destination: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, data: list });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id, packageName, duration, price, images, description, destinationId } = await req.json();

    if (!packageName || !duration || !price || !description || !destinationId) {
      return NextResponse.json({ success: false, error: 'Required fields missing.' }, { status: 400 });
    }

    let result;
    if (id) {
      result = await prisma.package.update({
        where: { id },
        data: { packageName, duration, price: parseFloat(price), images, description, destinationId }
      });
    } else {
      result = await prisma.package.create({
        data: { packageName, duration, price: parseFloat(price), images, description, destinationId }
      });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID parameter missing.' }, { status: 400 });
    }

    await prisma.package.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
