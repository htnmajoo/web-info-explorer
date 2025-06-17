
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrapingData } from '@/types/scraping';

interface DataTableProps {
  data: ScrapingData[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const openUrl = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="font-semibold">URL</TableHead>
              <TableHead className="font-semibold">Description</TableHead>
              <TableHead className="font-semibold">Keyword</TableHead>
              <TableHead className="font-semibold">Extracted Text</TableHead>
              <TableHead className="font-semibold">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <div className="max-w-xs">
                    {truncateText(item.title, 50)}
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="link"
                    onClick={() => openUrl(item.url)}
                    className="p-0 h-auto text-blue-600 hover:text-blue-800"
                  >
                    {truncateText(item.url, 30)}
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    {truncateText(item.description)}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {item.keyword}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="max-w-sm">
                    {truncateText(item.extractedText, 80)}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {formatDate(item.timestamp)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {data.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No results found. Start a search to see data here.</p>
        </Card>
      )}
    </div>
  );
};
