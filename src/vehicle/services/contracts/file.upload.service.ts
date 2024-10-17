export abstract class FileUploadService {
  abstract uploadFileFromBuffer(
    file: Buffer,
    path?: string[],
    name?: string,
  ): Promise<string>;
  abstract getExtensionByMimeType(mime: string): string;
}
