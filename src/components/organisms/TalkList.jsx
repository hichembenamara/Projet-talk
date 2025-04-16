//creation d'un composant qui affiche une liste de presentation 
import { useState } from 'react';
import useTalkStore from '../../stores/useTalkStore';
import TalkItem from '../molecules/TalkItem';
import { FaCalendarAlt, FaSort, FaClock } from 'react-icons/fa';
import Button from '../atoms/Button';

const TalkList = () => {
  const talks = useTalkStore(state => state.talks);
  const sortOrder = useTalkStore(state => state.sortOrder);
  const setSortOrder = useTalkStore(state => state.setSortOrder);
  const getSortedTalks = useTalkStore(state => state.getSortedTalks);
  const removeTalk = useTalkStore(state => state.removeTalk);
  const updateTalk = useTalkStore(state => state.updateTalk);

  const [localSort, setLocalSort] = useState(sortOrder);

  const handleSortChange = (order) => {
    setSortOrder(order);
    setLocalSort(order);
  };

  if (!Array.isArray(talks)) {
    return (
      <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
        <p className="text-red-600 dark:text-red-400">Une erreur est survenue lors du chargement des talks.</p>
      </div>
    );
  }

  if (talks.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center p-6">
          <FaCalendarAlt className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
          <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl font-medium">
            Aucun talk planifié pour le moment.
          </p>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">
            Utilisez le formulaire pour ajouter un nouveau talk.
          </p>
        </div>
      </div>
    );
  }

  const sortedTalks = getSortedTalks();

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 sm:gap-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            Liste des Talks
          </h2>
          <div className="flex gap-2">
            <Button
              onClick={() => handleSortChange('date')}
              className={`flex items-center gap-2 px-2 py-1 text-xs sm:text-sm rounded-md border transition-colors font-semibold ${localSort === 'date' ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-400 dark:text-gray-900 dark:border-blue-400' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-blue-900'}`}
            >
              <FaSort className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Date</span>
            </Button>
            <Button
              onClick={() => handleSortChange('duration')}
              className={`flex items-center gap-2 px-2 py-1 text-xs sm:text-sm rounded-md border transition-colors font-semibold ${localSort === 'duration' ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-400 dark:text-gray-900 dark:border-blue-400' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-blue-900'}`}
            >
              <FaClock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Durée</span>
            </Button>
          </div>
        </div>
        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 px-2 sm:px-3 py-1 rounded-full shadow-sm border border-gray-200 dark:border-gray-600">
          {talks.length} talk{talks.length > 1 ? 's' : ''}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        <div className="grid gap-3 sm:gap-4 content-start">
          {sortedTalks.map(talk => (
            <TalkItem
              key={talk.id}
              talk={talk}
              onDelete={removeTalk}
              onUpdate={updateTalk}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TalkList;