import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { PersonCard } from "./PersonCard";
import type { CastMember, CrewMember } from "../types/movie";

type MovieCastProps = {
  cast: CastMember[];
  crew: CrewMember[];
  director?: CrewMember;
  writers?: CrewMember[];
  topBilledCount?: number;
};

export const MovieCast = ({
  cast,
  crew,
  director,
  writers = [],
  topBilledCount = 8,
}: MovieCastProps) => {
  const topBilledCast = cast.slice(0, topBilledCount);
  const remainingCast = cast.slice(topBilledCount);
  const hasMoreData = remainingCast.length > 0 || crew.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      {director && (
        <div className="mb-8 lg:hidden">
          <h2 className="text-2xl font-bold mb-6">Director</h2>
          <PersonCard person={director} type="crew" />
        </div>
      )}

      {writers.length > 0 && (
        <div className="mb-8 lg:hidden">
          <h2 className="text-2xl font-bold mb-6">Writers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...new Set(writers.map((w) => w.name))].map((name) => {
              const writer = writers.find((w) => w.name === name);
              return writer ? (
                <PersonCard
                  key={writer.credit_id}
                  person={writer}
                  type="crew"
                />
              ) : null;
            })}
          </div>
        </div>
      )}

      {(director || writers.length > 0) && (
        <div className="mb-8 hidden lg:block">
          <div className="grid grid-cols-3 gap-4">
            {director && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Director</h2>
                <PersonCard person={director} type="crew" />
              </div>
            )}

            {writers.length > 0 && (
              <div className={`${director ? "col-span-2" : "col-span-3"}`}>
                <h2 className="text-2xl font-bold mb-6">Writers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[...new Set(writers.map((w) => w.name))].map((name) => {
                    const writer = writers.find((w) => w.name === name);
                    return writer ? (
                      <PersonCard
                        key={writer.credit_id}
                        person={writer}
                        type="crew"
                      />
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Top Cast</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topBilledCast.map((actor) => (
            <PersonCard key={actor.credit_id} person={actor} type="cast" />
          ))}
        </div>
      </div>
      {hasMoreData && (
        <Disclosure>
          {({ open }) => (
            <div>
              <div className="text-center mt-8">
                <DisclosureButton className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer mx-auto">
                  {open ? "Show Less" : "Show All Cast & Crew"}
                  <ChevronDownIcon
                    className={`w-4 h-4 transform transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </DisclosureButton>
              </div>
              <DisclosurePanel className="mt-8 space-y-6">
                {remainingCast.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                      Additional Cast
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {remainingCast.map((actor) => (
                        <PersonCard
                          key={actor.credit_id}
                          person={actor}
                          type="cast"
                        />
                      ))}
                    </div>
                  </div>
                )}
                {crew.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">
                      Crew
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {crew.map((member) => (
                        <PersonCard
                          key={member.credit_id}
                          person={member}
                          type="crew"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </DisclosurePanel>
            </div>
          )}
        </Disclosure>
      )}
    </div>
  );
};
