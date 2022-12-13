import React, { ReactComponentElement, useEffect, useState } from 'react'
import MsgSend from './msgSend'

import MsgMultiSend from './msgMultiSend'
import MsgSubmitEvidence from './msgSubmitEvidence'
import MsgUnjail from './msgUnjail'

import MsgCreateValidator from './msgCreateValidator'
import MsgExitDelegate from './msgExitDelegate'
import MsgCreateRegion from './msgCreateRegion'
import MsgUpdateRegion from './msgUpdateRegion'
import MsgWithdraw from './msgWithdraw'
import MsgKickValidatorByAddress from './msgKickValidatorByAddress'
import MsgCreateDelegate from './msgCreateDelegate'
import MsgKickValidatorByPubkey from './msgKickValidatorByPubkey'
import MsgUndelegate from './msgUndelegate'
import MsgDeleteRegion from './msgDeleteRegion'
import MsgDelegate from './msgDelegate'

import MsgSetKycMaxStaking from './msgSetKycMaxStaking'
import MsgNewKyc from './msgNewKyc'
import MsgDoFixedWithdraw from './msgDoFixedWithdraw'
import MsgAgToAc from './msgAgToAc'
import MsgDoFixedDeposit from './msgDoFixedDeposit'
import MsgSetKycMinStaking from './msgSetKycMinStaking'
import MsgSetRegionFeeRate from './msgSetRegionFeeRate'
import MsgSetFixedDepositInterestRate from './msgSetFixedDepositInterestRate'
import MsgRemoveKyc from './msgRemoveKyc'

import MsgVerifyInvariant from './msgVerifyInvariant'

import MsgWithdrawValidatorCommission from './msgWithdrawValidatorCommission'
import MsgWithdrawDelegatorReward from './msgWithdrawDelegatorReward'
import MsgSetWithdrawAddress from './msgSetWithdrawAddress'
import MsgFundCommunityPool from './msgFundCommunityPool'

import MsgRevokeAllowance from './msgRevokeAllowance'
import MsgGrantAllowance from './msgGrantAllowance'

import MsgSubmitProposal from './msgSubmitProposal'
import MsgVoteWeighted from './msgVoteWeighted'
import MsgVote from './msgVote'
import MsgDeposit from './msgDeposit'

import MsgBeginRedelegate from './msgBeginRedelegate'
// import MsgUndelegate from './msgUndelegate'
// import MsgCreateValidator from './msgCreateValidator'
// import MsgDelegate from './msgDelegate'
import MsgEditValidator from './msgEditValidator'

import MsgCreateVestingAccount from './msgCreateVestingAccount'

