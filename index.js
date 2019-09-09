/*
 * index.js
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



(async function main() {

  // load modules.
  const getproductticker = require('./node_methods/getproductticker')
  // loaded modules.

  // make requests.
  let ethusd = await getproductticker ( 'https://api.prime.coinbase.com', 'ETH-USD' )
  let ethdai = await getproductticker ( 'https://api.prime.coinbase.com', 'ETH-DAI' )
  let daiusd = await getproductticker ( 'https://api.prime.coinbase.com', 'DAI-USDC' )
  // made requests.

  // handle response.

    // report.
    let ethusdprice = Number ( ethusd.price );
    let ethdaiprice = Number ( ethdai.price );
    let daiusdprice = Number ( daiusd.price );
    console.log( ('ETH/USD price: ').padStart(20) + ethusdprice );
    console.log( ('ETH/DAI price: ').padStart(20) + ethdaiprice );
    console.log( ('DAI/USD price: ').padStart(20) + daiusdprice );
    console.log( ('============== ').padStart(20) );
    console.log( ('DAI/USD trade: ').padStart(20) + +ethusdprice / +ethdaiprice );
    // reported.

  // handled response.

}());
