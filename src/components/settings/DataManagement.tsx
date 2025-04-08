
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { usePeriod } from '@/providers/PeriodProvider';
import { toast } from '@/hooks/use-toast';
import { exportData, importData } from '@/services/databaseService';

const DataManagement = () => {
  const [importValue, setImportValue] = useState('');

  const handleExportData = async () => {
    const dataStr = await exportData();
    if (!dataStr) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data.",
        variant: "destructive",
      });
      return;
    }
    
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'herchronos-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Data Exported",
      description: "Your data has been exported successfully.",
    });
  };

  const handleImportData = async () => {
    if (!importValue.trim()) {
      toast({
        title: "Import Failed",
        description: "Please paste your data first.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const success = await importData(importValue);
      
      if (success) {
        toast({
          title: "Data Imported",
          description: "Your data has been imported successfully.",
        });
        setImportValue('');
        
        // Reload the page to refresh all components with the imported data
        setTimeout(() => window.location.reload(), 1500);
      } else {
        throw new Error("Import failed");
      }
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "Invalid data format. Please check your data and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Management</CardTitle>
        <CardDescription>
          Export or import your data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Export Data</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Download all your data to keep a backup or transfer to another device
          </p>
          <Button onClick={handleExportData}>Export Data</Button>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Import Data</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Paste your exported data below to restore your information
          </p>
          <Textarea 
            placeholder="Paste your exported data here..."
            className="min-h-[100px] mb-3"
            value={importValue}
            onChange={(e) => setImportValue(e.target.value)}
          />
          <Button onClick={handleImportData}>Import Data</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataManagement;
