import { Link } from "react-router-dom";
import { FolderData } from "../../Types";

type breadCrumbsProps = {
  folder: FolderData;
};

type Breadcrumb = FolderData["breadCrumbs"][0];

export const BreadCrumbs = ({ folder }: breadCrumbsProps) => {
  return (
    <div className="text-base-content font-medium  flex items-center ">
      {folder?.breadCrumbs.map((bread: Breadcrumb, index: number) => (
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
  );
};
