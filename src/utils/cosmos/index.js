import * as bech32 from 'bech32'
import * as bip32 from 'bip32'
import * as bip39 from 'bip39'
import CryptoJS from "crypto-js";
import bs58 from "bs58"
import bs58check  from "bs58check"
import { sha256 } from 'js-sha256'

// eslint-disable-next-line @typescript-eslint/no-var-requires
// var Buffer = require('buffer/').Buffer
// import Buffer from 'buffer'

// import bitcoinjs from 'bitcoinjs-lib'
import crypto from 'crypto'
/*
    Developed / Developing by Cosmostation
    [WARNING] CosmosJS is under ACTIVE DEVELOPMENT and should be treated as alpha version. We will remove this warning when we have a release that is stable, secure, and propoerly tested.
*/
// import fetch from 'node-fetch'
import axios from 'axios'
import message from './messages/proto'
// import request from 'request'
import secp256k1 from 'secp256k1'
// import secp256k1 from '@dashincubator/secp256k1'

export class Cosmos {
  constructor(url, chainId) {
    this.url = url
    this.chainId = chainId
    this.path = "m/44'/118'/0'/0/0"
    this.bech32MainPrefix = 'cosmos'
  }

  // strength(128): 12 words, strength(256): 24 words
  getRandomMnemonic(strength = 256) {
    return bip39.generateMnemonic(strength)
  }

  setBech32MainPrefix(prefix) {
    this.bech32MainPrefix = prefix
    if (!this.bech32MainPrefix) throw new Error('bech32MainPrefix object was not set or invalid')
  }

  setPath(value) {
    this.path = value
    if (!this.path) throw new Error('path object was not set or invalid')
  }

  getAddress(mnemonic, checkSum = true) {
    if (typeof mnemonic !== 'string') {
      throw new Error('mnemonic expects a string')
    }
    if (checkSum) {
      if (!bip39.validateMnemonic(mnemonic)) throw new Error('mnemonic phrases have invalid checksums')
    }
    const seed = bip39.mnemonicToSeed(mnemonic)
    const node = bip32.fromSeed(seed)
    console.log('this.path:::::', node)
    const child = node.derivePath(this.path)
    console.log('child::', child)
    const words = bech32.toWords(child.identifier)
    console.log('words::', words)
    return bech32.encode(this.bech32MainPrefix, words)
  }

  getAddressByPubKey(pubKey) {
    let hash = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(pubKey)).toString();
    hash = CryptoJS.RIPEMD160(CryptoJS.enc.Hex.parse(hash)).toString();
    // console.log('aaaaaaaa:', bs58check.encode(Buffer.from(CryptoJS.RIPEMD160(CryptoJS.SHA256(pubKey)))))
    // console.log('hash:::::', hash)
    // console.log('word:::', CryptoJS.RIPEMD160(CryptoJS.enc.Hex.parse(hash)))
    // console.log('b32:::::', bech32.decode('sil1wugfmfmacj2ssjj2fyu9ylv5j2cgajpqzp59x0'))
    
    // const a = bs58check.encode(Buffer.from(hash, "hex"))
    // console.log('a:::::', a)

    // const a1 = bs58.encode(new Uint8Array(Buffer.from(hash, "hex")))
    // console.log('a1:::::', a1)
    // const b = bip32.fromPublicKey()
    

    // const a2 = bip32.fromPublicKey(Buffer.from(hash, "hex"))
    // console.log('a2:::::', a2)

