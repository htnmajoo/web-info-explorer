
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ExternalLink, Clock, Globe } from 'lucide-react';
import { ScrapingData } from '@/types/scraping';

interface DataTableProps {
  data: ScrapingData[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const openUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full">
      {data.length > 0 && (
        <div className="mb-4 flex items-center justify-between bg-gray-50 px-4 py-3 rounded-t-lg border-b">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-gray-700">Found {data.length} results</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Last updated: {formatDate(data[0]?.timestamp || new Date().toISOString())}</span>
          </div>
        </div>
      )}
      
      <div className="rounded-md border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-gray-800 w-1/5">Title</TableHead>
              <TableHead className="font-semibold text-gray-800 w-1/6">URL</TableHead>
              <TableHead className="font-semibold text-gray-800 w-1/4">Description</TableHead>
              <TableHead className="font-semibold text-gray-800 w-1/12">Keyword</TableHead>
              <TableHead className="font-semibold text-gray-800 w-1/4">Extracted Text</TableHead>
              <TableHead className="font-semibold text-gray-800 w-1/8">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.id} className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <TableCell className="font-medium">
                  <div className="max-w-xs">
                    <p className="font-semibold text-gray-900 text-sm leading-tight">
                      {truncateText(item.title, 60)}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openUrl(item.url)}
                    className="p-1 h-auto text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                  >
                    <ExternalLink className="mr-1 h-3 w-3" />
                    <span className="text-xs">{truncateText(item.url, 25)}</span>
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {truncateText(item.description, 120)}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 font-medium text-xs">
                    {item.keyword}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="max-w-sm">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {truncateText(item.extractedText, 100)}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(item.timestamp)}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {data.length === 0 && (
        <Card className="p-12 text-center border-dashed border-2 border-gray-300">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-lg font-medium text-gray-700 mb-2">No results found</p>
            <p className="text-gray-500 text-sm">Start a search to see extracted data here. Configure your search parameters and click "Start Search" to begin.</p>
          </div>
        </Card>
      )}
    </div>
  );
};
