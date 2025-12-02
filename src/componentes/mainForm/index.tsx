
import { PlayCircleIcon, StopCircleIcon } from "lucide-react"
import { Cycles } from "../Cycles/indext";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../TaskContext/TaskContext/UseTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycletype } from "../../utils/getNextCycletype";
import { TaskActionTypes } from "../../TaskContext/TaskContext/TaskActions";
import { Tips } from "../tips";
import { toast } from "react-toastify";
import { showMessage } from "../../adpters/showMessage";


export function MainForm(){
  const {state, dispatch } = useTaskContext();
    const taskNameInput = useRef<HTMLInputElement> (null);

    //Ciclos
    const nextCycle = getNextCycle(state.currentCycle);
    const nextCyletype = getNextCycletype (nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>){
      event.preventDefault();
  
      if(taskNameInput.current === null) return;

      const taskName= taskNameInput.current.value.trim();
     
      if(taskName){
         toast.warn('Digite o nome da tarefa');
        return 
      }
      const newTask: TaskModel = {
        id: Date.now().toString(),
        name: taskName,
        startDate: Date.now(),
        completeDate: null,
        interruptDate: null,
        duration: state.config[nextCyletype],
        type: nextCyletype,
      };
    
    }

    function haldeInterrrupTask (){
      showMessage.dismiss();
      showMessage.error('Tarefa interrompida!');
      dispatch({type: TaskActionTypes.INTERRUPT_TASK})
    
    }

  return ( 
    
    <form onSubmit={handleCreateNewTask} className='form' action=''>
      <div className='formRow'>
        <DefaultInput
          labelText='task'
          id='meuInput'
          type='text'
          placeholder='Digite algo'
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>

      <div className='formRow'>
        <Tips/>
      </div>

      {state.currentCycle > 0 &&(
        <div className="formRow">
          <Cycles/>
        </div>
      )}

      <div className='formRow'>
        {!state.activeTask && (
           <DefaultButton 
           aria-label="Iniciar nova tarefa" 
           type="submit" 
           icon={<PlayCircleIcon />} 
           key='botao_submit'
           />
           )} 
           
           {!!state.activeTask && (   //resolvendo um problema com isso e com key mais pode ser so o key
            <DefaultButton 
            aria-label="Parar tarefa atual" 
            title="Parar tarefa atual"
           type="button" 
           color="red"
           icon={<StopCircleIcon/>} 
           onClick={haldeInterrrupTask}
            key='botao_button'
           />
          
        )};
      </div>
    </form>
  );
};