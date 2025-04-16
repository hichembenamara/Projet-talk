//creation d'un composant qui permet qui affiche les details de la presentation
import { useState } from 'react';
import Button from "../atoms/Button";
import { FaTrash, FaClock, FaUser, FaBullseye, FaBookOpen, FaCalendarAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import DateInput from '../atoms/DateInput';

const TalkItem = ({ talk, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  // Initialisation : convertir la date string en objet Date si besoin
  const [editedTalk, setEditedTalk] = useState({
    ...talk,
    date: talk.date ? new Date(talk.date) : new Date()
  });
  const isPast = new Date(talk.date) < new Date();
  
  const pastStyle = isPast
    ? 'opacity-90 grayscale relative bg-red-100 dark:bg-red-900 border-red-400 dark:border-red-700'
    : 'bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-800';
  const pastText = isPast
    ? 'text-red-800 dark:text-red-200'
    : 'text-gray-900 dark:text-white';

  const formattedDate = new Date(talk.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleEdit = () => {
    setEditedTalk({ ...talk, date: talk.date ? new Date(talk.date) : new Date() });
    setIsEditing(true);
  };

  const handleSave = () => {
    // formatte la date en ISO pour stockage
    let isoDate = '';
    if (editedTalk.date instanceof Date && !isNaN(editedTalk.date)) {
      isoDate = editedTalk.date.toISOString().split('T')[0];
    } else {
      isoDate = editedTalk.date;
    }
    onUpdate(talk.id, { ...editedTalk, date: isoDate });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTalk({ ...talk, date: talk.date ? new Date(talk.date) : new Date() });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTalk(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Pour le calendrier
  const handleDateChange = (date) => {
    setEditedTalk(prev => ({
      ...prev,
      date: date
    }));
  };

  if (isEditing) {
    return (
      <div className={`p-4 sm:p-6 border rounded-lg shadow-sm ${pastStyle}`}>
        <div className="space-y-4">
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titre</label>
              <input
                type="text"
                name="title"
                value={editedTalk.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                disabled={isPast}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
              <DateInput
                name="date"
                value={editedTalk.date}
                onChange={handleDateChange}
                required
                disabled={isPast}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sujet</label>
              <input
                type="text"
                name="subject"
                value={editedTalk.subject}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                disabled={isPast}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Durée (minutes)</label>
              <input
                type="number"
                name="duration"
                value={editedTalk.duration}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                disabled={isPast}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Présentateur</label>
              <input
                type="text"
                name="presenter"
                value={editedTalk.presenter}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                disabled={isPast}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Objectif</label>
              <textarea
                name="objective"
                value={editedTalk.objective}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                disabled={isPast}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button onClick={handleSave} className="bg-green-600 text-white" disabled={isPast}>
              <FaSave className="w-4 h-4" />
              <span>Enregistrer</span>
            </Button>
            <Button onClick={handleCancel} className="bg-gray-400 text-white">
              <FaTimes className="w-4 h-4" />
              <span>Annuler</span>
            </Button>
          </div>
          {isPast && (
            <div className="absolute top-2 right-2 bg-red-600 dark:bg-red-400 text-white dark:text-gray-900 text-xs px-2 py-1 rounded shadow-lg font-bold border border-red-700 dark:border-red-200">Expiré</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`p-3 sm:p-4 md:p-6 border rounded-lg shadow-sm hover:shadow-md transition-all ${pastStyle}`}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
        <div className="space-y-2 sm:space-y-3 flex-1">
          <div className={`flex items-center gap-2 ${pastText}`}>
            <FaBookOpen className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            <span className="font-semibold text-base sm:text-lg">{talk.title}</span>
            {isPast && (
              <span className="ml-2 bg-red-600 dark:bg-red-400 text-white dark:text-gray-900 text-xs px-2 py-1 rounded shadow font-bold border border-red-700 dark:border-red-200">Expiré</span>
            )}
          </div>
          <div className={`flex items-center gap-2 text-sm ${isPast ? 'text-red-700 dark:text-red-300' : 'text-gray-600 dark:text-gray-300'}`}> 
            <FaCalendarAlt className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          <div className={`flex items-center gap-2 text-sm ${isPast ? 'text-red-700 dark:text-red-300' : 'text-gray-600 dark:text-gray-300'}`}> 
            <FaClock className="w-4 h-4" />
            <span>{talk.duration} minutes</span>
          </div>
          <div className={`flex items-center gap-2 text-sm ${isPast ? 'text-red-700 dark:text-red-300' : 'text-gray-600 dark:text-gray-300'}`}> 
            <FaUser className="w-4 h-4" />
            <span>{talk.presenter}</span>
          </div>
          <div className={`flex items-start text-sm ${isPast ? 'text-red-700 dark:text-red-300' : 'text-gray-600 dark:text-gray-300'}`}> 
            <FaBullseye className="w-4 h-4 mt-1" />
            <span>
              <span className="font-medium mr-2">Objectif:</span>
              {talk.objective}
            </span>
          </div>
        </div>
        {!isPast && (
          <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
            <Button onClick={handleEdit} className="bg-yellow-500 text-white">
              <FaEdit className="w-4 h-4" />
              <span>Modifier</span>
            </Button>
            <Button onClick={() => onDelete(talk.id)} className="bg-red-600 text-white">
              <FaTrash className="w-4 h-4" />
              <span>Supprimer</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TalkItem;
