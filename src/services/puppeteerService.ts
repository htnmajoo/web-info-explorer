
import { SearchParams, ScrapingData } from '@/types/scraping';

// Mock service for browser environment
// Real Puppeteer implementation should be on the server side
export class PuppeteerService {
  private browser: any = null;

  async initialize() {
    console.log('Mock Puppeteer service initialized');
    return true;
  }

  async scrapeWebsite(params: SearchParams, onProgress?: (progress: number) => void): Promise<ScrapingData[]> {
    console.log('Starting mock scraping with params:', params);
    
    // Simulate scraping process with progress updates
    onProgress?.(10);
    await this.delay(500);
    
    onProgress?.(30);
    await this.delay(500);
    
    onProgress?.(50);
    await this.delay(500);
    
    onProgress?.(70);
    await this.delay(500);
    
    onProgress?.(90);
    await this.delay(500);
    
    onProgress?.(100);
    
    // Generate mock data based on the search parameters
    const mockResults: ScrapingData[] = this.generateMockData(params);
    
    console.log('Mock scraping completed with results:', mockResults);
    return mockResults;
  }

  private generateMockData(params: SearchParams): ScrapingData[] {
    const baseResults = [
      {
        id: `${Date.now()}-1`,
        title: `Results for "${params.keyword}" - Professional Profile`,
        url: `${params.url}/profile/1`,
        description: `Professional profile containing information about ${params.keyword}. This person has extensive experience in the field and offers valuable insights.`,
        keyword: params.keyword,
        extractedText: `This is extracted text containing ${params.keyword} with relevant professional information, skills, and experience details.`,
        timestamp: new Date().toISOString()
      },
      {
        id: `${Date.now()}-2`,
        title: `${params.keyword} Expert - Senior Position`,
        url: `${params.url}/profile/2`,
        description: `Senior professional specializing in ${params.keyword} with over 10 years of experience in the industry.`,
        keyword: params.keyword,
        extractedText: `Detailed information about ${params.keyword} expertise, including technical skills, project management, and leadership experience.`,
        timestamp: new Date().toISOString()
      },
      {
        id: `${Date.now()}-3`,
        title: `${params.keyword} Consultant - Industry Leader`,
        url: `${params.url}/profile/3`,
        description: `Industry leader and consultant specializing in ${params.keyword} solutions for enterprise clients.`,
        keyword: params.keyword,
        extractedText: `Comprehensive profile showing ${params.keyword} consulting experience, client testimonials, and successful project implementations.`,
        timestamp: new Date().toISOString()
      },
      {
        id: `${Date.now()}-4`,
        title: `${params.keyword} Specialist - Innovation Focus`,
        url: `${params.url}/profile/4`,
        description: `Innovation-focused specialist working with cutting-edge ${params.keyword} technologies and methodologies.`,
        keyword: params.keyword,
        extractedText: `Advanced ${params.keyword} specialist with focus on innovation, research and development, and emerging technologies in the field.`,
        timestamp: new Date().toISOString()
      },
      {
        id: `${Date.now()}-5`,
        title: `${params.keyword} Manager - Team Leadership`,
        url: `${params.url}/profile/5`,
        description: `Experienced manager leading ${params.keyword} teams and driving strategic initiatives in large organizations.`,
        keyword: params.keyword,
        extractedText: `Leadership profile showcasing ${params.keyword} team management, strategic planning, and organizational development experience.`,
        timestamp: new Date().toISOString()
      }
    ];

    // Return 3-5 random results
    const numResults = Math.floor(Math.random() * 3) + 3;
    return baseResults.slice(0, numResults);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async close() {
    console.log('Mock Puppeteer service closed');
    this.browser = null;
  }
}

export const puppeteerService = new PuppeteerService();
