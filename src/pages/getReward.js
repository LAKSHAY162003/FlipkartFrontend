// src/components/RegisterBusiness.js
import React, { useEffect, useState } from 'react';
import './RegisterBusiness.css'; // Import the custom CSS file
import { Wallet, ethers } from "ethers";
import axios from 'axios';
import './ProductList.css'; // Import the CSS file


const GetReward = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from the backend

    const startUp=async()=>{
     await axios.get('http://localhost:3000/getListOfBusiness')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
    }

    startUp();
    
  }, []);

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


  // ""eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRhMTE3MDVhM2NmMzUyNTE3ZjIwZWIiLCJyb2xlIjoiQ3VzdG9tZXIiLCJpYXQiOjE2OTIwMTI5MTJ9.v3_lYDMHJbd273SEUa1e5rChmjD5ozYCiFWvuNC6xAo""
  const getBusinessBalance=async(tokenContractAddress)=>{
    
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
    const flipkartAddress ='0xee100e284DC8417aC5D803AbA0DcD743E76B1374';
    
    // idhar add token contract address by taking it from the : 
    // database itself !!
    const tokenContract = new ethers.Contract(tokenContractAddress, tokenABI, provider);
    
    const tokenBalance=(await tokenContract.balanceOf(flipkartAddress));
    console.log("Flip ",tokenBalance.toString());
  }

  const handleSubmit = async (productId,
    businessWalletAddress,
    tokenContractAddress) => {
    // e.preventDefault();
    await connectWallet();
    // console.log(productId);
    console.log(tokenContractAddress);
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
      ];

      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const userAdd=await signer.getAddress();
      // uint256 _points
      const _points=ethers.utils.parseUnits('1', '18');
      const transaction = await contract.
      reward(userAdd,_points,businessWalletAddress);
      
      const txResponse = await transaction.wait();
      console.log('Transaction Response : ',txResponse.transactionHash);
      
      const hash=txResponse.transactionHash;


      // userWalletAddress:req.body.userWalletAddress,
    //   firstName:req.body.firstName,
    //   lastName:req.body.lastName,
    //   userEmail:req.body.userEmail,

      // const pwd=customerData.pwd;
      // const userWalletAddress=add;
      // const userEmail=customerData.userEmail;
      // const firstName=customerData.firstName;
      // const lastName=customerData.lastName;


      // Send transaction hash and other data to your backend
      const response = await axios.post('http://localhost:3000/getReward', {
        signedTransaction:hash,
        businessId:productId,
        amount:1
      }, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRkNDY3M2M2ODliMzRkMzY5ZmRlZGYiLCJyb2xlIjoiQ3VzdG9tZXIiLCJpYXQiOjE2OTIyMjMwOTF9.1WFN8JJAVQUkwFVr4a1GA1HfhyGFMFLPIoJHhLdeMpY`, // Provide your access token
        },
      });

      // // Handle the response from the backend
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

  const handleJoinBusiness=async(productId,
    businessWalletAddress,
    tokenContractAddress)=>{
    if (window.ethereum) {
      try{
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
      ]; // Replace with your smart contract ABI

      const contract = new ethers.
      Contract(contractAddress, contractABI, signer);

        // reward(address _cAd, uint256 _points,address _bAd) 
      const transaction = await contract.joinBusiness(businessWalletAddress);
      
      //   // businessId , amount
      const txResponse = await transaction.wait();
      console.log('Transaction Response : ',txResponse.transactionHash);
      
      const hash=txResponse.transactionHash;

      const response = await axios.post('http://localhost:3000/joinBusiness', {
        signedTransaction:hash,
        businessId:productId,
      }, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRkNDY3M2M2ODliMzRkMzY5ZmRlZGYiLCJyb2xlIjoiQ3VzdG9tZXIiLCJpYXQiOjE2OTIyMjMwOTF9.1WFN8JJAVQUkwFVr4a1GA1HfhyGFMFLPIoJHhLdeMpY`, // Provide your access token
        },
      });

      console.log(response.data);


      }
      catch(error){
        console.log(error);
      }
    }      
  }

  const handleSpend=async (productId,
    businessWalletAddress,
    tokenContractAddress) => {
    // e.preventDefault();
    await connectWallet();
    // console.log(productId);
    console.log(tokenContractAddress);
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
      ];

      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      //spend(address _cAd,uint256 _points,address _bAd) 
      const userAdd=await signer.getAddress();
      // uint256 _points
      const _points=ethers.utils.parseUnits('1', '18');
      const transaction = await contract.
      spend(userAdd,_points,businessWalletAddress);
      
      const txResponse = await transaction.wait();
      console.log('Transaction Response : ',txResponse.transactionHash);
      
      const hash=txResponse.transactionHash;


      // userWalletAddress:req.body.userWalletAddress,
    //   firstName:req.body.firstName,
    //   lastName:req.body.lastName,
    //   userEmail:req.body.userEmail,

      // const pwd=customerData.pwd;
      // const userWalletAddress=add;
      // const userEmail=customerData.userEmail;
      // const firstName=customerData.firstName;
      // const lastName=customerData.lastName;


      // Send transaction hash and other data to your backend
      const response = await axios.post('http://localhost:3000/spend', {
        signedTransaction:hash,
        businessId:productId,
        amount:1
      }, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRkNDY3M2M2ODliMzRkMzY5ZmRlZGYiLCJyb2xlIjoiQ3VzdG9tZXIiLCJpYXQiOjE2OTIyMjMwOTF9.1WFN8JJAVQUkwFVr4a1GA1HfhyGFMFLPIoJHhLdeMpY`, // Provide your access token
        },
      });

      // // Handle the response from the backend
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

// _id businessWalletAddress name tokenContractAddress
  return (
    <div className="product-list">
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <div className="product">
              <h3>{product.name}</h3>
              <button onClick={() => handleSubmit
              (product._id,
              product.businessWalletAddress,
              product.tokenContractAddress)}>Purchase</button>
              <button onClick={() => handleJoinBusiness
              (product._id,
              product.businessWalletAddress,
              product.tokenContractAddress)}>Join</button>
              
              <button onClick={() => handleSpend
              (product._id,
              product.businessWalletAddress,
              product.tokenContractAddress)}>Spend</button>
              

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetReward;
