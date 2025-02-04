import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/ApiClient";
import { useParams } from "react-router-dom";
import { CreateFolderData, FolderData } from "../Types";

export const useGetCurrentFolder = () => {
  const { folderId } = useParams();

  const getCurrentFolderApi = async () => {
    const response = await apiClient.get(`/folders/${folderId}`);

    return response.data as FolderData;
  };

  const { data: folder, isFetching: folderLoading } = useQuery({
    queryKey: ["folder", folderId],
    queryFn: getCurrentFolderApi,
  });

  return { folder, folderLoading };
};

export const useCreateFolder = () => {
  const queryClient = useQueryClient();
  const { folderId } = useParams();

  const createFolderApi = async (data: CreateFolderData) => {
    const response = await apiClient.post(`/folders/`, data);

    return response.data as FolderData;
  };

  const { mutate: createFolder, isPending: createFolderLoading } = useMutation({
    mutationKey: ["folder"],
    mutationFn: createFolderApi,
    onSuccess: (data: FolderData) => {
      queryClient.setQueryData(["folder", folderId], (oldData: FolderData) => {
        return {
          ...oldData,
          subFolders: [...oldData.subFolders, data],
        };
      });

      const modal = document.getElementById("new-item-modal") as HTMLDialogElement;
      modal.close();
    },
  });

  return { createFolder, createFolderLoading };
};
