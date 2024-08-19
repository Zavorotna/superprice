document.addEventListener("DOMContentLoaded", function () {

    //color to card
    const inputs = document.querySelectorAll('.color input[type="radio"]')
    inputs.forEach(input => {
        let color = input.value,
            label = input
        label.style.backgroundColor = color
        label.style.border = "2px solid"
        label.style.borderColor = color === 'white' ? '#D9D9D9' : 'white'
    })

    const blackFon = document.querySelector(".black-fon")
    //down menu mobile and decstop
    if (document.querySelector('.down-menu')) {
        if (window.innerWidth >= 1024) {
            const menuItems = document.querySelectorAll('.down-menu'),
                body = document.querySelector("#body"),
                listItemMain = document.querySelectorAll(".navigation-menu-catalog > li"),
                subMenuSecond = document.querySelectorAll(".sub-menu > li")
            //sub menu header
            //ховер при наведені на головній навігації
            const addHoverClass = (element, className) => element.classList.add(className),
                removeHoverClass = (element, className) => element.classList.remove(className)

            listItemMain.forEach(listItem => {
                listItem.addEventListener("mousemove", function () {
                    const link = this.querySelector("a"),
                        subMenu = this.querySelector(".sub-menu-main") || this.querySelector(".help-sub-menu")

                    if (link) addHoverClass(link, "yellow-header-hover")
                    if (subMenu) addHoverClass(subMenu, subMenu.classList.contains("sub-menu-main") ? "hover-sub-menu" : "hover-help-menu")
                })
                listItem.addEventListener("mouseleave", function () {
                    const link = this.querySelector("a"),
                        subMenu = this.querySelector(".sub-menu-main") || this.querySelector(".help-sub-menu")

                    if (link) removeHoverClass(link, "yellow-header-hover")
                    if (subMenu) removeHoverClass(subMenu, subMenu.classList.contains("sub-menu-main") ? "hover-sub-menu" : "hover-help-menu")
                })
            })

            menuItems.forEach(item => {
                const subMenu = item.nextElementSibling,
                    blackFon = document.querySelector(".black-fon")
                console.log(blackFon)
                // listItemMenu = document.querySelector(".navigation-menu-catalog > li")
                console.log(subMenu)
                const showMenu = () => {
                    blackFon.classList.add("black-fon-style")
                    blackFon.style.display = 'block'

                }

                const hideMenu = () => {
                    blackFon.classList.remove("black-fon-style")
                    blackFon.style.display = 'none'
                }
                if (window.innerWidth < 1024) {
                    item.addEventListener('mouseenter', showMenu)
                    item.addEventListener('mouseleave', hideMenu)
                    subMenu.addEventListener('mouseenter', showMenu)
                    subMenu.addEventListener('mouseleave', hideMenu)
                }
            })
        }
        if (window.innerWidth < 1024) {
            const mobileMenuItems = document.querySelectorAll(".navigation-menu-catalog > li")

            mobileMenuItems.forEach(mobileItem => {
                mobileItem.addEventListener("click", function () {
                    console.log(mobileItem)
                    mobileItem.querySelector("a").classList.toggle("header-hover-mobile")
                    let itemSubMenu = mobileItem.querySelector(".mobile-menu")
                    if (itemSubMenu) {
                        itemSubMenu.classList.toggle("d-block")

                    }
                })
            })
        }
        if (document.querySelector("#burger")) {
            const burger = document.querySelector(".burger"),
                mobileMenu = document.querySelector(".navigation-menu-catalog"),
                sections = document.querySelectorAll(".scrollBurger"),
                cancelMenu = document.querySelector(".cancel-menu"),
                headList = document.querySelectorAll(".head-subMenu")

            let isMenuOpen = false
            headList.forEach(item => {
                item.addEventListener("click", function () {
                    let subSubmenu = item.nextElementSibling
                    console.log(item.nextElementSibling)
                    subSubmenu.classList.toggle("d-block")
                })
            })

            burger.addEventListener('click', function () {
                burger.classList.add('active')
                mobileMenu.style.overflowY = "scroll"
                mobileMenu.style.left = "0"
                mobileMenu.style.top = "-62px"
                blackFon.classList.add("black-fon-mobile")
                blackFon.style.left = "80%"
                isMenuOpen = true
            })

            window.addEventListener('scroll', function () {
                sections.forEach(section => {
                    const rect = section.getBoundingClientRect()

                    if (rect.top <= 0 && rect.bottom >= 0) {
                        burger.classList.remove('active')
                        closeMenu()
                        isMenuOpen = false
                    }
                })
            })
            cancelMenu.addEventListener("click", function () {
                closeMenu()
            })
            if (window.innerWidth < 1024) {
                blackFon.addEventListener("click", function () {
                    closeMenu()

                })
            }

            function closeMenu() {
                burger.classList.remove('active')
                burger.classList.add("noactive")
                mobileMenu.style.left = "-100%"
                mobileMenu.style.top = "-62px"
                mobileMenu.style.overflowY = ""
                burger.style.left = "0"
                blackFon.classList.remove("black-fon-mobile")
                blackFon.style.left = "0"
            }
        }
    }

    //search mobile
    if (window.innerWidth < 1024) {
        const search = document.querySelector(".search-mobile"),
            searchBlock = document.querySelector(".search-block"),
            header = document.querySelector("header")

        search.addEventListener("click", function () {
            searchBlock.classList.toggle("search-mobile-form")
            header.classList.toggle("padding-for-search")
        })
    }


    //slider
    let isSlideTransitionComplete = true;
    //slider
    class InfinitySlider {
      constructor(selector, settings = {}) {
        this.settings = {
          ...InfinitySlider.defaultSettings,
          ...settings
        };
        this.slider = document.querySelector(selector);
        this.positionCards = 0;
        this.sliderContainer = this.slider.querySelector(".slider-container");
        this.sliderCards = this.sliderContainer.children;
        this.realCardsLength = this.sliderCards.length;
        this.heightCards = 0;
        this.widthSliderContainer;
        this.cardsCount;
        this.widthCards;
        this.distanceCards;
        this.cloneCard;
        this.prevBtnSlider;
        this.nextBtnSlider;
        this.sliderInterval;
        this.maxHeight;
        this.sliderDots;
        this.touchPoint;
        InfinitySlider.defaultSettings.baseCardWidth = this.widthSliderContainer;
      };
  
      static defaultSettings = {
        // isSlidesToScrollAll: false,
        gap: 0,
        isArrows: false,
        isDots: false,
        distanceToDots: 0,
        isAutoplay: false,
        autoplaySpeed: 3000,
        baseCardWidth: null,
        transitionCard: "all 1s ease-in-out",
        isEffectFadeOut: false
      };
  
      init() {
        this.widthSliderContainer = this.sliderContainer.getBoundingClientRect().width;
  
        if (this.settings.baseCardWidth == null) this.settings.baseCardWidth = this.widthSliderContainer
  
        this.slider.querySelectorAll(".clone").forEach(clone => {
          clone.remove();
        });
  
        if (localStorage[this.slider.id + "Interval"]) {
          clearInterval(localStorage[this.slider.id + "Interval"]);
        }
  
        this.slider.style.position = "relative";
        this.sliderContainer.style.overflow = "hidden";
        this.sliderContainer.style.position = "relative";
        this.sliderContainer.style.width = "100%";
  
        this.cardsCount = Math.floor(this.widthSliderContainer / (parseInt(this.settings.baseCardWidth) + this.settings.gap));
        if (this.cardsCount == 0) this.cardsCount = 1;
        this.distanceCards = this.settings.gap;
        this.widthCards = (this.widthSliderContainer - ((this.cardsCount - 1) * this.distanceCards)) / this.cardsCount;
        this.positionCards = 0 - (this.distanceCards + this.widthCards);
  
        if (this.settings.isArrows) this.creationArrows();
        this.prevBtnSlider = this.slider.querySelector('.left.slider_navigation');
        this.nextBtnSlider = this.slider.querySelector('.right.slider_navigation');
        if (this.settings.isArrows && this.sliderCards.length <= this.cardsCount) {
          this.prevBtnSlider.style.display = "none";
          this.nextBtnSlider.style.display = "none";
        } else if (this.settings.isArrows) {
          this.prevBtnSlider.style.display = "block";
          this.nextBtnSlider.style.display = "block";
        }
        if (this.settings.isDots && this.realCardsLength > 1) {
          this.creationDots();
          this.sliderDots = document.querySelectorAll('.slider-dot');
          for (let i = 0; i < this.sliderCards.length; i++) {
            if (this.sliderCards[i].classList.contains("activeFade")) {
              this.sliderDots[i].classList.remove("activeFade");
              this.sliderCards[i].classList.remove("activeFade");
            }
          }
          this.sliderDots[0].classList.add("activeFade");
          this.sliderCards[0].classList.add("activeFade");
        }
  
        if (!this.settings.isEffectFadeOut) {
          this.creationClons();
          this.shuffleCard();
        }
  
        this.sliderCards = this.sliderContainer.children;
        this.heightCards = 0;
        for (let i = 0; i < this.sliderCards.length; i++) {
          this.sliderCards[i].style.width = this.widthCards + "px";
          this.sliderCards[i].style.position = "absolute";
          this.maxHeight = this.sliderCards[i].getBoundingClientRect().height;
          if (this.heightCards < this.maxHeight) {
            this.heightCards = this.maxHeight;
          }
          this.sliderCards[i].style.transition = 'none';
          setTimeout(() => {
            this.sliderCards[i].style.transition = this.settings.transitionCard;
          }, 1);
        }
  
        this.settings.isDots ? this.sliderContainer.style.height = this.heightCards + this.settings.distanceToDots + 'px' : this.sliderContainer.style.height = this.heightCards + 'px';
  
        this.sliderDots = document.querySelectorAll('.slider-dot');
        this.sliderDots.forEach(element => {
          element.onclick = () => {
            clearInterval(sliderInterval);
            clearInterval(localStorage[this.slider.id + "Interval"]);
            for (let index = 0; index < this.realCardsLength; index++) {
              this.sliderDots[index].classList.remove("activeFade");
              this.sliderCards[index].classList.remove("activeFade");
            }
            this.sliderCards[element.dataset.order].classList.add("activeFade");
            element.classList.add("activeFade");
          }
        });
        if (this.settings.isAutoplay && this.realCardsLength > this.cardsCount) {
          clearInterval(sliderInterval);
          this.startAutoPlay();
        }
        this.slider.addEventListener('touchend', () => {
          if (this.settings.isAutoplay && this.realCardsLength > this.cardsCount) {
            clearInterval(sliderInterval);
            this.startAutoPlay();
          }
        });
  
        this.touchSlider = this.touchSlider.bind(this);
  
        this.slider.addEventListener('touchstart', (e) => {
          clearInterval(sliderInterval);
          this.touchPoint = e.touches[0].pageX;
          this.slider.addEventListener('touchmove', this.touchSlider);
          clearInterval(localStorage[this.slider.id + "Interval"]);
        }, {
          passive: true
        });
  
        this.slider.onmouseenter = () => {
          clearInterval(localStorage[this.slider.id + "Interval"]);
        };
  
        this.slider.onmouseleave = () => {
          if (this.settings.isAutoplay && this.realCardsLength > this.cardsCount) {
            this.startAutoPlay();
          }
        };
      }
  
      creationClons() {
        let counter = 1;
        do {
          this.cloneCard = this.sliderCards[this.sliderCards.length - counter].cloneNode(true);
          this.cloneCard.classList.add("clone");
          this.cloneCard.style.transition = 'none';
          this.sliderContainer.insertAdjacentElement("afterbegin", this.cloneCard);
          this.realCardsLength = this.sliderCards.length - this.slider.querySelectorAll('.clone').length
          counter++;
        } while (counter <= this.realCardsLength && this.settings.isSlidesToScrollAll);
  
        if (this.settings.isSlidesToScrollAll) {
          counter = 0;
          while (counter < this.realCardsLength) {
            this.cloneCard = this.sliderCards[counter].cloneNode(true);
            this.cloneCard.classList.add("clone");
            this.cloneCard.style.transition = 'none';
            this.sliderContainer.insertAdjacentElement("beforeend", this.cloneCard);
            counter++;
          }
        }
      }
  
  
      creationArrows() {
        const areArrowsExist = this.slider.querySelectorAll('.slider_navigation').length;
        if (areArrowsExist < 1) {
          this.prevBtnSlider = document.createElement("span");
          this.nextBtnSlider = document.createElement("span");
          this.prevBtnSlider.className = "left slider_navigation";
          this.nextBtnSlider.className = "right slider_navigation";
          this.slider.insertAdjacentElement("afterbegin", this.prevBtnSlider);
          this.slider.insertAdjacentElement("beforeend", this.nextBtnSlider);
  
          let isClickUnabled = true;
          const clickUnabled = () => {
            isClickUnabled = false;
            setTimeout(() => {
              isClickUnabled = true;
            }, (parseFloat(this.sliderCards[0].style.transitionDuration) * 1000));
          };
  
          this.prevBtnSlider.onclick = () => {
            if (isClickUnabled) {
              this.changeSlide("left");
              clickUnabled();
            }
          };
          this.nextBtnSlider.onclick = () => {
            if (isClickUnabled) {
              this.changeSlide("right");
              clickUnabled();
            }
          };
        }
      }
  
      creationDots() {
        const dotsContainer = this.slider.querySelector('.dots-container');
        if (!dotsContainer) {
          let dotContainer = document.createElement("div");
          dotContainer.style.position = "absolute";
          dotContainer.className = "dots-container";
          dotContainer.style.bottom = "0";
          this.slider.insertAdjacentElement("beforeend", dotContainer);
          for (let index = 0; index < this.realCardsLength; index++) {
            const slideDot = document.createElement("span");
            slideDot.className = "slider-dot";
            slideDot.dataset.order = index;
            dotContainer.insertAdjacentElement("beforeend", slideDot);
          }
        }
      }
  
      shuffleCard() {
        this.sliderCards = this.sliderContainer.children;
        this.positionCards = 0 - (this.distanceCards + this.widthCards);
        if (this.settings.isSlidesToScrollAll) {
          this.positionCards = 0 - (this.distanceCards + this.widthCards) * this.realCardsLength;
        }
        for (let i = 0; i < this.sliderCards.length; i++) {
          this.sliderCards[i].style.left = this.positionCards + 'px';
          this.positionCards += (this.distanceCards + this.widthCards);
        }
      }
  
      changeSlide(direction) {
        this.widthSliderContainer = this.sliderContainer.getBoundingClientRect().width;
        this.cardsCount = Math.floor(this.widthSliderContainer / (parseInt(this.settings.baseCardWidth) + this.settings.gap));
        if (this.cardsCount == 0) this.cardsCount = 1;
        this.widthCards = (this.widthSliderContainer - ((this.cardsCount - 1) * this.distanceCards)) / this.cardsCount;
        this.sliderCards = this.sliderContainer.children;
        let slideIndex = 0;
        for (let i = 0; i < this.sliderCards.length; i++) {
          if (this.sliderCards[i].classList.contains("activeFade")) {
            slideIndex = i;
          }
        }
        if (direction == "left") {
          if (this.settings.isSlidesToScrollAll) {
            for (let index = 0; index < this.cardsCount; index++) {
              this.sliderContainer.insertAdjacentElement("afterbegin", this.sliderCards[this.sliderCards.length - 1]);
            }
          } else if (this.settings.isEffectFadeOut) {
            setTimeout(() => this.sliderCards[slideIndex].classList.add("activeFade"), 800);
            setTimeout(() => this.sliderDots[slideIndex].classList.add("activeFade"), 800);
            this.sliderCards[slideIndex].classList.remove("activeFade");
            this.sliderDots[slideIndex].classList.remove("activeFade");
            this.sliderCards[slideIndex - 1] ? slideIndex-- : slideIndex = this.sliderCards.length - 1;
          } else {
            this.sliderCards[this.sliderCards.length - 1].remove();
            let cloneLast = this.sliderCards[this.sliderCards.length - 1].cloneNode(true);
            cloneLast.classList.add("clone");
            this.sliderContainer.insertAdjacentElement("afterbegin", cloneLast);
            this.sliderCards[1].classList.remove("clone");
          }
        } else if (direction == "right") {
          if (this.settings.isSlidesToScrollAll) {
            for (let index = 0; index < this.cardsCount; index++) {
              this.sliderContainer.insertAdjacentElement("beforeend", this.sliderCards[0]);
            }
          } else if (this.settings.isEffectFadeOut) {
            setTimeout(() => this.sliderCards[slideIndex].classList.add("activeFade"), 800);
            setTimeout(() => this.sliderDots[slideIndex].classList.add("activeFade"), 800);
            this.sliderCards[slideIndex].classList.remove("activeFade");
            this.sliderDots[slideIndex].classList.remove("activeFade");
            this.sliderCards[slideIndex + 1] ? slideIndex++ : slideIndex = 0
          } else {
            this.sliderCards[0].remove();
            let cloneFirst = this.sliderCards[0].cloneNode(true);
            cloneFirst.classList.add("clone");
            this.sliderContainer.insertAdjacentElement("beforeend", cloneFirst);
            this.sliderCards[this.sliderCards.length - 2].classList.remove("clone");
          }
        }
        if (!this.settings.isEffectFadeOut) this.shuffleCard();
      }
  
      startAutoPlay() {
        clearInterval(localStorage[this.slider.id + "Interval"]);
        if (this.settings.isEffectFadeOut) {
          let slideIndex = 0;
          for (let i = 0; i < this.sliderCards.length; i++) {
            if (this.sliderCards[i].classList.contains("activeFade")) {
              slideIndex = i;
            }
          }
          const setActive = (index) => {
            setTimeout(() => this.sliderCards[index].classList.add("activeFade"), 1000);
            setTimeout(() => this.sliderDots[index].classList.add("activeFade"), 1000);
          }
          this.sliderInterval = setInterval(() => {
            this.sliderCards[slideIndex].classList.remove("activeFade");
            this.sliderDots[slideIndex].classList.remove("activeFade");
            this.sliderCards[slideIndex + 1] ? slideIndex++ : slideIndex = 0
            setActive(slideIndex);
          }, this.settings.autoplaySpeed);
        } else {
          this.sliderInterval = setInterval(() => {
            this.changeSlide("right");
          }, this.settings.autoplaySpeed);
        }
        localStorage[this.slider.id + "Interval"] = this.sliderInterval;
      }
  
      touchSlider(e) {
        clearInterval(sliderInterval)
        if (!isSlideTransitionComplete) {
          return
        }
  
        const touchX = e.touches[0].pageX
  
        if ((this.touchPoint + 20) < touchX) {
          this.changeSlide('left')
          isSlideTransitionComplete = false
          this.slider.removeEventListener('touchmove', this.touchSlider)
          setTimeout(() => {
            isSlideTransitionComplete = true
          }, 500)
        } else if ((this.touchPoint - 20) > touchX) {
          this.changeSlide('right')
          isSlideTransitionComplete = false
          this.slider.removeEventListener('touchmove', this.touchSlider)
          setTimeout(() => {
            isSlideTransitionComplete = true
          }, 500)
        }
  
        this.touchPoint = touchX
      }
  
      touchSlider(e) {
        clearInterval(sliderInterval);
        if ((this.touchPoint + 20) < e.touches[0].pageX) {
          this.changeSlide('left');
          this.slider.removeEventListener('touchmove', this.touchSlider);
        } else if ((this.touchPoint - 20) > e.touches[0].pageX) {
          this.changeSlide('right');
          this.slider.removeEventListener('touchmove', this.touchSlider);
        }
      }
    }
    // const products = document.querySelectorAll(".products")
    // let sliders = {}
    // // console.log(products);
    // products.forEach((slider, i) => {
    //     const mediaQuery1440 = window.matchMedia('(min-width: 1440px)');
    //     const mediaQuery1920 = window.matchMedia('(min-width: 1920px)');

    //     let baseCardWidthImg = "250px"

    //     if (mediaQuery1440.matches) {
    //         baseCardWidthImg = "250px";
    //     }

    //     if (mediaQuery1920.matches) {
    //         baseCardWidthImg = "550px";
    //     }
    //     sliders["img-key" + (i + 1)] = new InfinitySlider("#product" + (i + 1), {
    //         isArrows: true,
    //         isSlidesToScrollAll: false,
    //         baseCardWidth: baseCardWidthImg,
    //         gap: 50,
    //         isAutoplay: true,
    //         autoplaySpeed: 10000,
    //         transitionCard: "all .5s ease-in-out",
    //     })
    // })
    // const galerys = document.querySelectorAll(".galerys")
    // let sliderGalery = {}
    // galerys.forEach((sliderG, i) => {
    //     sliderGalery["img-key-g" + (i + 1)] = new InfinitySlider("#galery" + (i + 1), {
    //         isArrows: true,
    //         isSlidesToScrollAll: false,
    //         baseCardWidth: "500px",
    //         gap: 50,
    //         isAutoplay: false,
    //         autoplaySpeed: 10000,
    //         transitionCard: "all .5s ease",
    //     })
    // })
    const mainSlider = new InfinitySlider(".main_container", {
        isArrows: false,
        isDots: true,
        distanceToDots: 10, 
        isSlidesToScrollAll: false,
        baseCardWidth: "1000px",
        gap: 50,
        isAutoplay: false,
        autoplaySpeed: 10000,
        isEffectFadeOut: true,
        transitionCard: "all 1.5s ease",
    })
    const sliderCategoryBlocks = document.querySelectorAll(".category-container")
    let sliderInterval
    // if(sliderCategoryBlocks.length >= 4) {
    if(window.innerWidth > 1024) {
        baseCardSliderWidth = window.innerWidth / 5
        console.log(baseCardSliderWidth);
    } else {
        baseCardSliderWidth = window.innerWidth / 4

    }
    const categorySlider = new InfinitySlider(".category_container-slider", {
        isArrows: true,
        isSlidesToScrollAll: false,
        baseCardWidth: baseCardSliderWidth,
        gap: 20,
        isAutoplay: false,
        autoplaySpeed: 3000,
        transitionCard: "all 1.5s ease",
    })
    const cardSlider = new InfinitySlider(".card-product-slider", {
        isArrows: true,
        isSlidesToScrollAll: false,
        baseCardWidth: baseCardSliderWidth,
        gap: 20,
        isAutoplay: false,
        autoplaySpeed: 3000,
        transitionCard: "all 1.5s ease",
    })
    window.onresize = function () {
        categorySlider.init()
    }
    sliderInterval = setTimeout(function () {
        categorySlider.init()
    }, 50);
    // }

    function initSlider() {
        mainSlider.init()
        cardSlider.init()        
        // Object.keys(sliders).forEach(sliderKey => {
        //     sliders[sliderKey].init()
        // })
        // Object.keys(sliderGalery).forEach(sliderKeyG => {
        //     sliderGalery[sliderKeyG].init()
        // })
    }
    window.onresize = function () {
        initSlider()
    }
    sliderInterval = setTimeout(function () {
        initSlider()
    }, 50);


})