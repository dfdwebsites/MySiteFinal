import './style.css'
import Experience from './Experience/Experience.js'

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

const logo = new Image()
logo.src = '/assets/dfdFilledinverted.png'
logo.classList.add('logo')
const logo2 = new Image()
logo2.src = '/assets/dfdFilledinverted.png'
logo2.classList.add('logo2')
document.querySelector('.heroLogo').appendChild(logo)
document.querySelector('.navLogoImg').appendChild(logo2)

const leftDoor = new Image()
leftDoor.src = '/assets/loaderLeft.jpg'
leftDoor.classList.add('leftDoor')
const rightDoor = new Image()
rightDoor.src = '/assets/loaderRight.jpg'
rightDoor.classList.add('rightDoor')
document.querySelector('.door').appendChild(leftDoor)
document.querySelector('.door').appendChild(rightDoor)
// if you set chars it will rotate through them,

const text =  baffle(".data");
text.set({
  characters: '░▒░ ░██░> ████▓ >█> ░/█>█ ██░░ █<▒ ▓██░ ░/░▒',
        speed: 40
});
//when you start it starts the animation
text.start();
// the reveal is for how millsecs to reveal the text
text.reveal(2000);

const text2 =  baffle(".data2");
text2.set({
  characters: '░▒░ ░██░> ████▓ >█> ░/█>█ ██░░ █<▒ ▓██░ ░/░▒',
        speed: 40
});
//when you start it starts the animation
text2.start();
// the reveal is for how millsecs to reveal the text2
text2.reveal(6000);

//setting animation distances for all screens

// const heroD = document.querySelector('.heroD')
// const heroF = document.querySelector('.heroF')
// const heroD2 = document.querySelector('.heroD2')

// const navD = document.querySelector('.d1')
// const navF = document.querySelector('.f')
// const navD2 = document.querySelector('.d2')

// const distanceTopD = heroD.getBoundingClientRect().top
// const distanceTopF = heroF.getBoundingClientRect().top
// const distanceTopD2 = heroD2.getBoundingClientRect().top

// const distanceLeftD = heroD.getBoundingClientRect().left
// const distanceLeftF = heroF.getBoundingClientRect().left
// const distanceLeftD2 = heroD2.getBoundingClientRect().left

// console.log(distanceTopD, distanceTopF, distanceTopD2)


// navD.style.top = `${distanceTopD}px`
// navD.style.left = `${distanceLeftD}px`

// navF.style.top = `${distanceTopF}px`
// navF.style.left = `${distanceLeftF}px`

// navD2.style.top = `${distanceTopD2}px`
// navD2.style.left = `${distanceLeftD2}px`

window.scrollY = 0


window.experience = new Experience({
    targetElement: document.querySelector('.experience')
})

