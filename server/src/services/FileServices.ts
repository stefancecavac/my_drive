import { client } from "../db/Client";

export async function getAllFilesService() {
  const files = await client.file.findMany();

  return files;
}

export async function createFileService({ name, folderId, userId }: { name: string; folderId: string; userId: string }) {
  const createdFile = await client.file.create({
    data: {
      userId: userId,
      name: name,
      filePath: "",
      size: 20,
      extension: "",
      folderId: folderId,
    },
  });

  return createdFile;
}

export async function deleteFileService(fileId: string) {
  const deletedFile = await client.file.delete({
    where: {
      id: fileId,
    },
  });

  return deletedFile;
}
