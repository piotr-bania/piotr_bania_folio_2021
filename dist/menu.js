var hamburgerMenu = document.querySelector('.open-menu');
var navContent = document.querySelector('#nav-content');
var closeNavContent = document.querySelector('#nav-content');
hamburgerMenu.addEventListener('click', function () {
  navContent.classList.add('show');
  document.body.style.overflow = "hidden";
});
closeNavContent.addEventListener('click', function () {
  navContent.classList.remove('show');
  document.body.style.overflow = "auto";
});