import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ActorCard } from "./ActorCard";
import type { CastMember } from "../types/movie";

type MovieCastProps = {
  cast: CastMember[];
  topBilledCount?: number;
};

export const MovieCast = ({ cast, topBilledCount = 8 }: MovieCastProps) => {
  const topBilledCast = cast.slice(0, topBilledCount);
  const hasMoreCast = cast.length > topBilledCount;

  return (
    <div className="mt-12 pt-8 border-t">
      <h2 className="text-lg font-medium mb-4">Cast</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {topBilledCast.map((actor) => (
          <ActorCard key={actor.credit_id} actor={actor} />
        ))}
      </div>
      {hasMoreCast && (
        <Disclosure>
          <div className="text-center mt-6">
            <DisclosureButton className="border rounded-md px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
              Show Full Cast
            </DisclosureButton>
          </div>
          <DisclosurePanel className="mt-8">
            <h3 className="text-base font-medium mb-3">Full Cast</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {cast.map((actor) => (
                <ActorCard key={actor.credit_id} actor={actor} />
              ))}
            </div>
          </DisclosurePanel>
        </Disclosure>
      )}
    </div>
  );
};
