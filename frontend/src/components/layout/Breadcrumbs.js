import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const BreadcrumbsSkeleton = () => (
  <nav className="bg-gray-50 py-3 px-4 sm:px-6 lg:px-8">
    <ol className="flex items-center space-x-2">
      <li className="flex items-center">
        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
      </li>
      <li className="flex items-center">
        <ChevronRight size={16} className="text-gray-300" />
        <div className="ml-2 w-16 h-4 bg-gray-200 rounded animate-pulse" />
      </li>
      <li className="flex items-center">
        <ChevronRight size={16} className="text-gray-300" />
        <div className="ml-2 w-20 h-4 bg-gray-200 rounded animate-pulse" />
      </li>
    </ol>
  </nav>
);

const Breadcrumbs = ({ isLoading = false }) => {
  const location = useLocation();
  
  if (isLoading) {
    return <BreadcrumbsSkeleton />;
  }

  const pathnames = location.pathname.split('/').filter(x => x);

  const breadcrumbs = [
    { name: 'Home', path: '/' }
  ];

  let currentPath = '';

  pathnames.forEach((value, index) => {
    currentPath += `/${value}`;

    if (value === 'stations' && index === 0) {
      breadcrumbs.push({ name: 'Stations', path: currentPath });
    } else if (value === 'add' && pathnames[index - 1] === 'stations') {
      breadcrumbs.push({ name: 'Add Station', path: currentPath });
    } else if (value === 'edit' && pathnames[index - 1] === 'stations') {
      // Skip
    } else if (pathnames[index - 1] === 'edit' && pathnames[index - 2] === 'stations') {
      breadcrumbs.push({ name: 'Edit Station', path: currentPath });
    } else if (value === 'map') {
      breadcrumbs.push({ name: 'Map', path: currentPath });
    } else if (currentPath.match(/^\/stations\/[^\/]+$/) && !value.match(/^(add|edit)$/)) {
      breadcrumbs.push({ name: 'Station Details', path: currentPath });
    }
  });

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="bg-gray-50 py-3 px-4 sm:px-6 lg:px-8">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.path} className="flex items-center">
            {index === 0 ? (
              <Link to={breadcrumb.path} className="text-gray-500 hover:text-gray-700">
                <Home size={16} />
                <span className="sr-only">Home</span>
              </Link>
            ) : (
              <>
                <ChevronRight size={16} className="text-gray-400" />
                <Link
                  to={breadcrumb.path}
                  className={`ml-2 text-sm font-medium ${
                    index === breadcrumbs.length - 1
                      ? 'text-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {breadcrumb.name}
                </Link>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;