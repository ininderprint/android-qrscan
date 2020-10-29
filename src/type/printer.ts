export interface IPrinterFeatureColor {
  GRAYSCALE: boolean
  COLOR: boolean
}

export interface IPrinterFeatureOrientation {
  PORTRAIT: boolean
  LANDSCAPE: boolean
}

export interface IPrinterFeaturePaperSize {
  A4: boolean
}

export interface IPrinterFeatureSides {
  SINGLE_SIDED: boolean
  DOUBLE_SIDED: boolean
  DOUBLE_SIDED_LONG_EDGE: boolean
  DOUBLE_SIDED_SHORT_EDGE: boolean
}

interface IDefault<T> {
  default: T
}

export interface IPrinterFeatures {
  color: IPrinterFeatureColor & IDefault<keyof IPrinterFeatureColor>
  orientation: IPrinterFeatureOrientation & IDefault<keyof IPrinterFeatureOrientation>
  paperSize: IPrinterFeaturePaperSize & IDefault<keyof IPrinterFeaturePaperSize>
  sides: IPrinterFeatureSides & IDefault<keyof IPrinterFeatureSides>
}

export interface IPrintingPage {
  index: number
}

export interface IPrinter {
  id?: string
  name: string
  UUID?: string
  model?: string
  ip: string
  port: number
  path: string
  host: string
  status?: string
  uri?: string
  isPrimary?: boolean
  features?: IPrinterFeatures
  pagesPerMinute?: number
  pagesPerMinuteColor?: number
  available?: boolean
  /** Virtual */
  printing?: boolean
  /** Virtual */
  currentPrintConfig?: IPrintConfig
  /** Virtual */
  // printingJob: IPrinting
}

export const EMPTY_PRINTER: IPrinter = {
  name: '',
  UUID: '',
  model: '',
  status: undefined,
  ip: '',
  port: 631,
  path: '',
  host: '',
  // id: '',
  // uri: '',
  // isPrimary: false,
  features: {
    color: {
      GRAYSCALE: true,
      COLOR: true,
      default: 'GRAYSCALE',
    },
    orientation: {
      PORTRAIT: true,
      LANDSCAPE: true,
      default: 'PORTRAIT',
    },
    paperSize: {
      A4: true,
      default: 'A4',
    },
    sides: {
      SINGLE_SIDED: true,
      DOUBLE_SIDED: false,
      DOUBLE_SIDED_LONG_EDGE: false,
      DOUBLE_SIDED_SHORT_EDGE: false,
      default: 'SINGLE_SIDED',
    },
  },
  available: false,
  pagesPerMinute: 20,
  pagesPerMinuteColor: 5,
  printing: false,
  // printingJob: EMPTY_PRINTING,
}

import { IDocument, EMPTY_DOCUMENT } from './document';

export type IRangeMode = 'ALL' | 'CUSTOM'

export interface IPrintConfig {
  documentId: string
  /** The orderId this print job belongs to */
  orderId: string
  // ***** Print job config
  /** The color mode, grayscale, color etc */
  colorMode: keyof IPrinterFeatureColor
  /** Range mode, print all pages or custom range */
  rangeMode: IRangeMode
  /** 1-5, 8, 11-13 */
  pageRange: string
  /** Paper size of this print job */
  paperSize: keyof IPrinterFeaturePaperSize
  /** Print orientation of this print job */
  printOrientation: keyof IPrinterFeatureOrientation
  /** Number of print copies, Default to 1 */
  printCopies: number
  /** Number Up, single sheet multi-pages */
  numberUp: number
  sideMode: keyof IPrinterFeatureSides
  doubleSide: 'two-sided-long-edge' | 'two-sided-short-edge'
  /** Virtual property: How many pages needed to print */
  pageCount: number
  /** Virtual property: document */
  document?: IDocument
  /** Virtual property: printer */
  printer?: IPrinter
}

export const EMPTY_CONFIG: IPrintConfig = {
  documentId: '',
  orderId: '',
  colorMode: 'GRAYSCALE',
  rangeMode: 'ALL',
  pageRange: '1-27',
  pageCount: 1,
  paperSize: 'A4',
  printOrientation: 'PORTRAIT',
  printCopies: 1,
  numberUp: 1,
  sideMode: 'SINGLE_SIDED',
  doubleSide: 'two-sided-long-edge',
  document: EMPTY_DOCUMENT,
  printer: EMPTY_PRINTER,
}
