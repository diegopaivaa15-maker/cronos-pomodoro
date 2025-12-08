import { SaveIcon } from 'lucide-react';
import { Container } from '../../componentes/Container';
import { Heading } from '../../componentes/Heading';
import { DefaultInput } from '../../componentes/DefaultInput';
import { MainTemplets } from '../../Templets';
import { DefaultButton } from '../../componentes/DefaultButton';


export function Settings() {
  return (
    
    <MainTemplets>
      <Container>
        <Heading>Configurações</Heading>
      </Container>

      <Container>
        <p style={{ textAlign: 'center' }}>
          Modifique as configurações para tempo de foco, descanso curso e
          descanso longo.
        </p>
      </Container>

      <Container>
        <form action='' className='form'>
          <div className='formRow'>
            <DefaultInput id='workTime' labelText='Foco' />
          </div>
          <div className='formRow'>
            <DefaultInput id='shortBreakTime' labelText='Descanso curto' />
          </div>
          <div className='formRow'>
            <DefaultInput id='longBreakTime' labelText='Descanso longo' />
          </div>
          <div className='formRow'>
            <DefaultButton
              icon={<SaveIcon />}
              aria-label='Salvar configurações'
              title='Salvar configurações'
            />
          </div>
        </form>
      </Container>
    </MainTemplets>
  );
}