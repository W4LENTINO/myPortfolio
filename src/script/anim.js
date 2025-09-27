// Botão Obter CV
document.getElementById('downloadCV').addEventListener('click', function(e) {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para baixar o CV
    alert('CV baixado com sucesso!//EM BREVE.');
});

// Carrossel de Projetos
const carousel = document.getElementById('projectsCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('carouselIndicators');

const projectCards = document.querySelectorAll('.project-card');
const totalProjects = projectCards.length;
let currentIndex = 0;

// 🔧 Ajuste de largura responsiva
carousel.style.width = `${totalProjects * 100}%`;
projectCards.forEach(card => {
    card.style.flex = "0 0 100%"; // cada card ocupa sempre 100%
});

// Criar indicadores
for (let i = 0; i < totalProjects; i++) {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (i === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(indicator);
}

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * (100 / totalProjects)}%)`;
    
    // Atualizar indicadores
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalProjects;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalProjects) % totalProjects;
    updateCarousel();
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Auto-avanço do carrossel
let autoSlide = setInterval(nextSlide, 5000);

// Pausar auto-avanço quando o mouse estiver sobre o carrossel
carousel.addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
});

carousel.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 5000);
});

// Animação de elementos ao rolar a página
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Adicionar animações específicas baseadas na posição
            if (entry.target.classList.contains('about-text')) {
                entry.target.style.animation = 'slideInLeft 0.8s ease-out';
            } else if (entry.target.classList.contains('about-image')) {
                entry.target.style.animation = 'slideInRight 0.8s ease-out';
            }
        }
    });
}, observerOptions);

// Aplicar animação aos elementos
document.querySelectorAll('.skill-card, .project-card, .contact-item, .about-text, .about-image').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(el);
});

// Efeito de máquina de escrever com alternância
const typewriterName = document.getElementById('typewriter-name');
const typewriterTitle = document.getElementById('typewriter-title');

const texts = [
    { name: "Valentim Cardoso Mbamu", title: "Desenvolvedor Web Júnior" },
    { name: "Desenvolvedor Web", title: "Valentim Cardoso Mbamu" }
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isName = true; // Controla se estamos digitando o nome ou o título

function typeEffect() {
    const currentText = texts[textIndex];
    const currentElement = isName ? typewriterName : typewriterTitle;
    const currentString = isName ? currentText.name : currentText.title;
    
    if (!isDeleting) {
        // Efeito de digitação
        currentElement.textContent = currentString.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentString.length) {
            // Terminou de digitar, espera um pouco e começa a apagar
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        // Efeito de apagar
        currentElement.textContent = currentString.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            // Terminou de apagar, alterna entre nome e título
            isDeleting = false;
            isName = !isName;
            
            // Se voltamos ao nome, alterna para o próximo par de textos
            if (isName) {
                textIndex = (textIndex + 1) % texts.length;
            }
        }
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, typingSpeed);
}

// Inicia o efeito de digitação
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000);
});

// Fechar navbar ao clicar em um link (para mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});
