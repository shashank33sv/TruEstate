import FilterSection from "./FilterSection";
import ChipToggleGroup from "./ChipToggleGroup";
import RangeFilter from "./RangeFilter";

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const customerTypeOptions = [
  { label: "New", value: "New" },
  { label: "Returning", value: "Returning" },
  { label: "VIP", value: "VIP" },
];

const paymentOptions = [
  { label: "Credit Card", value: "Credit Card" },
  { label: "Debit Card", value: "Debit Card" },
  { label: "Cash", value: "Cash" },
  { label: "UPI / Wallet", value: "UPI" },
];

const deliveryOptions = [
  { label: "Home Delivery", value: "Home Delivery" },
  { label: "In-Store Pickup", value: "In-Store Pickup" },
];

const statusOptions = [
  { label: "Completed", value: "Completed" },
  { label: "Pending", value: "Pending" },
  { label: "Cancelled", value: "Cancelled" },
];

export default function FiltersPanel({ query, onChange, onClear }) {
  const regions = (query.customerRegion || []).join(", ");
  const categories = (query.productCategory || []).join(", ");
  const brands = (query.brand || []).join(", ");
  const storeLocations = (query.storeLocation || []).join(", ");
  const salespeople = (query.salespersonId || []).join(", ");
  const tags = (query.tags || []).join(", ");

  const handleCommaListChange = (value, key) => {
    const list = value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    onChange({ [key]: list });
  };

  return (
    <div className="card filters-panel">
      <div className="filters-header">
        <div>
          <div className="filters-title">Filters</div>
          <div className="card-subtitle">
            Narrow down transactions by customer, product, and purchase details.
          </div>
        </div>
        <button className="filters-reset-btn" type="button" onClick={onClear}>
          Clear all
        </button>
      </div>

      {/* CUSTOMER SECTION */}
      <FilterSection label="Customer Region" hint="Comma separated">
        <input
          className="filter-input"
          type="text"
          placeholder="e.g. North, South"
          value={regions}
          onChange={(e) =>
            handleCommaListChange(e.target.value, "customerRegion")
          }
        />
      </FilterSection>

      <FilterSection label="Gender">
        <ChipToggleGroup
          options={genderOptions}
          value={query.gender}
          onChange={(gender) => onChange({ gender })}
        />
      </FilterSection>

      <FilterSection label="Customer Type">
        <ChipToggleGroup
          options={customerTypeOptions}
          value={query.customerType}
          onChange={(customerType) => onChange({ customerType })}
        />
      </FilterSection>

      <FilterSection label="Age Range">
        <RangeFilter
          min={query.ageMin}
          max={query.ageMax}
          onChangeMin={(ageMin) => onChange({ ageMin })}
          onChangeMax={(ageMax) => onChange({ ageMax })}
          placeholderMin="18"
          placeholderMax="65"
        />
      </FilterSection>

      <FilterSection label="Customer Tags" hint="Profile / interests">
        <input
          className="filter-input"
          type="text"
          placeholder="e.g. Loyal, Discount Lover"
          value={tags}
          onChange={(e) => handleCommaListChange(e.target.value, "tags")}
        />
      </FilterSection>

      {/* PRODUCT SECTION */}
      <FilterSection label="Product Category" hint="Comma separated">
        <input
          className="filter-input"
          type="text"
          placeholder="e.g. Electronics, Clothing"
          value={categories}
          onChange={(e) =>
            handleCommaListChange(e.target.value, "productCategory")
          }
        />
      </FilterSection>

      <FilterSection label="Brand" hint="Comma separated">
        <input
          className="filter-input"
          type="text"
          placeholder="e.g. Brand A, Brand B"
          value={brands}
          onChange={(e) => handleCommaListChange(e.target.value, "brand")}
        />
      </FilterSection>

      <FilterSection label="Price Range">
        <RangeFilter
          min={query.priceMin}
          max={query.priceMax}
          onChangeMin={(priceMin) => onChange({ priceMin })}
          onChangeMax={(priceMax) => onChange({ priceMax })}
          placeholderMin="Min price"
          placeholderMax="Max price"
        />
      </FilterSection>

      {/* PURCHASE SECTION */}
      <FilterSection label="Quantity Range">
        <RangeFilter
          min={query.quantityMin}
          max={query.quantityMax}
          onChangeMin={(quantityMin) => onChange({ quantityMin })}
          onChangeMax={(quantityMax) => onChange({ quantityMax })}
          placeholderMin="Min qty"
          placeholderMax="Max qty"
        />
      </FilterSection>

      <FilterSection label="Discount % Range">
        <RangeFilter
          min={query.discountMin}
          max={query.discountMax}
          onChangeMin={(discountMin) => onChange({ discountMin })}
          onChangeMax={(discountMax) => onChange({ discountMax })}
          placeholderMin="0"
          placeholderMax="100"
        />
      </FilterSection>

      <FilterSection label="Payment Method">
        <ChipToggleGroup
          options={paymentOptions}
          value={query.paymentMethod}
          onChange={(paymentMethod) => onChange({ paymentMethod })}
        />
      </FilterSection>

      <FilterSection label="Delivery Type">
        <ChipToggleGroup
          options={deliveryOptions}
          value={query.deliveryType}
          onChange={(deliveryType) => onChange({ deliveryType })}
        />
      </FilterSection>

      <FilterSection label="Order Status">
        <ChipToggleGroup
          options={statusOptions}
          value={query.orderStatus}
          onChange={(orderStatus) => onChange({ orderStatus })}
        />
      </FilterSection>

      <FilterSection label="Store Location" hint="Comma separated">
        <input
          className="filter-input"
          type="text"
          placeholder="e.g. Downtown, Mall"
          value={storeLocations}
          onChange={(e) =>
            handleCommaListChange(e.target.value, "storeLocation")
          }
        />
      </FilterSection>

      <FilterSection label="Salesperson" hint="Comma separated IDs or names">
        <input
          className="filter-input"
          type="text"
          placeholder="e.g. E01, E02"
          value={salespeople}
          onChange={(e) =>
            handleCommaListChange(e.target.value, "salespersonId")
          }
        />
      </FilterSection>

      <FilterSection label="Date Range">
        <div className="range-row">
          <div style={{ flex: 1 }}>
            <div className="range-label">From</div>
            <input
              className="filter-date"
              type="date"
              value={query.dateFrom || ""}
              onChange={(e) => onChange({ dateFrom: e.target.value })}
            />
          </div>
          <div style={{ flex: 1 }}>
            <div className="range-label">To</div>
            <input
              className="filter-date"
              type="date"
              value={query.dateTo || ""}
              onChange={(e) => onChange({ dateTo: e.target.value })}
            />
          </div>
        </div>
      </FilterSection>
    </div>
  );
}
