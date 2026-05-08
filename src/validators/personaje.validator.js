const { body, validationResult } = require('express-validator');

const basePersonajeRules = [
 body('nombre').isString().notEmpty().isLength({ max: 100 }).withMessage('El nombre es obligatorio (máx 100 caracteres)'),
 body('descripcion').optional().isString().isLength({ max: 500 }),
 body('ataque').isInt({ min: 0, max: 100 }),
 body('defensa').isInt({ min: 0, max: 100 }),
 body('estamina').isInt({ min: 0, max: 100 }),
];

exports.createPersonajeRules = [
    ...basePersonajeRules,
    body('perfilId').isInt({ min: 1 }).withMessage('El perfilId es obligatorio y debe ser un número entero válido')
]

exports.updatePersonajeRules = basePersonajeRules;

exports.addHabilidadRules = [
  body('habilidadId')
    .isInt()
    .withMessage('El id de la habilidad debe ser un número entero'),
  body('nivel')
    .isInt({ min: 1, max: 10 })
    .withMessage('El nivel debe ser un número entre 1 y 10')
];

exports.handleValidationErrors = (req, res, next) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
 }
 next();
};
