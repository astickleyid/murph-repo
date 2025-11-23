import { ChatHistoryClient } from './chat-history-client'

export async function ChatHistorySection() {
  // Always show chat history (now using localStorage)
  return <ChatHistoryClient />
}
