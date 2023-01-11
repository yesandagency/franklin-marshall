/*------------------------------------------------------------------
[Header]
-------------------------------------------------------------------*/
const header = () => {

  const lancasterHomePrev = document.querySelector('#lancaster-prev');
  const lancasterHomeNext = document.querySelector('#lancaster-next');
  const lancasterHomeSlides = document.querySelectorAll('.c-lancaster-home-carousel-slide');

  window.onload = function() {
    document.querySelector('.c-lancaster-home-carousel-slide:first-of-type').classList.toggle('active');
  };

}

export default header;
