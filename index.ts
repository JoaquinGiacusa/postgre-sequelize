import * as express from "express";
import { sequelize } from "./db";
import { User } from "./db/user";
import { Product } from "./db/product";

//DESAFIO
const port = process.env.PORT || 3005;
const app = express();
app.use(express.json());

//get all
app.get("/products", async (req, res) => {
  const allProd = await Product.findAll();
  res.json(allProd);
});

//post a new product
app.post("/products", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

//get one prod by ID
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;

  const prodById = await Product.findAll({
    where: { id: productId },
  });
  res.json(prodById);
});

//modicar uno por id
app.patch("/products/:productId", async (req, res) => {
  const { productId } = req.params;

  const product = await Product.update(req.body, {
    where: {
      id: productId,
    },
  });

  res.json(product);
});

//borrar uno por id
app.delete("/products/:productId", async (req, res) => {
  const { productId } = req.params;

  const prodById = await Product.destroy({
    where: { id: productId },
  });

  res.json({ message: "deleted" });
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

/* DE LAS CLASES

async function main() {
  //await sequelize.sync({ alter: true });
  // const jane = await User.create({
  //   username: "janedoe",
  //   birthday: new Date(1980, 6, 20),
  // });
  // console.log(jane.toJSON());
  // const todos = await User.findAll();
  // console.log(todos);
  // const user2 = await User.findByPk(2);
  // console.log("segundo LOG", user2.get());

  // const newProduct = await Product.create({
  //   price: 3333,
  //   title: "nuevo producto",
  // });

  //console.log(newProduct);

  const allProd = await Product.findAll();
  console.log(allProd);

  // const prod2 = await Product.findByPk(3);
  // console.log(prod2.get());
}

main();

// function main() {
//   sequelize.authenticate().then((res) => {
//     console.log(res);
//   });
// } */
