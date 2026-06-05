/* BASE DE DATOS INICIAL DE TEXTOS, PREGUNTAS Y MINIJUEGOS "ARMAR PALABRAS" */
let database = {
  easy: [
    {
      id: "t1",
      level: "easy",
      levelName: "Fácil 🐢",
      title: "El perro y la pelota",
      body: "Tobi es un perro café y muy juguetón. Todos los días sale al patio a buscar su pelota roja. Un día la pelota cayó al río. Tobi miró el agua y esperó. Su dueño fue a buscarla y Tobi movió la cola muy feliz.",
      word: "PELOTA",
      wordHint: "El juguete favorito de Tobi que cayó al agua del río.",
      questions: [
        {
          q: "¿Cómo se llama el perro del cuento?",
          options: ["Tobi", "Coco", "Max", "Pelusa"],
          correctIndex: 0,
          hint: "¿Recuerdas la primera oración? ¿Qué nombre le pusieron al perro?"
        },
        {
          q: "¿Qué le pasó a la pelota de Tobi?",
          options: ["La rompió jugando", "La perdió en la casa", "Cayó al río", "Se la robó un gato"],
          correctIndex: 2,
          hint: "Vuelve a leer la tercera oración. ¿A dónde se fue volando la pelota?"
        },
        {
          q: "¿Cómo se sentía Tobi al final?",
          options: ["Triste y molesto", "Asustado", "Muy feliz", "Cansado"],
          correctIndex: 2,
          hint: "¿Qué hace Tobi con su cola cuando su dueño regresa con su juguete?"
        }
      ]
    },
    {
      id: "t2",
      level: "easy",
      levelName: "Fácil 🐢",
      title: "La nube viajera",
      body: "Había una nube blanca que le gustaba viajar por el cielo. Un día vio un campo seco y triste. La nube se llenó de agua y empezó a llover. Las plantas bebieron el agua y se pusieron verdes. La nube siguió su camino muy contenta.",
      word: "LLUVIA",
      wordHint: "El agua que cae del cielo cuando la nube decide ayudar al campo seco.",
      questions: [
        {
          q: "¿Qué le gustaba hacer a la nube blanca?",
          options: ["Dormir todo el día", "Viajar por el cielo", "Esconder al sol", "Volar bajo el mar"],
          correctIndex: 1,
          hint: "Relee la primera oración. ¿Cuál era el pasatiempo preferido de la nube?"
        },
        {
          q: "¿Qué hizo la nube al ver el campo seco?",
          options: ["Siguió de largo", "Se escondió asustada", "Empezó a llover", "Hizo mucho viento"],
          correctIndex: 2,
          hint: "¿Qué sucede cuando una nube se recarga de agua para refrescar un campo?"
        },
        {
          q: "¿De qué color se pusieron las plantas al final?",
          options: ["Amarillas", "Verdes", "Cafés", "Azules"],
          correctIndex: 1,
          hint: "Lee la cuarta oración. ¿Cómo cambiaron las plantitas al beber agua?"
        }
      ]
    }
  ],
  normal: [
    {
      id: "t3",
      level: "normal",
      levelName: "Normal 🐇",
      title: "La tortuga Catalina",
      body: "Catalina era una tortuga que soñaba con volar como los pájaros. Todos los días miraba el cielo y suspiraba. Un día, un águila le dijo: 'Yo te puedo enseñar a subir muy alto.' Catalina se aferró al cuello del águila y juntas subieron hasta las nubes. Cuando bajaron, Catalina entendió que no necesitaba alas para conocer el mundo, solo necesitaba buenos amigos.",
      word: "AMIGOS",
      wordHint: "Lo que la tortuga Catalina descubrió que era lo más importante para viajar.",
      questions: [
        {
          q: "¿Cuál era el gran sueño de Catalina?",
          options: ["Nadar en el mar azul", "Correr muy rápido", "Volar como los pájaros", "Ser muy famosa"],
          correctIndex: 2,
          hint: "¿Por qué miraba la tortuga Catalina al cielo suspirando todos los días?"
        },
        {
          q: "¿Qué animal ayudó a Catalina a subir alto?",
          options: ["Un tucán alegre", "Un águila fuerte", "Una mariposa", "Un búho sabio"],
          correctIndex: 1,
          hint: "¿Quién le propuso a Catalina enseñarle a subir hasta las nubes?"
        },
        {
          q: "¿Qué aprendió Catalina al final del viaje?",
          options: ["Que volar es muy peligroso", "Que necesita tener alas", "Que con buenos amigos se conoce el mundo", "Que prefiere dormir sola"],
          correctIndex: 2,
          hint: "Lee la última frase del cuento. ¿Qué valora Catalina al final?"
        }
      ]
    },
    {
      id: "t4",
      level: "normal",
      levelName: "Normal 🐇",
      title: "El mercado de don Félix",
      body: "Don Félix tiene un puesto de frutas en el mercado del pueblo. Cada mañana llega muy temprano a ordenar sus naranjas, mangos y piñas. Un martes, una niña llamada Rosa quiso comprar mangos, pero solo tenía la mitad del dinero. Don Félix la miró con amabilidad y le dijo: 'Llévate dos mangos hoy y la próxima semana me pagas.' Rosa sonrió y prometió volver.",
      word: "FRUTAS",
      wordHint: "Naranjas, mangos y piñas de don Félix son ejemplos de...",
      questions: [
        {
          q: "¿Qué vende don Félix en el mercado?",
          options: ["Verduras frescas", "Dulces y piñatas", "Frutas coloridas", "Ropa de niños"],
          correctIndex: 2,
          hint: "¿Qué deliciosos alimentos como naranjas y piñas organiza en su puesto?"
        },
        {
          q: "¿Por qué Rosa no podía pagar los mangos?",
          options: ["No le gustaba el precio", "Solo tenía la mitad del dinero", "El mercado estaba cerrado", "Perdió sus monedas"],
          correctIndex: 1,
          hint: "Revisa la conversación de Rosa con don Félix sobre el dinero que llevaba en su bolsa."
        },
        {
          q: "¿Qué valor demostró tener don Félix?",
          options: ["Enojo", "Amabilidad y confianza", "Prisa", "Desconfianza"],
          correctIndex: 1,
          hint: "¿Cómo reaccionó y qué le ofreció don Félix a la niña Rosa?"
        }
      ]
    }
  ],
  hard: [
    {
      id: "t5",
      level: "hard",
      levelName: "Difícil 🦅",
      title: "El río Claro y el bosque",
      body: "Había una vez un río llamado Claro que corría alegre entre las montañas. Pero un año de mucho calor, el río empezó a secarse poco a poco. Los peces buscaban sombra y los animales caminaban largas distancias para beber. Los habitantes decidieron sembrar árboles en las orillas. Con el tiempo, la sombra de los árboles refrescó el agua, y las lluvias volvieron a llenar el cauce. El río Claro aprendió que la naturaleza necesita el cuidado de todos.",
      word: "ARBOLES",
      wordHint: "Lo que sembraron los aldeanos en las orillas para refrescar el río con su sombra.",
      questions: [
        {
          q: "¿Por qué el río Claro comenzó a secarse?",
          options: ["Los peces bebían mucho", "Un año de calor extremo", "Construyeron una presa", "La gente tiró basura"],
          correctIndex: 1,
          hint: "Revisa la causa climática que afectó el flujo del agua al inicio de la historia."
        },
        {
          q: "¿Qué sembraron los vecinos en la orilla del río?",
          options: ["Flores coloridas", "Pasto sintético", "Árboles protectores", "Vegetales de huerto"],
          correctIndex: 2,
          hint: "¿Qué plantas de gran tamaño y tronco fuerte sembraron para crear sombra protectora?"
        },
        {
          q: "¿Cuál es la lección principal que nos enseña el cuento?",
          options: ["Los ríos no necesitan agua", "La naturaleza necesita el cuidado de todos", "Los peces viven sin sombra", "Los árboles secan los ríos"],
          correctIndex: 1,
          hint: "Vuelve a leer el hermoso mensaje que aprendió el río Claro en la última oración."
        }
      ]
    },
    {
      id: "t6",
      level: "hard",
      levelName: "Difícil 🦅",
      title: "La científica Valentina",
      body: "Valentina tenía nueve años y una libreta llena de preguntas. Quería saber por qué el cielo cambiaba de color al atardecer. Su maestra le explicó que la luz del sol viaja por el aire y choca con pequeñas partículas, y que dependiendo del ángulo, vemos distintos colores. Valentina no entendió todo de inmediato, pero escribió todo en su libreta y prometió seguir investigando. Esa noche, miró el cielo anaranjado y sonrió: cada pregunta era el inicio de un descubrimiento.",
      word: "CIENCIA",
      wordHint: "La pasión de Valentina por descubrir los secretos del universo y el cielo.",
      questions: [
        {
          q: "¿Qué duda misteriosa quería resolver Valentina?",
          options: ["Por qué llueve en invierno", "Por qué cambia el color del cielo", "Cómo vuelan los aviones", "De qué están hechas las estrellas"],
          correctIndex: 1,
          hint: "¿Qué miraba fijamente Valentina durante los atardeceres en su libreta de apuntes?"
        },
        {
          q: "¿Qué hacía Valentina con lo que no comprendía de inmediato?",
          options: ["Lo borraba enojada", "Lo guardaba en su memoria", "Lo anotaba en su libreta para investigar", "Se lo preguntaba a sus amigos"],
          correctIndex: 2,
          hint: "¿Cuál era la herramienta inseparable de Valentina donde guardaba sus preguntas?"
        },
        {
          q: "¿Representan las preguntas según la historia?",
          options: ["Un dolor de cabeza", "El inicio de un descubrimiento", "Una pérdida de tiempo", "Problemas difíciles"],
          correctIndex: 1,
          hint: "Lee la inspiradora frase final del cuento sobre el valor de ser curiosos."
        }
      ]
    }
  ]
};

/* FUNCIONES DE ACTUALIZACIÓN DE LA BASE DE DATOS (EDICIÓN DESDE EL PANEL DE DOCENTES) */
function updateDatabaseField(level, index, field, value) {
  database[level][index][field] = value;
}

function updateDatabaseQuestionField(level, sIndex, qIndex, field, value) {
  database[level][sIndex].questions[qIndex][field] = value;
}

function updateDatabaseQuestionOption(level, sIndex, qIndex, oIndex, value) {
  database[level][sIndex].questions[qIndex].options[oIndex] = value;
}