    // const b = bip32.fromPublicKey(Buffer.from(hash, "hex")).toBase58()
    // console.log('b:::::', b)
    return new Uint8Array(Buffer.from(hash, "hex"));
  }

  changeAddress(prefix, address) {
    try {
      const decode = bech32.decode(address)
      return bech32.encode(prefix, decode.words)
    } catch (e) {
      throw new Error('cannot change address')
      // return ''
    }
  }

  getECPairPriv(mnemonic) {
    if (typeof mnemonic !== 'string') {
      throw new Error('mnemonic expects a string')
    }
    const seed = bip39.mnemonicToSeed(mnemonic)
    const node = bip32.fromSeed(seed)
    const child = node.derivePath(this.path)
    return child.privateKey
  }

  getPubKey(privKey) {
    const pubKeyByte = secp256k1.publicKeyCreate(privKey)
    return pubKeyByte
  }

  getPubKeyAny(privKey) {
    const pubKeyByte = secp256k1.publicKeyCreate(privKey)
    var buf1 = new Buffer.from([10])
    var buf2 = new Buffer.from([pubKeyByte.length])
    var buf3 = new Buffer.from(pubKeyByte)
    const pubKey = Buffer.concat([buf1, buf2, buf3])
    const pubKeyAny = new message.google.protobuf.Any({
      type_url: '/cosmos.crypto.secp256k1.PubKey',
      value: pubKey,
    })
    return pubKeyAny
  }

  wasmQuery(contractAddress, query) {
    let smartQueryApi = '/wasm/contract/' + contractAddress + '/smart/' + toHex(query) + '?encoding=UTF-8'
    return axios.get(this.url + smartQueryApi).then(
      (response) => response.json(),
      (e) => {
        console.log('wasmQuery error::', e)
      }
    )
  }

  async getAccounts(address) {
    console.log('this.url::', this.url)
    let accountsApi = '/cosmos/auth/v1beta1/accounts/'

    // if (XMLHttpRequest) {
    //   return axios.get(this.url + accountsApi + address)
    // } else {
    const res = await fetch(this.url + accountsApi + address)
    return res.json()
    // }

    // .then(
    //   (response) => response.json(),
    //   (e) => {
    //     console.log('getAccounts error::', e)
    //   }
    // )
  }

  sign(txBody, authInfo, accountNumber, privKey) {
    try {
      const bodyBytes = message.cosmos.tx.v1beta1.TxBody.encode(txBody).finish()
      const authInfoBytes = message.cosmos.tx.v1beta1.AuthInfo.encode(authInfo).finish()
      const signDoc = new message.cosmos.tx.v1beta1.SignDoc({
        body_bytes: bodyBytes,
        auth_info_bytes: authInfoBytes,
        chain_id: this.chainId,
        account_number: Number(accountNumber),
      })
      let signMessage = message.cosmos.tx.v1beta1.SignDoc.encode(signDoc).finish()
      const hash = crypto.createHash('sha256').update(signMessage).digest()
      console.log('Buffer.from(privKey)::', Buffer.from(privKey))
      const sig = secp256k1.sign(hash, Buffer.from(privKey))
      // const sig = secp256k1.sign(hash, privKey)
      const txRaw = new message.cosmos.tx.v1beta1.TxRaw({
        body_bytes: bodyBytes,
        auth_info_bytes: authInfoBytes,
        signatures: [sig.signature],
      })
      const txBytes = message.cosmos.tx.v1beta1.TxRaw.encode(txRaw).finish()
      // const txBytesBase64 = Buffer.from(txBytes, 'binary').toString('base64')
      return txBytes
    } catch (error) {
      console.log('sign error::::::', error)
      return ''
    }
  }

  // "BROADCAST_MODE_UNSPECIFIED", "BROADCAST_MODE_BLOCK", "BROADCAST_MODE_SYNC", "BROADCAST_MODE_ASYNC"
  async broadcast(signedTxBytes, broadCastMode = 'BROADCAST_MODE_SYNC') {
    const txBytesBase64 = Buffer.from(signedTxBytes, 'binary').toString('base64')

    console.log('txBytesBase64:::', txBytesBase64)
    const params = { tx_bytes: txBytesBase64, mode: broadCastMode }

    // return Promise.resolve()
    // if (XMLHttpRequest) {
    //   return axios.post(this.url + '/cosmos/tx/v1beta1/txs', params, {
    //     headers: { 'Content-Type': 'application/json' },
    //   })
    // } else {
      const res = await fetch(this.url + '/cosmos/tx/v1beta1/txs', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      })
    
    return res.json()
    // }
    
  }
}

const setSrs = () => {
  const chainId = 'srspoa'
  const SRS = new Cosmos('http://192.168.0.206:1317', chainId)
  SRS.setBech32MainPrefix('sil')
  SRS.setPath("m/44'/118'/0'/0/0")
  return SRS
}

export const SRS = setSrs()

function toHex(str, hex) {
  try {
    hex = unescape(encodeURIComponent(str))
      .split('')
      .map(function (v) {
        return v.charCodeAt(0).toString(16)
      })
      .join('')
  } catch (e) {
    hex = str
    console.log('invalid text input: ' + str)
  }
  return hex
}
