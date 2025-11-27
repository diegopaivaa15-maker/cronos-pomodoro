import { useEffect, useReducer} from "react";
import { TaskContext } from "./TaskContext";
import { initialTaskState } from "../initialTaskState";
import { taskReducer } from "./TaskReducer";
import { Timeworkermenage } from "../../workes/TimerworkerMenage"
import { TaskActionTypes } from "./TaskActions";



  type TtaskContextProviderProps = {
    children: React.ReactNode;
  };

export function TaskContextProvider({children}:TtaskContextProviderProps){
    const [ state,dispatch ] = useReducer(taskReducer, initialTaskState);

    const Worker = Timeworkermenage.getInstance();

    Worker.onmessage(e => {
      const CountDownSeconds = e.data;
      console.log(CountDownSeconds);

      if(CountDownSeconds <= 0){
         dispatch({
        type: TaskActionTypes.COMPLETE_TASK,
        });
        Worker.terminate();
      }else{    
        dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        playload: {secondsRemaining: CountDownSeconds},
        });
      }
    });

    useEffect(()=> {
        if(!state.activeTask){
          console.log('Worker por falta de activeTask')
          Worker.terminate();
        }
        Worker.postMessage(state);
    },[Worker,state]);
    
   return (
    <TaskContext.Provider value={{ state,dispatch }}>
    {children}
    </TaskContext.Provider>
  );
}
