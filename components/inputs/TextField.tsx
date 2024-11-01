import { ChangeEvent } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';


interface ITextField {
  label: string;
  name: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};


export const TextField = ({
  label, 
  name, 
  type = 'text',
  value, 
  defaultValue, 
  onChange
}: ITextField) => {
  return (
    <div className='grid w-full items-center gap-1.5'>
      <Label htmlFor={name}>
        {label}
      </Label>
      <Input 
        id={name}
        name={name} 
        type={type}
        value={value}
        defaultValue={defaultValue} 
        onChange={onChange}
      />
    </div>
  );
};