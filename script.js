document.addEventListener('DOMContentLoaded', () => {
    const salesData = [
        { product: 'Product A', sales: 100, date: '2023-10-01' },
        { product: 'Product B', sales: 150, date: '2023-10-02' },
        { product: 'Product A', sales: 200, date: '2023-10-03' },
        { product: 'Product C', sales: 250, date: '2023-10-04' },
        // Add more data as needed
    ];

    const productFilter = document.getElementById('product-filter');
    const salesTableBody = document.getElementById('sales-table').querySelector('tbody');
    const salesChartCtx = document.getElementById('salesChart').getContext('2d');
    
    // Populate product filter options
    const products = ['All Products', ...new Set(salesData.map(item => item.product))];
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product === 'All Products' ? 'all' : product;
        option.textContent = product;
        productFilter.appendChild(option);
    });
    
    // Function to update table and chart
    const updateDisplay = (filterValue) => {
        const filteredData = filterValue === 'all' ?
            salesData :
            salesData.filter(item => item.product === filterValue);

        // Update table
        salesTableBody.innerHTML = '';
        filteredData.forEach(item => {
            const row = `<tr><td>${item.product}</td><td>${item.sales}</td><td>${item.date}</td></tr>`;
            salesTableBody.innerHTML += row;
        });

        // Update chart
        const chartData = filteredData.reduce((acc, curr) => {
            const dateIndex = acc.labels.indexOf(curr.date);
            if (dateIndex > -1) {
                acc.datasets[0].data[dateIndex] += curr.sales;
            } else {
                acc.labels.push(curr.date);
                acc.datasets[0].data.push(curr.sales);
            }
            return acc;
        }, { labels: [], datasets: [{ label: 'Sales', data: [] }] });

        salesChart.data = chartData;
        salesChart.update();
    };

    // Initialize chart
    const salesChart = new Chart(salesChartCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Sales',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true
        }
    });

    // Event listener for product filter
    productFilter.addEventListener('change', (event) => {
        updateDisplay(event.target.value);
    });

    // Initial display update
    updateDisplay('all');
});