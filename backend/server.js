import express, { json } from "express";
const app = express();
const PORT = 3130;

app.use(json());

const cuentas = [
  {
    _id: "68f97f3fba27f6e8d87ebfd5",
    isActive: true,
    picture: "http://placehold.it/32x32",
    balance: "$2,526.52",
    client: "Justice Malone",
    gender: "male",
  },
  {
    _id: "68f97f3f8629c4b5c5242830",
    isActive: true,
    picture: "http://placehold.it/32x32",
    balance: "$2,616.65",
    client: "Annette Cooper",
    gender: "female",
  },
  {
    _id: "68f97f3fc01c3d527159571b",
    isActive: false,
    picture: "http://placehold.it/32x32",
    balance: "$1,265.50",
    client: "Tyson Ashley",
    gender: "male",
  },
  {
    _id: "68f97f3f20c6bd8cc810863d",
    isActive: false,
    picture: "http://placehold.it/32x32",
    balance: "$2,712.01",
    client: "Lavonne Bowman",
    gender: "female",
  },
  {
    _id: "68f97f3f1f52839b752612fa",
    isActive: true,
    picture: "http://placehold.it/32x32",
    balance: "$1,991.06",
    client: "Mckenzie Carrillo",
    gender: "male",
  },
  {
    _id: "68f97f3f9230bfbac31b24c5",
    isActive: false,
    picture: "http://placehold.it/32x32",
    balance: "$2,197.20",
    client: "Kline Fuller",
    gender: "male",
  },
  {
    _id: "68f97f3f727173556c6f6992",
    isActive: true,
    picture: "http://placehold.it/32x32",
    balance: "$2,626.25",
    client: "Summer Hart",
    gender: "female",
  },
];

app.get("/cuentas", (req, res) => {
  res.json({
    count: cuentas.length,
    data: cuentas,
  });
});

app.get("/cuenta/:id", (req, res) => {
  const id = req.params.id;
  const cuenta = cuentas.find((c) => c._id === id); // buscar por _id

  res.json({
    finded: !!cuenta,
    account: cuenta || null,
  });
});

app.get("/cuenta", (req, res) => {
  const query = req.query.queryParam;

  if (!query) {
    return res.status(400).json({
      error: "Falta el parámetro queryParam",
    });
  }

  //buscar por id
  const byId = cuentas.find((c) => c._id === query);
  if (byId) {
    return res.json({
      finded: true,
      account: byId,
    });
  }

  //buscar nombre del cliente
  const byClient = cuentas.find(
    (c) => c.client.toLowerCase() === query.toLowerCase()
  );
  if (byClient) {
    return res.json({
      finded: true,
      account: byClient,
    });
  }

  //buscar por genero (male/female)
  const byGender = cuentas.filter((c) => c.gender === query.toLowerCase());
  if (byGender.length > 0) {
    return res.json({
      finded: true,
      accounts: byGender,
    });
  }

  //Si no se encuentra nada
  return res.json({
    finded: false,
    message: "No se encontró ninguna coincidencia.",
  });
});

app.get("/cuentasBalance", (req, res) => {
  //filtrar las cuentas activas
  const cuentasActivas = cuentas.filter(c => c.isActive);

  //calcular la suma total de sus balances
  const totalBalance = cuentasActivas.reduce((acc, c) => {
    const valorNumerico = parseFloat(
        c.balance.replace(/[$,]/g, ""));
    return acc + valorNumerico;
  }, 0);

  res.json({
    status: cuentasActivas.length > 0,   // true si hay cuentas activas
    accountBalance: `$${totalBalance.toFixed(2)}` // formato con 2 decimales
  });
});

app.listen(PORT, () =>
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
);
