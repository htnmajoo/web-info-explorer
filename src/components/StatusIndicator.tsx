
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrapingStatus } from '@/types/scraping';

interface StatusIndicatorProps {
  status: ScrapingStatus;
  progress: number;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, progress }) => {
  const getStatusColor = (status: ScrapingStatus) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: ScrapingStatus) => {
    switch (status) {
      case 'processing':
        return 'Processing...';
      case 'completed':
        return 'Completed';
      case 'error':
        return 'Error';
      default:
        return 'Idle';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Status:</span>
        <Badge className={`${getStatusColor(status)} text-white`}>
          {getStatusText(status)}
        </Badge>
      </div>
      
      {status === 'processing' && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      )}
      
      {status === 'completed' && (
        <div className="text-sm text-green-600 font-medium">
          ✓ Search completed successfully
        </div>
      )}
      
      {status === 'error' && (
        <div className="text-sm text-red-600 font-medium">
          ✗ An error occurred during the search
        </div>
      )}
    </div>
  );
};
