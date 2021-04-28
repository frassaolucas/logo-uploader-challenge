import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

import styles from './styles.module.scss';

import imgIcon from '../../assets/img-icon.svg';
import closeIcon from '../../assets/close-icon.svg';

export function ImageUploader() {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length === 0) {
        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file);

        setSelectedFileUrl(fileUrl);
      } else {
        setHasError(true);
      }

      setIsUploading(true);
    },
    []
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'video/*',
  });

  return (
    <>
      {!isUploading ? (
        <div className={styles.uploader} {...getRootProps()}>
          <input {...getInputProps()} accept="image/*" />
          <p>
            <img src={imgIcon} alt="icon" />

            <strong>
              Organization Logo
          </strong>
          </p>

          <p>
            Drop the image here or click to browse.
          </p>

        </div>
      ) : isUploading && hasError ? (
        <div className={styles.error}>
          <button type="button" className={styles.closeBtn}>
            <img src={closeIcon} alt="close" />
          </button>
          error
        </div>
      ) : isUploading && !hasError ? (
        <div className={styles.resizeImage}>
          <div className={styles.uploadedImage}>
            <img src={selectedFileUrl} alt="Logo" width="100%" />
          </div>

          <div className={styles.resizeControls}>
            <button type="button">Save</button>
          </div>
        </div>
      ) : null}
    </>
  );
}