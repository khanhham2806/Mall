const bodyParser = require("body-parser");
const express = require("express");
var cors = require("cors");
const app = express();
const multer = require("multer");
const path = require("path");
const deleteAllFilesInDir = require("./utils/deleteFile");
const { db } = require("./db");
const router = require("./auth/auth.routes");
const dotenv = require("dotenv");
const authMiddleware = require("./auth/auth.middlewares");
const { log } = require("console");
app.use(express.json());
const port = process.env.PORT || 8080;

const con = db();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.listen(80, function () {
  console.log("CORS-enabled web server listening on port 80");
});
app
  .route("/account")
  .get(authMiddleware.isAuth, function (req, res) {
    let sql = "SELECT * FROM Account";
    con.query(sql, (err, response) => {
      if (err) {
        res.send({ status: "error", message: err });
      } else {
        res.send({ status: "success", data: response });
      }
    });
  })
  .post(function (req, res) {
    let sql = `INSERT INTO Account SET ?`;
    const { body } = req;
    if (!body.AccountID) {
      res
        .status(400)
        .send({ status: "error", message: "Dữ liệu đầu vào không tồn tại." });
    } else {
      con.query(sql, body, function (err) {
        if (err) {
          res.send({ status: "error", message: err });
        } else {
          res.send({ status: "success", data: body });
        }
      });
    }
  });

app
  .route("/account/:accountId")
  .get(function (req, res) {
    const { accountId } = req.params;
    let sql = "SELECT * FROM Account WHERE AccountID = ?";
    con.query(sql, accountId, (err, response) => {
      if (err) throw err;
      const data =
        response && Array.isArray(response)
          ? response.find((el) => el.AccountID == accountId)
          : null;
      if (data) {
        res.send({ status: "success", data: data });
      } else {
        res.send({ status: "error", message: "AccountID không tồn tại." });
      }
    });
  })
  .put(function (req, res) {
    let sql = `UPDATE Account 
              SET ?
              WHERE AccountID = ?`;
    const { body, params } = req;
    const { accountId } = params;
    if (!body.AccountID) {
      res
        .status(400)
        .send({ status: "error", message: "AccountID vào không tồn tại." });
    } else {
      con.query(sql, [body, accountId], function (err) {
        if (err) {
          res.send({ status: "error", message: err });
        } else {
          res.send({ status: "success", data: body });
        }
      });
    }
  })
  .delete(function (req, res) {
    const { accountId } = req.params;
    let sql = `DELETE FROM Account WHERE AccountID = ? `;
    con.query(sql, accountId, function (err) {
      if (err) {
        res.send({ status: "error", message: err });
      } else {
        res.send({ status: "success", data: accountId });
      }
    });
  });

app.use("/auth", router);

app.get("/profile", authMiddleware.isAuth, async (req, res) => {
  res.send(req.user);
});

// app.get('/product', authMiddleware.isAuth, (req, res) => {
app.get('/product', (req, res) => {
  let sql = 'SELECT * FROM Product,seller where seller.sellerID=product.sellerID';
  con.query(sql, (err, response) => {
    if (err) {
      res.send({ status: "error", message: err });
    } else {
      res.send({ status: "success", data: response });
    }
  });
})


// app.get('/comment', (req, res) => {
//   const { id } = req.params;
//   let sql = 'select * from comment, where comment.productID = ?';
//   con.query(sql, id, (err, response) => {
//     if (err) {
//       res.send({ status: "error", message: err });
//     } else {
//       res.send({ status: "success", data: response });
//     }
//   });
// })
app.get('/product/:id', (req, res) => {
  const { id } = req.params;
  // console.log('>>>ID', id);
  let sql =
    `select 
        c.commentID, c.productID, c.accountID, c.commentContent, c.commentRate, 
        c.commentTime,  a.FullName, a.AvatarImageName, p.producttitle
    from 
        comment as c , product as p, account as a
    where 
        c.accountID = a.accountID and p.productID =c.productID
    having
        c.productID = ?
    `
  con.query(sql, id, (err, response) => {
    if (err) {
      res.send({ status: "error", message: err });
    } else {
      res.send({ status: "success", data: response });
    }
  });
})
// app.get('/product/:searchQuery', (req, res) => {
//   const { searchQuery } = req.params;
//   const searchQueryLike = '%'.concat(searchQuery, '%');
//   let sql = "select * from product  where product.title like ?"
//   con.query(sql, searchQueryLike, (err, response) => {

