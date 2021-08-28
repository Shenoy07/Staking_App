const DaiToken = artifacts.require("DaiToken");
const DappToken = artifacts.require("DappToken");
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function(deployer, network, accounts ){

    // Trying to Deploy DAI tokens
    await deployer.deploy(DaiToken);
    const daiToken = await DaiToken.deployed();

    // Deploy Dapp tokens
    await deployer.deploy(DappToken);
    const dappToken = await DappToken.deployed();

    // Deploy TokenForm    
    await deployer.deploy(TokenFarm, dappToken.address, daiToken.address);
    const tokenFarm = await TokenFarm.deployed();

    // We are puttinf all the dapp tokens in token Farm so it can distribute it as rewards(maybe)
    await  dappToken.transfer(TokenFarm.address, '1000000000000000000000000')

    // We transfered 100 Mock DAI tokens to investor. We can find the account on ganache.
    // The first address will be of the deployer and the second address will
    // be the one that we are using here(array starts from 0)
    
    await daiToken.transfer(accounts[1], '100000000000000000000')

}