const produto_service = require('../services/produto-service');

exports.create = async (req, res) => {
      produto_service.createProduto(req.body)
      .then(()=>{
        res.status(200).json({ message: 'produto criado com sucesso!'});
      }).catch((e)=>{
        res.status(500).json(e);
      })
  }

exports.selectAll= async (req, res) => {
  console.log("CONTROLER", req.query)
    try {
      res.status(200).json(await produto_service.findAllProduto(parseInt(req.query.size), parseInt(req.query.pagina), req.query.order, req.query.col));
    }
    catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Alguma coisa deu errado' });
    }
};

exports.selectById = async (req, res) => {
    console.log(req.params.id);
    //if (!(req.params.id && !(isNaN(req.params.id)))) {
    //  res.status(400).json({ message: 'formato inválido' });
    //  return;
    //}
    try {
      res.status(200).json(await produto_service.findProdutoById(req.params.id));
    }
    catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Alguma coisa deu errado' });
    }
  }

exports.put = (req, res, next)=>{
    const id = req.params.id;
    res.status(200).send(
        {
            id:id,
            item: req.body
        });
};

exports.updateById = async (req, res) => {
    if (!(req.params.id && !(isNaN(req.params.id)))) {
      res.status(400).json({ message: 'formato inválido' });
      return;
    }
    console.log("CONTROLLER", req.params);
    console.log("CONTROLLER", req.body);

    try {
      produto_service.updateProduto(req.params, req.body);
      res.status(200).json({ message: 'produto atualizado com sucesso!' });
    }
    catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Alguma coisa deu errado' });
    }
  }

  exports.deleteById = async (req, res) => {
    //if (!(req.params.id && !(isNaN(req.params.id)))) {
    //  res.status(400).json({ message: 'formato inválido' });
    //  return;
    //}
    try {
      await produto_service.deleteProdutoById(req.params.id);
      res.status(200).json({ message: 'produto deletado' });
    }
    catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Alguma coisa deu errado' });
    }
  }


