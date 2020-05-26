

//menu
const IMG_URL =  "https://image.tmdb.org/t/p/w185_and_h278_bestv2";
const API_KEY = '77f61a379cc884d503d6d27c52ee0eed';

const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');
const tvShowList = document.querySelector('.tv-shows__list');
const modal = document.querySelector('.modal');

const DBService = class {
    getData = async (url) => {
        const res = await fetch(url);
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`Failed to get data at ${url}`);
        }
    }

    getTestData = () => {
        return this.getData('test.json');
    }
};

const renderCard = response => {
    tvShowList.textContent = '';

    response.result.forEach(item => {

        const {
            backdrop_path: backdrop,
            name: title,
            poster_path: poster,
            vote_average: vote
            } = item;

        const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
        const backdropIMG = ''; // еслі нет backdrop то не добавляем нічего
        const voteElem = ''; // если нет voteElem то не выводим span TV-card__vote

        const card = document.createElement('li');
        card.cclassName = 'tv-shows__item';
        card.innerHTML = `
              <a href="#" class="tv-card">
                <span class="tv-card__vote">${vote}</span>
                <img class="tv-card__img"
                    src="${posterIMG}"
                    data-backdrop="${IMG_URL + backdrop}"
                    alt="${title}">
                <h4 class="tv-card__head">${title}</h4>
              </a>
        `;

        tvShowList.append(card);
    });
};

new DBService().getTestData().then(renderCard);

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

// change card
/*
const tvCard = document.querySelectorAll('.tv-card__img');

tvCard.forEach((el) => {
    const backdrop = el.getAttribute('data-backdrop');
    const src = el.getAttribute('src');

    el.addEventListener('mouseover', event => {
        const target = event.target;    
        target.setAttribute('src', backdrop);
    });
    
    el.addEventListener('mouseleave', event => {
        const target = event.target;    
        target.setAttribute('src', src);
    });
}); */

const changeImage = event => {
    const card = event.target.closest('.tv-shows__item');

    if (card) {
        const img = card.querySelector('.tv-card__img');
        const changeImg = img.dataset.backdrop;
        if (changeImg) {
            img.dataset.backdrop = img.src;
            img.src = changeImg;
        }
    }
};

tvShowList.addEventListener('mouseover', changeImage);
tvShowList.addEventListener('mouseout', changeImage);


// open modal screen

tvShowList.addEventListener('click', event => {

    event.preventDefault();

    const target = event.target;
    const card = target.closest('.tv-card');

    if (card) {
        document.body.style.overflow = 'hidden';
        modal.classList.remove('hide');
    }
});

// close modal screen

modal.addEventListener('click', event => {
    const target = event.target;

    if (target.closest('.cross') ||
        target.classList.contains('modal')) {
        document.body.style.overflow = '';
        modal.classList.add('hide');
    }
});






