import { JingleV0Contract, JingleV1Contract } from './contractsRegistryService';
import { NUM_V0_OG_JINGLES, NUM_V1_OG_JINGLES } from '../constants/general';

// TODO - handle when there is a version
export const sortExploreJingles = (selectedSort, basicJingles) => {
  if (selectedSort.includes('jingleId')) {
    if (selectedSort.includes('-')) return basicJingles.sort((a, b) => (b[0] - a[0]));
    return basicJingles.sort((a, b) => (a[0] - b[0]));
  }
};

export const getExploreJinglesIdsWithVersion = async (filterValue) => {
  if (filterValue === 0) {
    const contract = await JingleV0Contract();
    const supply = await contract.methods.totalSupply().call();

    const ids = [...Array(parseFloat(supply)).keys()];
    return ids.map((id) => [id, 0]);
  }

  if (filterValue === 1) {
    const contract = await JingleV1Contract();
    const supply = await contract.methods.totalSupply().call();

    const ids = [...Array(parseFloat(supply)).keys()];
    return ids.map((id) => [id, 1]);
  }

  if (filterValue === 2) {
    const v0Ids = [...Array(NUM_V0_OG_JINGLES + 1).keys()];
    const v0IdsWithVersion = v0Ids.map((id) => [id, 0]);

    const v1Ids = [...Array(NUM_V1_OG_JINGLES + 1).keys()];
    const v1IdsWithVersion = v1Ids.map((id) => [id, 1]);

    return [...v0IdsWithVersion, ...v1IdsWithVersion];
  }

  if (filterValue === 3) {
    const contract = await JingleV0Contract();
    const contract1 = await JingleV1Contract();

    const v0OgIds = [...Array(NUM_V0_OG_JINGLES + 1).keys()];
    const v1OgIds = [...Array(NUM_V1_OG_JINGLES + 1).keys()];

    const [v0TotalSupply, v1TotalSupply] = await Promise.all([contract.methods.totalSupply().call(), contract1.methods.totalSupply().call()]);

    const v0Ids = [...Array(parseFloat(v0TotalSupply)).keys()];
    const newV0Ids = v0Ids.filter((id) => !v0OgIds.includes(id));
    const newV0IdsWithVer = newV0Ids.map((id) => [id, 0]);

    const v1Ids = [...Array(parseFloat(v1TotalSupply)).keys()];
    const newV1Ids = v1Ids.filter((id) => !v1OgIds.includes(id));
    const newV1IdsWithVer = newV1Ids.map((id) => [id, 1]);

    return [...newV1IdsWithVer, ...newV0IdsWithVer];
  }
};
