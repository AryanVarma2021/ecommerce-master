import express from 'express'
import cors from 'cors' 
import mysql from 'mysql'
import bodyParser from 'body-parser';


const app = express();

const db = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'ecommerce'  

})

db.connect((err)=>{
    if(err) {
        console.log("Error connecting", err);
    }
    console.log("Connecting to ECommerce...");

})

app.use(cors());

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.json());


app.post('/buyproducts', (req, res)=>{
  let {cartItems, username, totalPrice} = req.body;
  console.log(cartItems);
  console.log(username);
  if(!cartItems){
    res.status(400).send("Please add products to a cart");
  }
  if(!username) {
    res.status(500).send("Internal server error");
  }
  if(!totalPrice) {
    res.status(400).send("Please add a product to a cart");
  }
  let products = "";
  for(let i=0;i<cartItems.length;i++){
    let id1 = cartItems[i].id;
    products = products + " , " + String( id1);
  }
  console.log(products);





  
  const sql = "insert into orders (userid, items, totalamount ) values(?, ?, ?);";
  db.query(sql, [username, products,totalPrice], (err, results)=>{
    if (err) {
      console.log(err);
      return res.status(500).send('Server error');
    }
  res.status(200).send( {message : "order placed successfully"});

  })

})

app.post('/getuser', (req, res)=>{
    let {username,password} = req.body;
    if(!username || !password) {
        return res.status(400).send('All fields are required');
    }
    username = username.toLowerCase();
    const sql = "select * from users where username = ?";
    db.query(sql, [username], (err, results)=>{
        if (err) {
            console.log(err);
            return res.status(500).send('Server error');
          }
        res.status(200).send(results);

    })
})
app.post('/adduser', (req, res, next) => {
    let { username, email, password } = req.body;
    console.log(req.body);
  
    // check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).send('All fields are required');
    }
  
    // check if username already exists
    username = username.toLowerCase();
    let found = 0;
    const sql1 = 'SELECT * FROM users WHERE username = ?';
    db.query(sql1, [username], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Server error');
      }
      found = result.length;
      if (found > 0) {
        return res.status(201).send('User already exists');
      }
  
      // hash the password
      //const hashedPassword = bcrypt.hashSync(password, 10);
  
      // insert new user
      const sql = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
      db.query(sql, [email, username, password], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send('Server error');
        }
        console.log(result);
        res.status(200).send('User added successfully');
      });
    });
  });

app.listen(8081, ()=>{
    console.log("listening on port", 8081);
})






