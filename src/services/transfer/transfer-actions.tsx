import { Folder } from "@/lib/types";

export const startInstagramTransfer = async (
  folders: Folder[],
): Promise<any> => {
  const formData = new FormData();

  for (let i = 0; i < folders.length; i++) {
    const folder = folders[i];

    for (let j = 0; j < folder.files.length; j++) {
      const file = folder.files[j];
      console.log("file", file);
    }
  }

  // folders.forEach((file, index) => {
  //   formData.append(`file${index}`, file.files);
  // });

  // const response = await fetch("/api/upload/instagram", {
  //   method: "POST",
  //   body: formData,
  // });
};
