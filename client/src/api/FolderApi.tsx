import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/ApiClient";

export const useGetFolders = () => {
  const getFoldersApi = async () => {
    const response = await apiClient.get("/folders/");

    return response.data;
  };

  const { data: folders } = useQuery({
    queryKey: ["folders"],
    queryFn: getFoldersApi,
  });

  return { folders };
};
