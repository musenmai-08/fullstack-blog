import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main() {
	try {
		await prisma.$connect();
	} catch (error) {
		return Error("DB接続に失敗しました。詳細: " + error);
	}
}

// 全ての記事を取得する
export const GET = async () => {
	try {
		await main();
		const posts = await prisma.post.findMany();

		return NextResponse.json({ message: "Success", posts }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ message: "Error", error }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
};

// ブログ投稿用のAPI
export const POST = async (req: Request) => {
	try {
		const { title, description } = await req.json();
		await main();
		const post = await prisma.post.create({ data: { title, description } });

		return NextResponse.json({ message: "Success", post }, { status: 201 });
	} catch (error) {
		return NextResponse.json({ message: "Error", error }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
};
