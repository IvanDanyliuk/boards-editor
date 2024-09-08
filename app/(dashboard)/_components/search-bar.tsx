'use client'; 

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'


export const Searchbar = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>(['a', 'b', 'c']);

  return (
    <Popover open={Boolean(searchValue)}>
      <PopoverTrigger asChild>
        <div className='px-3 py-1 flex items-center gap-3 bg-white border rounded-md'>
          <Search className='text-secondary-text' />
          <Input className='h-[30px] border-none' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        {searchResults.map(item => (
          <p key={crypto.randomUUID()}>
            {item}
          </p>
        ))}
      </PopoverContent>
    </Popover>
  );
};