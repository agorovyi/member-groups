import fetch from 'node-fetch'

const API_ENDPOINT = 'https://front-end-code-challenge.stephenbuilds.workers.dev'

export const handler = async () => {
  try {
    const response = await fetch(API_ENDPOINT);
    const users = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(users)
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