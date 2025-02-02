import { DriveItemList } from "../components/DriveComponents/DriveItemList";

export const HomePage = () => {
  return (
    <div className="flex flex-col w-full h-full ">
      <div className="flex flex-col">
        <h2 className="text-xl text-base-content font-medium">Welcome back , User</h2>
        <p className="text-info-content">Welcome Back! Lets continue your activity </p>
      </div>

      <div className="flex grow mt-20  ">
        <DriveItemList></DriveItemList>
      </div>
    </div>
  );
};
