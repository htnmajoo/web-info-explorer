
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { SearchParams } from '@/types/scraping';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  disabled?: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, disabled = false }) => {
  const [formData, setFormData] = useState<SearchParams>({
    url: '',
    keyword: '',
    username: '',
    password: '',
    additionalInstructions: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.url && formData.keyword) {
      onSearch(formData);
    }
  };

  const handleInputChange = (field: keyof SearchParams, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="url">Target Website URL *</Label>
        <Input
          id="url"
          type="url"
          placeholder="https://example.com"
          value={formData.url}
          onChange={(e) => handleInputChange('url', e.target.value)}
          required
          disabled={disabled}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="keyword">Search Keywords *</Label>
        <Input
          id="keyword"
          type="text"
          placeholder="Enter keywords to search for"
          value={formData.keyword}
          onChange={(e) => handleInputChange('keyword', e.target.value)}
          required
          disabled={disabled}
        />
      </div>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <h4 className="font-medium mb-3 text-blue-900">Login Credentials (Optional)</h4>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="username">Username/Email</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter username or email"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              disabled={disabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              disabled={disabled}
            />
          </div>
        </div>
      </Card>

      <div className="space-y-2">
        <Label htmlFor="instructions">Additional Instructions (Optional)</Label>
        <Textarea
          id="instructions"
          placeholder="Any specific instructions for the search process..."
          value={formData.additionalInstructions}
          onChange={(e) => handleInputChange('additionalInstructions', e.target.value)}
          disabled={disabled}
          rows={3}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700"
        disabled={disabled || !formData.url || !formData.keyword}
      >
        <Search className="mr-2 h-4 w-4" />
        {disabled ? 'Searching...' : 'Start Search'}
      </Button>
    </form>
  );
};
