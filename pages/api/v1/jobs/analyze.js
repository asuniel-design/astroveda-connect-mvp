import { SovereignGateway } from '../../../../lib/architecture/gateway';
import { broadcastSovereignEvent } from '../../../../lib/architecture/event-bus';
import { fetchAstrologicalIntelligence } from '../../../../lib/engine/ai/router';

async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "POST only" });

  const { partnerData, jobId } = req.body;
  if (!jobId) return res.status(400).json({ error: "Missing jobId for telemetry." });

  // 1. Ensure the socket is awake for this request
  if (!res.socket.server.io) {
     console.warn("Socket not initialized yet. Routing may be silent.");
  }

  // 2. Immediately acknowledge the request (Zero-Latency API experience)
  res.status(202).json({
    status: "Processing",
    jobId: jobId,
    message: "AI engine ignited. Listen to native WebSocket channel for telemetry."
  });

  // 3. Process the heavy AI payload in the background (Non-blocking)
  try {
    // Notify client that computation started via local WebSocket
    broadcastSovereignEvent(res, `job-${jobId}`, 'status_update', { step: 'Analyzing planetary dignities...' });
    
    // Trigger the actual DeepSeek / Minimax OpenClaw router
    const prompt = `Analyze executive planetary data for: ${JSON.stringify(partnerData)}`;
    const result = await fetchAstrologicalIntelligence(prompt);

    // Broadcast the final payload
    broadcastSovereignEvent(res, `job-${jobId}`, 'job_complete', {
      success: true,
      intelligence_layer: result.model,
      analysis: result.analysis
    });

  } catch (error) {
    broadcastSovereignEvent(res, `job-${jobId}`, 'job_failed', { error: error.message });
  }
}

export default SovereignGateway(handler);
