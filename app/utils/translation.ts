import axios from 'axios';

export async function translateText(text: string, targetLang: string): Promise<string> {
  try {
    const res = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: text,
        langpair: `en|${targetLang}`,
      },
    });
    return res.data.responseData.translatedText;
  } catch (error) {
    console.error('Translation error:', error.message);
    return text;
  }
}
