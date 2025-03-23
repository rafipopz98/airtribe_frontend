import * as React from "react";

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`border rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    />
  );
});
Input.displayName = "Input";

export const Label = ({ className, ...props }) => {
  return (
    <label
      className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`}
      {...props}
    />
  );
};

export const Button = ({ className, children, ...props }) => {
  return (
    <button
      className={`bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
