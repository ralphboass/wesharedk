'use client'

import { useEffect, useState, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import {
  fetchUserConversations,
  listenToMessages,
  sendMessage,
  markMessagesAsRead,
  fetchUser,
} from '@/lib/firebase-helpers'
import { Chat } from '@/lib/types'
import { Loader2, MessageCircle, Send, ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'
import { da } from 'date-fns/locale'
import Link from 'next/link'

interface ConversationItem {
  oderId: string
  otherUserName: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  rideId?: string
}

function MessagesContent() {
  const searchParams = useSearchParams()
  const toParam = searchParams.get('to')
  const rideParam = searchParams.get('ride')

  const { user, firebaseUser, loading: authLoading } = useAuth()
  const [conversations, setConversations] = useState<ConversationItem[]>([])
  const [selectedUserId, setSelectedUserId] = useState<string | null>(toParam)
  const [selectedUserName, setSelectedUserName] = useState('')
  const [messages, setMessages] = useState<Chat[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load conversations
  useEffect(() => {
    if (!firebaseUser) return
    loadConversations()
  }, [firebaseUser])

  // If "to" param is set, resolve user name
  useEffect(() => {
    if (toParam && firebaseUser) {
      setSelectedUserId(toParam)
      fetchUser(toParam).then((u) => {
        if (u) setSelectedUserName(`${u.firstName} ${u.lastName}`)
      })
    }
  }, [toParam, firebaseUser])

  // Listen to messages when a conversation is selected
  useEffect(() => {
    if (!firebaseUser || !selectedUserId) return

    const unsub = listenToMessages(firebaseUser.uid, selectedUserId, (msgs) => {
      setMessages(msgs)
      // Mark incoming as read
      markMessagesAsRead(selectedUserId, firebaseUser.uid)
    })

    return () => unsub()
  }, [firebaseUser, selectedUserId])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function loadConversations() {
    if (!firebaseUser) return
    setLoading(true)
    const convs = await fetchUserConversations(firebaseUser.uid)
    setConversations(convs)
    setLoading(false)
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!firebaseUser || !selectedUserId || !newMessage.trim()) return

    setSending(true)
    await sendMessage({
      content: newMessage.trim(),
      senderId: firebaseUser.uid,
      receiverId: selectedUserId,
      rideId: rideParam || undefined,
    })
    setNewMessage('')
    setSending(false)
  }

  function selectConversation(conv: ConversationItem) {
    setSelectedUserId(conv.oderId)
    setSelectedUserName(conv.otherUserName)
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    )
  }

  if (!firebaseUser) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Log ind for at se beskeder</h2>
        <Link href="/login" className="inline-flex px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-500 to-brand-600 shadow-md">
          Log ind
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/profile" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600 mb-6">
        <ArrowLeft className="w-4 h-4" /> Tilbage til profil
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Beskeder</h1>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ height: '70vh' }}>
        <div className="flex h-full">
          {/* Conversation list */}
          <div className={`w-full sm:w-80 border-r border-gray-100 flex flex-col ${selectedUserId ? 'hidden sm:flex' : 'flex'}`}>
            <div className="p-3 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-700">Samtaler</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                </div>
              ) : conversations.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <MessageCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Ingen beskeder endnu</p>
                </div>
              ) : (
                conversations.map((conv) => (
                  <button
                    key={conv.oderId}
                    onClick={() => selectConversation(conv)}
                    className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${selectedUserId === conv.oderId ? 'bg-brand-50' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-sm font-semibold text-brand-600 shrink-0">
                        {conv.otherUserName.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-gray-900 truncate">{conv.otherUserName}</p>
                          <span className="text-xs text-gray-400">
                            {format(new Date(conv.lastMessageTime), 'HH:mm')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
                          {conv.unreadCount > 0 && (
                            <span className="ml-2 w-5 h-5 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center shrink-0">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Chat area */}
          <div className={`flex-1 flex flex-col ${!selectedUserId ? 'hidden sm:flex' : 'flex'}`}>
            {selectedUserId ? (
              <>
                {/* Chat header */}
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                  <button
                    onClick={() => setSelectedUserId(null)}
                    className="sm:hidden text-gray-500"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-sm font-semibold text-brand-600">
                    {selectedUserName.charAt(0)}
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">{selectedUserName}</p>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-sm text-gray-400">Start en samtale</p>
                    </div>
                  )}
                  {messages.map((msg) => {
                    const isMine = msg.senderId === firebaseUser.uid
                    return (
                      <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${isMine ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-900'}`}>
                          <p className="text-sm">{msg.content}</p>
                          <p className={`text-xs mt-1 ${isMine ? 'text-brand-200' : 'text-gray-400'}`}>
                            {format(new Date(msg.timestamp), 'HH:mm')}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="p-3 border-t border-gray-100 flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Skriv en besked..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none text-sm"
                  />
                  <button
                    type="submit"
                    disabled={sending || !newMessage.trim()}
                    className="px-4 py-2.5 rounded-xl bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-50 flex items-center gap-1.5 text-sm font-medium"
                  >
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Vælg en samtale for at starte</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MessagesPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto px-4 py-20 flex justify-center">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    }>
      <MessagesContent />
    </Suspense>
  )
}
