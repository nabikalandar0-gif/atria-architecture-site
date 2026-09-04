import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', studio: 'Atria Architecture', timestamp: new Date().toISOString() });
});

// AI Architectural Feasibility & Spatial Concept Consultation Endpoint
app.post('/api/architectural-consultation', async (req: Request, res: Response) => {
  try {
    const { 
      projectType, 
      plotArea, 
      builtArea, 
      location, 
      topography, 
      architecturalStyle, 
      budgetRange, 
      sustainabilityGoals, 
      clientVision,
      language = 'fa'
    } = req.body;

    const systemInstruction = language === 'fa'
      ? `شما سرپرست معماران و طراحان ارشد استودیو معماری و طراحی ساختمان «آتریا» (Atria Architecture) هستید.
شما باید یک برنامه فیزیکی، ایده کانسپت معمارانه، تحلیل نور و اقلیم، ساختار متریال‌های پیشنهادی و تخمین زمان‌بندی حرفه‌ای برای پروژه درخواستی کارفرما در قالب JSON ساخت‌یافته و خوانا ارائه دهید.`
      : `You are the Principal Lead Architect and Design Director at Atria Architecture & Building Design Studio.
Provide an executive architectural concept feasibility report, zoning program, passive solar strategy, material palette, and spatial layout recommendations in strict JSON format.`;

    const prompt = `Project Brief Details:
- Typology: ${projectType || 'Luxury Villa & Residence'}
- Plot Size: ${plotArea || '800'} sqm
- Built-up Area: ${builtArea || '1200'} sqm
- Location / Climate: ${location || 'Tehran / Lavasan'}
- Topography: ${topography || 'Sloped terrain with mountain view'}
- Desired Aesthetic / Style: ${architecturalStyle || 'Warm Minimalist & Biophilic Modernism'}
- Budget Bracket: ${budgetRange || 'Premium / Luxury Tier'}
- Sustainability Focus: ${sustainabilityGoals || 'High energy efficiency, natural cross-ventilation, rainwater harvesting'}
- Client Vision Notes: ${clientVision || 'Open-plan living with dramatic double-height atrium, indoor-outdoor connection, and private spa garden'}
- Output Language: ${language === 'fa' ? 'Persian (Farsi)' : 'English'}

Generate a comprehensive, poetic yet technically rigorous architectural proposal.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            conceptTitle: { type: Type.STRING, description: 'Poetic architectural concept title' },
            designPhilosophy: { type: Type.STRING, description: 'Core architectural narrative and spatial philosophy' },
            spatialZoning: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  zoneName: { type: Type.STRING },
                  areaSqm: { type: Type.NUMBER },
                  description: { type: Type.STRING },
                  daylightOrientation: { type: Type.STRING },
                },
                required: ['zoneName', 'areaSqm', 'description', 'daylightOrientation'],
              },
            },
            climateAndPassiveStrategies: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            materialPalette: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  materialName: { type: Type.STRING },
                  application: { type: Type.STRING },
                  tactileQuality: { type: Type.STRING },
                },
                required: ['materialName', 'application', 'tactileQuality'],
              },
            },
            structuralApproach: { type: Type.STRING, description: 'Engineering and structural skeleton recommendation' },
            estimatedDesignPhases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  phase: { type: Type.STRING },
                  durationWeeks: { type: Type.NUMBER },
                  deliverables: { type: Type.STRING },
                },
                required: ['phase', 'durationWeeks', 'deliverables'],
              },
            },
            leadArchitectAdvice: { type: Type.STRING, description: 'Direct advice and recommendations for the client' },
          },
          required: [
            'conceptTitle',
            'designPhilosophy',
            'spatialZoning',
            'climateAndPassiveStrategies',
            'materialPalette',
            'structuralApproach',
            'estimatedDesignPhases',
            'leadArchitectAdvice',
          ],
        },
      },
    });

    const textOutput = response.text || '{}';
    const parsed = JSON.parse(textOutput);
    res.json(parsed);
  } catch (error: any) {
    console.error('Error generating architectural consultation:', error);
    res.status(500).json({
      error: 'Failed to generate architectural consultation report.',
      details: error?.message || 'Unknown error occurred.',
    });
  }
});

// Serve frontend: Vite middleware in development, static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🏛️ Atria Architecture Studio Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
