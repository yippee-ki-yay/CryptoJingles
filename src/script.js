const COMPOSE = 'compose';

const getJingleMetadata = (jingleType) => {
    switch (parseInt(jingleType)) {
      case 0:
        return { type: COMPOSE, name: 'Bitconneeeeeeeeect', source: 'https://gateway.ipfs.io/ipfs/QmNwkhCvN4VSVF4o2FD6uBYEwFqnoVdQ6KARXt6KUCaCvu', rarity: 3 };
      case 1:
        return { type: COMPOSE, name: 'Boomin Melody', source: 'https://gateway.ipfs.io/ipfs/QmQ8JGd3TSHDKXt7voHWWKY9vZBYWh4q7W5VsjnbY8G5EH', rarity: 0 };
      case 2:
        return { type: COMPOSE, name: 'Brasil tropical', source: 'https://gateway.ipfs.io/ipfs/QmZau3hmNRJCywUS8mMfBne4V7mia8DxsfTKaKzrH7md71', rarity: 0 };
      case 3:
        return { type: COMPOSE, name: 'Bassline', source: 'https://gateway.ipfs.io/ipfs/QmUaax6dqv4Qw87vfk1xddSHC8DdzW6trfe7wtpuf2x9cT', rarity: 0 };
      case 4:
        return { type: COMPOSE, name: 'Drum beat', source: 'https://gateway.ipfs.io/ipfs/QmVcSVWVBurDjB7TorMjiT1MpCQ6nYXB8QYsFwXkAPsuXy', rarity: 0 };
      case 5:
        return { type: COMPOSE, name: 'Synth lead', source: 'https://gateway.ipfs.io/ipfs/QmahnmKgpDYjVH7Aq1XZyjfyA4joruJ3PmUDaY65o2Gjrg', rarity: 0 };
      case 6:
        return { type: COMPOSE, name: 'Quiet Bit', source: 'https://gateway.ipfs.io/ipfs/QmS4iieauh4nJceDdaGaPNGHu6qhW6fkHD8aUrL9K2qi51', rarity: 0 };
      case 7:
        return { type: COMPOSE, name: 'Crystal bells', source: 'https://gateway.ipfs.io/ipfs/Qme6qdE4V2ZgNwfKgepVuG5c1FMMtHHUsjJrKSrheVtmcQ', rarity: 0 };
      case 8:
        return { type: COMPOSE, name: 'Distorted drum', source: 'https://gateway.ipfs.io/ipfs/Qmf1Tx4dUSqBDtCVmTsAAMkvhKVb3z6QugNAbSEBdWUUYj', rarity: 0 };
      case 9:
        return { type: COMPOSE, name: 'Drum loop', source: 'https://gateway.ipfs.io/ipfs/QmRVTSXdBgUoQ5yVpeCFyc9nEzF2rcoqJmPtuwkmmGNH8Q', rarity: 0 };
      case 10:
        return { type: COMPOSE, name: 'Enjoy drum', source: 'https://gateway.ipfs.io/ipfs/QmPpVQYBeXZpodPkrxRFFj4ZRRd7WdU8ScSrQcx9Cd8zka', rarity: 0  };
      case 11:
        return { type: COMPOSE, name: 'Flair melody', source: 'https://gateway.ipfs.io/ipfs/QmaDkzENCmMaAcEkShg3oS6fGownbFnu1h3T3yrjsEazMX', rarity: 0 };
      case 12:
        return { type: COMPOSE, name: 'Funky bass', source: 'https://gateway.ipfs.io/ipfs/QmSRtgA7xvNMpoLBcKcLM7hDaU1B3gmBDXvo2MFHTathH8', rarity: 0 };
      case 13:
        return { type: COMPOSE, name: 'GG melody', source: 'https://gateway.ipfs.io/ipfs/QmXsunbyqCNueAFnF87pEWb7mojbBzraDU7Lmw3r1ubM9H', rarity: 0 };
      case 14:
        return { type: COMPOSE, name: 'Giving melody', source: 'https://gateway.ipfs.io/ipfs/QmNwZbVvN4YqmSYsaUqxhbXTi74PFffB7iEk4dJ4PJreee', rarity: 0 };
      case 15:
        return { type: COMPOSE, name: 'Hard harp', source: 'https://gateway.ipfs.io/ipfs/QmVcBEAEuo4646TMMWXzFhDm7KBfXdKzPJ5nV59JEXDff9', rarity: 0 };
      case 16:
        return { type: COMPOSE, name: 'Hi Hat', source: 'https://gateway.ipfs.io/ipfs/QmcX3Ypn4sMjw1JjfNrmLn3mHLT3xZcLVPeM4zrFdBFJKW', rarity: 0 };
      case 17:
        return { type: COMPOSE, name: 'Huge Melody', source: 'https://gateway.ipfs.io/ipfs/QmQLaCEDS2yuQySPWSyXrHrE8UUFHyZnVvVqddiupcQKE4', rarity: 0 };
      case 18:
        return { type: COMPOSE, name: 'Hister1a', source: 'https://gateway.ipfs.io/ipfs/QmYj1Bp1LYFP84QLRVjQcnZMAPtKW8Fu5cjTRkTQPRQUvY', rarity: 0 };
      case 19:
        return { type: COMPOSE, name: 'I have beats', source: 'https://gateway.ipfs.io/ipfs/QmUbkpETctdXnuC1FEAvwv22BkAGiojTH336Py11pDkpo4', rarity: 0 };
      case 20:
        return { type: COMPOSE, name: 'Love lead', source: 'https://gateway.ipfs.io/ipfs/QmZQqkGZ41tSVBNnFvvLsDGjM2dERpLNguYZDtjJmSu72r', rarity: 0 };
      case 21:
        return { type: COMPOSE, name: 'Piano melancholy', source: 'https://gateway.ipfs.io/ipfs/QmeMc6BAiByceNy9PRQwhXMe7PCm4jWpKeEdWUEjRAzAmw', rarity: 0 };
      case 22:
        return { type: COMPOSE, name: 'Mini Bass', source: 'https://gateway.ipfs.io/ipfs/QmSJJHZvgFZa33KMSYDWFjUFmkZBa3bCAoXzGGNoq7yjuN', rarity: 0 };
      case 23:
        return { type: COMPOSE, name: 'Piano loops', source: 'https://gateway.ipfs.io/ipfs/QmXdKQJLusZ5KRLfz7tt8vBXHnnpFw79yNxZHn7u1JKFpz', rarity: 0 };
      case 24:
        return { type: COMPOSE, name: 'Piano Chord', source: 'https://gateway.ipfs.io/ipfs/QmcW4dG8zzjfGTp7atCuuh7F1HwrrdvvWpai1wBExeFGBW', rarity: 0 };
      case 25:
        return { type: COMPOSE, name: 'Plain Jane', source: 'https://gateway.ipfs.io/ipfs/QmaB85QxjFJkdPY9wFTKp24Kc79rgAkQTVNfQyhfxBaZ2D', rarity: 0 };
      case 26:
        return { type: COMPOSE, name: 'P trap', source: 'https://gateway.ipfs.io/ipfs/QmUypZyxXF1c7rR7NVzbvn1SaDtq4s6cvvn9WJ82SBv5Mv', rarity: 0 };
      case 27:
        return { type: COMPOSE, name: 'Rave Synth', source: 'https://gateway.ipfs.io/ipfs/QmNcoPcsUmwN3JngxnhRc4Fi2ryKskQnTQSkXKbognFuKc', rarity: 0 };
      case 28:
        return { type: COMPOSE, name: 'Robotica Synth', source: 'https://gateway.ipfs.io/ipfs/QmWr5KmpfV8mqVs5CGuHKfL7owjo7KN4oHsU8cz4QniPG2', rarity: 0 };
      case 29:
        return { type: COMPOSE, name: 'Rock Guitar', source: 'https://gateway.ipfs.io/ipfs/QmVn3Pdz1sGFhBF7UTcavynawfSqgCJJrqgNXWATJSczU3', rarity: 0 };
      case 30:
        return { type: COMPOSE, name: 'S1', source: 'https://gateway.ipfs.io/ipfs/QmcrZn5PHTefmqabxpzPPYPNNtK62u2wfSJGFgKaxWfsk4', rarity: 0 };
      case 31:
        return { type: COMPOSE, name: 'S2', source: 'https://gateway.ipfs.io/ipfs/QmcifrAZg9gGWD7d8iMsHmeKPkRsgVVHAiZDbeQH4ApN7S', rarity: 0 };
      case 32:
        return { type: COMPOSE, name: 'S3', source: 'https://gateway.ipfs.io/ipfs/QmNMFLwtXFJXNux5dGR9UwhS6sVa5YhHCGtULktdDt3YG1', rarity: 0 };
      case 33:
        return { type: COMPOSE, name: 'S4', source: 'https://gateway.ipfs.io/ipfs/QmTTcHhieXixKxjw5gJp7CrEH4bYghjn5aXbqUCH8GT934', rarity: 0 };
      case 34:
        return { type: COMPOSE, name: 'S5', source: 'https://gateway.ipfs.io/ipfs/QmTfdYrJ9NUf7YpUFyA2FSq3hTJNWMimbaVAmV2Y2862mf', rarity: 0 };
      case 35:
        return { type: COMPOSE, name: 'S6', source: 'https://gateway.ipfs.io/ipfs/QmSwS55pCFqSWtKoSgJKirQSvT2A3Db6A7jdVz2CBK5YVL', rarity: 0 };
      case 36:
        return { type: COMPOSE, name: 'S7', source: 'https://gateway.ipfs.io/ipfs/QmTX6uWP3x6r1JSNtRscKvRd2WYk9U8FMufsNRRYXSNk3R', rarity: 0 };
      case 37:
        return { type: COMPOSE, name: 'Out of this', source: 'https://gateway.ipfs.io/ipfs/QmasdugxGy2uiTmUUz6j9hhMh61tqaCRXLm2offS8oMYsw', rarity: 0 };
      case 38:
        return { type: COMPOSE, name: 'Keys', source: 'https://gateway.ipfs.io/ipfs/QmQ9TWUQyEj51P9FeanwkkFq2eNFsNtudcaowuBrWwCnfh', rarity: 0 };
      case 39:
        return { type: COMPOSE, name: 'Slide', source: 'https://gateway.ipfs.io/ipfs/QmVP6oxnsaE3qauBLM5SjjELrASehmwcpEJQAbx5E9qoyV', rarity: 0 };
      case 40:
        return { type: COMPOSE, name: 'Tip Tap', source: 'https://gateway.ipfs.io/ipfs/QmQdEFdaZgs6XRU9k3MrcUKZFfhSYCPrYCVwE31aepm46J', rarity: 0 };
      case 41:
        return { type: COMPOSE, name: 'Spooky', source: 'https://gateway.ipfs.io/ipfs/QmTudsxzbp79m8QJJoDYHdYfbJCCsdgv443dasJQZANoFj', rarity: 0 };
      case 42:
        return { type: COMPOSE, name: 'The lies', source: 'https://gateway.ipfs.io/ipfs/QmTK31acPf8rcshhCbmEHqFMQZ1jPha3MLDWPvvecfoaSa', rarity: 0 };
      case 43:
        return { type: COMPOSE, name: 'Backup lies', source: 'https://gateway.ipfs.io/ipfs/QmPr7YCP7rGpn8iaefoueRR9V1FHTxHXme2FPrznW3pDkX', rarity: 0 };
      case 44:
        return { type: COMPOSE, name: 'Aesthetics', source: 'https://gateway.ipfs.io/ipfs/QmWUkvGLE7o4PuwnVbRXek2WC5KbNPDgVZ1m4YswFpwZBX', rarity: 0 };
      case 45:
        return { type: COMPOSE, name: 'Beat box', source: 'https://gateway.ipfs.io/ipfs/Qmb7eMbZj7XW3P3YJmTGsGLTeNMpW3FFkdzFxbDYLj7hAY', rarity: 0 };
      case 46:
        return { type: COMPOSE, name: 'Chill trap', source: 'https://gateway.ipfs.io/ipfs/QmfSe9ma6UCEmiTyuu3mT3nSuf1RSLYTnWEk1rxSHnpC5z', rarity: 0 };
      case 47:
        return { type: COMPOSE, name: 'Chop Loop', source: 'https://gateway.ipfs.io/ipfs/QmZRt1ZxHYqLjuaRaKxVXAHKR4dTx6ByMahhx18RXCgEEV', rarity: 0 };
      case 48:
        return { type: COMPOSE, name: 'Aliens', source: 'https://gateway.ipfs.io/ipfs/QmbH3qBr9nX81aRcXtPqAJakcUqUEodzsoQRNzEkhoyvou', rarity: 0 };
      case 49:
        return { type: COMPOSE, name: 'Haywire', source: 'https://gateway.ipfs.io/ipfs/QmPNHS5vxntSkWMYo5uki5JNJvfA51gpiMBDktHyqMdwbN', rarity: 0 };
      case 50:
        return { type: COMPOSE, name: 'Curtains', source: 'https://gateway.ipfs.io/ipfs/QmPnn1EVs82wedZPzYDT9mFpDAAQ3n5h4gpo7CdgPF6rJR', rarity: 0 };
      case 51:
        return { type: COMPOSE, name: 'Dog Bark', source: 'https://gateway.ipfs.io/ipfs/QmTYcbgM48N3cvnmdQddRB3qAnbkJRFtw3FHYxL8btA2eg', rarity: 0 };
      case 52:
        return { type: COMPOSE, name: 'Natural voice', source: 'https://gateway.ipfs.io/ipfs/QmUTyBGW3Wz3xWGX3dr4qggKauVaex5HMWWeKNGm7epNaz', rarity: 0 };
      case 53:
        return { type: COMPOSE, name: 'Paradime shattered', source: 'https://gateway.ipfs.io/ipfs/Qmf3poBH4cKxsi2DDcoJKcBX81Ab5swQZTw9twYtwPArvs', rarity: 0 };
      case 54:
        return { type: COMPOSE, name: 'Party people', source: 'https://gateway.ipfs.io/ipfs/QmRMKih1k4x3k3bv2jrcDdQLfce5mxvyEQkiYChq7Pd8ap', rarity: 0 };
      case 55:
        return { type: COMPOSE, name: 'Strong', source: 'https://gateway.ipfs.io/ipfs/QmbdZHpLG1WUCpz8tghy1Z981JNAAasn5TRekkQ9XgB4Yn', rarity: 0 };
      case 56:
        return { type: COMPOSE, name: 'Climax 170', source: 'https://gateway.ipfs.io/ipfs/QmYMYbXfEtXutqigurQ3Xq8s1ogjdT22KBBmiHcBbo9mnK', rarity: 0 };
      case 57:
        return { type: COMPOSE, name: 'Beat 64', source: 'https://gateway.ipfs.io/ipfs/QmUksYmkuDJgBeM4HEDhhnjAkoaFrrUN38qvq4geBpKqnZ', rarity: 0 };
      case 58:
        return { type: COMPOSE, name: 'Hesitation', source: 'https://gateway.ipfs.io/ipfs/QmbGqx2dpFsM4Kmw7cqAe9AvB8ej6FCDyoLVak3i5Fzo2e', rarity: 0 };
      case 59:
        return { type: COMPOSE, name: 'Piano Melody', source: 'https://gateway.ipfs.io/ipfs/QmfGh8am4MdEn7HyNX2Q3jW18L4zmrS2saYg7qU1xMUEhN', rarity: 0 };
      case 60:
        return { type: COMPOSE, name: 'Suffer', source: 'https://gateway.ipfs.io/ipfs/QmPGbWUVAiwTKbBnRwuCdc1Xn9GnqWVYD63MKtvC9yot3z', rarity: 1 };
      case 61:
        return { type: COMPOSE, name: 'Impact', source: 'https://gateway.ipfs.io/ipfs/QmWMgmNV1zE54j21mqWSpa9gM9a1o97XCKYyaqYBRNwBLq', rarity: 1 };
      case 62:
        return { type: COMPOSE, name: 'Reverse FX', source: 'https://gateway.ipfs.io/ipfs/QmUumcK86JhMZ9S64YYUfbpnhopgtsxXVWJsFsGkKHy4z5', rarity: 1 };
      case 63:
        return { type: COMPOSE, name: 'Violin Carry', source: 'https://gateway.ipfs.io/ipfs/QmQFgrN4cvtB5AfHRWJ6BptukeQjL1V9R3MiUyEVDXstA9', rarity: 1 };
      case 64:
        return { type: COMPOSE, name: 'Vocal loop', source: 'https://gateway.ipfs.io/ipfs/QmbBEjxrgipBxFJsimvVTcSN1BZtRfA3uV8EAkWmrQPohL', rarity: 1 };
      case 65:
        return { type: COMPOSE, name: 'Vocal ohh', source: 'https://gateway.ipfs.io/ipfs/QmZvwGghKFUBEi3X97yQhyH7pkofF3K6rFLvYne879i75j', rarity: 1 };
      case 66:
        return { type: COMPOSE, name: 'Wopple', source: 'https://gateway.ipfs.io/ipfs/QmPHbg5NaXzVc5h2zBRVfKfzBqUmyDyhycrX39Z2g3DSd4', rarity: 1 };
      case 67:
        return { type: COMPOSE, name: 'Lion', source: 'https://gateway.ipfs.io/ipfs/Qme3mWDQ1Etn9KwHs9um9aHQDLd65ZT3ct6SMerhh7cBk3', rarity: 1 };
      case 68:
        return { type: COMPOSE, name: 'Vox Loop', source: 'https://gateway.ipfs.io/ipfs/QmPVWR8qMdUK3pyNk8mRcT9Kk2WkTBfdSYqBQKgWrbKQpH', rarity: 1 };
      case 69:
        return { type: COMPOSE, name: 'Bass A', source: 'https://gateway.ipfs.io/ipfs/QmcE4r7xPb5Te5JQuBsDgryRLZ4ymEpn1SYYctrv4upo5H', rarity: 1 };
      case 70:
        return { type: COMPOSE, name: 'Kick F', source: 'https://gateway.ipfs.io/ipfs/QmWw7joedMe2VFpUyFLrNwFDgNpsBg1fwu39bP59U18pQF', rarity: 1 };
      case 71:
        return { type: COMPOSE, name: 'Kick G', source: 'https://gateway.ipfs.io/ipfs/QmQAjuzXMKN8JUmhDMdaJEbzcfhqjUS7uHh3ETUsmD7Y4k', rarity: 1 };
      case 72:
        return { type: COMPOSE, name: 'Cannot pass', source: 'https://gateway.ipfs.io/ipfs/QmaG4st5LW49fEmuatTDf3F19tAoA5fDzrux8v6UEJRVkt', rarity: 1 };
      case 73:
        return { type: COMPOSE, name: 'Dream', source: 'https://gateway.ipfs.io/ipfs/QmNkhdvUMgc3Df2FTd8N5crcDmcZYHgBgdSHsRzTtDN2Ww', rarity: 1 };
      case 74:
        return { type: COMPOSE, name: 'Escape', source: 'https://gateway.ipfs.io/ipfs/QmQXub8q51cq8FYFHXxqDJmdCcByNDx33HQmUVDELuGQZW', rarity: 1 };
      case 75:
        return { type: COMPOSE, name: 'Laugh', source: 'https://gateway.ipfs.io/ipfs/QmTkFstwSJC2Q6DVe9exMREVqqCN2HoeeMbjrjk4XknfVj', rarity: 1 };
      case 76:
        return { type: COMPOSE, name: 'Victory', source: 'https://gateway.ipfs.io/ipfs/QmP1wgyTVMiiGTGJChSk1wCB7EWJjkYGvcEYrerFm1s57C', rarity: 1 };
      case 77:
        return { type: COMPOSE, name: 'SciFi Echo', source: 'https://gateway.ipfs.io/ipfs/QmTHUhXurGwsBwqhSiMmpbrfbsQNGRnBmFvQGCRCnJJKZM', rarity: 1 };
      case 78:
        return { type: COMPOSE, name: 'SciFi Synth', source: 'https://gateway.ipfs.io/ipfs/QmS4sGsUyPqLcQ3cwG2FiquGw5hWi272dPgyxvomDsFnDj', rarity: 1 };
      case 79:
        return { type: COMPOSE, name: 'SciFi Echo 99', source: 'https://gateway.ipfs.io/ipfs/QmbAm9fXkRCFeTnbQX2Kn2pCVnXe3Hfa4g2skY81AEs4Z3', rarity: 1 };
      case 80:
        return { type: COMPOSE, name: 'Scary Girl', source: 'https://gateway.ipfs.io/ipfs/QmZis8fDBz6Kbjhrm1ZiKjCDndj7iJ2fWrkw3SQ6aPCNMd', rarity: 1 };
      case 81:
        return { type: COMPOSE, name: 'Virus FM', source: 'https://gateway.ipfs.io/ipfs/QmcF4aBtFSsaGA3VJkZsYgFA2Z6J5bX56BP35kZXnHEpPf', rarity: 1 };
      case 82:
        return { type: COMPOSE, name: 'Charade', source: 'https://gateway.ipfs.io/ipfs/QmNuSQ4XG7Dhxjwb1HwHzxpmS8sXyE9wweas8S5HXHqJgA', rarity: 1 };
      case 83:
        return { type: COMPOSE, name: 'Child Game', source: 'https://gateway.ipfs.io/ipfs/QmRRji9uJJueZ8qfxhHyLYUUiNrdGSPixHRYytg8cfuuDM', rarity: 1 };
      case 84:
        return { type: COMPOSE, name: 'Culture Loop', source: 'https://gateway.ipfs.io/ipfs/QmSCfh28xTm3PnaHS27CjCb4CJv5wvTB3jRVFUqeA8GtCn', rarity: 1 };
      case 85:
        return { type: COMPOSE, name: 'Deep house', source: 'https://gateway.ipfs.io/ipfs/QmTYDwcQPxTT4Pwbf6t6o1fHtNLnxKEQj3C8FcSZVHdjfV', rarity: 1 };
      case 86:
        return { type: COMPOSE, name: 'Dont know how', source: 'https://gateway.ipfs.io/ipfs/QmaDVV5pAxCPxBXxyfEKmsiGR3jyPHTMZFqWRi5KeX1t16', rarity: 1 };
      case 87:
        return { type: COMPOSE, name: 'Drives you crazy', source: 'https://gateway.ipfs.io/ipfs/Qmf9Yh6JSA6RCs2WegvVqnumKKi3JW18GVLPzPcvAKB6p5', rarity: 1 };
      case 88:
        return { type: COMPOSE, name: 'Elephant', source: 'https://gateway.ipfs.io/ipfs/QmSbL8wWdpAMJ7B9GR22VP6zA8HwYu37rfCw8QJJtPXwr3', rarity: 1 };
      case 89:
        return { type: COMPOSE, name: 'F12 Synth', source: 'https://gateway.ipfs.io/ipfs/QmPbuwXP8cLhqyPYEVgRkgpAG4nNA1vEA1LgcraYuhgpT7', rarity: 1 };
      case 90:
        return { type: COMPOSE, name: 'FX Fill', source: 'https://gateway.ipfs.io/ipfs/QmbTTg95wpqafFUSTXh98sdJxjEWBJxgtt4zpFPXM9xTgq', rarity: 2 };
      case 91:
        return { type: COMPOSE, name: 'Kicks', source: 'https://gateway.ipfs.io/ipfs/QmUkuHJ5wFS2gcNEd7kMGjCLtZ68TWEDYMh4a6zqmd2SXb', rarity: 2 };
      case 92:
        return { type: COMPOSE, name: 'Oh Backing', source: 'https://gateway.ipfs.io/ipfs/QmY7bmkHXKysS8fEMBe4DM7gCLSf8Q7WGTfHJnahCUewhE', rarity: 2 };
      case 93:
        return { type: COMPOSE, name: 'Robot carry out', source: 'https://gateway.ipfs.io/ipfs/Qma3YmE9nt7p44wzeF1viYpQFfFM6bbDyBDiKXzDt2t6Sz', rarity: 2 };
      case 94:
        return { type: COMPOSE, name: 'Robot compute', source: 'https://gateway.ipfs.io/ipfs/Qmb5oghEpVkA2ZDiTZC7Emj9QDTHubJfLUpCKuGWUworqB', rarity: 2 };
      case 95:
        return { type: COMPOSE, name: 'Robot life form', source: 'https://gateway.ipfs.io/ipfs/QmatFoVAi9WPsJyLgyCJTGDxRCSKQyBiQhQtYyiuzmgfEJ', rarity: 2 };
      case 96:
        return { type: COMPOSE, name: 'Rooster', source: 'https://gateway.ipfs.io/ipfs/QmbN44WQ5YvFqiZzLV5s1GYiT98R54TWQp2U73zi54W6nR', rarity: 2 };
      case 97:
        return { type: COMPOSE, name: 'Top Bass', source: 'https://gateway.ipfs.io/ipfs/QmRG5yFuPdgJGaju5XXw1iraJD5FFQXTTgcU9U2RSXw5EE', rarity: 2 };
      case 98:
        return { type: COMPOSE, name: 'Under Ground', source: 'https://gateway.ipfs.io/ipfs/Qmaza4idKxo7yp94wt8QrK8iT8jyUAjd3w6VUtgoq6VSqe', rarity: 2 };
      case 99:
        return { type: COMPOSE, name: 'Wolf', source: 'https://gateway.ipfs.io/ipfs/QmXA7m7a6o6F21ZiQ9eoYobDqA6GHYYaShEZQ491gWFtB1', rarity: 2 };
      default:
        return { type: COMPOSE, name: '', source: '' };
    }
  }

  for(var i = 0; i < 100; ++i) {
    const data = getJingleMetadata(i);
    const len = data.source.length;
    console.log(`"${data.source.substr(29, len)}", ${data.rarity}`);
  }

