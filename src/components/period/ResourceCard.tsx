
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  image?: string;
  link?: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  category,
  image,
  link
}) => {
  const getCategoryColor = (category: string) => {
    const categories: Record<string, string> = {
      'Health': 'bg-green-100 text-green-800',
      'Wellness': 'bg-blue-100 text-blue-800',
      'Nutrition': 'bg-orange-100 text-orange-800',
      'Fitness': 'bg-purple-100 text-purple-800',
      'PCOS': 'bg-red-100 text-red-800',
      'Hygiene': 'bg-teal-100 text-teal-800',
      'Tips': 'bg-indigo-100 text-indigo-800',
      'Mental Health': 'bg-pink-100 text-pink-800',
    };
    
    return categories[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      {image && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className={getCategoryColor(category)}>
            {category}
          </Badge>
        </div>
        <CardTitle className="text-xl mt-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {/* Content can be added here if needed */}
      </CardContent>
      {link && (
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.open(link, '_blank')}
          >
            Read More
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
