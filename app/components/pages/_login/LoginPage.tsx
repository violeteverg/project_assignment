"use client";

import Link from "next/link";
import { Button, buttonVariants } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Icons } from "../../Icon";
import { cn } from "@/app/utils/func";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, TSignInSchema } from "@/app/utils/schemas/authSchemas";
import axios from "axios";
import { api, catchErrors } from "@/app/utils/helper/responseHelper";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TSignInSchema>({ resolver: zodResolver(signInSchema) });

  const onSubmit = (val: TSignInSchema) => {
    setLoading(true);
    axios
      .post(api.login, val)
      .then((response) => {
        if (response.status === 200) {
          router.push("/myExpense");
        } else {
          setError("password", {
            type: "server",
            message: "Unexpected response status code.",
          });
        }
      })
      .catch((error) => {
        const serverErrors = catchErrors(error);
        setLoading(false);
        if (serverErrors?.email) {
          setError("email", {
            type: "server",
            message: serverErrors.email,
          });
        } else if (serverErrors?.password) {
          setError("password", {
            type: "server",
            message: serverErrors.password,
          });
        } else {
          setError("password", {
            type: "server",
            message: "An unexpected error occurred.",
          });
        }
      });
  };

  return (
    <div className='container relative flex pt-20 flex-col items-center justify-center lg:px0'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[360px]'>
        <div className='flex flex-col items-center space-y-2 text-center'>
          <Icons.logo className='h-20 w-20' />
          <h1 className='text-2xl font-bold'>Login</h1>

          <Link
            href='/register'
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
          >
            New to the site? Sign up now.
            <ArrowRight className='h-4 w-4' />
          </Link>
        </div>
        <div className='grid gap-6'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-2'>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='email' className='mb-2'>
                  Email
                </Label>
                <Input
                  {...register("email")}
                  placeholder='your@email.com'
                  className={cn({
                    "focus-within:ring-red-500": errors.email,
                  })}
                />
                {errors.email && (
                  <p className='text-red-500'>{errors.email.message}</p>
                )}
              </div>

              <div className='grid gap-1 py-2'>
                <Label htmlFor='password' className='mb-2'>
                  Password
                </Label>
                <Input
                  {...register("password")}
                  placeholder='password'
                  type='password'
                  className={cn({
                    "focus-within:ring-red-500": errors.password,
                  })}
                />
                {errors.password && (
                  <p className='text-red-500'>{errors.password.message}</p>
                )}
              </div>
              <Button type='submit' disabled={loading}>
                {loading ? "loading..." : "Sign In"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
