import { forwardRef } from "react";

export const SearchInput = forwardRef(
  (
    {
      value,
      onChange,
      onClear,
      placeholder,
      className,
      ...props
    }: {
      value: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
      onClear: () => void;
      placeholder?: string;
      className?: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [x: string]: any;
    },
    ref: React.Ref<HTMLInputElement>
  ) => (
    <div className={`relative w-full ${className ?? ""}`}>
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full
          pl-3 pr-10 py-2
          rounded-xl
          border border-border
          bg-background
          text-base
          shadow-sm
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
          transition
        `}
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="
            absolute right-2 top-1/2 -translate-y-1/2
            w-6 h-6 flex items-center justify-center
            text-muted-foreground
            shadow-none
            focus:outline-none focus:ring-2 focus:ring-primary
            cursor-pointer
            z-10
            bg-transparent
          "
          aria-label="Clear"
          tabIndex={0}
        >
          <span className="text-lg leading-none pointer-events-none">
            &times;
          </span>
        </button>
      )}
    </div>
  )
);

SearchInput.displayName = "SearchInput";
