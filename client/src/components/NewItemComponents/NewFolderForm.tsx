import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { CreateFolderData, createFolderSchema } from "../../Types";
import { useForm } from "react-hook-form";
import { useCreateFolder } from "../../api/FolderApi";
import { UseAuthContext } from "../../context/AuthContext";
import { Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";

type newFolderProps = {
  setNewFolderShow: Dispatch<SetStateAction<boolean>>;
};

export const NewFolderForm = ({ setNewFolderShow }: newFolderProps) => {
  const { user } = UseAuthContext();
  const { folderId } = useParams();

  const { register, handleSubmit } = useForm<CreateFolderData>({ resolver: zodResolver(createFolderSchema) });
  const { createFolder } = useCreateFolder();

  const handleCreateNewFolder = (data: CreateFolderData) => {
    createFolder({ ...data, parentFolderId: folderId ?? user.rootId });
  };

  return (
    <form onSubmit={handleSubmit(handleCreateNewFolder)} className="flex items-center mt-8 gap-3">
      <input {...register("name")} placeholder="Your folder name" className="input "></input>
      <button type="button" onClick={() => setNewFolderShow(false)} className="btn ">
        Cancel
      </button>
      <button type="submit" className="btn btn-primary">
        Add Folder
      </button>
    </form>
  );
};
