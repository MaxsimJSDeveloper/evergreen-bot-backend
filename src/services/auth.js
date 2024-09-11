import { v4 as uuidv4 } from 'uuid';
import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';
import createHttpError from 'http-errors';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';

// Реєстрація користувача
export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ phone: payload.phone });
  if (user) throw createHttpError(409, 'Phone in use');

  return await UsersCollection.create({ ...payload });
};

// Логін користувача
export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ phone: payload.phone });
  if (!user) throw createHttpError(404, 'User not found');

  await SessionsCollection.deleteOne({ userId: user._id });

  return await createSession(user._id);
};

// Створення нової сесії
export const createSession = async (userId) => {
  const sessionData = generateSessionTokens();

  return await SessionsCollection.create({
    userId,
    ...sessionData,
  });
};

// Оновлення сесії
export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) throw createHttpError(401, 'Session not found');

  const isTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);
  if (isTokenExpired) throw createHttpError(401, 'Session token expired');

  await SessionsCollection.deleteOne({ _id: sessionId });

  return await createSession(session.userId);
};

// Генерація токенів доступу та оновлення
const generateSessionTokens = () => {
  const accessToken = uuidv4().toString('base64');
  const refreshToken = uuidv4().toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};
