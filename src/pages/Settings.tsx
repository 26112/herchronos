
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { usePeriod } from '@/providers/PeriodProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/providers/ThemeProvider';
import { toast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';

const Settings = () => {
  const { userProfile, updateProfile, exportData, importData } = usePeriod();
  const { theme, toggleTheme } = useTheme();
  const [importValue, setImportValue] = useState('');

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Preferences Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Updated",
      description: "Your app preferences have been saved successfully.",
    });
  };

  const handleExportData = () => {
    const dataStr = exportData();
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

  const handleImportData = () => {
    if (!importValue.trim()) {
      toast({
        title: "Import Failed",
        description: "Please paste your data first.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const success = importData(importValue);
      
      if (success) {
        toast({
          title: "Data Imported",
          description: "Your data has been imported successfully.",
        });
        setImportValue('');
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
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-periodpal-primary mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground mb-6">
          Customize your PeriodPal experience and manage your account
        </p>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="data">Data Management</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Manage your personal information and cycle preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cycle-length">Average Cycle Length (days)</Label>
                  <Input 
                    id="cycle-length" 
                    type="number" 
                    defaultValue={userProfile.averageCycleLength} 
                    min={21} 
                    max={40}
                    onChange={(e) => updateProfile({ averageCycleLength: parseInt(e.target.value) })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="period-length">Average Period Length (days)</Label>
                  <Input 
                    id="period-length" 
                    type="number" 
                    defaultValue={userProfile.averagePeriodLength} 
                    min={2} 
                    max={10}
                    onChange={(e) => updateProfile({ averagePeriodLength: parseInt(e.target.value) })}
                  />
                </div>
                
                <Button className="mt-4" onClick={handleSaveProfile}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Customize how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Period Reminders</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified before your period starts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Ovulation Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Be notified during your fertile window
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Symptom Tracking Reminders</p>
                    <p className="text-sm text-muted-foreground">
                      Daily reminders to log your symptoms
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <Button className="mt-4" onClick={handleSaveNotifications}>Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
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
          </TabsContent>
          
          <TabsContent value="data">
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
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
