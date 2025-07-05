import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Loader } from 'lucide-react';

interface CTAButtonProps {
  to?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  external?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  endpoint?: string;
  webhook?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({
  to,
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  icon,
  external = false,
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  fullWidth = false,
  endpoint,
  webhook,
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0F1113] relative overflow-hidden';
  
  const variantClasses = {
    primary: 'bg-[#007BFF] hover:bg-[#00D1FF] text-white shadow-lg hover:shadow-[#007BFF]/25 focus:ring-[#007BFF]',
    secondary: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25 focus:ring-purple-500',
    outline: 'bg-transparent border-2 border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white backdrop-blur-sm focus:ring-[#007BFF]',
    ghost: 'bg-transparent text-[#A9B2BC] hover:text-[#F1F3F5] hover:bg-[#007BFF]/10 focus:ring-[#007BFF]',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
    xl: 'px-10 py-5 text-xl rounded-2xl',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  const handleClick = async (e: React.MouseEvent) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }

    // Handle webhook calls
    if (webhook) {
      try {
        await fetch(webhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'button_click',
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
          }),
        });
      } catch (error) {
        console.error('Webhook call failed:', error);
      }
    }

    // Handle API endpoint calls
    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
          body: JSON.stringify({
            action: 'cta_click',
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error('Endpoint call failed:', error);
      }
    }

    if (onClick) {
      onClick();
    }
  };

  const content = (
    <>
      {loading && (
        <Loader className="w-4 h-4 mr-2 animate-spin" />
      )}
      {!loading && icon && <span className="mr-2">{icon}</span>}
      <span>{children}</span>
      {!loading && !icon && (external ? <ExternalLink className="ml-2 w-4 h-4" /> : <ArrowRight className="ml-2 w-4 h-4" />)}
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -top-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 transition-transform duration-1000 group-hover:translate-x-full"></div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={`${classes} group`}
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={`${classes} group`} onClick={handleClick}>
        {content}
      </Link>
    );
  }

  return (
    <button 
      type={type}
      className={`${classes} group`} 
      onClick={handleClick} 
      disabled={disabled || loading}
    >
      {content}
    </button>
  );
};

export default CTAButton;