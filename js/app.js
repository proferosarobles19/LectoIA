/* ESTADO DEL JUEGO */
let gameVars = {
  stars: 0,
  currentLevel: 'easy',
  currentStory: null,
  currentStage: 'setup', // setup, reading, quiz, wordbuilder, reflection, results
  timerInterval: null,
  timeLeft: 60,
  totalTime: 60,
  currentQuizIndex: 0,
  correctAnswersCount: 0,
  // Variables para el módulo Armar Palabras
  shuffledWordLetters: [],
  userWordLetters: [],
  wordBuilderSuccess: false
};

// Cambiar entre pestañas (Juego y Ficha Pedagógica)
function switchTab(tab) {
  playBeep('click');
  const gameBtn = document.getElementById('btn-tab-game');
  const fichaBtn = document.getElementById('btn-tab-ficha');
  const gameSec = document.getElementById('section-game');
  const fichaSec = document.getElementById('section-ficha');

  if (tab === 'game') {
    gameBtn.classList.add('bg-white', 'text-blue-600', 'shadow-md');
    gameBtn.classList.remove('hover:bg-white/10', 'text-white');
    fichaBtn.classList.remove('bg-white', 'text-blue-600', 'shadow-md');
    fichaBtn.classList.add('hover:bg-white/10', 'text-white');
    
    gameSec.classList.remove('hidden');
    fichaSec.classList.add('hidden');
  } else {
    fichaBtn.classList.add('bg-white', 'text-blue-600', 'shadow-md');
    fichaBtn.classList.remove('hover:bg-white/10', 'text-white');
    gameBtn.classList.remove('bg-white', 'text-blue-600', 'shadow-md');
    gameBtn.classList.add('hover:bg-white/10', 'text-white');

    fichaSec.classList.remove('hidden');
    gameSec.classList.add('hidden');
  }
}

// Cambiar de fase dentro del juego
function showGameStage(stageId) {
  gameVars.currentStage = stageId;
  document.getElementById('stage-setup').classList.add('hidden');
  document.getElementById('stage-reading').classList.add('hidden');
  document.getElementById('stage-quiz').classList.add('hidden');
  document.getElementById('stage-wordbuilder').classList.add('hidden');
  document.getElementById('stage-reflection').classList.add('hidden');
  document.getElementById('stage-results').classList.add('hidden');

  document.getElementById(`stage-${stageId}`).classList.remove('hidden');
}

// Selección de nivel
function selectLevel(level) {
  playBeep('click');
  document.getElementById('section-game').classList.remove('hidden');
  gameVars.currentLevel = level;
  
  // Cambiar temporizador según el nivel elegido
  if (level === 'easy') {
    gameVars.timeLeft = 60;
    document.getElementById('game-mascot').textContent = '🐢';
    document.getElementById('game-level-title').textContent = 'Nivel Fácil (Tortuga)';
    document.getElementById('game-header-bar').className = "bg-gradient-to-r from-emerald-400 to-teal-500 text-white p-4 flex justify-between items-center px-6";
  } else if (level === 'normal') {
    gameVars.timeLeft = 45;
    document.getElementById('game-mascot').textContent = '🐇';
    document.getElementById('game-level-title').textContent = 'Nivel Normal (Conejo)';
    document.getElementById('game-header-bar').className = "bg-gradient-to-r from-sky-400 to-blue-500 text-white p-4 flex justify-between items-center px-6";
  } else {
    gameVars.timeLeft = 30;
    document.getElementById('game-mascot').textContent = '🦅';
    document.getElementById('game-level-title').textContent = 'Nivel Difícil (Águila)';
    document.getElementById('game-header-bar').className = "bg-gradient-to-r from-rose-400 to-orange-500 text-white p-4 flex justify-between items-center px-6";
  }
  gameVars.totalTime = gameVars.timeLeft;

  // Seleccionar un cuento al azar de la base de datos
  const stories = database[level];
  const randomIndex = Math.floor(Math.random() * stories.length);
  gameVars.currentStory = stories[randomIndex];

  document.getElementById('game-text-indicator').textContent = `Texto: ${gameVars.currentStory.title}`;

  // Iniciar Fase de Lectura
  startReadingStage();
}

