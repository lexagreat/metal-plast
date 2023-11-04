(function isWebP() {
   function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }
   testWebP(function (support) {

      if (support == true) {
         document.querySelector('html').classList.add('webp');
      } else {
         document.querySelector('html').classList.add('no-webp');
      }
   });
})()
document.addEventListener("DOMContentLoaded", () => {
   headerMenu()
   tabs("input[name='projectsTabs']", ".projects__result")
   accordion(".faq-item__header", ".faq-item__content")
   videoWork()
})
const body = document.querySelector('body')
// new WOW().init();
// mask 
const maskOptions = {
   mask: '+{7} (000) 000-00-00',
};
const mask = IMask(document.getElementById('phone'), maskOptions);

function headerMenu() {
   const btn = document.querySelector('.header__burger')
   const menu = document.querySelector('.header__menu')
   const links = document.querySelectorAll('.scroll-link')
   btn.addEventListener("click", () => {
      if (btn.classList.contains("active")) {
         closeBurger()
      } else {
         openBurger()
      }
   })
   links.forEach(link => {
      link.addEventListener("click", (e) => {
         e.preventDefault();
         let attr = link.getAttribute('href')
         let section = document.querySelector(attr)
         let sectionY = section.getBoundingClientRect().top
         window.scrollTo({
            top: sectionY,
            behavior: "smooth",
         });
         closeBurger()
      })
   })
   function closeBurger() {
      btn.classList.remove("active")
      menu.classList.remove("active")
      body.classList.remove("lock")
   }
   function openBurger() {
      btn.classList.add("active")
      menu.classList.add("active")
      body.classList.add("lock")
   }
}
function videoWork() {
   const video = document.querySelector('.suggest__video video')
   const icon = document.querySelector('.suggest__icon')
   icon.addEventListener("click", () => {
      if (video.paused) {
         video.play();
         icon.classList.add("hidden")
      } else {
         video.pause();
         icon.classList.remove("hidden")

      }
   })
}
// shared
function accordion(linkSelector, contentSelector) {
   // получаем линки
   const openLinks = document.querySelectorAll(`${linkSelector}`)
   // контенты
   const contents = document.querySelectorAll(`${contentSelector}`)
   if (openLinks.length > 0) {
      for (let i = 0; i < openLinks.length; i++) {
         let openLink = openLinks[i];
         openLink.addEventListener("click", () => {
            // все прячем
            for (let j = 0; j < contents.length; j++) {
               // если хоть один открывается - return
               if (contents[j].classList.contains("collapsing")) {
                  return
               } // Иначе
               // все прячем
               slideHide(contents[j])
            }
            for (let j = 0; j < openLinks.length; j++) {
               openLinks[j].classList.remove("active");
            }
            // записываем в переменную нужный таб
            let content = openLink.nextElementSibling;
            // работаем с классами линка
            if (content.classList.contains("collapsing")) {
               return
            } else if (content.classList.contains("collapse_show")) {
               openLink.classList.remove("active")
            } else {
               openLink.classList.add("active")
            }
            // показываем нужный
            slideShow(content)

         })
      }
   }
}
function tabs(linkSelector, contentSelector) {
   const inputs = document.querySelectorAll(linkSelector)
   const contents = document.querySelectorAll(contentSelector)
   let value
   if (inputs.length) {
      console.log(inputs);
      inputs.forEach(item => {
         item.addEventListener("change", () => {
            if (item.checked) {
               value = item.value
            }
            contents.forEach(item => {
               item.classList.remove("active")
               if (item.getAttribute("data-tab") == value) {
                  item.classList.add("active")
               }
            })
         })
      })
   }
}
const productionSwiper = new Swiper('.production__slider', {
   spaceBetween: 24,
   slidesPerView: 1,
   navigation: {
      prevEl: ".production__btn_prev",
      nextEl: ".production__btn_next",
   },
   breakpoints: {
      992: {
         // freeMode: false,
         spaceBetween: 30,
         slidesPerView: "auto",
      },
   }
});
const reviewSwiper = new Swiper('.reviews__slider', {
   spaceBetween: 16,
   slidesPerView: 1,
   freeMode: false,
   breakpoints: {
      992: {
         freeMode: false,
         spaceBetween: 30,
         slidesPerView: 2,
      },
      550: {
         freeMode: true,
         slidesPerView: "auto",
      }
   }
});

function slideShow(el, duration = 300) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (el.classList.contains('collapsing') || el.classList.contains('collapse_show')) {
      return;
   }
   // удаляем класс collapse
   el.classList.remove('collapse');
   // сохраняем текущую высоту элемента в константу height (это значение понадобится ниже)
   const height = el.offsetHeight;
   // устанавливаем высоте значение 0
   el.style['height'] = 0;
   // не отображаем содержимое элемента, выходящее за его пределы
   el.style['overflow'] = 'hidden';
   // создание анимации скольжения с помощью CSS свойства transition
   el.style['transition'] = `height ${duration}ms ease`;
   // добавляем класс collapsing
   el.classList.add('collapsing');
   // получим значение высоты (нам этого необходимо для того, чтобы просто заставить браузер выполнить перерасчет макета, т.к. он не сможет нам вернуть правильное значение высоты, если не сделает это)
   el.offsetHeight;
   // установим в качестве значения высоты значение, которое мы сохранили в константу height
   el.style['height'] = `${height}px`;
   // по истечении времени анимации this._duration
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove('collapsing');
      // добавим классы collapse и collapse_show
      el.classList.add('collapse');
      el.classList.add('collapse_show');
      // удалим свойства height, transition и overflow
      el.style['height'] = '';
      el.style['transition'] = '';
      el.style['overflow'] = '';
   }, duration);
}
function slideHide(el, duration = 300) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (el.classList.contains('collapsing') || !el.classList.contains('collapse_show')) {
      return;
   }
   // установим свойству height текущее значение высоты элемента
   el.style['height'] = `${el.offsetHeight}px`;
   // получим значение высоты
   el.offsetHeight;
   // установим CSS свойству height значение 0
   el.style['height'] = 0;
   // обрежем содержимое, выходящее за границы элемента
   el.style['overflow'] = 'hidden';
   // добавим CSS свойство transition для осуществления перехода длительностью this._duration
   el.style['transition'] = `height ${duration}ms ease`;
   // удалим классы collapse и collapse_show
   el.classList.remove('collapse');
   el.classList.remove('collapse_show');
   // добавим класс collapsing
   el.classList.add('collapsing');
   // после завершения времени анимации
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove('collapsing');
      // добавим класс collapsing
      el.classList.add('collapse');
      // удалим свойства height, transition и overflow
      el.style['height'] = '';
      el.style['transition'] = '';
      el.style['overflow'] = '';
   }, duration);
}