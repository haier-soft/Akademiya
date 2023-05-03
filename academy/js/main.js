window.onload = function () {
  setTimeout(() => {
    document.body.classList.add("loaded")
    document.body.classList.remove("no-scroll")
  }, 2000);
}
const breadCrumbs = document.querySelector(".breadcrumbs")
const header = document.querySelector(".header")
const menuMobileBtn = document.querySelector('.menu-mobile__btn');
const menuMobile = document.querySelector('.menu-mobile'); 
const iconMenu = document.querySelector('.icon-menu');
const mobileNavItem = document.querySelectorAll('.navmenu-mobile__item');
const pagesHero = document.querySelector(".pages-hero__container")
const fixedBlocks = document.querySelectorAll(".fixed-block")
const feedbackBtn = document.querySelectorAll(".feedback-btn")
const modal = document.querySelectorAll(".modal")
const feedbackModal = document.querySelector(".feedback-modal")
const successModal = document.querySelector(".success-modal")
const errorModal = document.querySelector(".error-modal")
const customSelect = document.querySelectorAll(".select-custom")
const pageContent = document.querySelectorAll(".page-content")
let paddingValue = window.innerWidth > 325 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0 
function windoOnResize() {
  setVh()
  paddingValue = window.innerWidth > 325 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0 
  if (document.querySelector(".main-articles")) {
    articlesSwiper();
  }
  if (pagesHero) addPaddingToContainer()
  viewproblemSolution()
}
window.addEventListener("resize", windoOnResize)
window.addEventListener('orientationchange', windoOnResize); 
function setVh() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};
setVh()
function isMobile() {
  if (window.innerWidth < 700) {
    return true;
  }
  return false;
};
// add padding to fixed element when owerflow hidden
function addPaddingToFixedEl(fixedblock) {
  fixedblock.forEach(block => block.style.paddingRight = paddingValue) 
}
// remove padding of fixed element when overflow visible
function removePaddingOfFixedEl(fixedblock) {
  fixedblock.forEach(block => block.style.paddingRight = '0px')
}
//smoothdrop
function smoothDrop(header, body) {
  if (!header.classList.contains("active")) {
    body.style.height = 'auto';
    let height = body.clientHeight + 'px';
    body.style.height = '0px';
    setTimeout(function () {
      body.style.height = height;
    }, 0);
  } else {
    body.style.height = '0px';
  }
  header.classList.toggle("active")
}
//tablet menu 
menuMobileBtn.addEventListener('click', (e) => {
  if (!menuMobile.classList.contains("active")) {
    menuMobileBtn.textContent = "Скрыть"
  } else {
    menuMobile.classList.remove("child-active")
    mobileNavItem.forEach(item => {
      item.classList.remove("active")
      item.querySelector(".subnavs").style.height = "0px"
    })
    menuMobileBtn.textContent = "Наши услуги"
  }
  menuMobile.classList.toggle("active")
  iconMenu.classList.toggle("active");
  document.body.classList.remove("no-scroll")
});
//phone menu
iconMenu.addEventListener("click", () => {
  if (iconMenu.classList.contains("active")) {
    mobileNavItem.forEach(item => {
      item.classList.remove("active")
      item.querySelector(".subnavs").style.height = '0';
    })
    setTimeout(() => {
      iconMenu.classList.remove("active");
      menuMobile.classList.remove("active");
      menuMobileBtn.textContent = "Наши услуги"
      document.body.classList.remove("no-scroll")
    }, 250);
  } else {
    iconMenu.classList.add("active");
    menuMobile.classList.add("active");
    document.body.classList.add("no-scroll")
    menuMobileBtn.textContent = "Скрыть"
  }
})
mobileNavItem.forEach(item => {
  item.addEventListener('click', ()=>{
    if (!isMobile()) {
      mobileNavItem.forEach(item => {
        item.classList.remove("active")
        item.querySelector(".subnavs").style.height = '0';
      })
    }
    smoothDrop(item, item.querySelector(".subnavs"))
    menuMobile.classList.add("child-active")
  } )
})
// show feedback modal
feedbackBtn.forEach(btn => {
  btn.addEventListener("click", () => {
    openModal(feedbackModal)
  })
})
//show modal
function openModal(modal) {
  if (!document.querySelector(".icon-menu").classList.contains("active")) {
    if (fixedBlocks) addPaddingToFixedEl(fixedBlocks) 
    document.body.style.paddingRight = paddingValue
    document.body.classList.add("no-scroll");
  }
  modal.classList.add("open")
  setTimeout(() => {
    modal.querySelector(".modal__inner").classList.add("open")
  }, 30) 
}
// unshow modal
function closeModal(modal) {
  modal.querySelector(".modal__inner").classList.remove("open")
  setTimeout(() => {
    if (!document.querySelector(".icon-menu").classList.contains("active")) {
      if (fixedBlocks) removePaddingOfFixedEl(fixedBlocks) 
      document.body.style.paddingRight = '0px' 
      document.body.classList.remove("no-scroll")
    }
    modal.classList.remove("open")  
  }, 500)
}
// unshow modal when clicked outside or close-btn
modal.forEach(item => {
  const modalContent = item.querySelector(".modal__content");
  let formCloseBtn = item.querySelector(".modal__close")
  formCloseBtn.addEventListener("click", e => {
    closeModal(item)
  })
  item.addEventListener("click", e => {
    if (!modalContent.contains(e.target)) {
      closeModal(item)
    }
  })
})
//form onsubmit
function formSuccess(form) {
  form.querySelectorAll("input").forEach(inp => inp.value = "")
  form.querySelector("textarea").value = ""
  feedbackModal.querySelector(".modal__inner").classList.remove("open")
  feedbackModal.classList.remove("open")
  openModal(successModal)
}
// add padding to container when header is fixed
function addPaddingToContainer() {
  if (breadCrumbs) {
    pagesHero.style.paddingTop = breadCrumbs.offsetHeight + header.offsetHeight + 40 + "px"
  }
}
if (pagesHero) addPaddingToContainer()
// item-problem button onclick
function viewproblemSolution() {
  const itemProblem = document.querySelectorAll(".item-problem") 
  if (window.innerWidth < 992) {  
    const openBtns = document.querySelectorAll(".item-problem__btn--open")   
    itemProblem.forEach(item => {
      item.querySelector(".item-problem__btn--open").addEventListener("click", () => {
        itemProblem.forEach(el => {
          el.classList.remove("open")
        })
        item.classList.add("open")
        item.querySelector(".item-problem__btn--close").addEventListener("click", () => {
          item.classList.remove("open")
        })
     })
    })
  } else {
    itemProblem.forEach(el => {
      el.classList.remove("open")
    })
  }
}
viewproblemSolution()

