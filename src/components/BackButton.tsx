import { ArrowLeftIcon } from "@heroicons/react/24/solid";

type BackButtonProps = {
  onClick: () => void;
};

export const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 text-sm border border-blue-200/60 rounded-lg px-4 py-2 bg-blue-50/90 backdrop-blur-sm hover:bg-blue-100/90 hover:shadow-lg hover:border-blue-300/70 text-blue-700 font-medium transition-all mb-6 cursor-pointer"
      aria-label="Go back to previous page">
      <ArrowLeftIcon className="w-4 h-4" />
      <span>Back</span>
    </button>
  );
};
