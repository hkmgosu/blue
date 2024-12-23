import { Injectable } from '@nestjs/common';
import { IFileStorageService } from '../../src/commons/interfaces/service/IFileStorageService.interface';

@Injectable()
export class S3Service implements IFileStorageService {
  async GetUrlPath(key: string): Promise<string> {
    return `https://store-s3/path/${key}`;
  }

  async UploadBase64File(file: string, path: string, filename: string) {
    return `${path}/${filename}`;
  }

  async UploadFile(
    buffer: Buffer,
    path: string,
    filename: string,
  ): Promise<string> {
    console.log(buffer, path, filename);
    return 'file';
  }
}
