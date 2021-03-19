pragma solidity ^0.5.16;

import "./Leniocoin.sol";

contract CoinSale {
    address payable admin;
    LenioCoin public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(address indexed _buyer, uint256 _amount);

    constructor(LenioCoin _tokenContract, uint256 _tokenPrice) public {
        // Assign an admin
        admin = msg.sender;

        // Assign Token contract
        tokenContract = _tokenContract;

        // Set token price
        tokenPrice = _tokenPrice;
    }

    function multiply(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        // Require that value is equal to token price
        require(
            msg.value == multiply(_numberOfTokens, tokenPrice),
            "The balance is not enough to buy the amount of tokens"
        );
        // Require that the contract has enough tokens

        require(
            tokenContract.balanceOf(address(this)) >= _numberOfTokens,
            "There is not enough tokens to fulfill the transaction"
        );

        // Keep track of number sold tokens
        tokensSold += _numberOfTokens;

        // Require that a transaction is successful
        require(
            tokenContract.transfer(msg.sender, _numberOfTokens),
            "The transfer of tokens was not successful"
        );

        emit Sell(msg.sender, _numberOfTokens);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can execute this function");
        _;
    }

    function endSale() public onlyAdmin {
        require(
            tokenContract.transfer(
                admin,
                tokenContract.balanceOf(address(this))
            )
        );
        // Destroy contract
        selfdestruct(admin);
    }
}
