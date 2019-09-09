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




// load modules.
const getproductticker = require('./node_methods/getproductticker')
// loaded modules.




(async function main() {

  // make request.
  let ticker = await getproductticker ( 'https://api.prime.coinbase.com', 'ETH-USD' )
  // made request.

  // handle response.

    // report.
    let price = Number ( ticker.price );
    console.log( ('price: ').padStart(20) + price );
    // reported.

  // handled response.

}());
