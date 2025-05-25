"use client";

import { useEffect } from "react";

export default function Test() {
	useEffect(() => {
		// 全件取得
		// const fetchData = async () => {
		// 	const res = await fetch(`http://localhost:3000/api/blog`);
		// 	console.log(res.json());
		// };
		// fetchData();
		// POST
		// const postData = async () => {
		// 	const data = {
		// 		title: "add title data",
		// 		description: "add des data",
		// 	};
		// 	const res = await fetch(`http://localhost:3000/api/blog`, {
		// 		method: "POST",
		// 		body: JSON.stringify(data),
		// 	});
		// 	console.log(await res.json());
		// };
		// postData();
		// 一件のみ取得
		// const fetchData = async () => {
		// 	const res = await fetch(`http://localhost:3000/api/blog/3`);
		// 	console.log(await res.json());
		// };
		// fetchData();
		// 編集
		// const fetchData = async () => {
		// 	const data = {
		// 		title: "edit title data",
		// 		description: "edit des data",
		// 	};
		// 	const res = await fetch(`http://localhost:3000/api/blog/2`, {
		// 		method: "PUT",
		// 		body: JSON.stringify(data),
		// 	});
		// 	console.log(await res.json());
		// };
		// fetchData();
		// 削除
		// const fetchData = async () => {
		// 	const res = await fetch(`http://localhost:3000/api/blog/2`, {
		// 		method: "DELETE",
		// 	});
		// 	console.log(await res.json());
		// };
		// fetchData();
	}, []);

	return (
		<div>
			<p>test用のコンポーネント</p>
		</div>
	);
}
