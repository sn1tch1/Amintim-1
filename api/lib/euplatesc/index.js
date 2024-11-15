const Gateway = require('./Gateway');

async function getEuPlatescRequest(param, order) {
    const euplatescGateway = new Gateway({
        secretKey: param.secretKey, // from admin panel,
        merchantId: param.merchantId, // from admin panel
        sandbox: (param.env && param.env == 'staging') || param.env === undefined,
    });

    const data = await euplatescGateway.prepareAuthorizationRequestData({
        amount: order.price,
        currency: order.currency,
        invoiceId: order.id,
        orderDescription: order.description,
        'ExtraData[successurl]': order.success_url,
        'ExtraData[failedurl]': order.cancel_url,
        'ExtraData[silenturl]': order.home_url,
        'ExtraData[ep_method]': order.callback_method ? order.callback_method : 'post',
        billingDetails: {
            firstName: order.clientFirstName ? order.clientFirstName : "",
            lastName: order.clientLastName ? order.clientLastName : "",
            address: order.clientAddress ? order.clientAddress : "",
            email: order.clientEmail ? order.clientEmail : "",
            city: order.clientCity ? order.clientCity : "",
            country: 'Romania',
            phone: order.clientPhone ? order.clientPhone : "",
        }
    });

    return {
        redirectUrl: euplatescGateway.getRequestsEndpoint(),
        data: data
    }
}

module.exports = {
    getEuPlatescRequest: getEuPlatescRequest,
};