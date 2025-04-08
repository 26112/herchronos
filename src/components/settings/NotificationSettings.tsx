
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

const NotificationSettings = () => {
  const handleSaveNotifications = () => {
    toast({
      title: "Notification Preferences Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
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
  );
};

export default NotificationSettings;
