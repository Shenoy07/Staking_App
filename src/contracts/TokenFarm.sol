pragma solidity ^0.5.0;


import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm{

// We ll be writing the code here

    string public name = "Dapp Token Farm";
    address public owner;
    DappToken public dappToken;
    DaiToken public daiToken;
    
    
    
    address[] public stakers; //for tracking all the addresses that have ever staked

    //mapping in solidity is in key value

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    // Solidity is a statically type language


    constructor(DappToken _dappToken, DaiToken _daiToken)public {
        // we store reference to dai an dapp tokens 

        dappToken = _dappToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }


        // 1. Stakes tokens(Deposit)
        function stakeTokens(uint _amount) public{

            // Require amount greater than 0
            require(_amount > 0, "amount cannot be 0");

            // Transfer Mock Dai tokens to this contract for staking
            daiToken.transferFrom(msg.sender, address(this), _amount);

            // We ll update Staking balance
            stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

            // Add users to stakers array *only if they haven't staked before
            if(!hasStaked[msg.sender]){
                stakers.push(msg.sender);
            }

            // update staking status
            isStaking[msg.sender] = true;
            hasStaked[msg.sender] = true;


        }


        // 2. Issuing tokens/ rewards in form of tokens
        function issueTokens() public{
            require(msg.sender == owner, "caller must be the owner");  // Only owner can call this function
            for (uint i=0; i<stakers.length; i++){
                address recipient = stakers[i];
                uint balance = stakingBalance[recipient];
      
                if(balance>0)
                dappToken.transfer(recipient, balance);
            }
        }

        // 3. UnStaking Tokens (withdraw)
        
        function unstakeTokens() public{
            
            
            uint balance = stakingBalance[msg.sender];

            // require amount greater than 0
            require(balance > 0 , "Staking balance cannot be 0");

            // Transfer Mock Dai tokens to this contract for staking
            daiToken.transfer(msg.sender, balance);

            // Reset staking balance
            stakingBalance[msg.sender] = 0;

            // Update staking status
            isStaking[msg.sender] = false;

        }

}