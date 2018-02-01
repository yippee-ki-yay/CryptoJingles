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
      return { type: COMPOSE, name: 'Bass Groove', source: 'https://gateway.ipfs.io/ipfs/Qmd4zeoyJGS4m1R84ygZpmghwjfm1k8JKrWu2VwLAC5cmU' };
    case 1:
      return { type: COMPOSE, name: 'Boomin Melody', source: 'https://gateway.ipfs.io/ipfs/QmQ8JGd3TSHDKXt7voHWWKY9vZBYWh4q7W5VsjnbY8G5EH' };
    case 2:
      return { type: COMPOSE, name: 'Brasil tropical', source: 'https://gateway.ipfs.io/ipfs/QmZau3hmNRJCywUS8mMfBne4V7mia8DxsfTKaKzrH7md71' };
    case 3:
      return { type: COMPOSE, name: 'Bassline', source: 'https://gateway.ipfs.io/ipfs/QmUaax6dqv4Qw87vfk1xddSHC8DdzW6trfe7wtpuf2x9cT' };
    case 4:
      return { type: COMPOSE, name: 'Drum beat', source: 'https://gateway.ipfs.io/ipfs/QmVcSVWVBurDjB7TorMjiT1MpCQ6nYXB8QYsFwXkAPsuXy' };
    case 5:
      return { type: COMPOSE, name: 'Synth lead', source: 'https://gateway.ipfs.io/ipfs/QmahnmKgpDYjVH7Aq1XZyjfyA4joruJ3PmUDaY65o2Gjrg' };
    case 6:
      return { type: COMPOSE, name: 'Quiet Bit', source: 'https://gateway.ipfs.io/ipfs/QmS4iieauh4nJceDdaGaPNGHu6qhW6fkHD8aUrL9K2qi51' };
    case 7:
      return { type: COMPOSE, name: 'Crystal bells', source: 'https://gateway.ipfs.io/ipfs/Qme6qdE4V2ZgNwfKgepVuG5c1FMMtHHUsjJrKSrheVtmcQ' };
    case 8:
      return { type: COMPOSE, name: 'Distorted drum', source: 'https://gateway.ipfs.io/ipfs/Qmf1Tx4dUSqBDtCVmTsAAMkvhKVb3z6QugNAbSEBdWUUYj' };
    case 9:
      return { type: COMPOSE, name: 'Drum loop', source: 'https://gateway.ipfs.io/ipfs/QmRVTSXdBgUoQ5yVpeCFyc9nEzF2rcoqJmPtuwkmmGNH8Q' };
    case 10:
      return { type: COMPOSE, name: 'Enjoy drum', source: 'https://gateway.ipfs.io/ipfs/QmPpVQYBeXZpodPkrxRFFj4ZRRd7WdU8ScSrQcx9Cd8zka'  };
    case 11:
      return { type: COMPOSE, name: 'Flair melody', source: 'https://gateway.ipfs.io/ipfs/QmaDkzENCmMaAcEkShg3oS6fGownbFnu1h3T3yrjsEazMX' };
    case 12:
      return { type: COMPOSE, name: 'Funky bass', source: 'https://gateway.ipfs.io/ipfs/QmSRtgA7xvNMpoLBcKcLM7hDaU1B3gmBDXvo2MFHTathH8' };
    case 13:
      return { type: COMPOSE, name: 'GG melody', source: 'https://gateway.ipfs.io/ipfs/QmXsunbyqCNueAFnF87pEWb7mojbBzraDU7Lmw3r1ubM9H' };
    case 14:
      return { type: COMPOSE, name: 'Giving melody', source: 'https://gateway.ipfs.io/ipfs/QmNwZbVvN4YqmSYsaUqxhbXTi74PFffB7iEk4dJ4PJreee' };
    case 15:
      return { type: COMPOSE, name: 'Hard harp', source: 'https://gateway.ipfs.io/ipfs/QmVcBEAEuo4646TMMWXzFhDm7KBfXdKzPJ5nV59JEXDff9' };
    case 16:
      return { type: COMPOSE, name: 'Hi Hat', source: 'https://gateway.ipfs.io/ipfs/QmcX3Ypn4sMjw1JjfNrmLn3mHLT3xZcLVPeM4zrFdBFJKW' };
    case 17:
      return { type: COMPOSE, name: 'Huge Melody', source: 'https://gateway.ipfs.io/ipfs/QmQLaCEDS2yuQySPWSyXrHrE8UUFHyZnVvVqddiupcQKE4' };
    case 18:
      return { type: COMPOSE, name: 'Hister1a', source: 'https://gateway.ipfs.io/ipfs/QmYj1Bp1LYFP84QLRVjQcnZMAPtKW8Fu5cjTRkTQPRQUvY' };
    case 19:
      return { type: COMPOSE, name: 'I have beats', source: 'https://gateway.ipfs.io/ipfs/QmUbkpETctdXnuC1FEAvwv22BkAGiojTH336Py11pDkpo4' };
    case 20:
      return { type: COMPOSE, name: 'Love lead', source: 'https://gateway.ipfs.io/ipfs/QmZQqkGZ41tSVBNnFvvLsDGjM2dERpLNguYZDtjJmSu72r' };
    case 21:
      return { type: COMPOSE, name: 'Piano melancholy', source: 'https://gateway.ipfs.io/ipfs/QmeMc6BAiByceNy9PRQwhXMe7PCm4jWpKeEdWUEjRAzAmw' };
    case 22:
      return { type: COMPOSE, name: 'Mini Bass', source: 'https://gateway.ipfs.io/ipfs/QmSJJHZvgFZa33KMSYDWFjUFmkZBa3bCAoXzGGNoq7yjuN' };
    case 23:
      return { type: COMPOSE, name: 'Piano loops', source: 'https://gateway.ipfs.io/ipfs/QmXdKQJLusZ5KRLfz7tt8vBXHnnpFw79yNxZHn7u1JKFpz' };
    case 24:
      return { type: COMPOSE, name: 'Piano Chord', source: 'https://gateway.ipfs.io/ipfs/QmcW4dG8zzjfGTp7atCuuh7F1HwrrdvvWpai1wBExeFGBW' };
    case 25:
      return { type: COMPOSE, name: 'Plain Jane', source: 'https://gateway.ipfs.io/ipfs/QmaB85QxjFJkdPY9wFTKp24Kc79rgAkQTVNfQyhfxBaZ2D' };
    case 26:
      return { type: COMPOSE, name: 'P trap', source: 'https://gateway.ipfs.io/ipfs/QmUypZyxXF1c7rR7NVzbvn1SaDtq4s6cvvn9WJ82SBv5Mv' };
    case 27:
      return { type: COMPOSE, name: 'Rave Synth', source: 'https://gateway.ipfs.io/ipfs/QmNcoPcsUmwN3JngxnhRc4Fi2ryKskQnTQSkXKbognFuKc' };
    case 28:
      return { type: COMPOSE, name: 'Robotica Synth', source: 'https://gateway.ipfs.io/ipfs/QmWr5KmpfV8mqVs5CGuHKfL7owjo7KN4oHsU8cz4QniPG2' };
    case 29:
      return { type: COMPOSE, name: 'Rock Guitar', source: 'https://gateway.ipfs.io/ipfs/QmVn3Pdz1sGFhBF7UTcavynawfSqgCJJrqgNXWATJSczU3' };
    case 30:
      return { type: COMPOSE, name: 'S1', source: 'https://gateway.ipfs.io/ipfs/QmcrZn5PHTefmqabxpzPPYPNNtK62u2wfSJGFgKaxWfsk4' };
    case 31:
      return { type: COMPOSE, name: 'S2', source: 'https://gateway.ipfs.io/ipfs/QmcifrAZg9gGWD7d8iMsHmeKPkRsgVVHAiZDbeQH4ApN7S' };
    case 32:
      return { type: COMPOSE, name: 'S3', source: 'https://gateway.ipfs.io/ipfs/QmNMFLwtXFJXNux5dGR9UwhS6sVa5YhHCGtULktdDt3YG1' };
    case 33:
      return { type: COMPOSE, name: 'S4', source: 'https://gateway.ipfs.io/ipfs/QmTTcHhieXixKxjw5gJp7CrEH4bYghjn5aXbqUCH8GT934' };
    case 34:
      return { type: COMPOSE, name: 'S5', source: 'https://gateway.ipfs.io/ipfs/QmTfdYrJ9NUf7YpUFyA2FSq3hTJNWMimbaVAmV2Y2862mf' };
    case 35:
      return { type: COMPOSE, name: 'S6', source: 'https://gateway.ipfs.io/ipfs/QmSwS55pCFqSWtKoSgJKirQSvT2A3Db6A7jdVz2CBK5YVL' };
    case 36:
      return { type: COMPOSE, name: 'S7', source: 'https://gateway.ipfs.io/ipfs/QmTX6uWP3x6r1JSNtRscKvRd2WYk9U8FMufsNRRYXSNk3R' };
    case 37:
      return { type: COMPOSE, name: 'Out of this', source: 'https://gateway.ipfs.io/ipfs/QmasdugxGy2uiTmUUz6j9hhMh61tqaCRXLm2offS8oMYsw' };
    case 38:
      return { type: COMPOSE, name: 'Keys', source: 'https://gateway.ipfs.io/ipfs/QmQ9TWUQyEj51P9FeanwkkFq2eNFsNtudcaowuBrWwCnfh' };
    case 39:
      return { type: COMPOSE, name: 'Slide', source: 'https://gateway.ipfs.io/ipfs/QmVP6oxnsaE3qauBLM5SjjELrASehmwcpEJQAbx5E9qoyV' };
    case 40:
      return { type: COMPOSE, name: 'Tip Tap', source: 'https://gateway.ipfs.io/ipfs/QmQdEFdaZgs6XRU9k3MrcUKZFfhSYCPrYCVwE31aepm46J' };
    case 41:
      return { type: COMPOSE, name: 'Spooky', source: 'https://gateway.ipfs.io/ipfs/QmTudsxzbp79m8QJJoDYHdYfbJCCsdgv443dasJQZANoFj' };
    case 42:
      return { type: COMPOSE, name: 'The lies', source: 'https://gateway.ipfs.io/ipfs/QmTK31acPf8rcshhCbmEHqFMQZ1jPha3MLDWPvvecfoaSa' };
    case 43:
      return { type: COMPOSE, name: 'Backup lies', source: 'https://gateway.ipfs.io/ipfs/QmPr7YCP7rGpn8iaefoueRR9V1FHTxHXme2FPrznW3pDkX' };
    case 44:
      return { type: COMPOSE, name: 'Aesthetics', source: 'https://gateway.ipfs.io/ipfs/QmWUkvGLE7o4PuwnVbRXek2WC5KbNPDgVZ1m4YswFpwZBX' };
    case 45:
      return { type: COMPOSE, name: 'Beat box', source: 'https://gateway.ipfs.io/ipfs/Qmb7eMbZj7XW3P3YJmTGsGLTeNMpW3FFkdzFxbDYLj7hAY' };
    case 46:
      return { type: COMPOSE, name: 'Chill trap', source: 'https://gateway.ipfs.io/ipfs/QmfSe9ma6UCEmiTyuu3mT3nSuf1RSLYTnWEk1rxSHnpC5z' };
    case 47:
      return { type: COMPOSE, name: 'Chop Loop', source: 'https://gateway.ipfs.io/ipfs/QmZRt1ZxHYqLjuaRaKxVXAHKR4dTx6ByMahhx18RXCgEEV' };
    case 48:
      return { type: COMPOSE, name: 'Aliens', source: 'https://gateway.ipfs.io/ipfs/QmbH3qBr9nX81aRcXtPqAJakcUqUEodzsoQRNzEkhoyvou' };
    case 49:
      return { type: COMPOSE, name: 'Haywire', source: 'https://gateway.ipfs.io/ipfs/QmPNHS5vxntSkWMYo5uki5JNJvfA51gpiMBDktHyqMdwbN' };
    case 50:
      return { type: COMPOSE, name: 'Curtains', source: 'https://gateway.ipfs.io/ipfs/QmPnn1EVs82wedZPzYDT9mFpDAAQ3n5h4gpo7CdgPF6rJR' };
    case 51:
      return { type: COMPOSE, name: 'Dog Bark', source: 'https://gateway.ipfs.io/ipfs/QmTYcbgM48N3cvnmdQddRB3qAnbkJRFtw3FHYxL8btA2eg' };
    case 52:
      return { type: COMPOSE, name: 'Natural voice', source: 'https://gateway.ipfs.io/ipfs/QmUTyBGW3Wz3xWGX3dr4qggKauVaex5HMWWeKNGm7epNaz' };
    case 53:
      return { type: COMPOSE, name: 'Paradime shattered', source: 'https://gateway.ipfs.io/ipfs/Qmf3poBH4cKxsi2DDcoJKcBX81Ab5swQZTw9twYtwPArvs' };
    case 54:
      return { type: COMPOSE, name: 'Party people', source: 'https://gateway.ipfs.io/ipfs/QmRMKih1k4x3k3bv2jrcDdQLfce5mxvyEQkiYChq7Pd8ap' };
    case 55:
      return { type: COMPOSE, name: 'Strong', source: 'https://gateway.ipfs.io/ipfs/QmbdZHpLG1WUCpz8tghy1Z981JNAAasn5TRekkQ9XgB4Yn' };
    case 56:
      return { type: COMPOSE, name: 'Climax 170', source: 'https://gateway.ipfs.io/ipfs/QmYMYbXfEtXutqigurQ3Xq8s1ogjdT22KBBmiHcBbo9mnK' };
    case 57:
      return { type: COMPOSE, name: 'Beat 64', source: 'https://gateway.ipfs.io/ipfs/QmUksYmkuDJgBeM4HEDhhnjAkoaFrrUN38qvq4geBpKqnZ' };
    case 58:
      return { type: COMPOSE, name: 'Hesitation', source: 'https://gateway.ipfs.io/ipfs/QmbGqx2dpFsM4Kmw7cqAe9AvB8ej6FCDyoLVak3i5Fzo2e' };
    case 59:
      return { type: COMPOSE, name: 'Piano Melody', source: 'https://gateway.ipfs.io/ipfs/QmfGh8am4MdEn7HyNX2Q3jW18L4zmrS2saYg7qU1xMUEhN' };
    case 60:
      return { type: COMPOSE, name: 'Suffer', source: 'https://gateway.ipfs.io/ipfs/QmPGbWUVAiwTKbBnRwuCdc1Xn9GnqWVYD63MKtvC9yot3z' };
    case 61:
      return { type: COMPOSE, name: 'Impact', source: 'https://gateway.ipfs.io/ipfs/QmWMgmNV1zE54j21mqWSpa9gM9a1o97XCKYyaqYBRNwBLq' };
    case 62:
      return { type: COMPOSE, name: 'Reverse FX', source: 'https://gateway.ipfs.io/ipfs/QmUumcK86JhMZ9S64YYUfbpnhopgtsxXVWJsFsGkKHy4z5' };
    case 63:
      return { type: COMPOSE, name: 'Violin Carry', source: 'https://gateway.ipfs.io/ipfs/QmQFgrN4cvtB5AfHRWJ6BptukeQjL1V9R3MiUyEVDXstA9' };
    case 64:
      return { type: COMPOSE, name: 'Vocal loop', source: 'https://gateway.ipfs.io/ipfs/QmbBEjxrgipBxFJsimvVTcSN1BZtRfA3uV8EAkWmrQPohL' };
    case 65:
      return { type: COMPOSE, name: 'Vocal ohh', source: 'https://gateway.ipfs.io/ipfs/QmZvwGghKFUBEi3X97yQhyH7pkofF3K6rFLvYne879i75j' };
    case 66:
      return { type: COMPOSE, name: 'Wopple', source: 'https://gateway.ipfs.io/ipfs/QmPHbg5NaXzVc5h2zBRVfKfzBqUmyDyhycrX39Z2g3DSd4' };
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
