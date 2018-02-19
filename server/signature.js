const sigUtil = require('eth-sig-util');
const { LIKES_MESSAGE_TO_SIGN } = require('../config/universalConstants');

module.exports.isValidSignature = (address, sig) => {
  const msgParams = [{
    type: 'string',
    name: 'Message',
    value: LIKES_MESSAGE_TO_SIGN,
  }];

  const recovered = sigUtil.recoverTypedSignature({
    data: msgParams,
    sig,
  });

  return address.toString().toLowerCase() === recovered.toString().toLowerCase();
};
