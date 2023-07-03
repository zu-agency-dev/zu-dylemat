import Draggabilly from 'draggabilly';

const btnZoomIn = document.querySelector('[zu-dylemat="btn-zoom-in"]') as HTMLButtonElement;
const btnZoomOut = document.querySelector('[zu-dylemat="btn-zoom-out"]') as HTMLButtonElement;
const sectionMap = document.querySelector('.section_map-container') as HTMLElement;

new Draggabilly(sectionMap, {
  handle: '.handle',
});

const minScale = 1;
const maxScale = 10;
const step = 1;
let scale = 1;

const getMapElement = document.querySelector('.section_map') as HTMLElement;
getMapElement.style.transform = `scale(${scale})`;

function zoomIn() {
  scale += step;
  scale = Math.min(Math.max(minScale, scale), maxScale);
  getMapElement.style.transform = `scale(${scale})`;
}

function zoomOut() {
  scale -= step;
  scale = Math.min(Math.max(minScale, scale), maxScale);
  getMapElement.style.transform = `scale(${scale})`;
}

btnZoomIn.addEventListener('click', (event: Event) => {
  event.preventDefault();
  zoomIn();
});

btnZoomOut.addEventListener('click', (event: Event) => {
  event.preventDefault();
  zoomOut();
});

function zoomScroll(event: WheelEvent) {
  event.preventDefault();
  scale += event.deltaY * -0.01;
  scale = Math.min(Math.max(minScale, scale), maxScale);
  getMapElement.style.transform = `scale(${scale})`;
}

getMapElement.addEventListener('wheel', zoomScroll, { passive: false });
const getBuildingX: NodeListOf<HTMLElement> = document.querySelectorAll(
  '[zu-dylemat="building-position-x"]'
);
const getBuildingY: NodeListOf<HTMLElement> = document.querySelectorAll(
  '[zu-dylemat="building-position-y"]'
);

const getEpisodeX: NodeListOf<HTMLElement> = document.querySelectorAll(
  '[zu-dylemat="episode-position-x"]'
);

const getEpisodeY: NodeListOf<HTMLElement> = document.querySelectorAll(
  '[zu-dylemat="episode-position-y"]'
);

function getPoints(argX: NodeListOf<HTMLElement>, argY: NodeListOf<HTMLElement>) {
  argX.forEach((element) => {
    const elementParent = element.parentElement as HTMLElement;
    const getPosition = Number(element.innerHTML);
    elementParent.style.left = `${getPosition}%`;
  });

  argY.forEach((element) => {
    const elementParent = element.parentElement as HTMLElement;
    const getPosition = Number(element.innerHTML);
    elementParent.style.top = `${getPosition}%`;
  });
}

function getCorrectPointContent() {
  const buttonContent = document.querySelectorAll(
    '[zu-dylemat="map-point"]'
  ) as NodeListOf<HTMLElement>;
  const tempContent = document.querySelectorAll<HTMLElement>('[zu-dylemat="section-name"]');
  const element = document.querySelectorAll<HTMLElement>('[zu-dylemat="details-content"]');
  buttonContent.forEach((button) => {
    button.addEventListener('click', () => {
      for (let i = 0; i < buttonContent.length; i++) {
        if (button.firstElementChild?.innerHTML !== tempContent[i].innerHTML) {
          element[i].style.display = 'none';
        } else {
          element[i].style.display = 'block';
        }
      }
    });
  });
}

getCorrectPointContent();
getPoints(getBuildingX, getBuildingY);
getPoints(getEpisodeX, getEpisodeY);
