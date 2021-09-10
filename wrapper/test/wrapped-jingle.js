const hre = require('hardhat');

const { expect } = require('chai');
const { ethers } = require('hardhat');

const impersonateAccount = async (account) => {
  await hre.network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: [account],
  });
};

describe('Wrapped Jingle', () => {
  const ACC = '0x93cdB0a93Fc36f6a53ED21eCf6305Ab80D06becA';
  let jingleV0;
  let jingleV1;
  let wrappedJingle;
  let accSigner;

  const tokenV1Id = '2';
  const tokenV0Id = '14';

  before(async () => {
    const WrappedJingle = await ethers.getContractFactory('OGWrappedJingle');
    wrappedJingle = await WrappedJingle.deploy();

    accSigner = await hre.ethers.provider.getSigner(ACC);

    // gib approvals
    jingleV0 = await hre.ethers.getContractAt('IERC721', '0x5AF7Af54E8Bc34b293e356ef11fffE51d6f9Ae78');
    jingleV1 = await hre.ethers.getContractAt('IERC721', '0x5B6660ca047Cc351BFEdCA4Fc864d0A88F551485');
  });

  it('Should wrap an existing jingle from V1', async () => {
    // simulate account
    await impersonateAccount(ACC);

    jingleV1 = jingleV1.connect(accSigner);
    wrappedJingle = wrappedJingle.connect(accSigner);

    await jingleV1.approve(wrappedJingle.address, tokenV1Id, { gasLimit: 400000 });

    await wrappedJingle.wrap(tokenV1Id, 1, { gasLimit: 400000 });

    // check owner of v1 token
    const oldTokenOwner = await jingleV1.ownerOf(tokenV1Id);
    expect(oldTokenOwner).to.be.eq(wrappedJingle.address);

    // check owner of wrapped token
    const wrappedTokenOwner = await wrappedJingle.ownerOf(1);
    expect(wrappedTokenOwner).to.be.eq(ACC);
  });

  it('Should wrap an existing jingle from V0', async () => {
    jingleV0 = jingleV0.connect(accSigner);
    wrappedJingle = wrappedJingle.connect(accSigner);

    await jingleV0.approve(wrappedJingle.address, tokenV0Id, { gasLimit: 400000 });

    await wrappedJingle.wrap(tokenV0Id, 0, { gasLimit: 400000 });

    // check owner of v0 token
    const oldTokenOwner = await jingleV0.ownerOf(tokenV0Id);
    expect(oldTokenOwner).to.be.eq(wrappedJingle.address);

    // check owner of wrapped token
    const wrappedTokenOwner = await wrappedJingle.ownerOf(2);
    expect(wrappedTokenOwner).to.be.eq(ACC);
  });

  it('Should unwrap and existing jingle from V1', async () => {
    const wrappedId = 1;

    wrappedJingle = wrappedJingle.connect(accSigner);

    await wrappedJingle.approve(wrappedJingle.address, wrappedId, { gasLimit: 400000 });

    await wrappedJingle.unwrap(wrappedId, 1, { gasLimit: 400000 });

    // check owner of v1 token
    const oldTokenOwner = await jingleV1.ownerOf(tokenV1Id);
    expect(oldTokenOwner).to.be.eq(ACC);

    // check wrapped owner
    const wrappedTokenOwner = await wrappedJingle.ownerOf(wrappedId);
    expect(wrappedTokenOwner).to.be.eq(wrappedJingle.address);
  });

  it('Should unwrap and existing jingle from V0', async () => {
    const wrappedId = 2;

    wrappedJingle = wrappedJingle.connect(accSigner);

    await wrappedJingle.approve(wrappedJingle.address, wrappedId, { gasLimit: 400000 });

    await wrappedJingle.unwrap(wrappedId, 0, { gasLimit: 400000 });

    // check owner of v0 token
    const oldTokenOwner = await jingleV0.ownerOf(tokenV1Id);
    expect(oldTokenOwner).to.be.eq(ACC);

    // check supply
    const numWrappedTokens = await wrappedJingle.totalSupply();
    expect(numWrappedTokens.toString()).to.be.eq('2');
  });

  it('Should wrap same V1 jingle again', async () => {
    // simulate account
    await impersonateAccount(ACC);

    jingleV1 = jingleV1.connect(accSigner);
    wrappedJingle = wrappedJingle.connect(accSigner);

    await jingleV1.approve(wrappedJingle.address, tokenV1Id, { gasLimit: 400000 });

    await wrappedJingle.wrap(tokenV1Id, 1, { gasLimit: 400000 });

    // check owner of v1 token
    const oldTokenOwner = await jingleV1.ownerOf(tokenV1Id);
    expect(oldTokenOwner).to.be.eq(wrappedJingle.address);

    // check owner of wrapped token
    const wrappedTokenOwner = await wrappedJingle.ownerOf(1);
    expect(wrappedTokenOwner).to.be.eq(ACC);

    const numWrappedTokens = await wrappedJingle.totalSupply();
    expect(numWrappedTokens.toString()).to.be.eq('2');
  });
});
