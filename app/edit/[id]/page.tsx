import Link from "next/link";
import EditForm from "./EditForm";
import { Suspense } from "react";

type Props = {
	params: {
		id: number;
	};
};

async function getPost(id: number) {
	const res = await fetch(`${process.env.BASE_API_URL}/api/blog/${id}`);

	return res.json();
}

export default async function Edit({ params }: Props) {
	const { id } = await params;
	const postPromise = getPost(id);

	return (
		<div className="m-6">
			<Link href="/" className="text-blue-400">
				homeに戻る
			</Link>

			<div className="mt-5">
				<p>編集フォーム</p>

				<Suspense fallback={<>Loading...</>}>
					<EditForm postPromise={postPromise} />
				</Suspense>
			</div>
		</div>
	);
}
