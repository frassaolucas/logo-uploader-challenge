import styles from './styles.module.scss';

type SelectedFile = {
  url?: string;
  width?: number;
}

type ImageUploadedProps = {
  selectedFile: SelectedFile;
}

export function ImageUploaded({ selectedFile }: ImageUploadedProps) {
  return (
    <div className={styles.uploadedImage}>
      <img src={selectedFile.url} alt="Logo" width={`${selectedFile.width}%`} />
    </div>
  );
}