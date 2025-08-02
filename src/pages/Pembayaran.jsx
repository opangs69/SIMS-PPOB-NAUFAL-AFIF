import { useLocation } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import SaldoCard from "../components/SaldoCard";
import { Field, Form, Formik } from "formik";
import { MdOutlineMoney } from "react-icons/md";
import formatRupiah from "../components/FormatRupiah";
import { useState } from "react";
import getSessionItem from "../components/getSessionItem";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function Pembayaran() {
  const location = useLocation();
  const { data } = location.state || {};
  const token = getSessionItem("tkn");
  const {
    data: saldo,
    isError,
    error,
  } = useQuery({
    queryKey: ["get-balance"],
    queryFn: async () => {
      const res = await axios.get(
        "https://take-home-test-api.nutech-integrasi.com/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.data;
    },
  });
  if (isError) {
    return console.log(error);
  }
  const { mutate: mutationBayar } = useMutation({
    mutationFn: async ({ service_code }) => {
      return await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/transaction",
        {
          service_code,
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

  return (
    <>
      <div className="w-[80%] m-auto pt-5">
        <div className="flex items-center justify-between mb-10">
          <ProfileCard />
          <SaldoCard />
        </div>

        <p>Pembayaran</p>
        <div className="flex items-center gap-3 mt-3">
          <img src={data.service_icon} width={30} alt="" />
          <p className="font-semibold">{data.service_name}</p>
        </div>

        <div className="mt-5">
          <Formik
            initialValues={{
              service_code: data.service_code || "",
            }}
            enableReinitialize={true}
            onSubmit={(values) => {
              if (saldo < data.service_tariff && saldo != 0) {
                toast.error("saldo kurang");
              } else {
                mutationBayar({
                  service_code: values.service_code,
                });
              }
            }}
          >
            <Form>
              <div className="relative grid items-center">
                <MdOutlineMoney
                  color="grey"
                  className="absolute ml-2 opacity-[50%] pointer-events-none"
                />
                <p className="rounded-sm h-[30px] pl-8 w-[400px] text-base text-gray-900 outline outline-offset-1 outline-gray-100 outline-2  placeholder:text-gray-400 focus:outline-2  focus:outline-blue-400 sm:text-sm/6">
                  {formatRupiah(data.service_tariff)}
                </p>
                <Field
                  type="text"
                  name="service_code"
                  disabled
                  className="hidden"
                />
              </div>
              <button
                type="submit"
                className="bg-red-600 w-[400px] py-1 rounded mt-5 text-white hover:bg-red-500 font-semibold"
              >
                Bayar
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}
