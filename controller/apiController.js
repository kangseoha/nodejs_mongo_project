var express = require('express');
var api = express.Router();
const Board = require('../models/board')

api.get('/select', async (req, res, next) => {
    console.log(req.query)
    if(req.query.idx){
        Board.findOne({idx : req.query.idx},(err,board) =>{
            if(err) return res.status(500).send({error : 'fail'});
            res.json(board)
        })
    } else{
        Board.find((err,board) =>{
            if(err) return res.status(500).send({error : 'fail'});
            res.json(board)
        })
    }
});

api.post('/select/confirm', async (req, res, next) => {
    Board.findOne({idx : req.body.idx, password:req.body.password},(err,board) =>{
        if(err) return res.status(500).send({error : 'fail'})
        return res.status(200).send({board});
    })
});

api.post('/insert', async (req, res, next) => {
    let board = new Board()
    board.name = req.body.name
    board.title = req.body.title
    board.content = req.body.content
    board.password = req.body.password

    board.save( (err) => {
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
    });
});

api.put('/put', async (req, res, next) => {
    Board.update({ idx: req.body.idx }, { $set: { name : req.body.name, title : req.body.title, content : req.body.content}  }, (err, output) => {
        if(err) res.status(500).json({ error: 'database failure' });
        console.log(output);
        if(!output.n) return res.status(404).json({ error: 'board not found' });
        return res.send({ message: '수정 완료' });
    })
});

api.delete('/delete', async (req, res, next) => {
    Board.findOne({idx : req.body.idx, password : req.body.password},(err,board) =>{
        if(err) return res.status(500).send({error : 'fail'});
        
        if(board){
            Board.remove({ idx : req.body.idx, password : req.body.password }, (err, output) => {
                if(err) return res.status(500).json({ error: "database failure" });
                res.status(200).send('success');
            })
        }else{
            res.status(200).send('fail');
        }
    })
});

module.exports = api;
