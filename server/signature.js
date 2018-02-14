const sigUtil = require('eth-sig-util');

module.exports.isValidSignature = (address, sig) => {

    const msgParams = [{
        type: 'string',
        name: 'Message',
        value: 'CryptoJingles',
    }];

    const recovered = sigUtil.recoverTypedSignature({
        data: msgParams,
        sig
    });

    if (address.toString().toLowerCase() === recovered.toString().toLowerCase()) {
        return true;
    } else {
        return false;
    }

};
