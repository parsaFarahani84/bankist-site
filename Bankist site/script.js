'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



const message = document.createElement('div');
const header = document.querySelector('header')
message.classList.add('cookie-message')

message.innerHTML = 'We use cookies to show you some bullshit. <button class = "btn btn-close-cookie">Got it!</button>';

header.prepend(message)
// header.append(message)

document.querySelector('.btn-close-cookie').addEventListener('click' , function(){
  message.remove()
})
//styles
message.style.backgroundColor = '#37383d';
message.style.width = '103%';

message.style.height = Number.parseFloat(getComputedStyle(message).height , 10) + 30 + 'px';//  
// console.log( Number.parseFloat(getComputedStyle(message).height , 10) + 30 + 'px');

// document.documentElement.style.setProperty('--color-primary' , 'orangered')

// const logo = document.querySelector('.nav__logo');
// console.log(lol.dataset.version );
// console.log(logo.getAttribute('src'));

/*--------------------🔻WORKING ON PROJECT🔻--------------------*/

//⭕-----------------------------------SMOOTH SCROLLING-----------------------------------⭕
const btnscroll = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1')

btnscroll.addEventListener('click' , function(e){
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords)

// window.scrollTo({top : s1coords.top + window.pageYOffset, behavior : 'smooth'}) //SOME KIND OF FORMULA THAT YOU CAN USE(old school way)

section1.scrollIntoView({behavior : 'smooth'}) // modern way and it is so EASY!!!!!
})

/*--------------------------------------🔻SMOTH SCROLLING FOR NAV LINKS🔻---------------------------------*/
// document.querySelectorAll('.nav__link').forEach(
//   function(el){
//     el.addEventListener('click' , function(e){
//       // console.log('LINK');
//       e.preventDefault();
//       const id = this.getAttribute('href');
//       // console.log(id);
//       document.querySelector(id).scrollIntoView({behavior : 'smooth'});
//     })
//   }
// )


document.querySelector('.nav__links').addEventListener('click' , function(e){
e.preventDefault();
// console.log(e.target)

if(e.target.classList.contains('nav__link')){
  const id = e.target.getAttribute('href');
        console.log(id);
        document.querySelector(id).scrollIntoView({behavior : 'smooth'});
}

})

/*--------------------------------------🔻OPERATION WINDOW🔻---------------------------------*/

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click' , function(e){
  const a1 = e.target.closest('.operations__tab');
  // console.log(a1)

//GUARD CLAUSE
if(!a1)return; 

tabs.forEach(t => t.classList.remove('operations__tab--active'));
tabsContent.forEach(c => c.classList.remove('operations__content--active'))
a1.classList.add('operations__tab--active');

// console.log(a1.dataset.tab) 
document.querySelector(`.operations__content--${a1.dataset.tab}`).classList.add('operations__content--active');
})

/*--------------------------------------🔻FADING THE MENUE WHILE HOVERING🔻---------------------------------*/
const Handelhover = function(e){
  if(e.target.classList.contains('nav__link')){

    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    
    siblings.forEach( el =>  {
      if(el !== link) el.style.opacity = this;
    }
    )
    logo.style.opacity = this;
    }
}

const nav = document.querySelector('.nav');
nav.addEventListener('mouseover' , Handelhover.bind(0.5) )// we can also set a variable to Handelhover and do like this => function(e){ ,Handelhover(e , 0.5)}⚪

nav.addEventListener('mouseout' , Handelhover.bind(1));

/*--------------------------------------🔻ATTACHING STICKY NAV BAR🔻---------------------------------*/
// const w1 = section1.getBoundingClientRect();
// console.log(section1.getBoundingClientRect())

// window.addEventListener('scroll' , function(e){
//   if(window.scrollY > w1.top) nav.classList.add('sticky')
// else  nav.classList.remove('sticky')
// });


//intersection observer(stupid way)
const navHight = nav.getBoundingClientRect().height;

const intfunction = function(ent){
  const [entery] = ent;
  // console.log(entery);

  if(!entery.isIntersecting) nav.classList.add('sticky')
  else  nav.classList.remove('sticky')
}

const www = new IntersectionObserver(intfunction , {
  root : null,
  threshold : 0 ,
  rootMargin : `-${navHight}px`
})

www.observe(header)
/*--------------------------------------🔻REVEAL SECTIONS🔻---------------------------------*/
const allSections = document.querySelectorAll('section');

const reavelSection = function(ent , obs){ //Q:   'ent' and 'obs' pionts to what?
const [entry] = ent;
// console.log(entry)
if(!entry.isIntersecting)return;
entry.target.classList.remove('section--hidden');
obs.unobserve(entry.target);
}

const bullshit = new IntersectionObserver(reavelSection , {
  root : null,
  threshold : 0.15,
});


allSections.forEach(function(a1){
  bullshit.observe(a1);
  a1.classList.add('section--hidden');
})

/*--------------------------------------🔻LAZY IMG LOADING🔻---------------------------------*/

const imgTarget = document.querySelectorAll('img[data-src]');
// console.log(imgTarget)
const loading = function (ent , obs){
  const [entry] = ent;
  // console.log(entry);
  if(!entry.isIntersecting)return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load' , function(){
    entry.target.classList.remove('lazy-img')
  })
obs.unobserve(entry.target)
}

const imgObserer = new IntersectionObserver(loading , {
  root :null,
  threshold : 0,
  rootMargin : '-300px'
})

imgTarget.forEach(img => imgObserer.observe(img))

/*--------------------------------------🔻SLIDER COMPONENT🔻---------------------------------*/
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnright = document.querySelector('.slider__btn--right');
const btnleft = document.querySelector('.slider__btn--left');

