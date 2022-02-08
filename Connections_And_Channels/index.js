const express     = require('express');
const app         = express();
const port        = process.env.PORT || 3000;
const consumerOne = require('./consumerconnection1.js');
const consumerTwo = require('./consumerconnection2.js');
const publisher   = require('./publisherconnection.js');

app.use(express.json());

app.post('/start',async(req, res,next) => {
    try{    
        await consumerOne();
        await consumerTwo();
        await publisher('hallo');
        
        res.send('Done');
         
    }catch(err){
        res.send('foutje : ' +err);
    } 
})
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})