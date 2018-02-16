pragma solidity ^0.4.18;

import './zeppelin/ownership/Ownable.sol';

contract SampleStorage is Ownable {
    
    struct Sample {
        string ipfsHash;
        uint rarity;
    }
    
    mapping (uint32 => Sample) public sampleTypes;
    
    uint32 public numOfSampleTypes;
    
    uint32 public numOfCommon;
    uint32 public numOfRare;
    uint32 public numOfLegendary;

    function addNewSampleType(string _ipfsHash, uint _rarityType) public onlyOwner {
        
        if (_rarityType == 0) {
            numOfCommon++;
        } else if (_rarityType == 1) {
            numOfRare++;
        } else if (_rarityType == 2) {
            numOfLegendary++;
        } else if (_rarityType == 3) {
            numOfCommon++;
        }
        
        sampleTypes[numOfSampleTypes] = Sample({
           ipfsHash: _ipfsHash,
           rarity: _rarityType
        });
        
        numOfSampleTypes++;
    }
    
    function getType(uint _randomNum) public view returns (uint32) {
        uint32 range = 0;
        
        if (_randomNum > 0 && _randomNum < 600) {
            range = 600 / numOfCommon;
            return uint32(_randomNum) / range;
            
        } else if (_randomNum >= 600 && _randomNum < 900) {
            range = 300 / numOfRare;
            return uint32(_randomNum) / range;
        } else {
            range = 100 / numOfLegendary;
            return uint32(_randomNum) / range;
        }
    }
    
}