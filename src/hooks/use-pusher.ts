'use client';

import { useEffect } from 'react';
import PusherClient from 'pusher-js';

export const usePusher = (channelName: string, eventName: string, callback: (data: any) => void) => {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_PUSHER_KEY || !process.env.NEXT_PUBLIC_PUSHER_CLUSTER) {
      return;
    }

    const pusher = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe(channelName);
    channel.bind(eventName, callback);

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [channelName, eventName, callback]);
};
