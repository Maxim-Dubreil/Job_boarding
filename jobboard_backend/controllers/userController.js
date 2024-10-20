// controllers/userController.js
const { Utilisateur } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inscription des utilisateurs
const registerUser = async (req, res) => {
  const { nom, prenom, email, mot_de_passe, telephone, adresse, role, id_entreprise } = req.body;

  try {
    // Vérifier si l'email existe déjà
    const existingUser = await Utilisateur.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet e-mail est déjà utilisé' });
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    // Création de l\'utilisateur
    const newUser = await Utilisateur.create({
      nom,
      prenom,
      email,
      mot_de_passe: hashedPassword,
      telephone,
      adresse,
      role,
      id_entreprise,
    });

    res.json({ message: 'Inscription réussie', id: newUser.id });
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    res.status(500).json({ error: 'Erreur lors de l\'inscription' });
  }
};

// Connexion des utilisateurs
const loginUser = async (req, res) => {
    const { email, mot_de_passe } = req.body;
  
    try {
      const user = await Utilisateur.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Identifiants incorrects' });
      }
  
      const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
      if (!isMatch) {
        return res.status(401).json({ error: 'Mot de passe incorrect' });
      }
  
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      // Include full user data in response
      res.json({
        message: 'Connexion réussie',
        token,
        user: {
          id: user.id,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          telephone: user.telephone,
          adresse: user.adresse,
          role: user.role,
          id_entreprise: user.id_entreprise
        }
      });
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
  };
  


// Récupérer le profil utilisateur
const getUserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Utilisateur.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération du profil utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du profil utilisateur' });
  }
};

// Mise à jour des informations utilisateur
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, telephone, adresse, role, id_entreprise } = req.body;

  try {
    const [updated] = await Utilisateur.update({ nom, prenom, telephone, adresse, role, id_entreprise }, { where: { id } });

    if (!updated) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json({ message: 'Utilisateur mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
};

// Suppression d'un utilisateur
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Utilisateur.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
  }
};

// Récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const users = await Utilisateur.findAll();
    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, updateUser, deleteUser, getAllUsers };
