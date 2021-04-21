// DOMStrings
const form = document.querySelector('.form')
const steps = document.querySelectorAll('.form__step');
const slide = document.querySelectorAll('.form__slide');
const slideArr = Array.prototype.slice.call(slide);
const inputEl = document.querySelectorAll('.form__input');
const inputArr = Array.prototype.slice.call(inputEl);
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const checkBox = document.querySelector('.valueBack');

const general = document.querySelector('.general');
const contact = document.querySelector('.contact');
const family = document.querySelector('.family');
const emergency = document.querySelector('.emergency');
const banking = document.querySelector('.banking');

let JSONdata = {
  general: {},
  contact: {},
  family: {},
  emergency: {},
  banking: {}
}
function generateJson() {
  //GENERAL
  inputElm = Array.prototype
  .slice.call(general.querySelectorAll('.form__input'));
  console.log(inputElm);
  inputElm.map(input => {
    JSONdata.general[`${input.id}`] = input.value;
  });

  //CONTACT
  inputElm = Array.prototype
  .slice.call(contact.querySelectorAll('.form__input'));
  console.log(inputElm);
  inputElm.map(input => {
    JSONdata.contact[`${input.id}`] = input.value;
  });

  //FAMILY
  inputElm = Array.prototype
  .slice.call(family.querySelectorAll('.form__input'));
  console.log(inputElm);
  inputElm.map(input => {
    JSONdata.family[`${input.id}`] = input.value;
  });

  //EMERGENCY
  inputElm = Array.prototype
  .slice.call(emergency.querySelectorAll('.form__input'));
  console.log(inputElm);
  inputElm.map(input => {
    JSONdata.emergency[`${input.id}`] = input.value;
  });

  //BANKING
  inputElm = Array.prototype
  .slice.call(banking.querySelectorAll('.form__input'));
  console.log(inputElm);
  inputElm.map(input => {
    JSONdata.banking[`${input.id}`] = input.value;
  });

  console.log(JSONdata);
}


// Handling dates
const dates = [...document.querySelectorAll('.date')];
dates.forEach((date) => {
    date.addEventListener('focus', function() {
        this.type = 'date';
    });
    date.addEventListener('focusout', function() {
        this.type = 'text';
    });
});

//FORM JS
let currentSlide = 0;

// Event Handlers
prevBtn.addEventListener('click',prevnext(-1)); 
nextBtn.addEventListener('click',prevnext(1));

//Page view changes
checkBox.addEventListener('change', (e) => {
  console.log(e.target.checked);
  if(e.target.checked) {
    preview();
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  } else {
    slideArr.map((el) => {
      el.style.display = null;
    });
    inputArr.map((input) => {
      input.disabled = false;
      input.style.borderBottom = null;
    });
    prevBtn.style.display = null;
    nextBtn.style.display = null;
    showSlide(currentSlide);
  }
});

//Defining functions
function showSlide(slideNo) {
  slide[slideNo].style.display = 'block';

  //Button hidding
  if (slideNo == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (slideNo == (slide.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Preview";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next"; 
  }

  for(let m = 0; m <=slideNo; m++) {
    steps[m].style.backgroundColor = "var(--green)";
  }
}

function prevnext(n) {
  return (e) => {
    e.preventDefault();
    //Code here....
    // Goes back to top
    form.scrollIntoView();
    //generateJson();


    if(nextBtn.innerText == 'Submit' && n == 1) {
      generateJson();
      alert('Confirm form submision');
      form.submit();
    }

    if(nextBtn.innerText == 'Submit' && n == -1) {
      slideArr.map((el) => {
        el.style.display = null;
      });
      inputArr.map((input) => {
        input.disabled = false;
        input.style.borderBottom = null;
      });
      console.log(currentSlide);
      currentSlide--;
      nextBtn.innerText = 'Next';
    } else {
      //Validate Form
      console.log(validateForm());
      if (n == 1 && !validateForm()) return false;
  
      //Hide the current slide
      slide[currentSlide].style.display = null;

      currentSlide = currentSlide + n;
    }

    if(n == -1) {
      steps[currentSlide].style.backgroundColor = "var(--white)";
    }

    if(currentSlide == slide.length) {
      // slideArr.map((el) => {
      //   el.style.display = 'block';
      // });
      // inputArr.map((input) => {
      //   input.disabled = true;
      //   input.style.borderBottom = 'none';
      // });
      preview();

      nextBtn.innerText = 'Submit';
    }

    showSlide(currentSlide);
  }
}

const preview = () => {
  slideArr.map((el) => {
    el.style.display = 'block';
  });
  inputArr.map((input) => {
    input.disabled = true;
    input.style.borderBottom = 'none';
  });
}

const validateForm = () => {
  const childInput = slide[currentSlide].querySelectorAll('.form__input');
  const arrayInput = Array.prototype.slice.call(childInput);
  let valid = true;
  arrayInput.map((input) => {
  valid = input.checkValidity();
  });
  return valid;
}

// Initiallization
showSlide(currentSlide); 

