import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAllFileEntries = async (
  items: DataTransferItemList,
): Promise<FileSystemEntry[]> => {
  const files: FileSystemEntry[] = [];

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
      const fileEntry = entry as FileSystemEntry;
      files.push(fileEntry);
    } else if (entry?.isDirectory) {
      const dirEntry = entry as FileSystemDirectoryEntry;
      const reader = dirEntry.createReader();

      queue.push(...(await readAllDirectoryEntries(reader)));
    }
  }

  return files;
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
): Promise<any> => {
  try {
    return await new Promise((resolve, reject) => {
      reader.readEntries(resolve, reject);
    });
  } catch (err) {
    console.log("readEntriesPromise error", err);
  }
};
