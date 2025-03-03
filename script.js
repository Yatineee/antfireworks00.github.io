document.addEventListener('DOMContentLoaded', () => {
    const bookmarks = document.querySelectorAll('.bookmark');
    const categories = document.querySelectorAll('.category');
    let currentSlideIndex = 0;
    let currentCategoryIndex = 0;

    // Function to update the active category and slide
    function updateActiveElements() {
        // Deactivate all categories and slides
        categories.forEach(category => {
            if (category) category.classList.remove('active');
        });

        // Get the current category
        const currentCategory = categories[currentCategoryIndex];
        if (!currentCategory) return;

        // Deactivate all slides in the current category
        const slidesInCategory = currentCategory.querySelectorAll('.slide');
        slidesInCategory.forEach(slide => {
            if (slide) slide.classList.remove('active');
        });

        // Activate the current slide
        if (currentSlideIndex < slidesInCategory.length) {
            slidesInCategory[currentSlideIndex].classList.add('active');
        }

        // Activate the current category
        currentCategory.classList.add('active');

        // Update bookmark active state
        bookmarks.forEach((bookmark, index) => {
            if (index === currentCategoryIndex) {
                bookmark.classList.add('active');
            } else {
                bookmark.classList.remove('active');
            }
        });
    }

    // Event listener for bookmarks
    bookmarks.forEach((bookmark, index) => {
        bookmark.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            currentCategoryIndex = index;
            currentSlideIndex = 0; // Reset slide index when changing category
            updateActiveElements();
        });
    });

    // Function to go to the next slide
    function goToNextSlide() {
        const currentCategory = categories[currentCategoryIndex];
        if (!currentCategory) return;

        const slidesInCategory = currentCategory.querySelectorAll('.slide');
        currentSlideIndex = (currentSlideIndex + 1) % slidesInCategory.length;

        // If we've reached the end of the current category, move to the next category
        if (currentSlideIndex === 0) {
            currentCategoryIndex = (currentCategoryIndex + 1) % categories.length;
        }

        updateActiveElements();
    }

    // Function to go to the previous slide
    function goToPreviousSlide() {
        const currentCategory = categories[currentCategoryIndex];
        if (!currentCategory) return;

        const slidesInCategory = currentCategory.querySelectorAll('.slide');
        currentSlideIndex = (currentSlideIndex - 1 + slidesInCategory.length) % slidesInCategory.length;

        // If we've reached the beginning of the current category, move to the previous category
        if (currentSlideIndex === slidesInCategory.length - 1) {
            currentCategoryIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
        }

        updateActiveElements();
    }

    // Event listener for next button
    document.getElementById('next-btn').addEventListener('click', goToNextSlide);

    // Event listener for previous button
    document.getElementById('prev-btn').addEventListener('click', goToPreviousSlide);

    // Initialize the first active elements
    updateActiveElements();
});