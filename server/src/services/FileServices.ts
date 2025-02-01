import { client } from "../db/Client";

export async function getAllFilesService() {
  const files = await client.file.findMany();

  return files;
}

export async function createFileService({ name, folderId }: { name: string; folderId: string }) {
  const createdFile = await client.file.create({
    data: {
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
