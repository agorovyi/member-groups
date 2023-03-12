import fetch from 'node-fetch'

const API_ENDPOINT = 'https://front-end-code-challenge.stephenbuilds.workers.dev'

export const handler = async () => {
  try {
    const response = await fetch(API_ENDPOINT);
    const data = (await response.json()) as any;

    const usersWithAccessType = Object.keys(data.users).map(
      key => (
        {...data.users[key], id: key, accessType: 'standard'}
      )
    );

    return {
      statusCode: 200,
      body: JSON.stringify(usersWithAccessType, null, 2)
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }
}