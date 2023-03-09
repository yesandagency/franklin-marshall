/*------------------------------------------------------------------
[Header]
-------------------------------------------------------------------*/
const header = () => {

  const lancasterHomePrev = document.querySelector('#lancaster-prev');
  const lancasterHomeNext = document.querySelector('#lancaster-next');
  const lancasterHomeSlides = document.querySelectorAll('.c-lancaster-home-carousel-slide');

  const carouselPrev = document.querySelector('#carousel-prev');
  const carouselNext = document.querySelector('#carousel-next');
  const carouselSlides = document.querySelectorAll('.c-carousel-slide');

  window.onload = function() {
    document.querySelector('.c-lancaster-home-carousel-slide:first-of-type').classList.toggle('active');
    document.querySelector('.c-carousel-slide:first-of-type').classList.toggle('active');
  };





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
