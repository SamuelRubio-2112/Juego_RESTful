const habilidades = [
  {
    id: 1,
    nombre: 'Espadazo',
    descripcion: 'Un ataque poderoso con la espada.',
    incremento_ataque: 10,
    incremento_defensa: 0,
    incremento_estamina: -5,
  },
  {
    id: 2,
    nombre: 'Escudo de Hierro',
    descripcion: 'Aumenta la defensa del guerrero.',
    incremento_ataque: 0,
    incremento_defensa: 15,
    incremento_estamina: -3,
  },
  // Agrega al menos 4 habilidades más.
  {
    id: 3,
    nombre: 'Flecha Certera',
    descripcion: 'Dispara una flecha con precisión mortal.',
    incremento_ataque: 12,
    incremento_defensa: 0,
    incremento_estamina: -4,
  },
  {
    id: 4,
    nombre: 'Sigilo',
    descripcion: 'El personaje se oculta entre las sombras.',
    incremento_ataque: 5,
    incremento_defensa: 8,
    incremento_estamina: -2,
  },
  {
    id: 5,
    nombre: 'Bola de Fuego',
    descripcion: 'Lanza una esfera de fuego explosiva al enemigo.',
    incremento_ataque: 18,
    incremento_defensa: 0,
    incremento_estamina: -8,
  },
  {
    id: 6,
    nombre: 'Curación Sagrada',
    descripcion: 'Restaura la estamina mediante luz divina.',
    incremento_ataque: 0,
    incremento_defensa: 5,
    incremento_estamina: 20,
  }
];
 
const personajes = [
  {
    id: 1,
    nombre: 'Gagh-Ar',
    tipo: 'guerrero',
    descripcion: 'Un valiente luchador con gran fuerza física.',
    ataque: 80, defensa: 70, estamina: 60,
    habilidades: [1, 2],
  },
  {
    id: 2,
    nombre: 'Elyra',
    tipo: 'maga',
    descripcion: 'Hechicera con gran dominio de la energía mágica.',
    ataque: 65, defensa: 40, estamina: 90,
    habilidades: [2],
  },
  // Agrega al menos 4 personajes más.
  {
    id: 3,
    nombre: 'Thorn',
    tipo: 'arquero',
    descripcion: 'Un arquero élfico de puntería incomparable y reflejos veloces.',
    ataque: 72, defensa: 45, estamina: 75,
    habilidades: [3, 4],
  },
  {
    id: 4,
    nombre: 'Serafina',
    tipo: 'clérigo',
    descripcion: 'Sacerdotisa devota que equilibra el combate con la sanación divina.',
    ataque: 50, defensa: 65, estamina: 85,
    habilidades: [2, 6],
  },
  {
    id: 5,
    nombre: 'Kael',
    tipo: 'asesino',
    descripcion: 'Un asesino sigiloso que golpea desde las sombras sin ser visto.',
    ataque: 88, defensa: 35, estamina: 70,
    habilidades: [4, 3],
  },
  {
    id: 6,
    nombre: 'Zephyra',
    tipo: 'hechicera',
    descripcion: 'Una hechicera caótica que domina el fuego y la destrucción elemental.',
    ataque: 95, defensa: 25, estamina: 65,
    habilidades: [5, 6],
  },
];
 
module.exports = { personajes, habilidades };