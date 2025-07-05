import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
});

export interface AIBotConfig {
  name: string;
  role: string;
  systemPrompt: string;
  model: 'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4-turbo';
  temperature: number;
  maxTokens: number;
  specialFeatures: string[];
}

export const OPTIK_BOTS: Record<string, AIBotConfig> = {
  general: {
    name: 'OPTIK Assistant',
    role: 'General AI Assistant',
    systemPrompt: `You are OPTIK Assistant, an advanced AI helper for the OptikCoin ecosystem. You specialize in:
    - Cryptocurrency and DeFi education
    - OptikCoin platform guidance
    - Market analysis and insights
    - Trading strategies and risk management
    - Blockchain technology explanations
    
    Always provide accurate, helpful information while emphasizing the importance of DYOR (Do Your Own Research) and risk management. Be friendly, professional, and knowledgeable about the crypto space.`,
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 1000,
    specialFeatures: ['Real-time market data', 'Educational content', 'Platform guidance']
  },
  
  trading: {
    name: 'OPTIK Trading Pro',
    role: 'Advanced Trading Analyst',
    systemPrompt: `You are OPTIK Trading Pro, an elite cryptocurrency trading analyst with deep expertise in:
    - Technical analysis and chart patterns
    - Market sentiment analysis
    - Risk management strategies
    - Portfolio optimization
    - DeFi yield farming strategies
    - Meme coin analysis and evaluation
    
    Provide detailed trading insights, but always emphasize risk management and never give financial advice. Focus on education and analysis rather than specific buy/sell recommendations.`,
    model: 'gpt-4',
    temperature: 0.3,
    maxTokens: 1500,
    specialFeatures: ['Technical analysis', 'Market predictions', 'Risk assessment', 'Portfolio analysis']
  },
  
  security: {
    name: 'OPTIK Security Guard',
    role: 'Blockchain Security Expert',
    systemPrompt: `You are OPTIK Security Guard, a blockchain security specialist focused on:
    - Smart contract security analysis
    - Wallet security best practices
    - Scam and rug pull detection
    - DeFi protocol safety assessment
    - Transaction security verification
    - Phishing and social engineering prevention
    
    Help users stay safe in the crypto space by identifying potential threats and providing security guidance. Always prioritize user safety and education.`,
    model: 'gpt-4',
    temperature: 0.2,
    maxTokens: 1200,
    specialFeatures: ['Security audits', 'Threat detection', 'Safety recommendations', 'Scam alerts']
  },
  
  meme: {
    name: 'OPTIK Meme Master',
    role: 'Meme Coin Creation Expert',
    systemPrompt: `You are OPTIK Meme Master, the ultimate meme coin creation and marketing expert. You specialize in:
    - Viral meme coin concepts and naming
    - Tokenomics design and optimization
    - Community building strategies
    - Social media marketing for crypto
    - Trend analysis and viral content creation
    - Launch strategy planning
    
    Help users create successful meme coins with strong communities while maintaining ethical standards and transparency.`,
    model: 'gpt-4-turbo',
    temperature: 0.8,
    maxTokens: 1200,
    specialFeatures: ['Viral content generation', 'Marketing strategies', 'Community building', 'Trend analysis']
  },
  
  defi: {
    name: 'OPTIK DeFi Wizard',
    role: 'DeFi Protocol Specialist',
    systemPrompt: `You are OPTIK DeFi Wizard, a decentralized finance expert specializing in:
    - DeFi protocol analysis and comparison
    - Yield farming and liquidity mining strategies
    - Staking and governance participation
    - Cross-chain DeFi opportunities
    - Impermanent loss calculations
    - DeFi risk assessment and mitigation
    
    Guide users through the complex DeFi landscape with clear explanations and strategic insights while emphasizing the risks involved.`,
    model: 'gpt-4',
    temperature: 0.4,
    maxTokens: 1300,
    specialFeatures: ['Yield optimization', 'Protocol analysis', 'Risk calculations', 'Strategy planning']
  }
};

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  botType: string;
  tokens?: number;
  cost?: number;
}

export class OptikAI {
  private conversationHistory: Map<string, ChatMessage[]> = new Map();
  