// position of close btn in fancybox
function fancyboxToolbarPos() {
  document.querySelector(".fancybox__toolbar").style.right = (window.innerWidth - document.querySelector(".fancybox__image").offsetWidth) /2 + "px"
  document.querySelector(".fancybox__toolbar").style.top = (window.innerHeight - document.querySelector(".fancybox__image").offsetHeight) /2 + "px"
}
const fancybox = Fancybox.bind('[data-fancybox="gallery"]', {
  infinite : true,
  autoFocus: false,
  dragToClose: false,
  closeButton: "inside",
  Toolbar: {
    display: ["close"],
    items: {
      close: {
        html: `<svg viewBox="0 0 60 60">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M60 30C60 46.5685 46.5685 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30ZM32.3655 29.8459L46.4942 43.9745L44.1371 46.3316L30.0085 32.2029L15.6891 46.5223L13.332 44.1653L27.6514 29.8459L13.4958 15.6903L15.8529 13.3333L30.0085 27.4889L43.9733 13.524L46.3303 15.881L32.3655 29.8459Z"/>
        </svg>`
      }
    }
  }, 
  Hash: false,
  template: {
    closeButton:`<svg viewBox="0 0 60 60">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M60 30C60 46.5685 46.5685 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30ZM32.3655 29.8459L46.4942 43.9745L44.1371 46.3316L30.0085 32.2029L15.6891 46.5223L13.332 44.1653L27.6514 29.8459L13.4958 15.6903L15.8529 13.3333L30.0085 27.4889L43.9733 13.524L46.3303 15.881L32.3655 29.8459Z"/>
    </svg>`
  },
  on: {
    ready:  (fancybox,slide) =>  { 
     setTimeout(() => {
      if (!fancybox.options.target.classList.contains("video-gallery")) {
        setTimeout(() => {
           fancyboxToolbarPos()
        }, 0);
      }
     }, 0); 
    },
  }
});

