
import React, { useState } from 'react';
import { SearchForm } from '@/components/SearchForm';
import { DataTable } from '@/components/DataTable';
import { StatusIndicator } from '@/components/StatusIndicator';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { exportToExcel } from '@/utils/exportUtils';
import { puppeteerService } from '@/services/puppeteerService';
import { ScrapingData, SearchParams, ScrapingStatus } from '@/types/scraping';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [scrapingData, setScrapingData] = useState<ScrapingData[]>([]);
  const [status, setStatus] = useState<ScrapingStatus>('idle');
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleSearch = async (params: SearchParams) => {
    setStatus('processing');
    setProgress(0);
    setScrapingData([]);

    try {
      console.log('Starting search with params:', params);
      
      const results = await puppeteerService.scrapeWebsite(params, (progressValue) => {
        console.log('Progress update:', progressValue);
        setProgress(progressValue);
      });

      console.log('Search results:', results);
      setScrapingData(results);
      setStatus('completed');
      
      toast({
        title: "Search Completed",
        description: `Found ${results.length} results for "${params.keyword}"`,
      });
      
    } catch (error) {
      console.error('Search error:', error);
      setStatus('error');
      toast({
        title: "Search Failed",
        description: "An error occurred during the search process",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    if (scrapingData.length > 0) {
      exportToExcel(scrapingData, `web-scraping-results-${new Date().toISOString().split('T')[0]}`);
      toast({
        title: "Export Successful",
        description: "Data has been exported to Excel file",
      });
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
          <div className="mt-4 p-3 bg-amber-100 border border-amber-300 rounded-lg text-amber-800 text-sm max-w-md mx-auto">
            <strong>Local Server Mode:</strong> Optimized for VPS/Local deployment with Puppeteer support
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card className="p-6 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Search Configuration</h2>
              <SearchForm onSearch={handleSearch} disabled={status === 'processing'} />
            </Card>

            {status !== 'idle' && (
              <Card className="p-6 mt-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Status</h3>
                <StatusIndicator status={status} progress={progress} />
              </Card>
            )}
          </div>

          <div className="lg:col-span-2">
            <Card className="p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Search Results</h2>
                {scrapingData.length > 0 && (
                  <Button 
                    onClick={handleExport}
                    className="bg-green-600 hover:bg-green-700 shadow-md"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export to Excel
                  </Button>
                )}
              </div>
              
              {scrapingData.length > 0 ? (
                <div className="bg-white rounded-lg border shadow-sm">
                  <DataTable data={scrapingData} />
                </div>
              ) : (
                <div className="text-center py-16 text-gray-500 bg-white rounded-lg border">
                  <div className="max-w-md mx-auto">
                    <div className="mb-4">
                      <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Download className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-lg font-medium text-gray-700">No data available</p>
                      <p className="text-sm text-gray-500 mt-2">Configure your search parameters and click "Start Search" to begin extracting data</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg p-8 shadow-lg border">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">How it works:</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-blue-600 text-xl">1</span>
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-800">Configure Search</h4>
              <p className="text-gray-600">Enter target URL, keywords, and login credentials if needed</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-green-600 text-xl">2</span>
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-800">Extract Data</h4>
              <p className="text-gray-600">Our system navigates and searches the website automatically using stealth mode</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-purple-600 text-xl">3</span>
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-800">Export Results</h4>
              <p className="text-gray-600">View results in a professional table and export to Excel for analysis</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-2">LinkedIn & Protected Sites Support</h4>
          <p className="text-blue-800 text-sm">This application uses advanced stealth techniques to access protected websites including LinkedIn. Login credentials can be provided for authenticated access.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
