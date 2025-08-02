import { useQuery } from "@tanstack/react-query";
import getSessionItem from "../components/getSessionItem";
import ProfileCard from "../components/ProfileCard";
import SaldoCard from "../components/SaldoCard";
import axios from "axios";
import formatRupiah from "../components/FormatRupiah";
import { format, toZonedTime } from "date-fns-tz";

export default function Transaction() {
  const token = getSessionItem("tkn");

  const ubahFormatWaktu = (tanggalWaktu) => {
    const tanggalObjek = new Date(tanggalWaktu);
    const tanggalDiWib = toZonedTime(tanggalObjek, "Asia/Jakarta");
    return (
      format(tanggalDiWib, "dd MMMM HH:mm", { timeZone: "Asia/Jakarta" }) +
      " WIB"
    );
  };

  const { data, isError, error } = useQuery({
    queryKey: ["get-history"],
    queryFn: async () => {
      const res = await axios.get(
        "https://take-home-test-api.nutech-integrasi.com/transaction/history?offset=0&limit=5",
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
      <div className="w-[80%] m-auto pt-5">
        <div className="flex items-center justify-between mb-10">
          <ProfileCard />
          <SaldoCard />
        </div>

        <h2 className="font-semibold mb-5">Semua transaksi</h2>
        <div className="flex flex-col gap-5 p-5">
          {data?.records?.map((data, idx) => {
            return (
              <div
                key={idx}
                className="flex justify-between p-5 rounded outline outline-offset-1 outline-gray-100 outline-2"
              >
                <div>
                  <p className={data.transaction_type == "TOPUP" ? "text-xl mb-1 text-green-500" : "text-xl mb-1 text-red-500"}>
                     {data.transaction_type == "TOPUP" ? "+" +formatRupiah(data.total_amount): "-" + formatRupiah(data.total_amount)}
                  </p>
                  <p className="text-xs text-gray-600">{ubahFormatWaktu(data.created_on)}</p>
                </div>
                <div>
                  <p className="text-sm ">{data.transaction_type}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
