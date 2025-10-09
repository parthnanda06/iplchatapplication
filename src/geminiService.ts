import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor() {
    // Initialize with API key from environment or prompt user
    this.initializeAPI();
  }

  private initializeAPI() {
    // For demo purposes, we'll use a placeholder
    // In production, you'd get this from environment variables
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    }
  }

  async generateResponse(userMessage: string): Promise<string> {
    if (!this.model) {
      return this.getFallbackResponse(userMessage);
    }

    try {
      const prompt = this.createIPLPrompt(userMessage);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      return this.getFallbackResponse(userMessage);
    }
  }

  private createIPLPrompt(userMessage: string): string {
    return `You are an expert IPL (Indian Premier League) AI assistant with comprehensive knowledge about cricket. 

Context: You have complete data about IPL from 2008-2025, including:
- All seasons, winners, runners-up, and finals details
- Team histories, player statistics, and records
- Match venues, formats, and tournament structures
- Historical events, COVID-19 impacts, and venue changes

Instructions:
- Provide accurate, detailed, and engaging responses about IPL
- Use emojis and formatting to make responses visually appealing
- Include specific statistics, dates, and facts when relevant
- If asked about current/live matches, explain that you provide historical data
- Keep responses informative but conversational
- Focus specifically on IPL-related content

User Question: ${userMessage}

Please provide a comprehensive and engaging response about this IPL topic.`;
  }

  private getFallbackResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    
    // Enhanced fallback responses with comprehensive IPL data
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
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    }
  }

  isConfigured(): boolean {
    return this.model !== null;
  }
}

export const geminiService = new GeminiService();