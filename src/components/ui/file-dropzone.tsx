"use client"

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { buttonVariants } from "@/components/ui/button";
import React, { useState } from "react";

export default function FileDropzone() {
  const [borderColor, setBorderColor] = useState('border-stone-500');

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setBorderColor('border-primary')
    console.log('handleDragEnter', e)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setBorderColor('border-stone-500')
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
      className={`flex flex-col justify-between items-center bg-white/10 p-3 w-72 h-52 border-2 border-dashed ${borderColor} rounded-lg`}>
        <span>Drag and Drop</span>
        <span>or</span>
        <Button>Upload Files</Button>
    </div>
  );
}
