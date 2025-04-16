// creation d'un champs de saisie reutilisable 
const Input = ({ type = 'text', className = '', ...props }) => {
const baseClasses = 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500';
  
  if (type === 'textarea') {
    return (
      <textarea
        className={`${baseClasses} ${className}`}
        {...props}
      />
    );
  }

  return (
    <input
      type={type}
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
};

export default Input; 