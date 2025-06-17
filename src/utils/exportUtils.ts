
import { ScrapingData } from '@/types/scraping';

export const exportToExcel = (data: ScrapingData[], filename: string) => {
  // Create CSV content from the data
  const headers = ['Title', 'URL', 'Description', 'Keyword', 'Extracted Text', 'Timestamp'];
  const csvContent = [
    headers.join(','),
    ...data.map(item => [
      `"${item.title.replace(/"/g, '""')}"`,
      `"${item.url.replace(/"/g, '""')}"`,
      `"${item.description.replace(/"/g, '""')}"`,
      `"${item.keyword.replace(/"/g, '""')}"`,
      `"${item.extractedText.replace(/"/g, '""')}"`,
      `"${new Date(item.timestamp).toLocaleString().replace(/"/g, '""')}"`
    ].join(','))
  ].join('\n');

  // Create and download the file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
