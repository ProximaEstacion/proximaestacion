/* const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

const slideSize = slides[0].getBoundingClientRect();
const slideWidth = slideSize.width;

//arrange the slides next to one another

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}

slides.forEach(setSlidePosition);
*/

//function to move back and forth or directly to a slide

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left +')';
    currentSlide.classList.remove ('current-slide');
    targetSlide.classList.add ('current-slide');
}

//function to update dotNav with current slide

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

//function to hide or show nav arrows
const hideShowArrosws = (slides, prevButton, nextButton, targetIndex) =>{
    if (targetIndex === 0) {
        prevButton.classList.add('hide');
        nextButton.classList.remove('hide');
    } else if (targetIndex === slides.length - 1){
        prevButton.classList.remove('hide');
        nextButton.classList.add('hide');
    }else {
        prevButton.classList.remove('hide');
        nextButton.classList.remove('hide');
    }
}

//Función para crear todos los carruseles
const createCarousel = (carouselTrackId,prevButtonId, nextButtonId, dotsNavId) =>{
    const track = document.getElementById(carouselTrackId);
    const slides = Array.from(track.children);
    const nextButton = document.getElementById(nextButtonId);
    const prevButton = document.getElementById(prevButtonId);
    const dotsNav = document.getElementById(dotsNavId);
    const dots = Array.from(dotsNav.children);

    const slideWidth = slides[0].getBoundingClientRect().width;

    //function to arrange the slides next to one another

    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    }

    slides.forEach(setSlidePosition);

    // click right, move slides to the right
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        const nextDot = currentDot.nextElementSibling;
        const nextIndex = slides.findIndex(slide => slide === nextSlide);
        
        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
        hideShowArrosws(slides, prevButton, nextButton, nextIndex);
    });

     // click left, move slides to the left
    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        const prevDot = currentDot.previousElementSibling;
        const prevIndex = slides.findIndex(slide => slide === prevSlide);
        
        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
        hideShowArrosws(slides, prevButton, nextButton, prevIndex);
    });

    // click nav indicators, move to that slide
    dotsNav.addEventListener('click', e => {
        //what indicator was cliked on
        const targetDot = e.target.closest('button')
        
        if (!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.current-slide');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];
        
        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
        hideShowArrosws(slides, prevButton, nextButton, targetIndex);
    });
}

//Loop que asigne ids a todos los carruseles, prevButtons, nexButtons y dotsNavs para luego aplicar la función createCarousel con cada id independiente

const carousels = document.querySelectorAll('.carousel__track');
const prevButtons = document.querySelectorAll('.carousel__button--left');
const nextButtons = document.querySelectorAll('.carousel__button--right');
const dotsNavs = document.querySelectorAll('.carousel__nav');

//function to reconstruct every carousel
const reconstructCarousels = () => {
    for (let i= 0; i < carousels.length; i++){
        carousels[i].id = `carouselTrack${i + 1}`;
        prevButtons[i].id = `prevButton${i + 1}`;
        nextButtons[i].id = `nextButton${i + 1}`;
        dotsNavs[i].id = `dotsNav${i + 1}`;
        createCarousel(carousels[i].id,prevButtons[i].id,nextButtons[i].id,dotsNavs[i].id);
        //createCarousel('carouselTrack1','prevButton1','nextButton1','dotsNav1'); EJEMPLO
    }
}

//Inicio Programa
reconstructCarousels()
/* addEventListener('resize', e =>{
    reconstructCarousels();
    console.log('asdas');
}) */



//Posible solución al bug: Posicionar las imag directamente con css responsivo y calcular la distancia cada vez que se aplaste el boton para cambiar de slide (directamente en el evento)


//Función de ver más y ver menos texto en descripción de variedades
const moreButtons = document.querySelectorAll('.product__button');

for (let i = 0; i < moreButtons.length; i++){
    moreButtons[i].addEventListener('click', e =>{
        moreButtons[i].classList.toggle('product__button--active')
        moreButtons[i].previousElementSibling.classList.toggle('product__description--active')
    })
}