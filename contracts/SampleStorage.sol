pragma solidity ^0.4.18;

import './zeppelin/ownership/Ownable.sol';

contract SampleStorage is Ownable {
    
    struct Sample {
        string ipfsHash;
        uint rarity;
    }
    
    mapping (uint => Sample) sampleTypes;
    
    uint public numOfSampleTypes;
    
    uint public numOfCommon;
    uint public numOfMedium;
    uint public numOfRare;
    
    function SampleStorage() public {
        //JUST FOR TEST DATA:
        numOfCommon = 12;
        numOfMedium = 6;
        numOfRare = 2;
    }
    
    
    // 4 distinct rarity types 
    // Common range - 0
    // Medium range - 1
    // Rare range - 2
    function addNewSampleType(string _ipfsHash, uint _rarityType) public onlyOwner {
        
        if (_rarityType == 0) {
            numOfCommon++;
        } else if (_rarityType == 1) {
            numOfMedium++;
        } else {
            numOfRare++;
        }
        
        sampleTypes[numOfSampleTypes + 1] = Sample({
           ipfsHash: _ipfsHash,
           rarity: _rarityType
        });
        
        numOfSampleTypes++;
    }
    
    function getType(uint _randomNum) public view returns (uint) {
        uint range = 0;
        
        if (_randomNum > 0 && _randomNum < 600) {
            range = 600 / numOfCommon;
            return _randomNum / range;
            
        } else if (_randomNum >= 600 && _randomNum < 900) {
            range = 300 / numOfMedium;
            return _randomNum / range;
        } else {
            range = 100 / numOfRare;
            return _randomNum / range;
        }
    }
}