//video gallery fancybox
let fancyboxVideo = Fancybox.bind('[data-fancybox="video-gallery"]', {
  autoFocus: false,
  dragToClose: false,
  closeButton: "inside",
  Hash: false,
  template: {
    closeButton:`<svg viewBox="0 0 60 60">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M60 30C60 46.5685 46.5685 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30ZM32.3655 29.8459L46.4942 43.9745L44.1371 46.3316L30.0085 32.2029L15.6891 46.5223L13.332 44.1653L27.6514 29.8459L13.4958 15.6903L15.8529 13.3333L30.0085 27.4889L43.9733 13.524L46.3303 15.881L32.3655 29.8459Z"/>
    </svg>`
  },
  on: {
    initLayout:  (fancybox,slide) =>  {
      document.querySelector(".fancybox__container").style.paddingRight = paddingValue        
      document.querySelector(".fancybox__container").classList.add("video-gallery") 
    },
  }
}); 
// image-gallery fancyvox
let fancyboxImages = Fancybox.bind('[data-fancybox="gallery"]', {
  infinite : true,
  autoFocus: false,
  dragToClose: false,
  Toolbar: {
    display: ["close"],
    items: {
      close: {
        html: `<svg viewBox="0 0 60 60">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M60 30C60 46.5685 46.5685 60 30 60C13.4315 60 0 46.5685 0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30ZM32.3655 29.8459L46.4942 43.9745L44.1371 46.3316L30.0085 32.2029L15.6891 46.5223L13.332 44.1653L27.6514 29.8459L13.4958 15.6903L15.8529 13.3333L30.0085 27.4889L43.9733 13.524L46.3303 15.881L32.3655 29.8459Z"/>
        </svg>`
      }
    }
  }, 
  Hash: false,
  on: {
    initLayout:  (fancybox,slide) =>  {
      document.querySelector(".fancybox__container").style.paddingRight = paddingValue   
      if (fixedBlocks) addPaddingToFixedEl(fixedBlocks) 
    },
    done:  (fancybox,slide) =>  { 
        setTimeout(() => {
          fancyboxToolbarPos()
        }, 0); 
        window.addEventListener("resize", () => {
          if ( document.querySelector(".fancybox__image")) {
            fancyboxToolbarPos()
          }
        } )
    },
    resize: () => {
      console.log("s")
    },
  }
}); 

