import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { CreateFolderData, createFolderSchema } from "../../Types";
import { useForm } from "react-hook-form";
import { useCreateFolder } from "../../api/FolderApi";
import { UseAuthContext } from "../../context/AuthContext";
import { Dispatch, SetStateAction } from "react";

type newFolderProps = {
  setNewFolderShow: Dispatch<SetStateAction<boolean>>;
};

export const NewFolderForm = ({ setNewFolderShow }: newFolderProps) => {
  const { user } = UseAuthContext();

  const { register, handleSubmit } = useForm<CreateFolderData>({ resolver: zodResolver(createFolderSchema) });
  const { createFolder } = useCreateFolder();

  const handleCreateNewFolder = (data: CreateFolderData) => {
    createFolder({ ...data, parentFolderId: user.rootId }); //harcoded for now TODO use params proly (if on any other page use user.rootId if has folder param use that)
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
