/**
 * AstraVeda Sovereign Native Event Bus
 * Broadcasts real-time AI telemetry using local Mac Mini WebSockets.
 */

export const broadcastSovereignEvent = (res, channel, event, payload) => {
  // Grab the Socket.io instance attached to the Next.js HTTP server
  const io = res?.socket?.server?.io;

  if (io) {
    // Broadcast directly to the specified room/channel
    io.to(channel).emit(event, {
      timestamp: new Date().toISOString(),
      hardware: "Mac-Mini-Local",
      ...payload
    });
    console.log(`📡 Native Event Broadcasted: [${event}] to channel [${channel}]`);
  } else {
    console.warn("⚠️ Sovereign Socket not initialized. The client must connect to /api/socket/io first.");
  }
};
