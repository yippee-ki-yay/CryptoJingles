pragma solidity ^0.4.18;

import './zeppelin/ownership/Ownable.sol';

contract SampleStorage is Ownable {
    
    struct Sample {
        string ipfsHash;
        uint rarity;
    }
    
    mapping (uint => Sample) sampleTypes;
    
    uint public numOfSampleTypes;
    
    function SampleStorage() public {
    }
    
    
    // 4 distinct rarity types 
    // Common range of 20 elements 
    // Medium range of 10 elements
    // Rare range of 4 elements
    // Epric range of 1 element
    function addNewSampleType(string ipfsHash, uint rarityType) public onlyOwner {
        sampleTypes[numOfSampleTypes + 1] = Sample({
           ipfsHash: ipfsHash,
           rarity: rarityType
        });
        
        numOfSampleTypes++;
    }
}