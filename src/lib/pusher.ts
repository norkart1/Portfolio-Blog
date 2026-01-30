import PusherServer from 'pusher';

if (!process.env.PUSHER_APP_ID || !process.env.NEXT_PUBLIC_PUSHER_APP_KEY || !process.env.PUSHER_APP_SECRET || !process.env.NEXT_PUBLIC_PUSHER_CLUSTER) {
  console.warn('Pusher environment variables are missing. Real-time features will not work.');
}

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});
