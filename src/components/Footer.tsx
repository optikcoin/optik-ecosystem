import React from 'react';
import { Github, Twitter, Globe, Shield, FileCheck, Award } from 'lucide-react';
import Logo from './Logo';
import CTAButton from './CTAButton';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F1113]/50 border-t border-[#007BFF]/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Logo size="md" showText={true} />
            <p className="text-[#A9B2BC] text-sm">
              Enterprise-grade cryptocurrency platform with advanced security, regulatory compliance, and AI-powered trading intelligence.
            </p>
            <div className="flex space-x-4">
              <CTAButton
                href="https://twitter.com/optikcoin"
                external
                variant="outline"
                size="sm"
                icon={<Twitter className="w-4 h-4" />}
                className="!p-2 border-[#007BFF]/20 hover:border-[#007BFF]"
              >
                <span className="sr-only">Twitter</span>
              </CTAButton>
              <CTAButton
                href="https://github.com/optikcoin"
                external
                variant="outline"
                size="sm"
                icon={<Github className="w-4 h-4" />}
                className="!p-2 border-[#007BFF]/20 hover:border-[#007BFF]"
              >
                <span className="sr-only">GitHub</span>
              </CTAButton>
              <CTAButton
                href="https://optikcoin.com"
                external
                variant="outline"
                size="sm"
                icon={<Globe className="w-4 h-4" />}
                className="!p-2 border-[#007BFF]/20 hover:border-[#007BFF]"
              >
                <span className="sr-only">Website</span>
              </CTAButton>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-[#F1F3F5] font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/gpt" className="text-[#A9B2BC] hover:text-[#007BFF] transition-colors">AI Assistants</a></li>
              <li><a href="/dex" className="text-[#A9B2BC] hover:text-[#007BFF] transition-colors">DEX Trading</a></li>
              <li><a href="/meme-creator" className="text-[#A9B2BC] hover:text-[#007BFF] transition-colors">Token Creator</a></li>
              <li><a href="/analytics" className="text-[#A9B2BC] hover:text-[#007BFF] transition-colors">Analytics</a></li>
            </ul>
          </div>

          {/* Security & Compliance */}
          <div>
            <h3 className="text-[#F1F3F5] font-semibold mb-4">Security & Compliance</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Shield className="w-3 h-3 text-[#007BFF]" />
                <span className="text-[#A9B2BC]">SOC 2 Certified</span>
              </li>
              <li className="flex items-center space-x-2">
                <FileCheck className="w-3 h-3 text-[#007BFF]" />
                <span className="text-[#A9B2BC]">KYC Compliant</span>
              </li>
              <li className="flex items-center space-x-2">
                <Award className="w-3 h-3 text-[#007BFF]" />
                <span className="text-[#A9B2BC]">Audited Contracts</span>
              </li>
              <li><a href="#" className="text-[#A9B2BC] hover:text-[#007BFF] transition-colors">Security Reports</a></li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-[#F1F3F5] font-semibold mb-4">Get Started</h3>
            <div className="space-y-3">
              <CTAButton 
                onClick={() => window.open('https://chrome.google.com/webstore/detail/optikcoin-wallet', '_blank')}
                variant="primary" 
                size="sm" 
                className="w-full bg-[#007BFF] hover:bg-[#00D1FF]"
              >
                Download OptikWallet
              </CTAButton>
              <CTAButton 
                to="/gpt" 
                variant="outline" 
                size="sm" 
                className="w-full border-[#007BFF]/20 hover:border-[#007BFF] text-[#F1F3F5]"
              >
                Try AI Assistants
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="border-t border-[#007BFF]/20 mt-8 pt-8 text-center">
          <p className="text-[#A9B2BC] text-sm">
            © 2024 OptikCoin. All rights reserved. Built with enterprise-grade security and regulatory compliance.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;