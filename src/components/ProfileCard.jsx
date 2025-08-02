import { useSelector } from "react-redux";

export default function ProfileCard() {
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <div>
          <div className="w-[80px] mb-4">
            <img
              src={
                user?.profile_image
                  ? "/image/Profile Photo.png"
                  : user?.profile_image
              }
              alt="profile"
            />
          </div>

          <p>selamat datang,</p>
          <div className="flex gap-2">
            <p className="font-bold text-xl">
              {user?.first_name ? user?.first_name : ""}
            </p>
            <p className="font-bold text-xl">
              {user?.last_name ? user?.last_name : ""}
            </p>
          </div>
        </div>
    </>
  );
}
