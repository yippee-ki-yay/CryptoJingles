pragma solidity ^0.4.18;

import './Jingle.sol';
import './zeppelin/ownership/Ownable.sol';

contract Marketplace is Ownable {
    
    modifier onlyJingle() {
        require(msg.sender == address(jingleContract));
        _;
    }
    
    struct Order {
        uint price;
        address seller;
        uint timestamp;
        bool exists;
    }
    
    event SellOrder(address owner, uint jingleId, uint price);
    event Bought(uint jingleId, address buyer, uint price);
    event Canceled(address owner, uint jingleId);
    
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

    function sell(address _owner, uint _jingleId, uint _amount) public onlyJingle {
        require(_amount > 100);
        require(sellOrders[_jingleId].exists == false);
        
        sellOrders[_jingleId] = Order({
           price: _amount,
           seller: _owner,
           timestamp: now,
           exists: true
        });
        
        numOrders++;
        
        // set for iterating
        jinglesOnSale.push(_jingleId);
        positionOfJingle[_jingleId] = jinglesOnSale.length - 1;
        
        //transfer ownership 
        jingleContract.transferFrom(_owner, this, _jingleId);
        
        //Fire an sell event
        SellOrder(_owner, _jingleId, _amount);
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
        
        uint threePercent = (price / 100) * OWNERS_CUT;
        
        sellOrders[_jingleId].seller.transfer(price - threePercent);
        
        ownerBalance += threePercent;
        
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
    
    function getAllJinglesOnSale() public view returns(uint[]) {
        return jinglesOnSale;
    }
    
    //Owners functions 
    function withdraw(uint _amount) public onlyOwner {
        require(_amount <= ownerBalance);
        
        msg.sender.transfer(_amount);
    }
    
}