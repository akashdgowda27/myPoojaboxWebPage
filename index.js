function toggleDropdown(dropdownId) {
    const dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(dropdown => {
        if (dropdown.id === dropdownId) {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        } else {
            dropdown.style.display = 'none'; 
        }
    });
}


window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(dropdown => {
            dropdown.style.display = 'none'; 
        });
    }
}




// --------------------------------------------------------------------
const items = document.querySelectorAll('.carousel-item');
const carouselInner = document.querySelector('.carousel-inner');
let currentIndex = 0;
let isDragging = false;
let startX;
let scrollLeft;


function showItems(index) {
    const offset = index * -12.5;
    carouselInner.style.transform = `translateX(${offset}%)`;
}


function nextItem() {
    currentIndex = (currentIndex + 1) % (items.length - 7); 
    showItems(currentIndex);
}


function prevItem() {
    currentIndex = (currentIndex - 1 + (items.length - 7)) % (items.length - 7); 
    showItems(currentIndex);
}


showItems(currentIndex);


carouselInner.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - carouselInner.offsetLeft;
    scrollLeft = carouselInner.scrollLeft;
});

carouselInner.addEventListener('mouseleave', () => {
    isDragging = false;
});

carouselInner.addEventListener('mouseup', () => {
    isDragging = false;
});

carouselInner.addEventListener('mousemove', (e) => {
    if (!isDragging) return; 
    e.preventDefault(); 
    const x = e.pageX - carouselInner.offsetLeft;
    const walk = (x - startX); 
    carouselInner.scrollLeft = scrollLeft - walk; 
});


carouselInner.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - carouselInner.offsetLeft;
    scrollLeft = carouselInner.scrollLeft;
});

carouselInner.addEventListener('touchend', () => {
    isDragging = false;
});

carouselInner.addEventListener('touchmove', (e) => {
    if (!isDragging) return; 
    e.preventDefault(); 
    const x = e.touches[0].pageX - carouselInner.offsetLeft;
    const walk = (x - startX); 
    carouselInner.scrollLeft = scrollLeft - walk; 
});


// ------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    const wishlistCount = document.querySelector('.nav2 .fa-regular.fa-heart');

    
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

   
    updateWishlistUI();

    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const itemId = btn.getAttribute('data-id');
            toggleWishlist(itemId, btn);
        });
    });

    function toggleWishlist(id, btn) {
        if (wishlist.includes(id)) {
            
            wishlist = wishlist.filter(item => item !== id);
            btn.textContent = '🤍'; 
        } else {
            wishlist.push(id);
            btn.textContent = '❤️'; 
        }
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistCount();
    }

    function updateWishlistUI() {
        wishlist.forEach(id => {
            const btn = document.querySelector(`.wishlist-btn[data-id="${id}"]`);
            if (btn) {
                btn.textContent = '❤️'; 
            }
        });
        updateWishlistCount();
    }

    function updateWishlistCount() {
        wishlistCount.textContent = wishlist.length; 
    }
});



// ------------------------------------------------------------paragraph
document.addEventListener('DOMContentLoaded', () => {
    const readMoreBtn = document.querySelector('.read-more-btn');
    const content = document.querySelector('.content');

    readMoreBtn.addEventListener('click', () => {
        content.classList.toggle('expanded'); 
        if (content.classList.contains('expanded')) {
            readMoreBtn.textContent = 'READ LESS'; 
        } else {
            readMoreBtn.textContent = 'READ MORE'; 
        }
    });
});


