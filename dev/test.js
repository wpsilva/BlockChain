//import Blockchain from './blockchain';
const Blockchain = require('./blockchain');

const wagnerCoin = new Blockchain();

const previousBlockHash = 'hash01';
const currentBlockData = [
    {
        amount:10
        , sender: 'wagnerUHA786786HJ'
        , recipient:'MARIIHIU6786A'
    },
    {
        amount:20
        , sender: 'wagnerUHA786786HJ'
        , recipient:'MARIIHIU6786B'
    },
    {
        amount:30
        , sender: 'wagnerUHA786786HJ'
        , recipient:'MARIIHIU6786C'
    }
];

const nonce = 100;

console.log(wagnerCoin.prooOfWork(previousBlockHash, currentBlockData));

//console.log(wagnerCoin.hashBlock(previousBlockHash, currentBlockData, nonce));

//wagnerCoin.createNewBlock(0, 'hash01', 'hash02');
//wagnerCoin.createNewTransaction(100, 'wagnerUHA786786HJ', 'MARIIHIU6786');

//wagnerCoin.createNewBlock(1, 'hash02', 'hash03');
//wagnerCoin.createNewTransaction(50, 'wagnerUHA786786HJ', 'MARIIHIU6786');
//wagnerCoin.createNewTransaction(100, 'wagnerUHA786786HJ', 'MARIIHIU6786');
//wagnerCoin.createNewTransaction(200, 'wagnerUHA786786HJ', 'MARIIHIU6786');
//wagnerCoin.createNewBlock(3, 'hash03', 'hash04');

//console.log(wagnerCoin);
//console.log(wagnerCoin.chain[2]);