import path from "path";
import { client } from "../db/Client";
import fs from "fs";

export async function getCurrentFolderService({ folderId }: { folderId: string }) {
  const folder = await client.folder.findUnique({
    where: {
      id: folderId,
    },
    include: {
      subFolders: true,
      files: true,
    },
  });

  let breadCrumbs = [];
  let currentId = folderId;

  while (currentId) {
    const parent = await client.folder.findUnique({
      where: {
        id: currentId,
      },
    });
    if (!parent) break;

    breadCrumbs.unshift({ id: parent.id, name: parent.name });
    currentId = parent.parentFolderId!;
  }

  return { ...folder, breadCrumbs };
}

export async function createFolderService({ name, parentFolderId, userId }: { name: string; parentFolderId: string; userId: string }) {
  const createdFolder = await client.folder.create({
    data: {
      userId: userId,
      name: name,
      parentFolderId: parentFolderId,
    },
  });

  let folderPath = path.join("..", "server", "uploads", userId);

  if (parentFolderId) {
    let currentFolderId: string | null = parentFolderId;
    const folderIds: string[] = [];

    while (currentFolderId) {
      const parentFolder: { id: string; parentFolderId: string | null } | null = await client.folder.findUnique({
        where: { id: currentFolderId },
        select: { parentFolderId: true, id: true },
      });

      if (!parentFolder) break;

      folderIds.unshift(parentFolder.id.toString());

      currentFolderId = parentFolder.parentFolderId;
    }

    folderPath = path.join(folderPath, ...folderIds);
  }

  folderPath = path.join(folderPath, createdFolder.id.toString());

  await fs.promises.mkdir(folderPath, { recursive: true });
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
        files: true,
      },
    });

    if (!folder) return;

    await Promise.all(
      folder.files.map((file) => {
        return client.file.delete({
          where: {
            id: file.id,
          },
        });
      })
    );

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
