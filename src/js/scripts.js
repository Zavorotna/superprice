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

    //color to cart product
    const colorCart = document.querySelectorAll('.color-cart')
    colorCart.forEach(colorCart => {
        let color = colorCart.getAttribute("data-color")
        colorCart.style.backgroundColor = color
        colorCart.style.border = "1px solid"
        colorCart.style.borderColor = color === 'white' ? '#D9D9D9' : 'transparent'
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

                item.addEventListener('mouseenter', showMenu)
                item.addEventListener('mouseleave', hideMenu)
                subMenu.addEventListener('mouseenter', showMenu)
                subMenu.addEventListener('mouseleave', hideMenu)
            })
        }
        if (window.innerWidth < 1024) {
            const mobileMenuItems = document.querySelectorAll(".navigation-menu-catalog > li")

            mobileMenuItems.forEach(mobileItem => {
                mobileItem.addEventListener("click", function () {
                    console.log(mobileItem)
                    mobileItem.querySelector(".down-menu").classList.toggle("header-hover-mobile")
                    let itemSubMenu = mobileItem.querySelector(".mobile-menu")
                    if (itemSubMenu) {
                        itemSubMenu.classList.toggle("d-block")

                    }
                })
            })
        }
        if (document.querySelector("#burger")) {
            const burger = document.querySelector(".burger"),
                mobileMenu = document.querySelector(".nav_container"),
                sections = document.querySelectorAll(".scrollBurger"),
                cancelMenu = document.querySelector(".cancel-menu"),
                headList = document.querySelectorAll(".head-subMenu"),
                body = document.querySelector("body")

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
                body.style.overflow = "hidden"
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
                body.style.overflow = "none"
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


    if (document.querySelector(".sort-select")) {
        const selects = document.querySelectorAll('.select')

        selects.forEach(select => {
            const selectIn = select.querySelector('.select__in'),
                selectItems = select.querySelectorAll('.select__item'),
                thisInput = select.querySelector('.select__input'),
                event = new Event('change')

            selectIn.addEventListener('click', () => {
                selects.forEach(_select => {
                    if (_select !== select)
                        _select.classList.remove('is-opened')
                })
                select.classList.toggle('is-opened')
            })
            if (selectItems.length > 0) {
                const firstItem = selectItems[0]
                thisInput.value = firstItem.dataset.value
                // selectIn.innerHTML = firstItem.innerHTML
                firstItem.classList.add('is-active')
            }
            selectItems.forEach(item => {
                item.addEventListener('click', () => {
                    thisInput.value = item.dataset.value
                    thisInput.dispatchEvent(event)
                    selectIn.innerHTML = item.innerHTML
                    selectItems.forEach(_item => {
                        _item.classList.remove('is-active')
                    })
                    item.classList.add('is-active')
                    select.classList.remove('is-opened')
                })
            })
        })

        document.addEventListener('click', e => {
            if (!e.target.closest('.select')) {
                selects.forEach(select => {
                    if (select.classList.contains('is-opened'))
                        select.classList.remove('is-opened')
                })
            }
        })

        document.addEventListener('keyup', e => {
            if (e.key == 'Escape') {
                selects.forEach(select => {
                    if (select.classList.contains('is-opened'))
                        select.classList.remove('is-opened')
                })
            }
        })
    }
    //custom range
    if (document.querySelector('.slider-range')) {
        const slider = document.querySelector('.slider-range'),
            minHandle = document.querySelector('#min-handle'),
            maxHandle = document.querySelector('#max-handle'),
            range = document.querySelector('#range'),
            minPriceInput = document.querySelector('#min-price'),
            maxPriceInput = document.querySelector('#max-price'),
            minValueSpan = document.querySelector('#min-value'),
            maxValueSpan = document.querySelector('#max-value'),
            sliderWidth = slider.offsetWidth,
            handleWidth = minHandle.offsetWidth

        let minPrice = minValueSpan.getAttribute("data-value"),
            maxPrice = maxValueSpan.getAttribute("data-value")

        function updateRange() {
            const minPos = minHandle.offsetLeft,
                maxPos = maxHandle.offsetLeft

            range.style.left = minPos + 'px'
            range.style.width = (maxPos - minPos) + 'px'

            const minValue = Math.round(minPrice + (minPos / (sliderWidth - handleWidth)) * (maxPrice - minPrice)),
                maxValue = Math.round(minPrice + (maxPos / (sliderWidth - handleWidth)) * (maxPrice - minPrice))
            minPriceInput.value = minValue
            maxPriceInput.value = maxValue
            minValueSpan.textContent = minValue + "грн"
            maxValueSpan.textContent = maxValue + "грн"
        }

        function handleDrag(e, handle) {
            e.preventDefault()

            const handleStartX = e.clientX || e.touches[0].clientX
            const handleStartLeft = handle.offsetLeft

            const onMove = (moveEvent) => {
                const moveX = moveEvent.clientX || moveEvent.touches[0].clientX
                let newLeft = moveX - handleStartX + handleStartLeft

                if (handle === minHandle) {
                    newLeft = Math.max(0, Math.min(newLeft, maxHandle.offsetLeft - handleWidth))
                } else {
                    newLeft = Math.max(minHandle.offsetLeft + handleWidth, Math.min(newLeft, sliderWidth - handleWidth))
                }

                handle.style.left = newLeft + 'px'
                updateRange()
            }

            const onEnd = () => {
                document.removeEventListener('mousemove', onMove)
                document.removeEventListener('mouseup', onEnd)
                document.removeEventListener('touchmove', onMove)
                document.removeEventListener('touchend', onEnd)
            }

            document.addEventListener('mousemove', onMove)
            document.addEventListener('mouseup', onEnd)
            document.addEventListener('touchmove', onMove)
            document.addEventListener('touchend', onEnd)
        }

        minHandle.addEventListener('mousedown', (e) => handleDrag(e, minHandle))
        maxHandle.addEventListener('mousedown', (e) => handleDrag(e, maxHandle))
        minHandle.addEventListener('touchstart', (e) => handleDrag(e, minHandle))
        maxHandle.addEventListener('touchstart', (e) => handleDrag(e, maxHandle))

        updateRange()

    }
    // випадаючі категорії в каталозі
    function toggleVisibility(buttons, visibleClass, activeClass) {
        buttons.forEach((item) => {
            item.addEventListener("click", function (e) {
                e.preventDefault()
                console.log(item.nextElementSibling);
                const descriptionMore = item.nextElementSibling
                descriptionMore.classList.toggle(visibleClass)
                item.classList.toggle(activeClass)
            })
        })
    }

    const btnReadMore = document.querySelectorAll(".readmore"),
        menuReadMore = document.querySelectorAll(".readmore-menu"),
        menuReadMoreMain = document.querySelectorAll(".readmore-menu-main")

    toggleVisibility(btnReadMore, "visible", "readmore-active")
    toggleVisibility(menuReadMore, "visible-menu", "readmore-active-menu")
    toggleVisibility(menuReadMoreMain, "visible-menu", "readmore-active-menu-main")

    if (document.querySelector(".filter-btn-mobile")) {
        const filterMobileBtn = document.querySelector(".filter-btn-mobile"),
            filterMobile = document.querySelector(".filter"),
            cancelFilter = document.querySelector(".cancel-filter")

        filterMobileBtn.addEventListener("click", function (e) {
            e.preventDefault()
            // filterMobile.classList.add("filter-mobile-menu")
            filterMobile.style.left = "0"
            filterMobile.style.transition = "all .5s ease"
            blackFon.classList.add("black-fon-mobile")
            blackFon.style.left = "80%"
        })

        function closeFilter() {
            blackFon.classList.remove("black-fon-mobile")
            blackFon.style.left = "0"
            filterMobile.style.left = "-100%"
            filterMobile.style.transition = ""

        }
        cancelFilter.addEventListener("click", function (e) {
            // filterMobile.classList.remove("filter-mobile-menu")
            closeFilter()
        })
        blackFon.addEventListener("click", function () {
            closeFilter()

        })
    }

    //view catalog chacge
    if (document.querySelector(".catalog-container")) {
        const catalogContainer = document.querySelector(".catalog-container"),
            boxBtn = document.querySelector(".box a"),
            lineBtn = document.querySelector(".line a"),
            catalogCard = catalogContainer.querySelectorAll("figure")

        lineBtn.addEventListener("click", function () {
            this.classList.add("active-btn-card-line")
            boxBtn.classList.remove("active-btn-card")
            catalogContainer.classList.add("line-catalog")
            catalogContainer.classList.remove("grid-catalog")
            catalogCard.forEach(itemCard => {
                // itemCard.querySelector(".card-view-block").classList.add("grig-card-line")
                itemCard.querySelector(".main-info-card").classList.add("d-flex")
                itemCard.querySelector("picture").classList.add("picture-line")
                // itemCard.querySelector(".flag").classList.add("flag-line")
            })
        })
        boxBtn.addEventListener("click", function () {
            this.classList.add("active-btn-card")
            lineBtn.classList.remove("active-btn-card-line")
            catalogContainer.classList.remove("line-catalog")
            catalogContainer.classList.add("grid-catalog")
            catalogCard.forEach(itemCard => {
                // itemCard.querySelector(".card-view-block").classList.remove("grig-card-line")
                itemCard.querySelector(".main-info-card").classList.remove("d-flex")
                itemCard.querySelector("picture").classList.remove("picture-line")
                // itemCard.querySelector(".flag").classList.remove("flag-line")
            })
        })

    }

    //popup registration-enter 
    const cabinetCta = document.querySelectorAll(".cabinet-cta"),
        blackFonReg = document.querySelector(".black-fon-popup"),
        popupCabinet = document.querySelector(".popup-cabinet"),
        cancelCabinetPopup = document.querySelector(".cancel-popup-cabinet"),
        eyeReg = document.querySelectorAll(".eye"),
        navigationMenuPopup = document.querySelector(".navigation-menu-catalog")

    cabinetCta.forEach(itemCta => {
        itemCta.addEventListener("click", function (e) {
            e.preventDefault()
            console.log("+")
            popupCabinet.style.display = "block"
            blackFonReg.style.display = "block"
            navigationMenuPopup.style.zIndex = "20"
        })
        cancelCabinetPopup.addEventListener("click", function (e) {
            e.preventDefault()
            popupCabinet.style.display = "none"
            blackFonReg.style.display = "none"
            navigationMenuPopup.style.zIndex = "30"

        })
    })

    // visible password
    eyeReg.forEach(eye => {
        eye.addEventListener('click', function (e) {
            e.preventDefault()
            const target = document.getElementById(this.getAttribute('data-target')),
                targerEye = this.querySelector("svg")
            console.log(targerEye);
            console.log(targerEye);
            if (target.type === 'password') {
                target.type = 'text'
                targerEye.style.display = "block"
                eye.classList.remove("closeEye")
            } else {
                target.type = 'password'
                targerEye.style.display = "none"
                eye.classList.add("closeEye")
            }
        })
    })
    const entryLink = document.querySelector('.d-flex.item-center.cta-reg .entry'),
        registrationLink = document.querySelector('.d-flex.item-center.cta-reg .registration'),
        entryForm = document.querySelector('.entry-form'),
        registrationForm = document.querySelector('.registration-form')

    entryLink.addEventListener('click', function () {
        entryLink.classList.add('active-link')
        registrationLink.classList.remove('active-link')
        entryForm.classList.add('active-form')
        registrationForm.classList.remove('active-form')
    })

    registrationLink.addEventListener('click', function () {
        registrationLink.classList.add('active-link')
        entryLink.classList.remove('active-link')
        registrationForm.classList.add('active-form')
        entryForm.classList.remove('active-form')
    })
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
            console.log(this.sliderCards.length);
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
                    console.log(element);
                    for (let index = 0; index < this.realCardsLength; index++) {
                        console.log(this.realCardsLength);
                        this.sliderDots[index].classList.remove("activeFade");
                        this.sliderCards[index].classList.remove("activeFade");
                    }
                    element.classList.add("activeFade")
                    this.sliderCards[element.dataset.order].classList.add("activeFade");
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

    let baseCardSliderWidth,
        sliderInterval
    if (window.innerWidth > 1024) {
        baseCardSliderWidth = window.innerWidth / 5
        console.log(baseCardSliderWidth);
    } else {
        baseCardSliderWidth = window.innerWidth / 4

    }
    if (document.querySelector(".category_container-slider")) {
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
        const categorySlider = new InfinitySlider(".category_container-slider", {
            isArrows: true,
            isDots: false,
            isSlidesToScrollAll: false,
            baseCardWidth: baseCardSliderWidth,
            gap: 20,
            isAutoplay: false,
            autoplaySpeed: 3000,
            transitionCard: "all 1.5s ease",
        })
        const productSlider = document.querySelectorAll(".card-product-slider")
        let sliderGalery = {}
        productSlider.forEach((sliderG, i) => {
            sliderGalery["img-key-g" + (i + 1)] = new InfinitySlider("#sliderProduct" + (i + 1), {
                isArrows: true,
                isDots: false,
                isSlidesToScrollAll: false,
                baseCardWidth: baseCardSliderWidth,
                gap: 20,
                isAutoplay: false,
                autoplaySpeed: 3000,
                transitionCard: "all 1.5s ease",
            })
        })
        window.onresize = function () {
            categorySlider.init()
            Object.keys(sliderGalery).forEach(sliderKeyG => {
                sliderGalery[sliderKeyG].init()
            })
            mainSlider.init()
        }
        sliderInterval = setInterval(() => {
            categorySlider.init()
            clearInterval(sliderInterval)
            Object.keys(sliderGalery).forEach(sliderKeyG => {
                sliderGalery[sliderKeyG].init()
            })
            mainSlider.init()
        }, 100);
    }
    if (document.querySelector(".card-slider")) {
        const cardSlider = new InfinitySlider(".card-slider", {
            isArrows: true,
            isDots: false,
            isSlidesToScrollAll: false,
            baseCardWidth: baseCardSliderWidth,
            gap: 20,
            isAutoplay: false,
            autoplaySpeed: 3000,
            transitionCard: "all 1.5s ease",
        })

        window.onresize = function () {
            cardSlider.init()
        }
        cardSlider.init()
    }
    if (document.querySelector(".basket-slider")) {
        const cartSlider = new InfinitySlider(".basket-slider", {
            isArrows: true,
            isDots: false,
            isSlidesToScrollAll: false,
            baseCardWidth: baseCardSliderWidth,
            gap: 20,
            isAutoplay: false,
            autoplaySpeed: 3000,
            transitionCard: "all 1.5s ease",
        })

        window.onresize = function () {
            cartSlider.init()
        }
        cartSlider.init()
    }
    if (document.querySelector(".cabinet-slider")) {
        const cartCabinetSlider = new InfinitySlider(".cabinet-slider", {
            isArrows: true,
            isDots: false,
            isSlidesToScrollAll: false,
            baseCardWidth: baseCardSliderWidth,
            gap: 20,
            isAutoplay: false,
            autoplaySpeed: 3000,
            transitionCard: "all 1.5s ease",
        })
        cartCabinetSlider.init()
        window.onresize = function () {
            cartCabinetSlider.init()
        }
    }


    const buttons = document.querySelectorAll('.toggle-section')
    console.log(buttons);
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const target = this.dataset.target
            document.querySelectorAll('.change-container-main > div').forEach(section => {
                section.classList.add('d-none')
                section.classList.remove('active-main')
            })
            buttons.forEach(btn => btn.classList.remove('active-btn'))

            this.classList.add('active-btn')
            const selectedSection = document.querySelector(`.${target}`)
            selectedSection.classList.remove('d-none')
            selectedSection.classList.add('active-main')
            setTimeout(() => {
                Object.keys(sliderGalery).forEach(sliderKeyG => {
                    sliderGalery[sliderKeyG].init()
                })
            }, 0);
        });
    });

    let carouselContainer = document.querySelector(".small-img"),
        imgBlock = document.querySelector(".img-block")

    // console.log(carouselContainer);
    if (!carouselContainer && imgBlock) {
        imgBlock.style.display = "block"
        imgBlock.style.maxHeight = "500px"
    }

    function slider() {
        const sliderContainer = document.querySelector('.carousel-card'),
            sliderImages = [...document.querySelectorAll('.carousel-item')],
            btnSlider = document.querySelectorAll(".btn"),
            imgBlock = document.querySelector(".img-block"),
            carouselContainer = document.querySelector(".small-img"),
            mainImg = document.querySelector(".main-img")
        let imageHeight = sliderImages[0].offsetHeight + 8,
            imageWidth = sliderImages[0].offsetWidth

        let containerHeight = imageHeight * 3
        console.log(containerHeight, imageWidth);
        imgBlock.style.height = containerHeight + "px"
        carouselContainer.style.height = containerHeight + "px"
        let currentSlide = 0
        btnSlider.forEach(itemBtn => {
            if (sliderImages.length > 3) {
                itemBtn.style.display = "block"
                // mainImg.style.padding = "20px 0"
                carouselContainer.style.padding = "8px 0 0"
            } else {
                itemBtn.style.display = "none"
                carouselContainer.style.padding = ""
            }
        })

        function nextSlide(e) {
            e.preventDefault()
            if (currentSlide > 0) {
                currentSlide--
                sliderContainer.style.transition = 'transform 0.3s ease-in-out'
                sliderContainer.style.transform = `translateY(-${currentSlide * imageHeight}px)`
            }
        }

        function prevSlide(e) {
            e.preventDefault()
            if (currentSlide < sliderImages.length - 3) {
                currentSlide++
                sliderContainer.style.transition = 'transform 0.3s ease-in-out'
                sliderContainer.style.transform = `translateY(-${currentSlide * imageHeight}px)`
            }
        }

        const nextButton = document.querySelector('.btn-next')
        if (nextButton) {
            nextButton.style.width = imageWidth + "px"
            nextButton.addEventListener('click', nextSlide)
        }

        const prevButton = document.querySelector('.btn-prev')
        if (prevButton) {
            prevButton.style.width = imageWidth + "px"
            prevButton.addEventListener('click', prevSlide)
        }

    }

    if (document.querySelector(".carousel-item")) {
        slider()
        window.addEventListener('resize', () => {
            slider()
        })
    }


    const image = document.querySelectorAll(".card img")

    image.forEach(itemImg => {
        itemImg.addEventListener("click", function () {
            var targetUrl = "card.html"

            window.location.href = targetUrl
        })
    })

    if (document.querySelector("#delivery")) {
        const buttons = document.querySelectorAll('.transparent-cta'),
            sections = document.querySelectorAll('.description-product, .pay-block, .comment-card, .delivery-card')

        function hideAllSections() {
            sections.forEach(section => section.classList.remove('active'))
        }

        function deactivateAllButtons() {
            buttons.forEach(button => button.classList.remove('active'))
        }

        buttons.forEach(button => {
            button.addEventListener('click', function (event) {
                event.preventDefault()
                console.log("+");
                const target = button.getAttribute('data-target')

                hideAllSections()
                deactivateAllButtons()

                const sectionToShow = document.getElementById(target)
                if (sectionToShow) {
                    sectionToShow.classList.add('active')
                    button.classList.add('active')
                }
            })
        })

        hideAllSections()
        deactivateAllButtons()
        document.querySelector('.description-product').classList.add('active')
        document.querySelector('[data-target="about"]').classList.add('active')
    }

    //mobile slider
    if (window.innerWidth < 1024 && document.querySelector(".btn-slider")) {
        const imageItems = document.querySelectorAll(".image-for-slider"),
            imgSliderBlock = document.querySelector(".img-slider"),
            btnSlider = document.querySelector(".btn-slider")

        imageItems.forEach((imgItem, index) => {
            let sliderImageItem = document.createElement("img"),
                inputSliderRadio = document.createElement("input"),
                labelslider = document.createElement("label")

            inputSliderRadio.type = "radio"
            inputSliderRadio.name = "slider-radio"
            inputSliderRadio.id = `slider-radio-${index}`
            labelslider.setAttribute("for", `slider-radio-${index}`)
            if (index === 0) inputSliderRadio.checked = true

            sliderImageItem.src = imgItem.src
            sliderImageItem.classList.add("mobile-slider")
            if (index === 0) sliderImageItem.classList.add("active")

            imgSliderBlock.appendChild(sliderImageItem)
            btnSlider.appendChild(inputSliderRadio)
            btnSlider.appendChild(labelslider)
        })

        const radioButtons = document.querySelectorAll('input[name="slider-radio"]'),
            comments = document.querySelectorAll('.mobile-slider')
        let currentIndexRadio = 0

        function switchComment(index) {
            radioButtons[index].checked = true
            comments.forEach((comment) => {
                comment.classList.remove('active')
            })
            comments[index].classList.add('active')
            currentIndexRadio = index
        }

        radioButtons.forEach((radioButton, index) => {
            radioButton.addEventListener('change', () => {
                switchComment(index)
            })
        })

        imgSliderBlock.addEventListener('touchstart', handleTouchStart, false)
        imgSliderBlock.addEventListener('touchmove', handleTouchMove, false)

        let x1 = null

        function handleTouchStart(evt) {
            const firstTouch = evt.touches[0]
            x1 = firstTouch.clientX
        }

        function handleTouchMove(evt) {
            if (!x1) {
                return false
            }

            let x2 = evt.touches[0].clientX
            let xDiff = x2 - x1

            if (xDiff > 0) {
                currentIndexRadio = (currentIndexRadio - 1 + radioButtons.length) % radioButtons.length
            } else {
                currentIndexRadio = (currentIndexRadio + 1) % radioButtons.length
            }

            switchComment(currentIndexRadio)

            x1 = null
        }
    }

    //slider fow window width > 1024
    function slider() {
        const sliderContainer = document.querySelector('.carousel-card'),
            sliderImages = [...document.querySelectorAll('.carousel-item')],
            btnSlider = document.querySelectorAll(".btn"),
            imgBlock = document.querySelector(".img-block"),
            carouselContainer = document.querySelector(".small-img"),
            mainImg = document.querySelector(".main-img")

        let imageHeight = sliderImages[0].offsetHeight + 10,
            containerHeight = imageHeight * 2 + 55,
            imageWidth = sliderImages[0].offsetWidth
        // console.log(btnHeight);
        imgBlock.style.height = containerHeight + 50 + "px"
        carouselContainer.style.height = containerHeight + "px"
        let currentSlide = 0
        btnSlider.forEach(itemBtn => {
            if (sliderImages.length > 2) {
                itemBtn.style.display = "block"
                carouselContainer.style.padding = "75px 0 25px"
                carouselContainer.style.margin = "0 0 25px"
            } else {
                itemBtn.style.display = "none"
                carouselContainer.style.padding = ""
            }
        })

        function nextSlide(e) {
            e.preventDefault()
            if (currentSlide > 0) {
                currentSlide--
                sliderContainer.style.transition = 'transform 0.3s ease-in-out'
                sliderContainer.style.transform = `translateY(-${currentSlide * imageHeight}px)`
            }
        }

        function prevSlide(e) {
            e.preventDefault()
            if (currentSlide < sliderImages.length - 2) {
                currentSlide++
                sliderContainer.style.transition = 'transform 0.3s ease-in-out'
                sliderContainer.style.transform = `translateY(-${currentSlide * imageHeight}px)`
            }
        }

        const nextButton = document.querySelector('.btn-next')
        if (nextButton) {
            nextButton.style.width = imageWidth + "px"
            nextButton.querySelector("svg").style.width = imageWidth + "px"
            nextButton.addEventListener('click', nextSlide)
        }

        const prevButton = document.querySelector('.btn-prev')
        if (prevButton) {
            prevButton.style.width = imageWidth + "px"
            prevButton.querySelector("svg").style.width = imageWidth + "px"
            prevButton.addEventListener('click', prevSlide)
        }

    }
    if (document.querySelector(".img-block")) {
        slider()
        window.addEventListener('resize', () => {
            slider()
        })
    }
    if (document.querySelector(".main-img img")) {
        const mainImg = document.querySelector(".main-img img"),
            smallImg = document.querySelectorAll(".small-img img")

        smallImg.forEach(img => {
            img.style.cursor = "pointer"
            img.addEventListener("click", function () {
                const smallUrl = this.src;
                const bigUrl = mainImg.src;
                mainImg.src = smallUrl;
                this.src = bigUrl;
            })
        })
    }

    let icon = {
        success: '<span class="material-symbols-outlined"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g fill="#20bf55" data-name="Flat Color"><path d="M12 22.75a10.75 10.75 0 0 1 0-21.5 10.53 10.53 0 0 1 4.82 1.15.75.75 0 0 1-.68 1.34 9 9 0 0 0-4.14-1A9.25 9.25 0 1 0 21.25 12a2 2 0 0 0 0-.25.75.75 0 1 1 1.5-.14V12A10.76 10.76 0 0 1 12 22.75z" fill="#045d22" opacity="1" data-original="#20bf55" class=""></path><path d="M11.82 15.41a.7.7 0 0 1-.52-.22l-4.83-4.74a.75.75 0 0 1 0-1.06.77.77 0 0 1 1.07 0l4.29 4.23 9.65-9.49a.77.77 0 0 1 1.07 0 .75.75 0 0 1 0 1.06l-10.18 10a.74.74 0 0 1-.55.22z" fill="#045d22" opacity="1" data-original="#20bf55" class=""></path></g></g></svg></span>',
        info: '<span class="material-symbols-outlined"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" x="0" y="0" viewBox="0 0 330 330" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M165 0C74.019 0 0 74.02 0 165.001 0 255.982 74.019 330 165 330s165-74.018 165-164.999S255.981 0 165 0zm0 300c-74.44 0-135-60.56-135-134.999S90.56 30 165 30s135 60.562 135 135.001C300 239.44 239.439 300 165 300z" fill="#000000" opacity="1" data-original="#000000" class=""></path><path d="M164.998 70c-11.026 0-19.996 8.976-19.996 20.009 0 11.023 8.97 19.991 19.996 19.991 11.026 0 19.996-8.968 19.996-19.991 0-11.033-8.97-20.009-19.996-20.009zM165 140c-8.284 0-15 6.716-15 15v90c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15v-90c0-8.284-6.716-15-15-15z" fill="#000000" opacity="1" data-original="#000000" class=""></path></g></svg></span>',
    };
    let toastTimeout
    const showToast = (
        message = "Sample Message",
        toastType = "info",
        duration = 5000) => {
        if (!Object.keys(icon).includes(toastType)) toastType = "info";
        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }
        let box = document.createElement("div");
        box.classList.add(
            "toast", `toast-${toastType}`);
        box.innerHTML = ` <div class="toast-content-wrapper"> 
                          <div class="toast-icon"> 
                          ${icon[toastType]} 
                          </div> 
                          <div class="toast-message">${message}</div> 
                          <div class="toast-progress"></div> 
                          </div>`;
        duration = duration || 5000;
        box.querySelector(".toast-progress").style.animationDuration =
            `${duration / 1000}s`;
    
        let toastAlready =
            document.body.querySelector(".toast");
        if (toastAlready) {
            toastAlready.remove();
        }
    
        document.body.appendChild(box)
    
        document.body.querySelector(".toast").style.zIndex = "10000"
    
        toastTimeout = setTimeout(function () {
            document.body.querySelector(".toast").style.zIndex = "-10"
        }, 5000)
    };

    const rateBlocks = document.querySelectorAll('.rate-stars')
    rateBlocks.forEach(block => {
        const stars = block.querySelectorAll('.star-review')

        stars.forEach((star, index) => {
            star.addEventListener('click', function () {
                setRating(stars, index + 1)
            })
        })

        function setRating(stars, rating) {
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.classList.add('active')
                } else {
                    star.classList.remove('active')
                }
            })
        }
    })
    
    if(window.innerWidth < 1024 && document.querySelector('.review-btn')) {
        const form = document.querySelector('.rewiev-form form') 
    
        form.addEventListener('submit', function (event) {
            let isValid = false;
            const rateBlocks = document.querySelectorAll('.rate-stars')
    
            rateBlocks.forEach(block => {
                const stars = block.querySelectorAll('.star-review.active')
                if (stars.length > 0) {
                    isValid = true 
                }
            })
    
            if (!isValid) {
                event.preventDefault() 
                showToast("Будь ласка, поставте оцінку.")
            }
        })
        const rewievBtn = document.querySelector('.review-btn'),
            formReviewBtn = document.querySelector('.review-form-btn'),
            rewievs = document.querySelector('.revies'),
            formReview = document.querySelector('.rewiev-form ')

            rewievBtn.addEventListener('click', function () {
                rewievBtn.classList.add('active-link')
                formReviewBtn.classList.remove('active-link')
                rewievs.classList.add('d-block')
                formReview.classList.remove('d-block')
            })

            formReviewBtn.addEventListener('click', function () {
                formReviewBtn.classList.add('active-link')
                rewievBtn.classList.remove('active-link')
                formReview.classList.add('d-block')
                rewievs.classList.remove('d-block')
            })
    }
    function isValidPhoneNumber(phoneNumber) {
        return /^\+?(\d{2})?([(]?\d{3}[)]?)\s?[-]?\s?(?:\d{3})\s?[-]?(?:\s?\d{2})\s?[-]?(?:\s?\d{2})$/.test(phoneNumber)
    }
    const inputMasks = document.querySelectorAll(".inputMask")

    inputMasks.forEach(function (inputMask) {
        inputMask.addEventListener("click", function () {
            if (!inputMask.value) {
                inputMask.value = "+380"
            }
        })

        inputMask.addEventListener("input", function () {
            let inputValue = inputMask.value
            let cleanedValue = inputValue.replace(/[^\d+]/g, "")

            inputMask.value = cleanedValue

            if (cleanedValue.length > 13) {
                inputMask.value = cleanedValue.slice(0, 13)
            }

            if (!cleanedValue.startsWith("+380")) {
                inputMask.value = "+380" + cleanedValue.slice(3)
            }
        })
    })
    if (document.querySelector('#userPhone')) {
        const phoneInput = document.querySelector('#userPhone')

        phoneInput.addEventListener('input', function () {
            let phoneNumber = phoneInput.value.trim()
            const mask = "+380"

            if (!phoneNumber.startsWith(mask)) {
                phoneNumber = mask + phoneNumber
            }

            let cleanedValue = phoneNumber.replace(/[^\d+]/g, "")

            if (cleanedValue.length > 13) {
                cleanedValue = cleanedValue.slice(0, 13)
            }

            const validInput = isValidPhoneNumber(cleanedValue)

            if (validInput && cleanedValue.length === 13) {
                phoneInput.style.borderColor = 'green'
            } else {
                phoneInput.style.borderColor = 'red'
            }
        })
    }
    if(document.querySelectorAll(".count-container") && window.innerWidth < 1024) {
        const countBlock = document.querySelectorAll(".count-container"),
            parentDescr = document.querySelectorAll(".description-cart")
    
            countBlock.forEach((item, index )=> {
                parentDescr[index].appendChild(item)
            })
    }
    // function rearrangeSections() {
    //     if (window.innerWidth < 1024) {
    //         const sections = [{
    //                 buttonSelector: '.haracteristic-btn a',
    //                 targetAttr: 'data-target',
    //                 sectionSelector: '.description-product, .haracteristic-block, .comment-card, .delivery-card',
    //                 initialButtonSelector: '.transparent-cta[data-target="about"]',
    //                 initialSectionId: 'about',
    //                 readmoreClass: 'readmore',
    //                 moreClass: 'description-more',
    //                 activeClass: 'readmore-active',
    //                 visibleClass: 'visible'
    //             },
    //             {
    //                 buttonSelector: '.menu-help-item a',
    //                 targetAttr: 'data-href',
    //                 sectionSelector: '.help-content',
    //                 initialButtonSelectorNoActive: '', //якщо треба зробити щось активним тоді додати туди селектор
    //                 initialSectionId: 'aboutUs',
    //                 readmoreClass: 'readmore',
    //                 moreClass: 'description-more',
    //                 activeClass: 'readmore-active',
    //                 visibleClass: 'visible'
    //             }
    //         ]

    //         sections.forEach(({
    //             buttonSelector,
    //             targetAttr,
    //             sectionSelector,
    //             initialButtonSelector,
    //             initialSectionId,
    //             readmoreClass,
    //             moreClass,
    //             activeClass,
    //             visibleClass
    //         }) => {
    //             document.querySelectorAll(buttonSelector).forEach(button => {
    //                 let targetId = button.getAttribute(targetAttr)
    //                 let targetSection = document.getElementById(targetId)
    //                 if (targetSection) {
    //                     button.insertAdjacentElement('afterend', targetSection)
    //                 }
    //             })

    //             document.querySelectorAll(`${buttonSelector}[${targetAttr}]`).forEach(button => {
    //                 button.classList.add(readmoreClass)
    //             })

    //             document.querySelectorAll(sectionSelector).forEach(section => {
    //                 section.classList.add(moreClass)
    //             })

    //             const initialButton = document.querySelector(initialButtonSelector),
    //                 initialSection = document.getElementById(initialSectionId)

    //             if (initialButton && initialSection) {
    //                 initialButton.classList.add(activeClass)
    //                 initialSection.classList.add(visibleClass)
    //             }
    //         })
    //     }
    // }

    // function handleHashChange() {
    //     if (window.innerWidth < 1024) {
    //         const hash = window.location.hash.substring(1) // Remove the '#' from the hash
    //         if (hash) {
    //             document.querySelectorAll('.help-content').forEach(section => {
    //                 section.classList.remove('visible')
    //                 console.log(section)
    //             })

    //             document.querySelectorAll('.menu-help-item a').forEach(button => {
    //                 button.classList.remove('readmore-active')
    //             })

    //             const targetLink = document.querySelector(`.menu-help-item a[data-href="${hash}"]`)
    //             const targetSection = document.getElementById(hash)

    //             if (targetLink && targetSection) {
    //                 targetLink.classList.add('readmore-active')
    //                 targetSection.classList.add('visible')
    //             }
    //         }
    //     }
    // }

    // document.querySelectorAll('.help-sub-menu a').forEach(link => {
    //     link.addEventListener('click', function () {
    //         setTimeout(handleHashChange, 0)
    //     })
    // })

    // rearrangeSections()
    // handleHashChange()
    // window.addEventListener('hashchange', handleHashChange)
    // page with help information - navigation
    if (document.querySelector(".menu-help-item ")) {
        const ctaHelp = document.querySelectorAll(".menu-help-item a")

        ctaHelp.forEach(helpItem => {
            helpItem.addEventListener("mouseenter", function () {
                helpItem.classList.add("hover-cta-help")
            })
            helpItem.addEventListener("mouseleave", function () {
                helpItem.classList.remove("hover-cta-help")
            })
        })


    }
    if (document.querySelector('.help-content')) {
        const menuItems = document.querySelectorAll('.menu-help-item a'),
            contentSections = document.querySelectorAll('.help-content')

        function activateSection(target) {
            menuItems.forEach(i => i.classList.remove('active-cta-help'))

            const activeItem = Array.from(menuItems).find(i => i.getAttribute('data-href') === target)
            if (activeItem) {
                activeItem.classList.add('active-cta-help')
            }

            contentSections.forEach(section => {
                section.style.display = 'none'
                section.classList.remove('active-help')
            })

            const targetSection = document.getElementById(target)
            if (targetSection) {
                targetSection.style.display = 'block'
                targetSection.classList.add('active-help')
            }
        }

        if (menuItems.length > 0) {
            menuItems.forEach(item => {
                item.addEventListener('click', function (event) {
                    event.preventDefault()
                    const target = this.getAttribute('data-href')
                    activateSection(target)
                    history.pushState(null, '', `#${target}`)
                })
            })

            const hash = window.location.hash.substring(1)
            if (hash) {
                activateSection(hash)
            } else {
                const initialSection = document.getElementById(menuItems[0].getAttribute('data-href'))
                if (initialSection) {
                    initialSection.style.display = 'block'
                    initialSection.classList.add('active-help')
                }
            }

            window.addEventListener('hashchange', function () {
                const newHash = window.location.hash.substring(1)
                activateSection(newHash)
            })
        }

    }
})