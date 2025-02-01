import { client } from "../db/Client";

export async function getAllFoldersService() {
  const folders = await client.folder.findMany({
    where: { parentFolderId: null },
  });
  return folders;
}
export async function getSingleFolderService(folderId: string) {
  async function getFolderWithSubfolder(folderId: string) {
    const folder = await client.folder.findUnique({
      where: {
        id: folderId,
      },
      include: {
        subFolders: true,
      },
    });

    if (!folder) return null;

    folder.subFolders = await Promise.all(
      folder.subFolders.map(async (folder) => {
        return (await getFolderWithSubfolder(folder.id))!;
      })
    );
    return folder;
  }

  const folder = getFolderWithSubfolder(folderId);

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
  async function deleteFolderAndSubfolders(folderId: string) {
    const folder = await client.folder.findUnique({
      where: {
        id: folderId,
      },
      include: {
        subFolders: true,
      },
    });

    if (!folder) return;

    await Promise.all(
      folder.subFolders.map((folder) => {
        return deleteFolderAndSubfolders(folder.id);
      })
    );

    await client.folder.delete({
      where: {
        id: folderId,
      },
    });
  }

  const deletedFolders = await deleteFolderAndSubfolders(folderId);

  return deletedFolders;
}
