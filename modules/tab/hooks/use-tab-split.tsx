import { ActionDispatch, useReducer } from 'react';
import {
  ItemSplitType,
  TabItemSplitType,
  TabParticipantType,
} from '../types/TabType';

type ReducerAction =
  | { type: 'ADD_PARTICIPANT'; payload: TabItemSplitType }
  | { type: 'REMOVE_PARTICIPANT'; payload: string }
  | { type: 'SET_SPLIT_TYPE'; payload: ItemSplitType }
  | {
      type: 'CHANGE_PARTICIPANT_AMOUNT';
      payload: { id: string; value: number };
    }
  | { type: 'SET_TOTAL_AMOUNT'; payload: number };

export interface TabSplitHook {
  split: {
    type: ItemSplitType;
    participants: TabItemSplitType[];
    totalAmount: number;
    amountLeft: number;
  };
  dispatch: ActionDispatch<[action: ReducerAction]>;
}

export default function useTabSplit({
  participants,
  initialSplitType,
  totalAmount,
}: {
  participants: TabParticipantType[];
  initialSplitType: ItemSplitType;
  totalAmount: number;
}): TabSplitHook {
  const [split, dispatch] = useReducer(
    reducer,
    { participants, splitType: initialSplitType, totalAmount },
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
  totalAmount,
}: {
  participants: TabParticipantType[];
  splitType: ItemSplitType;
  totalAmount: number;
}): TabSplitHook['split'] {
  return {
    type: splitType,
    participants: participants.map((participant) => ({
      participant,
      split_type: splitType,
      split_amount: 0,
    })),
    totalAmount,
    amountLeft: totalAmount,
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
    case 'SET_TOTAL_AMOUNT':
      return {
        ...state,
        totalAmount: action.payload,
        amountLeft:
          action.payload -
          state.participants.reduce(
            (acc, participant) => acc + participant.split_amount,
            0
          ),
      };
    case 'CHANGE_PARTICIPANT_AMOUNT':
      const participants = state.participants.map((participant) => {
        if (participant.participant.id === action.payload.id) {
          return {
            ...participant,
            split_amount: action.payload.value,
          };
        }
        return participant;
      });

      return {
        ...state,
        participants: participants,
        amountLeft:
          state.totalAmount -
          participants.reduce(
            (acc, participant) => acc + participant.split_amount,
            0
          ),
      };
    default:
      return state;
  }
}
