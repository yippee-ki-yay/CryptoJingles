import {
  JingleV0ViewContract,
  JingleV1ViewContract,
} from './contractsRegistryService';
import { formatViewJingle } from '../actions/utils';

export const getSingleJingle = async (version, id) => {
  // FIRST get data from the corresponding jingle contract
  const viewContractCreator = version === 0 ? JingleV0ViewContract : JingleV1ViewContract;
  const viewContract = await viewContractCreator();

  const jingleData = await viewContract.methods.getFullJingleData(id).call();
  return formatViewJingle(version, jingleData);
};
