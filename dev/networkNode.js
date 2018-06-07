const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const Blockchain = require('./blockchain.js');
const uuid = require('uuid/v1');
const port = process.argv[2];
const rp = require('request-promise');

const nodeAddress = uuid().split('-').join('');
const wagCoin = new Blockchain();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extend:false}));

app.get('/blockchain', function (req, res) {
    res.send(wagCoin);
});

app.post('/transaction', function (req, res) {
    console.log(req.body);
    const blockIndex = wagCoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.json({note:`Transaction will be added in block ${blockIndex}.`});
});

app.get('/mine', function (req, res) {
    const lastBlock = wagCoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transactions: wagCoin.pendingTransactions
        , index: lastBlock.index + 1
    };
    const nonce = wagCoin.prooOfWork(previousBlockHash, currentBlockData);
    const blockHash = wagCoin.hashBlock(previousBlockHash, currentBlockData, nonce);

    wagCoin.createNewTransaction(12.5, "00", nodeAddress);

    const newBlock = wagCoin.createNewBlock(nonce, previousBlockHash, blockHash);
    res.json({note:'New block mined successfully', block: newBlock});
});

app.post('/register-and-broadcast-node', function (req, res) {
    const newNodeUrl = req.body.newNodeUrl; 
    if(wagCoin.networkNode.indexOf(newNodeUrl)==-1){
        wagCoin.networkNode.push(newNodeUrl);
    }
    const regNodesPromises = [];
    wagCoin.networkNode.forEach(networkNodeUrl=>{
        const requestOption = {
            uri: networkNodeUrl + '/register-node'
            , method: 'POST'
            , body:{
                newNodeUrl:newNodeUrl
            }
            , json: true
        };
        regNodesPromises.push(rp(requestOption));
    });

    Promise.all(regNodesPromises).then(data=>{
        const bulkRegisterOptions = {
            uri: newNodeUrl + '/register-nodes-bulk'
            , method: 'POST'
            , body:{
                allNetworkNodes:[...wagCoin.networkNode, wagCoin.currentNodeUrl]
            }
            , json: true
        };
        return rp(bulkRegisterOptions);
    }).then(data =>{
        res.json({note: 'New node registered with network successfully.'});
    });
});

app.post('/register-node', function (req, res) {
    const newNodeUrl = req.body.newNodeUrl;
    if((wagCoin.networkNode.indexOf(newNodeUrl)==-1) && (wagCoin.currentNodeUrl!==newNodeUrl)){
        wagCoin.networkNode.push(newNodeUrl);
    }
    res.json({note:'New node registered successfully with node.'});
 });

 app.post('/register-nodes-bulk', function (req, res) {
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl=>{
        if((wagCoin.networkNode.indexOf(networkNodeUrl)==-1) && (wagCoin.currentNodeUrl!==networkNodeUrl)){
            wagCoin.networkNode.push(networkNodeUrl);
        }
    });

    res.json({note: 'Bulk registration successfully.'});
 });

app.listen(port, function(){
    console.log(`Listening on port ${port}...`);
});