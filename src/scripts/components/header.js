/*------------------------------------------------------------------
[Header]
-------------------------------------------------------------------*/
const header = () => {

  const lancasterHomePrev = document.querySelector('#lancaster-prev');
  const lancasterHomeNext = document.querySelector('#lancaster-next');
  const lancasterHomeSlides = document.querySelectorAll('.c-lancaster-home-carousel-slide');
  const firstLancaster = document.querySelector('.c-lancaster-home-carousel-slide:first-of-type');
  const lancasterControls = document.querySelector('.c-lancaster-home-carousel-controls');

  const carouselPrev = document.querySelector('#carousel-prev');
  const carouselNext = document.querySelector('#carousel-next');
  const carouselSlides = document.querySelectorAll('.c-carousel-slide');
  const firstCarousel = document.querySelector('.c-carousel-slide:first-of-type');
  const carouselControls = document.querySelector('.c-carousel-controls');



  window.onload = function() {
    if (!(firstLancaster == null)){
      firstLancaster.classList.toggle('active');
    }

    if (!(firstCarousel == null)){
      firstCarousel.classList.toggle('active');
    }
  };


  if (!(lancasterHomePrev == null)){

      lancasterHomePrev.addEventListener('click', () => {

        window.event.preventDefault();
        var activeItem = document.querySelector('.c-lancaster-home-carousel-slide.active');

        if (activeItem.previousElementSibling == null ){
          // Do nothing
        } else {
          activeItem.classList.remove('active');
          activeItem.previousElementSibling.classList.add('active');
        }

      });

  }

  if (!(lancasterHomeNext == null)){

      lancasterHomeNext.addEventListener('click', () => {

        window.event.preventDefault();
        var activeItem = document.querySelector('.c-lancaster-home-carousel-slide.active');

        if (activeItem.nextElementSibling == lancasterControls){

          // Do nothing

        } else {

          if (activeItem.nextElementSibling == null){
            // Do nothing
          } else {

            activeItem.classList.remove('active');
            activeItem.nextElementSibling.classList.add('active');

          }

        }

      });

  }







  if (!(carouselPrev == null)){

      carouselPrev.addEventListener('click', () => {

        window.event.preventDefault();
        var activeItem = document.querySelector('.c-carousel-slide.active');

        if (activeItem.previousElementSibling == null ){
          // Do nothing
        } else {
          activeItem.classList.remove('active');
          activeItem.previousElementSibling.classList.add('active');
        }

      });

  }

  if (!(carouselNext == null)){

      carouselNext.addEventListener('click', () => {

        window.event.preventDefault();
        var activeItem = document.querySelector('.c-carousel-slide.active');

        if (activeItem.nextElementSibling == carouselControls){

          // Do nothing

        } else {

          if (activeItem.nextElementSibling == null){
            // Do nothing
          } else {

            activeItem.classList.remove('active');
            activeItem.nextElementSibling.classList.add('active');

          }

        }

      });

  }







  const accordionStandardTriggers = document.querySelectorAll('.c-accordion__heading h3');

  if (!(accordionStandardTriggers == null)){

      accordionStandardTriggers.forEach(accordionTrigger => {
        accordionTrigger.addEventListener("click", () => {
          accordionTrigger.parentElement.parentElement.querySelector('.c-accordion__description').classList.toggle("is-open");
          accordionTrigger.classList.toggle("is-open");

        });
      });

  }

}

export default header;
