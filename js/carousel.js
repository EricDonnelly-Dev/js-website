const slides = document.querySelectorAll(".review-item");
const buttons =document.querySelectorAll('.review-buttons button');

let current = Math.floor(Math.random() * slides.length);
let next = current < slides.length -1 ? current +1 : 0;
let prev = current > 0 ? current-1: slides.length - 1 ;


const updateIndexes = (newIndex) => {
    current = newIndex;
    next = current + 1 > slides.length ? 0 : current +1;
    prev = current > 0 ? current-1: slides.length - 1 ;
    updateClasses();
}

const goToPrev = () => current > 0 ? updateIndexes(current-1): updateIndexes(slides.length - 1);
const goToNext = () => current < slides.length -1 ? updateIndexes(current+1) : updateIndexes(0);

const updateClasses = () => {
    slides.forEach((slide) => {slide.classList.remove('caro-active','caro-prev','caro-next');});
    slides[current].classList.add('caro-active');
    slides[prev].classList.add('caro-prev');
    slides[next].classList.add('caro-next');
}


for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click',() => i === 0 ? goToPrev() : goToNext())
}

updateClasses();