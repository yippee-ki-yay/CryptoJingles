pragma solidity ^0.4.18;

import './Jingle.sol';
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
    uint public ownerBalance;
    
    uint OWNERS_CUT = 3; // 3 percent of every sale goes to owner
    
    mapping (uint => Order) public sellOrders;
    mapping(uint => uint) public positionOfJingle;
    
    uint[] public jinglesOnSale;
    
    Jingle public jingleContract;
    
    function Marketplace(address _jingle) public {
        jingleContract = Jingle(_jingle);
        ownerBalance = 0;
    }

    function sell(uint _jingleId, uint _amount) public {
        require(_amount > 100);
        require(jingleContract.ownerOf(_jingleId) == msg.sender);
        require(sellOrders[_jingleId].exists == false);
        
        sellOrders[_jingleId] = Order({
           price: _amount,
           seller: msg.sender,
           timestamp: now,
           exists: true
        });
        
        numOrders++;
        
        // set for iterating
        jinglesOnSale.push(_jingleId);
        positionOfJingle[_jingleId] = jinglesOnSale.length - 1;
        
        //transfer ownership 
        jingleContract.approve(this, _jingleId);
        jingleContract.transferFrom(msg.sender, this, _jingleId);
        
        //Fire an sell event
        SellOrder(msg.sender, _jingleId, _amount);
    }
    
    function buy(uint _jingleId) public payable {
        require(sellOrders[_jingleId].exists == true);
        require(msg.value >= sellOrders[_jingleId].price);
        
        sellOrders[_jingleId].exists = false;
        
        numOrders--;
        
        //delete stuff for iterating 
        removeOrder(_jingleId);
        
        //transfer ownership 
        jingleContract.transfer(msg.sender, _jingleId);
        
        // transfer money to seller
        uint price = sellOrders[_jingleId].price;
        
        uint percentage = (price / 100) * OWNERS_CUT;
        
        sellOrders[_jingleId].seller.transfer(price - percentage);
        
        ownerBalance += percentage;
        
        //fire and event
        Bought(_jingleId, msg.sender, msg.value);
    }
    
    function cancel(uint _jingleId) public {
        require(sellOrders[_jingleId].exists == true);
        require(sellOrders[_jingleId].seller == msg.sender);
        
        sellOrders[_jingleId].exists = false;
        
        numOrders--;
        
        //delete stuff for iterating 
        removeOrder(_jingleId);
        
        jingleContract.transfer(msg.sender, _jingleId);
        
        //fire and event
        Canceled(msg.sender, _jingleId);
    }
    
    function removeOrder(uint _jingleId) internal {
        uint length = jinglesOnSale.length;
        uint index = positionOfJingle[_jingleId];
        uint lastOne = jinglesOnSale[length - 1];

        jinglesOnSale[index] = lastOne;
        positionOfJingle[lastOne] = index;

        delete jinglesOnSale[length - 1];
        jinglesOnSale.length--;
    }
    
    //Owners functions 
    function withdraw(uint _amount) public onlyOwner {
        require(_amount <= ownerBalance);
        
        msg.sender.transfer(_amount);
    }
    
}