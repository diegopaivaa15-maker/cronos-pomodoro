import {HistoryIcon, HouseIcon,  MoonIcon,  SettingsIcon, SunIcon, } from 'lucide-react';
import styles from './styles.module.css';
import { useState, useEffect} from 'react'; 
import { Link } from 'react-router';

type availableTheme = 'dark' | 'light'
 export function Menu(){ // fazendo a desisturação com o children assim é mais facil
    const [theme, setTheme] = useState <availableTheme> (() => {
        const storageTheme = (localStorage.getItem('theme') as availableTheme ) || 'dark';
        return storageTheme
    });

    const nextThemeIcon ={  // aqui e mudar o icone se tiver mudado o tema
        dark: <SunIcon/>,
        light: <MoonIcon/>
    }

    function handleThemeChange( 
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ){
        event?.preventDefault();
        
        setTheme(prevTheme => {
            const nextTheme = prevTheme === 'dark' ? 'light' : 'dark'
            return nextTheme;
        });
        // document.documentElement.setAttribute('data-theme', theme); isso resolveria a cor clara porem da probelmas as vezes vamos fazer outro huck
    }

    useEffect(() =>{
      document.documentElement.setAttribute('data-theme', theme);
       localStorage.setItem('theme', theme); // salva na pagina serve para buscar o valor para carega a pagina e continuar branco
    },[theme]);


    return (  // arial e title é para quando passa o mouse vai aparece a msg
    <nav className={styles.menu}>
        
         <Link
        className={styles.menuLink} to="/" aria-label='Ir para Home' title='Ir para Home'>                
        <HouseIcon/>
        </Link>  
        

        <a className={styles.menuLink} href="#" aria-label='Ver Historico' title='Ver Historico'>
            <HistoryIcon/>
        </a>

        <a className={styles.menuLink} href="#" aria-label='Configurações' title='Configurações'>
            <SettingsIcon/>
        </a>

        <a className={styles.menuLink} href="#" aria-label='Mudar Tema' title='Mudar Tema' onClick={handleThemeChange}>
            {nextThemeIcon[theme]}
        </a>
    </nav>
);
}



