const slidesData = [
  {
    city: 'Rostov-on-Don',
    location: 'Admiral',
    area: '81 m2',
    time: '3.5 months',
    cost: 'Upon request',
    image: 'img/image1.png',
  },
  {
    city: 'Sochi',
    location: 'Thieves',
    area: '105 m2',
    time: '4 months',
    cost: 'Upon request',
    image: 'img/image2.png',
  },
  {
    city: 'Rostov-on-Don',
    location: 'Patriotic',
    area: '93 m2',
    time: '3 months',
    cost: 'Upon request',
    image: 'img/image3.png',
  },
];

const slidesContainer = document.getElementById('slides');
const citiesNav = document.getElementById('cities-nav');
const indicatorsContainer = document.getElementById('indicators');
const prevButton = document.getElementById('previous'); // Кнопка "Предыдущий"
const nextButton = document.getElementById('next'); // Кнопка "Следующий"

let currentSlide = 0;

// Функция для создания HTML-разметки слайда
function createSlideHTML(slide, index) {
  return `
    <div class="completed-projects__wrapper">
      <div class="completed-projects__project-info__wrapper">
        <div class="completed-projects__project-info__caption">
          Completed projects
        </div>
        <div class="completed-projects__project-info__caption-line">
          <svg xmlns="http://www.w3.org/2000/svg" width="92" height="1" viewBox="0 0 92 1" fill="none">
            <rect x="-0.00012207" y="-0.00012207" width="92" height="1" fill="#E3B873" />
          </svg>
        </div>
        <div class="completed-projects__project-info__description__wrapper">
          <p>Only a small part of the work performed by our company is presented on the site. For 14 years on in the construction
            <br> market we have made happy more than 1000 families</p>
        </div>
        <table class="completed-projects__project-info__table">
          <tbody>
            <tr class="completed-projects__project-info__table__caption">
              <td>City:</td>
              <td>apartment area:</td>
            </tr>
            <tr class="completed-projects__project-info__table__text">
              <td>${slide.city}<br>${slide.location}</td>
              <td>${slide.area}</td>
            </tr>
            <tr class="completed-projects__project-info__table__caption">
              <td>Repair time:</td>
              <td>Repair Cost:</td>
            </tr>
            <tr class="completed-projects__project-info__table__text">
              <td>${slide.time}</td>
              <td>${slide.cost}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="completed-projects__cities-foto__wrapper">
        <div class="completed-projects__foto__wrapper">
          <img src="${slide.image}">  <!--  Используем путь из объекта slide -->
        </div>
      </div>
    </div>
  `;
}

// Рендерим слайды и навигацию
slidesData.forEach((slide, index) => {
  const slideEl = document.createElement('div');
  slideEl.className = 'itc-slider-item' + (index === 0 ? ' showing' : '');
  slideEl.innerHTML = createSlideHTML(slide, index); // Используем функцию для создания HTML
  slidesContainer.appendChild(slideEl);

  // Навигация по городам
  const cityEl = document.createElement('span');
  cityEl.className = 'itc-slider-cities-nav-elem' + (index === 0 ? ' nav-active' : '');
  cityEl.textContent = `${slide.city}, ${slide.location}`;
  cityEl.addEventListener('click', () => goToSlide(index)); // Используем addEventListener
  citiesNav.appendChild(cityEl);

  // Индикаторы
  const dot = document.createElement('li');
  dot.className = 'itc-slider-indicator' + (index === 0 ? ' indicator-active' : '');
  dot.addEventListener('click', () => goToSlide(index)); // Используем addEventListener
  indicatorsContainer.appendChild(dot);
});

function goToSlide(n) {
  const slides = document.querySelectorAll('#slides .itc-slider-item');
  const cities = document.querySelectorAll('#cities-nav .itc-slider-cities-nav-elem');
  const indicators = document.querySelectorAll('#indicators .itc-slider-indicator');

  slides[currentSlide].classList.remove('showing');
  cities[currentSlide].classList.remove('nav-active');
  indicators[currentSlide].classList.remove('indicator-active');

  currentSlide = (n + slidesData.length) % slidesData.length;

  slides[currentSlide].classList.add('showing');
  cities[currentSlide].classList.add('nav-active');
  indicators[currentSlide].classList.add('indicator-active');
}

// Добавляем обработчики событий на кнопки "Предыдущий" и "Следующий"
prevButton.addEventListener('click', () => goToSlide(currentSlide - 1));
nextButton.addEventListener('click', () => goToSlide(currentSlide + 1));
