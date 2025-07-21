import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ActorCard } from "./ActorCard";
import type { CastMember } from "../types/movie";

type MovieCastProps = {
  cast: CastMember[];
  topBilledCount?: number;
};

export const MovieCast = ({ cast, topBilledCount = 8 }: MovieCastProps) => {
  const topBilledCast = cast.slice(0, topBilledCount);
  const remainingCast = cast.slice(topBilledCount);
  const hasMoreCast = remainingCast.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <h2 className="text-2xl font-bold mb-6">Top Cast</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {topBilledCast.map((actor) => (
          <ActorCard key={actor.credit_id} actor={actor} />
        ))}
      </div>
      {hasMoreCast && (
        <Disclosure>
          {({ open }) => (
            <div>
              <div className="text-center mt-8">
                <DisclosureButton className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer mx-auto">
                  {open ? "Show Less Cast" : "Show More Cast"}
                  <ChevronDownIcon
                    className={`w-4 h-4 transform transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </DisclosureButton>
              </div>
              <DisclosurePanel className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Additional Cast
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                  {remainingCast.map((actor) => (
                    <ActorCard key={actor.credit_id} actor={actor} />
                  ))}
                </div>
              </DisclosurePanel>
            </div>
          )}
        </Disclosure>
      )}
    </div>
  );
};
