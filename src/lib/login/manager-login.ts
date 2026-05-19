import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';
import { redirect } from 'next/navigation';

type JWTPayload = {
  username: string;
  expiresAt: Date;
};

const jwtSecretKey = process.env.JWT_SECRET_KEY || '';
const jwtEncodeKey = new TextEncoder().encode(jwtSecretKey);

const loginExpSeconds = Number(process.env.LOGIN_EXP_SECONDS || '3600');
const loginExpStr = process.env.LOGIN_EXPIRATION_STRING || '1h';
const loginCookieName = process.env.LOGIN_COOKIE_NAME || 'loginSession';

export async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, 12);
  const base64 = Buffer.from(hash).toString('base64');
  return base64;
}

export async function verifyPassword(password: string, base64Hash: string) {
  const hash = Buffer.from(base64Hash, 'base64').toString('utf8');
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
}

export async function createLoginSession(username: string) {
  const expiresAt = new Date(Date.now() + loginExpSeconds * 1000);
  const loginSession = await signJWT({ username, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set(loginCookieName, loginSession, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: expiresAt,
  });
}

export async function deleteLoginSession() {
  const cookieStore = await cookies();
  cookieStore.set(loginCookieName, '', { expires: new Date(0) });
  cookieStore.delete(loginCookieName);
}

export async function getLoginSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(loginCookieName)?.value;
  if (!token) return false;
  return verifyJWT(token);
}

//essa função é exclusiva para esse sistema, que só tem um usuário
export async function verifyLoginSession() {
  const jwtPayload = await getLoginSession();
  if (!jwtPayload) return false;
  return jwtPayload.username === process.env.LOGIN_USER;
}

export async function requireLoginSessionOrRedirect() {
  const isAuthenticated = await verifyLoginSession();
  if (!isAuthenticated) {
    redirect('/admin/login');
  }
}

export async function signJWT(jwtPayload: JWTPayload) {
  return new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(loginExpStr)
    .sign(jwtEncodeKey);
}

export async function verifyJWT(token: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(token, jwtEncodeKey, {
      algorithms: ['HS256'],
    });
    return payload as JWTPayload;
  } catch (error) {
    console.log(error);
    return false;
  }
}
