

//menu

const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');

// open/close menu

hamburger.addEventListener('click', () => {
   leftMenu.classList.toggle('openMenu');
   hamburger.classList.toggle('open');
});

document.addEventListener('click', event =>{
    const target = event.target;
    if (!target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu');
        hamburger.classList.toggle('open');
    }
});

leftMenu.addEventListener('click', event => {
    const target = event.target;
    const dropdown = target.closest('.dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        leftMenu.classList.add('openMenu');
        hamburger.classList.add('open');
    }
});

// tvCard

const tvCard = document.querySelectorAll('img');

tvCard.forEach((el) => {
    const newSrc = el.getAttribute('data-backdrop');
    const newSrc2 = el.getAttribute('src');

    el.addEventListener('mouseover', event => {
        const target = event.target;    
        target.setAttribute('src', newSrc);
    });
    
    el.addEventListener('mouseleave', event => {
        const target = event.target;    
        target.setAttribute('src', newSrc2);
    });
});





