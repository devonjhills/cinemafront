import { ArrowLeftIcon } from "@heroicons/react/24/solid";

type BackButtonProps = {
  onClick: () => void;
};

export const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 text-sm border rounded-md px-3 py-1 hover:bg-gray-50 transition-colors mb-6 cursor-pointer"
      aria-label="Go back to previous page">
      <ArrowLeftIcon className="w-4 h-4" />
      <span>Back</span>
    </button>
  );
};
