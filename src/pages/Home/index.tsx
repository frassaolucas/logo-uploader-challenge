import { ImageUploader } from "../../components/ImageUploader";

import styles from './styles.module.scss';

export function Home() {
  return (
    <div className={styles.uploaderContainer}>
      <ImageUploader />
    </div>
  )
}