const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-green-600 hover:bg-green-700 text-white border-transparent focus:ring-green-500';
      case 'secondary':
        return 'bg-blue-600 hover:bg-blue-700 text-white border-transparent focus:ring-blue-500';
      case 'success':
        return 'bg-green-500 hover:bg-green-600 text-white border-transparent focus:ring-green-500';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white border-transparent focus:ring-red-500';
      case 'warning':
        return 'bg-amber-500 hover:bg-amber-600 text-white border-transparent focus:ring-amber-500';
      case 'outline':
        return 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300 focus:ring-blue-500';
      default:
        return 'bg-green-600 hover:bg-green-700 text-white border-transparent focus:ring-green-500';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2.5 py-1.5 text-xs';
      case 'lg':
        return 'px-6 py-3 text-base';
      case 'md':
      default:
        return 'px-4 py-2 text-sm';
    }
  };

  const baseClasses =
    'inline-flex items-center justify-center border rounded-md font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ease-in-out';
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || isLoading ? 'opacity-60 cursor-not-allowed' : '';

  const variantClasses = getVariantClasses();
  const sizeClasses = getSizeClasses();

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${disabledClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
              3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {icon && iconPosition === 'left' && !isLoading && <span className="mr-2">{icon}</span>}

      {children}

      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
