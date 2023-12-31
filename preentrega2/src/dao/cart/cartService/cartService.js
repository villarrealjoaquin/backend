const CartService = require('../cartService/cartService');

class CartController {

  async getAllCarts(req, res) {
    try {
      const carts = await CartService.getAllCarts();

      res.json(carts)
    } catch (error) {
      res.status(500).send('Error al obtener los carritos.');
    }
  }


  async createCart(req, res) {
    try {
      const { products } = req.body;

      const newCart = await CartService.createCart(products);

      res.json(newCart);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear carrito' });
    }
  }

  async products(req, res) {
    try {
      const cartId = parseInt(req.params.cid);

      const products = await CartService.getProducts(cartId);

      res.json(products);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async addProduct(req, res) {
    try {
      const cartId = parseInt(req.params.cid);
      const productId = req.params.pid;

      const cart = await CartService.addProduct(cartId, productId);

      if (cart) {
        res.status(200).json({ message: 'Producto subido exitosamente!' });
      } else {
        res.status(500).json({ error: 'Error al subir el producto' });
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async deleteProductFromCart(req, res) {
    try {
      const cartId = parseInt(req.params.cid);
      const productId = parseInt(req.params.pid);

      await CartService.deleteProduct(cartId, productId);

      res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  }

  async deleteProductsFromCart(req, res) {
    try {
      const cartId = parseInt(req.params.cid);

      await CartService.deleteProductsFromCart(cartId);

      res.status(200).json({ message: 'Productos eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  }

  async updateProductsInCart(req, res) {
    try {
      const cartId = parseInt(req.params.cid);
      const { newProducts } = req.body;

      const cart = await CartService.updateProducts(cartId, newProducts);

      const totalPages = 1;
      const prevPage = null;
      const nextPage = null;
      const page = 1;
      const hasPrevPage = false;
      const hasNextPage = false;
      const prevLink = null;
      const nextLink = null;

      const response = {
        status: 'success',
        payload: cart,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink
      };

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ status: 'error', message: `${error}` });
    }
  }

  async updateProductsQuantity(req, res) {
    try {
      const cartId = parseInt(req.params.cid);
      const productId = parseInt(req.params.pid);
      const { quantity } = req.body;

      const cart = await CartService.updateProductsQuantity(cartId, productId, quantity);

      res.status(200).json({ message: 'Cantidad de producto actualizada exitosamente', cart });
    } catch (error) {
      res.status(500).json({ error: `${error}` });
    }
  }

}

module.exports = new CartController();