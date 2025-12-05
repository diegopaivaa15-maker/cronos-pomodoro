import { useEffect, useReducer, useRef} from "react";
import { TaskContext } from "./TaskContext";
import { initialTaskState } from "../initialTaskState";
import { taskReducer } from "./TaskReducer";
import { Timeworkermenage } from "../../workes/TimerworkerMenage"
import { TaskActionTypes } from "./TaskActions";
import { loadBeep } from "../../utils/LodBaap";
import type { TaskStateModel } from "../../models/TaskStateModel";



  type TtaskContextProviderProps = {
    children: React.ReactNode;
  };

export function TaskContextProvider({children}:TtaskContextProviderProps){
    const [ state,dispatch ] = useReducer(taskReducer, initialTaskState, () =>{
        const storageState = localStorage.getItem('state');

    if (storageState === null) return initialTaskState;

    const parsedStorageState = JSON.parse(storageState) as TaskStateModel;

    return {
      ...parsedStorageState,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: '00:00',
    };
    });
     
    const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);

    const Worker = Timeworkermenage.getInstance();

    Worker.onmessage(e => {
      const CountDownSeconds = e.data;

      if(CountDownSeconds <= 0){
         if (playBeepRef.current) {
        playBeepRef.current();
        playBeepRef.current = null;
      }
      }else{    
        dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        playload: {secondsRemaining: CountDownSeconds},
        });
      }
    });

    useEffect(()=> {
      localStorage.setItem('state', JSON.stringify(state));
        if(!state.activeTask){
          Worker.terminate();
        }

        document.title= '${state.formattSecondsRemaining} - Cronos Pomodoro';

        Worker.postMessage(state);
    },[Worker,state]);

    useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

    
   return (
    <TaskContext.Provider value={{ state,dispatch }}>
    {children}
    </TaskContext.Provider>
  );
}
