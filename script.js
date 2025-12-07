// Плавная прокрутка при клике на ссылки навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Функция для добавления новой работы в портфолио
function addPortfolioItem(title, description, imageUrl, tags) {
    const portfolioGrid = document.getElementById('portfolioGrid');
    
    const item = document.createElement('div');
    item.className = 'portfolio-item';
    
    const tagsHTML = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    item.innerHTML = `
        <div class="portfolio-image">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="portfolio-content">
            <h3>${title}</h3>
            <p>${description}</p>
            <div class="tags">
                ${tagsHTML}
            </div>
        </div>
    `;
    
    portfolioGrid.appendChild(item);
}

// Пример использования:
// addPortfolioItem(
//     'Название проекта',
//     'Описание проекта',
//     'путь/к/изображению.jpg',
//     ['Тег1', 'Тег2']
// );

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применяем анимацию к элементам портфолио
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(item);
    });
});