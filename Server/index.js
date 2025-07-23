const express = require('express');
const path = require('path');
const cors = require('cors');
const { Filter } = require('lucide-react');
const app = express();
const PORT = 3000;
app.use(cors());
let cupons = [
    {
        nome: "desconta10",
        valido: true,
        quantidade: 10,
        valor: 0.10
    }
];
app.get("/cupomdesconto/:cupons", (req, res) => {
    let cupon = req.params.cupons;
    let cuponsfiltrado = cupons.find(x => x.nome.toUpperCase() == cupon)
    if (cuponsfiltrado) {
        cuponsfiltrado.valido && cuponsfiltrado.quantidade ? res.send(cuponsfiltrado.valor) : res.status(400).json({ message: "cupon invalido" })
    }
}
)



app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);

});