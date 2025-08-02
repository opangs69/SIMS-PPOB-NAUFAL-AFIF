import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import formatRupiah from "./FormatRupiah";
import getSessionItem from "./getSessionItem";

export default function SaldoCard({setAmount}) {
  const [lihatSaldo, setLihatSaldo] = useState(false);
  const tampilkanSaldo = () => {
    setLihatSaldo(!lihatSaldo);
  };
  const token = getSessionItem("tkn")

  const { data, isError, error } = useQuery({
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

  return (
    <>
      <div
        className="w-[600px]  rounded-lg bg-auto bg-top"
        style={{ backgroundImage: `url("/image/Background Saldo.png")` }}
      >
        <div className="p-4 ">
          <p className="text-white">Saldo anda</p>
          <p className="text-white text-3xl ">
            {lihatSaldo ? formatRupiah(data?.balance) : "******"}
          </p>

          <div className="flex gap-3 items-center">
            <p className="text-white mt-1">
              {lihatSaldo ? "Sembunyikan saldo" : "Lihat saldo"}
            </p>

            {!lihatSaldo ? (
              <FaEye
                onClick={tampilkanSaldo}
                color="white"
                className="mt-1.5 hover:cursor-pointer"
              />
            ) : (
              <FaRegEyeSlash
                onClick={tampilkanSaldo}
                color="white"
                className="mt-1.5 hover:cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
