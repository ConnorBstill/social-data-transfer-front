import { post } from "../http-service";
import { Folder } from "@/lib/types";

export const startInstagramTransfer = async (
  folders: Folder[],
): Promise<any> => {
  const formData = new FormData();

  for (let i = 0; i < folders.length; i++) {
    const folder = folders[i];

    for (let j = 0; j < folder.files.length; j++) {
      const file = folder.files[j];

      formData.append(file.name, file as Blob);
    }
  }

  const response = await post("/api/upload/instagram", formData);

  return await response.json();
};
