document.addEventListener('DOMContentLoaded', () => {
    // Variables
    let currentScene = 1;
    
    // Elementos DOM
    const btnStart = document.querySelector('.btn-start');
    const scenes = document.querySelectorAll('.scene');

    // Mensajes románticos
    const messages = [
        "Eres lo más bonito que me ha pasado",
        "Tu sonrisa ilumina mis días",
        "Contigo cada momento es mágico",
        "Como Rapunzel, iluminas mi mundo",
        "Eres mi princesa favorita"
    ];

    // Función para cambiar escenas
    function changeScene(from, to) {
        const currentScene = document.querySelector(`.scene.active`);
        if (currentScene) {
            currentScene.classList.remove('active');
        }

        const nextScene = document.querySelector(`#scene${to}`);
        if (nextScene) {
            nextScene.classList.add('active');
            initializeScene(to);
            document.dispatchEvent(new CustomEvent('sceneChange', { detail: { to: to } }));
        }
    }

    // Crear corazones
    function createHearts() {
        const container = document.querySelector('.hearts');
        if (!container) return;

        messages.forEach((message, index) => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = `<img src="assets/images/heart.svg" alt="heart">`;
            heart.style.animationDelay = `${index * 0.3}s`;
            
            heart.addEventListener('click', () => {
                showMessage(message);
                heart.style.transform = 'scale(0)';
                setTimeout(() => {
                    heart.remove();
                    if (container.children.length === 0) {
                        setTimeout(() => changeScene(2, 3), 1000);
                    }
                }, 500);
            });
            
            container.appendChild(heart);
        });
    }

    // Crear linternas
    function createLanterns() {
        const container = document.querySelector('.lanterns');
        if (!container) return;

        for(let i = 0; i < 6; i++) {
            const lantern = document.createElement('div');
            lantern.className = 'lantern';
            lantern.innerHTML = `<img src="assets/images/lantern.svg" alt="lantern">`;
            lantern.style.left = `${i * 20}%`;
            lantern.style.animationDelay = `${Math.random() * 2}s`;
            container.appendChild(lantern);
        }
        
        setTimeout(() => changeScene(3, 4), 5000);
    }

    // Mostrar mensaje flotante
    function showMessage(text) {
        const message = document.createElement('div');
        message.className = 'floating-message';
        message.textContent = text;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 2000);
    }

    // Configurar botones de "No"
    function setupNoButtons() {
        const noButtons = document.querySelectorAll('.btn-no, .btn-final-no');
        noButtons.forEach(btn => {
            btn.addEventListener('mouseover', (e) => {
                const x = Math.random() * (window.innerWidth - 100);
                const y = Math.random() * (window.innerHeight - 40);
                e.target.style.position = 'absolute';
                e.target.style.left = `${x}px`;
                e.target.style.top = `${y}px`;
            });
        });
    }

    // Inicializar escena
    function initializeScene(sceneNumber) {
        switch(sceneNumber) {
            case 2:
                createHearts();
                break;
            case 3:
                createLanterns();
                break;
            case 4:
                setupNoButtons();
                const btnYes = document.querySelector('#scene4 .btn-yes');
                if (btnYes) {
                    btnYes.addEventListener('click', () => {
                        showMessage("¡Ahora tengo una pregunta más para ti!");
                        setTimeout(() => changeScene(4, 5), 2000);
                    });
                }
                break;
            case 5:
                setupNoButtons();
                initializeValentineScene();
                const btnFinalYes = document.querySelector('.btn-valentine.yes');
                if (btnFinalYes) {
                    btnFinalYes.addEventListener('click', () => {
                        showMessage("¡Me haces la persona más feliz!");
                        setTimeout(() => changeScene(5, 6), 2000);
                        startCelebration();
                    });
                }
                break;
        }
    }

    // Celebración final
    function startCelebration() {
        const celebration = document.querySelector('.final-celebration');
        if (!celebration) return;

        // Crear linternas y corazones finales
        for(let i = 0; i < 20; i++) {
            if (i < 10) {
                const lantern = document.createElement('div');
                lantern.className = 'lantern finale';
                lantern.style.left = `${Math.random() * 100}%`;
                lantern.style.animationDelay = `${Math.random() * 2}s`;
                celebration.appendChild(lantern);
            }
            
            const heart = document.createElement('div');
            heart.className = 'floating-heart finale';
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.animationDelay = `${Math.random() * 3}s`;
            celebration.appendChild(heart);
        }
    }

    // Event Listeners iniciales
    if (btnStart) {
        btnStart.addEventListener('click', () => changeScene(1, 2));
    }

    // Asegurarse de que la primera escena esté activa
    const firstScene = document.querySelector('#scene1');
    if (firstScene && !firstScene.classList.contains('active')) {
        firstScene.classList.add('active');
    }

    function initializePascal() {
        const pascal = document.querySelector('.pascal-container');
        
        function updatePascal() {
            pascal.classList.add('walking');
            
            // Cambiar color según la escena
            const colors = ['#90EE90', '#FFB6C1', '#87CEEB', '#DDA0DD', '#FFD700'];
            const currentSceneNum = document.querySelector('.scene.active').id.replace('scene', '');
            const pascalImg = pascal.querySelector('.pascal');
            pascalImg.style.fill = colors[currentSceneNum - 1];
        }

        // Actualizar Pascal cada vez que cambia la escena
        document.addEventListener('sceneChange', updatePascal);
    }

    // Inicializar Pascal al cargar
    initializePascal();

    // Agregar a las funciones existentes
    function createStarryBackground() {
        const background = document.querySelector('.starry-background');
        for(let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            background.appendChild(star);
        }
    }

    // Llamar a la función al inicio
    createStarryBackground();

    // Agregar al JavaScript existente
    function createFloatingHearts() {
        const heartsContainer = document.createElement('div');
        heartsContainer.className = 'floating-hearts';
        document.body.appendChild(heartsContainer);

        // Crear corazones iniciales (efecto confeti)
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                
                // Posición inicial desde el sobre
                heart.style.left = `${30 + Math.random() * 40}%`;
                heart.style.top = `${40 + Math.random() * 20}%`;
                
                // Animación y estilo
                const duration = 3 + Math.random() * 2;
                const spread = Math.random() * 360;
                heart.style.animation = `floatHeart ${duration}s linear`;
                
                // Color aleatorio
                const hue = 340 + Math.random() * 30;
                const saturation = 70 + Math.random() * 30;
                const lightness = 70 + Math.random() * 20;
                heart.style.background = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
                
                // Tamaño aleatorio
                const size = 10 + Math.random() * 15;
                heart.style.width = `${size}px`;
                heart.style.height = `${size}px`;
                
                // Rotación aleatoria
                heart.style.transform = `rotate(${spread}deg)`;
                
                heartsContainer.appendChild(heart);
                
                heart.addEventListener('animationend', () => {
                    heart.remove();
                });
            }, i * 50); // Menor delay para efecto explosivo
        }

        // Limpiar después de la animación
        setTimeout(() => {
            if (document.body.contains(heartsContainer)) {
                heartsContainer.remove();
            }
        }, 5000);
    }

    function initializeValentineScene() {
        const envelopeWrapper = document.querySelector('.envelope-wrapper');
        const letterWrapper = document.querySelector('.letter-wrapper');
        const letter = document.querySelector('.letter');
        const valentineCard = document.querySelector('.valentine-card');
        const envelope = document.querySelector('.envelope');
        let isAnimating = false;

        envelope.addEventListener('click', function() {
            if (isAnimating) return;
            isAnimating = true;

            // Abrir sobre
            envelope.querySelector('.envelope-flap').style.transform = 'rotateX(180deg)';

            // Mostrar carta y corazones
            setTimeout(() => {
                envelopeWrapper.classList.add('back');
                letterWrapper.classList.add('show');
                valentineCard.style.display = 'block';
                createFloatingHearts(); // Crear corazones cuando se abre el sobre
            }, 400);

            // Animar carta
            setTimeout(() => {
                letter.classList.add('animate');
                valentineCard.style.opacity = '1';
            }, 600);

            // Mostrar contenido
            setTimeout(() => {
                valentineCard.classList.add('show');
                isAnimating = false;
            }, 1000);
        });
    }
}); 