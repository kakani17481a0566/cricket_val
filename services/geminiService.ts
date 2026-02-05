
import { GoogleGenAI, Modality, Type, VideoGenerationReferenceType, VideoGenerationReferenceImage } from "@google/genai";

export async function editImage(base64Image: string, prompt: string): Promise<string | null> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType: 'image/png',
            },
          },
          {
            text: `Apply this edit to the image: ${prompt}. Keep the main subjects recognizable.`,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error editing image:", error);
    return null;
  }
}

export async function generateVeoVideo(base64Image: string, prompt: string, aspectRatio: '16:9' | '9:16' = '9:16'): Promise<string | null> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt || 'A cinematic romantic slow motion shot of this person moving gracefully',
      image: {
        imageBytes: base64Image.split(',')[1],
        mimeType: 'image/png',
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) return null;

    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error generating video:", error);
    if (error.message?.includes("Requested entity was not found")) {
      await (window as any).aistudio.openSelectKey();
    }
    return null;
  }
}

export async function generateAvatar(person: 'Mohith' | 'Likhita'): Promise<string | null> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const descriptions = {
    Mohith: "A handsome South Asian man in his late 20s, wearing stylish modern glasses, a neatly groomed short dark beard, a warm charming smile, wearing a professional emerald green button-down shirt. Pixar-style 3D animation, highly detailed, soft cinematic studio lighting, vibrant colors.",
    Likhita: "A beautiful South Asian woman with long, glossy, dark wavy flowing hair, sparkling kind eyes, wearing a lilac traditional embroidered Indian dress. Pixar-style 3D animation, highly detailed, soft cinematic studio lighting, vibrant colors."
  };

  const prompt = `A highly detailed, professional 3D character portrait of ${descriptions[person]}. Close up shot, soft focus village sunset background with golden hour lighting, masterpiece 4k render, Disney-Pixar art style.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error(`Error generating ${person} avatar:`, error);
    return null;
  }
}

export async function generateLoveLetter(recipient: string, traits: string, tone: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Write a beautiful, romantic ${tone} love letter for "${recipient}" from Mohith. 
  Mention our shared history: crossing paths on the Intermediate campus for 2 years with only a 'Bye', bonding over Dhoni, dogs, and village life. 
  Include these personal touches: ${traits}. Tone: ${tone}. ~200 words.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });

    return response.text || "My love, you are the light of my life.";
  } catch (error) {
    console.error("Error generating love letter:", error);
    return "Something went wrong, but my love for you remains. You are wonderful!";
  }
}

export async function generateCouplePortrait(setting: string): Promise<string | null> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `A highly detailed, romantic cinematic digital portrait of a couple. 
  The man: South Asian, glasses, neat beard, emerald shirt. 
  The woman: South Asian, long dark wavy hair, lilac dress. 
  Setting: ${setting}. 
  Style: Ethereal, golden hour lighting, soft focus, high resolution.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          aspectRatio: "3:4"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating couple portrait:", error);
    return null;
  }
}

export async function generateLovePoem(name: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Write a very short, 4-line romantic poem for "${name}" from Mohith. Mention our village and destiny.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "You are the star that lights my night.";
  } catch (e) {
    return "Love is you and love is me.";
  }
}

export async function generateCompliment(name: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Generate a unique, short, and deeply romantic one-sentence compliment for "${name}" from Mohith. Reference the 2 years of silence during Intermediate if possible.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text?.trim() || "You are the most beautiful person I know.";
  } catch (error) {
    return "Your smile is enough to brighten my entire world.";
  }
}

export async function generateFutureFortune(): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a short prediction about Mohith and Likhita's future together in a peaceful village. Under 60 words.",
    });
    return response.text || "Your future is bright and full of endless love.";
  } catch (e) {
    return "Our path is paved with starlight and shared dreams.";
  }
}

export async function generateSpecialSurprise(name: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Write a short final romantic message for "${name}" from Mohith. Reference ending those silent years in style like Dhoni. 2-3 sentences.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "I choose you today and forever.";
  } catch (e) {
    return "You are my greatest adventure and my favorite home.";
  }
}

export async function generateDreamDateImage(description: string): Promise<string | null> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `A romantic digital art of Mohith (glasses, emerald shirt) and Likhita (lilac dress, long hair) enjoying: ${description}.`,
          },
        ],
      },
    });

    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData?.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating dream date image:", error);
    return null;
  }
}

export async function generateDatePlan(mood: string, location: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Plan a village-themed romantic date for Mohith and Likhita. Mood: ${mood}, Setting: ${location}. 3 steps.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "A perfect day starts with you.";
  } catch (error) {
    return "Let's just get lost in each other's eyes today.";
  }
}

export async function generateLoveQuiz(name: string): Promise<any[]> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Generate a 5-question quiz for Likhita. Reference Intermediate college campus, Dhoni, Dogs, and Village life.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
              answerIndex: { type: Type.INTEGER }
            },
            required: ["question", "options", "answerIndex"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return [
      { question: `What was our main word in Intermediate?`, options: ["Hello", "Bye", "Hey"], answerIndex: 1 },
      { question: `Who is Mohith's ultimate idol?`, options: ["Dhoni", "Kohli", "Sachin"], answerIndex: 0 },
    ];
  }
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export async function generateVoiceNote(name: string): Promise<void> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Say cheerfully: Happy Valentine's, ${name}! Mohith loves you more than a Dhoni winning six. Finishing our silent years in style!`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) throw new Error("No audio data received");
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const audioBuffer = await decodeAudioData(decode(base64Audio), audioContext, 24000, 1);
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
  } catch (error) {
    console.error("Error generating voice note:", error);
  }
}
