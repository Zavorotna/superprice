
document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll('.color input[type="radio"]').forEach((e=>{let t=e.value,s=e;s.style.backgroundColor=t,s.style.border="2px solid",s.style.borderColor="white"===t?"#D9D9D9":"white"}));const e=document.querySelector(".black-fon");if(document.querySelector(".down-menu")){if(window.innerWidth>=1024){const o=document.querySelectorAll(".down-menu"),h=(document.querySelector("#body"),document.querySelectorAll(".navigation-menu-catalog > li")),c=(document.querySelectorAll(".sub-menu > li"),(e,t)=>e.classList.add(t)),u=(e,t)=>e.classList.remove(t);h.forEach((e=>{e.addEventListener("mousemove",(function(){const e=this.querySelector("a"),t=this.querySelector(".sub-menu-main")||this.querySelector(".help-sub-menu");e&&c(e,"yellow-header-hover"),t&&c(t,t.classList.contains("sub-menu-main")?"hover-sub-menu":"hover-help-menu")})),e.addEventListener("mouseleave",(function(){const e=this.querySelector("a"),t=this.querySelector(".sub-menu-main")||this.querySelector(".help-sub-menu");e&&u(e,"yellow-header-hover"),t&&u(t,t.classList.contains("sub-menu-main")?"hover-sub-menu":"hover-help-menu")}))})),o.forEach((e=>{const t=e.nextElementSibling,s=document.querySelector(".black-fon");console.log(s),console.log(t);const i=()=>{s.classList.add("black-fon-style"),s.style.display="block"},r=()=>{s.classList.remove("black-fon-style"),s.style.display="none"};window.innerWidth<1024&&(e.addEventListener("mouseenter",i),e.addEventListener("mouseleave",r),t.addEventListener("mouseenter",i),t.addEventListener("mouseleave",r))}))}if(window.innerWidth<1024){document.querySelectorAll(".navigation-menu-catalog > li").forEach((e=>{e.addEventListener("click",(function(){console.log(e),e.querySelector("a").classList.toggle("header-hover-mobile");let t=e.querySelector(".mobile-menu");t&&t.classList.toggle("d-block")}))}))}if(document.querySelector("#burger")){const C=document.querySelector(".burger"),g=document.querySelector(".navigation-menu-catalog"),v=document.querySelectorAll(".scrollBurger"),m=document.querySelector(".cancel-menu"),S=document.querySelectorAll(".head-subMenu");let f=!1;function t(){C.classList.remove("active"),C.classList.add("noactive"),g.style.left="-100%",g.style.top="-62px",g.style.overflowY="",C.style.left="0",e.classList.remove("black-fon-mobile"),e.style.left="0"}S.forEach((e=>{e.addEventListener("click",(function(){let t=e.nextElementSibling;console.log(e.nextElementSibling),t.classList.toggle("d-block")}))})),C.addEventListener("click",(function(){C.classList.add("active"),g.style.overflowY="scroll",g.style.left="0",g.style.top="-62px",e.classList.add("black-fon-mobile"),e.style.left="80%",f=!0})),window.addEventListener("scroll",(function(){v.forEach((e=>{const s=e.getBoundingClientRect();s.top<=0&&s.bottom>=0&&(C.classList.remove("active"),t(),f=!1)}))})),m.addEventListener("click",(function(){t()})),window.innerWidth<1024&&e.addEventListener("click",(function(){t()}))}}if(window.innerWidth<1024){const y=document.querySelector(".search-mobile"),p=document.querySelector(".search-block"),L=document.querySelector("header");y.addEventListener("click",(function(){p.classList.toggle("search-mobile-form"),L.classList.toggle("padding-for-search")}))}let s=!0;class i{constructor(e,t={}){this.settings={...i.defaultSettings,...t},this.slider=document.querySelector(e),this.positionCards=0,this.sliderContainer=this.slider.querySelector(".slider-container"),this.sliderCards=this.sliderContainer.children,this.realCardsLength=this.sliderCards.length,this.heightCards=0,this.widthSliderContainer,this.cardsCount,this.widthCards,this.distanceCards,this.cloneCard,this.prevBtnSlider,this.nextBtnSlider,this.sliderInterval,this.maxHeight,this.sliderDots,this.touchPoint,i.defaultSettings.baseCardWidth=this.widthSliderContainer}static defaultSettings={gap:0,isArrows:!1,isDots:!1,distanceToDots:0,isAutoplay:!1,autoplaySpeed:3e3,baseCardWidth:null,transitionCard:"all 1s ease-in-out",isEffectFadeOut:!1};init(){if(this.widthSliderContainer=this.sliderContainer.getBoundingClientRect().width,null==this.settings.baseCardWidth&&(this.settings.baseCardWidth=this.widthSliderContainer),this.slider.querySelectorAll(".clone").forEach((e=>{e.remove()})),localStorage[this.slider.id+"Interval"]&&clearInterval(localStorage[this.slider.id+"Interval"]),this.slider.style.position="relative",this.sliderContainer.style.overflow="hidden",this.sliderContainer.style.position="relative",this.sliderContainer.style.width="100%",this.cardsCount=Math.floor(this.widthSliderContainer/(parseInt(this.settings.baseCardWidth)+this.settings.gap)),0==this.cardsCount&&(this.cardsCount=1),this.distanceCards=this.settings.gap,this.widthCards=(this.widthSliderContainer-(this.cardsCount-1)*this.distanceCards)/this.cardsCount,this.positionCards=0-(this.distanceCards+this.widthCards),this.settings.isArrows&&this.creationArrows(),this.prevBtnSlider=this.slider.querySelector(".left.slider_navigation"),this.nextBtnSlider=this.slider.querySelector(".right.slider_navigation"),this.settings.isArrows&&this.sliderCards.length<=this.cardsCount?(this.prevBtnSlider.style.display="none",this.nextBtnSlider.style.display="none"):this.settings.isArrows&&(this.prevBtnSlider.style.display="block",this.nextBtnSlider.style.display="block"),this.settings.isDots&&this.realCardsLength>1){this.creationDots(),this.sliderDots=document.querySelectorAll(".slider-dot");for(let e=0;e<this.sliderCards.length;e++)this.sliderCards[e].classList.contains("activeFade")&&(this.sliderDots[e].classList.remove("activeFade"),this.sliderCards[e].classList.remove("activeFade"));this.sliderDots[0].classList.add("activeFade"),this.sliderCards[0].classList.add("activeFade")}this.settings.isEffectFadeOut||(this.creationClons(),this.shuffleCard()),this.sliderCards=this.sliderContainer.children,this.heightCards=0;for(let e=0;e<this.sliderCards.length;e++)this.sliderCards[e].style.width=this.widthCards+"px",this.sliderCards[e].style.position="absolute",this.maxHeight=this.sliderCards[e].getBoundingClientRect().height,this.heightCards<this.maxHeight&&(this.heightCards=this.maxHeight),this.sliderCards[e].style.transition="none",setTimeout((()=>{this.sliderCards[e].style.transition=this.settings.transitionCard}),1);this.settings.isDots?this.sliderContainer.style.height=this.heightCards+this.settings.distanceToDots+"px":this.sliderContainer.style.height=this.heightCards+"px",this.sliderDots=document.querySelectorAll(".slider-dot"),this.sliderDots.forEach((e=>{e.onclick=()=>{clearInterval(l),clearInterval(localStorage[this.slider.id+"Interval"]);for(let e=0;e<this.realCardsLength;e++)this.sliderDots[e].classList.remove("activeFade"),this.sliderCards[e].classList.remove("activeFade");this.sliderCards[e.dataset.order].classList.add("activeFade"),e.classList.add("activeFade")}})),this.settings.isAutoplay&&this.realCardsLength>this.cardsCount&&(clearInterval(l),this.startAutoPlay()),this.slider.addEventListener("touchend",(()=>{this.settings.isAutoplay&&this.realCardsLength>this.cardsCount&&(clearInterval(l),this.startAutoPlay())})),this.touchSlider=this.touchSlider.bind(this),this.slider.addEventListener("touchstart",(e=>{clearInterval(l),this.touchPoint=e.touches[0].pageX,this.slider.addEventListener("touchmove",this.touchSlider),clearInterval(localStorage[this.slider.id+"Interval"])}),{passive:!0}),this.slider.onmouseenter=()=>{clearInterval(localStorage[this.slider.id+"Interval"])},this.slider.onmouseleave=()=>{this.settings.isAutoplay&&this.realCardsLength>this.cardsCount&&this.startAutoPlay()}}creationClons(){let e=1;do{this.cloneCard=this.sliderCards[this.sliderCards.length-e].cloneNode(!0),this.cloneCard.classList.add("clone"),this.cloneCard.style.transition="none",this.sliderContainer.insertAdjacentElement("afterbegin",this.cloneCard),this.realCardsLength=this.sliderCards.length-this.slider.querySelectorAll(".clone").length,e++}while(e<=this.realCardsLength&&this.settings.isSlidesToScrollAll);if(this.settings.isSlidesToScrollAll)for(e=0;e<this.realCardsLength;)this.cloneCard=this.sliderCards[e].cloneNode(!0),this.cloneCard.classList.add("clone"),this.cloneCard.style.transition="none",this.sliderContainer.insertAdjacentElement("beforeend",this.cloneCard),e++}creationArrows(){if(this.slider.querySelectorAll(".slider_navigation").length<1){this.prevBtnSlider=document.createElement("span"),this.nextBtnSlider=document.createElement("span"),this.prevBtnSlider.className="left slider_navigation",this.nextBtnSlider.className="right slider_navigation",this.slider.insertAdjacentElement("afterbegin",this.prevBtnSlider),this.slider.insertAdjacentElement("beforeend",this.nextBtnSlider);let e=!0;const t=()=>{e=!1,setTimeout((()=>{e=!0}),1e3*parseFloat(this.sliderCards[0].style.transitionDuration))};this.prevBtnSlider.onclick=()=>{e&&(this.changeSlide("left"),t())},this.nextBtnSlider.onclick=()=>{e&&(this.changeSlide("right"),t())}}}creationDots(){if(!this.slider.querySelector(".dots-container")){let e=document.createElement("div");e.style.position="absolute",e.className="dots-container",e.style.bottom="0",this.slider.insertAdjacentElement("beforeend",e);for(let t=0;t<this.realCardsLength;t++){const s=document.createElement("span");s.className="slider-dot",s.dataset.order=t,e.insertAdjacentElement("beforeend",s)}}}shuffleCard(){this.sliderCards=this.sliderContainer.children,this.positionCards=0-(this.distanceCards+this.widthCards),this.settings.isSlidesToScrollAll&&(this.positionCards=0-(this.distanceCards+this.widthCards)*this.realCardsLength);for(let e=0;e<this.sliderCards.length;e++)this.sliderCards[e].style.left=this.positionCards+"px",this.positionCards+=this.distanceCards+this.widthCards}changeSlide(e){this.widthSliderContainer=this.sliderContainer.getBoundingClientRect().width,this.cardsCount=Math.floor(this.widthSliderContainer/(parseInt(this.settings.baseCardWidth)+this.settings.gap)),0==this.cardsCount&&(this.cardsCount=1),this.widthCards=(this.widthSliderContainer-(this.cardsCount-1)*this.distanceCards)/this.cardsCount,this.sliderCards=this.sliderContainer.children;let t=0;for(let e=0;e<this.sliderCards.length;e++)this.sliderCards[e].classList.contains("activeFade")&&(t=e);if("left"==e)if(this.settings.isSlidesToScrollAll)for(let e=0;e<this.cardsCount;e++)this.sliderContainer.insertAdjacentElement("afterbegin",this.sliderCards[this.sliderCards.length-1]);else if(this.settings.isEffectFadeOut)setTimeout((()=>this.sliderCards[t].classList.add("activeFade")),800),setTimeout((()=>this.sliderDots[t].classList.add("activeFade")),800),this.sliderCards[t].classList.remove("activeFade"),this.sliderDots[t].classList.remove("activeFade"),this.sliderCards[t-1]?t--:t=this.sliderCards.length-1;else{this.sliderCards[this.sliderCards.length-1].remove();let e=this.sliderCards[this.sliderCards.length-1].cloneNode(!0);e.classList.add("clone"),this.sliderContainer.insertAdjacentElement("afterbegin",e),this.sliderCards[1].classList.remove("clone")}else if("right"==e)if(this.settings.isSlidesToScrollAll)for(let e=0;e<this.cardsCount;e++)this.sliderContainer.insertAdjacentElement("beforeend",this.sliderCards[0]);else if(this.settings.isEffectFadeOut)setTimeout((()=>this.sliderCards[t].classList.add("activeFade")),800),setTimeout((()=>this.sliderDots[t].classList.add("activeFade")),800),this.sliderCards[t].classList.remove("activeFade"),this.sliderDots[t].classList.remove("activeFade"),this.sliderCards[t+1]?t++:t=0;else{this.sliderCards[0].remove();let e=this.sliderCards[0].cloneNode(!0);e.classList.add("clone"),this.sliderContainer.insertAdjacentElement("beforeend",e),this.sliderCards[this.sliderCards.length-2].classList.remove("clone")}this.settings.isEffectFadeOut||this.shuffleCard()}startAutoPlay(){if(clearInterval(localStorage[this.slider.id+"Interval"]),this.settings.isEffectFadeOut){let e=0;for(let t=0;t<this.sliderCards.length;t++)this.sliderCards[t].classList.contains("activeFade")&&(e=t);const t=e=>{setTimeout((()=>this.sliderCards[e].classList.add("activeFade")),1e3),setTimeout((()=>this.sliderDots[e].classList.add("activeFade")),1e3)};this.sliderInterval=setInterval((()=>{this.sliderCards[e].classList.remove("activeFade"),this.sliderDots[e].classList.remove("activeFade"),this.sliderCards[e+1]?e++:e=0,t(e)}),this.settings.autoplaySpeed)}else this.sliderInterval=setInterval((()=>{this.changeSlide("right")}),this.settings.autoplaySpeed);localStorage[this.slider.id+"Interval"]=this.sliderInterval}touchSlider(e){if(clearInterval(l),!s)return;const t=e.touches[0].pageX;this.touchPoint+20<t?(this.changeSlide("left"),s=!1,this.slider.removeEventListener("touchmove",this.touchSlider),setTimeout((()=>{s=!0}),500)):this.touchPoint-20>t&&(this.changeSlide("right"),s=!1,this.slider.removeEventListener("touchmove",this.touchSlider),setTimeout((()=>{s=!0}),500)),this.touchPoint=t}touchSlider(e){clearInterval(l),this.touchPoint+20<e.touches[0].pageX?(this.changeSlide("left"),this.slider.removeEventListener("touchmove",this.touchSlider)):this.touchPoint-20>e.touches[0].pageX&&(this.changeSlide("right"),this.slider.removeEventListener("touchmove",this.touchSlider))}}const r=new i(".main_container",{isArrows:!1,isDots:!0,distanceToDots:10,isSlidesToScrollAll:!1,baseCardWidth:"1000px",gap:50,isAutoplay:!1,autoplaySpeed:1e4,isEffectFadeOut:!0,transitionCard:"all 1.5s ease"});document.querySelectorAll(".category-container");let l;window.innerWidth>1024?(baseCardSliderWidth=window.innerWidth/5,console.log(baseCardSliderWidth)):baseCardSliderWidth=window.innerWidth/4;const n=new i(".category_container-slider",{isArrows:!0,isSlidesToScrollAll:!1,baseCardWidth:baseCardSliderWidth,gap:20,isAutoplay:!1,autoplaySpeed:3e3,transitionCard:"all 1.5s ease"}),d=new i(".card-product-slider",{isArrows:!0,isSlidesToScrollAll:!1,baseCardWidth:baseCardSliderWidth,gap:20,isAutoplay:!1,autoplaySpeed:3e3,transitionCard:"all 1.5s ease"});function a(){r.init(),d.init()}window.onresize=function(){n.init()},l=setTimeout((function(){n.init()}),50),window.onresize=function(){a()},l=setTimeout((function(){a()}),50)}));