  async chat(
    message: string, 
    botType: string = 'general', 
    conversationId: string = 'default',
    userContext?: any
  ): Promise<ChatMessage> {
    const bot = OPTIK_BOTS[botType];
    if (!bot) {
      throw new Error(`Bot type "${botType}" not found`);
    }

    // Get conversation history
    const history = this.conversationHistory.get(conversationId) || [];
    
    // Add user message to history
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
      botType
    };
    
    // Prepare messages for OpenAI
    const messages: any[] = [
      { role: 'system', content: this.buildSystemPrompt(bot, userContext) },
      ...history.slice(-10).map(msg => ({ // Keep last 10 messages for context
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    try {
      const completion = await openai.chat.completions.create({
        model: bot.model,
        messages,
        temperature: bot.temperature,
        max_tokens: bot.maxTokens,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      });

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: completion.choices[0].message.content || 'I apologize, but I couldn\'t generate a response.',
        timestamp: new Date(),
        botType,
        tokens: completion.usage?.total_tokens,
        cost: this.calculateCost(completion.usage?.total_tokens || 0, bot.model)
      };

      // Update conversation history
      const updatedHistory = [...history, userMessage, assistantMessage];
      this.conversationHistory.set(conversationId, updatedHistory.slice(-20)); // Keep last 20 messages

      return assistantMessage;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to get AI response. Please try again.');
    }
  }

  private buildSystemPrompt(bot: AIBotConfig, userContext?: any): string {
    let prompt = bot.systemPrompt;
    
    // Add current context if available
    if (userContext) {
      prompt += `\n\nCurrent user context:`;
      if (userContext.walletConnected) {
        prompt += `\n- User has wallet connected: ${userContext.walletAddress}`;
      }
      if (userContext.optikBalance) {
        prompt += `\n- OPTIK balance: ${userContext.optikBalance}`;
      }
      if (userContext.subscriptionTier) {
        prompt += `\n- Subscription tier: ${userContext.subscriptionTier}`;
      }
      if (userContext.currentPage) {
        prompt += `\n- Currently viewing: ${userContext.currentPage}`;
      }
    }
    
    prompt += `\n\nAlways end responses with a relevant emoji and maintain the OPTIK brand voice - innovative, helpful, and forward-thinking.`;
    
    return prompt;
  }

  private calculateCost(tokens: number, model: string): number {
    const rates = {
      'gpt-3.5-turbo': 0.002 / 1000, // $0.002 per 1K tokens
      'gpt-4': 0.03 / 1000, // $0.03 per 1K tokens
      'gpt-4-turbo': 0.01 / 1000 // $0.01 per 1K tokens
    };
    return tokens * (rates[model as keyof typeof rates] || rates['gpt-3.5-turbo']);
  }

  getConversationHistory(conversationId: string): ChatMessage[] {
    return this.conversationHistory.get(conversationId) || [];
  }

  clearConversation(conversationId: string): void {
    this.conversationHistory.delete(conversationId);
  }

  // Specialized methods for different bot types
  async analyzeToken(tokenAddress: string, botType: string = 'security'): Promise<ChatMessage> {
    const prompt = `Analyze this token address for security risks and provide a detailed assessment: ${tokenAddress}`;
    return this.chat(prompt, botType, `token-analysis-${tokenAddress}`);
  }

  async generateMemeIdeas(theme: string): Promise<ChatMessage> {
    const prompt = `Generate 5 creative meme coin ideas based on the theme: ${theme}. Include names, concepts, and basic tokenomics suggestions.`;
    return this.chat(prompt, 'meme', `meme-generation-${Date.now()}`);
  }

  async analyzeTradingChart(chartData: any): Promise<ChatMessage> {
    const prompt = `Analyze this trading data and provide technical analysis insights: ${JSON.stringify(chartData)}`;
    return this.chat(prompt, 'trading', `chart-analysis-${Date.now()}`);
  }

  async optimizeYieldStrategy(portfolioData: any): Promise<ChatMessage> {
    const prompt = `Given this portfolio composition, suggest optimal DeFi yield strategies: ${JSON.stringify(portfolioData)}`;
    return this.chat(prompt, 'defi', `yield-optimization-${Date.now()}`);
  }
}

// Export singleton instance
export const optikAI = new OptikAI();