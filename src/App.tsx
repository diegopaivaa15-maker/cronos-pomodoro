

import './styles/theme.css';
import './styles/global.css';

import { TaskContextProvider } from './TaskContext/TaskContext/TaskProvider';
import { MessagesContainer } from './componentes/messageContainer';
import { Roteador } from './Roteador';


export function App() {
  return ( 
   <TaskContextProvider>
    <MessagesContainer> 
     <Roteador/>
   </MessagesContainer>
 </TaskContextProvider> 
  );
}