

import './styles/theme.css';
import './styles/global.css';
import { Home } from './PAGES';
import { TaskContextProvider } from './TaskContext/TaskContext/TaskProvider';
import { MessagesContainer } from './componentes/messageContainer';


export function App() {
  return ( 
   <TaskContextProvider>
    <MessagesContainer> 
      <Home />  
      </MessagesContainer>
 </TaskContextProvider> 
  );
}