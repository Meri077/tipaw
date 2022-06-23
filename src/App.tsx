import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import SignupForm from './components/SignupForm';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`

const App: React.FC = () => {
  return (
    <Wrapper>
      <SignupForm />
    </Wrapper>
  );
}

export default App;
