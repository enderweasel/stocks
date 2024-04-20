let stockPrices = [100]; // Initial stock price
let chart;

// Define the number of outstanding shares
const outstandingShares = 10000000;

function updateStockPrice() {
  // Determine whether to apply a major price fluctuation
  const majorFluctuationChance = 0.05; // 5% chance of a major fluctuation every minute
  const applyMajorFluctuation = Math.random() < majorFluctuationChance;

  let priceChange;
  if (applyMajorFluctuation) {
    // Generate a major price fluctuation (-500 cents to +500 cents)
    priceChange = (Math.floor(Math.random() * 1001) - 500) / 500; // Generates a random change in cents
  } else {
    // Generate a normal price change (-100 cents to +100 cents)
    priceChange = (Math.floor(Math.random() * 201) - 100) / 100; // Generates a random change in cents
  }

  const newPrice = parseFloat((stockPrices[stockPrices.length - 1] + priceChange).toFixed(2)); // Convert cents to dollars and round to 2 decimal places
  stockPrices.push(newPrice);

  // Update the displayed stock price
  document.getElementById('stock-price').textContent = newPrice.toFixed(2); // Display price with 2 decimal places

  // Calculate market capitalization
  const marketCap = (newPrice * outstandingShares).toLocaleString(); // Calculate market cap and format with commas

  // Update the displayed market cap
  document.getElementById('market-cap').textContent = `$${marketCap}`;

  // Update the chart
  updateChart();
}

  


function updateChart() {
    if (!chart) {
      // Initialize the chart if it doesn't exist
      const ctx = document.getElementById('stock-chart').getContext('2d');
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: stockPrices.length }, (_, i) => i + 1),
          datasets: [{
            label: 'Stock Price',
            data: stockPrices,
            borderColor: '#007bff', // Blue color
            borderWidth: 2,
            fill: false
          }]
        },
        options: {
          responsive: false, // Set to false to disable automatic resizing
          maintainAspectRatio: false, // Set to false to ignore the aspect ratio
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time (30 second intervals)'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Price'
              }
            }
          }
        }
      });
    } else {
      // Update existing chart data
      chart.data.labels = Array.from({ length: stockPrices.length }, (_, i) => i + 1);
      chart.data.datasets[0].data = stockPrices;
  
      // Dynamically adjust the y-axis scale to fit the new data range
      const minPrice = Math.min(...stockPrices);
      const maxPrice = Math.max(...stockPrices);
      const buffer = (maxPrice - minPrice) * 0.1; // Add a buffer to the range
  
      chart.options.scales.y.min = minPrice - buffer;
      chart.options.scales.y.max = maxPrice + buffer;
  
      chart.update();
    }
  }
  

// Call updateStockPrice every 5 seconds
setInterval(updateStockPrice, 5000);

// Define initial balance and inventory for the user
let balance = 10000;
let inventory = 0;

function buy() {
  // Get the current stock price
  const currentPrice = parseFloat(document.getElementById('stock-price').textContent);

  // Define the number of shares to buy
  const sharesToBuy = 1; // For simplicity, let's assume the user buys 1 share at a time

  // Calculate the total cost of buying the shares
  const totalCost = currentPrice * sharesToBuy;

  // Check if the user has enough balance to buy the shares
  if (balance >= totalCost) {
    // Deduct the purchase amount from the user's balance
    balance -= totalCost;

    // Update the displayed balance
    document.getElementById('balance').textContent = `$${balance.toFixed(2)}`;

    // Update the user's inventory by adding the purchased shares
    inventory += sharesToBuy;

    // Update the displayed inventory
    document.getElementById('inventory').textContent = inventory;

    // Optionally, you can add a message to indicate the successful purchase
    alert(`You bought ${sharesToBuy} share(s) at $${currentPrice} each.`);
  } else {
    // Optionally, you can display an error message if the user doesn't have enough balance
    alert("Insufficient balance to buy shares.");
  }
}

function sell() {
  // Get the current stock price
  const currentPrice = parseFloat(document.getElementById('stock-price').textContent);

  // Define the number of shares to sell
  const sharesToSell = 1; // For simplicity, let's assume the user sells 1 share at a time

  // Check if the user has enough shares to sell
  if (inventory >= sharesToSell) {
    // Calculate the total sale amount
    const totalSaleAmount = currentPrice * sharesToSell;

    // Update the user's balance by adding the sale amount
    balance += totalSaleAmount;

    // Update the displayed balance
    document.getElementById('balance').textContent = `$${balance.toFixed(2)}`;

    // Update the user's inventory by subtracting the sold shares
    inventory -= sharesToSell;

    // Update the displayed inventory
    document.getElementById('inventory').textContent = inventory;

    // Optionally, you can add a message to indicate the successful sale
    alert(`You sold ${sharesToSell} share(s) at $${currentPrice} each.`);
  } else {
    // Optionally, you can display an error message if the user doesn't have enough shares
    alert("Insufficient shares to sell.");
  }
}

// Function to generate a random transaction
function generateTransaction() {
    const users = ['joeyp1987', 'unabrowmer', 'xcx33', 'xX_W0LFSN1P3R_Xx', 'cutekitty9']; // Fictional user names
    const actions = ['bought', 'sold']; // Possible actions
  
    // Generate a random user name, action, and number of shares
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    const randomShares = Math.floor(Math.random() * 100) + 1; // Random number of shares (1 to 10)
  
    // Create a descriptive message for the transaction
    let transactionMessage;
    if (randomAction === 'bought') {
      transactionMessage = `${randomUser} bought ${randomShares} shares`;
    } else {
      transactionMessage = `${randomUser} sold ${randomShares} shares`;
    }
  
    return transactionMessage;
  }
  
  
// Function to update the ledger
function updateLedger() {
    // Generate a random transaction
    const transaction = generateTransaction();
  
    // Get the ledger element
    const ledgerElement = document.getElementById('ledger');
  
    // Create a new list item for the transaction
    const transactionItem = document.createElement('li');
    transactionItem.textContent = transaction;
  
    // Append the transaction to the ledger
    ledgerElement.appendChild(transactionItem);
  
    // Remove the oldest transaction if the list exceeds 10 transactions
    if (ledgerElement.children.length > 10) {
      ledgerElement.removeChild(ledgerElement.children[0]);
    }
  }
  
  // Define a function to generate a random interval between 1 and 5 seconds (inclusive)
  function randomInterval() {
    return Math.floor(Math.random() * 3500) + 500; // Random number between 1000 and 5000 milliseconds (1 to 5 seconds)
  }
  
  // Start updating the ledger at a random interval
  setInterval(updateLedger, randomInterval());
  
  
