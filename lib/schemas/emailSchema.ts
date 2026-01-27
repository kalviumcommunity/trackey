export const trainDelayTemplate = (
  userName: string,
  trainNumber: string,
  delayMinutes: number
) => `
  <h2>Hello ${userName},</h2>
  <p>🚆 Your train <strong>${trainNumber}</strong> is currently delayed.</p>
  <p><strong>Delay:</strong> ${delayMinutes} minutes</p>

  <p>Please plan your journey accordingly.</p>

  <hr/>
  <small>This is an automated alert from Trackey.</small>
`;
