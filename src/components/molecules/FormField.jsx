import Label from '../atoms/Label';
import Input from '../atoms/Input';

const FormField = ({ label, id, type = 'text', error, ...props }) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        className={error ? 'border-red-500' : ''}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormField; 