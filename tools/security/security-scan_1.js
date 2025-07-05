#!/usr/bin/env node

/**
 * OptikCoin Security Scanner
 * Comprehensive security scanning tool for the OptikCoin platform
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');

class SecurityScanner {
  constructor() {
    this.results = {
      vulnerabilities: [],
      warnings: [],
      info: [],
      summary: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
        info: 0
      }
    };
  }

  // Main scanning function
  async scan() {
    console.log('🔒 Starting OptikCoin Security Scan...\n');

    try {
      await this.scanDependencies();
      await this.scanCode();
      await this.scanDockerImages();
      await this.scanSmartContracts();
      await this.scanConfiguration();
      await this.scanSecrets();
      await this.generateReport();
    } catch (error) {
      console.error('❌ Security scan failed:', error.message);
      process.exit(1);
    }
  }

  // Scan npm dependencies for vulnerabilities
  async scanDependencies() {
    console.log('📦 Scanning dependencies...');

    try {
      // Frontend dependencies
      const frontendAudit = execSync('npm audit --json', { 
        cwd: process.cwd(),
        encoding: 'utf8' 
      });
      this.processDependencyAudit(JSON.parse(frontendAudit), 'frontend');

      // Backend dependencies
      const backendAudit = execSync('npm audit --json', { 
        cwd: path.join(process.cwd(), 'backend'),
        encoding: 'utf8' 
      });
      this.processDependencyAudit(JSON.parse(backendAudit), 'backend');

      // Contract dependencies
      const contractAudit = execSync('npm audit --json', { 
        cwd: path.join(process.cwd(), 'contracts'),
        encoding: 'utf8' 
      });
      this.processDependencyAudit(JSON.parse(contractAudit), 'contracts');

      console.log('✅ Dependency scan completed');
    } catch (error) {
      this.addVulnerability('high', 'Dependency scan failed', error.message);
    }
  }

  // Process npm audit results
  processDependencyAudit(audit, component) {
    if (audit.vulnerabilities) {
      Object.entries(audit.vulnerabilities).forEach(([pkg, vuln]) => {
        const severity = vuln.severity;
        const message = `${component}: ${pkg} - ${vuln.title}`;
        
        if (severity === 'critical' || severity === 'high') {
          this.addVulnerability(severity, message, vuln.url);
        } else {
          this.addWarning(severity, message, vuln.url);
        }
      });
    }
  }

  // Scan source code for security issues
  async scanCode() {
    console.log('🔍 Scanning source code...');

    const patterns = [
      // Hardcoded secrets
      {
        pattern: /(password|secret|key|token)\s*[:=]\s*['"][^'"]{8,}['"]/gi,
        severity: 'critical',
        message: 'Potential hardcoded secret detected'
      },
      // SQL injection patterns
      {
        pattern: /query\s*\(\s*['"`][^'"`]*\$\{[^}]+\}[^'"`]*['"`]/gi,
        severity: 'high',
        message: 'Potential SQL injection vulnerability'
      },
      // XSS patterns
      {
        pattern: /innerHTML\s*=\s*[^;]+\+/gi,
        severity: 'medium',
        message: 'Potential XSS vulnerability'
      },
      // Eval usage
      {
        pattern: /eval\s*\(/gi,
        severity: 'high',
        message: 'Use of eval() detected - potential code injection'
      },
      // Insecure random
      {
        pattern: /Math\.random\(\)/gi,
        severity: 'medium',
        message: 'Insecure random number generation'
      }
    ];

    this.scanDirectory('src', patterns);
    this.scanDirectory('backend/src', patterns);

    console.log('✅ Code scan completed');
  }

  // Scan directory for patterns
  scanDirectory(dir, patterns) {
    if (!fs.existsSync(dir)) return;

    const files = this.getJavaScriptFiles(dir);
    
    files.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      
      patterns.forEach(({ pattern, severity, message }) => {
        const matches = content.match(pattern);
        if (matches) {
          matches.forEach(match => {
            this.addVulnerability(severity, `${message} in ${file}`, match);
          });
        }
      });
    });
  }

  // Get all JavaScript/TypeScript files
  getJavaScriptFiles(dir) {
    const files = [];
    
    const scan = (currentDir) => {
      const items = fs.readdirSync(currentDir);
      
      items.forEach(item => {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          scan(fullPath);
        } else if (stat.isFile() && /\.(js|ts|jsx|tsx)$/.test(item)) {
          files.push(fullPath);
        }
      });
    };
    
    scan(dir);
    return files;
  }

  // Scan Docker images for vulnerabilities
  async scanDockerImages() {
    console.log('🐳 Scanning Docker images...');

    const images = [
      'optikcoin-frontend',
      'optikcoin-backend',
      'optikcoin-worker'
    ];

    for (const image of images) {
      try {
        const result = execSync(`trivy image --format json ${image}:latest`, {
          encoding: 'utf8'
        });
        
        const scan = JSON.parse(result);
        this.processDockerScan(scan, image);
      } catch (error) {
        this.addWarning('medium', `Docker image scan failed for ${image}`, error.message);
      }
    }

    console.log('✅ Docker scan completed');
  }

  // Process Docker scan results
  processDockerScan(scan, image) {
    if (scan.Results) {
      scan.Results.forEach(result => {
        if (result.Vulnerabilities) {
          result.Vulnerabilities.forEach(vuln => {
            const severity = vuln.Severity.toLowerCase();
            const message = `Docker ${image}: ${vuln.VulnerabilityID} - ${vuln.Title}`;
            
            if (severity === 'critical' || severity === 'high') {
              this.addVulnerability(severity, message, vuln.References?.[0]);
            } else {
              this.addWarning(severity, message, vuln.References?.[0]);
            }
          });
        }
      });
    }
  }

  // Scan smart contracts
  async scanSmartContracts() {
    console.log('📜 Scanning smart contracts...');

    try {
      // Run Slither static analysis
      const slitherResult = execSync('slither contracts/src --json -', {
        encoding: 'utf8',
        cwd: process.cwd()
      });
      
      const analysis = JSON.parse(slitherResult);
      this.processSlitherResults(analysis);

      // Run Mythril analysis
      try {
        const mythrilResult = execSync('myth analyze contracts/src/OptikCoin.sol --execution-timeout 60', {
          encoding: 'utf8',
          cwd: process.cwd()
        });
        this.processMythrilResults(mythrilResult);
      } catch (error) {
        this.addWarning('low', 'Mythril analysis failed', error.message);
      }

      console.log('✅ Smart contract scan completed');
    } catch (error) {
      this.addWarning('medium', 'Smart contract scan failed', error.message);
    }
  }

  // Process Slither results
  processSlitherResults(analysis) {
    if (analysis.results && analysis.results.detectors) {
      analysis.results.detectors.forEach(detector => {
        const severity = this.mapSlitherSeverity(detector.impact);
        const message = `Smart Contract: ${detector.check} - ${detector.description}`;
        
        if (severity === 'critical' || severity === 'high') {
          this.addVulnerability(severity, message, detector.wiki);
        } else {
          this.addWarning(severity, message, detector.wiki);
        }
      });
    }
  }

  // Process Mythril results
  processMythrilResults(result) {
    const lines = result.split('\n');
    lines.forEach(line => {
      if (line.includes('SWC-')) {
        const severity = line.includes('High') ? 'high' : 
                        line.includes('Medium') ? 'medium' : 'low';
        this.addVulnerability(severity, `Mythril: ${line.trim()}`);
      }
    });
  }

  // Map Slither severity to our scale
  mapSlitherSeverity(impact) {
    switch (impact.toLowerCase()) {
      case 'high': return 'high';
      case 'medium': return 'medium';
      case 'low': return 'low';
      case 'informational': return 'info';
      default: return 'medium';
    }
  }

  // Scan configuration files
  async scanConfiguration() {
    console.log('⚙️ Scanning configuration...');

    const configChecks = [
      {
        file: 'docker-compose.yml',
        checks: [
          {
            pattern: /privileged:\s*true/gi,
            severity: 'high',
            message: 'Privileged container detected'
          },
          {
            pattern: /network_mode:\s*host/gi,
            severity: 'medium',
            message: 'Host network mode detected'
          }
        ]
      },
      {
        file: 'backend/src/server.ts',
        checks: [
          {
            pattern: /cors\(\s*\)/gi,
            severity: 'medium',
            message: 'CORS configured to allow all origins'
          }
        ]
      }
    ];

    configChecks.forEach(({ file, checks }) => {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        
        checks.forEach(({ pattern, severity, message }) => {
          if (pattern.test(content)) {
            this.addVulnerability(severity, `${message} in ${file}`);
          }
        });
      }
    });

    console.log('✅ Configuration scan completed');
  }

  // Scan for exposed secrets
  async scanSecrets() {
    console.log('🔐 Scanning for secrets...');

    const secretPatterns = [
      {
        name: 'AWS Access Key',
        pattern: /AKIA[0-9A-Z]{16}/gi,
        severity: 'critical'
      },
      {
        name: 'Private Key',
        pattern: /-----BEGIN (RSA |EC |DSA )?PRIVATE KEY-----/gi,
        severity: 'critical'
      },
      {
        name: 'API Key',
        pattern: /api[_-]?key['"]\s*[:=]\s*['"][a-zA-Z0-9]{20,}['"]/gi,
        severity: 'high'
      },
      {
        name: 'Database URL',
        pattern: /(postgres|mysql|mongodb):\/\/[^:]+:[^@]+@[^\/]+/gi,
        severity: 'high'
      }
    ];

    const files = this.getAllFiles(['.env', '.env.local', '.env.example']);
    
    files.forEach(file => {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        
        secretPatterns.forEach(({ name, pattern, severity }) => {
          const matches = content.match(pattern);
          if (matches) {
            this.addVulnerability(severity, `${name} found in ${file}`);
          }
        });
      }
    });

    console.log('✅ Secret scan completed');
  }

  // Get all files matching patterns
  getAllFiles(patterns) {
    const files = [];
    
    const scan = (dir) => {
      if (!fs.existsSync(dir)) return;
      
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          scan(fullPath);
        } else if (stat.isFile()) {
          patterns.forEach(pattern => {
            if (item.includes(pattern)) {
              files.push(fullPath);
            }
          });
        }
      });
    };
    
    scan('.');
    return files;
  }

  // Add vulnerability to results
  addVulnerability(severity, message, details = '') {
    this.results.vulnerabilities.push({
      severity,
      message,
      details,
      timestamp: new Date().toISOString()
    });
    
    this.results.summary[severity]++;
  }

  // Add warning to results
  addWarning(severity, message, details = '') {
    this.results.warnings.push({
      severity,
      message,
      details,
      timestamp: new Date().toISOString()
    });
  }

  // Generate security report
  async generateReport() {
    console.log('\n📊 Generating security report...');

    const report = {
      scan: {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        platform: 'OptikCoin'
      },
      summary: this.results.summary,
      vulnerabilities: this.results.vulnerabilities,
      warnings: this.results.warnings,
      recommendations: this.generateRecommendations()
    };

    // Save JSON report
    const reportPath = path.join(process.cwd(), 'security-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Generate HTML report
    this.generateHTMLReport(report);

    // Print summary
    this.printSummary();

    console.log(`\n📄 Security report saved to: ${reportPath}`);
    console.log(`📄 HTML report saved to: security-report.html`);
  }

  // Generate recommendations
  generateRecommendations() {
    const recommendations = [];

    if (this.results.summary.critical > 0) {
      recommendations.push({
        priority: 'critical',
        message: 'Address all critical vulnerabilities immediately before deployment'
      });
    }

    if (this.results.summary.high > 0) {
      recommendations.push({
        priority: 'high',
        message: 'Review and fix high-severity issues within 24 hours'
      });
    }

    recommendations.push({
      priority: 'medium',
      message: 'Implement automated security scanning in CI/CD pipeline'
    });

    recommendations.push({
      priority: 'low',
      message: 'Regular security audits and penetration testing'
    });

    return recommendations;
  }

  // Generate HTML report
  generateHTMLReport(report) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OptikCoin Security Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .summary-card { padding: 20px; border-radius: 8px; text-align: center; }
        .critical { background: #fee; border-left: 4px solid #e53e3e; }
        .high { background: #fef5e7; border-left: 4px solid #dd6b20; }
        .medium { background: #fffbeb; border-left: 4px solid #d69e2e; }
        .low { background: #f0fff4; border-left: 4px solid #38a169; }
        .vulnerability { margin: 10px 0; padding: 15px; border-radius: 5px; border-left: 4px solid #ccc; }
        .vulnerability.critical { border-left-color: #e53e3e; background: #fee; }
        .vulnerability.high { border-left-color: #dd6b20; background: #fef5e7; }
        .vulnerability.medium { border-left-color: #d69e2e; background: #fffbeb; }
        .vulnerability.low { border-left-color: #38a169; background: #f0fff4; }
        .timestamp { color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔒 OptikCoin Security Report</h1>
            <p class="timestamp">Generated: ${report.scan.timestamp}</p>
        </div>
        
        <div class="summary">
            <div class="summary-card critical">
                <h3>Critical</h3>
                <h2>${report.summary.critical}</h2>
            </div>
            <div class="summary-card high">
                <h3>High</h3>
                <h2>${report.summary.high}</h2>
            </div>
            <div class="summary-card medium">
                <h3>Medium</h3>
                <h2>${report.summary.medium}</h2>
            </div>
            <div class="summary-card low">
                <h3>Low</h3>
                <h2>${report.summary.low}</h2>
            </div>
        </div>
        
        <h2>🚨 Vulnerabilities</h2>
        ${report.vulnerabilities.map(vuln => `
            <div class="vulnerability ${vuln.severity}">
                <h4>${vuln.message}</h4>
                <p><strong>Severity:</strong> ${vuln.severity.toUpperCase()}</p>
                ${vuln.details ? `<p><strong>Details:</strong> ${vuln.details}</p>` : ''}
                <p class="timestamp">${vuln.timestamp}</p>
            </div>
        `).join('')}
        
        <h2>⚠️ Warnings</h2>
        ${report.warnings.map(warning => `
            <div class="vulnerability ${warning.severity}">
                <h4>${warning.message}</h4>
                <p><strong>Severity:</strong> ${warning.severity.toUpperCase()}</p>
                ${warning.details ? `<p><strong>Details:</strong> ${warning.details}</p>` : ''}
                <p class="timestamp">${warning.timestamp}</p>
            </div>
        `).join('')}
        
        <h2>💡 Recommendations</h2>
        ${report.recommendations.map(rec => `
            <div class="vulnerability ${rec.priority}">
                <p>${rec.message}</p>
            </div>
        `).join('')}
    </div>
</body>
</html>`;

    fs.writeFileSync('security-report.html', html);
  }

  // Print summary to console
  printSummary() {
    console.log('\n📊 Security Scan Summary:');
    console.log('========================');
    console.log(`🔴 Critical: ${this.results.summary.critical}`);
    console.log(`🟠 High: ${this.results.summary.high}`);
    console.log(`🟡 Medium: ${this.results.summary.medium}`);
    console.log(`🟢 Low: ${this.results.summary.low}`);
    console.log(`ℹ️  Info: ${this.results.summary.info}`);

    const total = Object.values(this.results.summary).reduce((a, b) => a + b, 0);
    console.log(`\nTotal Issues: ${total}`);

    if (this.results.summary.critical > 0) {
      console.log('\n❌ CRITICAL ISSUES FOUND - DO NOT DEPLOY TO PRODUCTION');
      process.exit(1);
    } else if (this.results.summary.high > 0) {
      console.log('\n⚠️  HIGH SEVERITY ISSUES FOUND - REVIEW BEFORE DEPLOYMENT');
      process.exit(1);
    } else {
      console.log('\n✅ No critical or high severity issues found');
    }
  }
}

// Run the security scanner
if (require.main === module) {
  const scanner = new SecurityScanner();
  scanner.scan().catch(error => {
    console.error('Security scan failed:', error);
    process.exit(1);
  });
}

module.exports = SecurityScanner;