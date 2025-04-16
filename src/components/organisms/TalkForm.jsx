//creation d'un composant qui permet de creer une presentation pour formulaire 
import { useState } from 'react';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import DateInput from '../atoms/DateInput';

const TalkForm = ({ onSubmit }) => {
  const [talkData, setTalkData] = useState({
    title: '',
    subject: '',
    duration: '',
    presenter: '',
    objective: '',
    date: new Date()
  });
  
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  
  //permet de mettre a jour l'etat lorsqu'un champ est modifie
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTalkData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  // Nouvelle fonction pour gérer la date avec react-datepicker
  const handleDateChange = (date) => {
    setTalkData(prevData => ({
      ...prevData,
      date: date
    }));
  };
  
  //traite la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Format ISO pour la date
    let isoDate = '';
    if (talkData.date instanceof Date && !isNaN(talkData.date)) {
      isoDate = talkData.date.toISOString().split('T')[0];
    } else {
      // fallback si jamais la date n'est pas un objet Date
      const [day, month, year] = (talkData.date || '').split('/');
      isoDate = `${year}-${month?.padStart(2, '0')}-${day?.padStart(2, '0')}`;
    }
    onSubmit({
      ...talkData,
      id: Date.now(),
      date: isoDate
    });
    setIsFormSubmitted(true);
    setTimeout(() => {
      setTalkData({
        title: '',
        subject: '',
        duration: '',
        presenter: '',
        objective: '',
        date: new Date()
      });
      setIsFormSubmitted(false);
    }, 2000);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 h-full transition-colors duration-300 overflow-y-auto">
      <div className="p-3 sm:p-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-center text-gray-900 dark:text-white">
          Planificateur de Présentation
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <FormField
            label={<span className="font-semibold text-gray-900 dark:text-white">Titre de la présentation</span>}
            id="title"
            name="title"
            value={talkData.title}
            onChange={handleChange}
            required
            placeholder="Entrez le titre de votre talk"
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
              Date du talk (JJ/MM/AAAA)
            </label>
            <DateInput
              id="date"
              name="date"
              value={talkData.date}
              onChange={handleDateChange}
              required
            />
          </div>
          
          <FormField
            label={<span className="font-semibold text-gray-900 dark:text-white">Sujet</span>}
            id="subject"
            name="subject"
            value={talkData.subject}
            onChange={handleChange}
            required
            placeholder="De quoi parlez-vous?"
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          
          <FormField
            label={<span className="font-semibold text-gray-900 dark:text-white">Durée (min)</span>}
            id="duration"
            name="duration"
            value={talkData.duration}
            onChange={handleChange}
            required
            placeholder="Durée en minutes"
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            type="number"
          />
          
          <FormField
            label={<span className="font-semibold text-gray-900 dark:text-white">Présentateur/trice</span>}
            id="presenter"
            name="presenter"
            value={talkData.presenter}
            onChange={handleChange}
            required
            placeholder="Votre nom"
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          
          <FormField
            label={<span className="font-semibold text-gray-900 dark:text-white">Objectif</span>}
            id="objective"
            name="objective"
            value={talkData.objective}
            onChange={handleChange}
            required
            placeholder="Quel est l'objectif du talk ?"
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            type="textarea"
          />
          
          <Button
            type="submit"
            className="w-full bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Créer le Talk
          </Button>
        </form>
      </div>
      
      {isFormSubmitted && (
        <div className="p-4 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 border-t border-green-200 dark:border-green-700 transition-colors">
          Talk créé avec succès!
        </div>
      )}
    </div>
  );
};

export default TalkForm; 