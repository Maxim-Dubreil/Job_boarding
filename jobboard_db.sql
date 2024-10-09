-- Création de la table des entreprises
CREATE TABLE entreprises (
    id_entreprise INT AUTO_INCREMENT PRIMARY KEY,
    nom_entreprise VARCHAR(255) NOT NULL,
    secteur_activite VARCHAR(255),  -- Secteur d'activité de l'entreprise
    site_web VARCHAR(255),
    description TEXT,
    adresse VARCHAR(255),
    region VARCHAR(100),  -- Région pour la recherche par région
    telephone VARCHAR(20),
    email VARCHAR(255) NOT NULL UNIQUE,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table des utilisateurs
CREATE TABLE utilisateurs (
    id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(255) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255),
    telephone VARCHAR(20),
    adresse VARCHAR(255),  -- Adresse de l'utilisateur, s'il souhaite la fournir
    role ENUM('employé', 'recruteur') NOT NULL,
    id_entreprise INT DEFAULT NULL,  -- Lien avec l'entreprise pour les recruteurs
    chemin_cv VARCHAR(255),  -- Pour stocker le chemin du CV de l'employé
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_entreprise) REFERENCES entreprises(id_entreprise) ON DELETE SET NULL
);

-- Création de la table des offres d'emploi
CREATE TABLE offres_emploi (
    id_offre INT AUTO_INCREMENT PRIMARY KEY,
    id_entreprise INT NOT NULL,  -- Lien vers l'entreprise
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    salaire DECIMAL(10, 2),
    lieu VARCHAR(255),
    region VARCHAR(100),  -- Pour la recherche par région
    type_emploi ENUM('CDI', 'CDD', 'Stage', 'Freelance') NOT NULL,
    heures_travail VARCHAR(50),
    mots_cles VARCHAR(255),  -- Pour faciliter la recherche par mots-clés
    date_publication TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_entreprise) REFERENCES entreprises(id_entreprise) ON DELETE CASCADE
);

-- Création de la table des candidatures
CREATE TABLE candidatures (
    id_candidature INT AUTO_INCREMENT PRIMARY KEY,
    id_offre INT NOT NULL,  -- Lien avec l'offre d'emploi
    id_utilisateur INT NOT NULL,  -- Lien avec l'utilisateur (employé)
    message_candidature TEXT,  -- Lettre de motivation
    date_candidature TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_offre) REFERENCES offres_emploi(id_offre) ON DELETE CASCADE,
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id_utilisateur) ON DELETE CASCADE
);

-- Création de la table des authentifications
CREATE TABLE authentifications (
    id_session INT AUTO_INCREMENT PRIMARY KEY,
    id_utilisateur INT NOT NULL,  -- Lien avec l'utilisateur connecté
    token VARCHAR(255) NOT NULL,  -- Jeton d'authentification pour la session
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_expiration DATETIME NOT NULL,  -- Utilisation de DATETIME pour plus de flexibilité
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id_utilisateur) ON DELETE CASCADE
);
