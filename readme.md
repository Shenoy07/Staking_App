# DApp Farm : A Staking App

DApp Farm helps stake daiTokens and earn native dapp tokens as returns on investment.
In simple terms, it is a fake yield farming application.

 # 1. Invest
 ![invest](https://github.com/Shenoy07/Staking_App/blob/main/Invest_gif.gif)
 # 2. Get Rewards For Staking
 ![getTokens](https://github.com/Shenoy07/Staking_App/blob/main/GetTokens_gif.gif)
 # 3. Unstake And Take The Reward Home
 ![UnStake](https://github.com/Shenoy07/Staking_App/blob/main/Unstake_gif.gif)

# Motivation
As I am interviewing for the post of Front-End-Blockchain developer, the recruiters asked me to make a Simple Staking App using web3.js. So I took on the challenge to learn web3.js in the deadline that I was given and I came up with Dapp Farm.


# How to Setup and run it on your Computer??

- Clone the repository
- Install Ganache and set an account in MetaMask with the private key.
- nodeJS 14.x or later should be installed on your system.
- Open the repository in terminal and type npm start
- truffle compile
- truffle migrate --reset
- truffle test (To check the test cases that we have created)
- The app should start at localhost:3000

# Technologies used:

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![CodeSandBox](https://img.shields.io/badge/Codesandbox-000000?style=for-the-badge&logo=CodeSandbox&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![Node](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white)


# Learnings and Approach

- Reading the documents and going through some videos got me familiar with the syntax and the purpose of why we will be using web3.js.
- Initially I went through a playlist which helped me understand what contracts & abis are how we use them to interact with the web and the EVMs.
- Then I had to plan out what will the logic I will be using in my dapp.
- ![block diagram](https://github.com/Shenoy07/Staking_App/blob/main/src/block%20dia.PNG)
- I followed a tutorial to understand how to write the contracts in Solana as I had never practiced that. A simple contract for TokenFarm for transactions was written.
- Meanwhile, I got to know the best practices for building contracts and how and why it involves testing. I have used chai for testing and we have written the test cases for the function used in the  TokenFarm contract.
 ![test-img](https://github.com/Shenoy07/Staking_App/blob/main/src/test-img.PNG)
- Now that we have all the contracts, we are ready to deploy them.
- We test and deploy them and check ganache for the gas fee that has been cut from the owner's address and also confirm about the accuracy of other transactions taking place.
- Now we focus on the front-end and how we will be using web3 to interact with our contracts.
- The main focus here was to link our contracts with the front end, so we followed the web3 document and looked for a function which helps us do that. web3.eth.contact ( _,_ ) was the one which we wanted.

- Now that we linked it, we took the required data from the respective contracts and then updated our useState variables.
 ```
 // Load TokenFarm
  const tokenFarmData = TokenFarm.networks[networkId]
  if(tokenFarmData) {
    const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
    this.setState({ tokenFarm })
    let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()
    this.setState({ stakingBalance: stakingBalance.toString() })
    console.log(stakingBalance)
  } else {
    window.alert('TokenFarm contract not deployed to detected network.')
  }
```
  - We wrote the code necessary for MetaMask to connect to out dapp.
  - The focus here was to learn and understand web3 so we keep the ui very simple and used minimal colors. We used bootstrap for the same.
  
  # The color palette
  
  The palette here is simple and consists of 4 colors
  
  ![image](https://user-images.githubusercontent.com/31709147/131264322-1b57cfdf-1c48-4cb7-860e-339e5bb9f8ec.png)

