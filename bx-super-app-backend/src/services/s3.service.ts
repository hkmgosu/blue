import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { IFileStorageService } from '../commons/interfaces/service/IFileStorageService.interface';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service implements IFileStorageService {
  s3Instance: S3Client;
  constructor(private readonly configService: ConfigService) {
    this.s3Instance = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async GetUrlPath(key: string): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Key: key,
      });

      const url = await getSignedUrl(this.s3Instance, command, {
        expiresIn: 3600,
      });
      return url;
    } catch {
      return null;
    }
  }

  async UploadBase64File(file: string, path: string, filename: string) {
    const extension = this.getFileExtension(file);
    return this.UploadFile(
      Buffer.from(file.substring(file.indexOf(',') + 1), 'base64'),
      path,
      `${filename}.${extension}`,
    );
  }

  async UploadFile(
    buffer: Buffer,
    path: string,
    filename: string,
  ): Promise<string> {
    const fileKey = this.getFilePathKey(path, filename);
    const putObjectCommand = new PutObjectCommand({
      ContentEncoding: 'base64',
      ContentType: `image/${filename.substring(filename.indexOf('.') + 1)}`,
      Body: buffer,
      Key: fileKey,
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
    });
    const uploadResult = await this.s3Instance.send(putObjectCommand);
    return uploadResult.$metadata.httpStatusCode < 300 ? fileKey : null;
  }
  private getFilePathKey(path: string, filename: string) {
    return `${path}/${filename}`;
  }
  private getFileExtension(data: string): string {
    const lowerCase = data.toLocaleLowerCase();
    let extension = '';
    if (lowerCase.indexOf('png') !== -1) extension = 'png';
    else if (
      lowerCase.indexOf('jpg') !== -1 ||
      lowerCase.indexOf('jpeg') !== -1
    )
      extension = 'jpg';
    else extension = 'tiff';
    return extension;
  }
}
