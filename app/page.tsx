import DeleteButton from "./DeleteButton";
import { Post } from "@/types";
import Link from "next/link";

async function fetchAllPosts() {
	const res = await fetch(`${process.env.BASE_API_URL}/api/blog`, {
		cache: "no-store",
	});
	const data = await res.json();

	return data.posts;
}

export default async function Home() {
	const posts: Post[] = await fetchAllPosts();

	return (
		<div className="m-6">
			<h1 className="text-3xl font-bold">テストのブログ</h1>

			<div className="text-center">
				<Link href="/add" className="bg-cyan-200 p-1 cursor-pointer">
					新規ブログ追加
				</Link>
			</div>

			<div>
				{posts.map((post) => (
					<div key={post.id} className="m-5 bg-red-200 max-w-lg p-4">
						<ul>
							<li>title: {post.title}</li>
							<li>description: {post.description}</li>
							<li>作成日: {post.date}</li>
						</ul>
						<div className="flex justify-end">
							<div className="mr-4">
								<Link href={`/edit/${post.id}`} className="text-blue-600">
									編集
								</Link>
							</div>
							<div>
								<DeleteButton id={post.id} />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
