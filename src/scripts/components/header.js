/*------------------------------------------------------------------
[Header]
-------------------------------------------------------------------*/
const header = () => {

  const accordionFooterTrigger = document.getElementById('c-footer__locations-trigger');
  const accordionFooter = document.getElementById('c-footer__locations-list');

  const accordionProgramTriggers = document.querySelectorAll('.c-program-listing__expand');

  const accordionStandardTriggers = document.querySelectorAll('.c-accordion__expand');

  const interactiveStepsTriggers = document.querySelectorAll('.step-list-item');
  const interactiveSteps = document.querySelector('.c-interactive-step__step-details');

  const interactiveListTriggers = document.querySelectorAll('.location-list-item a');
  const interactiveList = document.querySelector('.c-interactive-list__location-details');


  if (!(accordionFooterTrigger == null)){
    accordionFooterTrigger.addEventListener('click', () => {
      accordionFooter.classList.toggle('is-open');
    });
  }


  if (!(accordionProgramTriggers == null)){

    accordionProgramTriggers.forEach(accordionTrigger => {
      accordionTrigger.addEventListener("click", () => {
        accordionTrigger.parentElement.parentElement.querySelector('.c-program-list__collapsible').classList.toggle("is-open");
        accordionTrigger.classList.toggle("is-open");

      });
    });

  }

  window.onload = function() {
    document.querySelector('.step-list-item:first-of-type').classList.toggle('is-open');
    document.querySelector('.c-interactive-step__step-detail:first-of-type').classList.toggle('is-open');
    document.querySelector('.c-interactive-list__container .c-interactive-list__locations li:first-of-type').classList.toggle('is-open');
    document.querySelector('.c-interactive-list__location-detail:first-of-type').classList.toggle('is-open');
  };

  if (!(interactiveStepsTriggers == null)){

    interactiveStepsTriggers.forEach(stepsTrigger => {
      stepsTrigger.addEventListener("click", () => {
        var openedListItem = document.querySelector('.step-list-item.is-open');
        openedListItem.classList.toggle('is-open');
        stepsTrigger.classList.toggle("is-open");

        var stepID = '#detail-' + stepsTrigger.id;

      interactiveSteps.querySelector('.is-open').classList.toggle('is-open');
      interactiveSteps.querySelector(stepID).classList.toggle('is-open');

      });
    });

  }


  if (!(interactiveListTriggers == null)){

    interactiveListTriggers.forEach(listTrigger => {
      listTrigger.addEventListener("click", () => {
        var openedListItem = document.querySelector('.location-list-item.is-open');
        openedListItem.classList.toggle('is-open');
        listTrigger.parentElement.classList.toggle("is-open");

        var listID = '#detail-' + listTrigger.parentElement.id;

       interactiveList.querySelector('.is-open').classList.toggle('is-open');
       interactiveList.querySelector(listID).classList.toggle('is-open');

      });
    });

  }


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
