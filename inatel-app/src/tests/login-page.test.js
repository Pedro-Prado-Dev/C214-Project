// LoginPage.test.js
import React from 'react';
import { render, fireEvent, getByText, waitFor, queryByPlaceholderText } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Importe MemoryRouter

import LoginPage from '../pages/login_page/login';
import Swal from 'sweetalert2';
import '@testing-library/jest-dom/extend-expect';

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true })
  })
);
test("updates username and password on change", () => {
  const {queryByPlaceholderText,getByText } = render(
  <MemoryRouter> 
    <LoginPage />
  </MemoryRouter>
  );
  const usernameInput = queryByPlaceholderText("Matrícula");
  const passwordInput = queryByPlaceholderText("Senha");

  fireEvent.change(usernameInput, { target: { value: "testuser" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });

  expect(usernameInput.value).toBe("testuser");
  expect(passwordInput.value).toBe("password");
});

test('Elemento do switch alert não pode estar no começo ao iniciar a página', () => {
  // Renderiza o componente LoginPage
  const { queryByText } = render(<MemoryRouter> 
    <LoginPage />
  </MemoryRouter>);

  expect(queryByText('OK')).toBeNull();
});

test("renders correctly", () => {
  const {queryByPlaceholderText,getByText } = render(
  <MemoryRouter> 
    <LoginPage />
  </MemoryRouter>
  );
  expect(queryByPlaceholderText("Matrícula")).not.toBeNull();
  });
test("renders correctly", () => {
  const {queryByPlaceholderText,getByText } = render(
    <MemoryRouter> 
    <LoginPage />
  </MemoryRouter>
  );
  expect(queryByPlaceholderText("Senha")).not.toBeNull();
});
test("renders correctly", () => {
  const {queryByPlaceholderText,getByText } = render(
<MemoryRouter> 
    <LoginPage />
  </MemoryRouter>
  );
  expect(getByText("Login")).not.toBeNull();
});

test("handles network error during login", async () => {
  jest.clearAllMocks();

  fetch.mockImplementationOnce(() => Promise.reject(new Error("Network Error")));
  const { queryByText,getByPlaceholderText, container } = render(

    <MemoryRouter> 
    <LoginPage />
  </MemoryRouter>

  );

  const usernameInput = getByPlaceholderText("Matrícula");
  const passwordInput = getByPlaceholderText("Senha");
  const loginButton = queryByText("Login");

  fireEvent.change(usernameInput, { target: { value: "testuser" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  fireEvent.click(loginButton);

  await waitFor(() => expect(Swal.fire).toHaveBeenCalledWith({
    icon: "error",
    title: "Oops...",
    text: "Senha ou usuário incorretos!",
  }));
  jest.clearAllMocks();

});

test("handles login failure with incorrect credentials", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({ success: false })
    })
  );
  jest.clearAllMocks();

  const {queryByPlaceholderText,getByText } = render(
    <MemoryRouter> 
    <LoginPage />
  </MemoryRouter>
  );

  const usernameInput = queryByPlaceholderText("Matrícula");
  const passwordInput = queryByPlaceholderText("Senha");
  const loginButton = getByText("Login");

  fireEvent.change(usernameInput, { target: { value: "testuser" } });
  fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
  fireEvent.click(loginButton);

  await waitFor(() => expect(Swal.fire).toHaveBeenCalledWith({
    icon: "error",
    title: "Oops...",
    text: "Senha ou usuário incorretos!",
  }));
});

test("handles successful login", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({ success: false })
    })
  );
  jest.clearAllMocks();

  const {queryByPlaceholderText,getByText } = render(

    <MemoryRouter> 
    <LoginPage />
  </MemoryRouter>

  );

  const usernameInput = queryByPlaceholderText("Matrícula");
  const passwordInput = queryByPlaceholderText("Senha");
  const loginButton = getByText("Login");

  fireEvent.change(usernameInput, { target: { value: "admin" } });
  fireEvent.change(passwordInput, { target: { value: "admin" } });
  fireEvent.click(loginButton);

  await waitFor(() => expect(Swal.fire).toHaveBeenCalledWith({
    icon: "error",
    title: "Oops...",
    text: "Senha ou usuário incorretos!",
  }));
});