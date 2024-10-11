// controllers/userController.js
const db = require('../db');
const bcrypt = require('bcrypt');

// Inscription des utilisateurs
const registerUser = async(req, res) => {
    const { nom, prenom, email, mot_de_passe, telephone, adresse, role, id_entreprise } = req.body;

    try {
        // Vérifier si l'email existe déjà
        const checkEmailQuery = 'SELECT * FROM utilisateurs WHERE email = ?';
        db.query(checkEmailQuery, [email], async(err, results) => {
            if (err) {
                console.error('Erreur lors de la vérification de l\'e-mail :', err);
                return res.status(500).json({ error: 'Erreur lors de la vérification de l\'e-mail' });
            }
            if (results.length > 0) {
                return res.status(400).json({ error: 'Cet e-mail est déjà utilisé' });
            }

            // Hashage du mot de passe
            const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

            // Insertion de l'utilisateur
            const sql = 'INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, telephone, adresse, role, id_entreprise) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(sql, [nom, prenom, email, hashedPassword, telephone, adresse, role, id_entreprise], (err, result) => {
                if (err) {
                    console.error('Erreur lors de l\'insertion de l\'utilisateur :', err);
                    return res.status(500).json({ error: 'Erreur lors de l\'inscription' });
                }
                res.json({ message: 'Inscription réussie', id: result.insertId });
            });
        });
    } catch (error) {
        console.error('Erreur lors du hashage du mot de passe :', error);
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
// Mise à jour des informations utilisateur
const updateUser = (req, res) => {
    const { id } = req.params; // Récupère l'ID de l'utilisateur à partir des paramètres de l'URL
    const { nom, prenom, telephone, adresse, role, id_entreprise } = req.body;

    // Requête SQL pour mettre à jour l'utilisateur
    const sql = `
        UPDATE utilisateurs
        SET nom = ?, prenom = ?, telephone = ?, adresse = ?, role = ?, id_entreprise = ?
        WHERE id_utilisateur = ?
    `;
    db.query(sql, [nom, prenom, telephone, adresse, role, id_entreprise, id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', err);
            return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        res.json({ message: 'Utilisateur mis à jour avec succès' });
    });
};

// Suppression d'un utilisateur
const deleteUser = (req, res) => {
    const { id } = req.params; // Récupère l'ID de l'utilisateur à partir des paramètres de l'URL

    // Requête SQL pour supprimer l'utilisateur
    const sql = 'DELETE FROM utilisateurs WHERE id_utilisateur = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', err);
            return res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
        res.json({ message: 'Utilisateur supprimé avec succès' });
    });
};
module.exports = { registerUser, loginUser, getUserProfile, updateUser, deleteUser };