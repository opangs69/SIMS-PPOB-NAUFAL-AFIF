import ProfileCard from "../components/ProfileCard";
import SaldoCard from "../components/SaldoCard";
import { MdOutlineMoney } from "react-icons/md";
import formatRupiah from "../components/FormatRupiah";
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import getSessionItem from "../components/getSessionItem";

export default function TopUp() {
  const nominalOptions = [10000, 20000, 50000, 100000, 250000, 500000];
  const [isTopUpButtonDisabled, setIsTopUpButtonDisabled] = useState(true);
  const [topUpAmount, setTopUpAmount] = useState("");
  // const token = localStorage.getItem("tkn");
  const token = getSessionItem("tkn")

  useEffect(() => {
    const amount = parseInt(topUpAmount.replace(/\D/g, ""), 10);
    if (amount >= 10000 && amount <= 1000000) {
      setIsTopUpButtonDisabled(false);
    } else {
      setIsTopUpButtonDisabled(true);
    }
  }, [topUpAmount]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTopUpAmount(value);
  };

  const handleNominalClick = (nominal) => {
    setTopUpAmount(String(nominal));
  };

  const { mutate: mutationTopUp } = useMutation({
    mutationFn: async ({ top_up_amount }) => {
      return await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/topup",
       
        {
          top_up_amount
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

        <p>Silahkan masukan</p>
        <p className="font-semibold text-xl">Nominal Top Up</p>

        <div className="mt-8 flex items-center gap-10">
          <div>
            <Formik 
            initialValues={{
              top_up_amount : topUpAmount
            }}
            enableReinitialize={true}
            onSubmit={(values) => {
              mutationTopUp({
                top_up_amount:values.top_up_amount
              })
            }}
            
            >
              <Form>
                <div className="relative grid items-center">
                  <MdOutlineMoney
                    color="grey"
                    className="absolute ml-2 opacity-[50%] pointer-events-none"
                  />
                  <Field
                    type="number"
                    name="top_up_amount"
                    onChange={handleInputChange}
                    value={topUpAmount}
                    placeholder="masukan nominal top up"
                    className="rounded-sm h-[30px] pl-8 w-[400px] text-base text-gray-900 outline outline-offset-1 outline-gray-100 outline-2  placeholder:text-gray-400 focus:outline-2  focus:outline-blue-400 sm:text-sm/6"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isTopUpButtonDisabled}
                  className="bg-red-600 w-[400px] py-1 rounded mt-5 text-white hover:bg-red-500 font-semibold"
                >
                  Top Up
                </button>
              </Form>
            </Formik>
          </div>

          <div className="grid grid-cols-3 gap-4 w-[300px]">
            {nominalOptions.map((nominal) => (
              <div
                onClick={() => handleNominalClick(nominal)}
                key={nominal}
                className="p-1 rounded outline outline-offset-1 outline-gray-100 outline-2 cursor-pointer hover:outline-red-400"
              >
                <p className="text-gray-400">{formatRupiah(nominal)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
