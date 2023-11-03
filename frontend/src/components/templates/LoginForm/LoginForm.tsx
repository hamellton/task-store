import React, { useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Colors } from "../../../types/baseTypes";
import useDevice, { DeviceTypes } from "../../../hooks/useDevice";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = { username: "", password: "" };

const Container = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ isMobile }) => (isMobile ? "95%" : "500px")};
  margin: 0 auto;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 700;
  margin: 5px 0;
  color: ${Colors.black};
`;

const InputContainer = styled.div<{ isMobile: boolean }>`
  margin-top: 20px;
  width: ${({ isMobile }) => (isMobile ? "100%" : "500px")};
`;

const Input = styled(Field)<{ isMobile: boolean }>`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid ${Colors.lightGray};
  border-radius: 4px;
  font-size: ${({ isMobile }) => (isMobile ? "14px" : "16px")};
`;

const ErrorText = styled(ErrorMessage)`
  color: ${Colors.darkRed};
`;

const SubmitButton = styled.button<{ isMobile: boolean }>`
  background-color: ${Colors.primaryBackground};
  color: ${Colors.white};
  padding: 15px 40px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
  font-size: ${({ isMobile }) => (isMobile ? "14px" : "16px")};
`;

const LoginForm: React.FC = () => {
  const { device } = useDevice() ?? {};

  const handleSubmit = (values: any) => {
    // Обработка отправки данных формы
    console.log("Form submitted with values:", values);
  };

  const isMobile = useMemo(() => {
    return device === DeviceTypes.MOBILE;
  }, [device]);

  return (
    <Container isMobile={isMobile}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <InputContainer isMobile={isMobile}>
            <Label htmlFor="username">Username</Label>
            <Input type="text" name="username" isMobile={isMobile} />
            <ErrorText name="username" component="div" />
          </InputContainer>

          <InputContainer isMobile={isMobile}>
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" isMobile={isMobile} />
            <ErrorText name="password" component="div" />
          </InputContainer>

          <SubmitButton type="submit" isMobile={isMobile}>
            Login
          </SubmitButton>
        </Form>
      </Formik>
    </Container>
  );
};

export default LoginForm;
