"use client";

import { Post } from "@/types";
import { use, useActionState } from "react";

export default function EditForm({
	postPromise,
}: {
	postPromise: Promise<{ message: string; post: Post }>;
}) {
	const post = use(postPromise).post;

	async function editPost(prevState: string | null, formData: FormData) {
		const data = {
			title: formData.get("title"),
			description: formData.get("description"),
		};

		const res = await fetch(`/api/blog/${post.id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		});
		const tmp = await res.json();

		return tmp.message;
	}

	const [message, formAction, pending] = useActionState(editPost, null);

	return (
		<form className="mt-3">
			<label className="block">
				title:
				<input
					type="text"
					name="title"
					className="border-1 rounded-md border-gray-300 ml-2"
					defaultValue={post.title}
				/>
			</label>

			<label className="block mt-2">
				description:
				<input
					type="text"
					name="description"
					className="border-1 rounded-md border-gray-300 ml-2"
					defaultValue={post.description}
				/>
			</label>

			<div className="mt-2">
				<button
					className="border-1 p-1 cursor-pointer"
					formAction={formAction}
					disabled={pending}
				>
					更新
				</button>
				{pending && <p>送信中...</p>}
				{message && <p>{message}</p>}
			</div>
		</form>
	);
}
