import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
// just as we did with appwrite.ts, we create the configuration and we use it within our server actions
const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    }
  }
})

export const plaidClient = new PlaidApi(configuration);