import { NavLink } from "react-router";

export default function Header() {
  return (
    <>
      <div className="border-b-2 border-grey-200">
        <div className="w-[80%] m-auto my-5 flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <img src="/image/Logo (1).png" width={30} alt="Logo" />

            <h1 className="font-semibold">SIMS PPOB-NAUFAL AFIF</h1>
          </div>
          <div className="flex gap-10">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-red-400 font-semibold" : "text-black font-semibold"
              }
              end
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/topup"
              className={({ isActive }) =>
                isActive ? "text-red-400 font-semibold" : "text-black font-semibold"
              }
              end
            >
              Top Up
            </NavLink>
            <NavLink
              to="/transaction"
              className={({ isActive }) =>
                isActive ? "text-red-400 font-semibold" : "text-black font-semibold"
              }
              end
            >
              Transaction
            </NavLink>
            <NavLink
              to="/akun"
              className={({ isActive }) =>
                isActive ? "text-red-400 font-semibold" : "text-black font-semibold"
              }
              end
            >
              Akun
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