export default function TypeField(props: any) {
  console.log('type::', props.message?.['@type'])
  switch (props.message?.['@type']) {
    case '/cosmos.bank.v1beta1.MsgSend':
      return <MsgSend message={props.message}></MsgSend>
      break

    case '/cosmos.bank.v1beta1.MsgMultiSend':
      return <MsgMultiSend message={props.message}></MsgMultiSend>
      break

    case '/srspoa.srsevidence.MsgSubmitEvidence':
      return <MsgSubmitEvidence message={props.message}></MsgSubmitEvidence>
      break

    case '/srspoa.srslashing.MsgUnjail':
      return <MsgUnjail message={props.message}></MsgUnjail>
      break

    case '/srspoa.srstaking.MsgCreateValidator':
      return <MsgCreateValidator message={props.message}></MsgCreateValidator>
      break

    case '/srspoa.srstaking.MsgExitDelegate':
      return <MsgExitDelegate message={props.message}></MsgExitDelegate>
      break

    case '/srspoa.srstaking.MsgCreateRegion':
      return <MsgCreateRegion message={props.message}></MsgCreateRegion>
      break

    case '/srspoa.srstaking.MsgUpdateRegion':
      return <MsgUpdateRegion message={props.message}></MsgUpdateRegion>
      break

    case '/srspoa.srstaking.MsgWithdraw':
      return <MsgWithdraw message={props.message}></MsgWithdraw>
      break

    case '/srspoa.srstaking.MsgKickValidatorByAddress':
      return <MsgKickValidatorByAddress message={props.message}></MsgKickValidatorByAddress>
      break

    case '/srspoa.srstaking.MsgCreateDelegate':
      return <MsgCreateDelegate message={props.message}></MsgCreateDelegate>
      break

    case '/srspoa.srstaking.MsgKickValidatorByPubkey':
      return <MsgKickValidatorByPubkey message={props.message}></MsgKickValidatorByPubkey>
      break

    case '/srspoa.srstaking.MsgUndelegate':
      return <MsgUndelegate message={props.message}></MsgUndelegate>
      break

    case '/srspoa.srstaking.MsgDeleteRegion':
      return <MsgDeleteRegion message={props.message}></MsgDeleteRegion>
      break

    case '/srspoa.srstaking.MsgDelegate':
      return <MsgDelegate message={props.message}></MsgDelegate>
      break

    case '/srspoa.srvault.MsgSetKycMaxStaking':
      return <MsgSetKycMaxStaking message={props.message}></MsgSetKycMaxStaking>
      break

    case '/srspoa.srvault.MsgNewKyc':
      return <MsgNewKyc message={props.message}></MsgNewKyc>
      break

    case '/srspoa.srvault.MsgDoFixedWithdraw':
      return <MsgDoFixedWithdraw message={props.message}></MsgDoFixedWithdraw>
      break

    case '/srspoa.srvault.MsgAgToAc':
      return <MsgAgToAc message={props.message}></MsgAgToAc>
      break

    case '/srspoa.srvault.MsgDoFixedDeposit':
      return <MsgDoFixedDeposit message={props.message}></MsgDoFixedDeposit>
      break

    case '/srspoa.srvault.MsgSetKycMinStaking':
      return <MsgSetKycMinStaking message={props.message}></MsgSetKycMinStaking>
      break

    case '/srspoa.srvault.MsgSetRegionFeeRate':
      return <MsgSetRegionFeeRate message={props.message}></MsgSetRegionFeeRate>
      break

    case '/srspoa.srvault.MsgSetFixedDepositInterestRate':
      return <MsgSetFixedDepositInterestRate message={props.message}></MsgSetFixedDepositInterestRate>
      break

    case '/srspoa.srvault.MsgRemoveKyc':
      return <MsgRemoveKyc message={props.message}></MsgRemoveKyc>
      break

    case '/cosmos.crisis.v1beta1.MsgVerifyInvariant':
      return <MsgVerifyInvariant message={props.message}></MsgVerifyInvariant>
      break

    case '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission':
      return <MsgWithdrawValidatorCommission message={props.message}></MsgWithdrawValidatorCommission>
      break

    case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
      return <MsgWithdrawDelegatorReward message={props.message}></MsgWithdrawDelegatorReward>
      break

    case '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress':
      return <MsgSetWithdrawAddress message={props.message}></MsgSetWithdrawAddress>
      break

    case '/cosmos.distribution.v1beta1.MsgFundCommunityPool':
      return <MsgFundCommunityPool message={props.message}></MsgFundCommunityPool>
      break

    case '/cosmos.feegrant.v1beta1.MsgRevokeAllowance':
      return <MsgRevokeAllowance message={props.message}></MsgRevokeAllowance>
      break

    case '/cosmos.feegrant.v1beta1.MsgGrantAllowance':
      return <MsgGrantAllowance message={props.message}></MsgGrantAllowance>
      break

    case '/cosmos.gov.v1beta1.MsgSubmitProposal':
      return <MsgSubmitProposal message={props.message}></MsgSubmitProposal>
      break

    case '/cosmos.gov.v1beta1.MsgVoteWeighted':
      return <MsgVoteWeighted message={props.message}></MsgVoteWeighted>
      break

    case '/cosmos.gov.v1beta1.MsgVote':
      return <MsgVote message={props.message}></MsgVote>
      break

    case '/cosmos.gov.v1beta1.MsgDeposit':
      return <MsgDeposit message={props.message}></MsgDeposit>
      break

    case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
      return <MsgBeginRedelegate message={props.message}></MsgBeginRedelegate>
      break

    // case '/cosmos.staking.v1beta1.MsgUndelegate':
    //   return <MsgUndelegate message={props.message}></MsgUndelegate>
    //   break

    // case '/cosmos.staking.v1beta1.MsgCreateValidator':
    //   return <MsgCreateValidator message={props.message}></MsgCreateValidator>
    //   break

    // case '/cosmos.staking.v1beta1.MsgDelegate':
    //   return <MsgDelegate message={props.message}></MsgDelegate>
    //   break

    case '/cosmos.staking.v1beta1.MsgEditValidator':
      return <MsgEditValidator message={props.message}></MsgEditValidator>
      break

    case '/cosmos.vesting.v1beta1.MsgCreateVestingAccount':
      return <MsgCreateVestingAccount message={props.message}></MsgCreateVestingAccount>
      break

    default:
      return <MsgSend message={props.message}></MsgSend>
      break
  }
}
