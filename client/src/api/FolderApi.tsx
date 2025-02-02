import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/ApiClient";
import { useParams } from "react-router-dom";
import { folderData } from "../Types";

export const useGetCurrentFolder = () => {
  const { folderId } = useParams();

  const getCurrentFolderApi = async () => {
    const response = await apiClient.get(`/folders/${folderId}`);

    return response.data as folderData;
  };

  const { data: folder, isFetching: folderLoading } = useQuery({
    queryKey: ["folder", folderId],
    queryFn: getCurrentFolderApi,
  });

  return { folder, folderLoading };
};
