/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  GPv2Settlement,
  GPv2SettlementInterface,
} from "../GPv2Settlement";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IERC20",
        name: "sellToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IERC20",
        name: "buyToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "sellAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "buyAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "feeAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "orderUid",
        type: "bytes",
      },
    ],
    name: "Trade",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "orderUid",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "signed",
        type: "bool",
      },
    ],
    name: "setPreSignature",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class GPv2Settlement__factory {
  static readonly abi = _abi;
  static createInterface(): GPv2SettlementInterface {
    return new utils.Interface(_abi) as GPv2SettlementInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GPv2Settlement {
    return new Contract(address, _abi, signerOrProvider) as GPv2Settlement;
  }
}
