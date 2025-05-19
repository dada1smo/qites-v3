import { ActionDispatch, useReducer } from 'react';
import {
  ItemSplitType,
  TabItemSplitType,
  TabParticipantType,
} from '../types/TabType';

type ReducerAction =
  | { type: 'ADD_PARTICIPANT'; payload: TabItemSplitType }
  | { type: 'REMOVE_PARTICIPANT'; payload: string }
  | { type: 'SET_SPLIT_TYPE'; payload: ItemSplitType };

export interface TabSplitHook {
  split: {
    type: ItemSplitType;
    participants: TabItemSplitType[];
  };
  dispatch: ActionDispatch<[action: ReducerAction]>;
}

export default function useTabSplit({
  participants,
  initialSplitType,
}: {
  participants: TabParticipantType[];
  initialSplitType: ItemSplitType;
}): TabSplitHook {
  const [split, dispatch] = useReducer(
    reducer,
    { participants, splitType: initialSplitType },
    createInitialSplit
  );

  return {
    split,
    dispatch,
  };
}

function createInitialSplit({
  participants,
  splitType,
}: {
  participants: TabParticipantType[];
  splitType: ItemSplitType;
}): TabSplitHook['split'] {
  return {
    type: splitType,
    participants: participants.map((participant) => ({
      participant,
      split_type: splitType,
      split_value: 0,
    })),
  };
}

function reducer(state: TabSplitHook['split'], action: ReducerAction) {
  switch (action.type) {
    case 'ADD_PARTICIPANT':
      return {
        ...state,
        participants: [...state.participants, action.payload],
      };
    case 'REMOVE_PARTICIPANT':
      return {
        ...state,
        participants: state.participants.filter(
          (participant) => participant.participant.id !== action.payload
        ),
      };
    case 'SET_SPLIT_TYPE':
      return {
        ...state,
        type: action.payload,
        participants: state.participants.map((participant) => ({
          ...participant,
          split_type: action.payload,
        })),
      };
    default:
      return state;
  }
}
