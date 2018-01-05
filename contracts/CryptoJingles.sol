pragma solidity ^0.4.18;

import './zeppelin/ownership/Ownable.sol';
import './Jingle.sol';
import './Song.sol';

contract CryptoJingles is Ownable {
    
    struct Purchase {
        address user;
        uint blockNumber;
        bool revealed;
        uint numJingles;
        bool exists;
    }
    
    event Purchased(address indexed user, uint blockNumber, uint numJingles, uint numOfPurchases);
    event JinglesOpened(address byWhom, address jingleOwner, uint currBlockNumber);
    
    mapping (uint => Purchase) jinglePurchase;
    
    mapping (uint => bool) isAlreadyUsed;
    
    uint numOfPurchases;
    
    uint MAX_JINGLES_PER_PURCHASE = 10;
    uint JINGLE_PRICE = 1000000000000000;
    uint JINGLES_PER_SONG = 5;
    uint REWARD_FOR_OPEN = 10000000;
    uint NUM_JINGLE_TYPES = 20;
    
    uint ownerBalance;
    
    Jingle public jingleContract;
    Song public songContract;
    
    function CryptoJingles(address _jingle, address _song) public {
        numOfPurchases = 0;
        ownerBalance = 0;
        jingleContract = Jingle(_jingle);
        songContract = Song(_song);
    }
    
    function buyJingle(uint numJingles) public payable {
        require(numJingles <= MAX_JINGLES_PER_PURCHASE);
        require(msg.value >= (JINGLE_PRICE * numJingles));
        
        jinglePurchase[numOfPurchases] = Purchase({
           user: msg.sender,
           blockNumber: block.number,
           revealed: false,
           numJingles: numJingles,
           exists: true
        });
        
        numOfPurchases++;
        
        ownerBalance += msg.value - REWARD_FOR_OPEN;
        
        Purchased(msg.sender, block.number, numJingles, numOfPurchases);
    }
    
    //TODO: check the exact number of blocks 
    function openJingles(uint purchaseId) public {
        require(jinglePurchase[purchaseId].exists == true);
        require(jinglePurchase[purchaseId].revealed == false);
        require(block.number <= jinglePurchase[purchaseId].blockNumber + 255);
        
        for (uint i = 0; i < jinglePurchase[purchaseId].numJingles; ++i) {
            
            bytes32 blockHash = block.blockhash(jinglePurchase[purchaseId].blockNumber);
            
            uint randomNum = randomGen(blockHash, i);
            jingleContract.mint(jinglePurchase[purchaseId].user, randomNum);
        }
        
        jinglePurchase[purchaseId].revealed = true;
        
        msg.sender.transfer(REWARD_FOR_OPEN);
        
        JinglesOpened(msg.sender, jinglePurchase[purchaseId].user, block.number);
        
    }
    
    function composeSong(uint[5] jingles) public {
        require(jingles.length == JINGLES_PER_SONG);
        
        //check if you own all the 5 jingles 
        for (uint i = 0; i < JINGLES_PER_SONG; ++i) {
            bool isOwner = jingleContract.isTokenOwner(jingles[i], msg.sender);
            
            assert(isOwner == false || isAlreadyUsed[jingles[i]] == true);
            
            isAlreadyUsed[jingles[i]] = true;
        }
        
        // remove all the jingles from your Ownership
        for (uint j = 0; j < JINGLES_PER_SONG; ++j) {
            jingleContract.removeJingle(msg.sender, jingles[j]);
        }
        
        //create a new song containing those 5 jingles
        songContract.composeSong(msg.sender, jingles);
    }
    
    function randomGen(bytes32 blockHash, uint seed) constant public returns (uint randomNumber) {
        return (uint(keccak256(blockHash, seed )) % NUM_JINGLE_TYPES);
    }
    
    // Owner functions 
    function changeJingleCost(uint newCost) public onlyOwner {
        JINGLE_PRICE = newCost;
    }
    
    function changeRewardForOpen(uint newReward) public onlyOwner {
        REWARD_FOR_OPEN = newReward;
    }
    
    function changeNumJingleTypes(uint newNum) public onlyOwner {
        NUM_JINGLE_TYPES = newNum;
    }
    
    // If the time window of 255 blocks is somehow missed 
    // the owner can manualy enter that blocknum hash and unlock the jingles 
    function forceOpenJingles(uint purchaseId, bytes32 blockHash) public onlyOwner {
        require(jinglePurchase[purchaseId].exists == true);
        require(jinglePurchase[purchaseId].revealed == false);
        
        for (uint i = 0; i < jinglePurchase[purchaseId].numJingles; ++i) {
            uint randomNum = randomGen(blockHash, i);
            jingleContract.mint(jinglePurchase[purchaseId].user, randomNum);
        }
        
        jinglePurchase[purchaseId].revealed = true;
        
        msg.sender.transfer(REWARD_FOR_OPEN);
        
        JinglesOpened(msg.sender, jinglePurchase[purchaseId].user, block.number);
    }
    
    function withdraw(uint _amount) public onlyOwner {
        require(_amount <= ownerBalance);
        
        ownerBalance -= _amount;
        
        msg.sender.transfer(_amount);
    }
    
}