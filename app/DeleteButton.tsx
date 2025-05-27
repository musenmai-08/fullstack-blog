"use client";
import { useRouter } from "next/navigation";
import { startTransition, useActionState } from "react";

// クライアントで実行される
async function deletePost(id: number) {
	const res = await fetch(`/api/blog/${id}`, {
		method: "DELETE",
	});
	const data = await res.json();

	return data.message;
}

export default function DeleteButton({ id }: { id: number }) {
	const router = useRouter();
	const [message, deleteAction, pending] = useActionState(
		() => deletePost(id),
		""
	);

	const onClick = async () => {
		if (!confirm("本当に削除しますか？")) {
			return;
		}

		// useActionStateが返した関数はトランジションの内部で呼ばなければならない
		// https://zenn.dev/uhyo/books/react-19-new/viewer/useactionstate
		startTransition(() => {
			deleteAction();
		});

		router.push("/");
		router.refresh();
	};

	return (
		<div>
			<button
				className="text-red-600 cursor-pointer"
				onClick={onClick}
				disabled={pending}
			>
				削除
			</button>
			{message && <p>{message}</p>}
		</div>
	);
}
