import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import {
  ChevronDownIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/20/solid";
import { sortOptions, type SortOption } from "../utils/movieSorting";

interface MovieSorterProps {
  sortBy: SortOption;
  onChange: (option: SortOption) => void;
}

export const MovieSorter = ({ sortBy, onChange }: MovieSorterProps) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <Bars3BottomLeftIcon className="h-4 w-4 text-gray-500" />
      <span className="text-sm text-gray-700">Sort by:</span>
      <Listbox value={sortBy} onChange={onChange}>
        <div className="relative">
          <ListboxButton className="relative rounded-lg border border-gray-300 bg-white py-1.5 pl-3 pr-8 text-left text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[140px]">
            <span className="block truncate">{sortBy.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon className="h-4 w-4 text-gray-400" />
            </span>
          </ListboxButton>
          <ListboxOptions className="absolute right-0 z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {sortOptions.map((option) => (
              <ListboxOption
                key={option.value}
                value={option}
                className={({ focus }) =>
                  `relative cursor-pointer select-none py-2 pl-3 pr-9 ${
                    focus ? "bg-blue-600 text-white" : "text-gray-900"
                  }`
                }>
                {({ selected }) => (
                  <span
                    className={`block truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}>
                    {option.name}
                  </span>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
};
