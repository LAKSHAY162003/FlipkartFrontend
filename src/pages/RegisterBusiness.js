// src/components/RegisterBusiness.js
import React, { useEffect, useState } from 'react';
import './RegisterBusiness.css'; // Import the custom CSS file
import { ethers } from "ethers";
import axios from 'axios';
import { mnemonicToEntropy } from 'ethers/lib/utils';


const RegisterBusiness = () => {
  const [businessData, setBusinessData] = useState({
    name: '',
    email: '',
    pwd:'',
    businessWalletAddress:'',
    tokenSymbol:''
    // Add more fields as needed
  });


  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected to MetaMask');
        console.log(window.ethereum);
      } catch (error) {
        alert("Connect to Metamask !!");
        connectWallet();
      }
    }
  };

  useEffect(()=>{
    connectWallet();
  },[]); // means at startup !!


  // "0x1c9A0af0b1a14DaD32D93e9593740407Ac691BAe"
  const getBusinessBalance=async()=>{
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const add=await signer.getAddress();
    const tokenABI = [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_bAd",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_symbol",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "_decimal",
            "type": "uint8"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "MinterAdded",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "MinterRemoved",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "addMinter",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "burnFrom",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "subtractedValue",
            "type": "uint256"
          }
        ],
        "name": "decreaseAllowance",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "addedValue",
            "type": "uint256"
          }
        ],
        "name": "increaseAllowance",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "isMinter",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "mint",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "renounceMinter",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
    const flipkartAddress ='0x37144a383A69d528A1176Ba237a0F860dA160141';
      
    // idhar add token contract address by taking it from the : 
    // database itself !!
    const tokenContract = new ethers.Contract("0x5eA776A5665dABbE9E3e1279F09F46ebc1929A00", tokenABI, provider);
    
    const tokenBalance=(await tokenContract.balanceOf(flipkartAddress));
    console.log("Flip ",tokenBalance.toString());
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    await connectWallet();
    if (window.ethereum) {

        try{
          // Request account access if needed
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        
      const contractAddress = '0x50964a885af9e7ba198049327d1905ae2216bc77'; // Replace with your smart contract address
      const contractABI = [
        {
          "inputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "constant": true,
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "businesses",
          "outputs": [
            {
              "internalType": "address",
              "name": "busAd",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "email",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isReg",
              "type": "bool"
            },
            {
              "internalType": "contract loyalty_points",
              "name": "lt",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "count",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "customers",
          "outputs": [
            {
              "internalType": "address",
              "name": "cusAd",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "firstName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "lastName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "email",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isReg",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "flipkartAccount",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "isAddressInitialized",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "address",
              "name": "flipkartAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "_bName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_email",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "_bAd",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "_symbol",
              "type": "string"
            },
            {
              "internalType": "uint8",
              "name": "_decimal",
              "type": "uint8"
            }
          ],
          "name": "regBusiness",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "internalType": "address",
              "name": "_bAd",
              "type": "address"
            }
          ],
          "name": "getBusinessCoin",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "string",
              "name": "_firstName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_lastName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_email",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "_cAd",
              "type": "address"
            }
          ],
          "name": "regCustomer",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "address",
              "name": "_bAd",
              "type": "address"
            }
          ],
          "name": "joinBusiness",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "address",
              "name": "_cAd",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "_points",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "_bAd",
              "type": "address"
            }
          ],
          "name": "reward",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "internalType": "address",
              "name": "_bAd",
              "type": "address"
            }
          ],
          "name": "getBusinessBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        }
      ]; // Replace with your smart contract ABI

      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const flipkartAddress ='0x37144a383A69d528A1176Ba237a0F860dA160141';
      const add=await signer.getAddress();
      const tx = await contract.regBusiness(
        flipkartAddress,
        businessData.name,
        businessData.email,
        add, // Sender's address
        businessData.tokenSymbol, // Replace with the actual token symbol
        18, // Replace with the actual decimal value
      );
      const txResponse = await tx.wait();
      console.log('Transaction Response : ',txResponse.transactionHash);
      
      const hash=txResponse.transactionHash;
      const ltAddress = await contract.getBusinessCoin(add);
      console.log('LT Address:', ltAddress);

      const password=businessData.pwd;
      const businessWalletAddress=add;
      const email=businessData.email;
      const name=businessData.name;
      // Send transaction hash and other data to your backend
      const response = await axios.post('http://localhost:3000/registerBusiness', {
        signedTransaction:hash,
        businessWalletAddress,
        name,
        email,
        pwd: password,
        tokenContractAddress:ltAddress
      });

      // Handle the response from the backend
      console.log(response.data); // This should contain user details and access token        


    }
      catch(error){
        console.log(error);
      }


      
      }
      else{
        await connectWallet();
      }
  };

  const getAllBusiness=async()=>{
    const response = await axios.get('http://localhost:3000/getListOfBusiness');

      // Handle the response from the backend
      console.log(response.data); // This should contain user details and access token 
  }


  return (
    <div className="container">
      <div className="register-form">
        <h2>Register Your Business</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="businessName">Business Name</label>
          <input
            type="text"
            id="businessName"
            placeholder="Enter your business name"
            value={businessData.name}
            onChange={(e) => setBusinessData({ ...businessData, name: e.target.value })}
            required
          />

          <label htmlFor="businessEmail">Business Email</label>
          <input
            type="email"
            id="businessEmail"
            placeholder="Enter your business email"
            value={businessData.email}
            onChange={(e) => setBusinessData({ ...businessData, email: e.target.value })}
            required
          />

        <label htmlFor="pwd">Password</label>
          <input
            type="text"
            id="pwd"
            placeholder="Enter your pwd"
            value={businessData.pwd}
            onChange={(e) => setBusinessData({ ...businessData, pwd: e.target.value })}
            required
          />

        {/* <label htmlFor="wallet">Business Wallet Address</label>
          <input
            type="text"
            id="wallet"
            placeholder="Enter your wallet address"
            value={businessData.businessWalletAddress}
            onChange={(e) => setBusinessData({ ...businessData, businessWalletAddress: e.target.value })}
            required
          /> */}

        <label htmlFor="symb">Business Token Symbol</label>
          <input
            type="text"
            id="symb"
            placeholder="Enter your Token Symbol"
            value={businessData.tokenSymbol}
            onChange={(e) => setBusinessData({ ...businessData, tokenSymbol: e.target.value })}
            required
          />

          {/* Add more input fields for other details */}
          
          <button type="submit" className="btn-register">Register</button>
          <button type="button" className="btn-register" onClick={getBusinessBalance}>Get token Value !!</button>
          <button type="button" className="btn-register" onClick={getAllBusiness}>Get All Businesses !!</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterBusiness;
