import { parseFilters } from "../utils/parseFilters.js";
import { querySales } from "../services/salesService.js";

export function getSales(req, res) {
  try {
    const filters = parseFilters(req.query);
    const result = querySales(filters);

    res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    console.error("Error in getSales:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
