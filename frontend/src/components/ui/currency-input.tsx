import { forwardRef, useState, useEffect } from 'react';
import { Input } from './input';
import { cn } from '@/libs/utils';

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'type' | 'size'> {
  value: number;
  onChange: (value: number) => void;
  currency?: string;
  isInvalid?: boolean;
  size?: 'default' | 'sm' | 'lg';
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value, onChange, currency = 'VND', isInvalid, className, disabled, placeholder, size, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState('');

    const formatNumber = (num: number): string => {
      if (num === 0) return '';
      return num.toLocaleString('vi-VN');
    };

    const parseNumber = (str: string): number => {
      const cleaned = str.replace(/[^\d]/g, '');
      return cleaned === '' ? 0 : parseInt(cleaned, 10);
    };

    useEffect(() => {
      setDisplayValue(formatNumber(value));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
    const numericValue = parseNumber(inputValue);
      
      setDisplayValue(formatNumber(numericValue));
      
      onChange(numericValue);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.select();
    };

    return (
      <div className="relative">
        <Input
          ref={ref}
          type="text"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          isInvalid={isInvalid}
          disabled={disabled}
          placeholder={placeholder || '0'}
          size={size}
          className={cn('pr-12', className)}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span className="text-sm text-muted-foreground font-medium">{currency}</span>
        </div>
      </div>
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';

