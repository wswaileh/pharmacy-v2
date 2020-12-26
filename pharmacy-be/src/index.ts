//express stuff
//body parser
import bodyParser from 'body-parser';
//cors
import cors from 'cors';
import express, { Request, Response } from "express";
//DB stuff
import mongoose from "mongoose";
import { billSchema } from './models/bill';
import { drugSchema } from './models/drug';
import { pharmacistSchema } from './models/pharmacist';

const app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


//configure db
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Pharmacy", { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

//models
const Pharmacist = mongoose.model("Pharmacist", pharmacistSchema);
const Drug = mongoose.model("Drug", drugSchema);
const Bill = mongoose.model("Bill", billSchema);


app.use(cors());
/***********************************\  
            RESTful API
\***********************************/
app.get('/', (req: Request, res: Response) => {
    res.send("Hello World!!!");
});

// ************* PHARMACISTS **********************
app.get('/pharmacists', (req: Request, res: Response) => {
    Pharmacist.find({}, (err, pharmacists) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(pharmacists);
    });
});

app.post('/pharmacists', (req: Request, res: Response) => {
    var newPharmacist = new Pharmacist(req.body);
    newPharmacist.save().then(items => {
        res.status(200).send(newPharmacist);
    })
});


// ************* DRUGS **********************
app.get('/drugs', (req: Request, res: Response) => {
    Drug.find({}, (err, drugs) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(drugs);
    })
});

app.post('/drugs', (req: Request, res: Response) => {
    var newDrug = new Drug(req.body);
    newDrug.save().then(() => {
        res.status(200).send(newDrug);
    }).catch(() => {
        res.status(409).send("Drug with such barcode already exists!");
    });
});

app.delete('/drug/:barcode', (req: Request, res: Response) => {
    Drug.findOne({ barcode: +req.params.barcode }, (err, doc) => {
        console.log(doc);
        console.log(err);
        doc?.remove();
        res.status(200).send()
    })
});

app.get('/drugs/:barcode', (req: Request, res: Response) => {
    Drug.findOne({ barcode: +req.params.barcode }).then((drugs) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(drugs);
    });
});

// ************* BILLS **********************
app.get('/bills', (req: Request, res: Response) => {
    Bill.find({}, (err, bills) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(bills);
    });
});

app.get('/bills/:id', (req: Request, res: Response) => {
    Bill.findOne({ _id: req.params.id }).then((bill) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.send(bill);
    });
});

app.post('/bill', (req: Request, res: Response) => {
    var newBill = new Bill(req.body);
    newBill.save().then(_ => {
        res.status(200).send(newBill);
    }).catch((_) => {
        res.status(409).send();
    });
});



const port = 3000;
app.listen(port, () => {
    console.log("Listening on port " + port);
});