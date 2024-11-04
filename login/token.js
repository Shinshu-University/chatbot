let url = new URL(window.location.href);
let authCode = url.searchParams.get('code');
if (!authCode) { window.location.replace('/error?status=400'); }
} else {
  const token = (async () => {
  try {
    const response = await fetch('https://accounts.google.com/o/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: authCode,
        client_id: '917674445940-d7ppk6vri50v28en4q750luc7nhip44b.apps.googleusercontent.com',
        client_secret: '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',
        redirect_uri: 'https://fuzoku-chatbot.vercel.app/chat',
        grant_type: 'authorization_code'
      })
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    return String(data);
  } catch (error) {
    window.location.replace('/error?status='+error.message);
  }
})();
}