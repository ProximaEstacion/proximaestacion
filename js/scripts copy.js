const track = document.querySelector('.carousel__track');
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

//function to move back and forth or directly to a slide

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left +')';
    currentSlide.classList.remove ('current-slide');
    targetSlide.classList.add ('current-slide');
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

//function to update dotNav with current slide

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

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