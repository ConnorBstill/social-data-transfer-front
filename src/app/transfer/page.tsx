import FileDropzone from "../../components/ui/file-dropzone";

export default function TransferPage() {
  return (
    <main className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex justify-center items-center w-1/2 h-1/2">
        <FileDropzone></FileDropzone>
      </div>
    </main>
  );
}
