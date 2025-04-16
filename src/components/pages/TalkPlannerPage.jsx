import MainLayout from '../templates/MainLayout';
import TalkForm from '../organisms/TalkForm';
import TalkList from '../organisms/TalkList';
import useTalkStore from '../../stores/useTalkStore';

const TalkPlannerPage = () => {
  const addTalk = useTalkStore((state) => state.addTalk);

  return (
    <MainLayout>
      <TalkForm onSubmit={addTalk} />
      <TalkList />
    </MainLayout>
  );
};

export default TalkPlannerPage; 