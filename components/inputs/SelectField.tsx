import clsx from 'clsx';
import { Label } from '../ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';


interface ISelectField {
  name: string;
  label?: string;
  options: {
    id: string;
    name: string;
  }[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
};


export const SelectField = ({
  name, 
  label, 
  options, 
  placeholder, 
  value, 
  defaultValue,
  disabled,
  onChange,
  className
}: ISelectField) => {
  return (
    <div className={clsx(
      'grid items-center gap-1.5',
      className || 'w-full'
    )}>
      {label && (
        <Label htmlFor={name}>
          {label}
        </Label>
      )}
      <Select 
        name={name} 
        value={value} 
        disabled={disabled}
        defaultValue={defaultValue}
        onValueChange={onChange}
      >
        <SelectTrigger>
          <SelectValue 
            placeholder={placeholder} 
            defaultValue={defaultValue} 
          />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem 
              key={crypto.randomUUID()} 
              value={option.id}
            >
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};