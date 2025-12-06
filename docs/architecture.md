# Architecture Document

## 1. Backend Architecture

### 1.1 Overview
The backend is a Node.js + Express based API that loads the TruEstate retail dataset from a CSV file and exposes a single endpoint `/api/sales` to perform **search**, **filtering**, **sorting**, and **pagination**.  
The data is parsed at startup and stored in-memory for fast querying.

### 1.2 Backend Folder Structure
backend/
src/
controllers/
salesController.js
data/
sales.csv (ignored in Git)
models/
salesRecord.js
routes/
salesRoutes.js
services/
salesService.js
utils/
csvLoader.js
parseFilters.js
index.js

### 1.3 Module Responsibilities

#### `index.js`
- Initializes Express application.
- Loads CSV into memory using `csvLoader.js`.
- Stores parsed data with `setSalesData()` in the service layer.
- Configures middleware (`cors`, `express.json`).
- Mounts routes (`/api/sales`).
- Starts server on configured PORT.

#### `controllers/salesController.js`
- Receives HTTP requests.
- Uses `parseFilters(req.query)` to convert User Query → Typed Filter Object.
- Calls `querySales(filters)` from the service layer.
- Returns paginated response JSON.
- Handles errors gracefully.

#### `services/salesService.js`
Contains the **main business logic**:
- Maintains in-memory dataset.
- `querySales()` performs:
  1. Search (customer name, phone)
  2. Multi-level filtering (customer, product, purchase, store, dates)
  3. Sorting (date, amount, name, quantity, category)
  4. Pagination (page, pageSize)
- Returns:
{
data,
total,
page,
pageSize,
totalPages
}

#### `utils/csvLoader.js`
- Reads and parses CSV with `csv-parse`.
- Normalizes data types:
  - Numbers → Number()
  - Dates → new Date()
  - Tags → array of strings
- Returns structured JavaScript objects.

#### `utils/parseFilters.js`
Converts query params into a strongly typed filter object.
Handles:
- Arrays (e.g., `gender=Male,Female`)
- Date ranges (`dateFrom`, `dateTo`)
- Numeric ranges (`priceMin`, `priceMax`)
- Default values for missing params
- Sort direction & sort keys

#### `models/salesRecord.js`
- Defines JSDoc typedef for a `SalesRecord`.
- Documents every field and its type.
- Improves readability and maintainability.

#### `routes/salesRoutes.js`
Defines Express route:
- `GET /api/sales` → `salesController.getSales`

---

## 2. Frontend Architecture

### 2.1 Overview
The frontend is built using **React + Vite** and implements a responsive analytics dashboard with:
- Global query state
- Search bar
- Filters panel
- Sorting controls
- Paginated table view

UI updates immediately when search/filters/sorting change by re-requesting data from the backend.

### 2.2 Frontend Folder Structure
frontend/
src/
components/
ChipToggleGroup.jsx
EmptyState.jsx
FilterSection.jsx
FiltersPanel.jsx
LoadingState.jsx
Pagination.jsx
RangeFilter.jsx
SearchBar.jsx
SortBar.jsx
TransactionsTable.jsx
hooks/
useSalesQuery.js
services/
api.js
utils/
debounce.js
App.jsx
main.jsx
index.css

### 2.3 Module Responsibilities

#### `App.jsx`
- Core container for the dashboard.
- Maintains query state:
  - Search
  - All filter values
  - Sort key + sort direction
  - Pagination
- Uses `useSalesQuery()` to fetch results.
- Renders:
  - SearchBar
  - FiltersPanel
  - SortBar
  - TransactionsTable
  - Pagination
  - Loading / Empty / Error states

#### `hooks/useSalesQuery.js`
- Custom hook managing:
  - Data fetching
  - Loading + error state
  - Merging query updates
- Automatically calls API on state changes.

#### `services/api.js`
- Builds `/api/sales` URL from query params.
- Handles GET request using fetch.
- Returns JSON result to the hook.

#### UI Components

##### `SearchBar.jsx`
- Input with debounced search.
- Calls `onChange(searchTerm)`.

##### `FiltersPanel.jsx`
- Groups all filters:
  - Customer
  - Product
  - Purchase
  - Store
  - Dates
- Uses ChipToggleGroup & RangeFilter.
- Emits incremental updates to query state.

##### `SortBar.jsx`
- Lets user select sort field & direction.
- Displays total results count.

##### `TransactionsTable.jsx`
- Displays rows returned by backend.
- Handles formatting of:
  - Dates
  - Customer metadata
  - Monetary values
  - Status badges

##### `Pagination.jsx`
- Shows previous/next buttons.
- Displays current page and total pages.

##### `LoadingState`, `EmptyState`, `ErrorCard`
- Handle all edge-case states.

##### `index.css`
- Centralized styling:
  - Layout
  - Dashboard cards
  - Table design
  - Filter panel look
  - Chips and inputs
  - Pagination styles

---

## 3. Data Flow

### 3.1 Flow Diagram (Conceptual)

[User Action]
↓
Updates Query State (App.jsx)
↓
useSalesQuery() triggers fetch
↓
Frontend → GET /api/sales?search=..&filters..
↓
Backend:
parseFilters → querySales
↓
Filtering → Sorting → Pagination
↓
Returns paginated result
↓
Frontend updates UI

### 3.2 Search Flow
- User types in SearchBar.
- `debounce()` limits re-fetch frequency.
- Query sent to backend.
- Backend applies case-insensitive match on:
  - customerName
  - phoneNumber

### 3.3 Filter Flow
- Each filter patch updates global query.
- Backend applies strict AND logic across all filters.
- Numeric/date ranges use inclusive boundaries.
- Multi-select filters use array membership.

### 3.4 Sorting Flow
- SortBar changes `sortBy` or `sortDir`.
- Backend sorts data before pagination.
- String sorting is case-insensitive.

### 3.5 Pagination Flow
- Pagination component sends `setQuery({ page })`.
- Backend slices the filtered+sorted dataset.
- Returns:
  - `data` for current page
  - `total`
  - `totalPages`

---

## 4. Folder Structure Summary


TRUESTATE/
backend/
src/
controllers/
data/
models/
routes/
services/
utils/
index.js
.gitignore
package.json

frontend/
src/
components/
hooks/
services/
utils/
App.jsx
main.jsx
index.css
.gitignore
package.json

docs/
architecture.md

README.md

---

## 5. Summary

- Backend is layered and clean: **route → controller → service → utils**.
- Frontend is modular: **components + hook + service pattern**.
- All heavy operations (filter, sort, search, paginate) are done **server-side**.
- UI reacts instantly through a single source of truth: **query state** in App.
- The architecture is scalable, maintainable, and fulfills all assignment requirements.

