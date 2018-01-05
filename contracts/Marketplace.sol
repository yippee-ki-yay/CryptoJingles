pragma solidity ^0.4.18;

import './Song.sol';
import './zeppelin/ownership/Ownable.sol';

contract Marketplace is Ownable {
    
    struct Order {
        uint price;
        address seller;
        uint timestamp;
        bool exists;
    }
    
    event SellOrder(address owner, uint songId, uint price);
    event Bought(uint songId, address buyer, uint price);
    event Canceled(address owner, uint songId);
    
    uint public numOrders;
    
    mapping (uint => Order) public sellOrders;
    
    uint[] public songsOnSale;
    mapping(uint => uint) public positionOfSong;
    
    Song public songContract;
    
    function Marketplace(address _song) public {
        songContract = Song(_song);
    }

    function sell(uint _songId, uint _amount) public {
        require(songContract.ownerOf(_songId) == msg.sender);
        require(sellOrders[_songId].exists == false);
        
        sellOrders[_songId] = Order({
           price: _amount,
           seller: msg.sender,
           timestamp: now,
           exists: true
        });
        
        numOrders++;
        
        // set for iterating
        songsOnSale.push(_songId);
        positionOfSong[_songId] = songsOnSale.length - 1;
        
        //transfer ownership 
        songContract.approve(this, _songId);
        songContract.transferFrom(msg.sender, this, _songId);
        
        //Fire an sell event
        SellOrder(msg.sender, _songId, _amount);
    }
    
    function buy(uint _songId) public payable {
        require(sellOrders[_songId].exists == true);
        require(msg.value >= sellOrders[_songId].price);
        
        sellOrders[_songId].exists = false;
        
        numOrders--;
        
        //delete stuff for iterating 
        removeOrder(_songId);
        
        //transfer owenership 
        songContract.transfer(msg.sender, _songId);
        
        //fire and event
        Bought(_songId, msg.sender, msg.value);
    }
    
    function cancel(uint _songId) public {
        require(sellOrders[_songId].exists == true);
        require(sellOrders[_songId].seller == msg.sender);
        
        sellOrders[_songId].exists = false;
        
        numOrders--;
        
        //delete stuff for iterating 
        removeOrder(_songId);
        
        songContract.transfer(msg.sender, _songId);
        
        //fire and event
        Canceled(msg.sender, _songId);
    }
    
    function removeOrder(uint _songId) internal {
        uint length = songsOnSale.length;
        uint index = positionOfSong[_songId];
        uint lastOne = songsOnSale[length - 1];

        songsOnSale[index] = lastOne;
        positionOfSong[lastOne] = index;

        delete songsOnSale[length - 1];
        songsOnSale.length--;
    }
    
}