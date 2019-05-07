const chai = require('chai');
const expect = chai.expect;

const app = require('../server/app');
const agent = require('supertest')(app);

const { Product, Category, ProductImage } = require('../server/db/models');

//Testing Model Validation
describe('Models', () => {
  describe('Product Model', () => {
    describe('Validations', () => {
      let product;
      before(() => {
        product = Product.build();
      });
      it('requiers `title`', async () => {
        try {
          await product.validate();
          throw Error(
            'validation was successful but should have failed without `title`'
          );
        } catch (err) {
          expect(err.message).to.contain('title cannot be null');
        }
      });
      it('requiers `description`', async () => {
        try {
          await product.validate();
          throw Error(
            'validation was successful but should have failed without `description`'
          );
        } catch (err) {
          expect(err.message).to.contain('description cannot be null');
        }
      });
      it('requiers `price`', async () => {
        try {
          await product.validate();
          throw Error(
            'validation was successful but should have failed without `price`'
          );
        } catch (err) {
          expect(err.message).to.contain('price cannot be null');
        }
      });
      it('requiers `quantity`', async () => {
        try {
          await product.validate();
          throw Error(
            'validation was successful but should have failed without `quantity`'
          );
        } catch (err) {
          expect(err.message).to.contain('quantity cannot be null');
        }
      });
      it('has defaultValue for `imageUrl`', async () => {
        product.title = 'test';
        product.description = 'test image';
        product.price = 1;
        product.quantity = 1;

        try {
          await product.save();
          expect(product.get().imageUrl).to.equal(
            'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjHk8nGxvDhAhVShuAKHUQ0Au0QjRx6BAgBEAU&url=https%3A%2F%2Fexcelequine.co.nz%2Fproduct-image-placeholder%2F&psig=AOvVaw2DsBJS8BfjB3cWmjz1mSUS&ust=1556464047119829'
          );
        } catch (err) {
          expect(err).to.not.exist();
        }
      });
      it('belongs to atleast one  `category`', async () => {
        await Category.create({
          id: 1,
          name: 'accessories',
          color: '01A4A4'
        });

        product.categoryId = 1;

        await product.save();
        const result = await product.getCategory();

        expect(result.get().id).to.equal(1);
      });
    });
  });

  describe('ProductImage Model', () => {
    let productimage;
    before(() => {
      productimage = ProductImage.build();
    });

    it('has defaultValue for `imageUrl`', async () => {
      try {
        await productimage.save();
        expect(productimage.get().imageUrl).to.equal(
          'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjHk8nGxvDhAhVShuAKHUQ0Au0QjRx6BAgBEAU&url=https%3A%2F%2Fexcelequine.co.nz%2Fproduct-image-placeholder%2F&psig=AOvVaw2DsBJS8BfjB3cWmjz1mSUS&ust=1556464047119829'
        );
      } catch (err) {
        expect(err).to.not.exist();
      }
    });
    it('imageUrl should be a string', () => {
      productimage.imageUrl =
        'https://images-na.ssl-images-amazon.com/images/I/71FhcNhKqhL._SX679_.jpg';
      const result = typeof productimage.imageUrl;
      expect(result).to.be.a('string');
    });
  });
});

describe('Routes', () => {
  describe('Product Routes', () => {
    it('GET `/api/products` servers up all products', async () => {
      await Category.create({
        id: 1,
        name: 'accessories',
        color: '01A4A4'
      });

      await Product.create({
        title: 'test',
        description: 'test get',
        price: 1,
        quantity: 1,
        categoryId: 1
      });

      await Product.create({
        title: 'test 2',
        description: 'test get 2',
        price: 1,
        quantity: 1,
        categoryId: 1
      });

      const response = await agent.get('/api/products').expect(200);
      expect(response.body).to.have.length(2);
    });
  });

  describe('ProductImage Routes', () => {
    it('GET `/api/products/productImages` servers all product images', async () => {
      await ProductImage.create({
        imageUrl:
          'https://images-na.ssl-images-amazon.com/images/I/81bc1cPg5OL._SX679_.jpg'
      });

      await ProductImage.create({
        imageUrl:
          'https://images-na.ssl-images-amazon.com/images/I/51HAxR5FAwL._SX679_.jpg'
      });

      const response = await agent
        .get('/api/products/productImages')
        .expect(200);
      expect(response.body).to.have.length(2);
    });
  });
});
