window.addEventListener('DOMContentLoaded', () => {
 'use strict';
 const menuEl = document.querySelector('.menu');
 const burgerEl = document.querySelector('.hamburger'); 
 const closeEl = document.querySelector('.menu__close');
 burgerEl.addEventListener('click', () => {
   menuEl.classList.add('active')
  });
  
  closeEl.addEventListener('click', () => {
   menuEl.classList.remove('active')
  });

  const btns = document.querySelectorAll('.gallery__btn');
  const image = document.querySelector('.gallery__img');
  btns.forEach(btn => {
   console.log(btn)
   btn.style.top = `${image.offsetTop+image.offsetHeight/2-btn.offsetHeight/2}px`;
  })

 window.addEventListener('resize', ()=>{
   btns.forEach(btn => {
      console.log(btn)
      btn.style.top = `${image.offsetTop+image.offsetHeight/2-btn.offsetHeight/2}px`;
     })
 })


});