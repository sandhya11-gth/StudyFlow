import { StudyFlowContext } from './studyFlowContext.js';
import { useStudyData } from '../hooks/useStudyData.js';

export function StudyFlowProvider({ children }) {
  const store = useStudyData();
  return <StudyFlowContext.Provider value={store}>{children}</StudyFlowContext.Provider>;
}