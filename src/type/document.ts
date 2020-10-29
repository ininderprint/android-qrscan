export interface IDocument {
  id?: string
  qrCode?: string
  name: string

  /** The userId which this document belongs to */
  userId?: string
  /** The user of userId */
  // user?: IUser // TODO: use selector
  /** The original File URL, might be with any extension */
  originalFileUrl?: string
  /** The file for print URL, usually is a PDF file */
  printFileUrl: string
  /** Download the PDF file, add the path here */
  localPrintableFilePath?: string
  /** Total pages of this document */
  totalPages: number
  createdAt?: Date
  updatedAt?: Date
  /** Virtual property, is this document valid? */
  isValid?: boolean
}

export interface IDocumentMetadata {
  bucket: string // 'ininder-ec666-test'
  contentType: string // 'application/pdf'
  crc32c: string // 'FZpBDA=='
  etag: string // 'CLKMmv+PqN8CEAE='
  generation: string // '1545093008229938'
  id: string // 'ininder-ec666-test/userDocuments/about-rules.md.pdf/1545093008229938'
  kind: string // 'storage#object'
  md5Hash: string // 'm1o8MKvJUJWPBe/4ZrIOBA=='
  mediaLink: string // 'https://www.googleapis.com/download/storage/v1/b/ininder-ec666-test/o/userDocuments%2Fabout-rules.md.pdf?generation=1545093008229938&alt=media'
  metageneration: string // '1'
  name: string // 'userDocuments/about-rules.md.pdf'
  selfLink: string // 'https://www.googleapis.com/storage/v1/b/ininder-ec666-test/o/userDocuments%2Fabout-rules.md.pdf'
  size: string // '119033'
  storageClass: string // 'REGIONAL'
  timeCreated: string // '2018-12-18T00:30:08.229Z'
  timeStorageClassUpdated: string // '2018-12-18T00:30:08.229Z'
  updated: string // '2018-12-18T00:30:08.229Z'
  userId: string // 'line:123123'
  signedUrl: string // https://storage.googleapis.com/ininder-ec666-test/userDocuments%2Fabo...
}

export interface IQRCode {
  orderId: string
}

export const EMPTY_DOCUMENT: IDocument = {
  id: '',
  qrCode: '',
  name: '',
  userId: '',
  originalFileUrl: '',
  printFileUrl: '',
  localPrintableFilePath: '',
  totalPages: 27,
  createdAt: new Date(),
  updatedAt: new Date(),
  // isValid: false,
}
