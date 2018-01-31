import { COMPOSE } from './constants/sampleTypes';

export const getJingleIdsMock = () => [1, 2, 3, 4, 5, 6];

import img0 from './mockImages/render_0.png';
import img1 from './mockImages/render_1.png';
import img2 from './mockImages/render_2.png';
import img3 from './mockImages/render_3.png';
import img4 from './mockImages/render_4.png';
import img5 from './mockImages/render_5.png';
import img6 from './mockImages/render_6.png';
import img7 from './mockImages/render_7.png';
import img8 from './mockImages/render_8.png';
import img9 from './mockImages/render_9.png';
import img10 from './mockImages/render_10.png';
import img11 from './mockImages/render_11.png';
import img12 from './mockImages/render_12.png';
import img13 from './mockImages/render_13.png';
import img14 from './mockImages/render_14.png';

export const getJingleMetadata = (jingleType) => {
  switch (parseInt(jingleType)) {
    case 0:
      return { type: COMPOSE, name: 'Bass Groove', source: '../audio/bass-groove.wav' };
    case 1:
      return { type: COMPOSE, name: 'Boomin Melody', source: '../audio/boomin-melody.wav' };
    case 2:
      return { type: COMPOSE, name: 'Brasil tropical', source: '../audio/brasil-ritmo-tropical-7.wav' };
    case 3:
      return { type: COMPOSE, name: 'Bassline', source: '../audio/catchy-af-bassline-2.wav' };
    case 4:
      return { type: COMPOSE, name: 'Drum beat', source: '../audio/catchy-af-drumbeat.wav' };
    case 5:
      return { type: COMPOSE, name: 'Synth lead', source: '../audio/catchy-af-synth-lead.wav' };
    case 6:
      return { type: COMPOSE, name: 'Quiet Bit', source: '../audio/cool-quiet-beat.wav' };
    case 7:
      return { type: COMPOSE, name: 'Crystal bells', source: '../audio/crystal-bells-70-bmp.wav' };
    case 8:
      return { type: COMPOSE, name: 'Distorted drum', source: '../audio/distorted-808-drum.wav' };
    case 9:
      return { type: COMPOSE, name: 'Drum loop', source: '../audio/drumloop-trap-with-808.wav' };
    case 10:
      return { type: COMPOSE, name: 'Enjoy drum', source: '../audio/enjoy-drm-90bmp.wav'  };
    case 11:
      return { type: COMPOSE, name: 'Flair melody', source: '../audio/flair-melody-2.wav' };
    case 12:
      return { type: COMPOSE, name: 'Funky bass', source: '../audio/funky-bass.wav' };
    case 13:
      return { type: COMPOSE, name: 'GG melody', source: '../audio/gg-melody.wav' };
    case 14:
      return { type: COMPOSE, name: 'Giving melody', source: '../audio/giving80bmp-drm.wav' };
    case 15:
      return { type: COMPOSE, name: 'Hard harp', source: '../audio/hard-harp.wav' };
    case 16:
      return { type: COMPOSE, name: 'Hi Hat', source: '../audio/hi-hat-120bpm.wav' };
    case 17:
      return { type: COMPOSE, name: 'Huge Melody', source: '../audio/huge-melody.wav' };
    case 18:
      return { type: COMPOSE, name: 'Hister1a', source: '../audio/hyster1a-boombap-beat.wav' };
    case 19:
      return { type: COMPOSE, name: 'I have beats', source: '../audio/i-have-132bpm.wav' };
    case 20:
      return { type: COMPOSE, name: 'Love lead', source: '../audio/love-lead-v1-120bpm.wav' };
    default:
      return { type: COMPOSE, name: '', source: '' };
  }
}

// Put some path resolver for audio source
export const getJingleFromJingleId = (jingleId) => {
  switch (jingleId) {
    case 1:
      return { id: jingleId, type: COMPOSE, name: 'Jingle', source: '../audio/s1.wav' };
    case 2:
      return { id: jingleId, type: COMPOSE, name: 'Some crazy', source: '../audio/s2.wav' };
    case 3:
      return { id: jingleId, type: COMPOSE, name: 'Yup', source: '../audio/s3.wav' };
    case 4:
      return { id: jingleId, type: COMPOSE, name: 'Give it a go', source: '../audio/s4.wav' };
    case 5:
      return { id: jingleId, type: COMPOSE, name: 'wup wup', source: '../audio/s5.wav' };
    case 6:
      return { id: jingleId, type: COMPOSE, name: 'Kek', source: '../audio/s6.wav' };
    default:
      return { id: 0, type: '', name: '', source: '' };
  }
};

export const getJingleSlots = () => [
  { accepts: [COMPOSE], lastDroppedItem: null },
  { accepts: [COMPOSE], lastDroppedItem: null },
  { accepts: [COMPOSE], lastDroppedItem: null },
  { accepts: [COMPOSE], lastDroppedItem: null },
  { accepts: [COMPOSE], lastDroppedItem: null },
];

export const getSongs = () => [
  { id: 0, source: '../audio/cat.wav', sale: true, price: '0.0001', author: 'Saban Saulic', name: 'OFFICIAL', imageSrc: img0 },
  { id: 1, source: '../audio/cat.wav', sale: true, price: '0.0001', author: 'Ceca', name: 'Beograd', imageSrc: img1 },
  { id: 2, source: '../audio/cat.wav', sale: true, price: '0.0001', author: 'Jaguar', name: 'BOG', imageSrc: img2 },
  { id: 3, source: '../audio/cat.wav', sale: true, price: '0.0001', author: 'Lil pump', name: 'Gucci Gang', imageSrc: img3 },
  { id: 4, source: '../audio/cat.wav', sale: false, price: '', author: 'Kendric Lamar', name: 'Humble', imageSrc: img4 },
  { id: 5, source: '../audio/cat.wav', sale: true, price: '0.0001', author: 'Zdravko Colic', name: 'Hotel', imageSrc: img5 },
  { id: 6, source: '../audio/cat.wav', sale: false, price: '', author: 'Red Hot Chilly Peppers', name: 'Californication', imageSrc: img6 },
  { id: 7, source: '../audio/cat.wav', sale: false, price: '', author: 'Vlado Georgiev', name: 'Hej ti', imageSrc: img7 },
  { id: 8, source: '../audio/cat.wav', sale: false, price: '', author: 'Aca Lukas', name: 'Licna karta', imageSrc: img8 },
  { id: 9, source: '../audio/cat.wav', sale: true, price: '0.0001', author: 'Halid Beslic', name: 'Miljacka', imageSrc: img9 },
  { id: 10, source: '../audio/cat.wav', sale: true, price: '0.0001', author: 'Drake', name: 'Started From The Bottom', imageSrc: img10 },
  { id: 11, source: '../audio/cat.wav', sale: false, price: '', author: 'Metallica', name: 'Enter Sandman', imageSrc: img11 },
  { id: 12, source: '../audio/cat.wav', sale: true, price: '0.0001', author: 'Gorillaz', name: 'Stylo', imageSrc: img12 },
  { id: 13, source: '../audio/cat.wav', sale: false, price: '', author: 'Deep Purple', name: 'Smoke on the watter', imageSrc: img13 },
  { id: 14, source: '../audio/cat.wav', sale: true, price: '0.0001', author: 'Djani', name: 'Sve mi tvoje nedostaje', imageSrc: img14 },
];
