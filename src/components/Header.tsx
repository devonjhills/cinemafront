import { useLocation, Link } from "react-router-dom";
import { FilmIcon, HomeIcon, PlayIcon, StarIcon } from '@heroicons/react/24/outline'

export const Header = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category') || 'popular';

  const navItems = [
    { key: 'home', label: 'Home', icon: HomeIcon, href: '/' },
    { key: 'now_playing', label: 'Now Playing', icon: PlayIcon, href: '/?category=now_playing' },
    { key: 'top_rated', label: 'Top Rated', icon: StarIcon, href: '/?category=top_rated' }
  ];

  const isActive = (item: typeof navItems[0]) => {
    if (item.key === 'home') {
      return location.pathname === '/' && (currentCategory === 'popular' || !searchParams.get('category'));
    }
    return location.pathname === '/' && currentCategory === item.key;
  };

  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FilmIcon className="w-6 h-6" />
            <h1 className="text-xl font-medium">CinemaFront</h1>
          </div>
          <nav>
            <div className="flex space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item);
                return (
                  <Link
                    key={item.key}
                    to={item.href}
                    className={`flex items-center gap-1 text-sm pb-1 border-b-2 transition-colors ${
                      active
                        ? 'text-black border-black'
                        : 'text-gray-500 border-transparent hover:text-black'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};