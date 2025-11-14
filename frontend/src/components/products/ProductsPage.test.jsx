import { render, screen } from '@testing-library/react';
import ProductsPage from '../products/ProductsPage.jsx'; 
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';

const mockProducts = [
    { _id: '1', name: 'Cómoda Lujo', price: 1000, images: ['url_valida'] }, 
    { _id: '2', name: 'Sillón Clásico', price: 2000, images: ['url_valida'] },
    { _id: '3', name: 'Mesa de PINo', price: 3000, images: ['url_valida'] }, 
];

const renderWithRouter = (ui) => {
    return render(<Router>{ui}</Router>);
};


describe('ProductsPage - Filtering Logic', () => {

    test('Debe encontrar "Cómoda" al buscar "comoda" (insensible a acentos)', () => {
        const searchTerm = "comoda";

        renderWithRouter(
            <ProductsPage 
                products={mockProducts} 
                loading={false} 
                searchTerm={searchTerm} 
            />
        );
        
        expect(screen.getByText(/Cómoda Lujo/i)).toBeInTheDocument();
        expect(screen.queryByText(/Sillón Clásico/i)).not.toBeInTheDocument();
    });

    test('Debe encontrar "PINo" al buscar "pino" (insensible a mayúsculas)', () => {
        const searchTerm = "pino";

        renderWithRouter(
            <ProductsPage 
                products={mockProducts} 
                loading={false} 
                searchTerm={searchTerm} 
            />
        );

        expect(screen.getByText(/Mesa de PINo/i)).toBeInTheDocument();
    });
});