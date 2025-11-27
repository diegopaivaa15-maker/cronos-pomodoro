// useReducer: hook do React que recebe um reducer e um estado inicial
// reducer: função que recebe o estado atual e uma ação, e retorna o novo estado
// state: o estado atual
// action: a ação disparada, geralmente, e um objeto com type e opcionalmente payload
// type: o tipo da ação geralmente uma string pode ser enum, constante, etc.
// playload: os dados extras enviados junto com o action, se necessario para atualizar o estado 

import type { TaskModel } from '../../models/TaskModel';

export enum TaskActionTypes {
    START_TASK = 'START_TASK',
    INTERRUPT_TASK = 'INTERRUPT_TASK',
    RESET_STATE = 'RESET_STATE',
    COUNT_DOWN = 'COUNT_DOWN',
    COMPLETE_TASK = 'COMPLETE_TASK',
}

export type TaskActionsWithPayload = {
    [x: string]: any;
    type: TaskActionTypes.START_TASK;
    playload: TaskModel;
} | {
    [x: string]: any;
    type: TaskActionTypes.COUNT_DOWN;
    playload: {secondsRemaining: number};
};

export type TaskActionsWithouPayload = {

    type: TaskActionTypes.RESET_STATE;
} | {
     type: TaskActionTypes.INTERRUPT_TASK;
} | {
     type: TaskActionTypes.COMPLETE_TASK;
};

export type TaskActionModel = TaskActionsWithPayload | TaskActionsWithouPayload;