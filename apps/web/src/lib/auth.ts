// lib/auth.ts
import { getSession, GetSessionParams, getCsrfToken } from 'next-auth/react';
import { JWT } from 'next-auth/jwt';
import { getToken } from 'next-auth/jwt';
import { GetServerSidePropsContext } from 'next';

// 1. Helper function to get the current user session on the client-side
export const fetchSession = async () => {
  const session = await getSession();
  return session;
};

// 2. Helper function to get the JWT token from cookies or headers (server-side)
export const fetchToken = async (context: GetServerSidePropsContext) => {
  const token = await getToken({ req: context.req });
  return token as JWT;
};

// 3. Utility function for server-side authentication check (e.g., for protected pages)
export const requireAuth = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // Return session data if user is authenticated
  return { props: { session } };
};

// 4. Function to fetch the CSRF token (useful for form submissions with NextAuth)
export const fetchCsrfToken = async () => {
  const csrfToken = await getCsrfToken();
  return csrfToken;
};
