// Dashboard JS

document.addEventListener("DOMContentLoaded", function() {
    // Fetch data for stats (mocked data here for demonstration)
    const totalUsers = document.getElementById('total-users');
    const activeUsers = document.getElementById('active-users');
    const totalSales = document.getElementById('total-sales');
    const newSignups = document.getElementById('new-signups');

    totalUsers.textContent = "1,234";
    activeUsers.textContent = "567";
    totalSales.textContent = "$12,345";
    newSignups.textContent = "123";

    // User Growth Chart
    const userGrowthCtx = document.getElementById('user-growth-chart').getContext('2d');
    new Chart(userGrowthCtx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Users',
                data: [200, 400, 600, 800, 1000, 1200],
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true,
        }
    });

    // Sales Overview Chart
    const salesOverviewCtx = document.getElementById('sales-overview-chart').getContext('2d');
    new Chart(salesOverviewCtx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
                label: 'Sales',
                data: [5000, 6000, 7500, 9000, 11000, 12000],
                backgroundColor: '#FF9800',
                borderColor: '#FF9800',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
        }
    });

    // Category Popularity Chart
    const categoryCtx = document.getElementById('category-chart').getContext('2d');
    new Chart(categoryCtx, {
        type: 'pie',
        data: {
            labels: ['Sedan', 'SUV', 'Truck', 'Coupe'],
            datasets: [{
                data: [40, 30, 20, 10],
                backgroundColor: ['#4CAF50', '#FF9800', '#2196F3', '#9C27B0'],
            }]
        },
        options: {
            responsive: true,
        }
    });
});
