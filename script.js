window.addEventListener('DOMContentLoaded', () => {
    fetch('./data.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.trim().split('\n');
            const salesData = rows.slice(1).map(row => {
                const [date, product, quantity, price] = row.split(',');
                return {
                    date,
                    product,
                    quantity: parseInt(quantity, 10),
                    price: parseFloat(price),
                    total: parseInt(quantity, 10) * parseFloat(price)
                };
            });

            const salesTable = document.getElementById('sales-data');
            let totalSales = 0;

            salesData.forEach(sale => {
                totalSales += sale.total;
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${sale.date}</td>
                    <td>${sale.product}</td>
                    <td>${sale.quantity}</td>
                    <td>$${sale.price.toFixed(2)}</td>
                    <td>$${sale.total.toFixed(2)}</td>
                `;
                salesTable.appendChild(row);
            });

            document.getElementById('total-sales').innerText = `Total Sales: $${totalSales.toFixed(2)}`;
        })
        .catch(console.error);
});