import { useRef, useEffect, useCallback, FC, useState, DragEvent } from 'react';

import { Progress } from 'components/ui-bx/progress';
import MassiveFileLoadModal from 'components/new-shipping/layout/massive/massive-file-load-modal';
import styles from './upload-file.module.scss';

import {
  useMassiveInProgress,
  useMassiveInputFile,
  useMassiveProgress,
} from 'emission-lib/hooks/massive';

const UploadFile: FC = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const _contentRef = useRef<HTMLDivElement>(null);
  const [, setIsDragging] = useState(false);
  const [file, setFile] = useMassiveInputFile();
  const [showProgress, setShowProgress] = useMassiveInProgress();
  const [progress, setProgress] = useMassiveProgress();
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (progress >= 100) {
      const timeoutID = setTimeout(() => {
        setShowModal(true);
      }, 600);
      return () => clearInterval(timeoutID);
    }
  }, [setShowModal, progress]);

  const onToggleModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, []);

  const handleClickFile = (): void => {
    if (inputFileRef.current) {
      inputFileRef.current?.click();
    }
  };

  const handleSelectFile = (): void => {
    setShowProgress(true);
    if (file) {
      setProgress(0);
    }

    setFile(inputFileRef.current?.files![0]);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const curr = prevProgress + 20;
        if (curr >= 100) {
          clearInterval(interval);
        }
        return curr;
      });
    }, 100);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };
  const handleDragOut = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
  };
  const fileDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    if (file) {
      setProgress(0);
    }

    setShowProgress(true);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      e.dataTransfer.clearData();
      setFile(files[0]);

      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const curr = prevProgress + 20;
          if (curr >= 100) {
            clearInterval(interval);
          }
          return curr;
        });
      }, 100);
    }
  };

  const dragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  return (
    <div>
      <div
        className={styles.contentUploadFile}
        ref={_contentRef}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragOut}
        onDragOver={dragOver}
        onDrop={fileDrop}
        onClick={handleClickFile}
      >
        <form>
          <input
            ref={inputFileRef}
            className={styles.hide}
            type='file'
            id='massive-emission-file'
            onChange={handleSelectFile}
            accept='.csv,.xlsx,.xls'
          />
          <div className={styles.uploadIcon}>
            <svg width='34' height='33' viewBox='0 0 34 33' fill='none'>
              <path
                d='M21.0865 16.0643C21.2885 16.2596 21.5578 16.3507 21.8271 16.3507C22.1099 16.3507 22.3793 16.2466 22.5947 16.0382C22.9987 15.6345 22.9853 14.9834 22.5678 14.5797L17.7064 10.061C17.2889 9.67033 16.6291 9.68336 16.2251 10.074L11.5522 14.5927C11.1348 14.9964 11.1348 15.6475 11.5522 16.0512C11.9697 16.4549 12.643 16.4549 13.0605 16.0512L16.0096 13.1994V24.3594C16.0096 24.9324 16.4809 25.3882 17.0735 25.3882C17.666 25.3882 18.1373 24.9324 18.1373 24.3594V13.3035L21.0865 16.0643Z'
                fill='currentColor'
              />
              <path
                d='M28.9375 11.6367C28.1564 8.17277 25.1803 5.73761 21.5309 5.73761C20.871 5.73761 20.2246 5.82877 19.6052 5.99806C18.4336 3.19828 15.7672 1.38818 12.6565 1.38818C8.89931 1.38818 5.76162 4.08379 5.11523 7.74304C2.50273 8.84993 0.832886 11.22 0.832886 13.8635C0.832886 17.5879 4.17258 20.622 8.26639 20.622H12.2929C12.8854 20.622 13.3567 20.1663 13.3567 19.5933C13.3567 19.0203 12.8854 18.5645 12.2929 18.5645H8.26639C5.34416 18.5645 2.96059 16.4549 2.96059 13.8505C2.96059 11.9622 4.22644 10.2694 6.17908 9.51406C6.21948 9.50104 6.24642 9.475 6.27335 9.46198C6.73121 9.38384 7.08134 9.01922 7.1352 8.55042C7.418 5.63344 9.7881 3.43268 12.6565 3.43268C15.2016 3.43268 17.262 5.04743 17.9219 7.54771C18.07 8.09464 18.6491 8.43322 19.2146 8.28997C19.3089 8.26393 19.3897 8.23789 19.457 8.19882C19.4705 8.19882 19.4974 8.1858 19.5109 8.1858C20.1573 7.91233 20.8441 7.78211 21.5443 7.78211C24.4127 7.78211 26.7155 9.90473 26.9983 12.8217C27.0521 13.3556 27.51 13.7463 28.0487 13.7463C28.0756 13.7463 28.116 13.7463 28.1564 13.7463C28.2237 13.7463 28.2911 13.7203 28.3449 13.7072C28.3584 13.7072 28.3719 13.7072 28.3853 13.7072C28.52 13.6812 28.6681 13.6682 28.8028 13.6682C30.2033 13.6682 31.3345 14.762 31.3345 16.1163C31.3345 17.4707 30.2033 18.5645 28.8028 18.5645H21.6521C21.0596 18.5645 20.5882 19.0203 20.5882 19.5933C20.5882 20.1663 21.0596 20.622 21.6521 20.622H28.8028C31.3749 20.622 33.4622 18.6036 33.4622 16.1163C33.4622 13.6812 31.4422 11.7018 28.9375 11.6367Z'
                fill='currentColor'
              />
            </svg>
          </div>
        </form>
        <div className={styles.titleFileInfo}>
          Arrastra tu archivo o selecciona desde tu computadora
        </div>
      </div>
      {showProgress && (
        <div className={styles.contentProgress}>
          <div className={styles.progressContainer}>
            <Progress
              min={0}
              max={100}
              now={progress}
              variant='info'
              animated={true}
              label={`${progress > 100 ? 100 : progress}%`}
            />
          </div>
        </div>
      )}
      <MassiveFileLoadModal isOpen={showModal} toggle={onToggleModal} />
    </div>
  );
};

export default UploadFile;