// Iniciar Fase de Lectura
function startReadingStage() {
  showGameStage('reading');
  
  document.getElementById('reading-title').textContent = gameVars.currentStory.title;
  document.getElementById('reading-body').textContent = gameVars.currentStory.body;
  document.getElementById('timer-number').textContent = gameVars.timeLeft;
  
  const progressBar = document.getElementById('timer-progress-bar');
  progressBar.style.width = '100%';
  
  // Iniciar Intervalo del Temporizador
  if (gameVars.timerInterval) clearInterval(gameVars.timerInterval);
  
  gameVars.timerInterval = setInterval(() => {
    gameVars.timeLeft--;
    document.getElementById('timer-number').textContent = gameVars.timeLeft;
    
    const percent = (gameVars.timeLeft / gameVars.totalTime) * 100;
    progressBar.style.width = `${percent}%`;

    if (gameVars.timeLeft <= 10) {
      // Parpadear en rojo el temporizador en los últimos 10 segundos
      progressBar.classList.remove('from-teal-400', 'to-emerald-500');
      progressBar.classList.add('bg-rose-500');
    } else {
      progressBar.classList.remove('bg-rose-500');
      progressBar.classList.add('from-teal-400', 'to-emerald-500');
    }

    if (gameVars.timeLeft <= 0) {
      clearInterval(gameVars.timerInterval);
      playBeep('error');
      // Avanzar automáticamente por tiempo agotado
      startQuizStage();
    }
  }, 1000);
}

// Finalizar lectura antes de tiempo
function finishReadingEarly() {
  if (gameVars.timerInterval) clearInterval(gameVars.timerInterval);
  playBeep('success');
  startQuizStage();
}

// Iniciar fase de Quiz
function startQuizStage() {
  gameVars.currentQuizIndex = 0;
  gameVars.correctAnswersCount = 0;
  showGameStage('quiz');
  loadQuizQuestion();
}

