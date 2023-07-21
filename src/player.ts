import { Howl, Howler } from 'howler';

const audioLink = document.querySelector('[zu-dylemat="audio-link"]') as HTMLElement;
const buttonPlay = document.querySelector('[zu-dylemat="button-play"]') as HTMLElement;
const buttonPause = document.querySelector('[zu-dylemat="button-pause"]') as HTMLElement;
const range = document.querySelector('input[type="range"]') as HTMLInputElement;
const rangeValueSpan = document.querySelector('[zu-dylemat="range-value"]') as HTMLElement;
const rateDropdown = document.querySelector('[zu-dylemat="rate-dropdown"]') as HTMLElement;
const rateItem = document.querySelector('[zu-dylemat="select-rate"]') as HTMLElement;
const currentRate = document.querySelector('[zu-dylemat="current-rate"]') as HTMLElement;
const mapPoint = document.querySelectorAll('[zu-dylemat="map-point"]') as NodeListOf<HTMLElement>;
const displayPoint = document.querySelector('[zu-dylemat="display-point"]') as HTMLElement;
const playIcon = document.querySelector('.play-icon-animated') as HTMLElement;
const pauseIcon = document.querySelector('.pause-button') as HTMLElement;

Howler.volume(0.5);
Howler.autoUnlock = true;
Howler.usingWebAudio = true;

const howl = new Howl({
  src: [audioLink.innerText],
  html5: true,
  onplay() {
    requestAnimationFrame(updateState);
    currentRate.innerHTML = 'x' + String(howl.rate());
    playIcon.style.animation = 'none';
    playIcon.style.color = '#E8E3DF';
    showAdditionalPoints();
  },
  onpause() {
    playIcon.style.color = '#3E3B38';
  },
  onload() {
    range.max = String(howl.duration());
    range.classList.remove('pointer-events-off');
    rateDropdown.classList.remove('pointer-events-off');
    cancelAnimationFrame(requestAnimationFrame(updateState));
  },
  onrate() {
    currentRate.innerHTML = 'x' + String(howl.rate());
    cancelAnimationFrame(requestAnimationFrame(updateState));
  },
  onseek() {
    requestAnimationFrame(updateState);
  },
  onend() {
    const endingsPL = [
      'przykoscielny-cmentarz',
      'grabarz',
      'rammbaum',
      'audycja-specjalna',
      'zjawa',
      'szmuglerka',
      'wieszcz',
    ];

    const endingsEN = ['special-show', 'gravedigger'];

    endingsPL.forEach((ending) => {
      if (window.location.href.indexOf(`/odcinki/${ending}`) > -1) {
        window.location.replace(window.location.origin + `/zakonczenia/${ending}`);
      }
    });

    endingsEN.forEach((ending) => {
      if (window.location.href.indexOf(`/episodes/${ending}`) > -1) {
        window.location.replace(window.location.origin + `/zakonczenia/${ending}`);
      }
    });

    rateDropdown.classList.add('pointer-events-off');
    showAdditionalPoints();
  },
});

const episodeImage = document
  .querySelector('.section-player-image-name > img')
  ?.getAttribute('src');

if ('mediaSession' in navigator) {
  navigator.mediaSession.setActionHandler('play', () => howl.play());
  navigator.mediaSession.setActionHandler('pause', () => howl.pause());
  navigator.mediaSession.metadata = new MediaMetadata({
    title: `${document.title.split(' ')[0]}`,
    artist: `Radio Trójmiasto`,
    artwork: [{ src: `${episodeImage}` }],
  });
}

const notifyNewPoints = document.querySelector('[zu-dylemat="notify-new-points"]') as HTMLElement;
const notificationClose = document.querySelector(
  '[zu-dylemat="notification-close"]'
) as HTMLElement;
const mapRoute = document.querySelector('[zu-dylemat="map-route"]') as HTMLImageElement;
const currentEpisodeButton = document.querySelectorAll(
  '[zu-dylemat="hide-current-episodes"]'
) as NodeListOf<HTMLElement>;

function showAdditionalPoints() {
  mapPoint.forEach((point) => {
    function showNextPoints() {
      return point.classList.remove('hide');
    }
    function hideCurrentPoints() {
      mapRoute?.classList.add('hide');
      currentEpisodeButton.forEach((button) => button.classList.add('hide'));
    }
    function showNotificationNewPoints() {
      notifyNewPoints?.classList.remove('hide');
    }

    notificationClose.addEventListener('click', () => {
      notifyNewPoints.classList.add('hide');
    });

    howl.on('end', () => {
      showNotificationNewPoints();
      showNextPoints();
    });

    function whenToShow(sec: number) {
      const showAt = sec;
      return showAt;
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation && parseInt(range.value) >= whenToShow(parseInt(displayPoint.innerHTML))) {
          showNextPoints();
          hideCurrentPoints();
        }
      });
    });

    const observerConfig = {
      characterData: true,
      attributes: true,
      childList: true,
      subtree: true,
    };

    observer.observe(range, observerConfig);
  });
}

howl.on('end', () => {
  playIcon.style.color = '#3E3B38';
  pauseIcon.style.color = '#3E3B38';
  showAdditionalPoints();
});

buttonPlay.addEventListener('click', () => {
  if (!howl.playing()) {
    howl.play();
    playIcon.style.color = '#E8E3DF';
    pauseIcon.style.color = '#3E3B38';
  }
});

buttonPause.addEventListener('click', () => {
  if (howl.playing()) {
    howl.pause();
    playIcon.style.color = '#3E3B38';
    pauseIcon.style.color = '#E8E3DF';
  }
});

range.addEventListener('input', () => {
  rangeValueSpan.innerText = range.value;
  const parsedValue = parseInt(range.value);
  howl.seek(parsedValue);
});

function updateState() {
  const seek = howl.seek() || 0;
  const parsedSeek = String(Math.floor(seek || 0));
  rangeValueSpan.innerText = parsedSeek;
  range.value = parsedSeek;
  range.setAttribute('value', rangeValueSpan.innerText);
  if (howl.playing()) {
    requestAnimationFrame(updateState);
  }

  function changeRate() {
    for (let i = 0; i < rateItem.children.length; i++) {
      rateItem.children.item(i)?.addEventListener('click', () => {
        howl.rate(Number(rateItem.children.item(i)?.getAttribute('rate')));
      });
    }
  }

  changeRate();
}
