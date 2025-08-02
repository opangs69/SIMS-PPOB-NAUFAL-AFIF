import { MdAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signUpSchema } from "../features/signUpSchema";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function Registration() {
  const {mutate: mutationSignUp} = useMutation({
    mutationFn: async({email, first_name,last_name,password}) => {
     
      return await axios.post("https://take-home-test-api.nutech-integrasi.com/registration", {
        email,
        first_name,
        last_name,
        password
      })
    },
    onSuccess: (response) => {
      
      toast.success(response.data.message)
    },
    onError:(error) => {
      toast.error(error.response.data.message)
    }
  })

  return (
    <>
      <div className=" min-h-svh flex justify-center items-center md:gap-10 ">
        <div className=" flex flex-col justify-center items-center ">
          <div className="flex items-center gap-2 pb-2">
            <img src="/image/Logo (1).png" alt="logo" width={22} />
            <h2 className="font-semibold"> SIMS PPOB</h2>
          </div>

          <h1 className="text-2xl w-[300px] text-center pb-5 font-semibold">
            Lengkapi data untuk membuat akun
          </h1>

          <Formik
            validationSchema={signUpSchema}
            initialValues={{
              email: "",
              first_name: "",
              last_name: "",
              password: "",
              konfirmasiPassword: "",
            }}
            onSubmit={(values) => {
              mutationSignUp({
                email: values.email,
                first_name: values.first_name,
                last_name: values.last_name,
                password: values.password
              })
            }}
          >
            <Form>
              <div className="mt-2 relative grid items-center">
                <MdAlternateEmail
                  color="grey"
                  className="absolute ml-2 opacity-[50%] pointer-events-none"
                />
                <Field
                  name="email"
                  type="email"
                  required
                  placeholder="masukkan email anda"
                  autoComplete="email"
                  className=" rounded-sm h-[30px] pl-8 w-[300px] text-base text-gray-900 outline outline-offset-1 outline-gray-100 outline-2 placeholder:text-gray-400 focus:outline-2  focus:outline-blue-400 sm:text-sm/6"
                />
              </div>
              <ErrorMessage
                name="email"
                component={"div"}
                className="text-red-500 text-xs mt-1"
              />

              <div className="mt-7 relative grid items-center">
                <FaUser
                  color="grey"
                  className="absolute ml-2 opacity-[50%] pointer-events-none"
                />
                <Field
                  name="first_name"
                  type="text"
                  required
                  placeholder="nama depan"
                  className=" rounded-sm h-[30px] pl-8 w-full text-base text-gray-900 outline outline-offset-1 outline-gray-100 outline-2 placeholder:text-gray-400 focus:outline-2  focus:outline-blue-400 sm:text-sm/6"
                />
              </div>
              <ErrorMessage
                name="first_name"
                component={"div"}
                className="text-red-500 text-xs mt-1"
              />

              <div className="mt-7 relative grid items-center">
                <FaUser
                  color="grey"
                  className="absolute ml-2 opacity-[50%] pointer-events-none"
                />
                <Field
                  name="last_name"
                  type="text"
                  required
                  placeholder="nama belakang"
                  className=" rounded-sm h-[30px] pl-8 w-full text-base text-gray-900 outline outline-offset-1 outline-gray-100 outline-2 placeholder:text-gray-400 focus:outline-2  focus:outline-blue-400 sm:text-sm/6"
                />
              </div>
              <ErrorMessage
                name="last_name"
                component={"div"}
                className="text-red-500 text-xs mt-1"
              />

              <div className="mt-7 relative grid items-center">
                <TbLockPassword
                  color="grey"
                  className="absolute ml-2 opacity-[50%] pointer-events-none"
                />
                <Field
                  name="password"
                  required
                  placeholder="buat password "
                  type="password"
                  className="outline outline-2 h-[30px] pl-8 w-full  outline-gray-100 rounded-sm text-base text-gray-900 text-sm/6 focus:outline-2  focus:outline-blue-400"
                />
              </div>
              <ErrorMessage
                name="password"
                component={"div"}
                className="text-red-500 text-xs mt-1"
              />

              <div className="mt-7 relative grid items-center">
                <TbLockPassword
                  color="grey"
                  className="absolute ml-2 opacity-[50%] pointer-events-none"
                />
                <Field
                  name="konfirmasiPassword"
                  required
                  placeholder="konfirmasi password "
                  type="password"
                  className="outline outline-2 h-[30px] pl-8 w-full  outline-gray-100 rounded-sm text-base text-gray-900 text-sm/6 focus:outline-2  focus:outline-blue-400"
                />
              </div>
              <ErrorMessage
                name="konfirmasiPassword"
                component={"div"}
                className="text-red-500 text-xs mt-1"
              />

              <button
                type="submit"
                className=" bg-red-600 w-full py-1 rounded mt-8 text-white hover:bg-red-500 font-semibold"
              >
                Registrasi
              </button>
            </Form>
          </Formik>

          <p className="text-xs mt-5">
            sudah punya akun? login{" "}
            <Link to="/" className="text-red-500 hover:text-red-400">
              di sini
            </Link>
          </p>
        </div>

        <div className="">
          <img
            src="/image/IllustrasiLogin.png"
            alt=""
            width={380}
            className="rounded hidden md:flex "
          />
        </div>
      </div>
    </>
  );
}