// Cargar una pregunta de comprensión
function loadQuizQuestion() {
  const story = gameVars.currentStory;
  const questionData = story.questions[gameVars.currentQuizIndex];
  
  // Actualizar progreso visual
  document.getElementById('quiz-index-indicator').textContent = `${gameVars.currentQuizIndex + 1}/3`;
  document.getElementById('quiz-question').textContent = questionData.q;
  
  // Ocultar caja de pista inicialmente
  document.getElementById('quiz-hint-box').classList.add('hidden');

  // Crear dots de progreso
  const dotsContainer = document.getElementById('quiz-dots');
  dotsContainer.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('span');
    dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${i < gameVars.currentQuizIndex ? 'bg-emerald-500' : 'bg-slate-200'}`;
    dotsContainer.appendChild(dot);
  }

  // Generar opciones
  const optionsContainer = document.getElementById('quiz-options-container');
  optionsContainer.innerHTML = '';

  questionData.options.forEach((opt, index) => {
    const button = document.createElement('button');
    button.className = "w-full p-4 bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 hover:border-slate-400 text-left font-semibold text-sm rounded-2xl transition-all-300 shadow-sm flex items-center justify-between";
    button.innerHTML = `
      <span>${opt}</span>
      <span class="text-xs bg-slate-100 text-slate-400 py-1 px-2.5 rounded-lg uppercase tracking-wider">Opción ${index + 1}</span>
    `;
    button.onclick = () => selectQuizOption(index, button);
    optionsContainer.appendChild(button);
  });
}

// Procesar opción de quiz seleccionada
function selectQuizOption(selectedIndex, buttonElement) {
  const questionData = gameVars.currentStory.questions[gameVars.currentQuizIndex];
  const correctIdx = questionData.correctIndex;
  const optionsContainer = document.getElementById('quiz-options-container');
  const buttons = optionsContainer.getElementsByTagName('button');

  // Desactivar clics en las demás opciones
  for (let btn of buttons) {
    btn.disabled = true;
  }

  if (selectedIndex === correctIdx) {
    // RESPUESTA CORRECTA
    playBeep('success');
    buttonElement.className = "w-full p-4 bg-emerald-50 border-4 border-emerald-400 text-emerald-900 text-left font-bold text-sm rounded-2xl transition-all-300 shadow-md flex items-center justify-between";
    buttonElement.innerHTML += ` <span class="text-emerald-600 text-lg">🎉 ¡Correcto!</span>`;
    
    gameVars.correctAnswersCount++;
    gameVars.stars += 5;
    updateStarDisplay();

    // Esperar 1.8 segundos y pasar a la siguiente pregunta o fase
    setTimeout(() => {
      advanceQuiz();
    }, 1800);

  } else {
    // RESPUESTA INCORRECTA
    playBeep('error');
    buttonElement.className = "w-full p-4 bg-rose-50 border-4 border-rose-400 text-rose-900 text-left font-bold text-sm rounded-2xl transition-all-300 wobble flex items-center justify-between";
    buttonElement.innerHTML += ` <span class="text-rose-600 text-sm">❌ Intenta de nuevo</span>`;

    // Mostrar pista (Filtro didáctico, no se muestra respuesta)
    document.getElementById('quiz-hint-text').textContent = questionData.hint;
    document.getElementById('quiz-hint-box').classList.remove('hidden');

    // Permitir reintentar después de un momento corto de lectura de la pista
    setTimeout(() => {
      for (let btn of buttons) {
        if (btn !== buttonElement) {
          btn.disabled = false;
        }
      }
    }, 1500);
  }
}

// Avanzar en el quiz
function advanceQuiz() {
  gameVars.currentQuizIndex++;
  if (gameVars.currentQuizIndex < 3) {
    loadQuizQuestion();
  } else {
    // Al terminar las preguntas, pasar al juego interactivo "Armar Palabras"
    startWordBuilderStage();
  }
}

// Iniciar fase de construcción de palabras
function startWordBuilderStage() {
  showGameStage('wordbuilder');
  
  const story = gameVars.currentStory;
  const targetWord = story.word.toUpperCase();
  
  document.getElementById('wordbuilder-hint').textContent = `"${story.wordHint}"`;
  
  // Preparar arreglos de estado
  gameVars.shuffledWordLetters = targetWord.split('');
  // Desordenar las letras
  shuffleArray(gameVars.shuffledWordLetters);
  // Evitar que queden idénticas a la palabra original si es muy corta
  if (gameVars.shuffledWordLetters.join('') === targetWord) {
    gameVars.shuffledWordLetters.reverse();
  }

  gameVars.userWordLetters = Array(targetWord.length).fill(null);
  gameVars.wordBuilderSuccess = false;

  renderWordBuilder();
}

// Algoritmo Fisher-Yates para desordenar
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Dibujar interfaz de construcción de palabras
function renderWordBuilder() {
  const slotsContainer = document.getElementById('wordbuilder-slots');
  const poolContainer = document.getElementById('wordbuilder-pool');

  slotsContainer.innerHTML = '';
  poolContainer.innerHTML = '';

  // 1. Dibujar los Slots de Destino (Casillas que el niño va llenando)
  gameVars.userWordLetters.forEach((letter, index) => {
    const slot = document.createElement('div');
    if (letter === null) {
      slot.className = "w-12 h-12 md:w-14 md:h-14 border-4 border-dashed border-slate-300 rounded-xl bg-slate-50 flex items-center justify-center font-kids text-xl md:text-2xl text-slate-400 transition-all-300";
      slot.textContent = "?";
    } else {
      slot.className = "w-12 h-12 md:w-14 md:h-14 border-4 border-violet-400 bg-violet-100 rounded-xl flex items-center justify-center font-kids text-xl md:text-2xl text-violet-900 cursor-pointer shadow hover:scale-105 transition-all-300";
      slot.textContent = letter;
      // Si el niño cliquea una letra puesta, la remueve
      slot.onclick = () => removeLetterFromSlot(index);
    }
    slotsContainer.appendChild(slot);
  });

  // 2. Dibujar la alberca de letras de origen disponibles
  gameVars.shuffledWordLetters.forEach((letter, index) => {
    const button = document.createElement('button');
    if (letter === null) {
      // Letra ya usada
      button.className = "w-12 h-12 md:w-14 md:h-14 bg-slate-100 text-slate-200 border-2 border-slate-200 rounded-xl font-kids text-xl md:text-2xl cursor-not-allowed opacity-40 transition-all-300";
      button.textContent = "";
      button.disabled = true;
    } else {
      // Letra libre para cliquear
      button.className = "w-12 h-12 md:w-14 md:h-14 bg-amber-400 hover:bg-amber-300 text-slate-900 border-4 border-white rounded-xl font-kids text-xl md:text-2xl shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transition-all-300";
      button.textContent = letter;
      button.onclick = () => addLetterToSlot(letter, index);
    }
    poolContainer.appendChild(button);
  });
}

// Añadir letra al primer slot vacío
function addLetterToSlot(letter, originalPoolIndex) {
  playBeep('click');
  const emptyIndex = gameVars.userWordLetters.indexOf(null);
  if (emptyIndex !== -1) {
    gameVars.userWordLetters[emptyIndex] = letter;
    // Marcar la letra como usada en el pool
    gameVars.shuffledWordLetters[originalPoolIndex] = null;
    renderWordBuilder();
  }
}

// Remover letra de un slot
function removeLetterFromSlot(slotIndex) {
  playBeep('click');
  const letter = gameVars.userWordLetters[slotIndex];
  if (letter !== null) {
    // Remover del slot
    gameVars.userWordLetters[slotIndex] = null;
    // Regresar la letra al primer espacio nulo del pool de origen
    const emptyPoolIndex = gameVars.shuffledWordLetters.indexOf(null);
    if (emptyPoolIndex !== -1) {
      gameVars.shuffledWordLetters[emptyPoolIndex] = letter;
    } else {
      gameVars.shuffledWordLetters.push(letter);
    }
    renderWordBuilder();
  }
}

// Reiniciar el módulo de construcción de palabras
function resetWordBuilder() {
  playBeep('click');
  startWordBuilderStage();
}

// Comprobar solución de palabra construida
function checkWordBuilderSolution() {
  const targetWord = gameVars.currentStory.word.toUpperCase();
  const userWord = gameVars.userWordLetters.join('');

  if (userWord === targetWord) {
    // ¡PALABRA CORRECTA!
    playBeep('complete');
    gameVars.wordBuilderSuccess = true;
    gameVars.stars += 15;
    updateStarDisplay();

    const slotsContainer = document.getElementById('wordbuilder-slots');
    // Marcar todos los bloques de verde feliz
    for (let child of slotsContainer.children) {
      child.className = "w-12 h-12 md:w-14 md:h-14 bg-emerald-500 border-4 border-white text-white rounded-xl flex items-center justify-center font-kids text-xl md:text-2xl shadow-lg transition-all-300 scale-110";
    }

    setTimeout(() => {
      // Pasar a fase de reflexión escrita
      startReflectionStage();
    }, 1800);

  } else {
    // ERROR EN PALABRA
    playBeep('error');
    const slotsContainer = document.getElementById('wordbuilder-slots');
    // Wobble y marcar temporalmente de rojo
    for (let child of slotsContainer.children) {
      child.classList.add('wobble', 'border-rose-500', 'bg-rose-50');
    }
    setTimeout(() => {
      for (let child of slotsContainer.children) {
        child.classList.remove('wobble', 'border-rose-500', 'bg-rose-50');
      }
    }, 400);
  }
}

// Iniciar fase de reflexión libre
function startReflectionStage() {
  showGameStage('reflection');
  document.getElementById('reflection-textarea').value = '';
  validateReflection();
}

// Validar longitud mínima de la reflexión
function validateReflection() {
  const text = document.getElementById('reflection-textarea').value.trim();
  const countLabel = document.getElementById('reflection-char-count');
  const submitBtn = document.getElementById('btn-submit-reflection');

  countLabel.textContent = `${text.length} / 15 caracteres mínimos`;

  if (text.length >= 15) {
    countLabel.className = "text-emerald-600 font-bold";
    submitBtn.className = "bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-kids text-lg px-10 py-3.5 rounded-2xl cursor-pointer hover:scale-105 active:scale-95 shadow-md transition-all-300";
    submitBtn.disabled = false;
  } else {
    countLabel.className = "text-slate-400 font-semibold";
    submitBtn.className = "bg-slate-300 text-slate-500 font-kids text-lg px-10 py-3.5 rounded-2xl cursor-not-allowed transition-all-300";
    submitBtn.disabled = true;
  }
}

// Enviar reflexión final
function submitReflection() {
  playBeep('complete');
  gameVars.stars += 10;
  updateStarDisplay();
  showResultsStage();
}

// Mostrar resultados del juego
function showResultsStage() {
  showGameStage('results');
  
  const starsDisplay = document.getElementById('stat-stars');
  const quizDisplay = document.getElementById('stat-quiz');
  const reflectionText = document.getElementById('result-reflection-text');

  starsDisplay.textContent = gameVars.stars;
  quizDisplay.textContent = `${gameVars.correctAnswersCount}/3`;
  reflectionText.textContent = `"${document.getElementById('reflection-textarea').value.trim()}"`;

  // Definir carita y mensaje basado en respuestas de comprensión
  const emoji = document.getElementById('result-emoji');
  const title = document.getElementById('result-title');
  const subtitle = document.getElementById('result-subtitle');

  if (gameVars.correctAnswersCount >= 2) {
    emoji.textContent = "😄";
    title.textContent = "¡Campeón de la Comprensión! 🏆";
    subtitle.textContent = "¡Increíble! Has comprendido el cuento de forma perfecta y completaste la palabra.";
  } else {
    emoji.textContent = "🙂";
    title.textContent = "¡Buen Intento, Explorador!";
    subtitle.textContent = "Recuerda que leer no es solo pronunciar palabras rápidamente, ¡sino recordar los detalles de la historia!";
  }
}

// Actualizar indicador visual de estrellas
function updateStarDisplay() {
  document.getElementById('star-count').textContent = gameVars.stars;
}

// Reintentar nivel actual
function retryCurrentLevel() {
  playBeep('click');
  selectLevel(gameVars.currentLevel);
}

// Regresar al estado de configuración inicial
function resetToSetup() {
  playBeep('click');
  document.getElementById('section-game').classList.add('hidden');
  window.scrollTo({top: 0, behavior: 'smooth'});
  document.getElementById('game-text-indicator').textContent = "Selecciona un nivel";
}

// Renderizar panel de edición pedagógica para docentes
function renderTeacherPanel() {
  const container = document.getElementById('editor-texts-container');
  container.innerHTML = '';

  const levels = ['easy', 'normal', 'hard'];
  const badgesClasses = {
    easy: "bg-emerald-100 text-emerald-800",
    normal: "bg-sky-100 text-sky-800",
    hard: "bg-rose-100 text-rose-800"
  };

  levels.forEach(lvl => {
    database[lvl].forEach((story, sIndex) => {
      const card = document.createElement('div');
      card.className = "p-5 border-2 border-slate-200 rounded-2xl space-y-4 bg-slate-50 relative hover:border-slate-300 transition-all-300";
      card.innerHTML = `
        <span class="absolute -top-3.5 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${badgesClasses[lvl]}">
          ${story.levelName}
        </span>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-[11px] font-bold text-slate-500 mb-1">Título del Cuento</label>
            <input type="text" value="${story.title}" onchange="updateDatabaseField('${lvl}', ${sIndex}, 'title', this.value)" class="w-full border rounded-lg p-2 text-xs font-semibold bg-white">
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1">Palabra Clave (Minijuego)</label>
              <input type="text" value="${story.word}" onchange="updateDatabaseField('${lvl}', ${sIndex}, 'word', this.value.toUpperCase().trim())" class="w-full border rounded-lg p-2 text-xs font-bold text-violet-700 bg-white uppercase">
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1">Pista de la Palabra</label>
              <input type="text" value="${story.wordHint}" onchange="updateDatabaseField('${lvl}', ${sIndex}, 'wordHint', this.value)" class="w-full border rounded-lg p-2 text-xs font-semibold bg-white">
            </div>
          </div>
        </div>

        <div>
          <label class="block text-[11px] font-bold text-slate-500 mb-1">Cuerpo del Cuento</label>
          <textarea onchange="updateDatabaseField('${lvl}', ${sIndex}, 'body', this.value)" class="w-full border rounded-lg p-2 text-xs font-medium bg-white min-h-[70px] leading-relaxed">${story.body}</textarea>
        </div>

        <!-- Editor de Preguntas -->
        <div class="space-y-3 pt-2 border-t border-dashed border-slate-200">
          <h5 class="text-xs font-bold text-slate-600 flex items-center gap-1">📋 Preguntas de Comprensión:</h5>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            ${story.questions.map((qData, qIndex) => `
              <div class="p-3 bg-white border rounded-xl space-y-2 relative shadow-sm">
                <span class="text-[10px] font-bold text-cyan-600 block mb-1">Pregunta ${qIndex + 1}</span>
                <input type="text" value="${qData.q}" onchange="updateDatabaseQuestionField('${lvl}', ${sIndex}, ${qIndex}, 'q', this.value)" class="w-full border p-1.5 text-xs font-bold rounded">
                
                <div class="space-y-1">
                  <label class="text-[9px] font-bold text-slate-400 block">Opciones:</label>
                  ${qData.options.map((opt, oIndex) => `
                    <div class="flex items-center gap-1.5">
                      <input type="radio" name="correct-${lvl}-${sIndex}-${qIndex}" ${qData.correctIndex === oIndex ? 'checked' : ''} onchange="updateDatabaseQuestionField('${lvl}', ${sIndex}, ${qIndex}, 'correctIndex', ${oIndex})" class="accent-emerald-500">
                      <input type="text" value="${opt}" onchange="updateDatabaseQuestionOption('${lvl}', ${sIndex}, ${qIndex}, ${oIndex}, this.value)" class="w-full border p-1 text-[11px] font-semibold rounded ${qData.correctIndex === oIndex ? 'border-emerald-300 bg-emerald-50/50' : ''}">
                    </div>
                  `).join('')}
                </div>

                <div>
                  <label class="text-[9px] font-bold text-slate-400 block">Pregunta de Andamiaje (Pista):</label>
                  <input type="text" value="${qData.hint}" onchange="updateDatabaseQuestionField('${lvl}', ${sIndex}, ${qIndex}, 'hint', this.value)" class="w-full border p-1 text-[10px] bg-amber-50 rounded">
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  });
}

// Sincronizar Ficha Pedagógica editada con el Juego
function syncFichaToGame() {
  playBeep('complete');
  
  // Sincronizar las variables con la UI de juego activa
  if (gameVars.currentStory) {
    // Encontrar la historia en la base de datos actualizada
    const updatedStory = database[gameVars.currentLevel].find(s => s.id === gameVars.currentStory.id);
    if (updatedStory) {
      gameVars.currentStory = updatedStory;
    }
  }

  // Reiniciar visuales
  resetToSetup();
  
  // Mostrar feedback amigable de guardado
  const alertBox = document.createElement('div');
  alertBox.className = "fixed top-5 right-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-kids p-4 rounded-2xl shadow-xl z-50 text-xs flex items-center gap-2 transform translate-y-0 transition-all duration-500";
  alertBox.innerHTML = `<span>✨ ¡Simulador Sincronizado Correctamente! ✨</span>`;
  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.classList.add('opacity-0', 'translate-y-[-20px]');
    setTimeout(() => alertBox.remove(), 500);
  }, 2500);

  // Regresar al modo juego automáticamente para que los niños experimenten los cambios
  switchTab('game');
}

/* CONTROL DE CHECKLIST (DOCENTES) */
function toggleCheckItem(li) {
  const cb = li.querySelector('input[type="checkbox"]');
  cb.checked = !cb.checked;
  updateCheckStatus();
}

function updateCheckStatus() {
  const items = document.querySelectorAll('#checklist li');
  let checkedCount = 0;
  items.forEach(item => {
    const cb = item.querySelector('input[type="checkbox"]');
    if (cb.checked) checkedCount++;
  });

  const label = document.getElementById('check-status');
  if (checkedCount === items.length) {
    label.textContent = `✅ ¡Ficha Pedagógica de Codiseño lista! (${checkedCount}/${items.length} criterios cumplidos)`;
    label.className = "mt-4 text-xs font-bold text-emerald-600";
  } else {
    label.textContent = `⚠️ Criterios validados: ${checkedCount} de ${items.length} totales. Completa todos los campos para finalizar el taller.`;
    label.className = "mt-4 text-xs font-bold text-amber-600";
  }
}

// Inicializar al cargar la página
window.onload = function() {
  // Ajustar fecha por defecto a hoy
  const dateInput = document.getElementById('teacher-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
  }
  
  // Renderizar el panel del profesor
  renderTeacherPanel();
  updateCheckStatus();
};
