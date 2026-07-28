/**
 * Download service contract — prepare interface only.
 * Actual file download is deferred (browser / storage adapters later).
 */
export type DownloadRequest = {
  filename: string;
  mimeType: string;
  content: string;
};

export interface DownloadService {
  prepare(request: DownloadRequest): DownloadRequest;
  /** Future: trigger browser download. */
  download?(request: DownloadRequest): Promise<void>;
}

export class PrepareOnlyDownloadService implements DownloadService {
  prepare(request: DownloadRequest): DownloadRequest {
    return {
      filename: request.filename,
      mimeType: request.mimeType,
      content: request.content,
    };
  }
}

export const downloadService: DownloadService =
  new PrepareOnlyDownloadService();
