'use server';

import { ID } from "node-appwrite";
import { createSessionClient, createAdminClient} from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({email, password} : signInProps) => {
  try {
  /*  WE DO SIMILAR THING LIKE WE DID IN THE SIGN UP BY EXTRACTING THE ACCOUNT FROM CREATE ADMIN CLIENT
  BUT THEN INSTEAD OF CREATING A NEW ACCOUNT WE CREATE AN EMAIL AND PASSWORD SESSION ON THE
  EXISTING ACCOUNT
  */

  const { account } = await createAdminClient();

  const response = await account.createEmailPasswordSession(email, password) 

  return parseStringify(response)
  } catch (error) {
    console.error('Error', error)
  }
}

export const signUp = async (userData : SignUpParams) => {

  const {email, password, firstName, lastName} = userData;
  // we use the signUpWIthEmail function from step 5 in the appwrite SSR docs and modify it to our userData
  try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(), 
      email, 
      password, 
      `${firstName} ${lastName}`
    );
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    /**
     * we use the parseStingnify function from utils because in nextJs you cannot pass
        large object such as the entire user object like that through server actions
        but rather we have to strignify first
     */
    return parseStringify(newUserAccount)
  } catch (error) {
    console.error('Error', error)
  }
}

// ... your initilization functions
// from appwrite SSR docs step 4

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete('appwrite-session');

    await account.deleteSession('current');
  } catch (error) {
    return null;
  }
}