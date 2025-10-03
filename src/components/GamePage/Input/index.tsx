interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <input
      type='text'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#ff7d00] focus:border-[#ff7d00] ${className}`}
      aria-label='Recherche de jeu'
    />
  );
};

export default Input;
