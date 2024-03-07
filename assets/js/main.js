//show cites by revenue
fetch('assets/sales_data_sample.csv')
  .then(response => response.text())
  .then(csv => {
    const data = csv.split('\n').map(row => row.split(','));

    const cityRevenue = {}; // Object to store city revenue

    // Calculate revenue for each city
    data.forEach(row => {
      const cityName = row[17];
      const quantity = parseInt(row[1]);
      const price = parseFloat(row[2]); // Assuming price is in the third column

      const revenue = quantity * price;

      if (!cityRevenue[cityName]) {
        cityRevenue[cityName] = 0;
      }

      cityRevenue[cityName] += revenue;
    });

    console.log(cityRevenue); // Debugging: Log cityRevenue to check the data

    // Sort cities by their revenue
    const sortedCities = Object.keys(cityRevenue).sort((a, b) => cityRevenue[b] - cityRevenue[a]);

    console.log(sortedCities); // Debugging: Log sortedCities to check the sorting

    // Select top 5 cities
    const topCities = sortedCities.slice(0, 5);

    console.log(topCities); // Debugging: Log topCities to check the selection

    // Extract revenue for top 5 cities
    const topRevenues = topCities.map(city => cityRevenue[city]);

    console.log(topRevenues); // Debugging: Log topRevenues to check the extraction
    
    rendercitiesChart(topCities, topRevenues, 'Top 5 Cities by Revenue');
  })
  .catch(error => console.error('Error fetching the CSV file:', error));

function rendercitiesChart(cities, revenues, title) {
  const ctx = document.getElementById("TopRevenueCities").getContext('2d');

  const chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: cities,
      datasets: [{
        label: 'Total Revenue',
        data: revenues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      title: {
        display: true,
        text: title
      }
    }
  });
}

//show the 10 selling products
fetch('assets/sales_data_sample.csv')
  .then(response => response.text())
  .then(csv => {
    const data = csv.split('\n').map(row => row.split(','));

    // Check if the first row is a header and remove it
    if (data[0][0].toLowerCase().includes('product')) {
      data.shift();
    }

    const productQuantities = {}; // Object to store product quantities

    // Aggregate quantities for each product
    data.forEach(row => {
      const productName = row[12];
      const quantity = parseInt(row[1]);

      if (!productQuantities[productName]) {
        productQuantities[productName] = 0;
      }

      productQuantities[productName] += quantity;
    });

    // Sort products by their quantities
    const sortedProducts = Object.keys(productQuantities).sort((a, b) => productQuantities[b] - productQuantities[a]);

    // Select top 10 products
    const topProducts = sortedProducts.slice(0, 10);
    const topQuantities = topProducts.map(product => productQuantities[product]);

    renderTopSellingChart(topProducts, topQuantities);

    // Select last 10 products
    const lastProducts = sortedProducts.slice(-11);
    const lastQuantities = lastProducts.map(product => productQuantities[product]);


    renderLowSellingChart(lastProducts, lastQuantities);

  })
  .catch(error => console.error('Error fetching the CSV file:', error));

function renderTopSellingChart(products, quantities) {
  const ctx = document.getElementById('topSellingProds').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: products,
      datasets: [{
        label: 'Order Quantity',
        data: quantities,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// show the lowest 10  selling products
function renderLowSellingChart(products, quantities) {
  const ctx = document.getElementById('lowSellingProds').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: products,
      datasets: [{
        label: 'Order Quantity',
        data: quantities,
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
        borderColor: 'rgba(255, 206, 86, 0.5)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

//show products by revenue
fetch('assets/sales_data_sample.csv')
  .then(response => response.text())
  .then(csv => {
    const data = csv.split('\n').map(row => row.split(','));

    // Check if the first row is a header and remove it
    if (data[0][0].toLowerCase().includes('product')) {
      data.shift();
    }

    const productRevenue = {}; // Object to store product revenue

    // Calculate revenue for each product
    data.forEach(row => {
      const productName = row[12];
      const quantity = parseInt(row[1]);
      const price = parseFloat(row[2]); // Assuming price is in the third column

      const revenue = quantity * price;

      if (!productRevenue[productName]) {
        productRevenue[productName] = 0;
      }

      productRevenue[productName] += revenue;
    });

    // Sort products by their revenue
    const sortedProducts = Object.keys(productRevenue).sort((a, b) => productRevenue[b] - productRevenue[a]);

    // Select top 10 products and last 10 products
    const topProducts = sortedProducts.slice(0, 10);
    const lastProducts = sortedProducts.slice(-11);

    // Extract revenue for top 10 products and last 10 products
    const topRevenues = topProducts.map(product => productRevenue[product]);
    const lastRevenues = lastProducts.map(product => productRevenue[product]);

    renderChart(topProducts, topRevenues, 'Top 10 Products by Revenue', 'TopTotalRevenueProds', "rgba(255, 99, 132, 0.5)");
    renderChart(lastProducts, lastRevenues, 'Last 10 Products by Revenue', 'LastTotalRevenueProds', "rgba(75, 192, 192, 0.5)");
  })
  .catch(error => console.error('Error fetching the CSV file:', error));

function renderChart(products, revenues, title, chartId, color) {
  const ctx = document.getElementById(chartId).getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: products,
      datasets: [{
        label: 'Total Revenue',
        data: revenues,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      title: {
        display: true,
        text: title
      }
    }
  });
}


