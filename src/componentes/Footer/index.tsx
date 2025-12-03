import { Link } from 'react-router';
import styles from './styles.module.css';


 export function Footer(){ 
    return (
    <footer className={styles.footer}>
        <a href=''>Entenda como funciona a técnica pomodoro</a>

        <Link to='/about-pomodoro/'>
        Entenda como funciona a técnica pomodoro
      </Link>
      <Link to='/'>  

         <a href=''>Cronos pomodoro &copy; {new Date().getFullYear()}- feito com</a>
         </Link>
    </footer>
);
}


