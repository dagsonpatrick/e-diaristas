import { Container } from "@mui/material";
import { SafeEnvironmentContainer } from "./SafeEnvironment.styled";

const SafeEnvironment = () => {
  return (
    <SafeEnvironmentContainer>
      <Container>
        Ambiente 100% Seguro <i className="twf-lock" />
      </Container>
    </SafeEnvironmentContainer>
  );
};

export default SafeEnvironment;
