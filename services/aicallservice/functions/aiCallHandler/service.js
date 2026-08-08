const https = require('https');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

class AICallService {
  async extractExpense(userText) {
    const prompt = `You are an expense extraction engine.

Extract the following fields from the user's input:
- expenseType (one of: GROCERIES, UTILITIES, DINING, RENT, FUEL, OTHER)
- expenseMode (one of: ONLINE, CASH)
- expenseAmount (number)
- expenseDate (YYYY-MM-DD format)
- description (brief summary)

Return ONLY valid JSON with these exact field names. No markdown, no code fences, no explanation.

Input: ${userText}`;

    const requestBody = JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    });

    const geminiResponse = await this._callGeminiAPI(requestBody);

    // Extract text from Gemini response
    const rawText = geminiResponse.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error('Gemini API returned no content');
    }

    // Parse the JSON from Gemini's response — strip markdown code fences if present
    const cleanedText = rawText
      .replace(/```json\s*/gi, '')
      .replace(/```\s*/g, '')
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanedText);
    } catch (parseErr) {
      throw new Error(`Failed to parse Gemini response as JSON: ${cleanedText}`);
    }

    return parsed;
  }

  _callGeminiAPI(requestBody) {
    return new Promise((resolve, reject) => {
      const url = new URL(`${GEMINI_URL}?key=${GEMINI_API_KEY}`);

      const options = {
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(requestBody)
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (res.statusCode !== 200) {
              reject(new Error(`Gemini API error (${res.statusCode}): ${JSON.stringify(parsed)}`));
            } else {
              resolve(parsed);
            }
          } catch (e) {
            reject(new Error(`Gemini API returned non-JSON: ${data}`));
          }
        });
      });

      req.on('error', (err) => {
        reject(new Error(`Gemini API request failed: ${err.message}`));
      });

      req.write(requestBody);
      req.end();
    });
  }
}

module.exports = AICallService;
