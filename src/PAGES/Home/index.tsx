import { Container } from "../../componentes/Container";
import { CountDown } from "../../componentes/CountDown";

import { MainForm } from "../../componentes/mainForm";
import { MainTemplets } from "../../Templets";

export function Home() {
  return (
    <MainTemplets>
      <Container>
        <CountDown />
      </Container>

      <Container>
        <MainForm />
      </Container>
    </MainTemplets>
  );
 }