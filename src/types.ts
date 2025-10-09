export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface GeminiConfig {
  apiKey: string;
  model: string;
}