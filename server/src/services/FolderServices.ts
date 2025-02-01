import { client } from "../db/Client";

export async function getAllFoldersService() {
  const folders = await client.folder.findMany();
  return folders;
}
