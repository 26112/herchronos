
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel 
} from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { usePeriod } from '@/providers/PeriodProvider';
import { Mood, Symptom } from '@/types/period';
import { toast } from '@/hooks/use-toast';

const moodOptions = [
  { value: 'happy', label: 'Happy', emoji: '😊' },
  { value: 'sad', label: 'Sad', emoji: '😔' },
  { value: 'irritated', label: 'Irritated', emoji: '😠' },
  { value: 'anxious', label: 'Anxious', emoji: '😰' },
  { value: 'energetic', label: 'Energetic', emoji: '✨' },
  { value: 'tired', label: 'Tired', emoji: '😴' },
  { value: 'emotional', label: 'Emotional', emoji: '😢' },
  { value: 'neutral', label: 'Neutral', emoji: '😐' },
];

const symptomOptions = [
  { value: 'cramps', label: 'Cramps' },
  { value: 'headache', label: 'Headache' },
  { value: 'bloating', label: 'Bloating' },
  { value: 'backPain', label: 'Back Pain' },
  { value: 'breastTenderness', label: 'Breast Tenderness' },
  { value: 'acne', label: 'Acne' },
  { value: 'fatigue', label: 'Fatigue' },
  { value: 'cravings', label: 'Cravings' },
  { value: 'nausea', label: 'Nausea' },
  { value: 'spotting', label: 'Spotting' },
  { value: 'insomnia', label: 'Insomnia' },
  { value: 'other', label: 'Other' },
];

const moodSchema = z.object({
  date: z.date(),
  type: z.enum(['happy', 'sad', 'irritated', 'anxious', 'energetic', 'tired', 'emotional', 'neutral']),
  intensity: z.number().min(1).max(3),
  notes: z.string().optional(),
});

const symptomSchema = z.object({
  date: z.date(),
  type: z.enum(['cramps', 'headache', 'bloating', 'backPain', 'breastTenderness', 'acne', 'fatigue', 'cravings', 'nausea', 'spotting', 'insomnia', 'other']),
  intensity: z.number().min(1).max(3),
  notes: z.string().optional(),
});

export const TrackerForm = () => {
  const { addMood, addSymptom } = usePeriod();
  const [activeTab, setActiveTab] = useState('mood');

  const moodForm = useForm<z.infer<typeof moodSchema>>({
    resolver: zodResolver(moodSchema),
    defaultValues: {
      date: new Date(),
      type: 'neutral',
      intensity: 2,
      notes: '',
    },
  });

  const symptomForm = useForm<z.infer<typeof symptomSchema>>({
    resolver: zodResolver(symptomSchema),
    defaultValues: {
      date: new Date(),
      type: 'cramps',
      intensity: 2,
      notes: '',
    },
  });

  const onMoodSubmit = (data: z.infer<typeof moodSchema>) => {
    addMood(data as Mood);
    toast({
      title: "Mood recorded",
      description: `You felt ${data.type} on ${format(data.date, 'MMMM do')}`,
    });
    moodForm.reset({ ...moodForm.getValues(), notes: '' });
  };

  const onSymptomSubmit = (data: z.infer<typeof symptomSchema>) => {
    addSymptom(data as Symptom);
    toast({
      title: "Symptom recorded",
      description: `You experienced ${data.type} on ${format(data.date, 'MMMM do')}`,
    });
    symptomForm.reset({ ...symptomForm.getValues(), notes: '' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-display">Track Today</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mood" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="mood">Mood</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mood">
            <Form {...moodForm}>
              <form onSubmit={moodForm.handleSubmit(onMoodSubmit)} className="space-y-4">
                <FormField
                  control={moodForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={moodForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How are you feeling?</FormLabel>
                      <div className="grid grid-cols-4 gap-2 py-2">
                        {moodOptions.map((mood) => (
                          <Button
                            type="button"
                            key={mood.value}
                            variant={field.value === mood.value ? "default" : "outline"}
                            className={cn(
                              "flex flex-col h-20 items-center justify-center gap-1",
                              field.value === mood.value && "border-2 border-periodpal-primary"
                            )}
                            onClick={() => field.onChange(mood.value)}
                          >
                            <span className="text-2xl">{mood.emoji}</span>
                            <span className="text-xs">{mood.label}</span>
                          </Button>
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={moodForm.control}
                  name="intensity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Intensity</FormLabel>
                      <FormControl>
                        <Slider
                          min={1}
                          max={3}
                          step={1}
                          defaultValue={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="py-4"
                        />
                      </FormControl>
                      <div className="flex justify-between text-xs text-muted-foreground pt-1">
                        <span>Mild</span>
                        <span>Moderate</span>
                        <span>Severe</span>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={moodForm.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add any notes about how you're feeling..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">Log Mood</Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="symptoms">
            <Form {...symptomForm}>
              <form onSubmit={symptomForm.handleSubmit(onSymptomSubmit)} className="space-y-4">
                <FormField
                  control={symptomForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={symptomForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Symptom</FormLabel>
                      <div className="grid grid-cols-3 gap-2 py-2">
                        {symptomOptions.map((symptom) => (
                          <Button
                            type="button"
                            key={symptom.value}
                            variant={field.value === symptom.value ? "default" : "outline"}
                            className={cn(
                              "h-12",
                              field.value === symptom.value && "border-2 border-periodpal-primary"
                            )}
                            onClick={() => field.onChange(symptom.value)}
                          >
                            {symptom.label}
                          </Button>
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={symptomForm.control}
                  name="intensity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Intensity</FormLabel>
                      <FormControl>
                        <Slider
                          min={1}
                          max={3}
                          step={1}
                          defaultValue={[field.value]}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="py-4"
                        />
                      </FormControl>
                      <div className="flex justify-between text-xs text-muted-foreground pt-1">
                        <span>Mild</span>
                        <span>Moderate</span>
                        <span>Severe</span>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={symptomForm.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add any notes about your symptoms..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">Log Symptom</Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
