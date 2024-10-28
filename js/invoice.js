if (document.referrer === "") {
  window.location.href = "registration.html";
}

// / Try getting data from localStorage first
let product = JSON.parse(localStorage.getItem("invoiceData"));

// If localStorage is empty, try URL parameters
if (!product) {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    const customerData = JSON.parse(
      localStorage.getItem("customerData") || "[]"
    );
    product = customerData.find((item) => item.id === Number(productId));
  }
}

if (product) {
  // Use the product data to populate your invoice
  console.log(product);
  function itemRender() {
    const tableBody = document.querySelector("#billItem tbody");
    tableBody.innerHTML = "";
    product.products.forEach((pro) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${pro.product}</td>
  <td>${pro.quantity}</td>
  <td>${pro.sellingPrice}</td>
  <td>${pro.total}</td>
  
          `;
      // row.addEventListener("click", () => {
      //   console.log(product);
      // });

      tableBody.appendChild(row);
    });
  }
  itemRender();
  document.getElementById("total").textContent = product.grandTotal;
  document.getElementById("customerName").textContent = product.customerName;
  document.getElementById("billDate").textContent = product.date;

  localStorage.removeItem("invoiceData");
}

/////////////////////
