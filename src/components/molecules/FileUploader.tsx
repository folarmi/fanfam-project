import React, { useState, type ChangeEvent } from "react";
import Typography from "../forms/Typography";
import circlePlus from "../../assets/icons/circlePlus.svg";

interface FileUploaderProps {
  maxSizeMB: number;
  acceptFormats: string[];
  onFileUpload: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  maxSizeMB,
  acceptFormats,
  onFileUpload,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (fileSizeMB > maxSizeMB) {
        setError(`File size exceeds ${maxSizeMB} MB`);
        setPreview(null);
        return;
      }

      if (fileExtension && !acceptFormats.includes(fileExtension)) {
        setError(
          `File format not supported! Please upload a ${acceptFormats.join(
            ", "
          )} file`
        );
        setPreview(null);
        return;
      }

      setError("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onFileUpload(file); // Call the onFileUpload callback with the file
    }
  };

  return (
    <div className="">
      <label htmlFor="dropzone-file" className="cursor-pointer">
        <div className="flex flex-col">
          {/* {preview ? (
            <Image
              src={preview}
              alt="Preview"
              width={128}
              height={128}
              className="object-cover"
            />
          ) : ( */}
          <div className="bg-grey_70/30 w-[140px] rounded-lg h-36 p-4 flex flex-col">
            <img src={circlePlus} alt="circlePlus" className="cursor-pointer" />
            <Typography variant="labelOne" className="mt-auto">
              Add to Story
            </Typography>
          </div>
          {/* )} */}
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept={acceptFormats.map((ext) => `.${ext}`).join(",")}
        />
      </label>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
};

export default FileUploader;
