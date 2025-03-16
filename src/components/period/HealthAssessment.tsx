
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// PCOS/PCOD symptoms
const pcosSymptoms = [
  { id: 'irregular', label: 'Irregular periods or missed periods' },
  { id: 'acne', label: 'Persistent acne on face, chest, or back' },
  { id: 'hair-growth', label: 'Excess hair growth on face, chin, or body' },
  { id: 'hair-loss', label: 'Hair thinning or hair loss from scalp' },
  { id: 'weight', label: 'Difficulty losing weight or unexplained weight gain' },
  { id: 'darkening', label: 'Darkening of skin in creases (neck, groin, under breasts)' },
  { id: 'mood', label: 'Mood changes, depression, or anxiety' },
  { id: 'fatigue', label: 'Chronic fatigue regardless of sleep' },
  { id: 'headaches', label: 'Frequent headaches or migraines' },
  { id: 'pelvic-pain', label: 'Pelvic pain not related to periods' },
];

// Severe period symptoms that might need medical attention
const severeSymptoms = [
  { id: 'heavy-bleeding', label: 'Extremely heavy bleeding (changing pad/tampon every hour)' },
  { id: 'prolonged', label: 'Periods lasting longer than 7 days' },
  { id: 'severe-pain', label: 'Severe pain that prevents daily activities' },
  { id: 'between-periods', label: 'Bleeding between periods' },
  { id: 'after-sex', label: 'Bleeding after sex' },
  { id: 'severe-fatigue', label: 'Extreme fatigue and weakness during periods' },
  { id: 'large-clots', label: 'Passing large blood clots (larger than a quarter)' },
  { id: 'anemia', label: 'Symptoms of anemia (dizziness, shortness of breath, pale skin)' },
];

export const HealthAssessment = () => {
  const [selectedPCOS, setSelectedPCOS] = useState<string[]>([]);
  const [selectedSevere, setSelectedSevere] = useState<string[]>([]);
  const [pcosResult, setPcosResult] = useState<string | null>(null);
  const [severeResult, setSevereResult] = useState<string | null>(null);

  const handlePCOSCheckboxChange = (id: string) => {
    setSelectedPCOS(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSevereCheckboxChange = (id: string) => {
    setSelectedSevere(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const evaluatePCOS = () => {
    const symptomCount = selectedPCOS.length;
    
    if (symptomCount === 0) {
      setPcosResult("No symptoms selected. Please select any symptoms you've been experiencing.");
    } else if (symptomCount >= 3) {
      setPcosResult("You have selected 3 or more symptoms associated with PCOS/PCOD. We recommend consulting with a healthcare provider for proper evaluation and diagnosis.");
      toast({
        title: "Health Assessment",
        description: "Based on your symptoms, we recommend consulting with a healthcare provider about PCOS/PCOD.",
        variant: "destructive",
      });
    } else {
      setPcosResult("You have selected fewer than 3 symptoms associated with PCOS/PCOD. While this doesn't necessarily indicate PCOS/PCOD, continue to monitor your symptoms and consult with a healthcare provider if you're concerned.");
    }
  };

  const evaluateSevere = () => {
    const symptomCount = selectedSevere.length;
    
    if (symptomCount === 0) {
      setSevereResult("No symptoms selected. Please select any symptoms you've been experiencing.");
    } else if (symptomCount >= 1) {
      setSevereResult("You have selected one or more symptoms that may require medical attention. We recommend consulting with a healthcare provider for evaluation.");
      toast({
        title: "Health Assessment",
        description: "Based on your symptoms, we recommend consulting with a healthcare provider soon.",
        variant: "destructive",
      });
    } else {
      setSevereResult("You haven't selected any severe symptoms. Continue to monitor your menstrual health.");
    }
  };

  const resetPCOS = () => {
    setSelectedPCOS([]);
    setPcosResult(null);
  };

  const resetSevere = () => {
    setSelectedSevere([]);
    setSevereResult(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-display">PCOS/PCOD Symptom Checker</CardTitle>
          <CardDescription>
            Select any symptoms you've been experiencing consistently over the past few months.
            This is not a diagnostic tool, but can help identify if you should seek medical advice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {pcosSymptoms.map(symptom => (
              <div key={symptom.id} className="flex items-start space-x-2">
                <Checkbox 
                  id={`pcos-${symptom.id}`} 
                  checked={selectedPCOS.includes(symptom.id)}
                  onCheckedChange={() => handlePCOSCheckboxChange(symptom.id)}
                />
                <Label 
                  htmlFor={`pcos-${symptom.id}`}
                  className="text-sm font-normal leading-tight"
                >
                  {symptom.label}
                </Label>
              </div>
            ))}
          </div>
          
          <div className="space-x-2">
            <Button onClick={evaluatePCOS}>Evaluate Symptoms</Button>
            <Button variant="outline" onClick={resetPCOS}>Reset</Button>
          </div>
          
          {pcosResult && (
            <div className={`mt-4 p-4 rounded-md ${selectedPCOS.length >= 3 ? 'bg-amber-50 border border-amber-200' : 'bg-blue-50 border border-blue-200'}`}>
              <div className="flex items-start space-x-2">
                {selectedPCOS.length >= 3 ? (
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                ) : (
                  <Check className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                )}
                <p className="text-sm">{pcosResult}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-display">Period Symptom Severity Check</CardTitle>
          <CardDescription>
            Select any severe period symptoms you've been experiencing. These may indicate a need for medical attention.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {severeSymptoms.map(symptom => (
              <div key={symptom.id} className="flex items-start space-x-2">
                <Checkbox 
                  id={`severe-${symptom.id}`} 
                  checked={selectedSevere.includes(symptom.id)}
                  onCheckedChange={() => handleSevereCheckboxChange(symptom.id)}
                />
                <Label 
                  htmlFor={`severe-${symptom.id}`}
                  className="text-sm font-normal leading-tight"
                >
                  {symptom.label}
                </Label>
              </div>
            ))}
          </div>
          
          <div className="space-x-2">
            <Button onClick={evaluateSevere}>Evaluate Symptoms</Button>
            <Button variant="outline" onClick={resetSevere}>Reset</Button>
          </div>
          
          {severeResult && (
            <div className={`mt-4 p-4 rounded-md ${selectedSevere.length >= 1 ? 'bg-amber-50 border border-amber-200' : 'bg-blue-50 border border-blue-200'}`}>
              <div className="flex items-start space-x-2">
                {selectedSevere.length >= 1 ? (
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                ) : (
                  <Check className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                )}
                <p className="text-sm">{severeResult}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
