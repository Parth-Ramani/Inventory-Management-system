// import { customerData } from "./sales";
// import { purchaseData } from "./script";
// console.log(customerData);
// console.log(purchaseData);
import { purchaseData as purchaseDataAll } from "./script.js";
import { customerData as customer } from "./sales.js";
console.log(customer);
console.log(purchaseDataAll);
// console.log(purchaseDataAll);
console.log("jjj");
// Initial Data
// const customer = [
//   {
//     id: 1,
//     customerName: "john",
//     date: "2024-10-15",
//     products: [
//       {
//         id: 1,
//         product: "buttermilk",
//         quantity: 2,
//         sellingPrice: 10,
//         total: 20
//       },
//       { id: 1, product: "milk", quantity: 2, sellingPrice: 15, total: 30 }
//     ],
//     grandTotal: 50
//   },
//   {
//     id: 2,
//     customerName: "john",
//     date: "2024-10-15",
//     products: [
//       {
//         id: 1,
//         product: "buttermilk",
//         quantity: 2,
//         sellingPrice: 10,
//         total: 20
//       },
//       { id: 1, product: "milk", quantity: 2, sellingPrice: 15, total: 30 }
//     ],
//     grandTotal: 50
//   },
//   {
//     id: 3,
//     customerName: "john",
//     date: "2024-10-15",
//     products: [
//       {
//         id: 1,
//         product: "buttermilk",
//         quantity: 2,
//         sellingPrice: 10,
//         total: 20
//       },
//       { id: 1, product: "milk", quantity: 2, sellingPrice: 15, total: 30 }
//     ],
//     grandTotal: 50
//   }
// ];

// const purchaseDataAll = [
//   {
//     id: 1,
//     productName: "Smartphone X",
//     stockQuantity: 50,
//     costPrice: 300,
//     sellingPrice: 599.99,
//     date: "2024-10-15",
//     supplier: "TechCorp",
//     category: "Electronics",
//     quantity: 100
//   },
//   {
//     id: 2,
//     productName: "T-Shirt",
//     stockQuantity: 200,
//     costPrice: 5,
//     sellingPrice: 19.99,
//     date: "2024-10-16",
//     supplier: "FashionHub",
//     category: "Clothing",
//     quantity: 500
//   },
//   {
//     id: 3,
//     productName: "Organic Apples",
//     stockQuantity: 150,
//     costPrice: 1.5,
//     sellingPrice: 3.99,
//     date: "2024-10-17",
//     supplier: "FreshFoods",
//     category: "Grocery",
//     quantity: 300
//   }
// ];

// Business Metrics Calculator
const calculateBusinessMetrics = () => {
  // Sales Metrics
  const totalSales = customer.reduce(
    (total, sale) => total + sale.grandTotal,
    0
  );
  const totalSalesQuantity = customer.reduce(
    (total, sale) =>
      total + sale.products.reduce((sum, product) => sum + product.quantity, 0),
    0
  );
  const uniqueCustomers = new Set(customer.map((sale) => sale.customerName))
    .size;
  const totalTransactions = customer.length;

  // Purchase Metrics
  const totalPurchases = purchaseDataAll.reduce(
    (total, purchase) => total + purchase.costPrice * purchase.quantity,
    0
  );
  const totalPurchaseQuantity = purchaseDataAll.reduce(
    (total, purchase) => total + purchase.quantity,
    0
  );
  const uniqueSuppliers = new Set(
    purchaseDataAll.map((purchase) => purchase.supplier)
  ).size;

  // Overall Business Metrics
  const grossProfit = totalSales - totalPurchases;
  const profitMargin = ((grossProfit / totalSales) * 100).toFixed(2);
  const averageTransactionValue = (totalSales / totalTransactions).toFixed(2);

  // Inventory Value
  const currentInventoryValue = purchaseDataAll.reduce(
    (total, item) => total + item.stockQuantity * item.costPrice,
    0
  );

  return {
    totalSales,
    totalPurchases,
    grossProfit,
    profitMargin,
    totalSalesQuantity,
    totalPurchaseQuantity,
    uniqueCustomers,
    uniqueSuppliers,
    totalTransactions,
    averageTransactionValue,
    currentInventoryValue
  };
};

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
};

