// Blog Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const blogSearch = document.getElementById('blog-search');
    const searchBtn = document.getElementById('search-btn');
    const tagButtons = document.querySelectorAll('.tag-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    // Search functionality
    function searchPosts() {
        const searchTerm = blogSearch.value.toLowerCase().trim();
        
        blogCards.forEach(card => {
            const title = card.querySelector('.blog-title').textContent.toLowerCase();
            const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
            const tags = card.getAttribute('data-tags').toLowerCase();
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm) || tags.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Filter by tag
    function filterByTag(tag) {
        blogCards.forEach(card => {
            if (tag === 'all') {
                card.style.display = 'flex';
            } else {
                const cardTags = card.getAttribute('data-tags').split(',');
                if (cardTags.includes(tag)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }
    
    // Event listeners
    searchBtn.addEventListener('click', searchPosts);
    
    blogSearch.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchPosts();
        }
    });
    
    tagButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tagButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter posts by tag
            const tag = this.getAttribute('data-tag');
            filterByTag(tag);
        });
    });
});