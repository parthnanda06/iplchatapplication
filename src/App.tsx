import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Zap, Users, TrendingUp, Sparkles, Trophy, Calendar } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your IPL AI assistant. Ask me anything about the Indian Premier League - teams, players, stats, matches, history, or predictions!",
      isUser: false,
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    // hello||hii
    if (lowerMessage.includes('hii') || lowerMessage.includes('hello')) {
      return "i am a ipl ai chatbot how can i help you"
      }
    
    
    // IPL Full Form
    if (lowerMessage.includes('full form') || lowerMessage.includes('ipl stands') || lowerMessage.includes('what is ipl') || lowerMessage.includes('ipl means')) {
      return "IPL stands for Indian Premier League! It's India's premier professional Twenty20 cricket league, established in 2008 by the Board of Control for Cricket in India (BCCI). The league has become one of the most popular and lucrative cricket tournaments in the world.";
    }
    
    // Team Information
    if (lowerMessage.includes('team') || lowerMessage.includes('teams')) {
      return "The IPL currently features 10 teams: Mumbai Indians (MI), Chennai Super Kings (CSK), Royal Challengers Bangalore (RCB), Kolkata Knight Riders (KKR), Delhi Capitals (DC), Punjab Kings (PBKS), Rajasthan Royals (RR), Sunrisers Hyderabad (SRH), Gujarat Titans (GT), and Lucknow Super Giants (LSG). Which team's history would you like to explore?";
    }
    
    // Mumbai Indians History
    if (lowerMessage.includes('mumbai') || lowerMessage.includes('mi')) {
      return "Mumbai Indians (2008-present) are the most successful IPL franchise with 5 titles (2013, 2015, 2017, 2019, 2020)! Founded as one of the original 8 teams, they're owned by Reliance Industries. Key players include Rohit Sharma (captain since 2013), Jasprit Bumrah, and legends like Lasith Malinga. Home: Wankhede Stadium, Mumbai.";
    }
    
    // Chennai Super Kings History
    if (lowerMessage.includes('csk') || lowerMessage.includes('chennai')) {
      return "Chennai Super Kings (2008-present, except 2016-17 suspension) have won 5 IPL titles (2010, 2011, 2018, 2021,2023)! Led by MS Dhoni since inception, they're known for consistency and experience. Owned by Chennai Super Kings Cricket Ltd. Famous for their yellow jersey and loyal fanbase. Home: M.A. Chidambaram Stadium, Chennai.";
    }
    
    // Royal Challengers Bangalore History
    if (lowerMessage.includes('rcb') || lowerMessage.includes('bangalore') || lowerMessage.includes('royal challengers')) {
      return "Royal Challengers Bangalore (2008-present) have won 1  IPL title despite reaching 4 ipl finals (2009, 2011, 2016,2025)! Originally captained by Rahul Dravid, then Virat Kohli (2013-2021),Faf du Plessis(2022-2024),then rajat patidar . Known for star power including Virat Kohli, AB de Villiers (retired), and passionate red army fans. Home: M. Chinnaswamy Stadium, Bangalore."
    }
    
    // Kolkata Knight Riders History
    if (lowerMessage.includes('kkr') || lowerMessage.includes('kolkata')) {
      return "Kolkata Knight Riders (2008-present) have won 3 IPL titles (2012,2014,2024)! Co-owned by Bollywood superstar Shah Rukh Khan, they transformed from early strugglers to champions under Gautam Gambhir's captaincy. Current captain Shreyas Iyer. Famous for their purple and gold colors and 'Korbo Lorbo Jeetbo Re' slogan. Home: Eden Gardens, Kolkata.";
    }
    
    // Delhi Capitals History
    if (lowerMessage.includes('delhi') || lowerMessage.includes('dc')) {
      return "Delhi Capitals (2008-present, originally Delhi Daredevils until 2018) reached their first final in 2020! Rebranded in 2019 with new ownership and management. Led by young captain Rishabh Pant. Known for nurturing young Indian talent. Despite no titles yet, they've been consistent playoff contenders recently. Home: Arun Jaitley Stadium, Delhi.";
    }
    
    // Punjab Kings History
    if (lowerMessage.includes('punjab') || lowerMessage.includes('pbks') || lowerMessage.includes('kings xi')) {
      return "Punjab Kings (2008-present, formerly Kings XI Punjab until 2020) reached the final once in 2014! Known for aggressive batting and discovering talent. Multiple captaincy changes over the years. Current captain Shikhar Dhawan. Famous for their red jersey and passionate Punjabi support. Home: PCA Stadium, Mohali.";
    }
    
    // Rajasthan Royals History
    if (lowerMessage.includes('rajasthan') || lowerMessage.includes('rr') || lowerMessage.includes('royals')) {
      return "Rajasthan Royals (2008-present, except 2016-17 suspension) were the inaugural IPL champions in 2008! Led by Shane Warne, they defeated CSK in a thrilling final. Known for discovering young talent and playing fearless cricket. Current captain Sanju Samson. Returned strongly after suspension. Home: Sawai Mansingh Stadium, Jaipur.";
    }
    
    // Sunrisers Hyderabad History
    if (lowerMessage.includes('srh') || lowerMessage.includes('sunrisers') || lowerMessage.includes('hyderabad')) {
      return "Sunrisers Hyderabad (2013-present) won the IPL in 2016! Replaced Deccan Chargers in 2013. Known for strong bowling attack and David Warner's explosive batting. Pat Cummins is the current captain. Famous orange army supporters and consistent playoff appearances. Home: Rajiv Gandhi International Stadium, Hyderabad.";
    }
    
    // Gujarat Titans History
    if (lowerMessage.includes('gujarat') || lowerMessage.includes('gt') || lowerMessage.includes('titans')) {
      return "Gujarat Titans (2022-present) are the newest success story! Won the IPL title in their debut season 2022 under Hardik Pandya's captaincy - a historic achievement! Reached the final again in 2023. Known for team balance and smart auction strategies. Home: Narendra Modi Stadium, Ahmedabad.";
    }
    
    // Lucknow Super Giants History
    if (lowerMessage.includes('lucknow') || lowerMessage.includes('lsg') || lowerMessage.includes('super giants')) {
      return "Lucknow Super Giants (2022-present) made an impressive debut! Led by KL Rahul, they reached the playoffs in their first season 2022. Owned by RPSG Group, they're building a strong foundation with experienced players and young talent. Home: Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium, Lucknow.";
    }
    
    // Historical teams
    if (lowerMessage.includes('deccan') || lowerMessage.includes('chargers')) {
      return "Deccan Chargers (2008-2012) won the IPL in 2009! Led by Adam Gilchrist, they defeated RCB in the final. Despite the title, they faced financial issues and were terminated after 2012, replaced by Sunrisers Hyderabad in 2013.";
    }
    
    if (lowerMessage.includes('pune') || lowerMessage.includes('warriors') || lowerMessage.includes('supergiant')) {
      return "Pune had two IPL teams: Pune Warriors India (2011-2013) who struggled and were terminated, and Rising Pune Supergiant (2016-2017) who replaced CSK during their suspension. RPS reached the final in 2017 under MS Dhoni's captaincy but lost to MI.";
    }
    
    if (lowerMessage.includes('kochi') || lowerMessage.includes('tuskers')) {
      return "Kochi Tuskers Kerala (2011) played only one IPL season! They faced ownership and financial issues and were terminated after 2011. They finished 8th in their only season.";
    }
    
    // Player Information
    if (lowerMessage.includes('virat') || lowerMessage.includes('kohli')) {
      return "Virat Kohli is an IPL legend! The former RCB captain (2013-2021) has scored over 7000 runs in the IPL and holds the record for most runs in a single season (973 in 2016). His passion and intensity are unmatched! He's been with RCB since 2008.";
    }
    
    if (lowerMessage.includes('dhoni') || lowerMessage.includes('ms')) {
      return "MS Dhoni, Captain Cool! The CSK captain has led them to 4 IPL titles (2010, 2011, 2018, 2021). His finishing ability and calm leadership under pressure make him one of the greatest IPL players ever. Those helicopter shots are legendary! He's been CSK's captain since 2008.";
    }
    
    if (lowerMessage.includes('rohit') || lowerMessage.includes('sharma')) {
      return "Rohit Sharma, the Hitman! MI captain since 2013, he's led them to 5 IPL titles - the most by any captain. Known for his elegant stroke play and tactical acumen. He's scored over 6000 runs in the IPL and holds multiple records including most sixes by an Indian.";
    }
    
    // Records and Stats
    if (lowerMessage.includes('record') || lowerMessage.includes('stat')) {
      return "Amazing IPL records: Highest individual score - Chris Gayle (175*), Most runs overall - Virat Kohli (7000+), Most wickets - Lasith Malinga (170), Most sixes in a match - Chris Gayle (17), Most titles as captain - Rohit Sharma (5), Most consistent team - CSK (10 playoff appearances). What specific record interests you?";
    }
    
    // History and Timeline
    if (lowerMessage.includes('history') || lowerMessage.includes('started') || lowerMessage.includes('first') || lowerMessage.includes('2008')) {
      return "IPL history: Started in 2008 with 8 teams, first match was KKR vs RCB on April 18, 2008. Rajasthan Royals won the inaugural title. The league expanded to 10 teams in 2011, then back to 8 (2014-2017), 8 teams (2018-2021), and now 10 teams again since 2022. It's revolutionized cricket globally!";
    }
    
    // Predictions
    if (lowerMessage.includes('prediction') || lowerMessage.includes('winner') || lowerMessage.includes('champion')) {
      return "Predicting IPL winners is always exciting! It depends on team form, player availability, pitch conditions, and those crucial moments. MI and CSK have been most successful historically, but GT showed new teams can win immediately. Every team has a chance - that's the beauty of IPL! Which team do you think will perform well?";
    }
    
    // General player question
    if (lowerMessage.includes('player') || lowerMessage.includes('best')) {
      return "The IPL has incredible talent! From Rohit Sharma's captaincy to AB de Villiers' innovation, Bumrah's yorkers to Russell's power-hitting. Current stars like Shubman Gill, Rishabh Pant, Hardik Pandya, and Rashid Khan are carrying the torch forward! Which player would you like to know about?";
    }
    
    return "That's a great IPL question! The league has so many fascinating aspects - from thrilling matches to incredible individual performances and rich team histories. Feel free to ask about specific teams, players, records, history, or anything else IPL-related!";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const suggestedQuestions = [
    "What is the full form of IPL?",
    "Tell me about Mumbai Indians history",
    "Which team won the first IPL?",
    "What happened to Deccan Chargers?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-2xl shadow-lg">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  IPL AI Assistant
                </h1>
                <p className="text-blue-300/80 text-sm font-medium">Your premium cricket conversation companion</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-sm font-medium">AI Powered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 h-[calc(100vh-120px)] flex flex-col">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <Users className="w-6 h-6 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">10</p>
            <p className="text-blue-200/80 text-sm font-medium">Active Teams</p>
          </div>
          
          <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <Calendar className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">17</p>
            <p className="text-blue-200/80 text-sm font-medium">Seasons</p>
          </div>
          
          <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <Trophy className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">1000+</p>
            <p className="text-blue-200/80 text-sm font-medium">Matches</p>
          </div>
          
          <div className="group bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <Zap className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">∞</p>
            <p className="text-blue-200/80 text-sm font-medium">Excitement</p>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto space-y-6 mb-6 pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {messages.length === 1 && (
            <div className="mb-8 animate-fade-in">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Welcome to IPL AI Chat!</h3>
                <p className="text-blue-200/80">Get instant answers about teams, players, records, and IPL history</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(question)}
                    className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-left text-blue-100 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                      <span className="font-medium">{question}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-slide-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-2xl rounded-2xl px-6 py-4 shadow-xl ${
                  message.isUser
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange-500/25'
                    : 'bg-white/15 backdrop-blur-xl text-white border border-white/20 shadow-black/20'
                }`}
              >
                <p className="text-sm leading-relaxed font-medium">{message.text}</p>
                <div className="flex items-center justify-between mt-3">
                  <p
                    className={`text-xs font-medium ${
                      message.isUser ? 'text-orange-100' : 'text-blue-200/80'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                  {!message.isUser && (
                    <div className="flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs text-yellow-400 font-medium">AI</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white/15 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/20 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-blue-200 text-sm font-medium">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Input Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-2xl">
          <div className="flex items-end space-x-4">
            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about IPL teams, players, records, or history..."
                className="w-full bg-white/10 backdrop-blur-md text-white placeholder-blue-200/70 resize-none outline-none rounded-2xl px-6 py-4 border border-white/20 focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300 min-h-[56px] max-h-32 font-medium"
                rows={1}
              />
              <div className="absolute bottom-2 right-2 text-xs text-blue-200/60 font-medium">
                Press Enter to send
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-500 disabled:to-gray-600 text-white rounded-2xl p-4 transition-all duration-300 hover:scale-110 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl group"
            >
              <Send className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thumb-white\/20::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}

export default App;