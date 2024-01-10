const router = require('express').Router();
const { PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/products', async (req, res, next) => {
  try{
    const products = await prisma.product.findMany({})
    res.json(products)
  } catch (error) {
    next(error)
  }
 
});

router.get('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await prisma.product.findUnique({
      where:{
        id:Number(id)
      }
    })
    res.json(product)
  } catch (error) {
    
  }
});

router.post('/products/', async (req, res, next) => {
try {
   const productCreated = await prisma.product.create({
    data: req.body,
   })
        res.json(productCreated);
} catch (error) {
  next(error)

}

});

router.delete('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await prisma.product.delete({
      where: {
        id:Number(id)
      }
    })
    res.json(product);
  } catch (error) {
    next(error)

  }
});

router.patch('/products/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const product = await prisma.product.update({
      where:{
        id: Number(id),
      },
      data:req.body
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
});


module.exports = router;
