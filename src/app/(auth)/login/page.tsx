"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { type SubmitHandler, useForm } from "react-hook-form";
import { TbArrowLeftBar } from "react-icons/tb";
import axios from "axios";
import { Url } from "@/utils/basic";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Tostify from "@/utils/Tostify";

type Inputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const validData = {
      email: data.email,
      password: data.password,
    };

    // Post Req for login
    axios
      .post(`${Url}/auth/signin`, validData)
      .then(function (response) {
        if (response) {
          localStorage.setItem("accessToken", response.data);
          toast.success("Login Successful");
          router.push("/support-center");
        }
      })
      .catch(function (error) {
        toast.error(error.response.data.message);
      });
  };

  return (
    <Tostify>
      <div className="containers">
        <Link href="/">
          <div className="group mt-12 flex cursor-pointer items-center space-x-4  hover:text-blue-500">
            <div className=" duration-700 group-hover:scale-x-150 ">
              <TbArrowLeftBar size={25} />
            </div>
            <p>Home</p>
          </div>
        </Link>

        <div className="mx-auto flex h-[80vh] max-w-[400px] items-center justify-center ">
          <div className="space-y-6 ">
            <p className="text-center">Logo Here</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="email">
                <input
                  {...register("email", { required: true })}
                  className=" w-full rounded-t-sm border px-2 py-2 text-sm"
                  type="text"
                  placeholder="Email"
                />
                {errors.email && (
                  <span className="text-xs text-red-500">Required*</span>
                )}
              </label>
              <label htmlFor="password">
                <input
                  {...register("password", { required: true })}
                  className="mt-6 w-full rounded-t-sm border px-2 py-2 text-sm"
                  type="password"
                  placeholder="Password"
                />
                {errors.password && (
                  <span className="text-xs text-red-500">Required*</span>
                )}
              </label>
              <input
                type="submit"
                value="Login"
                className="mt-6 w-full cursor-pointer rounded-sm bg-blue-400 py-2 text-white "
              />
            </form>

            <div className="flex w-full cursor-pointer items-center justify-center space-x-2 bg-orange-200 py-2">
              <FcGoogle />
              <span>Google</span>
            </div>

            <div className="text-center">
              <p>If you have not an account</p>
              <Link
                className="mt-2 block text-blue-500 hover:underline"
                href="register"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Tostify>
  );
};

export default Login;
