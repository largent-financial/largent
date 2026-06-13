self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', event => {
  const payload = (() => {
    try {
      return event.data ? event.data.json() : {};
    } catch {
      return {};
    }
  })();

  const title = payload.title || 'Largent';
  const options = {
    body: payload.body || 'New activity is ready in your budget.',
    icon: '/largent-black.png',
    badge: '/largent-black.png',
    data: {
      url: payload.url || '/',
    },
    tag: payload.tag || 'largent-alert',
    renotify: false,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  const destinationUrl = event.notification.data?.url || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        const currentUrl = new URL(client.url);
        if (currentUrl.origin === self.location.origin) {
          client.focus();
          if ('navigate' in client) {
            return client.navigate(destinationUrl);
          }
          return client;
        }
      }

      return self.clients.openWindow(destinationUrl);
    })
  );
});
