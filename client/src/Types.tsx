import { z } from "zod";

export const subFolderSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  userId: z.string().uuid(),
  parentFolderId: z.string().optional(),
  updatedAt: z.string(),
  createdAt: z.string(),
});

export type subFolderData = z.infer<typeof subFolderSchema>;

export const folderSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  subFolders: z.array(subFolderSchema),
  userId: z.string().uuid(),
  parentFolderId: z.string().optional(),
  breadCrumbs: z.array(z.object({ id: z.string(), name: z.string() })),
  updatedAt: z.string(),
  createdAt: z.string(),
});

export type folderData = z.infer<typeof folderSchema>;
