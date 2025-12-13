import { pipeline, FeatureExtractionPipeline } from '@xenova/transformers';

// IPL Knowledge Base - Comprehensive data for RAG
const IPL_KNOWLEDGE_BASE = [
  {
    id: 'ipl_2008_season',
    content: 'IPL 2008 was the inaugural season held from April 18 to June 1, 2008. Rajasthan Royals won the championship, defeating Chennai Super Kings by 3 wickets in the final at DY Patil Stadium, Mumbai. Shane Warne captained the winning team. Shaun Marsh won the Orange Cap with 616 runs, and Sohail Tanvir won the Purple Cap with 22 wickets.',
    category: 'season',
    year: 2008
  },
  {
    id: 'ipl_2024_season',
    content: 'IPL 2024 was held from March 22 to May 26, 2024. Kolkata Knight Riders won their third title, defeating Sunrisers Hyderabad by 8 wickets in the final at MA Chidambaram Stadium, Chennai. Shreyas Iyer captained KKR. Virat Kohli won the Orange Cap with 741 runs, and Mustafizur Rahman won the Purple Cap with 28 wickets.',
    category: 'season',
    year: 2024
  },
  {
    id: 'mumbai_indians_history',
    content: 'Mumbai Indians are the most successful team in IPL history with 5 titles (2013, 2015, 2017, 2019, 2020). Captained by Rohit Sharma since 2013, they play at Wankhede Stadium. Key players include Jasprit Bumrah, Hardik Pandya, and formerly Kieron Pollard. Known for their strong bowling attack and clutch performances.',
    category: 'team',
    team: 'MI'
  },
  {
    id: 'chennai_super_kings_history',
    content: 'Chennai Super Kings have won 5 IPL titles (2010, 2011, 2018, 2021, 2023), tied with Mumbai Indians for most championships. Led by MS Dhoni, they play at M.A. Chidambaram Stadium. Known for consistency, experienced players, and dramatic last-over finishes. They were suspended in 2016-2017 but returned stronger.',
    category: 'team',
    team: 'CSK'
  },
  {
    id: 'ipl_winners_complete_list',
    content: 'Complete IPL Winners List: 2008-Rajasthan Royals, 2009-Deccan Chargers, 2010-Chennai Super Kings, 2011-Chennai Super Kings, 2012-Kolkata Knight Riders, 2013-Mumbai Indians, 2014-Kolkata Knight Riders, 2015-Mumbai Indians, 2016-Sunrisers Hyderabad, 2017-Mumbai Indians, 2018-Chennai Super Kings, 2019-Mumbai Indians, 2020-Mumbai Indians, 2021-Chennai Super Kings, 2022-Gujarat Titans, 2023-Chennai Super Kings, 2024-Kolkata Knight Riders.',
    category: 'records',
    topic: 'winners'
  },
  {
    id: 'ipl_records_batting',
    content: 'IPL Batting Records: Highest individual score - Chris Gayle 175* (2013), Most runs in IPL history - Virat Kohli 7000+, Most centuries - Virat Kohli and Chris Gayle, Fastest century - Chris Gayle (30 balls), Most sixes in an innings - Chris Gayle 17 (2013), Highest partnership - Virat Kohli and AB de Villiers 229.',
    category: 'records',
    topic: 'batting'
  },
  {
    id: 'ipl_records_bowling',
    content: 'IPL Bowling Records: Most wickets all-time - Lasith Malinga 170, Best bowling figures - Alzarri Joseph 6/12 (2019), Most hat-tricks - Amit Mishra 3, Most economical spell - Anil Kumble 4 overs 5 runs, Most wickets in a season - Harshal Patel 32 (2021).',
    category: 'records',
    topic: 'bowling'
  },
  {
    id: 'kkr_history',
    content: 'Kolkata Knight Riders have won 3 IPL titles (2012, 2014, 2024). They play at Eden Gardens, Kolkata. Shah Rukh Khan is the team owner. Gautam Gambhir captained their first two titles, and Shreyas Iyer led them to victory in 2024. Known for their passionate fan base and strong home performances.',
    category: 'team',
    team: 'KKR'
  },
  {
    id: 'rcb_history',
    content: 'Royal Challengers Bangalore have never won the IPL despite reaching finals in 2009, 2011, and 2016. They play at M. Chinnaswamy Stadium. Notable players include Virat Kohli, AB de Villiers (retired), and Glenn Maxwell. They hold the record for highest team total - 263/5 against Pune Warriors in 2013.',
    category: 'team',
    team: 'RCB'
  },
  {
    id: 'ipl_venues_stadiums',
    content: 'Major IPL venues include: Wankhede Stadium (Mumbai), Eden Gardens (Kolkata), M.A. Chidambaram Stadium (Chennai), M. Chinnaswamy Stadium (Bangalore), Arun Jaitley Stadium (Delhi), Narendra Modi Stadium (Ahmedabad), and others across India. Special seasons: 2009 (South Africa), 2014 (UAE and India), 2020-2021 (UAE due to COVID-19).',
    category: 'venues',
    topic: 'stadiums'
  },
  {
    id: 'ipl_format_rules',
    content: 'IPL is a Twenty20 cricket tournament with 10 teams competing in a double round-robin format followed by playoffs. Each team plays 14 league matches. Top 4 teams qualify for playoffs: Qualifier 1 (1st vs 2nd), Eliminator (3rd vs 4th), Qualifier 2 (loser Q1 vs winner Eliminator), and Final. Each match has 20 overs per side.',
    category: 'format',
    topic: 'rules'
  },
  {
    id: 'ipl_mega_auction',
    content: 'IPL Mega Auctions occur every 3-4 years where teams rebuild their squads. Teams can retain a limited number of players and use Right to Match cards. The 2022 mega auction saw some record purchases. Players are categorized into different price brackets. Uncapped Indian players often become surprise picks.',
    category: 'auction',
    topic: 'mega_auction'
  },
  {
    id: 'ipl_orange_cap',
    content: 'Orange Cap is awarded to the leading run-scorer in each IPL season. Notable winners include Virat Kohli (2016 - 973 runs), David Warner, Chris Gayle, and Shaun Marsh. The cap is worn by the leading scorer throughout the tournament and changes hands as the tournament progresses.',
    category: 'awards',
    topic: 'orange_cap'
  },
  {
    id: 'ipl_purple_cap',
    content: 'Purple Cap is awarded to the leading wicket-taker in each IPL season. Notable winners include Harshal Patel (2021 - 32 wickets), Kagiso Rabada, Imran Tahir, and Dwayne Bravo. Fast bowlers and mystery spinners have been most successful in claiming this award.',
    category: 'awards',
    topic: 'purple_cap'
  },
  {
    id: 'sunrisers_hyderabad',
    content: 'Sunrisers Hyderabad won the IPL in 2016, defeating Royal Challengers Bangalore by 8 runs. They play at Rajiv Gandhi International Stadium. Known for strong bowling attack led by Bhuvneshwar Kumar and Rashid Khan. David Warner was their successful captain. They reached finals again in 2018 and 2024.',
    category: 'team',
    team: 'SRH'
  },
  {
    id: 'gujarat_titans',
    content: 'Gujarat Titans won the IPL in their debut season 2022, led by Hardik Pandya. They defeated Rajasthan Royals by 7 wickets in the final at Ahmedabad. They reached finals again in 2023. Known for their aggressive approach and smart team building under coach Ashish Nehra.',
    category: 'team',
    team: 'GT'
  },
  {
    id: 'rajasthan_royals',
    content: 'Rajasthan Royals won the inaugural IPL 2008 under Shane Warne. They play at Sawai Mansingh Stadium, Jaipur. Despite being considered underdogs in 2008, they defeated CSK in the final. Reached finals again in 2022. Known for discovering young talent and backing uncapped players.',
    category: 'team',
    team: 'RR'
  },
  {
    id: 'delhi_capitals',
    content: 'Delhi Capitals (formerly Delhi Daredevils) reached their first final in 2020, losing to Mumbai Indians. They play at Arun Jaitley Stadium. Coached by Ricky Ponting, they have built a strong young core. Known for nurturing Indian talent like Rishabh Pant, Axar Patel, and Prithvi Shaw.',
    category: 'team',
    team: 'DC'
  },
  {
    id: 'punjab_kings',
    content: 'Punjab Kings (formerly Kings XI Punjab) reached finals in 2014, losing to KKR. They play at PCA Stadium, Mohali. Despite having strong squads over the years, they have not won the title yet. Known for explosive batting lineups and big-hitting batsmen.',
    category: 'team',
    team: 'PBKS'
  },
  {
    id: 'ipl_playoff_system',
    content: 'IPL Playoff System: Top 4 teams qualify. Qualifier 1 (1st vs 2nd) - winner goes to final. Eliminator (3rd vs 4th) - loser eliminated. Qualifier 2 (loser of Q1 vs winner of Eliminator) - winner goes to final. This system gives top 2 teams two chances to reach the final.',
    category: 'format',
    topic: 'playoffs'
  }
];

