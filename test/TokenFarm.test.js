const { assert } = require('chai');
const { default: Web3 } = require('web3');


const DaiToken = artifacts.require("DaiToken");
const DappToken = artifacts.require("DappToken");
const TokenFarm = artifacts.require("TokenFarm");

require('chai')
    .use(require('chai-as-promised'))
    .should()


    // to help us with the tedious task of writing all the 0's again and again we use below fn
function tokens(n){
    return web3.utils.toWei(n, 'ether');
}

contract('TokenFarm',([owner, investor])=>{

    let daiToken, dappToken, tokenFarm;

    before(async ()=> {
       // We ll be Loading contracts here
        daiToken = await DaiToken.new();
        dappToken = await DappToken.new();
        tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)

        // Transfer all Dapp tokens to farm (1 million)
        await dappToken.transfer(tokenFarm.address,tokens('1000000'))

        //Transfer token to investor, in the test we need to pass the meta data
        await daiToken.transfer(investor, tokens('100'), { from : owner })
    })

    // Write tests here...

    describe('Mock DAI deployment', async () =>{
        it('has a name', async()=>{
            const name = await daiToken.name()
            assert.equal(name, 'Mock DAI Token')
        })
    })
    
    describe('Dapp Token deployment', async () =>{
        it('has a name', async()=>{
            const name = await dappToken.name()
            assert.equal(name, 'DApp Token')
        })
    })
    
    describe('Token Farm deployment', async () =>{
            it('has a name', async()=>{
                const name = await tokenFarm.name()
                assert.equal(name, 'Dapp Token Farm')
            })
    

    it('contract has tokens', async ()=>{
        let balance = await dappToken.balanceOf(tokenFarm.address)
        assert.equal(balance.toString(), tokens('1000000'))

    })
})
   
describe('Farming tokens', async ()=>{

    it('rewards investors for staking mDai tokens', async ()=>{
        let result

        // Check investor balance before staking
        result = await daiToken.balanceOf(investor);
        assert.equal(result.toString(), tokens('100'), 'investor Mock DAI wallet balance correct before staking');
        
        //Stake Mock DAi tokens, we approve and stake them
        
        await daiToken.approve(tokenFarm.address, tokens('100'), { from: investor })
        await tokenFarm.stakeTokens(tokens('100'), { from: investor })
        
        result = await daiToken.balanceOf(investor)
        assert.equal(result.toString(), tokens('0'), 'Investor Mock DAI wallet balance correct after staking')
        
        result = await daiToken.balanceOf(tokenFarm.address)
        assert.equal(result.toString(), tokens('100'), 'Token Farm Mock DAI balance correct after staking')

        result = await tokenFarm.stakingBalance(investor)
        assert.equal(result.toString(), tokens('100'), 'Investor staking balance correct after staking')
        
        result = await tokenFarm.isStaking(investor)
        assert.equal(result.toString(), 'true', 'Investor staking status correct after staking')

        // Issue token
        await tokenFarm.issueTokens({ from: owner } )

        // check balanec after issuance
        result = await dappToken.balanceOf(investor)
        assert.equal(result.toString(), tokens('100'), 'investor DApp token wallet balance correct after issuance')
        
        //Ensure only owner is calling this function
        await tokenFarm.issueTokens({ from: investor }).should.be.rejected;
        
        // Unstake tokens
        await tokenFarm.unstakeTokens({ from : investor })

        // Check results after unstaking
        result = await daiToken.balanceOf(investor)
        assert.equal(result.toString(), tokens('100'), 'investor Mock DAI Wallet balance correct after Staking')

        result = await daiToken.balanceOf(tokenFarm.address)
        assert.equal(result.toString(), tokens('0'), 'Token Farm Mock DAI Wallet balance correct after Staking')

        result = await tokenFarm.stakingBalance(investor)
        assert.equal(result.toString(), tokens('0'), 'investor staking balance correct after Staking')

        result = await tokenFarm.isStaking(investor)
        assert.equal(result.toString(),'false','investor staking status correct after staking')
    })
})


})


