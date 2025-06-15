import { Button, Stack, Title, Container } from '@mantine/core';
import { useNavigate } from 'react-router';
import { useApi } from '../hooks/useApi';
import { useAuth } from '../context/AuthContext';

export function SSOLogin() {
  const navigate = useNavigate();
  const { callApi } = useApi<{ token: string; username: string }>();
  const { setBearerToken } = useAuth();

  const handleLogin = async (role: string) => {
    try {
      console.log('Login handler called with role:', role);
      
      var body;

      switch (role) {
        case 'Recruiter @ Foogle':
          body = {
            username: 'foogle',
            password: 'foogle123'
          }
          break;
        case 'Engineering Headhunter @ b17f':
          body = {
            username: 'b17f',
            password: 'b17frecruit'
          }
          break;
        case 'Recruiter @ ForceSales':
          body = {
            username: 'forcesales',
            password: 'forcesales123'
          }
          break;
        default:
          console.error('Unknown role:', role);
          return;
      }

      const response = await callApi('/auth', {
        method: 'POST',
        body: JSON.stringify(body)
      });

      if (response.token) {
        setBearerToken(response.token); 
        navigate('/chat');
      } else {
        console.error('Login failed:', response);
      }
    } catch (error) {
      console.error('Error in handleLogin:', error);
    }
  };

  return (
    <Container size="sm" py="xl">
      <Stack align="center" gap="xl">
        <Title order={2}>Select your role</Title>
        <Stack gap="md" w="100%">
          <Button 
            size="lg" 
            variant="light" 
            onClick={() => handleLogin('Recruiter @ Foogle')}
          >
            Recruiter @ Foogle
          </Button>
          <Button 
            size="lg" 
            variant="light" 
            onClick={() => handleLogin('Engineering Headhunter @ b17f')}
          >
            Engineering Headhunter @ b17f
          </Button>
          <Button 
            size="lg" 
            variant="light" 
            onClick={() => handleLogin('Recruiter @ ForceSales')}
          >
            Recruiter @ ForceSales
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
} 