"use client";

import React, { useRef, useState, type ChangeEvent } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { CircleX, X } from "lucide-react";

import { getAllFileEntries } from "../../lib/utils";

declare module "react" {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    webkitdirectory?: string;
  }
}

interface Folder {
  name: string;
  files: FileSystemEntry[];
}

export default function FileDropzone() {
  const [dragCounter, setDragCounter] = useState(0);
  const [uploadedFolders, setUploadedFolders] = useState<Folder[]>([]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setDragCounter((prevVal) => prevVal + 1);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setDragCounter((prevVal) => prevVal - 1);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setDragCounter(0);

    if (uploadedFolders.length < 2) {
      const items = e.dataTransfer?.items;
      const files = await getAllFileEntries(items);

      setUploadedFolders((prevFolders) => {
        return [
          ...prevFolders,
          { name: files[0].fullPath.split("/")[1], files },
        ];
      });

      console.log("files", files);
    }
  };

  const handleFileButtonUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("file CHANGE", e);
  };

  const handleRemoveFilesClick = (index: number) => {
    console.log(index, uploadedFolders);
    setUploadedFolders((prevFolders) => {
      const copy = [...prevFolders];
      copy.splice(index, 1);

      return copy;
    });
  };

  const renderUploadedFiles = () => {
    return uploadedFolders.map(({ name }, i) => {
      return (
        <li
          key={`${i}${name}`}
          className="flex flex-row w-full justify-between"
        >
          <span className="font-bold">{name}</span>
          <X
            onClick={() => handleRemoveFilesClick(i)}
            className="cursor-pointer"
            size={20}
          />
        </li>
      );
    });
  };

  const renderDropZoneContent = () => {
    return (
      <>
        <span onDragEnter={handleDragEnter} onDragOver={handleDragOver}>
          Drag and Drop
        </span>

        <span onDragEnter={handleDragEnter} onDragOver={handleDragOver}>
          or
        </span>

        <label
          htmlFor="file-upload"
          aria-disabled={uploadedFolders.length === 2}
          className={`
            cursor-pointer 
            ${buttonVariants({ variant: "default" })}
            ${uploadedFolders.length === 2 ? "pointer-events-none opacity-50" : ""}
          `}
        >
          <input
            onChange={handleFileButtonUpload}
            type="file"
            id="file-upload"
            className="hidden-input"
            webkitdirectory="true"
            disabled={uploadedFolders.length === 2}
          />
          Upload Files
        </label>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`flex flex-col justify-between items-center mb-24 bg-white/10 p-3 w-72 h-52 border-2 border-dashed ${dragCounter && uploadedFolders.length < 2 ? "border-primary" : "border-stone-500"} rounded-lg`}
      >
        {renderDropZoneContent()}
      </div>

      <div className="w-72">
        <h1 className="mb-5">Files Uploaded:</h1>

        <ul>{renderUploadedFiles()}</ul>
      </div>
    </div>
  );
}
