// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title ApolloAgreement
 * @dev Manages agreements between promoters and performers for Apollo
 */
contract ApolloAgreement {
    
    struct Agreement{
        uint payoutAmount; // might need to receive in ERC-20/USDT //uint instead of uint32 because msg.value is uint256
        uint32 payoutTime; // epoch 32-bit only works until year 2038!
        address[] payoutDestination; //
    }
    
    Agreement[] public agreements;
    mapping(uint => address) public agreementToPromoter;
    mapping(address => uint32) public promoterAgreementCount; 
    
    event NewAgreement(uint agreementId, uint payoutAmount, uint32 payoutTime, address[] payoutDestination); // emit event to listeners in front-end

    /**
     * @dev Create agreement between performers and promoters
     */
    function createAgreement(uint32 _payoutTime, address[] memory _payoutDestination) public payable {
        agreements.push(Agreement(msg.value, _payoutTime, _payoutDestination));
        uint id = agreements.length - 1;
        agreementToPromoter[id] = msg.sender;
        promoterAgreementCount[msg.sender]++;
        emit NewAgreement(id , msg.value, _payoutTime, _payoutDestination);
    }

    /**
     * @dev Get agreements between performers and promoters
     */
    function getAgreementsByPromoter(address _promoter) external view returns (Agreement[] memory) {
        Agreement[] memory result = new Agreement[](promoterAgreementCount[_promoter]);
        uint counter = 0;
        for (uint i = 0; i < agreements.length; i++){
          if (agreementToPromoter[i] == _promoter){
            result[counter] = agreements[i];
            counter++;
          }
    
        }
        return result;
      }
}
