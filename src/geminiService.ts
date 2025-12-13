import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { ragService } from './ragService';

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: GenerativeModel | null = null;
  private conversationHistory: Array<{ role: string; content: string }> = [];
  private useRAG: boolean = true;

  constructor() {
    this.initializeAPI();
    // Initialize RAG service in background
    this.initializeRAG();
  }

  private async initializeRAG() {
    try {
      await ragService.initialize();
      console.log('RAG service ready:', ragService.getStats());
    } catch (error) {
      console.error('RAG initialization error:', error);
    }
  }

  private initializeAPI() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('gemini_api_key') || '';
    
    if (apiKey) {
      try {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      } catch (error) {
        console.error('Failed to initialize Gemini API:', error);
        this.model = null;
      }
    }
  }

  async generateResponse(userMessage: string): Promise<string> {
    // Add user message to conversation history
    this.conversationHistory.push({
      role: 'user',
      content: userMessage
    });

    // Keep only last 10 messages to manage context
    if (this.conversationHistory.length > 10) {
      this.conversationHistory = this.conversationHistory.slice(-10);
    }

    if (!this.model) {
      return this.getFallbackResponse(userMessage);
    }

    try {
      let response: string;

      // Use RAG-enhanced generation if available
      if (this.useRAG) {
        try {
          const ragResult = await ragService.generateRAGResponse(
            userMessage,
            async (prompt: string) => {
              const result = await this.model.generateContent(prompt);
              const res = await result.response;
              return res.text();
            }
          );
          response = ragResult.response;
          console.log('RAG sources used:', ragResult.sources.length);
        } catch (ragError) {
          console.warn('RAG generation failed, falling back to standard generation:', ragError);
          // Fallback to standard generation
          const prompt = this.createIPLPrompt(userMessage);
          const result = await this.model.generateContent(prompt);
          const res = await result.response;
          response = res.text();
        }
      } else {
        const prompt = this.createIPLPrompt(userMessage);
        const result = await this.model.generateContent(prompt);
        const res = await result.response;
        response = res.text();
      }
      
      if (!response || response.trim().length === 0) {
        return this.getFallbackResponse(userMessage);
      }

      // Add assistant response to conversation history
      this.conversationHistory.push({
        role: 'assistant',
        content: response
      });
      
      return response;
    } catch (error) {
      console.error('Gemini API Error:', error);
      return this.getFallbackResponse(userMessage);
    }
  }

  private createIPLPrompt(userMessage: string): string {
    return `You are an expert IPL (Indian Premier League) cricket assistant with comprehensive knowledge about all IPL seasons from 2008 to 2025.

COMPREHENSIVE IPL DATA:
- IPL 2008: Winner: Rajasthan Royals, Runner-up: Chennai Super Kings, Final: RR beat CSK by 3 wickets at DY Patil Stadium Mumbai
- IPL 2009: Winner: Deccan Chargers, Runner-up: Royal Challengers Bangalore, Final: DC beat RCB by 6 runs at Wanderers Stadium Johannesburg
- IPL 2010: Winner: Chennai Super Kings, Runner-up: Mumbai Indians, Final: CSK beat MI by 22 runs at DY Patil Stadium Mumbai
- IPL 2011: Winner: Chennai Super Kings, Runner-up: Royal Challengers Bangalore, Final: CSK beat RCB by 58 runs at MA Chidambaram Stadium Chennai
- IPL 2012: Winner: Kolkata Knight Riders, Runner-up: Chennai Super Kings, Final: KKR beat CSK by 5 wickets at MA Chidambaram Stadium Chennai
- IPL 2013: Winner: Mumbai Indians, Runner-up: Chennai Super Kings, Final: MI beat CSK by 23 runs at Eden Gardens Kolkata
- IPL 2014: Winner: Kolkata Knight Riders, Runner-up: Kings XI Punjab, Final: KKR beat KXIP by 3 wickets at M Chinnaswamy Stadium Bangalore
- IPL 2015: Winner: Mumbai Indians, Runner-up: Chennai Super Kings, Final: MI beat CSK by 41 runs at Eden Gardens Kolkata
- IPL 2016: Winner: Sunrisers Hyderabad, Runner-up: Royal Challengers Bangalore, Final: SRH beat RCB by 8 runs at M Chinnaswamy Stadium Bangalore
- IPL 2017: Winner: Mumbai Indians, Runner-up: Rising Pune Supergiant, Final: MI beat RPS by 1 run at Rajiv Gandhi Stadium Hyderabad
- IPL 2018: Winner: Chennai Super Kings, Runner-up: Sunrisers Hyderabad, Final: CSK beat SRH by 8 wickets at Wankhede Stadium Mumbai
- IPL 2019: Winner: Mumbai Indians, Runner-up: Chennai Super Kings, Final: MI beat CSK by 1 run at Rajiv Gandhi Stadium Hyderabad
- IPL 2020: Winner: Mumbai Indians, Runner-up: Delhi Capitals, Final: MI beat DC by 5 wickets at Dubai International Stadium (UAE)
- IPL 2021: Winner: Chennai Super Kings, Runner-up: Kolkata Knight Riders, Final: CSK beat KKR by 27 runs at Dubai International Stadium (UAE)
- IPL 2022: Winner: Gujarat Titans, Runner-up: Rajasthan Royals, Final: GT beat RR by 7 wickets at Narendra Modi Stadium Ahmedabad
- IPL 2023: Winner: Chennai Super Kings, Runner-up: Gujarat Titans, Final: CSK beat GT by 5 wickets at Narendra Modi Stadium Ahmedabad
- IPL 2024: Winner: Kolkata Knight Riders, Runner-up: Sunrisers Hyderabad, Final: KKR beat SRH by 8 wickets at MA Chidambaram Stadium Chennai

TEAM RECORDS:
- Most titles: Mumbai Indians & Chennai Super Kings (5 each)
- KKR: 3 titles (2012, 2014, 2024)
- Other winners: RR (2008), DC (2009), SRH (2016), GT (2022)

SPECIAL SEASONS:
- 2009: Held in South Africa due to general elections in India
- 2014: Partially in UAE, partially in India
- 2020-2021: Held in UAE due to COVID-19 pandemic
- 2016-2017: CSK and RR suspended, replaced by RPS and GL

INSTRUCTIONS:
1. Provide accurate, detailed responses about IPL
2. Use emojis and formatting for engaging responses
3. Include specific statistics, dates, and facts
4. Keep responses conversational but informative
5. If unsure about recent data, mention it's based on available information
6. Focus specifically on IPL cricket content

User Question: "${userMessage}"

Provide a comprehensive, engaging response about this IPL topic with specific details, statistics, and context.`;
  }

  private getFallbackResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hii')) {
      return "Hello! 🏏 I'm your IPL AI assistant with complete data from 2008-2025. I can tell you about any season, match, player performance, team history, records, or tournament details. What would you like to explore about the Indian Premier League?";
    }
    
    if (lowerMessage.includes('2008') || lowerMessage.includes('first season') || lowerMessage.includes('inaugural')) {
      return "🏆 IPL 2008 (April 18 - June 1): The inaugural season! Winner: Rajasthan Royals, Runner-up: Chennai Super Kings. Final: RR beat CSK by 3 wickets at DY Patil Stadium, Mumbai. Shane Warne's captaincy magic! Total matches: 59. Orange Cap: Shaun Marsh (616 runs), Purple Cap: Sohail Tanvir (22 wickets). This season set the foundation for cricket's biggest T20 league! 🎯";
    }
    
    if (lowerMessage.includes('2024')) {
      return "🏆 IPL 2024 (March 22 - May 26): Winner: Kolkata Knight Riders, Runner-up: Sunrisers Hyderabad. Final: KKR beat SRH by 8 wickets at MA Chidambaram Stadium, Chennai. Shreyas Iyer's captaincy led KKR to their third title after 10 years! 🎉 Total matches: 74. Orange Cap: Virat Kohli (741 runs), Purple Cap: Mustafizur Rahman (28 wickets). What a comeback season for the Knights! 💜";
    }
    
    if (lowerMessage.includes('winners') || lowerMessage.includes('champions') || lowerMessage.includes('all seasons')) {
      return "🏆 IPL Champions (2008-2024): 2008: RR 👑, 2009: DC, 2010: CSK 💛, 2011: CSK, 2012: KKR 💜, 2013: MI 🔵, 2014: KKR, 2015: MI, 2016: SRH 🧡, 2017: MI, 2018: CSK, 2019: MI, 2020: MI, 2021: CSK, 2022: GT 💙, 2023: CSK, 2024: KKR. Most successful: MI & CSK (5 titles each), KKR (3 titles). 17 incredible seasons of cricket! 🎯";
    }
    
    if (lowerMessage.includes('mumbai') || lowerMessage.includes('mi')) {
      return "🔵 Mumbai Indians - The Champions! 5 IPL titles (2013, 2015, 2017, 2019, 2020) - most by any team! Led by Rohit Sharma since 2013, they're known for their strong core and clutch performances. Key players: Jasprit Bumrah, Hardik Pandya, Kieron Pollard (retired). Home: Wankhede Stadium. Their blue army is legendary! 🏟️";
    }
    
    if (lowerMessage.includes('csk') || lowerMessage.includes('chennai')) {
      return "💛 Chennai Super Kings - Captain Cool's Army! 5 IPL titles (2010, 2011, 2018, 2021, 2023) under MS Dhoni's leadership. Known for consistency, experience, and those famous last-over finishes! Suspended 2016-17 but came back stronger. The yellow brigade never gives up! Home: M.A. Chidambaram Stadium. Whistle Podu! 🎺";
    }
    
    if (lowerMessage.includes('records') || lowerMessage.includes('highest') || lowerMessage.includes('most')) {
      return "📊 Amazing IPL Records: Highest individual score: Chris Gayle 175* (2013) 💥, Most runs overall: Virat Kohli 7000+ 👑, Most wickets: Lasith Malinga 170+ 🎯, Most sixes in match: Chris Gayle 17 (2013), Most titles as captain: Rohit Sharma 5 🏆, Highest team total: RCB 263/5 (2013). The league of legends! ⚡";
    }
    
    if (lowerMessage.includes('venue') || lowerMessage.includes('stadium')) {
      return "🏟️ IPL Venues: Primarily across India in 8-12 cities. Major venues include Wankhede (Mumbai), Eden Gardens (Kolkata), M.A. Chidambaram (Chennai), M. Chinnaswamy (Bangalore), Arun Jaitley (Delhi). Special seasons: 2009 (South Africa), 2014 (UAE & India), 2020-2021 (UAE due to COVID-19). Each venue has its unique character! 🌍";
    }
    
    return "That's a fascinating IPL question! 🏏 The Indian Premier League has 17+ seasons of incredible cricket history, amazing records, and unforgettable moments. I have comprehensive data about all teams, players, matches, and statistics from 2008-2025. Feel free to ask about specific seasons, teams, players, records, or any IPL topic you're curious about! What would you like to explore? ⚡";
  }

  setApiKey(apiKey: string) {
    if (apiKey) {
      try {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
        localStorage.setItem('gemini_api_key', apiKey);
      } catch (error) {
        console.error('Failed to set API key:', error);
        this.model = null;
      }
    }
  }

  isConfigured(): boolean {
    return this.model !== null;
  }

  // Toggle RAG mode
  setRAGMode(enabled: boolean): void {
    this.useRAG = enabled;
    console.log('RAG mode:', enabled ? 'enabled' : 'disabled');
  }

  // Get conversation history
  getConversationHistory(): Array<{ role: string; content: string }> {
    return this.conversationHistory;
  }

  // Clear conversation history
  clearHistory(): void {
    this.conversationHistory = [];
  }

  // Get RAG statistics
  getRAGStats() {
    return ragService.getStats();
  }
}

export const geminiService = new GeminiService();