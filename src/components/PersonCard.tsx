import { UserCircleIcon } from "@heroicons/react/24/solid";
import { getImageUrl } from "../api/tmdbApi";
import type { CastMember, CrewMember } from "../types/movie";

type PersonCardProps = {
  person: CastMember | CrewMember;
  type: "cast" | "crew";
};

export const PersonCard = ({ person, type }: PersonCardProps) => {
  const profileUrl = person.profile_path
    ? getImageUrl(person.profile_path, "w200")
    : null;

  const subtitle =
    type === "cast"
      ? (person as CastMember).character
      : (person as CrewMember).job;

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex-shrink-0">
        {profileUrl ? (
          <img
            src={profileUrl}
            alt={person.name}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-full">
            <UserCircleIcon className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900 truncate">
          {person.name}
        </p>
        <p className="text-xs text-gray-500 truncate">{subtitle}</p>
      </div>
    </div>
  );
};
