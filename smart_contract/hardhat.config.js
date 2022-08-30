// https://eth-goerli.g.alchemy.com/v2/dnvyqY1m2yF7_L8YTjdepXg3TGmme3fy
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "goerli",
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: "XXXX",
      accounts: [
          "XXXXX"
      ]
    }
  }
};
