

const express = require('express');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors({ origin: true }));


const tree = require('./tree.json');


var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: "https://employee-managment-a84ff-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

app.get('/', (req, res) => {
    return res.status(200).send("Hello World!")
})


//create
app.post('/api/create', (req, res) => {
    (async () => {
        try {
            await db.collection('userDetails').doc(`/${Date.now()}/`).create({
                id: Date.now(),
                name: req.body.name,
                mobile: req.body.mobile,
                address: req.body.address
            });

            return res.status(200).send({
                status: 'success',
                msg: "saved"
            })

        } catch (err) {
            console.log(err);
            res.status(500).send({ status: "fail", msg: "error" })
        }
    })();
})


//get single data 
app.get(('/api/get/:id'), (req, res) => {
    (async () => {
        try {
            let resp = await db.collection('userDetails').doc(req.params.id).get();
            let data = resp.data();

            return res.status(200).send({
                status: 'success',
                data: data
            })

        } catch (err) {
            console.log(err);
            res.status(500).send({ status: "fail", msg: "error" })
        }
    })();
});


// get all the data
app.get(('/api/get'), (req, res) => {
    (async () => {
        try {
            let query = await db.collection('userDetails');
            let responce = [];

            await query.get().then((data) => {
                let docs = data.docs;

                docs.map((doc) => {
                    const selectedItem = {
                        name: doc.data().name,
                        mobile: doc.data().mobile,
                        address: doc.data().address
                    }

                    responce.push(selectedItem);
                })

                return responce;
            })

            return res.status(200).send({
                status: 'success',
                data: responce
            })

        } catch (err) {
            console.log(err);
            res.status(500).send({ status: "fail", msg: "error" })
        }
    })();
});


//update specific data
app.patch('/api/update/:id', (req, res) => {
    (async () => {
        try {
            await db.collection('userDetails').doc(req.params.id).update({
                name: req.body.name,
                mobile: req.body.mobile,
                address: req.body.address
            });

            return res.status(200).send({
                status: 'success',
                msg: "saved"
            })

        } catch (err) {
            console.log(err);
            res.status(500).send({ status: "fail", msg: "error" })
        }
    })();
});


//delete
app.delete('/api/delete/:id', (req, res) => {
    (async () => {
        try {
            await db.collection('userDetails').doc(req.params.id).delete();

            return res.status(200).send({
                status: 'success',
                msg: "deleted"
            })

        } catch (err) {
            console.log(err);
            res.status(500).send({ status: "fail", msg: "error" })
        }
    })();
});


app.post('/makeTree', (req, res) => {
    (async () => {
        try {
            await db.collection('Tree').doc(`1689450940457`).update(req.body);

            return res.status(200).send({
                status: 'success',
                msg: "saved"
            })

        } catch (err) {
            console.log(err);
            res.status(500).send({ status: "fail", msg: "error" })
        }
    })();
})



// get tree
app.get('/getTree', (req, res) => {
    (async () => {
        try {

            let tree = (await db.collection('Tree').doc(`1689450940457`).get()).data();

            res.status(200).send({
                status: 'success',
                data: tree
            })
            
        } catch (err) {
            console.log(err);
            res.status(500).send({ status: "fail", msg: "error" })
        }
    })()
})

function flattenTree(tree, parentID = null) {
    const result = [{ name: tree.value, id: tree.id, parentID }];
    if (tree.children) {
        for (const child of tree.children) {
            result.push(...flattenTree(child, tree.id));
        }
    }
    return result;
}


//update the roles table
app.post('/makeRoles', (req, res) => {
    (async () => {
        try {
            const value = flattenTree(req.body);
            // await db.collection('Tree').doc(`2`).update(null);
            await db.collection('Tree').doc(`2`).update({ ...value });

            return res.status(200).send({
                status: 'success',
                data: tree
            })

        } catch (err) {
            console.log(err);
            res.status(500).send({ status: "fail", msg: "error" })
        }
    })();
})


//delete single role
app.delete('/deleteRole/:id', (req, res) => {
    (async () => {
        try {
            console.log(req.params.id);
            await db.collection('employees').doc(req.params.id).delete();

            return res.status(200).send({
                status: 'success',
                data: {
                    id: req.params.id
                }
            })

        } catch (err) {
            console.log(err);
            res.status(500).send({ status: "fail", msg: "error" })
        }
    })();
})

//get the roles table
app.get('/getRoles', (req, res) => {
    (async () => {
        try {
            let query = (await db.collection('Tree').doc(`2`).get()).data();

            return res.status(200).send({
                status: 'success',
                data: query
            })

        } catch (err) {
            console.log(err);
            res.status(500).send({ status: "fail", data: null })
        }
    })();
})


// add employees
app.post('/addEmployee', (req, res) => {
    (async () => {

        console.log(req.body);
        try {
            const id = Date.now();
            await db.collection('employees').doc(`${id}`).create({
                id: id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                role: req.body.role
            });

            return res.status(200).send({
                status: 'success',
                data: req.body
            })
        } catch (err) {
            console.log(err);
            res.status(500).send({ status: "fail", data: null })
        }
    })();
})


//delete Employee
app.delete('/deleteEmployee/:id', (req, res) => {
    (async () => {
        try {
            console.log(req.params.id);
            await db.collection('employees').doc(req.params.id).delete();

            return res.status(200).send({
                status: 'success',
                data : {
                    id: req.params.id
                }
            })

        } catch (err) {
            console.log(err);
            res.status(500).send({ status: "fail", msg: "error" })
        }
    })();
})


//get employee's
app.get('/getEmployees', (req, res) => {
    (async () => {
        try {
            let query = await db.collection('employees');
            let responce = [];

            await query.get().then((data) => {
                let docs = data.docs;

                docs.map((doc) => {
                    const selectedItem = {
                        email: doc.data().email,
                        firstName: doc.data().firstName,
                        id: doc.data().id,
                        lastName: doc.data().lastName,
                        phone: doc.data().phone,
                        role: doc.data().role,
                    }

                    responce.push(selectedItem);
                })

                return responce;
            })

            return res.status(200).send({
                status: 'success',
                data: responce
            })
        } catch (err) {
            console.log(err);
            res.status(500).send({ status: "fail", data: null })
        }
    })()
});

//update employee
app.post('/updateEmployee/:id', (req, res) => {
    (async () => {
        try {
            const emp = await db.collection('employees').doc(req.params.id).update(req.body);

            return res.status(200).send({
                status: 'success',
                data: emp
            })

        } catch (err) {
            console.log(err);
            res.status(500).send({ status: "fail", msg: "error" })
        }
    })();
})

// exports the api to the firebase cloud functions
exports.app = functions.https.onRequest(app);