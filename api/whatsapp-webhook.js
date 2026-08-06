import crypto from 'node:crypto';

const META_GRAPH_URL = `https://graph.facebook.com${process.env.META_GRAPH_API_VERSION ? `/${process.env.META_GRAPH_API_VERSION}` : ''}`;

export const config = { api: { bodyParser: false } };

const KNOWLEDGE = `
Navthera Advanced Physio and Rehab Centre is at 68, Shri Gopal Nagar, Gopalpura Byepass, Jaipur, Rajasthan 302019.
Phone: +91 9116032400. Email: contact@navthera.in.
Hours: Monday-Saturday 8:00 AM-8:00 PM; Sunday 9:00 AM-2:00 PM.
Services include general physiotherapy assessment, neuro, orthopaedic, sports, pelvic health and incontinence, geriatric, oncology, balance and vestibular, cardio-respiratory, gynaec and women's health rehabilitation, and aquatherapy.
For booking, collect only the patient's name, service of interest, preferred date/time, and callback number. Tell them the team will confirm availability.
`;

const SYSTEM_PROMPT = `You are Navthera's WhatsApp assistant for a physiotherapy and rehabilitation centre in Jaipur. Be warm, concise, and helpful. Use only the approved facts below. You can communicate in English or Hindi depending on the user. Do not diagnose, assess symptoms, prescribe medicine, promise availability, or give emergency medical advice. If the person describes an emergency or severe symptoms, instruct them to contact local emergency services immediately. For medical or uncertain questions, say a Navthera clinician will need to advise them and offer to arrange a callback. Respect privacy: ask only for name, service, preferred date/time, and callback number when booking. Never claim to be a doctor.\n\nApproved information:\n${KNOWLEDGE}`;

function getTextMessage(value) {
  const message = value?.messages?.[0];
  return message?.type === 'text' ? message.text?.body?.trim() : null;
}

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function hasValidSignature(rawBody, signature) {
  if (!process.env.WHATSAPP_APP_SECRET || !signature?.startsWith('sha256=')) return false;
  const expected = `sha256=${crypto.createHmac('sha256', process.env.WHATSAPP_APP_SECRET).update(rawBody).digest('hex')}`;
  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(signature);
  return expectedBuffer.length === providedBuffer.length && crypto.timingSafeEqual(expectedBuffer, providedBuffer);
}

async function sendWhatsAppMessage(to, body) {
  const response = await fetch(`${META_GRAPH_URL}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', to, type: 'text', text: { body } })
  });
  if (!response.ok) throw new Error(`WhatsApp API error: ${await response.text()}`);
}

async function getAssistantReply(message) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || 'llama-3.1-8b-instant',
      temperature: 0.2,
      max_tokens: 220,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: message }]
    })
  });
  if (!response.ok) throw new Error(`LLM API error: ${await response.text()}`);
  const result = await response.json();
  return result.choices?.[0]?.message?.content?.trim() || 'I am sorry, I could not answer that. Please call us at +91 9116032400.';
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === process.env.WHATSAPP_VERIFY_TOKEN) {
      return res.status(200).send(req.query['hub.challenge']);
    }
    return res.status(403).send('Verification failed');
  }

  if (req.method !== 'POST') return res.status(405).send('Method not allowed');

  try {
    const rawBody = await readRawBody(req);
    if (!hasValidSignature(rawBody, req.headers['x-hub-signature-256'])) return res.status(401).send('Invalid signature');
    const payload = JSON.parse(rawBody.toString('utf8'));
    const value = payload?.entry?.[0]?.changes?.[0]?.value;
    const incomingText = getTextMessage(value);
    const sender = value?.messages?.[0]?.from;
    if (!incomingText || !sender) return res.status(200).send('EVENT_RECEIVED');
    const reply = await getAssistantReply(incomingText);
    await sendWhatsAppMessage(sender, reply);
    return res.status(200).send('EVENT_RECEIVED');
  } catch (error) {
    console.error('WhatsApp webhook processing failed:', error.message);
    return res.status(500).send('Webhook processing failed');
  }
}
