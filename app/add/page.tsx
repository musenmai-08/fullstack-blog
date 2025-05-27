"use client";

import Link from "next/link";
import { useActionState } from "react";

async function createPost(prevState: string | null, formData: FormData) {
	const data = {
		title: formData.get("title"),
		description: formData.get("description"),
	};

	const res = await fetch(`/api/blog`, {
		method: "POST",
		body: JSON.stringify(data),
	});
	const tmp = await res.json();

	return tmp.message;
}

export default function Add() {
	const [message, formAction, pending] = useActionState(createPost, null);

	return (
		<div className="m-6">
			<Link href="/" className="text-blue-400">
				homeに戻る
			</Link>

			<div className="mt-5">
				<p>入力フォーム</p>

				<form className="mt-3">
					<label className="block">
						title:
						<input
							type="text"
							name="title"
							className="border-1 rounded-md border-gray-300 ml-2"
						/>
					</label>

					<label className="block mt-2">
						description:
						<input
							type="text"
							name="description"
							className="border-1 rounded-md border-gray-300 ml-2"
						/>
					</label>

					<div className="mt-2">
						<button
							className="border-1 p-1 cursor-pointer"
							formAction={formAction}
							disabled={pending}
						>
							登録
						</button>
						{pending && <p>送信中...</p>}
						{message && message}
					</div>
				</form>
			</div>
		</div>
	);
}
