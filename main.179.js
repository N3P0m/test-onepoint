!function(){var e={11:function(){var e,t,n,o=document.querySelector(".slider"),i=o.querySelector(".slider__wrapper"),s=o.querySelectorAll(".slider__item"),r=o.querySelector(".home__btn"),c=document.querySelector(".navigation__btn"),a=o.querySelector(".decorative-elements__animation"),u=o.querySelector(".advantages__btn"),l=document.querySelector(".shadow"),d=document.querySelector(".switch"),v=d.querySelectorAll(".switch__pagination-item"),f=document.querySelectorAll(".advantages__list"),m=document.querySelector(".popup"),p=m.querySelector(".popup__btn-close"),h=s[0].offsetWidth,y=0,_=0,L=0,E=0,g=0,w=0,q=0,S=0,b=0,x=0,H=!1,k=!1,T=!0,X=!0,Y=--s.length*h,M=.35*h,A=/[-0-9.]+(?=px)/,D=function(){return-1!==event.type.search("touch")?event.touches[0]:event},O=function(){h=s[0].offsetWidth,j()};window.addEventListener("resize",(function(){X=!1,O()}));var j=function(){i.style.transition=X?"transform .4s":"",i.style.transform="translateX(0px)",i.style.transform="translateX(-".concat(y*h,"px)"),P()},P=function(){s.forEach((function(e){+e.id==+y?e.classList.add("slider__item--active"):e.classList.remove("slider__item--active")})),W()},W=function(){s[1].classList.contains("slider__item--active")?(a.style.transition="2.5s",setTimeout((function(){a.classList.add("decorative-elements__animation--active")}),500)):(a.style.transition="0.3s",a.classList.remove("decorative-elements__animation--active"))},z=function(){var e=D();(T=!l.closest(".shadow--active"))&&(X=!0,S=(y+1)*-h,b=(y-1)*-h,_=L=e.clientX,g=e.clientY,t=Date.now(),i.style.transition="",document.addEventListener("touchmove",B),document.addEventListener("touchend",C),document.addEventListener("mousemove",B),document.addEventListener("mouseup",C))},B=function(){var t=D(),n=+i.style.transform.match(A)[0];if(E=L-t.clientX,L=t.clientX,w=g-t.clientY,g=t.clientY,H||k||((e=Math.abs(w))>7||0===E?(k=!0,T=!1):e<7&&(H=!0)),H){if(0===y){if(_<L)return void F(n,0);T=!0}if(y===--s.length){if(_>L)return void F(n,Y);T=!0}if(_>L&&n<S||_<L&&n>b)return void G();i.style.transform="translateX(".concat(n-E,"px)")}},C=function e(){if(q=_-L,k=!1,H=!1,document.removeEventListener("touchmove",B),document.removeEventListener("mousemove",B),document.removeEventListener("touchend",e),document.removeEventListener("mouseup",e),T){n=Date.now();var o=100*q/(n-t);(Math.abs(q)>M||Math.abs(o)>50)&&(_<L?y--:_>L&&y++),_!==L?(T=!1,j()):T=!0}else T=!0;O()},F=function(e,t){e>=t&&e>t&&(i.style.transform="translateX(".concat(t,"px)")),T=!1},G=function(){X=!1,C(),T=!0};P(),i.style.transform="translateX(0px)",i.addEventListener("transitionend",(function(){T=!0})),o.addEventListener("touchstart",z),o.addEventListener("mousedown",z),r.addEventListener("click",(function(){y=1,j()})),c.addEventListener("click",(function(){y=0,j()})),u.addEventListener("click",(function(){l.classList.toggle("shadow--active"),m.classList.toggle("popup--active"),O(),l.closest(".shadow--active")&&m.closest(".popup--active")&&(m.style.transition="0.3s",setTimeout((function(){l.style.opacity="0.7",m.style.opacity="1"}),1))})),j();var I=function(){m.style.opacity="0",l.style.opacity="0",l.addEventListener("transitionend",J)},J=function e(){l.classList.remove("shadow--active"),m.classList.remove("popup--active"),l.removeEventListener("transitionend",e)};p.addEventListener("click",I),l.addEventListener("click",I),d.addEventListener("click",(function(){event.target.closest(".switch__btn--next")&&x++,event.target.closest(".switch__btn--prev")&&x--,K()}));var K=function(){v.forEach((function(e){e.classList.remove("switch__pagination-item--active")})),f.forEach((function(e){e.style.display="none"})),x>=f.length&&(x=0),-1===x&&(x=f.length-1),v[x].classList.add("switch__pagination-item--active"),f[x].style.display="block"};K()},273:function(){var e,t,n=document.querySelector(".message-wrapper"),o=n.querySelector(".textblock__content"),i=n.querySelector(".scrollbar__progress-line"),s=n.querySelector(".scrollbar__slider"),r=0,c=function(){return-1!==event.type.search("touch")?event.touches[0]:event},a=function(){event.preventDefault();var e=c();r=e.clientY,document.addEventListener("mousemove",u),document.addEventListener("touchmove",u),document.addEventListener("mouseup",l),document.addEventListener("touchend",l)},u=function(){var n=c(),a=r-n.clientY;s.style.top="".concat(s.offsetTop-a,"px"),e=s.offsetTop/(i.offsetHeight-s.offsetHeight)*100,t=(o.scrollHeight-o.offsetHeight)*e/100,o.scrollTo(0,t),r=n.clientY,s.offsetTop<0&&(s.style.top="0px"),s.offsetTop>i.offsetHeight-s.offsetHeight&&(s.style.top="".concat(i.offsetHeight-s.offsetHeight,"px"))},l=function e(){document.removeEventListener("mousemove",u),document.removeEventListener("touchmove",u),document.removeEventListener("mouseup",e),document.removeEventListener("touchend",e)};s.addEventListener("mousedown",a),s.addEventListener("touchstart",a),o.addEventListener("scroll",(function(){var e=o.scrollTop/(o.scrollHeight-o.offsetHeight)*100,t=(i.offsetHeight-s.offsetHeight)*e/100;s.style.top="".concat(t,"px")}))}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";n(11),n(273)}()}();