import "./index.css";
import { Group } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import "./index.css";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"

function LoginPage() {
  // const [value, setValue] = useState<Date | null>(null);
  const navigate = useNavigate();

  interface err {
    firstname: string;
    password: string;
  }

  let userSchema = yup.object({
    userName: yup.string().required("User name is reqired"),
    password: yup
      .string()
      .required("password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one digit")
      .matches(
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
        "Password must contain at least one special character"
      ),
  });

  type User = yup.InferType<typeof userSchema>;

  const form = useForm<User>({
    defaultValues: {
      userName: "",
      password: ""
    }, 
    resolver: yupResolver(userSchema)
  })

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState
  } = form;
  const { errors } = formState;

  const formSubmit = (data: object) => {
    navigate('/tree');
  };

  const [passwordErr, setPasswordErr] = useState<boolean>(false);

  return (
    <div className="h-[100vh] w-full flex items-center justify-center ">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="flex flex-col  w-[300px] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 gap-3"
      >
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            {...register("userName", { required: true })}
            aria-invalid={errors.userName ? "true" : "false"}
            className=" bg-white border border-1 border-gray-300
          shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {/* {errors.userName?.type === "required" && (
            <p role="alert" className="text-xs text-red-600">
              First name is required
            </p>
          )} */}
          <p className="text-xs text-red-600">{errors.userName?.message}</p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: true,
              // pattern:
              //   /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/i,
            })}
            aria-invalid={errors.password ? "true" : "false"}
            className="bg-white border border-1 border-gray-300
          shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={() => {
              console.log("changed");
              handleSubmit(() => {
                errors.password;
              });
            }}
          />
          {/* {errors.password?.type === "required" && (
            <p role="alert" className="text-xs text-red-600">
              Password is required
            </p>
          )}
          {passwordErr && (
            <p role="alert" className="text-xs text-red-600">
              Password is incorrect
            </p>
          )} */}
          <p className="text-xs text-red-600">{errors.password?.message}</p>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Validate
        </button>
        <div className="flex items-center justify-between">
          {/* <NavLink
            to={"/tree"}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Validate
          </NavLink> */}
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
