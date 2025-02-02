import { useGetCurrentFolder } from "../../api/FolderApi";
import { FolderData } from "../../Types";
import { BreadCrumbs } from "./BreadCrumbs";
import { DriveItemCard } from "./DriveItemCard";

export const DriveItemList = () => {
  const { folder, folderLoading } = useGetCurrentFolder();

  return (
    <div className="flex flex-col gap-5 grow">
      <BreadCrumbs folder={folder}></BreadCrumbs>
      <div className="bg-base-100 rounded-lg border border-neutral  flex grow">
        <div className="overflow-x-auto flex w-full  flex-col h-full ">
          <div className="grid grid-cols-4 p-3 border-b border-neutral">
            <p className="col-span-2  ml-13 text-info-content font-medium text-md">Name</p>
            <p className="text-info-content font-medium text-md">Size</p>
            <p className="text-info-content font-medium text-md">Created at</p>
          </div>
          {folderLoading ? (
            <span className="loading loading-spinner text-primary flex grow items-center justify-center  mx-auto "></span>
          ) : (
            folder?.subFolders?.map((subFolder: FolderData) => <DriveItemCard key={subFolder.id} subFolder={subFolder}></DriveItemCard>)
          )}
        </div>
      </div>
    </div>
  );
};
