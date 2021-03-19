// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.5.16;

contract LenioCoin {
    string public name = "Lenio Coin";
    string public symbol = "LENI";
    // uint8  public decimals = 10;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    constructor(uint256 _initialSupply) public {
        totalSupply = _initialSupply;
        balanceOf[msg.sender] = _initialSupply;
    }

    /* 
    Transfers an amount from the senders address to the receiver address
    */
    function transfer(address to, uint256 amt) public returns (bool success) {
        require(
            balanceOf[msg.sender] >= amt,
            "The available balance must be greater than the amount to transfer"
        );
        balanceOf[msg.sender] -= amt;
        balanceOf[to] += amt;

        emit Transfer(msg.sender, to, amt);

        return true;
    }

    /*
        Allows the spender to send a transfer of the specified amount.
    */
    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    /*
        Transfer the value from the _from account to the _to account
     */
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(
            _value <= allowance[_from][msg.sender],
            "The spender is not allowed to spend that amount"
        );
        require(
            _value <= balanceOf[_from],
            "The sender does not have enough funds"
        );
        balanceOf[_to] += _value;
        balanceOf[_from] -= _value;
        allowance[_from][msg.sender] = 0;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
