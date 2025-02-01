import { client } from "../db/Client";

export async function getAllFoldersService() {
  const folders = await client.folder.findMany({
    where: { parentFolderId: null },
  });
  return folders;
}
export async function getSingleFolderService(folderId: string) {
  const folder = await client.folder.findUnique({
    where: {
      id: folderId,
    },
    include: {
      subFolders: true,
    },
  });
  return folder;
}

export async function createFolderService({ name, parentFolderId }: { name: string; parentFolderId: string }) {
  const createdFolder = await client.folder.create({
    data: {
      name: name,
      parentFolderId: parentFolderId,
    },
  });
  return createdFolder;
}

export async function deleteFolderService(folderId: string) {
  const deleteFolder = await client.folder.delete({
    where: {
      id: folderId,
    },
  });
  return deleteFolder;
}
