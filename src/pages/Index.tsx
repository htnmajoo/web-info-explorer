
import React, { useState } from 'react';
import { SearchForm } from '@/components/SearchForm';
import { DataTable } from '@/components/DataTable';
import { StatusIndicator } from '@/components/StatusIndicator';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileExcel } from 'lucide-react';
import { exportToExcel } from '@/utils/exportUtils';
import { ScrapingData, SearchParams, ScrapingStatus } from '@/types/scraping';

const Index = () => {
  const [scrapingData, setScrapingData] = useState<ScrapingData[]>([]);
  const [status, setStatus] = useState<ScrapingStatus>('idle');
  const [progress, setProgress] = useState(0);

  const handleSearch = async (params: SearchParams) => {
    setStatus('processing');
    setProgress(0);
    setScrapingData([]);

    // Simulate the scraping process with progress updates
    const steps = [
      'Connecting to website...',
      'Loading page content...',
      'Authenticating (if needed)...',
      'Searching for keywords...',
      'Extracting data...',
      'Processing results...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(((i + 1) / steps.length) * 100);
    }

    // Simulate extracted data
    const mockData: ScrapingData[] = [
      {
        id: '1',
        title: 'Example Article 1',
        url: 'https://example.com/article1',
        description: 'This is a sample description containing the keyword.',
        keyword: params.keyword,
        extractedText: 'Sample extracted text from the webpage...',
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Example Article 2',
        url: 'https://example.com/article2',
        description: 'Another sample description with relevant content.',
        keyword: params.keyword,
        extractedText: 'More sample text extracted from another page...',
        timestamp: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Example Resource 3',
        url: 'https://example.com/resource3',
        description: 'Third example showing keyword relevance.',
        keyword: params.keyword,
        extractedText: 'Additional extracted content for demonstration...',
        timestamp: new Date().toISOString(),
      }
    ];

    setScrapingData(mockData);
    setStatus('completed');
  };

  const handleExport = () => {
    if (scrapingData.length > 0) {
      exportToExcel(scrapingData, `web-scraping-results-${new Date().toISOString().split('T')[0]}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Web Information Explorer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Extract and analyze information from websites using advanced search capabilities
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Search Configuration</h2>
              <SearchForm onSearch={handleSearch} disabled={status === 'processing'} />
            </Card>

            {status !== 'idle' && (
              <Card className="p-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">Status</h3>
                <StatusIndicator status={status} progress={progress} />
              </Card>
            )}
          </div>

          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Search Results</h2>
                {scrapingData.length > 0 && (
                  <Button 
                    onClick={handleExport}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <FileExcel className="mr-2 h-4 w-4" />
                    Export to Excel
                  </Button>
                )}
              </div>
              
              {scrapingData.length > 0 ? (
                <DataTable data={scrapingData} />
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">No data available</p>
                  <p>Configure your search parameters and click "Start Search" to begin</p>
                </div>
              )}
            </Card>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">How it works:</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold">Configure Search</h4>
              <p className="text-gray-600 text-sm">Enter target URL, keywords, and login credentials if needed</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="font-bold text-green-600">2</span>
              </div>
              <h4 className="font-semibold">Extract Data</h4>
              <p className="text-gray-600 text-sm">Our system navigates and searches the website automatically</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="font-bold text-purple-600">3</span>
              </div>
              <h4 className="font-semibold">Export Results</h4>
              <p className="text-gray-600 text-sm">View results in a table and export to Excel for further analysis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
