import { render, screen, fireEvent } from '@testing-library/react';
import MyNavbar from '../navbar/Navbar.jsx'; // Ajusta la ruta
import '@testing-library/jest-dom';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate, // Simula el hook useNavigate
    Link: ({ to, children }) => <a href={to}>{children}</a>, // Simula el componente Link
}));

describe('MyNavbar - Search Interaction', () => {

    const mockProps = {
        setSearchTerm: jest.fn(),
        cartItems: [],
    };

    test('Debe llamar a navigate con "/productos" al hacer clic en el icono de búsqueda', () => {
        render(<MyNavbar {...mockProps} />);

        const searchIconElement = screen.getByTestId('search-icon'); 

        fireEvent.click(searchIconElement);

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('/productos');
    });
});