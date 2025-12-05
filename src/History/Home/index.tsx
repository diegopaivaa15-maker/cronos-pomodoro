import { TrashIcon } from 'lucide-react';
import { Container } from '../../componentes/Container';
import { Heading } from '../../componentes/Heading';
import { DefaultButton } from '../../componentes/DefaultButton';
import { MainTemplets } from '../../Templets';
import { useTaskContext } from '../../TaskContext/TaskContext/UseTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { useState } from 'react';
import {  sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import styles from './styless.module.css';



export function History() {
  const { state } = useTaskContext();
    const [sortTasksOptions, setSortTaskOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: 'startDate',
        direction: 'desc',
      };
    },
  );

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
    return (
    <MainTemplets>
      <Container>
        <Heading>
          <span>History</span>
          <span className={styles.buttonContainer}>
            <DefaultButton
              icon={<TrashIcon />}
              color='red'
              aria-label='Apagar todo o histórico'
              title='Apagar histórico'
            />
          </span>
        </Heading>
      </Container>

      <Container>
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
      </Container>
    </MainTemplets>
  );
}