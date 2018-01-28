pragma solidity ^0.4.18;

import './zeppelin/ownership/Ownable.sol';
import './Jingle.sol';
import './Sample.sol';

contract CryptoJingles is Ownable {
    
    struct Purchase {
        address user;
        uint blockNumber;
        bool revealed;
        uint numSamples;
        bool exists;
    }
    
    event Purchased(address indexed user, uint blockNumber, uint numJingles, uint numOfPurchases);
    event JinglesOpened(address byWhom, address jingleOwner, uint currBlockNumber);
    
    mapping (uint => bool) public isAlreadyUsed;
    
    uint numOfPurchases;
    
    uint MAX_SAMPLES_PER_PURCHASE = 30;
    uint SAMPLE_PRICE = 1000000000000000;
    uint SAMPLES_PER_SONG = 5;
    uint NUM_SAMPLE_RANGE = 1000;
    
    Sample public sampleContract;
    Jingle public jingleContract;
    
    function CryptoJingles(address _sample, address _jingle) public {
        numOfPurchases = 0;
        sampleContract = Sample(_sample);
        jingleContract = Jingle(_jingle);
        
        //sampleContract.setCryptoJinglesContract(this);
        //jingleContract.setCryptoJinglesContract(this);
    }
    
    function buyJingle(uint numSamples) public payable {
        require(numSamples <= MAX_SAMPLES_PER_PURCHASE);
        require(msg.value >= (SAMPLE_PRICE * numSamples));
        
         for (uint i = 0; i < numSamples; ++i) {
            
            bytes32 blockHash = block.blockhash(block.number - 1);
            
            uint randomNum = randomGen(blockHash, i);
            sampleContract.mint(msg.sender, randomNum);
        }
        
        Purchased(msg.sender, block.number, numSamples, numOfPurchases);
        
        numOfPurchases++;
    }
    
    function composeJingle(string name, string author, uint[5] samples) public {
        require(samples.length == SAMPLES_PER_SONG);
        require(jingleContract.uniqueJingles(keccak256(samples)) == false);
        
        //check if you own all the 5 samples 
        for (uint i = 0; i < SAMPLES_PER_SONG; ++i) {
            bool isOwner = sampleContract.isTokenOwner(samples[i], msg.sender);
            
            require(isOwner == true && isAlreadyUsed[samples[i]] == false);
            
            isAlreadyUsed[samples[i]] = true;
        }
        
        uint[5] memory sampleTypes;
        
        // remove all the samples from your Ownership
        for (uint j = 0; j < SAMPLES_PER_SONG; ++j) {
            sampleTypes[j] = sampleContract.tokenType(samples[j]);
            sampleContract.removeSample(msg.sender, samples[j]);
        }
        
        //create a new song containing those 5 samples
        jingleContract.composeJingle(msg.sender, samples, sampleTypes, name, author);
    }
    
    function randomGen(bytes32 blockHash, uint seed) constant public returns (uint randomNumber) {
        return (uint(keccak256(blockHash, block.timestamp, numOfPurchases, seed )) % NUM_SAMPLE_RANGE);
    }
    
    // Owner functions 
    function changeJingleCost(uint newCost) public onlyOwner {
        SAMPLE_PRICE = newCost;
    }
    
    function withdraw(uint _amount) public onlyOwner {
        require(_amount <= this.balance);
        
        msg.sender.transfer(_amount);
    }  
}