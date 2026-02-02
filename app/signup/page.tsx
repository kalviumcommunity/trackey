"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormData } from "@/lib/signupSchema";
import FormInput from "@/components/FormInput";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("Signup Data:", data);
    alert(`Welcome ${data.name}!`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-96 p-6 border rounded-lg bg-gray-50"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Signup Form</h1>

        <FormInput
          label="Name"
          name="name"
          register={register}
          error={errors.name?.message}
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password?.message}
        />

        <button
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </button>
      </form>
    </main>
  );
}
