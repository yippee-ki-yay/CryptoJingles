pragma solidity ^0.4.18;

import './zeppelin/ownership/Ownable.sol';

contract JingleStorage is Ownable {
    
    struct Jingle {
        string ipfsHash;
        uint rarity;
    }
    
    mapping (uint => Jingle) jingleTypes;
    
    uint public numOfJingleTypes;
    
    
    function JingleStorage() public {
    }
    
    function addNewJingleType(string ipfsHash, uint rarity) public onlyOwner {
        jingleTypes[numOfJingleTypes + 1] = Jingle({
           ipfsHash: ipfsHash,
           rarity: rarity
        });
        
        numOfJingleTypes++;
    }
    
    
}