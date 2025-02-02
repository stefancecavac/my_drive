import { useGetFolders } from "../../api/FolderApi";

export const DriveItemList = () => {
  const { folders } = useGetFolders();

  return (
    <div className="flex flex-col gap-5">
      <div className="text-base-content font-medium">My Drive:</div>
      <div className="bg-base-100 rounded-lg shadow-sm p-2 border-2 border-base-300">
        {folders?.map((folder: any) => (
          <p key={folder.id}>{folder.name}</p>
        ))}
      </div>
    </div>
  );
};
