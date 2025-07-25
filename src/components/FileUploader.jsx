import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = ({ onUploadComplete, error }) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(acceptedFiles);

      const formattedFiles = acceptedFiles.map((file) => ({
        file,
        name: file.name,
        type: file.type,
      }));

      onUploadComplete(formattedFiles);
    },
    [onUploadComplete]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="flex mb-6 items-center justify-between">
      <div className="flex sm:items-center flex-col  sm:flex-row">
        <h3 className="text-lg sm:text-xl fontSB sm:fontBold mb-4">
          파일 업로드
        </h3>
        <div
          {...getRootProps()}
          className="border px-5 py-2 border-gray-300 rounded-md cursor-pointer bg-white max-w-sm"
        >
          <input {...getInputProps()} />
          {files.length > 0 ? (
            <ul className="text-sm text-gray-700">
              {files.map((file, index) => (
                <li key={index}>
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">
              <span className="fontBold underline mr-4">파일선택</span>
              또는 여기로 파일을 끌어오세요.
            </p>
          )}
        </div>
      </div>

      {/* 오류 메시지 */}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default FileUploader;
