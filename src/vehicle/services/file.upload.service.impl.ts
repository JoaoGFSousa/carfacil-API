import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import { FileUploadService } from './contracts/file.upload.service';

@Injectable()
export class FileUploadServiceImpl implements FileUploadService {
  constructor() {}

  async uploadFileFromBuffer(
    file: Buffer,
    path?: string[],
    name?: string,
  ): Promise<string> {
    const filePath = path ? path.join('/') : 'public/storage';
    const filename = name ?? randomUUID();
    const storagePath = `${filePath}/${filename}`;

    await mkdir(filePath, { recursive: true });
    await writeFile(storagePath, file);

    return storagePath;
  }
  getExtensionByMimeType(mime: string): string {
    if (mime.indexOf(';') === -1) return mime.split('/')[1];

    return mime.split(';')[0].split('/')[1];
  }
}
