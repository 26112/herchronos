
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

const mockResponses: Record<string, string> = {
  default: "I'm PeriodPal, your personal period assistant. I can help answer questions about menstrual health, cycle tracking, and more. How can I help you today?",
  greeting: "Hello! I'm here to help with any questions about your menstrual cycle, symptoms, or reproductive health.",
  period: "A typical menstrual cycle lasts 28 days, but can range from 21 to 35 days. The bleeding phase usually lasts 2-7 days. Everyone's cycle is unique!",
  pain: "Menstrual cramps are caused by your uterus contracting to help shed its lining. For relief, try a heating pad, gentle exercise, over-the-counter pain relievers, or relaxation techniques. If pain is severe, please consult your healthcare provider.",
  irregular: "Irregular periods can be caused by stress, weight changes, excessive exercise, hormonal imbalances, or conditions like PCOS. It's a good idea to track your cycle and discuss patterns with your healthcare provider.",
  pms: "PMS symptoms typically occur 1-2 weeks before your period and may include mood swings, tender breasts, food cravings, fatigue, irritability, and depression. Regular exercise, stress management, and a balanced diet may help reduce symptoms.",
  ovulation: "Ovulation usually occurs around day 14 of a 28-day cycle. Signs may include clear, stretchy cervical mucus, a slight rise in basal body temperature, mild pelvic pain, increased sex drive, and light spotting.",
  pcos: "PCOS (Polycystic Ovary Syndrome) symptoms include irregular periods, excess hair growth, acne, weight gain, and infertility. If you're experiencing these symptoms, please consult your doctor for proper diagnosis and treatment options.",
  pcod: "PCOD (Polycystic Ovarian Disease) is similar to PCOS and involves multiple cysts on the ovaries. Symptoms include irregular periods, excess hair growth, and acne. A doctor can provide proper diagnosis and treatment.",
  spotting: "Spotting between periods can be caused by hormonal birth control, implantation bleeding (if pregnant), hormonal imbalances, or infections. If spotting persists or is concerning, please consult your healthcare provider.",
  pregnancy: "Early signs of pregnancy may include a missed period, nausea, breast tenderness, fatigue, and frequent urination. If you think you might be pregnant, consider taking a home pregnancy test or consulting your healthcare provider.",
};

const getResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return mockResponses.greeting;
  } else if (lowerMessage.includes('period') || lowerMessage.includes('cycle')) {
    return mockResponses.period;
  } else if (lowerMessage.includes('pain') || lowerMessage.includes('cramp')) {
    return mockResponses.pain;
  } else if (lowerMessage.includes('irregular')) {
    return mockResponses.irregular;
  } else if (lowerMessage.includes('pms') || lowerMessage.includes('premenstrual')) {
    return mockResponses.pms;
  } else if (lowerMessage.includes('ovulat')) {
    return mockResponses.ovulation;
  } else if (lowerMessage.includes('pcos')) {
    return mockResponses.pcos;
  } else if (lowerMessage.includes('pcod')) {
    return mockResponses.pcod;
  } else if (lowerMessage.includes('spot') || lowerMessage.includes('bleed')) {
    return mockResponses.spotting;
  } else if (lowerMessage.includes('pregnan')) {
    return mockResponses.pregnancy;
  } else {
    return mockResponses.default;
  }
};

export const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm PeriodPal, your personal period health assistant. You can ask me questions about menstrual health, cycle tracking, symptoms, or reproductive wellness. How can I help you today?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollableArea = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollableArea) {
        scrollableArea.scrollTop = scrollableArea.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getResponse(input),
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-display">Ask PeriodPal</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-[calc(600px-8rem)]" ref={scrollAreaRef}>
          <div className="space-y-4 pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div className="flex items-start gap-3 max-w-[80%]">
                  {message.role === 'assistant' && (
                    <Avatar>
                      <AvatarFallback className="bg-periodpal-primary text-white">PP</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "rounded-lg p-3",
                      message.role === 'user'
                        ? "bg-periodpal-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <Avatar>
                      <AvatarFallback className="bg-gray-300">You</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3 max-w-[80%]">
                  <Avatar>
                    <AvatarFallback className="bg-periodpal-primary text-white">PP</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg p-3 bg-muted">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-pulse"></div>
                      <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-pulse delay-150"></div>
                      <div className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form
          className="flex w-full items-center space-x-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
