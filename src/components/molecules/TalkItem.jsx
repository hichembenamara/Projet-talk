// Composant qui affiche les détails d'un talk et permet l'édition/suppression
import { useState } from 'react';
import Button from "../atoms/Button";
import { FaTrash, FaUser, FaBullseye, FaBookOpen, FaCalendarAlt, FaEdit, FaSave, FaTimes, FaClock } from 'react-icons/fa';
import DateInput from '../atoms/DateInput';

const TalkItem = ({ talk, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTalk, setEditedTalk] = useState({ ...talk, date: talk.date ? new Date(talk.date) : new Date() });
  const isPast = new Date(talk.date) < new Date();

  // Style selon si le talk est passé
  const pastStyle = isPast
    ? 'opacity-90 grayscale relative bg-red-100 dark:bg-red-900 border-red-400 dark:border-red-700'
    : 'bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-800';

  const handleEdit = () => {
    setEditedTalk({ ...talk, date: talk.date ? new Date(talk.date) : new Date() });
    setIsEditing(true);
  };
  const handleCancel = () => {
    setEditedTalk({ ...talk, date: talk.date ? new Date(talk.date) : new Date() });
    setIsEditing(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTalk(prev => ({ ...prev, [name]: value }));
  };
  const handleSave = () => {
    let isoDate = '';
    if (editedTalk.date instanceof Date && !isNaN(editedTalk.date)) {
      isoDate = editedTalk.date.toISOString().split('T')[0];
    } else {
      isoDate = editedTalk.date;
    }
    onUpdate(talk.id, { ...editedTalk, date: isoDate });
    setIsEditing(false);
  };

  return (
    <div className={`border rounded-lg p-4 mb-4 shadow-sm flex flex-col gap-2 ${pastStyle}`}>
      {isEditing ? (
        <form className="space-y-2" onSubmit={e => { e.preventDefault(); handleSave(); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titre</label>
              <input name="title" value={editedTalk.title} onChange={handleChange} className="w-full px-2 py-1 rounded border" required disabled={isPast} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
              <DateInput value={editedTalk.date} onChange={date => setEditedTalk(prev => ({ ...prev, date }))} disabled={isPast} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sujet</label>
              <input name="subject" value={editedTalk.subject} onChange={handleChange} className="w-full px-2 py-1 rounded border" disabled={isPast} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Durée (minutes)</label>
              <input name="duration" value={editedTalk.duration} onChange={handleChange} className="w-full px-2 py-1 rounded border" disabled={isPast} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Présentateur</label>
              <input name="presenter" value={editedTalk.presenter} onChange={handleChange} className="w-full px-2 py-1 rounded border" disabled={isPast} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Objectif</label>
              <input name="objective" value={editedTalk.objective} onChange={handleChange} className="w-full px-2 py-1 rounded border" disabled={isPast} />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="submit" className="bg-green-600 text-white hover:bg-green-700"> <FaSave /> Sauver </Button>
            <Button type="button" className="bg-gray-300 text-gray-700 hover:bg-gray-400" onClick={handleCancel}> <FaTimes /> Annuler </Button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
          <div>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <FaBookOpen /> {talk.title}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <FaCalendarAlt /> {talk.date}
              <FaClock className="ml-2" /> {talk.duration} min
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <FaUser /> {talk.presenter}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <FaBullseye /> {talk.objective}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <FaBookOpen /> {talk.subject}
            </div>
          </div>
          <div className="flex gap-2 justify-end md:justify-start mt-2 md:mt-0">
            <Button className="bg-yellow-500 text-white hover:bg-yellow-600" onClick={handleEdit} disabled={isPast}> <FaEdit /> </Button>
            <Button className="bg-red-600 text-white hover:bg-red-700" onClick={() => onDelete(talk.id)}> <FaTrash /> </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TalkItem;
