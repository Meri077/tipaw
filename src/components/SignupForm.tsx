import {useState} from 'react';
import styled from '@emotion/styled';
import { ValidateEmail, ValidatePassword } from '../utils/helpers';
import ShowPassword from './svgs/ShowPassword';
import HidePassword from './svgs/HidePassword';
import { IErrors, IFormData } from '../utils/types';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Box = styled.div`
  padding: 30px;
  background-color: white;
  border-radius: 20px;
  width: 540px;
`;

const Title = styled.h1`
  color: #5acee8;
  font-weight: 500;
  font-size: 36px;
  margin-bottom: 15px;
  text-align: center;
  margin-bottom: 30px;
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  svg {
    position: absolute;
    width: 20px;
    height: 16px;
    right: 12px;
    top: 33px;
    cursor: pointer;
  }
`;

const Label = styled.label`
  margin-bottom: 6px;
  font-weight: 600;
  color: #8c96a3;
  font-size: 14px;
`;

const Required = styled.span`
  color: #ff453e;
  margin-left: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 7px 12px;
  font-size: 16px;
  border: 2px solid #d7dae0;
  border-radius: 10px;
  background: white;
  color: #707070;
  &.inp-err {
    border-color: red;
  }
`;

const TermsConditionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #616b77;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 20px;
`;

const TermsConditionsContainer = styled.div``;

const TermsConditionsCheckbox = styled.input`
  margin-right: 10px;
`;

const Error = styled.div`
  margin-top: 5px;
  font-size: 12px;
  font-weight: 600;
  color: rgb(255, 69, 62);
`;

const Submit = styled.button`
  color: white;
  background-color: #ffcc01;
  text-align: center;
  font-weight: 700;
  font-size: 14px;
  border: none;
  cursor: pointer;
  width: 100%;
  padding: 12px 24px;
  border-radius: 15px;
  &:disabled {
    background-color: #8c96a3;
    cursor: not-allowed;
  }
`;

const SignupForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<IErrors>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: '',
  });
  const [formData, setFormData] = useState<IFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const clearAll = () => {
    setLoading(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    });
    setErrors({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: '',
    });
  }

  const checkValidation = () => {
    let errorsObj = {
      firstName: !formData.firstName ? "This field is required." : "",
      lastName: !formData.lastName ? "This field is required." : "",
      phone: !formData.phone ? "This field is required." : "",
      email: !formData.email ? "This field is required." : !ValidateEmail(formData.email) ? "Invalid email address." : "",
      password: !formData.password ? "This field is required." : !ValidatePassword(formData.password) ? "Minumum 8 characters, with atleast one uppercase letter, one number and one special character" : "",
      confirmPassword: !formData.confirmPassword ? "This field is required." : formData.password !== formData.confirmPassword ? "Has to match the password" : "",
      terms: !formData.terms ? "This field is required." : "",
    };

    setErrors(errorsObj);

    return !errorsObj.firstName && 
    !errorsObj.lastName &&
    !errorsObj.phone &&
    !errorsObj.email &&
    !errorsObj.password &&
    !errorsObj.confirmPassword &&
    !errorsObj.terms;
  }

  const handleSubmit = () => {
    const formIsValid = checkValidation();
    if(formIsValid) {
      setLoading(true);
      axios.post(`${process.env.REACT_APP_API_URL}/users/signup`, formData)
      .then((res) => {
        if(res.status === 200) {
          clearAll();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      })
    }
  }

  return (
    <Box>
      <Title>Sign up</Title>
      <InputGroup>
        <Label htmlFor="firstname">First name <Required>*</Required></Label>
        <Input id="firstname" className={errors.firstName ? 'inp-err' : ''} type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
        {errors.firstName ? <Error>{errors.firstName}</Error> : <></>}
      </InputGroup>
      <InputGroup>
        <Label htmlFor="lastname">Last name <Required>*</Required></Label>
        <Input id="lastname" className={errors.lastName ? 'inp-err' : ''} type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
        {errors.lastName ? <Error>{errors.lastName}</Error> : <></>}
      </InputGroup>
      <InputGroup>
        <Label htmlFor="phone">Phone number <Required>*</Required></Label>
        <Input id="phone" className={errors.phone ? 'inp-err' : ''} type="number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
        {errors.phone ? <Error>{errors.phone}</Error> : <></>}
      </InputGroup>
      <InputGroup>
        <Label htmlFor="email">Email address <Required>*</Required></Label>
        <Input id="email" className={errors.email ? 'inp-err' : ''} type="text" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
        {errors.email ? <Error>{errors.email}</Error> : <></>}
      </InputGroup>
      <InputGroup>
        <Label htmlFor="password">Password <Required>*</Required></Label>
        <Input id="password" className={errors.password ? 'inp-err' : ''} type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
        {!showPassword ? <ShowPassword onClick={() => setShowPassword(true)} /> : <HidePassword onClick={() => setShowPassword(false)} /> }
        {errors.password ? <Error>{errors.password}</Error> : <></>}
      </InputGroup>
      <InputGroup>
        <Label htmlFor="confirmPassword">Confirm password <Required>*</Required></Label>
        <Input id="confirmPassword" className={errors.confirmPassword ? 'inp-err' : ''} type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
        {errors.confirmPassword ? <Error>{errors.confirmPassword}</Error> : <></>}
        {!showConfirmPassword ? <ShowPassword onClick={() => setShowConfirmPassword(true)} /> : <HidePassword onClick={() => setShowConfirmPassword(false)} /> }
      </InputGroup>
      <TermsConditionsWrapper>
        <TermsConditionsContainer>
          <TermsConditionsCheckbox type="checkbox" checked={formData.terms} onChange={(e) => setFormData({...formData, terms: e.target.checked})} />
          Accepted terms & conditions
        </TermsConditionsContainer>
        {errors.terms ? <Error>{errors.terms}</Error> : <></>}
      </TermsConditionsWrapper>
      <Submit onClick={handleSubmit} disabled={loading}>Submit</Submit>
      <ToastContainer position="bottom-right" />
    </Box>
  )
}

export default SignupForm;