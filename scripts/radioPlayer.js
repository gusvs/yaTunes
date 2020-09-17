export const radioPlayerInit = () => {
    const radio  = document.querySelector('.radio'),
        radioCoverImg  = document.querySelector('.radio-cover__img'),
        radioHeaderBig  = document.querySelector('.radio-header__big'),
        radioNavigation  = document.querySelector('.radio-navigation'),
        radioItem  = document.querySelectorAll('.radio-item'),
        radioStop  = document.querySelector('.radio-stop'),
        radioVolume = document.querySelector('.radio-volume'),
        radioVolumeMute = document.querySelector('.radio-volume-mute'),
        audio = new Audio();

    let currentVolume = 0;

    audio.type = 'audio/aac';

    radioStop.disabled = true;

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop');
        }
    };

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    }

    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parent = target.closest('.radio-item');
        selectItem(parent);
        const title = parent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;
        const img = parent.querySelector('.radio-img').src;
        radioCoverImg.src = img;
        radioStop.disabled = false;
        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    });

    radioVolumeMute.addEventListener('click', () => {
            if (audio.volume > 0) {
                currentVolume = audio.volume;
                audio.volume = 0;
                radioVolume.value = 0;
            } else {
                audio.volume = currentVolume;
                radioVolume.value = audio.volume * 100;
            }
        });

    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100
    });

    audio.volume = 0.1;
    radioVolume.value = audio.volume * 100;

    radioPlayerInit.stop = () => {
        audio.pause();
        changeIconPlay();
    };

};