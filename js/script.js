let carData = []; // Store all car data globally
let currentPage = 1;
const carsPerRow = 4; // 4 cars per row
const rowsPerPage = 4; // 5 rows per page (20 cars per page)
let filteredCars = []; // Store filtered car data based on category or search
let currentCategory = ''; // Track the current selected category
let searchQuery = ''; // Track search query

function fetchCarData() {
    fetch('/data/cars.json')
        .then((response) => response.json())
        .then((data) => {
            carData = data; // Store the fetched data globally
            filteredCars = carData; // Initialize filteredCars with all cars
            displayCars(); // Display cars based on the current filter
        })
        .catch((error) => {
            console.error("Error loading car data:", error);
        });
}

// Function to Filter Cars Based on Search and Category
function filterCars() {
    const search = document.getElementById('searchBar').value.toLowerCase();
    const category = currentCategory; // Get current selected category

    filteredCars = carData.filter(car => {
        const matchesCategory = category ? car.category.toLowerCase() === category.toLowerCase() : true;
        const matchesSearch = car.name.toLowerCase().includes(search);
        return matchesCategory && matchesSearch;
    });

    currentPage = 1; // Reset to the first page after filtering
    displayCars();
}

// Function to display the cars dynamically
function displayCars() {
    const totalCars = filteredCars.length;
    const startIndex = (currentPage - 1) * carsPerRow * rowsPerPage;
    const endIndex = Math.min(startIndex + carsPerRow * rowsPerPage, totalCars);
    const carsToDisplay = filteredCars.slice(startIndex, endIndex);

    const carContainer = document.getElementById('carContainer');
    carContainer.innerHTML = ""; // Clear any existing cards before adding new ones

    // Group the cars into rows of 4 cards each
    const rows = [];
    for (let i = 0; i < carsToDisplay.length; i += carsPerRow) {
        rows.push(carsToDisplay.slice(i, i + carsPerRow));
    }

    // Create the card rows
    rows.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('card-row');
        
        row.forEach(car => {
            const card = document.createElement('div');
            card.classList.add('card');

            // Generate stars for ratings
            const fullStars = Math.floor(car.rating);
            const halfStar = car.rating % 1 !== 0 ? 1 : 0;
            const emptyStars = 5 - fullStars - halfStar;

            const starsHTML = 
                "★".repeat(fullStars) + 
                (halfStar ? "☆" : "") + 
                "☆".repeat(emptyStars);

            card.innerHTML = `
            <div class="image-slider">
                <img src="${car.image}" alt="${car.name}">
                <div class="slider-controls">
                    <button class="prev">&lt;</button>
                    <button class="next">&gt;</button>
                </div>
            </div>

            <div class="info">
                <h3>${car.name}</h3>
                <div class="stars">${starsHTML}</div>
                <p>Price: ${car.price}</p>
                <p>Location: ${car.location}</p>
                <p>Mileage: ${car.mileage}</p>
            </div>

            <div class="actions">
                <button class="like">❤️ Like</button>
                <button class="save">💾 Save</button>
                <button class="details" onclick="viewDetails('${car.carId}')">View Details</button>
            </div>
            `;

            // Attach slider functionality
            const sliderImages = card.querySelectorAll(".image-slider img");
            const prevButton = card.querySelector(".slider-controls .prev");
            const nextButton = card.querySelector(".slider-controls .next");

            let currentIndex = 0;

            prevButton.addEventListener("click", () => {
                sliderImages[currentIndex].classList.add("hidden");
                currentIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
                sliderImages[currentIndex].classList.remove("hidden");
            });

            nextButton.addEventListener("click", () => {
                sliderImages[currentIndex].classList.add("hidden");
                currentIndex = (currentIndex + 1) % sliderImages.length;
                sliderImages[currentIndex].classList.remove("hidden");
            });

            rowDiv.appendChild(card);
        });
        
        carContainer.appendChild(rowDiv);
    });

    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = endIndex >= totalCars;
}

// Function to handle View Details button click
function viewDetails(carId) {
    window.location.href = `car-details.html?carId=${carId}`;
}

// Event Listener for the Search and Filter Functionality
document.getElementById("searchBar").addEventListener("input", filterCars);
document.getElementById("categoryFilter").addEventListener("change", filterCars);

// Add event listeners for category buttons
document.querySelectorAll('.category-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const selectedCategory = button.dataset.category;

        // Highlight the active category button
        document.querySelectorAll('.category-btn').forEach((btn) => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Filter and display cars by category
        currentCategory = selectedCategory;
        filterCars();
    });
});

// Function to handle page change
function changePage(direction) {
    const totalCars = filteredCars.length;
    const totalPages = Math.ceil(totalCars / (carsPerRow * rowsPerPage));

    if (direction === 1 && currentPage < totalPages) {
        currentPage++;
    } else if (direction === -1 && currentPage > 1) {
        currentPage--;
    }

    displayCars();
}

document.addEventListener("DOMContentLoaded", fetchCarData);


