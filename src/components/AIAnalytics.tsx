import React, { useState, useEffect } from 'react';
import { optikAI } from '../services/openai';
import { Brain, TrendingUp, Shield, Zap, BarChart3, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function AIAnalytics() {
  const [analysisResults, setAnalysisResults] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState('market');

  const analysisTypes = [
    {
      id: 'market',
      name: 'Market Analysis',
      description: 'AI-powered market trend analysis',
      icon: TrendingUp,
      color: 'text-green-400 bg-green-600/20'
    },
    {
      id: 'security',
      name: 'Security Audit',
      description: 'Smart contract security assessment',
      icon: Shield,
      color: 'text-red-400 bg-red-600/20'
    },
    {
      id: 'sentiment',
      name: 'Sentiment Analysis',
      description: 'Social media and community sentiment',
      icon: Brain,
      color: 'text-purple-400 bg-purple-600/20'
    },
    {
      id: 'performance',
      name: 'Performance Metrics',
      description: 'Token performance and analytics',
      icon: BarChart3,
      color: 'text-blue-400 bg-blue-600/20'
    }
  ];

  const runAnalysis = async (type: string) => {
    setIsAnalyzing(true);
    try {
      let prompt = '';
      switch (type) {
        case 'market':
          prompt = 'Analyze current cryptocurrency market trends, focusing on DeFi and meme coins. Provide insights on market sentiment, key drivers, and potential opportunities.';
          break;
        case 'security':
          prompt = 'Perform a security analysis of common smart contract vulnerabilities in DeFi protocols. Highlight key risks and mitigation strategies.';
          break;
        case 'sentiment':
          prompt = 'Analyze current sentiment in the cryptocurrency community, particularly around meme coins and DeFi projects. What are the trending topics and community concerns?';
          break;
        case 'performance':
          prompt = 'Evaluate the performance metrics that matter most for cryptocurrency projects. What KPIs should investors focus on?';
          break;
      }

      const response = await optikAI.chat(prompt, type === 'security' ? 'security' : 'trading', `analysis-${type}-${Date.now()}`);
      
      const newAnalysis = {
        id: Date.now(),
        type,
        title: analysisTypes.find(a => a.id === type)?.name || 'Analysis',
        content: response.content,
        timestamp: new Date(),
        status: 'completed',
        confidence: Math.floor(Math.random() * 20) + 80, // Mock confidence score
        tokens: response.tokens,
        cost: response.cost
      };

      setAnalysisResults(prev => [newAnalysis, ...prev.slice(0, 9)]); // Keep last 10 results
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'running': return <Clock className="w-4 h-4 text-yellow-400 animate-spin" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="bg-purple-600/20 p-4 rounded-full inline-flex mb-6">
          <Brain className="w-12 h-12 text-purple-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          OPTIK <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">AI Analytics</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Advanced AI-powered analysis for cryptocurrency markets, security, and performance
        </p>
      </div>

      {/* Analysis Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analysisTypes.map((analysis) => {
          const Icon = analysis.icon;
          return (
            <button
              key={analysis.id}
              onClick={() => runAnalysis(analysis.id)}
              disabled={isAnalyzing}
              className={`p-6 rounded-xl border-2 transition-all duration-300 text-left hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                selectedAnalysis === analysis.id
                  ? `${analysis.color} border-current`
                  : 'bg-gray-700/30 border-gray-600/30 hover:border-gray-500/50'
              }`}
            >
              <Icon className={`w-8 h-8 mb-4 ${
                selectedAnalysis === analysis.id ? '' : 'text-gray-400'
              }`} />
              <h3 className="text-lg font-semibold text-white mb-2">{analysis.name}</h3>
              <p className="text-gray-400 text-sm">{analysis.description}</p>
              
              {isAnalyzing && selectedAnalysis === analysis.id && (
                <div className="mt-4 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="text-purple-400 text-sm ml-2">Analyzing...</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Analysis Results */}
      {analysisResults.length > 0 && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Analysis Results</h2>
          <div className="space-y-6">
            {analysisResults.map((result) => {
              const analysisType = analysisTypes.find(a => a.id === result.type);
              const Icon = analysisType?.icon || Brain;
              
              return (
                <div key={result.id} className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${analysisType?.color || 'bg-gray-600/20'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{result.title}</h3>
                        <p className="text-gray-400 text-sm">{result.timestamp.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right text-sm">
                        <p className="text-gray-400">Confidence: {result.confidence}%</p>
                        <p className="text-gray-400">Cost: ${result.cost?.toFixed(4)}</p>
                      </div>
                      {getStatusIcon(result.status)}
                    </div>
                  </div>
                  
                  <div className="prose prose-sm prose-invert max-w-none">
                    {result.content.split('\n').map((paragraph: string, idx: number) => (
                      <p key={idx} className="mb-3 text-gray-300 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-600/30 flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>Tokens: {result.tokens?.toLocaleString()}</span>
                      <span>Type: {result.type}</span>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300 text-sm">
                      Export Report
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-purple-500/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Quick AI Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => runAnalysis('market')}
            disabled={isAnalyzing}
            className="p-4 bg-green-600/20 hover:bg-green-600/30 rounded-lg transition-all duration-200 border border-green-500/30 disabled:opacity-50"
          >
            <TrendingUp className="w-6 h-6 text-green-400 mb-2" />
            <p className="text-white font-medium">Market Pulse</p>
            <p className="text-gray-400 text-sm">Get instant market insights</p>
          </button>
          
          <button
            onClick={() => runAnalysis('security')}
            disabled={isAnalyzing}
            className="p-4 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition-all duration-200 border border-red-500/30 disabled:opacity-50"
          >
            <Shield className="w-6 h-6 text-red-400 mb-2" />
            <p className="text-white font-medium">Security Check</p>
            <p className="text-gray-400 text-sm">Analyze security risks</p>
          </button>
          
          <button
            onClick={() => runAnalysis('sentiment')}
            disabled={isAnalyzing}
            className="p-4 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg transition-all duration-200 border border-purple-500/30 disabled:opacity-50"
          >
            <Brain className="w-6 h-6 text-purple-400 mb-2" />
            <p className="text-white font-medium">Sentiment Scan</p>
            <p className="text-gray-400 text-sm">Check community mood</p>
          </button>
        </div>
      </div>
    </div>
  );
}