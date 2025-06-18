import axios from "axios";

export async function translateText(text: string, targetLang: string = "ar") {
  try {
    const res = await axios.post("https://libretranslate.com/translate", {
      q: text,
      source: "en",
      target: targetLang,
      format: "text"
    }, {
      headers: { "accept": "application/json", "Content-Type": "application/json" }
    });

    return res.data.translatedText;
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
}
