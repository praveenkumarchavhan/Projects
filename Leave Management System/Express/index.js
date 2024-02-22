  import { MongoClient } from "mongodb";
  import express from "express";
  import cors from "cors";

  const app = express();
  app.use(cors()); // allowing everyone.

  // required in post
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  async function addrecord(req, res) {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    const db = client.db("mydb");
    const messageColl = db.collection("message");

    let inputDoc = {
      message: req.query.message || "default",
    };
    await messageColl.insertOne(inputDoc);

    await client.close();

    // string response
    // res.send("record added")

    // json response :: preferred
    res.json({ opr: "success" });
  }

  async function findAllMessage(req, res) {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    const db = client.db("mydb");
    const messageColl = db.collection("message");

    let list = await messageColl.find().toArray();

    await client.close();
    res.json(list);
  }

  function helloPost(req, res) {
    let result = { opr: true };
    res.json(result);
  }

  // NEW TODO API
  async function addTodo(req, res) {
    try {
      const uri = "mongodb://localhost:27017";
      const client = new MongoClient(uri);

      const db = client.db("project");
      const messageColl = db.collection("todo");

      let inputDoc = {
        task: req.query.task,
        description: req.query.description,
        numpref: req.query.numpref,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
        status: req.query.status,
      };
      await messageColl.insertOne(inputDoc);

      await client.close();
      res.json({ opr: true });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async function findAllTodo(req, res) {
    try {
      const uri = "mongodb://localhost:27017";
      const client = new MongoClient(uri);

      const db = client.db("project");
      const messageColl = db.collection("todo");

      let list = await messageColl.find().toArray();

      await client.close();
      res.json(list);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async function addUserRecord(req, res) {
    try {
      const uri = "mongodb://localhost:27017";
      const client = new MongoClient(uri);

      const db = client.db("project");
      const messageColl = db.collection("user");

      let inputDoc = {
        username: req.query.username,
        password: req.query.password,
        email: req.query.email,
        mobile: req.query.mobile,
        prnnumber: req.query.prnnumber,
      };
      await messageColl.insertOne(inputDoc);

      await client.close();

      res.json({ opr: true });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  async function addUserRecordfaculty(req, res) {
    try {
      const uri = "mongodb://localhost:27017";
      const client = new MongoClient(uri);

      const db = client.db("project");
      const messageColl = db.collection("user1");

      let inputDoc = {
        username: req.query.username,
        password: req.query.password,
        email: req.query.email,
        mobile: req.query.mobile,
        empid: req.query.empid,
      };
      await messageColl.insertOne(inputDoc);

      await client.close();

      res.json({ opr: true });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  async function findAllUser(req, res) {
    try {
      const uri = "mongodb://localhost:27017";
      const client = new MongoClient(uri);

      const db = client.db("project");
      const messageColl = db.collection("user");

      let list = await messageColl.find().toArray();

      await client.close();
      res.json(list);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async function deleteUserRecord(req, res) {
    try {
      const uri = "mongodb://localhost:27017";
      const client = new MongoClient(uri);

      const db = client.db("project");
      const messageColl = db.collection("user");

      if (!req.query.email) {
        throw new Error("Required field is missing");
      }

      // this line is for delete
      await messageColl.deleteOne({ email: req.query.email });

      // for delete all
      // await messageColl.deleteMany({});

      await client.close();

      res.json({ opr: true });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  // LOGIN - AUTHENTICATION
  async function loginByGet(req, res) {
    try {
      const uri = "mongodb://localhost:27017";
      const client = new MongoClient(uri);

      const db = client.db("project");
      const messageColl = db.collection("user");

      let query = { email: req.query.email, password: req.query.password };
      let userRef = await messageColl.findOne(query);

      await client.close();

      // Negative: UserRef CANBE NULL;
      if (!userRef) {
        let errorMessage = `Record Not Found or Authentication Failure: ${req.query.email}`;
        throw new Error(errorMessage);
      }

      // Postive Scenario
      res.json(userRef);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async function loginByPost(req, res) {
    try {
      const uri = "mongodb://localhost:27017";
      const client = new MongoClient(uri);

      const db = client.db("project");
      const messageColl = db.collection("user");

      let query = { email: req.body.email, password: req.body.password };
      let userRef = await messageColl.findOne(query);

      await client.close();

      // Negative: UserRef CANBE NULL;
      if (!userRef) {
        let errorMessage = `Record Not Found or Authentication Failure: ${req.body.email}`;
        throw new Error(errorMessage);
      }

      // Postive Scenario
      res.json(userRef);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async function loginByPostfac(req, res) {
    try {
      const uri = "mongodb://localhost:27017";
      const client = new MongoClient(uri);

      const db = client.db("project");
      const messageColl = db.collection("user1");

      let query = { email: req.body.email, password: req.body.password };
      let userRef = await messageColl.findOne(query);

      await client.close();

      // Negative: UserRef CANBE NULL;
      if (!userRef) {
        let errorMessage = `Record Not Found or Authentication Failure: ${req.body.email}`;
        throw new Error(errorMessage);
      }

      // Postive Scenario
      res.json(userRef);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async function findstd(req, res) {
    try {
      const uri = "mongodb://localhost:27017";
      const client = new MongoClient(uri);

      const db = client.db("project");
      const messageColl = db.collection("user");

      let query = { email: req.body.email };
      let user = await messageColl.findOne(query);

      await client.close();

      if (!user) {
        let errorMessage = `Record Not Found or Authentication Failure`;
        throw new Error(errorMessage);
      }

      // Assuming the password is stored in the user object
      let password = user.password;

      let popupMessage = `Password: ${password} Email: ${req.body.email}`;
      res.send(`("${popupMessage}")`);
    } catch (err) {
      let errorMessage = `Error: ${err.message}`;
      res.send(`("${errorMessage}")`);
    }
  }

  async function findfac(req, res) {
    try {
      const uri = "mongodb://localhost:27017";
      const client = new MongoClient(uri);

      const db = client.db("project");
      const messageColl = db.collection("user1");

      let query = { email: req.body.email };
      let user = await messageColl.findOne(query);

      await client.close();

      if (!user) {
        let errorMessage = `Record Not Found or Authentication Failure`;
        throw new Error(errorMessage);
      }

      // Assuming the password is stored in the user object
      let password = user.password;

      let popupMessage = `Password: ${password} Email: ${req.body.email}`;
      res.send(`("${popupMessage}")`);
    } catch (err) {
      let errorMessage = `Error: ${err.message}`;
      res.send(`("${errorMessage}")`);
    }
  }
  // Assuming you have the necessary imports and setup for your Express app

  // DELETE route to delete a todo by ID

  async function updatestat(req, res) {
    try {
      const uri = "mongodb://localhost:27017";
      const client = new MongoClient(uri);

      const db = client.db("project");
      const messageColl = db.collection("todo");

      if (!req.query.task) {
        throw new Error("Required field is missing");
      }

      // this line is for delete
      await messageColl.updateOne(
        { task: req.query.task },
        { $set: { status: "Leave Accepted" } }
      );

      // for delete all
      // await messageColl.deleteMany({});

      await client.close();

      res.json({ opr: true });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async function deletetodo(req, res) {
    try {
      const uri = "mongodb://localhost:27017";
      const client = new MongoClient(uri);

      const db = client.db("project");
      const messageColl = db.collection("todo");

      if (!req.query.task) {
        throw new Error("Required field is missing");
      }

      // this line is for delete
      await messageColl.deleteOne({ task: req.query.task });

      // for delete all
      // await messageColl.deleteMany({});

      await client.close();

      res.json({ opr: true });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  // http://localhost:4000/addrecord
  app.get("/addrecord", addrecord);
  app.get("/findAll", findAllMessage);
  app.post("/hello", helloPost);
  app.get("/addtodo", addTodo);
  app.get("/find-all-todo", findAllTodo);
  app.get("/adduser", addUserRecord);
  app.get("/delete-user", deleteUserRecord);
  app.get("/find-all-user", findAllUser);
  app.get("/addfaculty", addUserRecordfaculty);
  app.get("/login-by-get", loginByGet);
  app.post("/login-by-post", loginByPost);
  app.post("/login-by-post-faculty", loginByPostfac);
  app.post("/findstd", findstd);
  app.post("/findfac", findfac);
  app.get("/deletetodo", deletetodo);
  app.get("/update-status", updatestat);

  // http://localhost:4000/
  app.listen(4000);
