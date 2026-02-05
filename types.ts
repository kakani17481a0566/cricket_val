
export interface ValentineDay {
  id: string;
  name: string;
  date: string;
  icon: string;
  message: string;
  color: string;
  quote: string;
}

export interface LoveLetterState {
  recipient: string;
  traits: string;
  tone: 'poetic' | 'funny' | 'deep' | 'casual';
  generatedContent: string;
  loading: boolean;
}
