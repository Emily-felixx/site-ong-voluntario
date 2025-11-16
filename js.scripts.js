// ======================================================
// scripts.js
// Lógica de Interação: Menu Mobile, Máscaras e Formulário Dinâmico
// ======================================================

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 1. Lógica do Menu Mobile
    // ----------------------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            // Alterna a classe 'is-open' para mostrar ou esconder o menu
            mainNav.classList.toggle('is-open');

            // Alterna o atributo aria-expanded para acessibilidade
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }


    // ----------------------------------------------------
    // 2. Lógica das Máscaras de Formulário
    // ----------------------------------------------------
    
    // Função genérica para aplicar máscara
    const applyMask = (input, maskPattern) => {
        if (!input) return;
        
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
            let maskedValue = '';
            let k = 0;

            // Aplica a máscara, caractere por caractere
            for (let i = 0; i < maskPattern.length; i++) {
                if (k >= value.length) break;

                if (maskPattern[i] === '9') {
                    maskedValue += value[k++];
                } else {
                    maskedValue += maskPattern[i];
                }
            }

            e.target.value = maskedValue;
        });
    };

    // Aplicação das máscaras (se os elementos existirem)
    applyMask(document.getElementById('cpf'), '999.999.999-99');
    applyMask(document.getElementById('cep'), '99999-999');
    
    // Máscara de Telefone (lida com 8 ou 9 dígitos no meio)
    const telInput = document.getElementById('telefone');
    if (telInput) {
        telInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            let maskedValue = '';

            if (value.length > 2) {
                maskedValue += `(${value.substring(0, 2)}) `;
                
                if (value.length > 6) {
                    // Se tiver 9 dígitos no meio (celular)
                    if (value.length > 10) {
                        maskedValue += `${value.substring(2, 7)}-${value.substring(7, 11)}`;
                    } else {
                        // Se tiver 8 dígitos no meio (fixo)
                        maskedValue += `${value.substring(2, 6)}-${value.substring(6, 10)}`;
                    }
                } else {
                    maskedValue += value.substring(2, value.length);
                }
            } else {
                maskedValue = value;
            }

            e.target.value = maskedValue;
        });
    }

    // ----------------------------------------------------
    // 3. Lógica Dinâmica do Formulário (Apenas para cadastro.html)
    // ----------------------------------------------------
    const formElement = document.getElementById('main-form');
    if (formElement) {
        
        const urlParams = new URLSearchParams(window.location.search);
        const tipo = urlParams.get('tipo'); // 'voluntario' ou 'doador'
        
        const title = document.getElementById('form-title');
        const description = document.getElementById('form-description');
        const figureImage = document.getElementById('figure-image');
        const figureCaption = document.getElementById('figure-caption');
        const submitButton = document.getElementById('submit-button');
        
        const interessesContainer = document.getElementById('interesses-container');
        const doacaoContainer = document.getElementById('doacao-container');
        const dataNascimentoContainer = document.getElementById('data-nascimento-container');

        if (tipo === 'voluntario') {
            title.textContent = "Seja Nosso Voluntário!";
            description.textContent = "Junte-se a nós e dedique seu tempo e talento a causas que importam. Seu primeiro passo para a mudança começa aqui.";
            
            figureImage.src = "https://placehold.co/400x400/0056b3/ffffff?text=Mãos+Unidas";
            figureImage.alt = "Voluntários com as mãos unidas.";
            figureCaption.textContent = "O poder do trabalho em equipe transforma a realidade.";
            
            submitButton.textContent = "Quero Voluntariar";
            
            // Exibe campos específicos de Voluntário e esconde os de Doador
            interessesContainer.style.display = 'block';
            doacaoContainer.style.display = 'none';
            dataNascimentoContainer.style.display = 'block'; // Data Nascimento é obrigatória para Voluntário (idade legal)

            // Requer o campo de interesses
            interessesContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.setAttribute('required', 'required'); // Simulação de requisito: pelo menos 1
            });
            
        } else if (tipo === 'doador') {
            title.textContent = "Apoie Nossa Causa!";
            description.textContent = "Sua doação (financeira ou material) é o combustível que nos permite manter os projetos ativos. Toda ajuda faz a diferença.";
            
            figureImage.src = "https://placehold.co/400x400/ffc107/343a40?text=Doação+Mãos+Coracao";
            figureImage.alt = "Mãos oferecendo um coração.";
            figureCaption.textContent = "Doe com o coração e ajude-nos a alcançar mais famílias.";
            
            submitButton.textContent = "Efetuar Cadastro de Apoio";
            
            // Exibe campos específicos de Doador e esconde os de Voluntário
            interessesContainer.style.display = 'none';
            doacaoContainer.style.display = 'block';
            dataNascimentoContainer.style.display = 'none'; // Data Nascimento não é estritamente necessária para Doação
            
            // Remove o requisito de campos específicos de Voluntário
            interessesContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.removeAttribute('required');
            });

        } else {
            // Caso padrão (se o usuário acessar a URL sem ?tipo=...)
            title.textContent = "Complete Seu Cadastro";
            description.textContent = "Por favor, selecione no menu 'Como Ajudar' se você deseja ser Voluntário ou Doador para ver o formulário correto.";
            
            // Esconde todos os campos específicos
            interessesContainer.style.display = 'none';
            doacaoContainer.style.display = 'none';
            dataNascimentoContainer.style.display = 'none';
        }
        
        // ----------------------------------------------------
        // 4. Lógica de Submissão (Simulada)
        // ----------------------------------------------------
        formElement.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const feedback = document.getElementById('submission-feedback');
            
            // Apenas para simular o envio, exibimos uma mensagem de sucesso
            feedback.style.display = 'block';
            feedback.textContent = tipo === 'voluntario' 
                ? "🎉 Cadastro de Voluntário enviado com sucesso! Entraremos em contato em breve."
                : "🙌 Cadastro de Doador enviado com sucesso! Agradecemos o seu apoio e entraremos em contato para combinar os detalhes.";

            // Desativa o botão temporariamente
            submitButton.disabled = true;
            
            // Limpa a mensagem e reabilita o botão após 5 segundos
            setTimeout(() => {
                feedback.style.display = 'none';
                feedback.textContent = '';
                submitButton.disabled = false;
                formElement.reset(); // Limpa o formulário após o sucesso
            }, 5000);
        });

    } // Fim da lógica do formulário dinâmico

});