//     if (err) {
//       res.send({ status: "error", message: err });
//     } else {
//       res.send({ status: "success", data: response });
//     }
//   });
// })
app.delete('/product/:productID', function (req, res) {
  const { productID } = req.params;
  let sql = `DELETE FROM product WHERE productID = ? `;
  con.query(sql, productID, function (err) {
    if (err) {
      res.send({ status: "error", message: err });
    } else {
      res.send({ status: "success", data: sql });
    }
  });
});



app.get('/news', (req, res) => {
  let sql = 'SELECT * FROM news';
  con.query(sql, (err, response) => {
    if (err) {
      res.send({ status: "error", message: err });
    } else {
      res.send({ status: "success", data: response });
    }
  });
})


app.get('/category', (req, res) => {
  let sql = 'SELECT * FROM category';
  con.query(sql, (err, response) => {
    if (err) {
      res.send({ status: "error", message: err });
    } else {
      res.send({ status: "success", data: response });
    }
  });
})

app.get('/category/:category', (req, res) => {
  const { category } = req.params;
  // console.log(req.params);
  let sql = 'select * from product, category,seller where  product.productCategory = category.category and product.sellerID= seller.sellerID and category.category =?';
  con.query(sql, category, (err, response) => {
    if (err) {
      res.send({ status: "error", message: err });
    } else {
      res.send({ status: "success", data: response });
    }
  });
})



app.post('/cart', (req, res) => {
  let sql = `INSERT INTO cart set  ? `;
  const values = req.body
  console.log(values);
  con.query(sql, values, function (err) {
    if (err) {
      res.send({ status: "error", message: err });
    } else {
      res.send({ status: "success", data: sql });
    }
  });
})

app.get('/cart', (req, res) => {
  let sql = 'select * from cart  join product where product.productID = cart.productID';
  con.query(sql, (err, response) => {
    if (err) {
      res.send({ status: "error", message: err });
    } else {
      res.send({ status: "success", data: response });
    }
  });
})

app.put('/cart/increment', (req, res) => {
  const { productID } = req.body
  let sql = 'update cart set productQuantity = productQuantity +1 where productID =?';
  con.query(sql, productID, (err, response) => {
    if (err) {
      res.send({ status: "error", message: err });
    } else {
      res.send({ status: "success", data: response });
    }
  });
})
app.put('/cart/decrement', (req, res) => {
  const { productID } = req.body
  let sql = 'update cart set productQuantity = productQuantity -1 where productID =?';
  con.query(sql, productID, (err, response) => {
    if (err) {
      res.send({ status: "error", message: err });
    } else {
      res.send({ status: "success", data: response });
    }
  });
})
app.delete('/cart/:cartID', function (req, res) {
  const { cartID } = req.params;
  console.log(cartID);
  let sql = `DELETE FROM Cart WHERE cartID = ? `;
  con.query(sql, cartID, function (err) {
    if (err) {
      res.send({ status: "error", message: err });
    } else {
      res.send({ status: "success", data: sql });
    }
  });
});

app.delete('/checkout', function (req, res) {
  let sql = `DELETE FROM Cart WHERE accountID =1;`;
  con.query(sql, function (err) {
    if (err) {
      res.send({ status: "error", message: err });
    } else {
      res.send({ status: "success", data: sql });
    }
  });
});



app.listen(port);
console.log("Server started at http://localhost:" + port);
