import { SelectHTMLAttributes } from 'react';

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: {
    value: any;
    label: string;
  }[];
}

export default function Dropdown({ options, ...props }: DropdownProps) {
  return (
    <select
      className="bg-neutral-200 border-none rounded-xl outline-none focus:outline-none focus:ring-0 font-semibold text-[0.625rem] py-0.5 text-neutral-700 w-auto"
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
