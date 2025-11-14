import request from 'supertest';
import app from './app.js'; 
import Product from './models/Products.js'; 

jest.mock('./models/Products.js', () => ({
    find: jest.fn(),
}));

describe('GET /products - Listar Productos', () => {

    const mockProducts = [
        { name: 'Silla Elegante', price: 1000, description: '...', stock: 10, images: ['url1'] },
        { name: 'Mesa de Centro', price: 500, description: '...', stock: 5, images: ['url2'] },
    ];

    test('Debe responder con status 200 y devolver la lista de productos', async () => {
        
        Product.find.mockResolvedValue(mockProducts);

        const response = await request(app)
            .get('/products') 
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toBeInstanceOf(Array); 
        expect(response.body.length).toBe(2);
        expect(response.body[0].name).toBe('Silla Elegante');
    });

    test('Debe responder con status 500 si hay un error en la base de datos', async () => {
        
        Product.find.mockRejectedValue(new Error('MongoDB connection failed'));

        const response = await request(app)
            .get('/products')
            .expect(500); 

        expect(response.text).toBe('Error fetching products');
    });
});