import { DriveItemList } from "../components/DriveComponents/DriveItemList";
import { UseAuthContext } from "../context/AuthContext";

export const HomePage = () => {
  const { user } = UseAuthContext();
  return (
    <div className="flex flex-col w-full h-full ">
      <div className="flex flex-col">
        <h2 className="text-xl text-base-content font-medium">
          Welcome back , <span className="text-primary font-semibold">{user.email}</span>
        </h2>
        <p className="text-info-content">Welcome Back! Lets continue your activity </p>
      </div>

      <div className="flex grow mt-20  ">
        <DriveItemList></DriveItemList>
      </div>
    </div>
  );
};
