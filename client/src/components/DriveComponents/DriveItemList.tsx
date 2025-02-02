import { Link } from "react-router-dom";
import { useGetCurrentFolder } from "../../api/FolderApi";
import { DriveItemCard } from "./DriveItemCard";

export const DriveItemList = () => {
  const { folder, folderLoading } = useGetCurrentFolder();

  return (
    <div className="flex flex-col gap-5 grow">
      <div className="text-base-content font-medium  flex items-center ">
        {folder?.breadCrumbs.map((bread, index) => (
          <div key={bread.id} className="flex items-center mr-2 ">
            <Link to={`/${bread.id}`} className="btn btn-ghost   gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 text-primary"
              >
                <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
              </svg>
              {bread.name}
            </Link>

            {folder.breadCrumbs.length !== index + 1 && (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            )}
          </div>
        ))}
      </div>
      <div className="bg-base-100 rounded-lg border border-neutral  flex grow">
        <div className="overflow-x-auto flex w-full  flex-col h-full ">
          <div className="grid grid-cols-4 p-3 border-b border-neutral">
            <p className="col-span-2  ml-13 text-info-content font-medium text-md">Name</p>
            <p className="text-info-content font-medium text-md">Size</p>
            <p className="text-info-content font-medium text-md">Created at</p>
          </div>
          {folderLoading ? (
            <span className="loading loading-spinner text-primary flex grow   mx-auto "></span>
          ) : (
            folder?.subFolders?.map((subFolder) => <DriveItemCard key={subFolder.id} subFolder={subFolder}></DriveItemCard>)
          )}
        </div>
      </div>
    </div>
  );
};
