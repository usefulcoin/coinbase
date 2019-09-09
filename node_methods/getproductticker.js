/*
 * getproductticker.js
 *
 * Copyright (c) 2019 Useful Coin LLC. All Rights Reserved.
 *
 * This file is licensed. You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * https://raw.githubusercontent.com/usefulcoin/coinbase/master/LICENSE
 *
 * This script is supposed to submit safe bid and ask pairs to the sandbox. Please read the
 * README.md file for further information.
 *
 */




// load modules.
const crypto = require('crypto');
const fetch = require('node-fetch');
// loaded modules.




// import sensitive data.
const key = process.env.apikey;
const secret = process.env.apisecret;
const passphrase = process.env.apipassphrase;
// imported sensitive authentication data.




async function restapirequest ( method, requestpath, body ) { // make rest api request.
 
  // create the prehash string by concatenating required parts of request.
  let timestamp = Date.now() / 1000;
  let prehash = timestamp + method + requestpath;
  if ( body !== undefined ) { prehash = prehash + body; }
  // created the prehash.
 
  // base64 decode the secret.
  let base64decodedsecret = Buffer(secret, 'base64');
  // secret decoded.
 
  // create sha256 hmac with the secret.
  let hmac = crypto.createHmac('sha256',base64decodedsecret);
  // created sha256 hmac.
 
  // sign the require message with the hmac and base64 encode the result.
  let signedmessage = hmac.update(prehash).digest('base64');
  // signed message.
 
  // define coinbase required headers.
  let headers = {
    'ACCEPT': 'application/json',
    'CONTENT-TYPE': 'application/json',
    'CB-ACCESS-KEY': key,
    'CB-ACCESS-SIGN': signedmessage,
    'CB-ACCESS-TIMESTAMP': timestamp,
    'CB-ACCESS-PASSPHRASE': passphrase,
  };
  // defined coinbase required headers. yes... content-type is required.
  // see https://docs.prime.coinbase.com/#requests for more information.

  // define request options for http request.
  let requestoptions = { 'method': method, headers };
  if ( body !== undefined ) { requestoptions['body'] = body; }
  // defined request options for http request.

  // define url and send request.
  let url = restapiserver + requestpath;
  let response = await fetch(url,requestoptions);
  let json = await response.json();
  // defined url and sent request.

  return json;

} // made rest api request.




async function getproductticker ( restapiserver, productid ) {

  // make request.
  let ticker = await restapirequest ( 'GET', '/products/' + productid + '/ticker' );
  // made request.

  // handle response.
  if ( Object.keys(ticker).length === 0 ) { console.log('unable to retrieve information'); }
  else if ( Object.keys(ticker).length === 1 ) { console.log('the Coinbase response is "' + ticker.message + '"'); }
  else {

    // report ticker.
    return ticker; 
    // reported ticker.

  }
  // handled response.

}

module.exports = getproductticker;
