# IPL Chat Application with Advanced ML Features

A modern, AI-powered chatbot application for Indian Premier League (IPL) cricket enthusiasts, enhanced with **RAG (Retrieval-Augmented Generation)** and **LLM** technologies.

## 🚀 Features

### Core Features
- **Real-time Chat Interface**: Beautiful, responsive UI built with React + TypeScript
- **IPL Knowledge Base**: Comprehensive data covering all IPL seasons (2008-2024)
- **Smart Statistics Dashboard**: Visual representation of IPL stats and records

### Advanced ML Features

#### 🧠 RAG (Retrieval-Augmented Generation)
- **Semantic Search**: Uses vector embeddings to find relevant information from the knowledge base
- **Context-Aware Responses**: Combines retrieved context with LLM generation for accurate answers
- **Knowledge Base**: 20+ curated documents covering:
  - All IPL seasons and winners
  - Team histories and records
  - Player statistics and achievements
  - Venue information
  - Tournament formats and rules
- **Vector Embeddings**: Powered by Xenova/all-MiniLM-L6-v2 model for semantic understanding
- **Fallback Mechanism**: Keyword-based search when embeddings are unavailable

#### 🤖 LLM Integration
- **Google Gemini Pro**: State-of-the-art language model for natural conversations
- **Conversation Memory**: Maintains context across multiple messages
- **Dynamic Prompting**: Enhances prompts with retrieved context from RAG system
- **Dual Mode Operation**: 
  - RAG-enhanced mode for maximum accuracy
  - Standard mode for general conversations

#### 📊 RAG System Features
- **Real-time Status Monitoring**: View RAG system health and statistics
- **Toggle RAG Mode**: Enable/disable RAG for different use cases
- **Knowledge Base Analytics**: Track documents, categories, and embedding status
- **Source Attribution**: Understand which sources informed each response

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for modern, responsive styling
- **Lucide React** for beautiful icons

### AI/ML Stack
- **@google/generative-ai**: Google Gemini Pro LLM
- **@xenova/transformers**: Browser-based ML models for embeddings
- **Custom RAG Implementation**: Semantic search and retrieval system
- **Vector Store**: In-memory vector database with cosine similarity

### Development Tools
- **ESLint** for code quality
- **TypeScript** for type safety
- **PostCSS & Autoprefixer** for CSS processing

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/parthnanda06/iplchatapplication.git
cd iplchatapplication
```

2. Install dependencies:
```bash
npm install
```

3. Get a Google Gemini API key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Generate a free API key

4. Configure the API key:
   - Option 1: Use the in-app configuration (Click "Setup API" button)
   - Option 2: Set environment variable:
     ```bash
     echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env
     ```

## 🚀 Usage

### Development Mode
```bash
npm run dev
```
Visit `http://localhost:5173` to see the application.

### Production Build
```bash
npm run build
npm run preview
```

## 🎯 How RAG Works

1. **User Query**: User asks a question about IPL
2. **Embedding Generation**: Query is converted to vector embedding
3. **Semantic Search**: System finds most relevant documents using cosine similarity
4. **Context Retrieval**: Top-k relevant documents are retrieved
5. **Prompt Enhancement**: Retrieved context is added to LLM prompt
6. **Response Generation**: Gemini Pro generates answer using enhanced context
7. **Display**: Response is shown with source attribution

## 🔧 Configuration

### RAG System
- **Top-K Documents**: Default is 3 (configurable in `ragService.ts`)
- **Embedding Model**: Xenova/all-MiniLM-L6-v2
- **Similarity Metric**: Cosine similarity
- **Fallback**: Keyword-based search

### LLM Settings
- **Model**: Gemini Pro
- **Conversation History**: Last 10 messages
- **Temperature**: Default (controlled by Gemini)

## 📚 Project Structure

```
src/
├── App.tsx                 # Main application component
├── geminiService.ts        # LLM service with RAG integration
├── ragService.ts           # RAG implementation with vector search
├── types.ts                # TypeScript type definitions
├── components/
│   ├── ApiKeyModal.tsx     # API key configuration modal
│   └── RAGStatusPanel.tsx  # RAG system status dashboard
└── main.tsx                # Application entry point
```

## 🎨 UI Components

### Main Chat Interface
- Message history with timestamps
- Real-time typing indicators
- Suggested questions for quick start
- Responsive design for all screen sizes

### RAG Status Panel
- System health monitoring
- Knowledge base statistics
- RAG toggle switch
- Category overview

### API Configuration Modal
- Secure API key input
- Privacy information
- Direct link to get API key

## 📈 Future Enhancements

- [ ] Add more IPL data to knowledge base
- [ ] Implement streaming responses
- [ ] Add voice input/output
- [ ] Multi-language support
- [ ] Export chat history
- [ ] Custom knowledge base updates
- [ ] Advanced analytics dashboard
- [ ] Player comparison features

## 🔒 Security & Privacy

- API keys stored locally in browser
- No server-side data collection
- Direct communication with Google Gemini API
- Open-source and transparent

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Google for Gemini Pro API
- Xenova for Transformers.js
- IPL for providing cricket entertainment
- Open source community for amazing tools

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Made with ❤️ for IPL fans by cricket enthusiasts**

