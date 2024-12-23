export const FILE_STORAGE_SERVICE = 'FILE_STORAGE_SERVICE';

export interface IFileStorageService {
  GetUrlPath(key: string): Promise<string>;
  UploadBase64File(
    file: string,
    path: string,
    filename: string,
  ): Promise<string>;
  UploadFile(buffer: Buffer, path: string, filename: string): Promise<string>;
}