//animate statistics numbers
let statItem = document.querySelectorAll(".animate-numb");
statItem.forEach(item => {
  let callback = function (entries, observer) {
    entries.forEach(observe => {
      if (observe.isIntersecting) {
        let content = item.textContent
        let nmb =  item.getAttribute("data-numb");
        $(item)
        .prop('number', nmb)
        .animateNumber(
          {
            number: content,
            numberStep: function(now, tween) {
              var formatted = now.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
              $(tween.elem).text(formatted);
            } 
          },
          {
            easing: 'swing',
            duration: 1500
          }
      
        )
        observer.unobserve(item)
  }})
  }
  
  let observer = new IntersectionObserver(callback);
  observer.observe(item)
})
// add poster to video tag
if (pageContent) {
  pageContent.forEach(item => {
    const vid = item.querySelectorAll("video")
    for (let i = 0; i < vid.length; i++) {
      const a = document.createElement("a")
      a.classList.add("page-video")
      a.setAttribute("data-fancybox", "video-gallery")
      const parent = vid[i].parentNode
      a.setAttribute("href", vid[i].getAttribute("src"))
      a.appendChild(vid[i])
      parent.appendChild(a)
    }
  })
}
// custom select open/close
if (customSelect) {
  customSelect.forEach(select => {
    select.querySelector(".select-custom__selected").addEventListener("click", () => {
      if (!select.classList.contains("open")) {
        openSelectCustom(select)
      } else {
        closeSelectCustom(select)
      }
    })
  })
  
}
//open custom select
function openSelectCustom(select) {
  select.classList.add("open");
  select.setAttribute("aria-expanded", true);
  select.querySelectorAll(".select-custom__option").forEach(item => {
    item.addEventListener("click", (e) => {
      select.querySelectorAll(".select-custom__option").forEach(el => el.classList.remove("selected"))
      item.classList.add("selected");
      select.querySelector(".select-custom__selected").textContent = item.textContent;
      closeSelectCustom(select);
    });
  });
  document.addEventListener("click", function clickOutside(e) {
    if (!select.contains(e.target)) {
      closeSelectCustom(select)
      document.removeEventListener('click', clickOutside);
    }
  });
}
//close custom select
function closeSelectCustom(select) {
  select.classList.remove("open");
  select.setAttribute("aria-expanded", false);
}
//swiper "problemi" pervaya kolonka
if (document.querySelector(".main-problems1__swiper")) {
  let swiperProblems = new Swiper(".main-problems1__swiper", {
    slidesPerView: 1.35,
    observe: true,
    observeParents: true,
    spaceBetween: 8,
    breakpoints: {
      992.98: {
        slidesPerView: 4,
      },
      768.98: {
        slidesPerView: 3,
      },
      700.98: {
        slidesPerView: 2.7
      },
      480.98: {
        slidesPerView: 2
      }
    },
    navigation: {
      nextEl: '.main-problems1-btn--next',
      prevEl: '.main-problems1-btn--prev',
    }, 
    pagination: {
      el: '.main-problems1-pagination',
      type: 'bullets',
      clickable: true
    },
    scrollbar: {
      el: '.main-problems1-scrollbar',
      draggable: true,
    },
    speed: 800
  })
}
//swiper "problemi" vtoraya kolonka
if (document.querySelector(".main-problems2__swiper")) {
  let swiperProblems = new Swiper(".main-problems2__swiper", {
    slidesPerView: 1.35,
    observe: true,
    observeParents: true,
    spaceBetween: 8,
    breakpoints: {
      992.98: {
        slidesPerView: 4,
      },
      768.98: {
        slidesPerView: 3,
      },
      700.98: {
        slidesPerView: 2.7
      },
      480.98: {
        slidesPerView: 2
      }
    },
    navigation: {
      nextEl: '.main-problems2-btn--next',
      prevEl: '.main-problems2-btn--prev',
    }, 
    pagination: {
      el: '.main-problems2-pagination',
      type: 'bullets',
      clickable: true
    },
    scrollbar: {
      el: '.main-problems2-scrollbar',
      draggable: true,
    },
    speed: 800
  })
}
if (document.querySelector(".main-reviews__swiper")) {
  let swiperReviews = new Swiper(".main-reviews__swiper", {
    slidesPerView: 1,
    observe: true,
    observeParents: true,
    spaceBetween: 8,
    breakpoints: {
      768.98: {
        slidesPerView: 2,
      },
      576.98: {
        slidesPerView: 1.147,
      },
    },
    navigation: {
      nextEl: '.main-reviews-btn--next',
      prevEl: '.main-reviews-btn--prev',
    }, 
    pagination: {
      el: '.main-reviews-pagination',
      type: 'bullets',
      clickable: true
    },
    scrollbar: {
      el: '.main-reviews-scrollbar',
      draggable: true,
    },
    speed: 800
  })
}
//swiper "statyi"
let initArtcilesSwiper = false
let swiperArticles
function articlesSwiper() {
  if (window.innerWidth > 480) {
    if (!initArtcilesSwiper) {
      initArtcilesSwiper = true
      swiperArticles = new Swiper(".main-articles__swiper", {
        slidesPerView: 2,
        observe: true,
        observeParents: true,
        spaceBetween: 8,
        breakpoints: {
          700.98: {
            slidesPerView: 3,
          } 
        }, 
        navigation: {
          nextEl: '.main-articles-btn--next',
          prevEl: '.main-articles-btn--prev',
        }, 
        pagination: {
          el: '.main-articles-pagination',
          type: 'bullets',
          clickable: true
        },
        scrollbar: {
          el: '.main-articles-scrollbar',
          draggable: true,
        },
        speed: 800
      })
    }
  } else if (initArtcilesSwiper){
    swiperArticles.destroy()
    initArtcilesSwiper = false
  }
}
if (document.querySelector(".main-articles")) {
  articlesSwiper();
}
// swiper "usluqi"
if (document.querySelector(".main-services__swiper")) {
  let swiperServices = new Swiper(".main-services__swiper", {
    slidesPerView: 1.35,
    observe: true,
    observeParents: true,
    spaceBetween: 8,
    breakpoints: {
      992.98: {
        slidesPerView: 4,
      },
      768.98: {
        slidesPerView: 3,
      },
      700.98: {
        slidesPerView: 2.7
      },
      480.98: {
        slidesPerView: 2
      }
    },
    navigation: {
      nextEl: '.main-services-swiper-btn--next',
      prevEl: '.main-services-swiper-btn--prev',
    }, 
    pagination: {
      el: '.main-services-swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    scrollbar: {
      el: '.main-services-swiper-scrollbar',
      draggable: true,
    },
    speed: 800
  })
}
//swiper "nasha komanda"
if (document.querySelector(".main-team__swiper")) {
  let swiperTeam = new Swiper(".main-team__swiper", {
    slidesPerView: 1.34,
    observe: true,
    observeParents: true,
    spaceBetween: 8,
    breakpoints: {
      992.98: {
        slidesPerView: 4,
      },
      576.98: {
        slidesPerView: 3,
      },
      480.98: {
        slidesPerView: 2,
      },
    }, 
    pagination: {
      el: '.main-team-swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.main-team-swiper-btn--next',
      prevEl: '.main-team-swiper-btn--prev',
    }, 
    scrollbar: {
      el: '.main-team-swiper-scrollbar',
      draggable: true,
    },
    speed: 800
  })
}
// swiper "celi"
if (document.querySelector(".top-purpose__swiper")) {
  let swiperPurpose = new Swiper(".top-purpose__swiper", {
    slidesPerView: 1,
    observe: true,
    observeParents: true,
    grid: {
      rows: 3,
      fill: 'column'

    }, 
    breakpoints: {
      576.98: {
        slidesPerView: 2,
        grid: {
          rows: 3
        }, 
      },
      1150.98: {
        slidesPerView: 3,
        grid: {
          rows: 2,
        }, 
      },
    },
    navigation: {
      nextEl: '.top-purpose-swiper-btn--next',
      prevEl: '.top-purpose-swiper-btn--prev',
    }, 
    speed: 800
  })
}





