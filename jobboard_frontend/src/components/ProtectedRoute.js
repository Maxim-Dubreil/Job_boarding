import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext3';

function ProtectedRoute({ children, roles }) {
    const { user } = useContext(AuthContext);

    if (!user) {
        // Si l'utilisateur n'est pas connecté, le rediriger vers la page de connexion
        return <Navigate to="/Login" replace />;
    }

    if (roles && roles.length > 0 && !roles.includes(user.role)) {
        // Si l'utilisateur n'a pas le bon rôle, on redirige vers la page d'accueil ou un accès refusé
        return <Navigate to="/" replace />;
    }

    // Si l'utilisateur est connecté et a le bon rôle, on lui montre la page
    return children;
}

export default ProtectedRoute;
