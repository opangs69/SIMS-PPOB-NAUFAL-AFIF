import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import getSessionItem from "./getSessionItem";
import { useNavigate } from "react-router";

export default function Services() {
  const token = getSessionItem("tkn");
  const navigate = useNavigate();

  const { data, isError, error } = useQuery({
    queryKey: ["get-services"],
    queryFn: async () => {
      const res = await axios.get(
        "https://take-home-test-api.nutech-integrasi.com/services",
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

  const handleNavigate = (data) => {
    navigate("/pembayaran", { state: { data } });
  };

  return (
    <>
      <div className="flex gap-10  carousel rounded-box mt-10">
        {data?.map((service, idx) => {
          return (
            <div key={idx} className="w-[60px] carousel-item">
              <div
                onClick={() => handleNavigate(data[idx])}
                className="hover: cursor-pointer"
              >
                <img src={service.service_icon} width={60} alt="" />
                <p className="text-[10px] font-semibold text-center ">
                  {service.service_name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
