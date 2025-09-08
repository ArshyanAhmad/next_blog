"use client";

import { AnimatedGradientText } from "./ui/gradient-text";
import { RainbowButton } from "./magicui/rainbow-button";
import { toast, ToastContainer } from "react-toastify";
import { SignupInput } from "@/types/user.types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/app/config";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import axios from "axios";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState<SignupInput>({
    username: "",
    email: "",
    password: "",
  });

  const sendRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.username || !form.password || !form.email) {
      toast.error("Please provide all credentials");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/users/signup`,
        form
      );

      const data = res.data?.user;
      // console.log(data);

      if (res.data.success) {
        toast.success("Signup successfully!");
        setForm({ username: "", email: "", password: "" });
        router.push("/");
      } else {
        toast.error("Signup failed. Try again.")
      }
    } catch (error: any) {

      toast.error("Something went wrong")
      console.error("Error: ", error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <ToastContainer />
      <form onSubmit={sendRequest}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z"
                    fill="#FFF9BF"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </a>

            <AnimatedGradientText className=" font-medium">
              <h1 className="text-4xl font-bold ">
                Create Your Account
              </h1>
            </AnimatedGradientText>

            <h5>Join us and start your journey 🚀</h5>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">

              <Label htmlFor="Username">Username</Label>
              <Input
                id="Username"
                type="Username"
                placeholder="username"
                required
                value={form.username}
                onChange={(e) => {
                  setForm({
                    ...form,
                    username: e.target.value,
                  });
                }}
              />

              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                value={form.email}
                onChange={(e) => {
                  setForm({
                    ...form,
                    email: e.target.value,
                  });
                }}
              />

              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                required
                value={form.password}
                onChange={(e) => {
                  setForm({
                    ...form,
                    password: e.target.value,
                  });
                }}
              />
            </div>

            <RainbowButton
              // onClick={sendRequest}
              type="submit"
              className="w-full"
            >
              {loading ? "Signing Up..." : "Signup"}
            </RainbowButton>

          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <RainbowButton
              type="submit"
              variant={"outline"}
              className="w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Continue with Apple
            </RainbowButton>

            <RainbowButton
              type="submit"
              variant={"outline"}
              className="w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Continue with Google
            </RainbowButton>
          </div>
        </div>
      </form>

      <div className="text-center text-sm">
        Already have an account?{" "}

        <Link href="/login" className="underline underline-offset-4">
          Log in
        </Link>

      </div>
    </div>
  );
}
