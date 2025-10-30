import { cn } from "@/libs/utils";
import React from "react";

const TextArea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "resize-none flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

TextArea.displayName = "TextArea";

export { TextArea };