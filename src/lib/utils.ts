import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAllFileEntries = async (
  items: DataTransferItemList,
): Promise<{ files: File[]; bytes: number }> => {
  const files: File[] = [];
  let bytes = 0;

  const queue: (FileSystemEntry | FileSystemDirectoryEntry)[] = [];

  for (let i = 0; i < items.length; i++) {
    const item: DataTransferItem = items[i];

    if (item) {
      queue.push(item.webkitGetAsEntry()!);
    }
  }

  while (queue.length) {
    const entry = queue.shift();

    if (entry?.isFile) {
      const fileEntry = entry as FileSystemFileEntry;

      const file: File = await new Promise((resolve, reject) => {
        fileEntry.file(
          (f: File) => {
            resolve(f);
          },
          (err) => {
            console.error("error converting entry to file", err);
            reject("error converting entry to file");
          },
        );
      });

      if (file.type === "video/mp4") {
        const videoLength = await getVideoLength(file);

        if (videoLength < 60) {
          bytes += file.size;
          files.push(file);
        }
      }
    } else if (entry?.isDirectory) {
      const dirEntry = entry as FileSystemDirectoryEntry;
      const reader = dirEntry.createReader();

      queue.push(...(await readAllDirectoryEntries(reader)));
    }
  }

  return { files, bytes };
};

const readAllDirectoryEntries = async (reader: FileSystemDirectoryReader) => {
  const entries: FileSystemEntry[] = [];

  let readEntries: FileSystemEntry[] = await readEntriesPromise(reader);

  while (readEntries.length) {
    entries.push(...readEntries);

    readEntries = await readEntriesPromise(reader);
  }

  return entries;
};

const readEntriesPromise = async (
  reader: FileSystemDirectoryReader,
): Promise<FileSystemEntry[]> => {
  try {
    return await new Promise((resolve, reject) => {
      reader.readEntries(resolve, reject);
    });
  } catch (err) {
    console.log("readEntriesPromise error", err);
  }
};

const getVideoLength = async (video: File): Promise<number> => {
  const header = Buffer.from("mvhd");
  const videoArrayBuffer = await video.arrayBuffer();
  const videoBuffer = Buffer.from(videoArrayBuffer);

  const videoStart = videoBuffer.indexOf(header) + 17;
  const timeScale = videoBuffer.readUInt32BE(videoStart);
  const duration = videoBuffer.readUInt32BE(videoStart + 4);

  const videoLength = Math.floor(duration / timeScale);

  return videoLength;
};

export const bytesToMegs = (bytes: number) => {
  return Math.floor(bytes / 1024 / 1024);
};
