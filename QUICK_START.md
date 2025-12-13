# Quick Start Guide - Using RAG & LLM Features

## Setup (First Time)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Get Google Gemini API Key**
   - Visit: https://makersuite.google.com/app/apikey
   - Click "Create API Key"
   - Copy the key

3. **Configure API Key**
   - Start the app: `npm run dev`
   - Click "Setup API" button in header
   - Paste your API key
   - Click "Save API Key"

## Using the Application

### Basic Chat
1. Type your IPL question in the chat box
2. Press Enter or click Send button
3. Wait for AI response (1-3 seconds)

### Example Questions
- "Who won IPL 2024?"
- "Tell me about Mumbai Indians"
- "What are the batting records in IPL?"
- "Compare CSK and MI"
- "Show me all IPL winners"

### RAG Status Panel
1. Click "RAG Status" button in header
2. View:
   - System health (Active/Initializing)
   - Knowledge base stats (20 documents)
   - Available categories
3. Toggle RAG mode on/off
4. See how RAG works explanation

## Understanding RAG

### What is RAG?
RAG = Retrieval-Augmented Generation

**How it works:**
```
Your Question
    ↓
Semantic Search (finds relevant info)
    ↓
Retrieve Top 3 Documents
    ↓
Add Context to LLM Prompt
    ↓
Gemini Pro Generates Answer
    ↓
Response with Sources
```

### Benefits
✅ More accurate answers  
✅ Factual grounding  
✅ Source attribution  
✅ Reduced hallucinations  

## Troubleshooting

### API Key Issues
**Problem**: "Please configure API key" error  
**Solution**: Click "Setup API" and add valid Gemini API key

### RAG Not Working
**Problem**: RAG shows "Initializing..."  
**Solution**: Wait 5-10 seconds for ML model to load (first time only)

### Slow Responses
**Problem**: Responses take >5 seconds  
**Solution**: 
- Check internet connection
- First response after opening is slower (model loading)
- Subsequent responses should be 1-3 seconds

### Wrong Answers
**Problem**: AI gives incorrect information  
**Solution**:
- Check if RAG is enabled (should be green in RAG Status)
- For questions outside knowledge base, AI uses general knowledge
- Knowledge base covers IPL 2008-2024

## Advanced Usage

### Toggle RAG Mode
- **RAG On** (Default): Best for factual IPL questions
- **RAG Off**: Better for general conversation

### Conversation Memory
- Remembers last 10 messages
- Can ask follow-up questions
- Example:
  ```
  You: "Who won IPL 2024?"
  AI: "KKR won..."
  You: "When did they last win before that?"
  AI: "KKR won in 2014..."
  ```

### Clear History
- Refresh the page to start new conversation
- Or close/reopen browser tab

## Performance Tips

1. **First Load**: Takes 3-6 seconds (downloads ML model)
2. **Cached**: Subsequent loads are instant
3. **Best Browser**: Chrome/Edge (best ML support)
4. **Network**: Requires internet for LLM API

## Knowledge Base Coverage

The RAG system has comprehensive data about:
- ✅ All IPL seasons (2008-2024)
- ✅ All teams and their histories
- ✅ Tournament winners and finals
- ✅ Batting and bowling records
- ✅ Orange Cap and Purple Cap winners
- ✅ Venues and stadiums
- ✅ Tournament format and rules
- ✅ Auction information

## Privacy & Security

- ✅ API key stored locally (localStorage)
- ✅ No data sent to our servers
- ✅ Direct communication with Google Gemini
- ✅ Zero security vulnerabilities (CodeQL verified)
- ✅ Open source - transparent code

## Getting Help

### Common Questions

**Q: Is the API key free?**  
A: Yes, Google Gemini API has a generous free tier

**Q: How much does it cost?**  
A: Free tier includes many queries per day. See Google AI pricing for details

**Q: Can I use without API key?**  
A: No, API key required for LLM. But you can explore the UI and RAG status

**Q: Does it work offline?**  
A: No, requires internet for LLM API calls

**Q: Can I add more IPL data?**  
A: Yes! Edit `src/ragService.ts` and add to `IPL_KNOWLEDGE_BASE` array

## Keyboard Shortcuts

- `Enter` - Send message
- `Shift + Enter` - New line in message
- `Escape` - Close modal dialogs

## Best Practices

1. **Be Specific**: "Who won IPL 2024?" better than "Tell me about IPL"
2. **One Topic**: Focus on one question at a time
3. **Follow-up**: Use conversation memory for related questions
4. **Check RAG**: Ensure RAG is active for factual questions
5. **Verify**: Cross-check important stats from official sources

## Support

For issues or questions:
- Check this guide first
- Review README.md for technical details
- Check ML_ARCHITECTURE.md for deep dive
- Open GitHub issue for bugs

---

**Enjoy chatting about IPL with AI! 🏏🤖**
