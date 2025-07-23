import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type Category = {
  value: string;
  label: string;
};

type CategorySelectorProps = {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
};

/**
 * A dropdown selector for movie categories with keyboard and screen reader support.
 *
 * @param categories - Available movie category options to display
 * @param value - Currently selected category
 * @param onChange - Callback when user selects a different category
 * @returns Accessible dropdown using HeadlessUI Listbox component
 */
export const CategorySelector = ({
  categories,
  value,
  onChange,
}: CategorySelectorProps) => {
  const selectedCategory = categories.find(
    (category) => category.value === value
  );

  return (
    <div>
      <h2 className="text-sm font-medium text-gray-700 mb-3">
        Browse curated lists
      </h2>
      <div className="min-w-[200px]">
        <Listbox value={value} onChange={onChange}>
          <div className="relative">
            <ListboxButton
              aria-label="Select movie category"
              className="relative w-full rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <span className="block truncate">
                {selectedCategory?.label || "Popular"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
              </span>
            </ListboxButton>
            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {categories.map((category) => (
                <ListboxOption
                  key={category.value}
                  value={category.value}
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
                      {category.label}
                    </span>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>
    </div>
  );
};
