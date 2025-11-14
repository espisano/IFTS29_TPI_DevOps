import React, { useState } from "react";
import emailjs from 'emailjs-com'; 
import Modal from 'react-bootstrap/Modal'; 
import Button from 'react-bootstrap/Button'; 
import "./ContactPage.css";
import { FaWhatsapp } from "react-icons/fa";

const CONTACT_SERVICE_ID = 'service_xhegdmm'; 
const CONTACT_TEMPLATE_ID = 'template_6ct9nt7'; 
const CONTACT_PUBLIC_KEY = 'SActIF6YHXjKQTXrT'; 

const ContactPage = () => {
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    
    const [alertModal, setAlertModal] = useState({ show: false, title: '', body: '', variant: '' }); 
    const handleCloseAlert = () => setAlertModal({ ...alertModal, show: false });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const templateParams = {
            name: formData.name,
            email: formData.email, 
            phone: formData.phone, 
            message: formData.message,
            time: new Date().toLocaleTimeString(), 
        };
        
        try {
            const result = await emailjs.send(
                CONTACT_SERVICE_ID, 
                CONTACT_TEMPLATE_ID, 
                templateParams, 
                CONTACT_PUBLIC_KEY
            );

            if (result.status === 200) {
                setAlertModal({
                    show: true,
                    title: '🎉 ¡Mensaje Enviado!',
                    body: 'Tu consulta ha sido enviada con éxito. Te responderemos a la brevedad.',
                    variant: 'success'
                });
                setFormData({ name: '', email: '', phone: '', message: '' }); 
            } else {
                 throw new Error(`Error en el servicio de EmailJS. Código: ${result.status}`);
            }

        } catch (error) {
            console.error("Error al enviar el mensaje por EmailJS:", error);
            setAlertModal({
                show: true,
                title: '❌ Error de Envío',
                body: `Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.`,
                variant: 'danger'
            });
        }
    };

    return (
        <>
            <div className="contact-container">
                <div className="contact-info">
                    <h2> Contacto </h2>
                    <p>
                        Para una pronta comunicación personalizada, podés contactarnos de lunes a sábados de 10:00 a 18:00 horas por los siguientes canales de atención:
                    </p>
                    <ul>
                        <li>
                            <FaWhatsapp style={{ color: "#25D366", fontSize: "1.2em", verticalAlign: "middle" }} />
                            {" "}Por WhatsApp al +54 11 8888 8888</li>
                        <li>📞 Por Teléfono al 11 4 999 9999</li>
                        <li>✉️ Por e-mail llenando el formulario</li>
                    </ul>
                    <div className="contact-map">
                        <h5> Visitanos </h5>
                        <iframe 
                            title="Ubicación Muebles del Valle"
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d222.52587009030162!2d-65.21126948070025!3d-26.82678404282667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1760305444600!5m2!1ses-419!2sar" 
                            width="100%" 
                            height="250" 
                            style={{ border: 0, borderRadius: "8px", marginTop: "1.5rem" }} 
                            allowfullscreen="" 
                            loading="lazy" 
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
                
                <form className="contact-form" onSubmit={handleSubmit}>
                    <label>
                        <span>
                            Nombre <span className="required">*</span>
                        </span>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nombre y Apellido (*)" 
                            required 
                        />
                    </label>
                    <label>
                        <span>
                            E-mail <span className="required">*</span>
                        </span>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email (*)" 
                            required 
                        />
                    </label>
                    <label>
                        <span>
                            Teléfono <span className="required">*</span>
                        </span>
                        <input 
                            type="tel" 
                            name="phone" 
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Teléfono (*)" 
                            required 
                        />
                    </label>
                    <label>
                        <span>
                            Mensaje <span className="required">*</span>
                        </span>
                        <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Mensaje (*)" 
                            required 
                        />
                    </label>
                    <button type="submit">Enviar</button>
                </form>
            </div>
            
            <Modal show={alertModal.show} onHide={handleCloseAlert} centered>
                <Modal.Header closeButton>
                    <Modal.Title className={alertModal.variant === 'success' ? 'text-success' : 'text-danger'}>
                        {alertModal.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {alertModal.body}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAlert}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ContactPage;