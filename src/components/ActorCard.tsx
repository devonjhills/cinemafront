import { UserCircleIcon } from "@heroicons/react/24/solid";
import { getImageUrl } from "../api/tmdbApi";
import type { CastMember } from "../types/movie";

export const ActorCard = ({ actor }: { actor: CastMember }) => {
  const profileUrl = actor.profile_path
    ? getImageUrl(actor.profile_path, "w200")
    : null;
  return (
    <div className="text-center">
      <div className="w-24 h-32 mx-auto border rounded-lg overflow-hidden">
        {profileUrl ? (
          <img
            src={profileUrl}
            alt={actor.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <UserCircleIcon className="w-14 h-14 text-gray-400" />
          </div>
        )}
      </div>
      <p className="mt-2 text-sm font-medium">{actor.name}</p>
      <p className="text-xs text-gray-500">{actor.character}</p>
    </div>
  );
};
