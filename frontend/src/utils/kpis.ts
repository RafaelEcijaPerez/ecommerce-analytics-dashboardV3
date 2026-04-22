export function calculateKPIs(sales: any[]) {
  const today = new Date().toISOString().split("T")[0];

  let totalSales = 0;
  let todaySales = 0;
  const productCount: Record<string, number> = {};

  sales.forEach((sale) => {
    // 💰 total ventas
    totalSales += sale.total_amount;

    // 📅 ventas hoy
    if (sale.date?.startsWith(today)) {
      todaySales += sale.total_amount;
    }

    // 📦 contar productos
    const product = sale.product_name;
    if (product) {
      productCount[product] = (productCount[product] || 0) + sale.quantity;
    }
  });

  // 🏆 top producto
  let topProduct = "-";
  let max = 0;

  for (const p in productCount) {
    if (productCount[p] > max) {
      max = productCount[p];
      topProduct = p;
    }
  }

  return {
    totalSales,
    todaySales,
    topProduct,
  };
}