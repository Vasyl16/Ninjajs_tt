import React from 'react';

export const SearchInput: React.FC<{
  value: string;
  onChange: (val: string) => void;
}> = ({ onChange, value }) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-[18px] bg-input-bg text-input-text w-full rounded-[10px] p-[10px]  shadow-[-30px_-10px_70px_rgba(0,0,0,0.1)] focus:outline-input-outline"
      placeholder="Type to search superhero"
    />
  );
};
