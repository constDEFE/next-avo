"use client";

import { type FC, useRef, FormEvent } from "react";
import { validateEmail } from "@/utils/validators";
import { toast } from "react-hot-toast";

const Form: FC = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (inputRef.current) {
			const email = inputRef.current.value;
			const isValid = validateEmail(email);

			if (!isValid) {
				inputRef.current.value = "";
				inputRef.current.focus();
				return toast.error("Invalid email");
			}

			const res = await fetch("/api/friends/add", {
				method: "POST",
				body: JSON.stringify({ email }),
				headers: {
					"Content-Type": "application/json"
				}
			});

			const message = await res.json();

			if (res.ok) {
				inputRef.current.value = "";
				return toast.success("Request sent!");
			} else {
				inputRef.current.value = "";
				return toast.error(message);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col items-start gap-1">
			<label className="font-semibold" htmlFor="add-friend">
				Add friend by Email
			</label>
			<div className="flex w-full gap-2">
				<input
					ref={inputRef}
					type="email"
					required
					id="add-friend"
					placeholder="friends@email.com"
					className="w-full max-w-[320px] rounded-md border px-4 py-2 focus:outline-none focus:border-accent-500"
				/>
				<button className="rounded-md bg-primary-500 px-4 py-2 duration-150 ease-out hover:bg-primary-400">
					Add
				</button>
			</div>
		</form>
	);
};

export default Form;
