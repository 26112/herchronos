
import React from 'react';
import { usePeriod } from '@/providers/PeriodProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const ProfileSettings = () => {
  const { userProfile, updateProfile } = usePeriod();

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully.",
    });
  };

  return (
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
  );
};

export default ProfileSettings;
