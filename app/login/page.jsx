"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const REGNO_PATTERN = /^[A-Z]{2,4}\/\d{2}\/[A-Z]{2,4}\/\d{4,6}$/;
const REGNO_EXAMPLE = "CST/23/IFT/00000";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    regno: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.regno.trim()) {
      newErrors.regno = "Registration number is required";
    } else if (!REGNO_PATTERN.test(formData.regno.trim())) {
      newErrors.regno = `Format must match ${REGNO_EXAMPLE}`;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Simulate processing (replace with real auth call later)
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex w-full h-screen justify-center items-center"
      >
        <div className="flex flex-col gap-4 border border-slate-300 px-10 py-12 shadow-md rounded-md w-full max-w-sm">

          <div className="flex flex-col gap-1">
            <input
              className={`border px-6 py-2 rounded-md outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-600 focus:border-blue-500 focus:ring-blue-200"
              }`}
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
              disabled={isSubmitting}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <input
              className={`border px-6 py-2 rounded-md outline-none focus:ring-2 ${
                errors.regno
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-600 focus:border-blue-500 focus:ring-blue-200"
              }`}
              type="text"
              placeholder={`e.g. ${REGNO_EXAMPLE}`}
              name="regno"
              value={formData.regno}
              onChange={handleChange}
              autoComplete="off"
              disabled={isSubmitting}
            />
            {errors.regno && (
              <span className="text-red-500 text-sm">{errors.regno}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <input
              className={`border px-6 py-2 rounded-md outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-600 focus:border-blue-500 focus:ring-blue-200"
              }`}
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white py-2 rounded-md cursor-pointer hover:opacity-50 active:opacity-75 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              "Submit"
            )}
          </button>

        </div>
      </form>
    </>
  );
}