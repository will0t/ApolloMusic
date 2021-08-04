// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title ApolloAgreement
 * @dev Manages agreements between promoters and performers for Apollo
 */
contract ApolloAgreement {
    
    struct Agreement{
        uint payoutAmount; // ERC-20/USDT implemention required
        uint payoutTime;
        address payable[] payoutDestination;
        bool paid; // newly created agreements can replace paid agreements to save gas
    }
    
    Agreement[] public agreements;
    mapping(uint => address) public agreementToPromoter;
    mapping(address => uint32) public promoterAgreementCount; 
    
    // emit events to listeners in front-end
    event NewAgreement(uint agreementId, uint payoutAmount, uint32 payoutTime, address payable[] payoutDestination); 
    event PaidAgreement(uint agreementId, uint payoutAmount);

    /**
     * @dev Create agreement between promoter and performer(s)
     */
    function createAgreement(uint32 _payoutTime, address payable[] memory _payoutDestination) public payable {
    	// might need to check for paid agreements to replace instead of creating new agreements
        agreements.push(Agreement(msg.value, _payoutTime, _payoutDestination, false));
        uint id = agreements.length - 1;
        agreementToPromoter[id] = msg.sender;
        promoterAgreementCount[msg.sender]++;
        emit NewAgreement(id , msg.value, _payoutTime, _payoutDestination);
    }

    /**
     * @dev Get agreements by promoter
     */
    function getAgreementsByPromoter(address payable _promoter) external view returns (Agreement[] memory) {
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
      
    /**
     * @dev Query agreement IDs that are due for payout
     */
    function getPayoutDues() external view returns (uint[] memory) {
        uint size = 0;
        for (uint i = 0; i < agreements.length; i++){
          if (agreements[i].paid == false && agreements[i].payoutTime <= block.timestamp){
            size++;
          }
        }
        
    	uint[] memory due = new uint[](size);
    	uint counter = 0;
    	for (uint i = 0; i < agreements.length; i++){
          if (agreements[i].paid == false && agreements[i].payoutTime <= block.timestamp){
            due[counter] = i;
            counter++;
          }
        }
        
        return due;
    }
     
    /**
     * @dev Trigger payout from promoter to performer(s) by agreement ID
     */
    function payoutAgreement(uint _agreementId) public { // might change to private and implement batch payout
    	Agreement memory agreement = agreements[_agreementId];
    	require(agreement.payoutTime <= (block.timestamp + 86400)); // window for payout is 24 hours (86400s) after payout time
    	agreement.payoutDestination[0].transfer(agreement.payoutAmount);
    	emit PaidAgreement(_agreementId, agreement.payoutAmount);
    }
    
    /**
     * @dev Reverse payment back to promoter before payout
     */
    function reverseAgreement() public {
    }
     
    /**
    * @dev Modify agreement details
    */
    function modifyAgreement() public {
    }
}
