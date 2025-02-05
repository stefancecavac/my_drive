import { DriveItemList } from "../components/DriveComponents/DriveItemList";

export const MyDrivePage = () => {
  return (
    <div className="flex flex-col w-full h-full ">
      <h2 className="text-2xl font-bold text-base-content pb-10">My Drive</h2>

      <DriveItemList></DriveItemList>
    </div>
  );
};