interface KnowledgeBaseDocument {
  id: string;
  content: string;
  category: string;
  year?: number;
  team?: string;
  topic?: string;
}

interface Document extends KnowledgeBaseDocument {
  embedding?: number[];
  metadata?: Record<string, unknown>;
}

class RAGService {
  private documents: Document[] = [];
  private embedder: FeatureExtractionPipeline | null = null;
  private initialized = false;

  constructor() {
    this.documents = IPL_KNOWLEDGE_BASE.map(doc => ({ ...doc }));
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Initialize the embedding model (using a lightweight model for browser)
      console.log('Initializing embedding model for RAG...');
      this.embedder = await pipeline(
        'feature-extraction',
        'Xenova/all-MiniLM-L6-v2'
      );

      // Generate embeddings for all documents
      await this.generateEmbeddings();
      this.initialized = true;
      console.log('RAG Service initialized successfully with', this.documents.length, 'documents');
    } catch (error) {
      console.error('Failed to initialize RAG service:', error);
      // Continue without embeddings - will use keyword matching fallback
      this.initialized = false;
    }
  }

  private async generateEmbeddings(): Promise<void> {
    if (!this.embedder) return;

    for (const doc of this.documents) {
      try {
        const output = await this.embedder(doc.content, {
          pooling: 'mean',
          normalize: true
        });
        doc.embedding = Array.from(output.data);
      } catch (error) {
        console.error(`Failed to generate embedding for document ${doc.id}:`, error);
      }
    }
  }

  private async generateQueryEmbedding(query: string): Promise<number[] | null> {
    if (!this.embedder) return null;

    try {
      const output = await this.embedder(query, {
        pooling: 'mean',
        normalize: true
      });
      return Array.from(output.data);
    } catch (error) {
      console.error('Failed to generate query embedding:', error);
      return null;
    }
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0;

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }

    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);

    if (normA === 0 || normB === 0) return 0;

    return dotProduct / (normA * normB);
  }

  private keywordMatchScore(query: string, document: Document): number {
    const queryLower = query.toLowerCase();
    const contentLower = document.content.toLowerCase();
    
    // Split query into words
    const queryWords = queryLower.split(/\s+/).filter(word => word.length > 2);
    
    let score = 0;
    for (const word of queryWords) {
      if (contentLower.includes(word)) {
        score += 1;
      }
    }

    // Boost score for exact category matches
    if (queryLower.includes(document.category)) {
      score += 2;
    }

    // Boost for metadata matches
    if (document.team && queryLower.includes(document.team.toLowerCase())) {
      score += 3;
    }
    if (document.year && queryLower.includes(document.year.toString())) {
      score += 3;
    }

    return score;
  }

  async retrieveRelevantContext(query: string, topK: number = 3): Promise<Document[]> {
    // Ensure initialization
    if (!this.initialized) {
      await this.initialize();
    }

    // If embeddings are available, use semantic search
    if (this.initialized && this.embedder) {
      return await this.semanticSearch(query, topK);
    }

    // Fallback to keyword-based search
    return this.keywordSearch(query, topK);
  }

  private async semanticSearch(query: string, topK: number): Promise<Document[]> {
    const queryEmbedding = await this.generateQueryEmbedding(query);
    
    if (!queryEmbedding) {
      return this.keywordSearch(query, topK);
    }

    // Calculate similarity scores
    const scoredDocs = this.documents
      .filter(doc => doc.embedding)
      .map(doc => ({
        document: doc,
        score: this.cosineSimilarity(queryEmbedding, doc.embedding!)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    return scoredDocs.map(item => item.document);
  }

  private keywordSearch(query: string, topK: number): Document[] {
    const scoredDocs = this.documents
      .map(doc => ({
        document: doc,
        score: this.keywordMatchScore(query, doc)
      }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    return scoredDocs.map(item => item.document);
  }

  async generateRAGResponse(query: string, llmGenerateFunction: (prompt: string) => Promise<string>): Promise<{ response: string; sources: Document[] }> {
    // Retrieve relevant context
    const relevantDocs = await this.retrieveRelevantContext(query, 3);

    // Build context from retrieved documents
    const context = relevantDocs
      .map((doc, idx) => `[Source ${idx + 1}]: ${doc.content}`)
      .join('\n\n');

    // Create enhanced prompt with retrieved context
    const enhancedPrompt = this.createRAGPrompt(query, context);

    // Generate response using LLM
    const response = await llmGenerateFunction(enhancedPrompt);

    return {
      response,
      sources: relevantDocs
    };
  }

  private createRAGPrompt(query: string, context: string): string {
    return `You are an expert IPL (Indian Premier League) cricket assistant with access to a comprehensive knowledge base.

RETRIEVED CONTEXT FROM KNOWLEDGE BASE:
${context}

INSTRUCTIONS:
1. Use the above context to provide accurate, detailed answers
2. Combine information from multiple sources when relevant
3. If the context doesn't fully answer the question, use your general IPL knowledge
4. Provide specific facts, statistics, and dates from the context
5. Format your response in an engaging, conversational way
6. Use emojis appropriately to make the response more engaging
7. If you reference specific facts, be confident in them as they come from the knowledge base

USER QUESTION: "${query}"

Provide a comprehensive, engaging response based on the retrieved context and your knowledge:`;
  }

  // Get statistics about the knowledge base
  getStats(): { totalDocuments: number; categories: string[]; initialized: boolean } {
    const categories = [...new Set(this.documents.map(doc => doc.category))];
    return {
      totalDocuments: this.documents.length,
      categories,
      initialized: this.initialized
    };
  }

  // Add new document to knowledge base (for future expansion)
  async addDocument(doc: Omit<Document, 'embedding'>): Promise<void> {
    const newDoc: Document = { ...doc };
    
    if (this.embedder) {
      try {
        const output = await this.embedder(doc.content, {
          pooling: 'mean',
          normalize: true
        });
        newDoc.embedding = Array.from(output.data);
      } catch (error) {
        console.error('Failed to generate embedding for new document:', error);
      }
    }

    this.documents.push(newDoc);
  }
}

export const ragService = new RAGService();
