import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";

const inputVariants = cva(
  "flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-input bg-background text-foreground focus-visible:ring-ring/50",
        white:
          "bg-white text-black border-gray-200 placeholder:text-gray-500 focus-visible:ring-[3px] focus-visible:ring-blue-500",
        ghost:
          "bg-transparent border-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-ring/50 focus-visible:border-ring",
        destructive:
          "border-destructive/70 focus-visible:ring-destructive/50 dark:focus-visible:ring-destructive/30 aria-invalid:border-destructive",
      },
      size: {
        sm: "h-8 text-sm px-2",
        default: "h-9 text-sm px-3",
        lg: "h-10 text-base px-4",
      },
      isInvalid: {
        true: "border-destructive focus-visible:ring-destructive/50",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, isInvalid, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({ variant, size, isInvalid }),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
