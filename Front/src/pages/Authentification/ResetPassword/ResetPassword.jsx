import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "../../../utils/toast.js";
import { resetPassword } from "../../../api/userApi.js";
// import { resetPassword } from '../../api/index'; // À décommenter quand tu as une vraie API

const ResetPassword = () => {
  /**State pour les données du formulaire */
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  /**State pour afficher le mot de passe*/
  const [showPassword, setShowPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState("");
  /**Hook de redirection */
  const navigate = useNavigate();
  /**Récupératon du token dans l'URL */
  const { token } = useParams();

  // ------------------ VISIBILITÉ DU MOT DE PASSE ------------------
  /**
   * @function togglePasswordVisibility
   * Fonction pour inverser la visisbilité du Password
   */
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  /**
   * @function toggleConfirmPasswordVisibility
   * Fonction pour inverser la visisbilité du confirmPassword
   */
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await resetPassword(newPassword, confirmPassword, token);

      toast.success("Mot de passe réinitialisé avec succès ! Veuillez vous authentifier");

      navigate("/login");
    } catch {
      toast.error("Erreur lors de la réinitialisation du mot de passe.");
    }
  };

  return (
    <main className="section__form">
      <div className="form__container">
        <h2 className="section-title form-title">Réinitialisation du mot de passe</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="newPassword">Nouveau mot de passe</label>
            <input type={showPassword ? "text" : "password"} name="newPassword" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required placeholder="Entrez un nouveau mot de passe" />
            <i className={`eye-icon ${showPassword ? "uil uil-eye-slash" : "uil uil-eye"}`} onClick={togglePasswordVisibility}></i>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
            <input type={showConfirmPassword ? "text" : "password"} name="confirm" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Confirmez le mot de passe" />
            <i className={`eye-icon ${showConfirmPassword ? "uil uil-eye-slash" : "uil uil-eye"}`} onClick={toggleConfirmPasswordVisibility}></i>
          </div>

          <button type="submit" className="btn">
            Réinitialiser le mot de passe
          </button>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;
