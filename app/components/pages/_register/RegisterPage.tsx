"use client";
import Link from "next/link";
import { Icons } from "../../Icon";
import { ArrowRight } from "lucide-react";
import { Label } from "../../ui/label";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import { cn } from "@/app/utils/func";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, TSignUpschema } from "@/app/utils/schemas/authSchemas";
import { Button, buttonVariants } from "../../ui/button";
import { useState } from "react";
import axios from "axios";
import {
  api,
  catchErrors,
  getHttpMetaMessage,
} from "@/app/utils/helper/responseHelper";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm<TSignUpschema>({ resolver: zodResolver(signUpSchema) });
  const passwordValue = watch("password");

  const message = getHttpMetaMessage(500, "");
  const onSubmit = (val: TSignUpschema) => {
    setLoading(true);
    axios
      .post(api.register, val)
      .then((response) => {
        if (response.status === 201) {
          router.push("/login");
        } else {
          setError("password", {
            type: "server",
            message,
          });
        }
      })
      .catch((error) => {
        let errors = catchErrors(error);
        setLoading(false);
        if (errors?.name) {
          setError("firstName", {
            type: "server",
            message: errors?.firstName,
          });
        } else if (errors?.email) {
          setError("email", {
            type: "server",
            message: errors?.email,
          });
        } else if (errors?.password) {
          setError("password", {
            type: "server",
            message: errors?.password,
          });
        } else {
          setError("password", {
            type: "server",
            message,
          });
        }
      });
  };
  return (
    <>
      <div className='flex mx-20 mt-20 flex-col items-center justify-center lg:px0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[360px] '>
          <div className='flex flex-col items-center space-y-2 text-center'>
            <Icons.logo className='h-20 w-20' />
            <h1 className='text-2xl font-bold'>Create an account</h1>

            <Link
              href='/login'
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
            >
              Already have an account? sign-in
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
          <div className='grid gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-2'>
                <div className='grid gap-1 py-2'>
                  <Label className='mb-2'>First Name</Label>
                  <Controller
                    control={control}
                    name='firstName'
                    render={({ field: { onChange, value } }) => (
                      <Input
                        onChange={onChange}
                        value={value}
                        placeholder='first name'
                        className={cn({
                          "focus-visible:ring-red-500": errors.firstName,
                        })}
                      />
                    )}
                  />
                </div>
                <div className='grid gap-1 py-2'>
                  <Label className='mb-2'>Last Name</Label>
                  <Controller
                    control={control}
                    name='lastName'
                    render={({ field: { onChange, value } }) => (
                      <Input
                        onChange={onChange}
                        value={value}
                        placeholder='last name'
                        className={cn({
                          "focus-within:ring-red-500": errors.lastName,
                        })}
                      />
                    )}
                  />
                </div>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='email' className='mb-2'>
                    Email
                  </Label>
                  <Controller
                    control={control}
                    name='email'
                    render={({ field: { onChange, value } }) => (
                      <Input
                        onChange={onChange}
                        value={value}
                        placeholder='your@email.com'
                        className={cn({
                          "focus-within:ring-red-500": errors.email,
                        })}
                      />
                    )}
                  />
                  {errors.email && (
                    <span className='text-xs text-red-400'>
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className='grid gap-1 py-2'>
                  <Label htmlFor='password' className='mb-2'>
                    Password
                  </Label>
                  <Controller
                    control={control}
                    name='password'
                    render={({ field: { onChange, value } }) => (
                      <Input
                        type='password'
                        onChange={onChange}
                        value={value}
                        placeholder='password'
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        className={cn({
                          "focus-visible:ring-red-500":
                            focused &&
                            passwordValue &&
                            passwordValue.length < 8,
                        })}
                      />
                    )}
                  />
                  {focused && passwordValue && passwordValue.length < 8 && (
                    <span className='text-xs'>
                      Please enter at least 8 characters for password.
                    </span>
                  )}
                  {errors.password && (
                    <span className='text-xs text-red-400'>
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <Button type='submit'>Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
