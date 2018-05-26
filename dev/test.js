//import Blockchain from './blockchain';
const Blockchain = require('./blockchain');

const wagnerCoin = new Blockchain();

wagnerCoin.createNewBlock(0, 'hash01', 'hash02');
wagnerCoin.createNewTransaction(100, 'wagnerUHA786786HJ', 'MARIIHIU6786');

wagnerCoin.createNewBlock(1, 'hash02', 'hash03');
wagnerCoin.createNewTransaction(50, 'wagnerUHA786786HJ', 'MARIIHIU6786');
wagnerCoin.createNewTransaction(100, 'wagnerUHA786786HJ', 'MARIIHIU6786');
wagnerCoin.createNewTransaction(200, 'wagnerUHA786786HJ', 'MARIIHIU6786');

wagnerCoin.createNewBlock(3, 'hash03', 'hash04');

console.log(wagnerCoin);
console.log(wagnerCoin.chain[2]);