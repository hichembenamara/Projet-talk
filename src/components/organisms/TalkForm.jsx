// Composant formulaire pour créer un talk
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

  // Met à jour l'état lorsqu'un champ est modifié
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTalkData(prevData => ({ ...prevData, [name]: value }));
  };
  // Gère la date
  const handleDateChange = (date) => {
    setTalkData(prevData => ({ ...prevData, date }));
  };
  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    let isoDate = '';
    if (talkData.date instanceof Date && !isNaN(talkData.date)) {
      isoDate = talkData.date.toISOString().split('T')[0];
    } else {
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <FormField
          label={<span className="font-semibold text-gray-900 dark:text-white">Titre de la présentation</span>}
          id="title"
          name="title"
          value={talkData.title}
          onChange={handleChange}
          required
          placeholder="Titre du talk"
        />
        <FormField
          label={<span className="font-semibold text-gray-900 dark:text-white">Sujet</span>}
          id="subject"
          name="subject"
          value={talkData.subject}
          onChange={handleChange}
          required
          placeholder="Sujet du talk"
        />
        <FormField
          label={<span className="font-semibold text-gray-900 dark:text-white">Durée (min)</span>}
          id="duration"
          name="duration"
          value={talkData.duration}
          onChange={handleChange}
          required
          placeholder="Durée en minutes"
        />
        <FormField
          label={<span className="font-semibold text-gray-900 dark:text-white">Présentateur/trice</span>}
          id="presenter"
          name="presenter"
          value={talkData.presenter}
          onChange={handleChange}
          required
          placeholder="Nom du présentateur"
        />
        <FormField
          label={<span className="font-semibold text-gray-900 dark:text-white">Objectif</span>}
          id="objective"
          name="objective"
          value={talkData.objective}
          onChange={handleChange}
          required
          placeholder="Quel est l'objectif du talk ?"
          type="textarea"
        />
        <div>
          <span className="font-semibold text-gray-900 dark:text-white block mb-1">Date</span>
          <DateInput value={talkData.date} onChange={handleDateChange} required />
        </div>
        <Button type="submit" className="w-full bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
          Créer le Talk
        </Button>
      </form>
      {isFormSubmitted && (
        <div className="p-4 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded mt-4 text-center">
          Talk créé avec succès !
        </div>
      )}
    </div>
  );
};

export default TalkForm;