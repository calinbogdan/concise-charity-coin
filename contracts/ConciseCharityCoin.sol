pragma solidity >= 0.5.0 < 0.7.0;

contract ConciseCharityCoin {
  mapping (address => uint256) public balances;
  
  constructor() public {

  }

  function createAccount(address _address) public returns (bool) {
    balances[_address] = 0;
  }

  function balanceOf(address _beneficiaryAddress) public view returns (uint256) {
    return balances[_beneficiaryAddress];
  }
}
