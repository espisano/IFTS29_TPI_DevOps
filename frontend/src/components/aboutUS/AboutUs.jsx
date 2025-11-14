import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './AboutUs.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import imgEmpresa from '../../assets/quienes_somos_1.jpg';
import imgMision from '../../assets/quienes_somos_2.jpg';
import imgVision from '../../assets/quienes_somos_3.jpg';

const About = () => {
    
  const sections = [
    { 
      title: 'Misión', 
      icon: 'bi-gem', 
      text: 'Diseñar y fabricar muebles de autor exclusivos que equilibren la vanguardia estética con la funcionalidad práctica. Nuestra misión es dotar a los espacios de nuestros clientes con piezas de arte tangible, creadas con la más alta calidad y conciencia de diseño, asegurando una experiencia de compra transparente y un producto de herencia.',
    },
    { 
      title: 'Visión', 
      icon: 'bi-lightbulb', 
      text: 'Ser la marca líder y referente en el mercado latinoamericano de muebles de diseño. Buscamos ser reconocidos por nuestra capacidad de innovación, la sostenibilidad de nuestros procesos y por fomentar una cultura donde el diseño de mobiliario sea valorado como una expresión artística esencial del hábitat moderno.',
    },
    { 
      title: 'Valores', 
      icon: 'bi-hand-thumbs-up', 
      text: 'Nuestro trabajo se rige por tres pilares inquebrantables. El primero es la Artesanía y Calidad, un compromiso absoluto con la excelencia en la mano de obra, seleccionando materiales nobles que aseguren la durabilidad y la distinción de cada pieza. El segundo es la Exclusividad en el Diseño, que nos impulsa a la constante innovación y a la creación de muebles de autor con un carácter inconfundible. Finalmente, la Transparencia y Pasión define nuestra relación con el cliente y nuestro oficio, garantizando honestidad en nuestros procesos y la emoción que ponemos en cada curva, ensamblaje y detalle final.',
    },
  ];

  const images = [imgEmpresa, imgMision, imgVision];

  return (
    <Container className="about-page-container my-5">
      <h1 className="display-6 mb-5 text-center">QUIENES SOMOS</h1>
      
      <Row>
        <Col xs={12} lg={8} className="about-text-column pe-lg-5">
          
          <section className="mb-5">
            <h2 className="section-subtitle">Nuestra Empresa</h2>
            <p>
              En Muebles Del Valle, transformamos espacios con piezas que cuentan una historia. Fundada bajo la creencia de que el mobiliario debe ser una extensión de la personalidad, nos dedicamos a la creación artesanal de muebles de autor. Cada mesa, silla o sofá que sale de nuestro taller es una obra única, pensada para trascender lo funcional y convertirse en el corazón estético de su hogar. Nuestro equipo está compuesto por diseñadores, arquitectos y ebanistas que comparten una pasión innegable: la búsqueda de la belleza a través de la simpleza morfológica y la calidad impecable. Nos distinguimos por la selección rigurosa de materiales nobles, la atención al detalle en cada curva y ensamblaje, y la promesa de llevar a nuestros clientes diseños atemporales, lejos de las tendencias efímeras.
            </p>
          </section>

          {sections.map((section, index) => (
            <section key={index} className="mb-4">
              <h3 className="section-heading">
                <i className={`${section.icon} me-2`}></i>
                {section.title}
              </h3>
              <p>{section.text}</p>
            </section>
          ))}

        </Col>

        <Col xs={12} lg={4} className="about-image-column mt-4 mt-lg-0 d-flex flex-column gap-4">
          {images.map((imageSrc, index) => (
            <div key={index} className="image-wrapper">
              <img 
                src={imageSrc} 
                alt={`Imagen de ${sections[index] ? sections[index].title : 'la empresa'}`} 
                className="img-fluid rounded shadow-sm"
              />
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default About;