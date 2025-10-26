import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/libs/utils';

const selectVariants = cva(
  'flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input bg-background text-foreground focus-visible:ring-ring/50',
        white:
          'bg-white text-black border-gray-200 placeholder:text-gray-500 focus-visible:ring-[3px] focus-visible:ring-blue-500',
        ghost:
          'bg-transparent border-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-ring/50 focus-visible:border-ring',
        destructive:
          'border-destructive/70 focus-visible:ring-destructive/50 dark:focus-visible:ring-destructive/30 aria-invalid:border-destructive',
      },
      size: {
        sm: 'h-8 text-sm px-2',
        default: 'h-9 text-sm px-3',
        lg: 'h-10 text-base px-4',
      },
      isInvalid: {
        true: 'border-destructive focus-visible:ring-destructive/50',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  disabled?: boolean;
}

const SelectContext = React.createContext<SelectContextValue>({});

interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Select = ({ value, defaultValue, onValueChange, disabled, children }: SelectProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange],
  );

  return (
    <SelectContext.Provider value={{ value: currentValue, onValueChange: handleValueChange, disabled }}>
      {children}
    </SelectContext.Provider>
  );
};

interface SelectTriggerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof selectVariants> {
  children?: React.ReactNode;
}

const SelectTrigger = React.forwardRef<HTMLDivElement, SelectTriggerProps>(
  ({ className, variant, size, isInvalid, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        {children}
      </div>
    );
  },
);
SelectTrigger.displayName = 'SelectTrigger';

interface SelectValueProps {
  placeholder?: string;
}

const SelectValue = ({ placeholder }: SelectValueProps) => {
  const { value } = React.useContext(SelectContext);
  return <span>{value || placeholder}</span>;
};

interface SelectContentProps extends VariantProps<typeof selectVariants> {
  children: React.ReactNode;
  className?: string;
}

const SelectContent = ({ children, variant, size, isInvalid, className }: SelectContentProps) => {
  const { value, onValueChange, disabled } = React.useContext(SelectContext);

  const items = React.Children.toArray(children);

  return (
    <select
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      disabled={disabled}
      className={cn(selectVariants({ variant, size, isInvalid }), 'appearance-none cursor-pointer pr-8', className)}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.5rem center',
        backgroundSize: '1.25rem',
      }}
    >
      {items}
    </select>
  );
};

interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  value: string;
  children: React.ReactNode;
}

const SelectItem = React.forwardRef<HTMLOptionElement, SelectItemProps>(({ value, children, ...props }, ref) => {
  return (
    <option ref={ref} value={value} {...props}>
      {children}
    </option>
  );
});
SelectItem.displayName = 'SelectItem';

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
