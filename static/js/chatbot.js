// Chatbot Flotante para Seguros La Victoria
class ChatbotSeguros {
    constructor() {
        this.isOpen = false;
        this.currentStep = 'inicio';
        this.userInfo = {};
        this.init();
    }

    init() {
        this.createChatWidget();
        this.bindEvents();
        this.showWelcomeMessage();
    }

    createChatWidget() {
        const chatHTML = `
            <!-- Botón flotante del chat -->
            <div id="chatbot-button" class="chatbot-button">
                <i class="fas fa-comments"></i>
                <span class="chat-notification">¡Hola! ¿Te ayudo?</span>
            </div>

            <!-- Ventana del chat -->
            <div id="chatbot-window" class="chatbot-window">
                <div class="chatbot-header">
                    <div class="d-flex align-items-center">
                        <img src="/static/img/logoseguros.png" alt="Seguros La Victoria" class="chatbot-logo">
                        <div>
                            <h6 class="mb-0">Asistente Virtual</h6>
                            <small class="text-muted">Seguros La Victoria</small>
                        </div>
                    </div>
                    <button id="chatbot-close" class="btn-close"></button>
                </div>
                
                <div id="chatbot-messages" class="chatbot-messages">
                    <!-- Los mensajes se agregan aquí dinámicamente -->
                </div>
                
                <div class="chatbot-input">
                    <div id="chatbot-options" class="chatbot-options">
                        <!-- Las opciones se agregan aquí dinámicamente -->
                    </div>
                    <div class="chatbot-typing">
                        <input type="text" id="chatbot-text-input" placeholder="Escribe tu mensaje..." style="display: none;">
                        <button id="chatbot-send" class="btn btn-primary btn-sm" style="display: none;">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);
        this.addChatStyles();
    }

    addChatStyles() {
        const styles = `
            <style>
                .chatbot-button {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(13, 110, 253, 0.3);
                    transition: all 0.3s ease;
                    z-index: 1000;
                    animation: pulse 2s infinite;
                }

                .chatbot-button:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 25px rgba(13, 110, 253, 0.4);
                }

                .chat-notification {
                    position: absolute;
                    right: 70px;
                    background: white;
                    color: #333;
                    padding: 8px 12px;
                    border-radius: 20px;
                    font-size: 14px;
                    white-space: nowrap;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    animation: slideIn 0.5s ease;
                }

                .chat-notification::after {
                    content: '';
                    position: absolute;
                    right: -8px;
                    top: 50%;
                    transform: translateY(-50%);
                    border: 8px solid transparent;
                    border-left-color: white;
                }

