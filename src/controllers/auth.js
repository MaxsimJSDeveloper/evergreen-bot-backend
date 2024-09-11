import { ONE_DAY } from '../constants/index.js';
import {
  loginUser,
  refreshUserSession,
  registerUser,
  createSession,
  updateUser,
} from '../services/auth.js';

// Реєстрація користувача
export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  const session = await createSession(user._id);
  setupSession(res, session);

  res.status(201).json({
    message: 'Successfully registered a user!',
    data: {
      user,
      accessToken: session.accessToken,
    },
  });
};

// Логін користувача
export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.status(200).json({
    message: 'Successfully logged in a user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

// Оновлення сесії
export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.status(200).json({
    message: 'Successfully refreshed the session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

// Встановлення куків для сесії
const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

// Оновлення даних користувача
export const updateUserController = async (req, res) => {
  const updatedUser = await updateUser(req.user.id, req.body); // Передаємо id користувача з токена
  res.status(200).json({
    message: 'User data successfully updated!',
    data: updatedUser,
  });
};
