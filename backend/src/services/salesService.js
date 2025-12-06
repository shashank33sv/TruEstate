let SALES = [];

export function setSalesData(data) {
  SALES = data;
}

export function getSalesData() {
  return SALES;
}

export function querySales(filters) {
  let results = [...SALES];

  const f = filters;

  //  search term
  if (f.search) {
    results = results.filter((r) => {
      return (
        r.customerName?.toLowerCase().includes(f.search) ||
        r.phoneNumber?.toLowerCase().includes(f.search)
      );
    });
  }

  //  filtering functions
  const matchArray = (value, arr) =>
    arr.length === 0 ? true : arr.includes(value);

  const matchRange = (v, min, max) =>
    (min == null || v >= min) && (max == null || v <= max);

  results = results.filter((r) => {
    if (!matchArray(r.customerRegion, f.customerRegion)) return false;
    if (!matchArray(r.gender, f.gender)) return false;
    if (!matchArray(r.customerType, f.customerType)) return false;

    if (f.tags.length > 0) {
      if (!r.tags || !f.tags.every((t) => r.tags.includes(t))) return false;
    }

    if (!matchRange(r.age, f.ageMin, f.ageMax)) return false;

    if (!matchArray(r.productCategory, f.productCategory)) return false;
    if (!matchArray(r.brand, f.brand)) return false;

    if (!matchRange(r.finalAmount, f.priceMin, f.priceMax)) return false;
    if (!matchRange(r.quantity, f.quantityMin, f.quantityMax)) return false;
    if (!matchRange(r.discountPercentage, f.discountMin, f.discountMax))
      return false;

    if (!matchArray(r.paymentMethod, f.paymentMethod)) return false;
    if (!matchArray(r.deliveryType, f.deliveryType)) return false;
    if (!matchArray(r.orderStatus, f.orderStatus)) return false;
    if (!matchArray(r.storeLocation, f.storeLocation)) return false;
    if (!matchArray(r.salespersonId, f.salespersonId)) return false;

    if (f.dateFrom && (!r.date || r.date < f.dateFrom)) return false;
    if (f.dateTo && (!r.date || r.date > f.dateTo)) return false;

    return true;
  });

  // sorting
  results.sort((a, b) => {
    let av = a[f.sortBy];
    let bv = b[f.sortBy];

    if (f.sortBy === "date") {
      av = a.date ? a.date.getTime() : 0;
      bv = b.date ? b.date.getTime() : 0;
    }

    if (typeof av === "string") av = av.toLowerCase();
    if (typeof bv === "string") bv = bv.toLowerCase();

    if (av < bv) return f.sortDir === "asc" ? -1 : 1;
    if (av > bv) return f.sortDir === "asc" ? 1 : -1;
    return 0;
  });

  // ---------- PAGINATION ----------
  const total = results.length;
  const totalPages = Math.ceil(total / f.pageSize) || 1;

  const start = (f.page - 1) * f.pageSize;
  const end = start + f.pageSize;

  return {
    data: results.slice(start, end),
    total,
    page: f.page,
    totalPages,
    pageSize: f.pageSize,
  };
}
