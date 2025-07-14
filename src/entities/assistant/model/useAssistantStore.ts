import {defineStore} from "pinia";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { type ChatMessageType } from "@/entities/assistant";
import {ref} from "vue";
const API_KEY = import.meta.env.VITE_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const useAssistantStore = defineStore('assistant', () => {
  const currentChatHistory = ref<ChatMessageType[]>([{
    id: 1,
    author: 'Assistant',
    text: 'Hello! Write your first message',
    date: new Date().toLocaleString()
  }]);
  const currentAIMessage = ref<ChatMessageType | null>(null);
  const currentUserMessage = ref<ChatMessageType | null>(null);

  const sendMessageToAssistant = async (message: string, retries = 3, delay = 500) => {
    let assistantResponse = ''
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(message);
      assistantResponse = result.response.text();
      console.log('response: ', result)
    } catch (error: unknown) {
      if (isErrorWithStatus(error) && error.status === 503 && retries > 0) {
        console.warn(`Model overloaded (503), retrying in ${delay}ms... Attempts left: ${retries}`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return sendMessageToAssistant(message, retries - 1, delay * 2);
      } else {
        throw error;
      }
    }
    return assistantResponse;
  }

  const addNewMessage = (message: ChatMessageType) => {
    currentChatHistory.value.push(message);
  }

  const removeChatHistory = () => {
    currentChatHistory.value = [{
      id: 1,
      author: 'Assistant',
      text: 'Hello! Write your first message',
      date: new Date().toLocaleString()
    }];
  }

  return {
    currentChatHistory,
    currentAIMessage,
    currentUserMessage,
    sendMessageToAssistant,
    addNewMessage,
    removeChatHistory
  }
})

function isErrorWithStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error && typeof (error as any).status === 'number';
}
