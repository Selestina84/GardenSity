window.addEventListener('DOMContentLoaded', () => {
 'use strict';
 const hamburger = () =>{
  const menuEl = document.querySelector('.menu'),
        burgerEl = document.querySelector('.hamburger'),
        closeEl = document.querySelector('.menu__close');

     burgerEl.addEventListener('click', () => {
      menuEl.classList.add('active')
     });
     
     closeEl.addEventListener('click', () => {
      menuEl.classList.remove('active')
     });
 }
 hamburger();
});