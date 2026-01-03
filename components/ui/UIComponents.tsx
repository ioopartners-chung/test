import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

// --- Badge ---
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'danger' | 'neutral' | 'critical' | 'high' | 'brand';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const baseStyle = "inline-flex items-center px-2 py-0.5 rounded text-[10px] md:text-[11px] font-semibold leading-4 uppercase tracking-wide whitespace-nowrap";
  const variants = {
    default: "bg-indigo-50 text-indigo-700 border border-indigo-100",
    brand: "bg-primary-50 text-primary-700 border border-primary-100",
    outline: "bg-white border border-slate-200 text-slate-600",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border border-amber-100",
    danger: "bg-rose-50 text-rose-700 border border-rose-100",
    critical: "bg-rose-100 text-rose-800 border border-rose-200",
    high: "bg-orange-100 text-orange-800 border border-orange-200",
    neutral: "bg-slate-100 text-slate-600 border border-slate-200",
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// --- Status Badge (Pill) ---
export const StatusBadge: React.FC<{ status: 'PASS' | 'FAIL' | 'REVIEW' }> = ({ status }) => {
  const styles = {
    PASS: "text-emerald-700 bg-emerald-50 border-emerald-200",
    FAIL: "text-rose-700 bg-rose-50 border-rose-200",
    REVIEW: "text-amber-700 bg-amber-50 border-amber-200",
  };
  
  const icon = {
    PASS: "✓",
    FAIL: "!",
    REVIEW: "?",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${styles[status]}`}>
      <span className="mr-1.5">{icon[status]}</span> {status}
    </span>
  );
}

// --- ProgressBar ---
interface ProgressBarProps {
    value: number;
    max?: number;
    color?: string;
    height?: string;
    className?: string;
    showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, max = 100, color = 'bg-blue-600', height = 'h-1.5', className = '', showLabel = false }) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    return (
        <div className={`w-full ${className}`}>
            <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${height}`}>
                <div 
                    className={`${color} ${height} rounded-full transition-all duration-500`} 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            {showLabel && <div className="text-[10px] text-slate-400 mt-1 text-right">{percentage.toFixed(1)}%</div>}
        </div>
    );
};

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'excel';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon,
  className = '', 
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-500 shadow-sm border border-transparent",
    secondary: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-slate-200 shadow-sm",
    outline: "bg-transparent border border-slate-300 text-slate-600 hover:bg-slate-50 focus:ring-slate-200",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent",
    danger: "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 shadow-sm border border-transparent",
    excel: "bg-[#1D6F42] text-white hover:bg-[#155431] focus:ring-[#1D6F42] shadow-sm border border-transparent", 
  };

  const sizes = {
    xs: "px-2 py-1 text-[10px]",
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {Icon && <Icon className={`w-3.5 h-3.5 ${children ? 'mr-1.5' : ''}`} />}
      {children}
    </button>
  );
};

// --- Card ---
export const Card: React.FC<{ children: React.ReactNode; className?: string; noPadding?: boolean }> = ({ children, className = '', noPadding = false }) => (
  <div className={`bg-white rounded-lg border border-slate-200 shadow-[0_1px_3px_0_rgb(0,0,0,0.02)] ${className}`}>
    {children}
  </div>
);

// --- Trend Indicator ---
export const TrendIndicator: React.FC<{ value: number; type?: 'percentage' | 'value'; inverse?: boolean }> = ({ value, type = 'percentage', inverse = false }) => {
    const isPositive = value > 0;
    const isNeutral = value === 0;
    
    // Logic: Usually Positive is Green. Inverse (e.g., Cost) Positive is Red.
    let colorClass = isPositive ? 'text-emerald-600' : 'text-rose-600';
    if (inverse) colorClass = isPositive ? 'text-rose-600' : 'text-emerald-600';
    if (isNeutral) colorClass = 'text-slate-400';

    const Icon = isNeutral ? Minus : (isPositive ? ArrowUpRight : ArrowDownRight);

    return (
        <div className={`flex items-center text-xs font-medium ${colorClass}`}>
            <Icon className="w-3 h-3 mr-0.5" />
            {Math.abs(value)}{type === 'percentage' ? '%' : ''}
        </div>
    );
};

// --- Data Metric (New) ---
// Standardized display for financial metrics with label, value, and optional context
interface DataMetricProps {
    label: string;
    value: React.ReactNode;
    subValue?: React.ReactNode;
    className?: string;
    align?: 'left' | 'right';
}

export const DataMetric: React.FC<DataMetricProps> = ({ label, value, subValue, className = '', align = 'left' }) => (
    <div className={`flex flex-col ${align === 'right' ? 'items-end text-right' : 'items-start text-left'} ${className}`}>
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-0.5">{label}</span>
        <span className="text-lg md:text-xl font-bold text-slate-900 tracking-tight leading-none">{value}</span>
        {subValue && <span className="text-[11px] text-slate-400 mt-1">{subValue}</span>}
    </div>
);


// --- KPI Card (Refined) ---
interface KPICardProps {
  label: string;
  value: string;
  subValue?: string;
  subLabel?: string;
  status?: 'PASS' | 'FAIL' | 'REVIEW' | 'NONE';
  trend?: number; // percentage change
  trendInverse?: boolean;
}

export const KPICard: React.FC<KPICardProps> = ({ label, value, subValue, subLabel, status = 'NONE', trend, trendInverse }) => {
  return (
    <div className="p-4 rounded-lg border border-slate-200 bg-white shadow-sm flex flex-col justify-between h-full relative overflow-hidden group hover:border-indigo-300 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
        {status !== 'NONE' && <StatusBadge status={status} />}
      </div>
      <div>
        <div className={`text-2xl font-bold tracking-tight ${status === 'PASS' ? 'text-emerald-700' : status === 'FAIL' ? 'text-rose-700' : 'text-slate-900'}`}>
          {value}
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50">
             {(subValue || subLabel) && (
              <div className="text-[11px] text-slate-500">
                 {subLabel && <span className="mr-1">{subLabel}</span>}
                 <span className="font-medium">{subValue}</span>
              </div>
            )}
            {trend !== undefined && <TrendIndicator value={trend} inverse={trendInverse} />}
        </div>
       
      </div>
    </div>
  );
};

// --- Input ---
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className={`block w-full rounded-md border-slate-300 border px-3 py-1.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-slate-400 transition-shadow ${props.className || ''}`}
  />
);

// --- Segmented Control ---
interface SegmentedControlProps {
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, value, onChange, className = '' }) => (
    <div className={`flex p-1 space-x-1 bg-slate-100 rounded-lg ${className}`}>
        {options.map((option) => (
            <button
                key={option.value}
                onClick={() => onChange(option.value)}
                className={`flex-1 px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    value === option.value
                        ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                        : 'text-slate-500 hover:text-slate-700'
                }`}
            >
                {option.label}
            </button>
        ))}
    </div>
);
