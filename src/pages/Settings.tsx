
import React from 'react';
import { MainLayout } from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { usePeriod } from '@/providers/PeriodProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings = () => {
  const { userProfile, updateProfile } = usePeriod();

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
                
                <Button className="mt-4">Save Changes</Button>
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
                
                <Button className="mt-4">Save Preferences</Button>
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
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Toggle between light and dark themes
                    </p>
                  </div>
                  <Switch />
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
                
                <Button className="mt-4">Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
