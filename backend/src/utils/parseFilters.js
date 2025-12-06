export function parseFilters(query) {
  const arr = (v) =>
    !v ? [] : Array.isArray(v) ? v : String(v).split(",").map((x) => x.trim());

  return {
    search: (query.search || "").toLowerCase(),

    customerRegion: arr(query.customerRegion),
    gender: arr(query.gender),
    customerType: arr(query.customerType),
    tags: arr(query.tags),

    ageMin: query.ageMin ? Number(query.ageMin) : null,
    ageMax: query.ageMax ? Number(query.ageMax) : null,

    productCategory: arr(query.productCategory),
    brand: arr(query.brand),

    priceMin: query.priceMin ? Number(query.priceMin) : null,
    priceMax: query.priceMax ? Number(query.priceMax) : null,

    quantityMin: query.quantityMin ? Number(query.quantityMin) : null,
    quantityMax: query.quantityMax ? Number(query.quantityMax) : null,

    discountMin: query.discountMin ? Number(query.discountMin) : null,
    discountMax: query.discountMax ? Number(query.discountMax) : null,

    paymentMethod: arr(query.paymentMethod),
    deliveryType: arr(query.deliveryType),
    orderStatus: arr(query.orderStatus),
    storeLocation: arr(query.storeLocation),
    salespersonId: arr(query.salespersonId),

    dateFrom: query.dateFrom ? new Date(query.dateFrom) : null,
    dateTo: query.dateTo ? new Date(query.dateTo) : null,

    sortBy: query.sortBy || "date",
    sortDir: query.sortDir === "asc" ? "asc" : "desc",

    page: Math.max(1, parseInt(query.page) || 1),
    pageSize: Math.max(1, parseInt(query.pageSize) || 10),
  };
}
