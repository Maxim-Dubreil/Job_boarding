// controllers/userController.js
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inscription des utilisateurs
const registerUser = async(req, res) => {
    const { nom, prenom, email, mot_de_passe, telephone, adresse, role, id_entreprise } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
        const sql = 'INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, telephone, adresse, role, id_entreprise) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [nom, prenom, email, hashedPassword, telephone, adresse, role, id_entreprise], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur lors de l\'inscription' });
            }
            res.json({ message: 'Inscription réussie', id: result.insertId });
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors du hashage du mot de passe' });
    }
};

// Connexion des utilisateurs
const loginUser = (req, res) => {
    const { email, mot_de_passe } = req.body;

    const sql = 'SELECT * FROM utilisateurs WHERE email = ?';
    db.query(sql, [email], async(err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ error: 'Identifiants incorrects' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);

        if (!isMatch) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ id: user.id_utilisateur, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Connexion réussie', token });
    });
};

// Récupérer le profil utilisateur
const getUserProfile = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM utilisateurs WHERE id_utilisateur = ?';
    db.query(sql, [id], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        res.json(results[0]);
    });
};

module.exports = { registerUser, loginUser, getUserProfile };