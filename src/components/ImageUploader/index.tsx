import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { ImageUploaded } from "../ImageUploaded";

import styles from './styles.module.scss';

import imgIcon from '../../assets/img-icon.svg';
import closeIcon from '../../assets/close-icon.svg';
import alertIcon from '../../assets/alert-icon.svg';

type SelectedFileProps = {
  url?: string;
  width?: number;
}

export function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState<SelectedFileProps>({ width: 100 });
  const [hasError, setHasError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length === 0) {
        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file);

        setSelectedFile({
          ...selectedFile,
          url: fileUrl,
        });
      } else {
        setHasError(true);
      }

      setIsUploading(true);
    },
    [selectedFile]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  function handleResetUpload() {
    setIsUploading(false);
    setHasError(false);
    setSelectedFile({
      ...selectedFile,
      url: '',
    });
  }

  function handleSize(width: number) {
    setSelectedFile({
      ...selectedFile,
      width,
    })
  }

  function handleSaveImageCrop() {
    setIsUploading(false);
  }

  return (
    <>
      {!isUploading ? (
        // dropzone
        <div className={styles.uploader} {...getRootProps()}>
          <input {...getInputProps()} accept="image/*" />

          {selectedFile.url && (
            <ImageUploaded selectedFile={selectedFile} />
          )}

          <div className={styles.dropzoneText}>
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
        </div>
      ) : isUploading && hasError ? (
        // error
        <div className={styles.error}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleResetUpload}
          >
            <img src={closeIcon} alt="close" />
          </button>

          <div className={styles.errorImage}>
            <img src={alertIcon} alt="Error" />
          </div>

          <div className={styles.errorAction}>
            <p>Sorry, the upload failed.</p>

            <button type="button" onClick={handleResetUpload}>
              Try again
              </button>
          </div>
        </div>
      ) : isUploading && !hasError ? (
        // resize
        <div className={styles.resizeImage}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleResetUpload}
          >
            <img src={closeIcon} alt="close" />
          </button>

          <ImageUploaded selectedFile={selectedFile} />

          <div className={styles.resizeControls}>

            <span>Crop</span>

            <Slider
              min={50}
              max={350}
              value={selectedFile.width}
              onChange={handleSize}
              trackStyle={{
                backgroundColor: '#3F80FF',
                height: 2
              }}
              railStyle={{
                backgroundColor: '#B9D1FF',
                height: 2
              }}
              handleStyle={{
                width: 12,
                height: 12,
                backgroundColor: '#3F80FF',
                borderWidth: 0
              }}
            />

            <button
              type="button"
              onClick={handleSaveImageCrop}
            >
              Save
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}