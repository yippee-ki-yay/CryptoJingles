const hre = require('hardhat');

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('JingleViewV0', function() {
    this.timeout(800000);

  const ACC = '0x93cdB0a93Fc36f6a53ED21eCf6305Ab80D06becA';

  let jingleView;
  let accSigner;

  const tokenV1Id = '2';
  const tokenV0Id = '14';

  before(async () => {
    const JingleView = await ethers.getContractFactory('JingleViewV0');
    jingleView = await JingleView.deploy();

    accSigner = await hre.ethers.provider.getSigner(ACC);
  });

//   it('Should call full jingle info', async () => {
//     const jingleInfo = await jingleView.getFullJingleData(0);

//     console.log(jingleInfo);
//   });

//   it('Should call full jingle info for user', async () => {
//     const jinglesFull = await jingleView.getFullJingleDataForUser(ACC);

//     console.log(jinglesFull);
//   });

//   it('Should get samples of user', async () => {
//     const samples = await jingleView.getSamplesForUser(ACC);

//     console.log(samples);
//   });

//   it('Should get paginated jingles', async () => {
//     const jingles = await jingleView.getPaginatedJingles(0, 10);

//     console.log(jingles);
//   });

  it('Should get jingles on sale', async () => {
    const jingles = await jingleView.getJinglesOnSale();

    console.log(jingles);
  });
});