                @keyframes pulse {
                    0% { box-shadow: 0 4px 20px rgba(13, 110, 253, 0.3); }
                    50% { box-shadow: 0 4px 20px rgba(13, 110, 253, 0.6); }
                    100% { box-shadow: 0 4px 20px rgba(13, 110, 253, 0.3); }
                }

                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                .chatbot-window {
                    position: fixed;
                    bottom: 90px;
                    right: 20px;
                    width: 350px;
                    height: 500px;
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.15);
                    display: none;
                    flex-direction: column;
                    z-index: 1001;
                    overflow: hidden;
                }

                .chatbot-header {
                    background: linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%);
                    color: white;
                    padding: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .chatbot-logo {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 10px;
                    background: white;
                    padding: 5px;
                }

                .chatbot-messages {
                    flex: 1;
                    padding: 15px;
                    overflow-y: auto;
                    background: #f8f9fa;
                }

                .message {
                    margin-bottom: 15px;
                    animation: fadeInUp 0.3s ease;
                }

                .message.bot {
                    text-align: left;
                }

                .message.user {
                    text-align: right;
                }

                .message-bubble {
                    display: inline-block;
                    max-width: 80%;
                    padding: 10px 15px;
                    border-radius: 18px;
                    font-size: 14px;
                    line-height: 1.4;
                }

                .message.bot .message-bubble {
                    background: white;
                    color: #333;
                    border-bottom-left-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }

                .message.user .message-bubble {
                    background: #0d6efd;
                    color: white;
                    border-bottom-right-radius: 5px;
                }

                .chatbot-options {
                    padding: 10px 15px;
                    background: white;
                    border-top: 1px solid #eee;
                }

                .option-button {
                    display: block;
                    width: 100%;
                    margin-bottom: 8px;
                    padding: 10px 15px;
                    background: #f8f9fa;
                    border: 1px solid #dee2e6;
                    border-radius: 20px;
                    color: #495057;
                    text-align: left;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 14px;
                }

                .option-button:hover {
                    background: #0d6efd;
                    color: white;
                    border-color: #0d6efd;
                }

                .chatbot-typing {
                    display: flex;
                    padding: 10px 15px;
                    background: white;
                    border-top: 1px solid #eee;
                }

                #chatbot-text-input {
                    flex: 1;
                    border: 1px solid #dee2e6;
                    border-radius: 20px;
                    padding: 8px 15px;
                    margin-right: 10px;
                    outline: none;
                }

                .typing-indicator {
                    display: flex;
                    align-items: center;
                    color: #6c757d;
                    font-style: italic;
                    font-size: 13px;
                }

                .typing-dots {
                    display: inline-block;
                    margin-left: 5px;
                }

                .typing-dots span {
                    display: inline-block;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background: #6c757d;
                    margin: 0 1px;
                    animation: typing 1.4s infinite;
                }

                .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
                .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

                @keyframes typing {
                    0%, 60%, 100% { transform: translateY(0); }
                    30% { transform: translateY(-10px); }
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 768px) {
                    .chatbot-window {
                        width: 90vw;
                        height: 70vh;
                        right: 5vw;
                        bottom: 90px;
                    }
                    
                    .chat-notification {
                        display: none;
                    }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', styles);
    }

    bindEvents() {
        const button = document.getElementById('chatbot-button');
        const closeBtn = document.getElementById('chatbot-close');
        const textInput = document.getElementById('chatbot-text-input');
        const sendBtn = document.getElementById('chatbot-send');

        button.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.closeChat());
        
        textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        sendBtn.addEventListener('click', () => this.sendMessage());

        // Ocultar notificación después de 5 segundos
        setTimeout(() => {
            const notification = document.querySelector('.chat-notification');
            if (notification) notification.style.display = 'none';
        }, 5000);
    }

    toggleChat() {
        const window = document.getElementById('chatbot-window');
        const button = document.getElementById('chatbot-button');
        
        if (this.isOpen) {
            this.closeChat();
        } else {
            window.style.display = 'flex';
            button.style.display = 'none';
            this.isOpen = true;
        }
    }

    closeChat() {
        const window = document.getElementById('chatbot-window');
        const button = document.getElementById('chatbot-button');
        
        window.style.display = 'none';
        button.style.display = 'flex';
        this.isOpen = false;
    }

    addMessage(text, isBot = true, delay = 0) {
        setTimeout(() => {
            const messagesContainer = document.getElementById('chatbot-messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isBot ? 'bot' : 'user'}`;
            
            messageDiv.innerHTML = `
                <div class="message-bubble">
                    ${text}
                </div>
            `;
            
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, delay);
    }

    showTyping() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="message-bubble">
                Escribiendo<span class="typing-dots">
                    <span></span><span></span><span></span>
                </span>
            </div>
        `;
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    showOptions(options) {
        const optionsContainer = document.getElementById('chatbot-options');
        optionsContainer.innerHTML = '';
        
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = option.text;
            button.addEventListener('click', () => {
                this.addMessage(option.text, false);
                option.action();
            });
            optionsContainer.appendChild(button);
        });
    }

    showWelcomeMessage() {
        setTimeout(() => {
            this.addMessage('¡Hola! 👋 Soy el asistente virtual de Seguros La Victoria.');
            this.addMessage('¿En qué puedo ayudarte hoy?', true, 1000);
            
            setTimeout(() => {
                this.showMainMenu();
            }, 2000);
        }, 500);
    }

    showMainMenu() {
        const options = [
            {
                text: '🛡️ Ver todos los seguros',
                action: () => this.showServiciosMenu()
            },
            {
                text: '💰 Cotizar seguro',
                action: () => this.startCotizacion()
            },
            {
                text: '📞 Contactar asesor',
                action: () => this.showContactInfo()
            },
            {
                text: '❓ Preguntas frecuentes',
                action: () => this.showFAQ()
            },
            {
                text: '🏢 Sobre nosotros',
                action: () => this.showAboutInfo()
            }
        ];
        
        this.showOptions(options);
    }

    showServiciosMenu() {
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            this.addMessage('Estos son nuestros principales seguros:');
            
            const servicios = [
                {
                    text: '🚗 Seguro de Automóviles',
                    action: () => this.showServiceInfo('auto')
                },
                {
                    text: '🏠 Seguro de Hogar',
                    action: () => this.showServiceInfo('hogar')
                },
                {
                    text: '❤️ Seguro de Vida',
                    action: () => this.showServiceInfo('vida')
                },
                {
                    text: '🏥 Seguro de Salud',
                    action: () => this.showServiceInfo('salud')
                },
                {
                    text: '🚛 SOAT',
                    action: () => this.showServiceInfo('soat')
                },
                {
                    text: '🔙 Volver al menú principal',
                    action: () => this.showMainMenu()
                }
            ];
            
            this.showOptions(servicios);
        }, 1500);
    }

    showServiceInfo(tipo) {
        const serviciosInfo = {
            auto: {
                title: '🚗 Seguro de Automóviles',
                description: 'Protección completa para tu vehículo con cobertura todo riesgo, responsabilidad civil y asistencia vial 24/7.',
                benefits: ['Cobertura todo riesgo', 'Asistencia vial 24/7', 'Vehículo de reemplazo', 'Red de talleres especializados']
            },
            hogar: {
                title: '🏠 Seguro de Hogar',
                description: 'Protege tu patrimonio familiar contra incendio, terremoto, hurto y más.',
                benefits: ['Protección contra incendio', 'Cobertura por terremoto', 'Seguro contra hurto', 'Asistencia domiciliaria 24h']
            },
            vida: {
                title: '❤️ Seguro de Vida',
                description: 'Protección integral para ti y tu familia con cobertura por muerte e invalidez.',
                benefits: ['Muerte natural y accidental', 'Invalidez permanente', 'Asistencia médica 24/7', 'Gastos funerarios']
            },
            salud: {
                title: '🏥 Seguro de Salud',
                description: 'Medicina prepagada con la mejor red médica del país.',
                benefits: ['Red médica nacional', 'Cobertura internacional', 'Especialistas', 'Sin límites en medicamentos']
            },
            soat: {
                title: '🚛 SOAT',
                description: 'Seguro Obligatorio de Accidentes de Tránsito requerido por ley.',
                benefits: ['Obligatorio por ley', 'Atención médica inmediata', 'Gastos funerarios', 'Indemnizaciones']
            }
        };

        const info = serviciosInfo[tipo];
        
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            this.addMessage(`<strong>${info.title}</strong><br><br>${info.description}<br><br><strong>Beneficios:</strong><br>• ${info.benefits.join('<br>• ')}`);
            
            const options = [
                {
                    text: '💰 Cotizar este seguro',
                    action: () => this.startCotizacion(tipo)
                },
                {
                    text: '📞 Hablar con asesor',
                    action: () => this.contactWhatsApp(`Hola, me interesa el ${info.title}`)
                },
                {
                    text: '🔙 Ver otros seguros',
                    action: () => this.showServiciosMenu()
                }
            ];
            
            this.showOptions(options);
        }, 2000);
    }

    startCotizacion(tipo = null) {
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            this.addMessage('Para brindarte la mejor cotización, necesito algunos datos básicos.');
            
            const options = [
                {
                    text: '📱 Cotizar por WhatsApp',
                    action: () => this.contactWhatsApp('Hola, quiero cotizar un seguro')
                },
                {
                    text: '📞 Llamar ahora',
                    action: () => this.callNow()
                },
                {
                    text: '📧 Enviar información por email',
                    action: () => this.showContactForm()
                },
                {
                    text: '🔙 Volver al menú',
                    action: () => this.showMainMenu()
                }
            ];
            
            this.showOptions(options);
        }, 1500);
    }

    showContactInfo() {
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            this.addMessage(`<strong>📞 Contacta con nosotros:</strong><br><br>
                <strong>Teléfonos:</strong><br>
                • +57 313 212 5646<br>
                • +57 310 763 8963<br><br>
                <strong>📧 Email:</strong><br>
                gerencia@seguroslavictoria.com<br><br>
                <strong>📍 Dirección:</strong><br>
                Calle 33a #38-23, Barzal<br>
                Villavicencio, Meta<br><br>
                <strong>🕒 Horarios:</strong><br>
                Lun - Vie: 7:00 AM - 5:00 PM`);
            
            const options = [
                {
                    text: '📱 WhatsApp',
                    action: () => this.contactWhatsApp('Hola, necesito información')
                },
                {
                    text: '📞 Llamar ahora',
                    action: () => this.callNow()
                },
                {
                    text: '🔙 Volver al menú',
                    action: () => this.showMainMenu()
                }
            ];
            
            this.showOptions(options);
        }, 1500);
    }

    showFAQ() {
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            this.addMessage('Estas son las preguntas más frecuentes:');
            
            const faqs = [
                {
                    text: '¿Cómo hago un reclamo?',
                    action: () => this.showFAQAnswer('reclamo')
                },
                {
                    text: '¿Cuánto tiempo toma una cotización?',
                    action: () => this.showFAQAnswer('cotizacion')
                },
                {
                    text: '¿Qué documentos necesito?',
                    action: () => this.showFAQAnswer('documentos')
                },
                {
                    text: '¿Tienen cobertura nacional?',
                    action: () => this.showFAQAnswer('cobertura')
                },
                {
                    text: '🔙 Volver al menú',
                    action: () => this.showMainMenu()
                }
            ];
            
            this.showOptions(faqs);
        }, 1500);
    }

    showFAQAnswer(tipo) {
        const answers = {
            reclamo: 'Para hacer un reclamo: 1) Comunícate inmediatamente al 313 212 5646, 2) Proporciona tu número de póliza, 3) Describe el siniestro, 4) Sigue las instrucciones de nuestro asesor.',
            cotizacion: 'Las cotizaciones las realizamos en tiempo real. Por WhatsApp o teléfono obtienes tu cotización en menos de 15 minutos.',
            documentos: 'Documentos básicos: Cédula, RUT (para empresas), información del bien a asegurar. Documentos específicos según el tipo de seguro.',
            cobertura: 'Sí, tenemos cobertura en todo el territorio nacional con una amplia red de proveedores y talleres especializados.'
        };

        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            this.addMessage(answers[tipo]);
            
            const options = [
                {
                    text: '❓ Otra pregunta',
                    action: () => this.showFAQ()
                },
                {
                    text: '📞 Hablar con asesor',
                    action: () => this.contactWhatsApp('Hola, tengo una consulta')
                },
                {
                    text: '🔙 Menú principal',
                    action: () => this.showMainMenu()
                }
            ];
            
            this.showOptions(options);
        }, 2000);
    }

    showAboutInfo() {
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            this.addMessage(`<strong>🏢 Seguros La Victoria LTDA</strong><br><br>
                Con <strong>35 años de experiencia</strong> en el sector asegurador, somos una empresa especializada en la comercialización y administración de seguros.<br><br>
                <strong>🎯 Nuestra Misión:</strong><br>
                Garantizar protección integral a personas y empresas con excelente servicio y cumplimiento de compromisos.<br><br>
                <strong>🔮 Nuestra Visión:</strong><br>
                Ser la empresa líder en el Meta, reconocida por nuestra seriedad, puntualidad y personal calificado.`);
            
            const options = [
                {
                    text: '🛡️ Ver nuestros seguros',
                    action: () => this.showServiciosMenu()
                },
                {
                    text: '📞 Contactar',
                    action: () => this.showContactInfo()
                },
                {
                    text: '🔙 Menú principal',
                    action: () => this.showMainMenu()
                }
            ];
            
            this.showOptions(options);
        }, 2000);
    }

    contactWhatsApp(message) {
        const whatsappUrl = `https://wa.me/573132125646?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        this.addMessage('Te estoy redirigiendo a WhatsApp para continuar la conversación con un asesor humano. 😊');
    }

    callNow() {
        window.location.href = 'tel:+573132125646';
        this.addMessage('Iniciando llamada... 📞');
    }

    showContactForm() {
        this.addMessage('Te redirijo al formulario de contacto para que puedas enviar tu consulta.');
        setTimeout(() => {
            window.location.href = '/contact/';
        }, 1000);
    }
}

// Inicializar el chatbot cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    new ChatbotSeguros();
});
