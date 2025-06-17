
export interface SearchParams {
  url: string;
  keyword: string;
  username?: string;
  password?: string;
  additionalInstructions?: string;
}

export interface ScrapingData {
  id: string;
  title: string;
  url: string;
  description: string;
  keyword: string;
  extractedText: string;
  timestamp: string;
}

export type ScrapingStatus = 'idle' | 'processing' | 'completed' | 'error';
