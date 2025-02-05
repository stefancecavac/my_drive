import { Link } from "react-router-dom";
import { FileData } from "../../Types";

type FileItemCard = {
  file: FileData;
};

export const FileItemCard = ({ file }: FileItemCard) => {
  return (
    <Link to={`/my-drive/${file?.id}`} className="hover:bg-primary/5 border-b border-neutral">
      <div className="grid grid-cols-4  p-3 pl-5">
        <p className="col-span-2 items-center flex gap-5 text-sm text-base-content">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6 text-base-content fill-base-content"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          </svg>
          {file.name}
        </p>
        <p className=" text-sm text-base-conten">
          5000<span className="text-info-content"> Kb</span>
        </p>

        <p className=" text-sm text-base-conten">{file.createdAt}</p>
      </div>
    </Link>
  );
};
