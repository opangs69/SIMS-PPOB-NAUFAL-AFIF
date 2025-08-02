import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { editProfileSchema } from "../features/editProfileSchema";
import getSessionItem from "../components/getSessionItem";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router";


export default function Akun() {
  const user = useSelector((state) => state.user.user);
  const [isEdit, setIsEdit] = useState(false);
  const token = getSessionItem("tkn");
  const dispatch = useDispatch()
  let navigate = useNavigate();

  const { mutate: mutationEditProfile } = useMutation({
    mutationFn: async ({ email, first_name, last_name }) => {
      return await axios.put(
        "https://take-home-test-api.nutech-integrasi.com/profile/update",
        {
          email,
          first_name,
          last_name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (response) => {
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col items-center mt-5">
        <div className=" mb-4">
          <img
            src={
              user?.profile_image
                ? "/image/Profile Photo.png"
                : user?.profile_image
            }
            width={100}
            alt="profile"
          />
        </div>
        <div className="font-semibold text-xl text-center flex gap-2">
          <p>{user?.first_name}</p>
          <p>{user?.last_name}</p>
        </div>

        <div className="mt-10">
          <Formik
            validationSchema={editProfileSchema}
            initialValues={{
              email: user?.email || "",
              first_name: user?.first_name || "",
              last_name: user?.last_name || "",
            }}
            enableReinitialize={true}
            onSubmit={(values) => {
              mutationEditProfile({
                email: values.email,
                first_name: values.first_name,
                last_name: values.last_name,
              });
            }}
          >
            <Form>
              <div>
                <label htmlFor="email">Email</label>
                <div className="mt-2 relative grid items-center">
                  <MdAlternateEmail
                    color="grey"
                    className="absolute ml-2 opacity-[50%] pointer-events-none"
                  />
                  <Field
                    name="email"
                    type="email"
                    id="email"
                    required
                    autoComplete="email"
                    placeholder="email"
                    className=" rounded-sm h-[30px] pl-8 w-[500px] text-base text-gray-900 outline outline-offset-1 outline-gray-100 outline-2 placeholder:text-gray-400 focus:outline-2  focus:outline-blue-400 sm:text-sm/6"
                  />
                </div>
              </div>
              <ErrorMessage
                name="email"
                component={"div"}
                className="text-red-500 text-xs mt-1"
              />

              <div className="mt-5">
                <label htmlFor="first_name">Nama depan</label>
                <div className="mt-2 relative grid items-center">
                  <FaUser
                    color="grey"
                    className="absolute ml-2 opacity-[50%] pointer-events-none"
                  />
                  <Field
                    name="first_name"
                    type="text"
                    id="first_name"
                    required
                    placeholder="nama depan"
                    className=" rounded-sm h-[30px] pl-8 w-full text-base text-gray-900 outline outline-offset-1 outline-gray-100 outline-2 placeholder:text-gray-400 focus:outline-2  focus:outline-blue-400 sm:text-sm/6"
                  />
                </div>
              </div>
              <ErrorMessage
                name="first_name"
                component={"div"}
                className="text-red-500 text-xs mt-1"
              />

              <div className="mt-5">
                <label htmlFor="last_name">Nama belakang</label>
                <div className="mt-2 relative grid items-center">
                  <FaUser
                    color="grey"
                    className="absolute ml-2 opacity-[50%] pointer-events-none"
                  />
                  <Field
                    name="last_name"
                    type="text"
                    required
                    id="last_name"
                    placeholder="nama belakang"
                    className=" rounded-sm h-[30px] pl-8 w-full text-base text-gray-900 outline outline-offset-1 outline-gray-100 outline-2 placeholder:text-gray-400 focus:outline-2  focus:outline-blue-400 sm:text-sm/6"
                  />
                </div>
              </div>
              <ErrorMessage
                name="last_name"
                component={"div"}
                className="text-red-500 text-xs mt-1"
              />

              <button
                type="submit"
                className={
                  isEdit
                    ? "bg-red-600 text-white  w-full py-1 rounded mt-8 hover:bg-red-500 font-semibold"
                    : "hidden"
                }
              >
                Simpan
              </button>
            </Form>
          </Formik>
          <button
            onClick={() => setIsEdit(true)}
            className={
              isEdit
                ? "hidden"
                : "bg-white d-none text-red-600 w-full py-1 rounded mt-8  font-semibold outline outline-offset-1 outline-red-100 hover:outline-red-300 outline-2"
            }
          >
            Edit Profile
          </button>
          <button
          onClick={handleLogout}
            className={
              isEdit
                ? "hidden"
                : "bg-red-600 w-full py-1 rounded mt-5 mb-10 text-white hover:bg-red-500 font-semibold"
            }
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
