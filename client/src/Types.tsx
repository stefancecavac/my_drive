import { z } from "zod";

export type FolderData = {
  id: string;
  name: string;
  subFolders: FolderData[];
  userId: string;
  parentFolderId?: string;
  breadCrumbs: { id: string; name: string }[];
  updatedAt: string;
  createdAt: string;
};

export const folderSchema: z.ZodType<FolderData> = z.lazy(() =>
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    subFolders: z.array(folderSchema), // Recursively reference `folderSchema`
    userId: z.string().uuid(),
    parentFolderId: z.string().optional(),
    breadCrumbs: z.array(z.object({ id: z.string(), name: z.string() })),
    updatedAt: z.string(),
    createdAt: z.string(),
  })
);
