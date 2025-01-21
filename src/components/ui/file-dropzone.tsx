"use client";

import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import React, { useRef, useState, type ChangeEvent } from "react";

import { getAllFileEntries } from "../../lib/utils";

declare module "react" {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    webkitdirectory?: string;
  }
}

interface Folder {
  name: string;
  files: File[];
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

    console.log("e.dataTransfer", e.dataTransfer.items);
    const items = e.dataTransfer?.items;

    const files = await getAllFileEntries(items);

    console.log("files", files);
  };

  const handleFileButtonUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("file CHANGE", e);
  };

  const renderDropZoneContent = () => {
    if (!uploadedFolders.length) {
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
            className={`cursor-pointer ${buttonVariants({ variant: "default" })}`}
          >
            <input
              onChange={handleFileButtonUpload}
              type="file"
              id="file-upload"
              className="hidden-input"
              webkitdirectory="true"
              multiple
            />
            Upload Files
          </label>
        </>
      );
    } else {
      return (
        <>
          <span>Uploaded file(s):</span>
          {uploadedFolders.map(({ name }) => (
            <span>{name}</span>
          ))}
        </>
      );
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`flex flex-col justify-between items-center bg-white/10 p-3 w-72 h-52 border-2 border-dashed ${dragCounter ? "border-primary" : "border-stone-500"} rounded-lg`}
    >
      {renderDropZoneContent()}
    </div>
  );
}
