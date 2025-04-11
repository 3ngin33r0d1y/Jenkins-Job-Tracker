import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: var(--background-color);
`;

const LoginCard = styled.div`
  background-color: var(--surface-color);
  border-radius: 8px;
  padding: 30px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 30px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: var(--text-color);
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px;
  background-color: var(--background-color);
  border: 1px solid #333;
  border-radius: 4px;
  color: var(--text-color);
  
  &:focus {
    border-color: var(--primary-color);
    outline: none;
  }
`;

const Button = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 10px;
  
  &:hover {
    background-color: var(--secondary-color);
  }
  
  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: var(--error-color);
  margin-top: 10px;
  text-align: center;
`;

const ToggleText = styled.p`
  color: var(--text-secondary-color);
  text-align: center;
  margin-top: 20px;
  
  span {
    color: var(--primary-color);
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    jenkinsUrl: '',
    jenkinsToken: ''
  });
  const [showJenkinsFields, setShowJenkinsFields] = useState(false);
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.username || !formData.password) {
      setError('Username and password are required');
      return;
    }
    
    if (showJenkinsFields && (!formData.jenkinsUrl || !formData.jenkinsToken)) {
      setError('Jenkins URL and token are required');
      return;
    }
    
    // In a real app, this would dispatch login/register actions
    console.log('Form submitted:', formData);
    
    // Mock successful login for demo
    if (isLogin) {
      // dispatch(loginAction(formData));
    } else {
      // dispatch(registerAction(formData));
    }
  };
  
  return (
    <LoginContainer>
      <LoginCard>
        <Logo>Jenkins Job Tracker</Logo>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input 
              type="text" 
              id="username" 
              name="username" 
              value={formData.username} 
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange}
              required
            />
          </FormGroup>
          
          {(showJenkinsFields || !isLogin) && (
            <>
              <FormGroup>
                <Label htmlFor="jenkinsUrl">Jenkins URL</Label>
                <Input 
                  type="url" 
                  id="jenkinsUrl" 
                  name="jenkinsUrl" 
                  value={formData.jenkinsUrl} 
                  onChange={handleChange}
                  placeholder="https://jenkins.example.com"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="jenkinsToken">Jenkins API Token</Label>
                <Input 
                  type="password" 
                  id="jenkinsToken" 
                  name="jenkinsToken" 
                  value={formData.jenkinsToken} 
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </>
          )}
          
          {isLogin && !showJenkinsFields && (
            <Button type="button" onClick={() => setShowJenkinsFields(true)}>
              Add Jenkins Credentials
            </Button>
          )}
          
          <Button type="submit" disabled={loading}>
            {isLogin ? 'Login' : 'Register'}
          </Button>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Form>
        
        <ToggleText>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => {
            setIsLogin(!isLogin);
            setShowJenkinsFields(false);
            setError('');
          }}>
            {isLogin ? 'Register' : 'Login'}
          </span>
        </ToggleText>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