// slider.style.transform = 'scale(0.5) translateX(-500px)';
// slider.style.overflow = 'visible';

const activeDots = function(s){
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

  // document.querySelector(`.dots__dot[data-slide = "${s}"]`).classList.add('dots__dot--active')
  document
      .querySelector(`.dots__dot[data-slide="${s}"]`)
      .classList.add('dots__dot--active');
  


}


const dots = document.querySelector('.dots')

const creatDots = function(){
  slides.forEach(function(_ , i){
    dots.insertAdjacentHTML("beforeend" , `<button class="dots__dot" data-slide="${i}"></button>`);
  })
}
creatDots()


let cur = 0;
let num = slides.length;

const goToSlide = function(slide){
  slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);

}
const nextslide = function(){
  if(num - 1 === cur){
    cur = 0
  }else{
    cur++
  }
  goToSlide(cur)
  activeDots(cur)

}

const prevslide = function(){
  if(cur === 0){
    cur = num - 1
  }else{
    cur--
  }
  goToSlide(cur)
  activeDots(cur)
};

goToSlide(0);
btnright.addEventListener('click' , nextslide )
btnleft.addEventListener('click' , prevslide)

document.addEventListener('keydown' , function(e){
  // console.log(e)
  if(e.key === 'ArrowRight') nextslide();
  e.key === 'ArrowLeft' && prevslide();
})

dots.addEventListener('click' , function(e){
if(e.target.classList.contains('dots__dot')){
  const {slide} = e.target.dataset;
  goToSlide(slide)
  activeDots(slide)
}
})



/*-------------------------PRACTICE------------------------- */
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter' , function(e){
//   alert('You are reading the header!')
// })
// const h1function = function(e){
//   alert('You are reading the header!');

//   h1.removeEventListener('mouseenter' , h1function); 
// };

// h1.addEventListener('mouseenter' , h1function);

// const randomInt = (max , min) => Math.floor(Math.random() * (max - min +1) + min);
// // console.log(randomInt(255 , 0))
// const randomcolor = () => `rgb(${randomInt(255 , 0)} ,${ randomInt(255 , 0)}, ${randomInt(255 , 0)})`;
// console.log(randomcolor(255 , 0))

// document.querySelector('.nav__link').addEventListener('click' , function(e){
//   this.style.backgroundColor = randomcolor()
// });
// document.querySelector('.nav__links').addEventListener('click' , function(e){
//   this.style.backgroundColor = randomcolor()
// });

// document.querySelector('.nav').addEventListener('click' , function(e){
//   this.style.backgroundColor = randomcolor()
// });

/*--------------------------------------➰SIMPLE CHALLENGS!➰---------------------------------*/
// const minMax = function(nums){
//  const max =  Math.max(...nums);
//  const min = Math.min(...nums);
//  console.log(min , max)
//  const final = `max number : ${max} , min number : ${min}`;
//  console.log(final)
// }


// minMax([1, 2, 3, 4, 5])
////////////////////////////////////////////////////

// const ch2 = function(a){
//   console.log('somthing' + ' ' + `${a}`)
// }

// ch2('Bob Jane')
////////////////////////////////////////////////////


// function lessThanOrEqualToZero(num) {
// 	if(num < 0){
// 		console.log(true)
// 	}else{
// 				console.log(false)

// 	}
// };
// lessThanOrEqualToZero(-3)
////////////////////////////////////////////////////

// function whichIsLarger(f, g) {
// 	if(f() > g()){
//     console.log('f')

//   }else if(g() > f()){
//     console.log('g')

//   }else{
//     console.log('neither')

//   }
// }
// whichIsLarger(() => 5, () => 10);
// whichIsLarger(() => 25,  () => 25);
// whichIsLarger(() => 505050, () => 5050);
////////////////////////////////////////////////////
// function countTrue(arr) {
// 	let num = 0;
// arr.forEach(function(t , f){
// // console.log(t)
// if(t){
//   num++
// }

// })
// console.log(num)
// }

// countTrue([true, true, false, true, false])
////////////////////////////////////////////////////
// function toArray(obj) {
// 	const keys = Object.keys(obj);
//   const values = Object.values(obj)
// console.log(keys , values)
// }

// toArray({ a: 1, b: 2 }); // => [a , b] , [1 , 2]
////////////////////////////////////////////////////
// const removeLeadingTrailing = function(number){
//   console.log(parseFloat(number))
// }

// removeLeadingTrailing("00230.000");
////////////////////////////////////////////////////
// function intWithinBounds(n, lower, upper) {
// 	if(n >= lower && n < upper && Number.isInteger(n))return true
// 	else return false
// }
// console.log(intWithinBounds(3, 1, 9))
// console.log(intWithinBounds(4.5, 3, 8))
////////////////////////////////////////////////////
// function sevenBoom(arr) {
// arr.forEach(function(curr){
// // console.log(curr);
// if(curr % 7){
//   console.log('NO BOOM:(')
// }else{
//   console.log('BOOM!')
// }
// })

// }
// sevenBoom([1, 2, 3, 4, 5, 6, 7]);
// sevenBoom([2, 55, 14, 97, 28])
////////////////////////////////////////////////////
// function sevenBoom(arr) {
//   if(arr.join('').includes(7)){
//     console.log('shalala')
//   }
// }
// sevenBoom([2, 55, 14, 97, 28])
////////////////////////////////////////////////////
// window.addEventListener('beforeunload' , function(e){
//   e.preventDefault()
//   e.returnValue = 'mmmeee';
//   console.log(e)

// })
////////////////////////////////////////////////////



