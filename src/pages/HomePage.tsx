import React from 'react';
import { Shield, Lock, CheckCircle, Users, TrendingUp, Zap, Globe, Brain, ArrowRight, Play, Star, Download, FileCheck, UserCheck, Award } from 'lucide-react';
import Logo from '../components/Logo';
import CTAButton from '../components/CTAButton';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Bank-Grade Security',
      description: 'Military-grade encryption and multi-layer security protocols protect your digital assets with institutional-level protection.',
      color: 'from-blue-400 to-cyan-400',
      gradient: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
      border: 'border-blue-500/20'
    },
    {
      icon: UserCheck,
      title: 'KYC Compliance',
      description: 'Full regulatory compliance with automated KYC verification ensuring secure and legitimate transactions.',
      color: 'from-green-400 to-emerald-400',
      gradient: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10',
      border: 'border-green-500/20'
    },
    {
      icon: Brain,
      title: 'AI-Powered Analytics',
      description: 'Advanced artificial intelligence provides real-time market analysis and intelligent trading recommendations.',
      color: 'from-purple-400 to-indigo-400',
      gradient: 'bg-gradient-to-br from-purple-500/10 to-indigo-500/10',
      border: 'border-purple-500/20'
    },
    {
      icon: Lock,
      title: 'Secure Infrastructure',
      description: 'Enterprise-grade infrastructure with 99.9% uptime and comprehensive backup systems for maximum reliability.',
      color: 'from-orange-400 to-red-400',
      gradient: 'bg-gradient-to-br from-orange-500/10 to-red-500/10',
      border: 'border-orange-500/20'
    },
    {
      icon: Globe,
      title: 'Global Compliance',
      description: 'Fully compliant with international regulations including GDPR, AML, and financial services requirements.',
      color: 'from-cyan-400 to-blue-400',
      gradient: 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10',
      border: 'border-cyan-500/20'
    },
    {
      icon: Award,
      title: 'Audited Smart Contracts',
      description: 'All smart contracts undergo rigorous third-party security audits and continuous monitoring for vulnerabilities.',
      color: 'from-yellow-400 to-orange-400',
      gradient: 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10',
      border: 'border-yellow-500/20'
    }
  ];

  const stats = [
    { label: 'Verified Users', value: '50K+', change: '+15.2%', icon: Users },
    { label: 'Security Score', value: '99.8%', change: '+0.3%', icon: Shield },
    { label: 'Compliance Rating', value: 'AAA', change: 'Maintained', icon: FileCheck },
    { label: 'Uptime', value: '99.9%', change: '+0.1%', icon: CheckCircle }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Institutional Investor',
      content: 'OptikCoin\'s security infrastructure and compliance standards exceed industry requirements. Their KYC process is seamless yet thorough.',
      avatar: '👩‍💼',
      rating: 5,
      company: 'Blockchain Capital'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Compliance Officer',
      content: 'The regulatory compliance and audit trail capabilities make OptikCoin our preferred platform for institutional trading.',
      avatar: '👨‍💼',
      rating: 5,
      company: 'FinTech Solutions'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Security Analyst',
      content: 'Their multi-layer security approach and continuous monitoring provide the peace of mind we need for large-scale operations.',
      avatar: '👩‍🔬',
      rating: 5,
      company: 'CyberSec Institute'
    }
  ];

  const complianceFeatures = [
    'SOC 2 Type II Certified',
    'ISO 27001 Compliant',
    'GDPR Compliant',
    'AML/CTF Compliant',
    'PCI DSS Level 1',
    'Regular Security Audits'
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#0F1113]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23007BFF' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="relative">
              <Logo size="xl" showText={false} className="animate-float" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#007BFF] to-[#00D1FF] rounded-full blur-xl opacity-30 animate-pulse"></div>
            </div>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
            <span className="text-[#F1F3F5]">Secure</span>
            <br />
            <span className="bg-gradient-to-r from-[#007BFF] to-[#00D1FF] bg-clip-text text-transparent">
              Cryptocurrency
            </span>
            <br />
            <span className="text-[#F1F3F5] text-4xl md:text-5xl lg:text-6xl">
              Platform
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-[#A9B2BC] mb-8 max-w-4xl mx-auto leading-relaxed animate-slide-up delay-200">
            Enterprise-grade security, full regulatory compliance, and AI-powered trading intelligence. 
            Built for institutions and professionals who demand the highest standards.
          </p>
          
          {/* Security Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 animate-slide-up delay-300">
            <div className="flex items-center space-x-2 bg-[#007BFF]/10 border border-[#007BFF]/20 rounded-full px-4 py-2">
              <Shield className="w-4 h-4 text-[#007BFF]" />
              <span className="text-[#F1F3F5] text-sm">SOC 2 Certified</span>
            </div>
            <div className="flex items-center space-x-2 bg-[#007BFF]/10 border border-[#007BFF]/20 rounded-full px-4 py-2">
              <FileCheck className="w-4 h-4 text-[#007BFF]" />
              <span className="text-[#F1F3F5] text-sm">KYC Compliant</span>
            </div>
            <div className="flex items-center space-x-2 bg-[#007BFF]/10 border border-[#007BFF]/20 rounded-full px-4 py-2">
              <Award className="w-4 h-4 text-[#007BFF]" />
              <span className="text-[#F1F3F5] text-sm">Audited</span>
            </div>
          </div>
          
          {/* Demo Video CTA */}
          <div className="inline-flex items-center space-x-3 text-[#007BFF] hover:text-[#00D1FF] transition-colors cursor-pointer group animate-slide-up delay-600">
            <div className="w-12 h-12 bg-[#F1F3F5]/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-[#F1F3F5]/20 transition-all duration-300">
              <Play className="w-5 h-5 ml-1" />
            </div>
            <span className="text-lg font-medium">Watch Security Overview</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0F1113]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#007BFF]/20 to-[#00D1FF]/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-[#007BFF]" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-[#F1F3F5] mb-2 group-hover:text-[#007BFF] transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-[#A9B2BC] text-sm mb-1">{stat.label}</div>
                  <div className="text-green-400 text-xs font-medium">{stat.change}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OptikCoin Features Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#F1F3F5] mb-6">
              Why Choose <span className="bg-gradient-to-r from-[#007BFF] to-[#00D1FF] bg-clip-text text-transparent">OptikCoin</span>?
            </h2>
            <p className="text-xl text-[#A9B2BC] max-w-3xl mx-auto leading-relaxed">
              Built with enterprise-grade security and regulatory compliance at its core, 
              OptikCoin provides the trust and reliability institutions demand.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`${feature.gradient} backdrop-blur-lg border ${feature.border} rounded-2xl p-8 hover:scale-105 transition-all duration-500 group cursor-pointer`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#F1F3F5] mb-4 group-hover:text-[#007BFF] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[#A9B2BC] leading-relaxed group-hover:text-[#F1F3F5] transition-colors">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meme Creator Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#007BFF]/5 to-[#00D1FF]/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#F1F3F5] mb-8">
                Professional <span className="bg-gradient-to-r from-[#007BFF] to-[#00D1FF] bg-clip-text text-transparent">Token Creation</span>
              </h2>
              <p className="text-xl text-[#A9B2BC] mb-8 leading-relaxed">
                Create and deploy professional-grade tokens with built-in compliance features, 
                automated KYC integration, and enterprise security standards.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'Automated compliance checks',
                  'Built-in KYC integration',
                  'Professional audit reports',
                  'Regulatory documentation',
                  'Enterprise-grade security',
                  'Institutional-ready deployment'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#007BFF] to-[#00D1FF] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[#A9B2BC] text-lg group-hover:text-[#F1F3F5] transition-colors">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton 
                  to="/meme-creator" 
                  variant="primary" 
                  size="lg"
                  className="bg-[#007BFF] hover:bg-[#00D1FF]"
                >
                  Create Professional Token
                </CTAButton>
                <CTAButton 
                  to="/gpt" 
                  variant="outline" 
                  size="lg"
                  className="border-[#007BFF]/20 hover:border-[#007BFF] text-[#F1F3F5]"
                >
                  Learn More
                </CTAButton>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#007BFF]/20 to-[#00D1FF]/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-[#0F1113]/50 to-[#0F1113]/80 backdrop-blur-lg border border-[#007BFF]/20 rounded-3xl p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-[#F1F3F5] mb-2">$2.45</div>
                  <div className="text-green-400 text-lg">+12.5% (24h)</div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[#A9B2BC]">Market Cap</span>
                    <span className="text-[#F1F3F5] font-semibold">$245M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A9B2BC]">24h Volume</span>
                    <span className="text-[#F1F3F5] font-semibold">$12.4M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A9B2BC]">Security Score</span>
                    <span className="text-green-400 font-semibold">99.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A9B2BC]">Compliance</span>
                    <span className="text-green-400 font-semibold">AAA Rated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#F1F3F5] mb-6">
              <span className="bg-gradient-to-r from-[#007BFF] to-[#00D1FF] bg-clip-text text-transparent">Regulatory</span> Compliance
            </h2>
            <p className="text-xl text-[#A9B2BC] max-w-3xl mx-auto">
              Full compliance with international standards and regulations, ensuring your operations meet the highest legal requirements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {complianceFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#0F1113]/50 to-[#0F1113]/80 backdrop-blur-lg border border-[#007BFF]/20 rounded-xl p-6 hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[#F1F3F5] font-medium group-hover:text-[#007BFF] transition-colors">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#007BFF]/5 to-[#00D1FF]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#F1F3F5] mb-6">
              Trusted by <span className="bg-gradient-to-r from-[#007BFF] to-[#00D1FF] bg-clip-text text-transparent">Professionals</span>
            </h2>
            <p className="text-xl text-[#A9B2BC] max-w-3xl mx-auto">
              Leading institutions and professionals trust OptikCoin for their most critical cryptocurrency operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#0F1113]/50 to-[#0F1113]/80 backdrop-blur-lg border border-[#007BFF]/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300 group"
              >
                <div className="flex items-center mb-6">
                  <div className="text-3xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="text-[#F1F3F5] font-bold text-lg group-hover:text-[#007BFF] transition-colors">
                      {testimonial.name}
                    </h4>
                    <p className="text-[#A9B2BC] text-sm">{testimonial.role}</p>
                    <p className="text-[#007BFF] text-xs">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-[#A9B2BC] italic leading-relaxed group-hover:text-[#F1F3F5] transition-colors">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="bg-gradient-to-br from-[#0F1113]/50 to-[#0F1113]/80 backdrop-blur-lg border border-[#007BFF]/20 rounded-3xl p-12">
            <div className="w-20 h-20 bg-gradient-to-r from-[#007BFF] to-[#00D1FF] rounded-full flex items-center justify-center mx-auto mb-8">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F1F3F5] mb-6">
              Ready to Experience <span className="bg-gradient-to-r from-[#007BFF] to-[#00D1FF] bg-clip-text text-transparent">Enterprise Security</span>?
            </h2>
            <p className="text-xl text-[#A9B2BC] mb-10 max-w-3xl mx-auto">
              Join leading institutions and professionals who trust OptikCoin for secure, compliant, 
              and intelligent cryptocurrency operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <CTAButton 
                onClick={() => window.open('https://chrome.google.com/webstore/detail/optikcoin-wallet', '_blank')}
                variant="primary" 
                size="lg"
                className="text-lg px-10 py-4 bg-[#007BFF] hover:bg-[#00D1FF] shadow-2xl hover:shadow-[#007BFF]/25"
                icon={<Download className="w-6 h-6" />}
              >
                Get Started Securely
              </CTAButton>
              <CTAButton 
                to="/gpt" 
                variant="outline" 
                size="lg"
                className="text-lg px-10 py-4 border-[#007BFF]/20 hover:border-[#007BFF] text-[#F1F3F5]"
                icon={<Brain className="w-6 h-6" />}
              >
                Explore AI Features
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#0F1113]/50 to-[#0F1113]/80">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F1F3F5] mb-4">
            Stay Updated with <span className="bg-gradient-to-r from-[#007BFF] to-[#00D1FF] bg-clip-text text-transparent">OptikCoin</span>
          </h2>
          <p className="text-[#A9B2BC] mb-8 text-lg">
            Get the latest security updates, compliance news, and platform developments delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-[#0F1113]/50 border border-[#007BFF]/20 rounded-xl px-6 py-4 text-[#F1F3F5] placeholder-[#A9B2BC] focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/20 backdrop-blur-sm"
            />
            <CTAButton 
              variant="primary" 
              size="md"
              className="px-8 py-4 bg-[#007BFF] hover:bg-[#00D1FF] whitespace-nowrap"
            >
              Subscribe Now
            </CTAButton>
          </div>
          <p className="text-[#A9B2BC] text-sm mt-4">
            Join 50,000+ professionals already subscribed. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;