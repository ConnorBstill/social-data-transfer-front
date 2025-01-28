import { Folder } from "@/lib/types";

export const startInstagramTransfer = async (
  folders: Folder[],
): Promise<any> => {
  const formData = new FormData();

  folders.forEach((file, index) => {
    formData.append(`file${index}`, file);
  });

  const response = await fetch("/api/upload/instagram", {
    method: "POST",
    body: formData,
  });
};
