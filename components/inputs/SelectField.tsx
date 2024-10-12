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
  label: string;
  options: {
    id: string;
    name: string;
  }[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
};


export const SelectField = ({
  name, 
  label, 
  options, 
  placeholder, 
  value, 
  defaultValue
}: ISelectField) => {
  return (
    <div className='grid w-full items-center gap-1.5'>
      <Label htmlFor={name}>
        {label}
      </Label>
      <Select 
        name={name} 
        value={value} 
        defaultValue={defaultValue}
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