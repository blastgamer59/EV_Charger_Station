import React, { useState } from "react";
import { useStations } from "../context/StationsContext";
import StationCard from "../stations/StationCard";
import StationTable from "../stations/StationTable";
import StationFilters from "../stations/StationFiltersPanel";
import StationViewSelector from "../stations/StationViewSelector";
import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { Plus, RefreshCw } from "lucide-react";
import { SkeletonList, SkeletonCard, SkeletonTable, SkeletonFilters } from "../ui/Skeleton";

const StationsList = () => {
  const {
    filteredStations,
    filters,
    setFilters,
    viewMode,
    setViewMode,
    fetchStations,
    deleteStation,
    isLoading,
  } = useStations();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredStations.length / itemsPerPage);

  const defaultFilters = {
    status: [],
    connectorTypes: [],
    powerOutputMin: 0,
    powerOutputMax: 500,
    searchQuery: "",
  };

  const handleRefresh = async () => {
    await fetchStations();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show full page skeleton on initial load
  if (isLoading && filteredStations.length === 0) {
    return <SkeletonList />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Charging Stations
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor all your EV charging stations
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button
            variant="outline"
            icon={<RefreshCw size={16} />}
            onClick={handleRefresh}
            isLoading={isLoading}
          >
            Refresh
          </Button>
          <Button
            variant="outline"
            icon={<RefreshCw size={16} />}
            onClick={() => setFilters(defaultFilters)}
          >
            Reset Filters
          </Button>
          <Link to="/stations/add">
            <Button variant="primary" icon={<Plus size={16} />}>
              Add Station
            </Button>
          </Link>
        </div>
      </div>

      {/* Show skeleton filters if loading, otherwise show real filters */}
      {isLoading && filteredStations.length === 0 ? (
        <SkeletonFilters />
      ) : (
        <StationFilters filters={filters} onChange={setFilters} />
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="mb-4 sm:mb-0">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
            to{" "}
            <span className="font-medium">
              {indexOfLastItem > filteredStations.length
                ? filteredStations.length
                : indexOfLastItem}
            </span>{" "}
            of <span className="font-medium">{filteredStations.length}</span>{" "}
            stations
          </p>
        </div>

        <StationViewSelector currentView={viewMode} onChange={setViewMode} />
      </div>

      {/* Content area with skeleton support */}
      {isLoading && filteredStations.length === 0 ? (
        // Show skeleton content on initial load
        viewMode === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="mb-8">
            <SkeletonTable rows={6} />
          </div>
        )
      ) : viewMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentItems.map((station) => (
            <StationCard key={station.id} station={station} />
          ))}
        </div>
      ) : (
        <div className="mb-8">
          <StationTable stations={currentItems} onDelete={deleteStation} />
        </div>
      )}

      {/* Pagination - only show if not loading or have data */}
      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === page
                    ? "text-green-600 border-green-500 z-10"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}

      {/* Empty state - only show if not loading and no data */}
      {!isLoading && filteredStations.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 mb-4">
            No charging stations found matching your criteria.
          </p>
          <Button
            variant="outline"
            size="sm"
            icon={<RefreshCw size={16} />}
            onClick={() => setFilters(defaultFilters)}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default StationsList;