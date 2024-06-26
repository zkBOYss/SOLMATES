import { useForm } from "react-hook-form";
// import { useMutation, useQueryClient } from "react-query";

// imports all the function as apiClient variable
// import * as apiClient from "../api-client";
// import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const Register = () => {
	// const queryClient = useQueryClient();
	const navigate = useNavigate();
	// const { showToast } = useAppContext();
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>();

	// whenever we want to use POST, PUT or DELETE request, we can use useMutation() hook from react-query
	// const mutation = useMutation(apiClient.register, {
	// 	onSuccess: async () => {
	// 		showToast({ message: "Registration Success!", type: "SUCCESS" });
	// 		await queryClient.invalidateQueries("validateToken");
	// 		navigate("/");
	// 	},
	// 	onError: (error: Error) => {
	// 		showToast({ message: error.message, type: "ERROR" });
	// 	},
	// });

	const onSubmit = handleSubmit((data) => {
		// we are passing the RegisterFormData to the mutate function and then mutate function will pass it to our apiClient.register(it will trigger when we submit the form)
		// mutation.mutate(data);
		console.log(data);
	});

	return (
		<div className="flex items-start h-[90vh] justify-center">
			<form className="flex flex-col gap-5" onSubmit={onSubmit}>
				<h2 className="text-3xl font-bold text-center">
					Create an Account
				</h2>
				<div className="flex flex-col md:flex-row gap-5">
					<label className="text-gray-700 text-sm font-bold flex-1">
						First Name
						<input
							type="text"
							className="border rounded w-full py-1 px-2 font-normal"
							{...register("firstName", {
								required: "Field is required",
							})}
						/>
						{errors.firstName && (
							<span className="text-red-500">
								{errors.firstName.message}
							</span>
						)}
					</label>
					<label className="text-gray-700 text-sm font-bold flex-1">
						Last Name
						<input
							type="text"
							className="border rounded w-full py-1 px-2 font-normal"
							{...register("lastName", {
								required: "Field is required",
							})}
						/>
						{errors.lastName && (
							<span className="text-red-500">
								{errors.lastName.message}
							</span>
						)}
					</label>
				</div>
				<label className="text-gray-700 text-sm font-bold flex-1">
					Email
					<input
						type="email"
						className="border rounded w-full py-1 px-2 font-normal"
						{...register("email", {
							required: "Field is required",
						})}
					/>
					{errors.email && (
						<span className="text-red-500">
							{errors.email.message}
						</span>
					)}
				</label>
				<label className="text-gray-700 text-sm font-bold flex-1">
					Password
					<input
						type="password"
						className="border rounded w-full py-1 px-2 font-normal"
						{...register("password", {
							required: "Field is required",
							minLength: {
								value: 6,
								message:
									"Password must be atleast 6 characters",
							},
						})}
					/>
					{errors.password && (
						<span className="text-red-500">
							{errors.password.message}
						</span>
					)}
				</label>
				<label className="text-gray-700 text-sm font-bold flex-1">
					Confirm Password
					<input
						type="password"
						className="border rounded w-full py-1 px-2 font-normal"
						{...register("confirmPassword", {
							validate: (val) => {
								if (!val) {
									return "Field is required";
								} else if (watch("password") !== val) {
									return "Your passwords do not match";
								}
							},
						})}
					/>
					{errors.confirmPassword && (
						<span className="text-red-500">
							{errors.confirmPassword.message}
						</span>
					)}
				</label>
				<span>
					<button
						type="submit"
						className="text-white bg-red py-2 font-bold hover:bg-blue-500 text-xl px-6 border rounded-lg"
					>
						Create Account
					</button>
				</span>
			</form>
		</div>
	);
};

export default Register;
