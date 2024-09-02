"use client";

import { FC, MouseEvent } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: FC<Props> = ({ onChange, value }) => {
  return (
    <CldUploadWidget
      onSuccess={(results: any) => onChange(results.info.secure_url)}
      uploadPreset="rof1yev-airbnb"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
          e.preventDefault();
          open();
        };
        return (
          <div
            onClick={handleOnClick}
            className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-200 flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w--full h-full">
                <Image
                  src={value}
                  alt="Upload"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
