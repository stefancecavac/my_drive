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

export const signUpSchema = z.object({
  email: z.string().nonempty({ message: "Please fill out this field" }),
  password: z.string().min(8, { message: "Password must be atleas 8 characters long" }),
});

export type SignUpData = z.infer<typeof signUpSchema>;

export const userDataSchema = z.object({
  id: z.string(),
  email: z.string(),
  rootId: z.string(),
  folders: z.array(folderSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UserData = z.infer<typeof userDataSchema>;
