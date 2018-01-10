import { COMPOSE } from './constants/types';

export const getJingleIdsMock = () => [1, 2, 3, 4, 5, 6];

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
