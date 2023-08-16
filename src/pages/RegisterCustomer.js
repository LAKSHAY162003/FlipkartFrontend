// src/components/RegisterBusiness.js
import React, { useEffect, useState } from 'react';
import './RegisterBusiness.css'; // Import the custom CSS file
import { ethers } from "ethers";
import axios from 'axios';
import { mnemonicToEntropy } from 'ethers/lib/utils';


const RegisterCustomer = () => {
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    userEmail: '',
    pwd:'',
    userWalletAddress:''
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
        
        const contractAddress = '0x06441b211a8729B40FE15955F9A58b2F5829d022'; // Replace with your smart contract address
        const contractABI =[
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
            "constant": false,
            "inputs": [
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
            "constant": false,
            "inputs": [
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
            "name": "listProductReward",
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
            "name": "spend",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
      ];// Replace with your smart contract ABI

      const contract = new ethers.
      Contract(contractAddress, contractABI, signer);

      const add=await signer.getAddress();

      const transaction = await contract.
      regCustomer(customerData.firstName,
        customerData.lastName,customerData.userEmail, add);
      
      const txResponse = await transaction.wait();
      console.log('Transaction Response : ',txResponse.transactionHash);
      
      const hash=txResponse.transactionHash;

      // userWalletAddress:req.body.userWalletAddress,
    //   firstName:req.body.firstName,
    //   lastName:req.body.lastName,
    //   userEmail:req.body.userEmail,

      const pwd=customerData.pwd;
      const userWalletAddress=add;
      const userEmail=customerData.userEmail;
      const firstName=customerData.firstName;
      const lastName=customerData.lastName;


      // Send transaction hash and other data to your backend
      const response = await axios.post('http://localhost:3000/registerCustomer', {
        signedTransaction:hash,
        userWalletAddress,
        firstName,
        userEmail,
        pwd: pwd
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
        <h2>Register Your Customer</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fName">First Name</label>
          <input
            type="text"
            id="fName"
            placeholder="Enter your business name"
            value={customerData.firstName}
            onChange={(e) => setCustomerData({ ...customerData, firstName: e.target.value })}
            required
          />

          <label htmlFor="lName">Last Name</label>
          <input
            type="text"
            id="lName"
            placeholder="Enter your business name"
            value={customerData.lastName}
            onChange={(e) => setCustomerData({ ...customerData, lastName: e.target.value })}
            required
          />

          <label htmlFor="customerEmail">Customer Email</label>
          <input
            type="email"
            id="customerEmail"
            placeholder="Enter your business email"
            value={customerData.userEmail}
            onChange={(e) => setCustomerData({ ...customerData, userEmail: e.target.value })}
            required
          />

        <label htmlFor="pwd">Password</label>
          <input
            type="text"
            id="pwd"
            placeholder="Enter your pwd"
            value={customerData.pwd}
            onChange={(e) => setCustomerData({ ...customerData, pwd: e.target.value })}
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


          {/* Add more input fields for other details */}
          
          <button type="submit" className="btn-register">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterCustomer;
