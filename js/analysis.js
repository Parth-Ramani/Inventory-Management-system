import { purchaseData as purchaseDataAll } from "./script.js";
import { customerData as customer } from "./sales.js";

// Utility Functions
function safeParseNumber(value) {
  const parsedValue = Number(value);
  return isNaN(parsedValue) ? 0 : parsedValue;
}

function calculatePercentageChange(current, previous) {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

// Enhanced Business Metrics Calculator
const calculateBusinessMetrics = () => {
  // Calculate Sales and Costs
  const salesAnalysis = customer.reduce(
    (analysis, sale) => {
      sale.products.forEach((product) => {
        const productRevenue = product.quantity * product.sellingPrice;
        const purchaseInfo = purchaseDataAll.find(
          (p) => p.productName.toLowerCase() === product.product.toLowerCase()
        );
        const costPrice = purchaseInfo ? purchaseInfo.costPrice : 0;
        const productCost = product.quantity * costPrice;

        analysis.totalSales += productRevenue;
        analysis.totalCosts += productCost;
        analysis.totalQuantitySold += product.quantity;
      });

      // Track daily sales for trend analysis
      const saleDate = new Date(sale.date).toISOString().split("T")[0];
      if (!analysis.dailySales[saleDate]) {
        analysis.dailySales[saleDate] = 0;
      }
      analysis.dailySales[saleDate] += sale.products.reduce(
        (total, product) => total + product.quantity * product.sellingPrice,
        0
      );

      return analysis;
    },
    {
      totalSales: 0,
      totalCosts: 0,
      totalQuantitySold: 0,
      dailySales: {}
    }
  );

  // Calculate Advanced Purchase and Inventory Metrics
  const purchaseMetrics = purchaseDataAll.reduce(
    (metrics, purchase) => {
      const purchaseCost = purchase.costPrice * purchase.quantity;
      const inventoryValue = purchase.stockQuantity * purchase.costPrice;
      const potentialSalesValue =
        purchase.stockQuantity * purchase.sellingPrice;

      // Calculate inventory turnover rate
      const soldQuantity = customer.reduce((total, sale) => {
        const productSales = sale.products.find(
          (p) => p.product.toLowerCase() === purchase.productName.toLowerCase()
        );
        return total + (productSales ? productSales.quantity : 0);
      }, 0);

      metrics.inventoryTurnover += soldQuantity / (purchase.stockQuantity || 1);
      metrics.totalPurchases += purchaseCost;
      metrics.totalPurchaseQuantity += purchase.quantity;
      metrics.currentInventoryValue += inventoryValue;
      metrics.potentialInventoryValue += potentialSalesValue;
      metrics.uniqueSuppliers.add(purchase.supplier);

      return metrics;
    },
    {
      totalPurchases: 0,
      totalPurchaseQuantity: 0,
      currentInventoryValue: 0,
      potentialInventoryValue: 0,
      inventoryTurnover: 0,
      uniqueSuppliers: new Set()
    }
  );

  // Calculate Performance Metrics
  const uniqueCustomers = new Set(customer.map((sale) => sale.customerName))
    .size;
  const totalTransactions = customer.length;
  const grossProfit = salesAnalysis.totalSales - salesAnalysis.totalCosts;
  const profitMargin =
    salesAnalysis.totalSales > 0
      ? (grossProfit / salesAnalysis.totalSales) * 100
      : 0;
  const averageTransactionValue =
    totalTransactions > 0 ? salesAnalysis.totalSales / totalTransactions : 0;

  // Calculate Sales Trends
  const sortedDates = Object.keys(salesAnalysis.dailySales).sort();
  const salesTrend = sortedDates.map((date) => ({
    date,
    value: salesAnalysis.dailySales[date]
  }));

  // Calculate KPIs
  const inventoryTurnoverRate =
    purchaseMetrics.inventoryTurnover / purchaseDataAll.length;
  const customerLifetimeValue =
    uniqueCustomers > 0 ? salesAnalysis.totalSales / uniqueCustomers : 0;
  const averageItemsPerTransaction =
    totalTransactions > 0
      ? salesAnalysis.totalQuantitySold / totalTransactions
      : 0;

  return {
    // Sales Performance
    totalSales: salesAnalysis.totalSales,
    totalSalesQuantity: salesAnalysis.totalQuantitySold,
    uniqueCustomers,
    totalTransactions,
    averageTransactionValue,
    customerLifetimeValue,
    averageItemsPerTransaction,

    // Financial Performance
    totalCosts: salesAnalysis.totalCosts,
    grossProfit,
    profitMargin,
    returnOnInvestment:
      salesAnalysis.totalCosts > 0
        ? (grossProfit / salesAnalysis.totalCosts) * 100
        : 0,

    // Inventory Management
    currentInventoryValue: purchaseMetrics.currentInventoryValue,
    potentialInventoryValue: purchaseMetrics.potentialInventoryValue,
    inventoryTurnoverRate,
    stockEfficiency:
      (purchaseMetrics.currentInventoryValue / salesAnalysis.totalSales) * 100,

    // Supplier Metrics
    totalPurchases: purchaseMetrics.totalPurchases,
    totalPurchaseQuantity: purchaseMetrics.totalPurchaseQuantity,
    uniqueSuppliersCount: purchaseMetrics.uniqueSuppliers.size,

    // Trends
    salesTrend
  };
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(amount);
};

const renderMainMetrics = (metrics) => {
  const mainMetricsHTML = `
    <div class="metrics-grid">
      <div class="metric-card sales">
        <div class="metric-header">
          <div>
            <div class="metric-title">Total Revenue</div>
            <div class="metric-value">${formatCurrency(
              metrics.totalSales
            )}</div>
          </div>
          <div class="metric-icon">
            <i class="fas fa-chart-line"></i>
          </div>
        </div>
        <div class="metric-footer">
          <span>Avg Transaction: ${formatCurrency(
            metrics.averageTransactionValue
          )}</span>
        </div>
      </div>

      <div class="metric-card ${metrics.grossProfit >= 0 ? "profit" : "loss"}">
        <div class="metric-header">
          <div>
            <div class="metric-title">Gross Profit</div>
            <div class="metric-value">${formatCurrency(
              metrics.grossProfit
            )}</div>
          </div>
          <div class="metric-icon">
            <i class="fas fa-percentage"></i>
          </div>
        </div>
        <div class="metric-footer">
          <span>Margin: ${metrics.profitMargin.toFixed(2)}%</span>
        </div>
      </div>

      <div class="metric-card inventory">
        <div class="metric-header">
          <div>
            <div class="metric-title">Inventory Value</div>
            <div class="metric-value">${formatCurrency(
              metrics.currentInventoryValue
            )}</div>
          </div>
          <div class="metric-icon">
            <i class="fas fa-warehouse"></i>
          </div>
        </div>
        <div class="metric-footer">
          <span>Turnover Rate: ${metrics.inventoryTurnoverRate.toFixed(
            2
          )}x</span>
        </div>
      </div>

      <div class="metric-card customer">
        <div class="metric-header">
          <div>
            <div class="metric-title">Customer Metrics</div>
            <div class="metric-value">${metrics.uniqueCustomers}</div>
          </div>
          <div class="metric-icon">
            <i class="fas fa-users"></i>
          </div>
        </div>
        <div class="metric-footer">
          <span>Avg CLV: ${formatCurrency(metrics.customerLifetimeValue)}</span>
        </div>
      </div>
    </div>
  `;
  document.getElementById("mainMetrics").innerHTML = mainMetricsHTML;
};

const renderDetailedMetrics = (metrics) => {
  const detailedMetricsHTML = `
    <div class="detail-section">
      <div class="detail-card">
        <h3>Financial Performance</h3>
        <div class="metric-row">
          <span class="metric-label">Total Revenue</span>
          <span class="metric-number">${formatCurrency(
            metrics.totalSales
          )}</span>
        </div>
        <div class="metric-row">
          <span class="metric-label">Total Costs</span>
          <span class="metric-number">${formatCurrency(
            metrics.totalCosts
          )}</span>
        </div>
        <div class="metric-row">
          <span class="metric-label">ROI</span>
          <span class="metric-number">${metrics.returnOnInvestment.toFixed(
            2
          )}%</span>
        </div>
        <div class="metric-row">
          <span class="metric-label">Stock Efficiency</span>
          <span class="metric-number">${metrics.stockEfficiency.toFixed(
            2
          )}%</span>
        </div>
      </div>

      <div class="detail-card">
        <h3>Operational Metrics</h3>
        <div class="metric-row">
          <span class="metric-label">Total Transactions</span>
          <span class="metric-number">${metrics.totalTransactions}</span>
        </div>
        <div class="metric-row">
          <span class="metric-label">Items per Transaction</span>
          <span class="metric-number">${metrics.averageItemsPerTransaction.toFixed(
            2
          )}</span>
        </div>
        <div class="metric-row">
          <span class="metric-label">Total Items Sold</span>
          <span class="metric-number">${metrics.totalSalesQuantity}</span>
        </div>
        <div class="metric-row">
          <span class="metric-label">Unique Suppliers</span>
          <span class="metric-number">${metrics.uniqueSuppliersCount}</span>
        </div>
      </div>
    </div>
  `;
  document.getElementById("detailedMetrics").innerHTML = detailedMetricsHTML;
};

// const initializeDashboard = () => {
//   const metrics = calculateBusinessMetrics();
//   renderMainMetrics(metrics);
//   renderDetailedMetrics(metrics);
//   console.log("Business Metrics:", metrics);
// };

const renderPieChart = (data) => {
  const ctx = document.getElementById("salesPieChart").getContext("2d");
  const pieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "Sales Distribution",
          data: data.values,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top"
        },
        title: {
          display: true,
          text: "Sales Distribution by Product"
        }
      }
    }
  });
};

const initializeDashboard = () => {
  const metrics = calculateBusinessMetrics();
  renderMainMetrics(metrics);
  renderDetailedMetrics(metrics);

  // Prepare data for the pie chart
  const productSales = {};
  customer.forEach((sale) => {
    sale.products.forEach((product) => {
      if (!productSales[product.product]) {
        productSales[product.product] = 0;
      }
      productSales[product.product] += product.quantity * product.sellingPrice;
    });
  });

  const dataForPieChart = {
    labels: Object.keys(productSales),
    values: Object.values(productSales)
  };

  renderPieChart(dataForPieChart);
  console.log("Business Metrics:", metrics);
};

document.addEventListener("DOMContentLoaded", initializeDashboard);

// document.addEventListener("DOMContentLoaded", initializeDashboard);
