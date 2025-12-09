import { TrashIcon } from 'lucide-react';
import { Container } from '../../componentes/Container';
import { Heading } from '../../componentes/Heading';
import { DefaultButton } from '../../componentes/DefaultButton';
import { MainTemplets } from '../../Templets';
import { useTaskContext } from '../../TaskContext/TaskContext/UseTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { useEffect, useState } from 'react';
import {  sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import styles from './styless.module.css';
import { TaskActionTypes } from '../../TaskContext/TaskContext/TaskActions';
import { showMessage } from '../../adapters/showMessage';




export function History() {
  const { state, dispatch } = useTaskContext();
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const hasTasks = state.tasks.length > 0;
    const [sortTasksOptions, setSortTaskOptions] = useState<SortTasksOptions>(
      
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: 'startDate',
        direction: 'desc',
      };
    },
  );

   useEffect(() => {
    setSortTaskOptions(prevState => ({
      ...prevState,
      tasks: sortTasks({
        tasks: state.tasks,
        direction: prevState.direction,
        field: prevState.field,
      }),
    }));
  }, [state.tasks]);

  useEffect(() => {
    document.title = 'Histórico - Chronos Pomodoro';
  }, []);

  useEffect(() => {
    if (!confirmClearHistory) return;

    setConfirmClearHistory(false);

    dispatch({ type: TaskActionTypes.RESET_STATE });
  }, [confirmClearHistory, dispatch]);

  useEffect(() => {
    return () => {
      showMessage.dismiss();
    };
  }, []);

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';

    setSortTaskOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  function handleResetHistory(){
     showMessage.dismiss();
    showMessage.confirm('Tem certeza?', confirmation => {
      setConfirmClearHistory(confirmation);
    });
  }
  //   if(!confirm('tem certeza')) return
  //   dispatch ({type: TaskActionTypes.RESET_STATE});
  // }

    return (
    <MainTemplets>
      <Container>
        <Heading>
          <span>History</span>
          {hasTasks && ( 
          <span className={styles.buttonContainer}>
            <DefaultButton
              icon={<TrashIcon />}
              color='red'
              aria-label='Apagar todo o histórico'
              title='Apagar histórico'
              onClick={handleResetHistory}
            />
          </span>
          )}
        </Heading>
      </Container>

      <Container>
        {hasTasks && ( 
      <div className= {styles.responsiveTable}> 
        <table> 
          <thead> 
            <tr>
         <th
                  onClick={() => handleSortTasks({ field: 'name' })}
                  className={styles.thSort}
                >
                  Tarefa ↕
                </th>
                <th
                  onClick={() => handleSortTasks({ field: 'duration' })}
                  className={styles.thSort}
                >
                  Duração ↕
                </th>
                <th
                  onClick={() => handleSortTasks({ field: 'startDate' })}
                  className={styles.thSort}
                >
                  Data ↕
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
                </thead>

            <tbody>
               {sortTasksOptions.tasks.map(task => {
                const taskTypeDictionary = {
                  workTime: 'Foco',
                  shortBreakTime: 'Descanso curto',
                  longBreakTime: 'Descanso longo',
                };
                
                return (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.duration}min</td>
                    <td>{formatDate(task.startDate)}</td>
                     <td>{getTaskStatus(task, state.activeTask)}</td>
                     <td>{taskTypeDictionary[task.type]}</td>
                  </tr>
                );
              })}
            </tbody>
            </table>
            </div>
            )}
      </Container>
       {!hasTasks &&( 
        <p style = {{textAlign: 'center'}}>  Ainda nao existe tarefas criadas.</p>
       
       )}; 
    </MainTemplets>
  );
}