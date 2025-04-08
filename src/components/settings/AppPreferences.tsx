
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/providers/ThemeProvider';
import { toast } from '@/hooks/use-toast';

const AppPreferences = () => {
  const { theme, toggleTheme } = useTheme();

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Updated",
      description: "Your app preferences have been saved successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>App Preferences</CardTitle>
        <CardDescription>
          Customize the app appearance and behavior
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Theme Mode</p>
            <p className="text-sm text-muted-foreground">
              Choose between light and dark theme
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="theme-toggle">
              {theme === 'light' ? 'Light' : 'Dark'}
            </Label>
            <Switch 
              id="theme-toggle" 
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Calendar Week Start</p>
            <p className="text-sm text-muted-foreground">
              Choose Sunday or Monday as first day
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="sunday">Sunday</Label>
            <Switch id="sunday" defaultChecked />
            <Label htmlFor="monday">Monday</Label>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Data Privacy</p>
            <p className="text-sm text-muted-foreground">
              Keep all data locally on device only
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <Button className="mt-4" onClick={handleSavePreferences}>Save Settings</Button>
      </CardContent>
    </Card>
  );
};

export default AppPreferences;
