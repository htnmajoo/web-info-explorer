
// Server-side Puppeteer implementation
// This file should be used in a Node.js server environment
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { SearchParams, ScrapingData } from '../src/types/scraping';

// Add stealth plugin for LinkedIn and other protected sites
puppeteer.use(StealthPlugin());

export class ServerPuppeteerService {
  private browser: any = null;

  async initialize() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu'
        ]
      });
    }
    return this.browser;
  }

  async scrapeWebsite(params: SearchParams, onProgress?: (progress: number) => void): Promise<ScrapingData[]> {
    const browser = await this.initialize();
    const page = await browser.newPage();
    
    try {
      onProgress?.(10);
      
      // Set user agent to avoid detection
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      onProgress?.(20);
      
      // Navigate to the target URL
      await page.goto(params.url, { waitUntil: 'networkidle2' });
      
      onProgress?.(30);
      
      // Handle login if credentials are provided
      if (params.username && params.password) {
        await this.handleLogin(page, params.username, params.password);
      }
      
      onProgress?.(50);
      
      // Search for keywords on the page
      const results = await this.searchForKeywords(page, params.keyword);
      
      onProgress?.(80);
      
      // Extract additional data based on the website type
      const scrapingData = await this.extractData(page, results, params.keyword);
      
      onProgress?.(100);
      
      return scrapingData;
      
    } catch (error) {
      console.error('Scraping error:', error);
      throw error;
    } finally {
      await page.close();
    }
  }

  private async handleLogin(page: any, username: string, password: string) {
    // Generic login handling - can be customized for specific sites
    try {
      // Look for common login form selectors
      const usernameSelectors = [
        'input[type="email"]',
        'input[name="username"]',
        'input[name="email"]',
        'input[id="username"]',
        'input[id="email"]'
      ];
      
      const passwordSelectors = [
        'input[type="password"]',
        'input[name="password"]',
        'input[id="password"]'
      ];
      
      // Try to find username field
      let usernameField = null;
      for (const selector of usernameSelectors) {
        try {
          await page.waitForSelector(selector, { timeout: 3000 });
          usernameField = await page.$(selector);
          if (usernameField) break;
        } catch (e) {
          // Continue to next selector
        }
      }
      
      // Try to find password field
      let passwordField = null;
      for (const selector of passwordSelectors) {
        try {
          passwordField = await page.$(selector);
          if (passwordField) break;
        } catch (e) {
          // Continue to next selector
        }
      }
      
      if (usernameField && passwordField) {
        await usernameField.type(username);
        await passwordField.type(password);
        
        // Look for submit button
        const submitSelectors = [
          'button[type="submit"]',
          'input[type="submit"]',
          'button:contains("Login")',
          'button:contains("Sign in")'
        ];
        
        for (const selector of submitSelectors) {
          try {
            const submitButton = await page.$(selector);
            if (submitButton) {
              await submitButton.click();
              await page.waitForNavigation({ waitUntil: 'networkidle2' });
              break;
            }
          } catch (e) {
            // Continue to next selector
          }
        }
      }
    } catch (error) {
      console.warn('Login failed:', error);
    }
  }

  private async searchForKeywords(page: any, keyword: string) {
    try {
      // Search for elements containing the keyword
      const results = await page.evaluate((searchKeyword: string) => {
        const elements = document.querySelectorAll('*');
        const matches: any[] = [];
        
        elements.forEach((el, index) => {
          const text = el.textContent || '';
          if (text.toLowerCase().includes(searchKeyword.toLowerCase()) && text.trim().length > 10) {
            matches.push({
              id: index,
              text: text.substring(0, 200),
              tagName: el.tagName,
              href: el.getAttribute('href') || '',
              title: el.getAttribute('title') || el.textContent?.substring(0, 100) || ''
            });
          }
        });
        
        return matches.slice(0, 10); // Limit to 10 results
      }, keyword);
      
      return results;
    } catch (error) {
      console.error('Keyword search failed:', error);
      return [];
    }
  }

  private async extractData(page: any, results: any[], keyword: string): Promise<ScrapingData[]> {
    const currentUrl = page.url();
    const pageTitle = await page.title();
    
    return results.map((result, index) => ({
      id: `${Date.now()}-${index}`,
      title: result.title || pageTitle || 'Untitled',
      url: result.href ? new URL(result.href, currentUrl).href : currentUrl,
      description: result.text.substring(0, 150) + '...',
      keyword: keyword,
      extractedText: result.text,
      timestamp: new Date().toISOString()
    }));
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

export const serverPuppeteerService = new ServerPuppeteerService();
