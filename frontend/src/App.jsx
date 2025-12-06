import { useMemo } from "react";
import SearchBar from "./components/SearchBar";
import FiltersPanel from "./components/FiltersPanel";
import SortBar from "./components/SortBar";
import TransactionsTable from "./components/TransactionsTable";
import Pagination from "./components/PaginationControls";
import EmptyState from "./components/EmptyState";
import LoadingState from "./components/LoadingState";
import { useSalesQuery } from "./hooks/useSalesQuery";

export default function App() {
  const {
    result,
    query,
    setQuery,
    loading,
    error,
  } = useSalesQuery({
    search: "",
    customerRegion: [],
    gender: [],
    customerType: [],
    tags: [],
    ageMin: "",
    ageMax: "",
    productCategory: [],
    brand: [],
    priceMin: "",
    priceMax: "",
    quantityMin: "",
    quantityMax: "",
    discountMin: "",
    discountMax: "",
    paymentMethod: [],
    deliveryType: [],
    orderStatus: [],
    storeLocation: [],
    salespersonId: [],
    dateFrom: "",
    dateTo: "",
    sortBy: "date",
    sortDir: "desc",
    page: 1,
    pageSize: 10,
  });

  const activeFiltersCount = useMemo(() => {
    const { search, sortBy, sortDir, page, pageSize, ...filters } = query;
    return Object.values(filters).reduce((count, value) => {
      if (Array.isArray(value)) return count + (value.length ? 1 : 0);
      if (typeof value === "string" && value.trim() !== "") return count + 1;
      return count + (value != null && value !== "" ? 1 : 0);
    }, 0);
  }, [query]);

  const handleQueryChange = (patch) => {
    setQuery((prev) => ({
      ...prev,
      ...patch,
      page: 1, // reset page on most changes
    }));
  };

  const handlePageChange = (page) => {
    setQuery((prev) => ({
      ...prev,
      page,
    }));
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="app-header-left">
          <h1 className="app-title">Retail Sales Management</h1>
          <p className="app-subtitle">
            Search, filter, and analyze sales transactions from the TruEstate dataset.
          </p>
        </div>
        <div className="app-header-right">
          <div className="pill pill-soft">
            <span className="pill-dot" />
            <span className="pill-label">
              {activeFiltersCount ? `${activeFiltersCount} filters active` : "No filters applied"}
            </span>
          </div>
        </div>
      </header>

      <main className="app-main">
        {/* Top search bar */}
        <SearchBar
          value={query.search}
          onChange={(value) => handleQueryChange({ search: value })}
        />

        <div className="layout-grid">
          {/* LEFT: Filters */}
          <aside className="layout-sidebar">
            <FiltersPanel
              query={query}
              onChange={handleQueryChange}
              onClear={() =>
                setQuery((prev) => ({
                  ...prev,
                  customerRegion: [],
                  gender: [],
                  customerType: [],
                  tags: [],
                  ageMin: "",
                  ageMax: "",
                  productCategory: [],
                  brand: [],
                  priceMin: "",
                  priceMax: "",
                  quantityMin: "",
                  quantityMax: "",
                  discountMin: "",
                  discountMax: "",
                  paymentMethod: [],
                  deliveryType: [],
                  orderStatus: [],
                  storeLocation: [],
                  salespersonId: [],
                  dateFrom: "",
                  dateTo: "",
                  page: 1,
                }))
              }
            />
          </aside>

          {/* RIGHT: Sort + Table + Pagination */}
          <section className="layout-content">
            <SortBar
              sortBy={query.sortBy}
              sortDir={query.sortDir}
              onChange={(sortBy, sortDir) =>
                handleQueryChange({ sortBy, sortDir })
              }
              total={result.total}
            />

            {loading && <LoadingState />}

            {!loading && error && (
              <div className="card card-error">
                <p className="error-title">Something went wrong</p>
                <p className="error-message">{error}</p>
              </div>
            )}

            {!loading && !error && !result.data?.length && (
              <EmptyState
                title="No transactions found"
                description="Try adjusting your search, filters, or date range to see more results."
              />
            )}

            {!loading && !error && result.data?.length > 0 && (
              <>
                <TransactionsTable data={result.data} />
                <Pagination
                  page={result.page || 1}
                  totalPages={result.totalPages || 1}
                  total={result.total || 0}
                  pageSize={query.pageSize}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