// Render Main Metrics
const renderMainMetrics = (metrics) => {
  const mainMetricsHTML = `
        <div class="metric-card sales">
            <div class="metric-header">
                <div>
                    <div class="metric-title">Total Sales Revenue</div>
                    <div class="metric-value">${formatCurrency(
                      metrics.totalSales
                    )}</div>
                </div>
                <div class="metric-icon">
                    <i class="fas fa-shopping-cart"></i>
                </div>
            </div>
        </div>
        <div class="metric-card purchases">
            <div class="metric-header">
                <div>
                    <div class="metric-title">Total Purchase Cost</div>
                    <div class="metric-value">${formatCurrency(
                      metrics.totalPurchases
                    )}</div>
                </div>
                <div class="metric-icon">
                    <i class="fas fa-shopping-bag"></i>
                </div>
            </div>
        </div>
        <div class="metric-card ${
          metrics.grossProfit >= 0 ? "profit" : "loss"
        }">
            <div class="metric-header">
                <div>
                    <div class="metric-title">Gross Profit/Loss</div>
                    <div class="metric-value">${formatCurrency(
                      Math.abs(metrics.grossProfit)
                    )}</div>
                </div>
                <div class="metric-icon">
                    <i class="fas fa-${
                      metrics.grossProfit >= 0 ? "trending-up" : "trending-down"
                    }"></i>
                </div>
            </div>
        </div>
        <div class="metric-card ${
          metrics.profitMargin >= 0 ? "profit" : "loss"
        }">
            <div class="metric-header">
                <div>
                    <div class="metric-title">Profit Margin</div>
                    <div class="metric-value">${metrics.profitMargin}%</div>
                </div>
                <div class="metric-icon">
                    <i class="fas fa-percentage"></i>
                </div>
            </div>
        </div>
    `;
  document.getElementById("mainMetrics").innerHTML = mainMetricsHTML;
};

// Render Detailed Metrics
const renderDetailedMetrics = (metrics) => {
  const detailedMetricsHTML = `
        <div class="detail-card">
            <h3>Sales Metrics</h3>
            <div class="metric-row">
                <span class="metric-label">Total Transactions</span>
                <span class="metric-number">${metrics.totalTransactions}</span>
            </div>
            <div class="metric-row">
                <span class="metric-label">Items Sold</span>
                <span class="metric-number">${metrics.totalSalesQuantity}</span>
            </div>
            <div class="metric-row">
                <span class="metric-label">Avg Transaction Value</span>
                <span class="metric-number">${formatCurrency(
                  metrics.averageTransactionValue
                )}</span>
            </div>
            <div class="metric-row">
                <span class="metric-label">Unique Customers</span>
                <span class="metric-number">${metrics.uniqueCustomers}</span>
            </div>
        </div>

        <div class="detail-card">
            <h3>Purchase Metrics</h3>
            <div class="metric-row">
                <span class="metric-label">Items Purchased</span>
                <span class="metric-number">${
                  metrics.totalPurchaseQuantity
                }</span>
            </div>
            <div class="metric-row">
                <span class="metric-label">Unique Suppliers</span>
                <span class="metric-number">${metrics.uniqueSuppliers}</span>
            </div>
            <div class="metric-row">
                <span class="metric-label">Current Inventory Value</span>
                <span class="metric-number">${formatCurrency(
                  metrics.currentInventoryValue
                )}</span>
            </div>
        </div>

        <div class="detail-card">
            <h3>Key Performance Indicators</h3>
            <div class="metric-row">
                <span class="metric-label">Revenue per Customer</span>
                <span class="metric-number">${formatCurrency(
                  metrics.totalSales / metrics.uniqueCustomers
                )}</span>
            </div>
            <div class="metric-row">
                <span class="metric-label">Purchase to Sales Ratio</span>
                <span class="metric-number">${(
                  (metrics.totalPurchases / metrics.totalSales) *
                  100
                ).toFixed(2)}%</span>
            </div>
            <div class="metric-row">
                <span class="metric-label">Inventory Turnover Ratio</span>
                <span class="metric-number">${(
                  metrics.totalSales / metrics.currentInventoryValue
                ).toFixed(2)}</span>
            </div>
        </div>
    `;
  document.getElementById("detailedMetrics").innerHTML = detailedMetricsHTML;
};

// Initialize Dashboard
const initializeDashboard = () => {
  const metrics = calculateBusinessMetrics();
  renderMainMetrics(metrics);
  renderDetailedMetrics(metrics);
};

// Load dashboard when page loads
document.addEventListener("DOMContentLoaded", initializeDashboard);
