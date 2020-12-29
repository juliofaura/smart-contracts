const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      gas: '50000000',
      gasPrice: 0,
      network_id: '*',
    },
    quorum: {
      host: 'localhost',
      port: 22000,
      gas: '50000000',
      gasPrice: 0,
      network_id: '*',
    },
    withHDWallet: {
      host: 'localhost',
      //	host: "127.0.0.1",
      port: 30300,
      gas: '50000000',
      gasPrice: 0,
      network_id: '*',
      from: 'fe3b557e8fb62b89f4916b721be55ceb828dbd73',
      provider: () => new HDWalletProvider('8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63', 'http://localhost:22000'),
    },
    demo: {
      host: 'quorum-1.dev.adhara.zone',
      port: 8545,
      gas: '50000000',
      gasPrice: 0,
      network_id: '*',
      from: 'fe3b557e8fb62b89f4916b721be55ceb828dbd73',
      provider: () => new HDWalletProvider('8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63', 'http://quorum-1.dev.adhara.zone:8545'),
    },
    julioLocal: {
      host: '10.211.55.4',
      port: 8545,
      gas: 50000000,
      gasPrice: 0,
      network_id: '*', // Match any network id    }
    },
  },

  // This only creates the junit report if this is run in CI
  mocha: (!!process.env.CI) ? ({
    // NOTE/TODO: it may be beneficial to use multi-reporters so that the same reports are generated locally and in CI.
    //            didn't get it working in the hour and a half I allocated to fix, but theoretically is very doable.
    //            https://www.npmjs.com/package/mocha-multi-reporters
    //            https://www.npmjs.com/package/mocha-multi
    reporter: 'mocha-junit-reporter',
    reporterOptions: {
      // Unfortunately this simple solution isn't working: https://docs.npmjs.com/misc/scripts#packagejson-vars
      mochaFile: `../_artifacts/${require('./package.json').name}/test-report.xml`
    }
  }) : ({}),

  compilers: {
    solc: {
      version: '0.8.0',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
  plugins: ["solidity-coverage"]
};
