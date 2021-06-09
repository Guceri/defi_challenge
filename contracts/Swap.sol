// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import '@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol';

contract Swap {
  //use uniswap router interface for both uniswap and sushiswap router addresses
  IUniswapV2Router02 uniswap;
  IUniswapV2Router02 sushiswap;

  constructor (address _uniswap, address _sushiswap){
    uniswap = IUniswapV2Router02(_uniswap);
    sushiswap = IUniswapV2Router02(_sushiswap);
  }

  function swapRoundTrip (address _tokenA, address _tokenB, uint uni_amountIn) public {
    //approve token A to be sent to uniswap
    IERC20(_tokenA).approve(address(uniswap), uni_amountIn);
    address [] memory uni_path = new address[](2);
    uni_path[0] = _tokenA;
    uni_path[1] = _tokenB;
    uint amountOutMin = 0;
    uint uni_deadline = block.timestamp + 60;
    //swap token A for Token B on uniswap
    uniswap.swapExactTokensForTokens(
      uni_amountIn,
      amountOutMin,
      uni_path,
      address(this),
      uni_deadline
    );
   
    //how much we got back from the 1st swap will be used in the second swap
    uint sushi_amountIn = IERC20(_tokenB).balanceOf(address(this));
    //NOTE: this should be giving approval to sushiswap instead
    IERC20(_tokenB).approve(address(uniswap), sushi_amountIn);
    address [] memory sushi_path = new address[](2);
    sushi_path[0] = _tokenB;
    sushi_path[1] = _tokenA;
    uint sushi_deadline = block.timestamp + 60;
    //swap token B for Token A on sushiswap
    //NOTE: this should be posted to sushiswap instead
    uniswap.swapExactTokensForTokens(
      sushi_amountIn,
      amountOutMin,
      sushi_path,
      address(this),
      sushi_deadline
    );


  }

  //used for the smart contract to receive ETH
  receive () external payable {}

}