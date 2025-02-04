import { useState } from "react";
import { createPortal } from "react-dom";
import { NewFolderForm } from "./NewFolderForm";

export const NewItemModal = () => {
  const [newFolderShow, setNewFolderShow] = useState<boolean>(false);

  return createPortal(
    <dialog id="new-item-modal" className="modal">
      <div className="modal-box  border border-neutral">
        <h3 className="font-bold text-lg text-base-content">Select action </h3>
        <p className="text-info-content">Choose what you want to add in your drive</p>

        {newFolderShow ? (
          <NewFolderForm setNewFolderShow={setNewFolderShow}></NewFolderForm>
        ) : (
          <div className="flex flex-col mt-5 gap-3">
            <button onClick={() => setNewFolderShow(true)} className="btn  btn-ghost justify-start gap-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-base-content size-6"
              >
                <path d="M12 10v6" />
                <path d="M9 13h6" />
                <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
              </svg>
              New Folder
            </button>
            <button className="btn btn-ghost  justify-start gap-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-base-content size-6"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M9 15h6" />
                <path d="M12 18v-6" />
              </svg>
              Upload File
            </button>
          </div>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>,
    document.body
  );
};
