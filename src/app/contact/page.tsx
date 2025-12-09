"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactForm() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.message) {
            toast.error("Please fill all fields");
            return;
        }

        // Show success toast
        toast.success("Message sent successfully!");
        // Optionally, reset form after submission
        setForm({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            message: "",
        });
    };

    return (
        <div className="relative bg-white px-4 pb-6 sm:py-16 lg:px-6 min-h-screen flex items-center justify-center">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
                <div
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[100rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)]"
                ></div>
            </div>

            <div className="w-full max-w-lg bg-white shadow-md rounded-xl p-6 sm:p-7">
                <h2 className="text-2xl font-semibold text-center text-gray-900 sm:text-3xl">
                    Contact Us
                </h2>
                <p className="mt-1 text-center text-sm text-gray-600">
                    We'd love to hear from you 👇
                </p>

                <form className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">
                            First Name
                        </label>
                        <input
                            id="first-name"
                            name="firstName"
                            type="text"
                            value={form.firstName}
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            placeholder="John"
                        />
                    </div>

                    <div>
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-900">
                            Last Name
                        </label>
                        <input
                            id="last-name"
                            name="lastName"
                            type="text"
                            value={form.lastName}
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            placeholder="Doe"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                            Phone
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            placeholder="+91 98765 43210"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={3}
                            value={form.message}
                            onChange={handleInputChange}
                            className="mt-1 w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            placeholder="Type your message..."
                        ></textarea>
                    </div>

                    <div className="sm:col-span-2">
                        <button
                            type="submit"
                            className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}