// "QmNwkhCvN4VSVF4o2FD6uBYEwFqnoVdQ6KARXt6KUCaCvu", 3 //done
// "QmQ8JGd3TSHDKXt7voHWWKY9vZBYWh4q7W5VsjnbY8G5EH", 0 //done
// "QmZau3hmNRJCywUS8mMfBne4V7mia8DxsfTKaKzrH7md71", 0 //done
// "QmUaax6dqv4Qw87vfk1xddSHC8DdzW6trfe7wtpuf2x9cT", 0 //done
// "QmVcSVWVBurDjB7TorMjiT1MpCQ6nYXB8QYsFwXkAPsuXy", 0 //done
// "QmahnmKgpDYjVH7Aq1XZyjfyA4joruJ3PmUDaY65o2Gjrg", 0 //done
// "QmS4iieauh4nJceDdaGaPNGHu6qhW6fkHD8aUrL9K2qi51", 0 //done
// "Qme6qdE4V2ZgNwfKgepVuG5c1FMMtHHUsjJrKSrheVtmcQ", 0 //done
// "Qmf1Tx4dUSqBDtCVmTsAAMkvhKVb3z6QugNAbSEBdWUUYj", 0 //done
// "QmRVTSXdBgUoQ5yVpeCFyc9nEzF2rcoqJmPtuwkmmGNH8Q", 0 //done
// "QmPpVQYBeXZpodPkrxRFFj4ZRRd7WdU8ScSrQcx9Cd8zka", 0 //done
// "QmaDkzENCmMaAcEkShg3oS6fGownbFnu1h3T3yrjsEazMX", 0 //done
// "QmSRtgA7xvNMpoLBcKcLM7hDaU1B3gmBDXvo2MFHTathH8", 0 //done
// "QmXsunbyqCNueAFnF87pEWb7mojbBzraDU7Lmw3r1ubM9H", 0 //done
// "QmNwZbVvN4YqmSYsaUqxhbXTi74PFffB7iEk4dJ4PJreee", 0 //done
// "QmVcBEAEuo4646TMMWXzFhDm7KBfXdKzPJ5nV59JEXDff9", 0 //done
// "QmcX3Ypn4sMjw1JjfNrmLn3mHLT3xZcLVPeM4zrFdBFJKW", 0 //done
// "QmQLaCEDS2yuQySPWSyXrHrE8UUFHyZnVvVqddiupcQKE4", 0 //done
// "QmYj1Bp1LYFP84QLRVjQcnZMAPtKW8Fu5cjTRkTQPRQUvY", 0 //done
// "QmUbkpETctdXnuC1FEAvwv22BkAGiojTH336Py11pDkpo4", 0 //done
// "QmZQqkGZ41tSVBNnFvvLsDGjM2dERpLNguYZDtjJmSu72r", 0 //done
// "QmeMc6BAiByceNy9PRQwhXMe7PCm4jWpKeEdWUEjRAzAmw", 0 //done
// "QmSJJHZvgFZa33KMSYDWFjUFmkZBa3bCAoXzGGNoq7yjuN", 0 //done
// "QmXdKQJLusZ5KRLfz7tt8vBXHnnpFw79yNxZHn7u1JKFpz", 0 //done
// "QmcW4dG8zzjfGTp7atCuuh7F1HwrrdvvWpai1wBExeFGBW", 0 //done
// "QmaB85QxjFJkdPY9wFTKp24Kc79rgAkQTVNfQyhfxBaZ2D", 0 //done
// "QmUypZyxXF1c7rR7NVzbvn1SaDtq4s6cvvn9WJ82SBv5Mv", 0 //done
// "QmNcoPcsUmwN3JngxnhRc4Fi2ryKskQnTQSkXKbognFuKc", 0 //done
// "QmWr5KmpfV8mqVs5CGuHKfL7owjo7KN4oHsU8cz4QniPG2", 0 //done
// "QmVn3Pdz1sGFhBF7UTcavynawfSqgCJJrqgNXWATJSczU3", 0 //done
// "QmcrZn5PHTefmqabxpzPPYPNNtK62u2wfSJGFgKaxWfsk4", 0 //done
// "QmcifrAZg9gGWD7d8iMsHmeKPkRsgVVHAiZDbeQH4ApN7S", 0 //done
// "QmNMFLwtXFJXNux5dGR9UwhS6sVa5YhHCGtULktdDt3YG1", 0 //done
// "QmTTcHhieXixKxjw5gJp7CrEH4bYghjn5aXbqUCH8GT934", 0 //done
// "QmTfdYrJ9NUf7YpUFyA2FSq3hTJNWMimbaVAmV2Y2862mf", 0 //done
// "QmSwS55pCFqSWtKoSgJKirQSvT2A3Db6A7jdVz2CBK5YVL", 0 //done
// "QmTX6uWP3x6r1JSNtRscKvRd2WYk9U8FMufsNRRYXSNk3R", 0 //done
// "QmasdugxGy2uiTmUUz6j9hhMh61tqaCRXLm2offS8oMYsw", 0 //done
// "QmQ9TWUQyEj51P9FeanwkkFq2eNFsNtudcaowuBrWwCnfh", 0 //done
// "QmVP6oxnsaE3qauBLM5SjjELrASehmwcpEJQAbx5E9qoyV", 0 //done
// "QmQdEFdaZgs6XRU9k3MrcUKZFfhSYCPrYCVwE31aepm46J", 0 //done
// "QmTudsxzbp79m8QJJoDYHdYfbJCCsdgv443dasJQZANoFj", 0 //done
// "QmTK31acPf8rcshhCbmEHqFMQZ1jPha3MLDWPvvecfoaSa", 0 //done
// "QmPr7YCP7rGpn8iaefoueRR9V1FHTxHXme2FPrznW3pDkX", 0 //done
// "QmWUkvGLE7o4PuwnVbRXek2WC5KbNPDgVZ1m4YswFpwZBX", 0 //done
// "Qmb7eMbZj7XW3P3YJmTGsGLTeNMpW3FFkdzFxbDYLj7hAY", 0 //done
// "QmfSe9ma6UCEmiTyuu3mT3nSuf1RSLYTnWEk1rxSHnpC5z", 0 //done
// "QmZRt1ZxHYqLjuaRaKxVXAHKR4dTx6ByMahhx18RXCgEEV", 0 //done
// "QmbH3qBr9nX81aRcXtPqAJakcUqUEodzsoQRNzEkhoyvou", 0 //done
// "QmPNHS5vxntSkWMYo5uki5JNJvfA51gpiMBDktHyqMdwbN", 0 //done
// "QmPnn1EVs82wedZPzYDT9mFpDAAQ3n5h4gpo7CdgPF6rJR", 0 //done
// "QmTYcbgM48N3cvnmdQddRB3qAnbkJRFtw3FHYxL8btA2eg", 0 //done
// "QmUTyBGW3Wz3xWGX3dr4qggKauVaex5HMWWeKNGm7epNaz", 0 //done
// "Qmf3poBH4cKxsi2DDcoJKcBX81Ab5swQZTw9twYtwPArvs", 0 //done
// "QmRMKih1k4x3k3bv2jrcDdQLfce5mxvyEQkiYChq7Pd8ap", 0 //done
// "QmbdZHpLG1WUCpz8tghy1Z981JNAAasn5TRekkQ9XgB4Yn", 0 //done
// "QmYMYbXfEtXutqigurQ3Xq8s1ogjdT22KBBmiHcBbo9mnK", 0 //done
// "QmUksYmkuDJgBeM4HEDhhnjAkoaFrrUN38qvq4geBpKqnZ", 0 //done
// "QmbGqx2dpFsM4Kmw7cqAe9AvB8ej6FCDyoLVak3i5Fzo2e", 0 //done
// "QmfGh8am4MdEn7HyNX2Q3jW18L4zmrS2saYg7qU1xMUEhN", 0 //done
// "QmPGbWUVAiwTKbBnRwuCdc1Xn9GnqWVYD63MKtvC9yot3z", 1 //done
// "QmWMgmNV1zE54j21mqWSpa9gM9a1o97XCKYyaqYBRNwBLq", 1 //done
// "QmUumcK86JhMZ9S64YYUfbpnhopgtsxXVWJsFsGkKHy4z5", 1 //done
// "QmQFgrN4cvtB5AfHRWJ6BptukeQjL1V9R3MiUyEVDXstA9", 1 //done
// "QmbBEjxrgipBxFJsimvVTcSN1BZtRfA3uV8EAkWmrQPohL", 1 //done
// "QmZvwGghKFUBEi3X97yQhyH7pkofF3K6rFLvYne879i75j", 1 //done
// "QmPHbg5NaXzVc5h2zBRVfKfzBqUmyDyhycrX39Z2g3DSd4", 1 //done
// "Qme3mWDQ1Etn9KwHs9um9aHQDLd65ZT3ct6SMerhh7cBk3", 1 //done
// "QmPVWR8qMdUK3pyNk8mRcT9Kk2WkTBfdSYqBQKgWrbKQpH", 1 //done
// "QmcE4r7xPb5Te5JQuBsDgryRLZ4ymEpn1SYYctrv4upo5H", 1 //done
// "QmWw7joedMe2VFpUyFLrNwFDgNpsBg1fwu39bP59U18pQF", 1 //done
// "QmQAjuzXMKN8JUmhDMdaJEbzcfhqjUS7uHh3ETUsmD7Y4k", 1 //done
// "QmaG4st5LW49fEmuatTDf3F19tAoA5fDzrux8v6UEJRVkt", 1 //done
// "QmNkhdvUMgc3Df2FTd8N5crcDmcZYHgBgdSHsRzTtDN2Ww", 1 //done
// "QmQXub8q51cq8FYFHXxqDJmdCcByNDx33HQmUVDELuGQZW", 1 //done
// "QmTkFstwSJC2Q6DVe9exMREVqqCN2HoeeMbjrjk4XknfVj", 1 //done
// "QmP1wgyTVMiiGTGJChSk1wCB7EWJjkYGvcEYrerFm1s57C", 1 //done
// "QmTHUhXurGwsBwqhSiMmpbrfbsQNGRnBmFvQGCRCnJJKZM", 1 //done
// "QmS4sGsUyPqLcQ3cwG2FiquGw5hWi272dPgyxvomDsFnDj", 1 //done
// "QmbAm9fXkRCFeTnbQX2Kn2pCVnXe3Hfa4g2skY81AEs4Z3", 1 //done
// "QmZis8fDBz6Kbjhrm1ZiKjCDndj7iJ2fWrkw3SQ6aPCNMd", 1 //done
// "QmcF4aBtFSsaGA3VJkZsYgFA2Z6J5bX56BP35kZXnHEpPf", 1 //done
// "QmNuSQ4XG7Dhxjwb1HwHzxpmS8sXyE9wweas8S5HXHqJgA", 1 //done
// "QmRRji9uJJueZ8qfxhHyLYUUiNrdGSPixHRYytg8cfuuDM", 1 //done
// "QmSCfh28xTm3PnaHS27CjCb4CJv5wvTB3jRVFUqeA8GtCn", 1 //done
// "QmTYDwcQPxTT4Pwbf6t6o1fHtNLnxKEQj3C8FcSZVHdjfV", 1 //done
// "QmaDVV5pAxCPxBXxyfEKmsiGR3jyPHTMZFqWRi5KeX1t16", 1 //done
// "Qmf9Yh6JSA6RCs2WegvVqnumKKi3JW18GVLPzPcvAKB6p5", 1 //done
// "QmSbL8wWdpAMJ7B9GR22VP6zA8HwYu37rfCw8QJJtPXwr3", 1 //done
// "QmPbuwXP8cLhqyPYEVgRkgpAG4nNA1vEA1LgcraYuhgpT7", 1 //done
// "QmbTTg95wpqafFUSTXh98sdJxjEWBJxgtt4zpFPXM9xTgq", 2 //done
// "QmUkuHJ5wFS2gcNEd7kMGjCLtZ68TWEDYMh4a6zqmd2SXb", 2 //done
// "QmY7bmkHXKysS8fEMBe4DM7gCLSf8Q7WGTfHJnahCUewhE", 2 //done
// "Qma3YmE9nt7p44wzeF1viYpQFfFM6bbDyBDiKXzDt2t6Sz", 2 //done
// "Qmb5oghEpVkA2ZDiTZC7Emj9QDTHubJfLUpCKuGWUworqB", 2 //done
// "QmatFoVAi9WPsJyLgyCJTGDxRCSKQyBiQhQtYyiuzmgfEJ", 2 //done
// "QmbN44WQ5YvFqiZzLV5s1GYiT98R54TWQp2U73zi54W6nR", 2 //done
// "QmRG5yFuPdgJGaju5XXw1iraJD5FFQXTTgcU9U2RSXw5EE", 2 //done
// "Qmaza4idKxo7yp94wt8QrK8iT8jyUAjd3w6VUtgoq6VSqe", 2 //done
// "QmXA7m7a6o6F21ZiQ9eoYobDqA6GHYYaShEZQ491gWFtB1", 2 //done