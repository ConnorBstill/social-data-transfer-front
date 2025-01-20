"use client"

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { buttonVariants } from "@/components/ui/button";
import React, { useRef, useState } from "react";

export default function FileDropzone() {
  const [dragCounter, setDragCounter] = useState(0)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setDragCounter(prevVal => prevVal + 1);
    console.log('handleDragEnter', e)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setDragCounter(prevVal => prevVal - 1);
  }

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('drop', e.dataTransfer.files)
  }

  return (
    <div 
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDragDrop}
      className={
        `flex flex-col justify-between items-center bg-white/10 p-3 w-72 h-52 border-2 border-dashed ${dragCounter ? 'border-primary' : 'border-stone-500'} rounded-lg`
      }>
        <span
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
        >
          Drag and Drop
        </span>

        <span 
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
        >
          or
        </span>

        <Button>Upload Files</Button>
    </div>
  );
}
