import { Link } from "react-router-dom";
import { subFolderData } from "../../Types";

type driveItemCardProps = {
  subFolder: subFolderData;
};

export const DriveItemCard = ({ subFolder }: driveItemCardProps) => {
  return (
    <Link to={`/${subFolder?.id}`} className="hover:bg-primary/5">
      <div className="grid grid-cols-4  p-3 pl-5">
        <p className="col-span-2 items-center flex gap-5 text-sm text-base-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6 text-primary"
          >
            <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
          </svg>
          {subFolder.name}
        </p>
        <p className=" text-sm text-base-conten">
          5000<span className="text-info-content"> Kb</span>
        </p>

        <p className=" text-sm text-base-conten">{subFolder.createdAt}</p>
      </div>
    </Link>
  );
};
