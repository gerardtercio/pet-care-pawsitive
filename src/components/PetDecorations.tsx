import React from 'react';

interface PawProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  opacity?: number;
}

export const PawPrint: React.FC<PawProps> = ({ size = 'medium', className = '', opacity = 0.2 }) => {
  const sizes = {
    small: 'w-5 h-5',
    medium: 'w-9 h-9',
    large: 'w-12 h-12'
  };

  return (
    <svg
      className={`${sizes[size]} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <ellipse cx="12" cy="16" rx="4" ry="5" fill="#5B9BD5" />
      <ellipse cx="8" cy="10" rx="2.5" ry="3" fill="#5B9BD5" />
      <ellipse cx="12" cy="8" rx="2.5" ry="3" fill="#5B9BD5" />
      <ellipse cx="16" cy="10" rx="2.5" ry="3" fill="#5B9BD5" />
    </svg>
  );
};

export const BoneIcon: React.FC<{ className?: string; opacity?: number }> = ({ 
  className = '', 
  opacity = 0.2 
}) => {
  return (
    <svg
      className={`w-10 h-5 ${className}`}
      viewBox="0 0 40 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <path
        d="M7 10C7 7.5 5.5 6 3.5 6C1.5 6 0 7.5 0 10C0 12.5 1.5 14 3.5 14C5.5 14 7 12.5 7 10ZM33 10C33 7.5 34.5 6 36.5 6C38.5 6 40 7.5 40 10C40 12.5 38.5 14 36.5 14C34.5 14 33 12.5 33 10ZM7 10H33"
        stroke="#5B9BD5"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="3.5" cy="10" r="2.5" fill="#5B9BD5" />
      <circle cx="36.5" cy="10" r="2.5" fill="#5B9BD5" />
    </svg>
  );
};

export const HeartPaw: React.FC<{ className?: string; opacity?: number }> = ({ 
  className = '', 
  opacity = 0.2 
}) => {
  return (
    <svg
      className={`w-11 h-11 ${className}`}
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <path
        d="M22.5 38C22.5 38 5 28 5 16C5 10 9 6 13.5 6C17 6 20 8 22.5 11C25 8 28 6 31.5 6C36 6 40 10 40 16C40 28 22.5 38 22.5 38Z"
        fill="#87CEEB"
      />
      <ellipse cx="22.5" cy="22" rx="2.5" ry="3" fill="#5B9BD5" />
      <ellipse cx="19.5" cy="18" rx="1.5" ry="2" fill="#5B9BD5" />
      <ellipse cx="22.5" cy="17" rx="1.5" ry="2" fill="#5B9BD5" />
      <ellipse cx="25.5" cy="18" rx="1.5" ry="2" fill="#5B9BD5" />
    </svg>
  );
};

export const DecorativeCircle: React.FC<{ 
  size?: number; 
  className?: string; 
  opacity?: number;
  gradient?: boolean;
}> = ({ 
  size = 100, 
  className = '', 
  opacity = 0.1,
  gradient = false
}) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      {gradient && (
        <defs>
          <linearGradient id={`gradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#5B9BD5" />
          </linearGradient>
        </defs>
      )}
      <circle 
        cx={size / 2} 
        cy={size / 2} 
        r={size / 2} 
        fill={gradient ? `url(#gradient-${size})` : '#87CEEB'} 
      />
    </svg>
  );
};

export const PawDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-4 my-8 ${className}`}>
      <PawPrint size="small" opacity={0.15} className="rotate-12" />
      <PawPrint size="small" opacity={0.2} className="-rotate-12" />
      <PawPrint size="small" opacity={0.25} />
      <PawPrint size="small" opacity={0.2} className="rotate-12" />
      <PawPrint size="small" opacity={0.15} className="-rotate-12" />
    </div>
  );
};

export const FloatingPaw: React.FC<PawProps & { delay?: number }> = ({ 
  size = 'small', 
  className = '', 
  opacity = 0.15,
  delay = 0
}) => {
  return (
    <div
      className={`animate-float ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: '3.5s'
      }}
    >
      <PawPrint size={size} opacity={opacity} />
    </div>
  );
};
