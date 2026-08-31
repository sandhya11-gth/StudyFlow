import { useContext } from 'react';
import { StudyFlowContext } from './studyFlowContext.js';

export function useStudyFlow() {
  return useContext(StudyFlowContext);
}