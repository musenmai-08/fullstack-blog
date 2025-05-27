import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";
import { main } from "../route";

const prisma = new PrismaClient();

// ブログ詳細取得
export const GET = async (req: Request) => {
	try {
		const id = parseInt(req.url.split("/blog/")[1]);

		await main();
		const post = await prisma.post.findFirst({ where: { id } });

		return NextResponse.json({ message: "Success", post }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error", error }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
};

// ブログ編集用
export const PUT = async (req: Request) => {
	try {
		const id = parseInt(req.url.split("/blog/")[1]);
		const { title, description } = await req.json();

		await main();
		const posts = await prisma.post.update({
			where: { id },
			data: { title, description },
		});

		return NextResponse.json({ message: "Success", posts }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error", error }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
};

// 削除用API
export const DELETE = async (req: Request) => {
	try {
		const id = parseInt(req.url.split("/blog/")[1]);

		await main();
		const posts = await prisma.post.delete({ where: { id } });

		return NextResponse.json({ message: "Success", posts }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error", error }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
};
