'use client';

interface Message {
  id: string;
  agent: 'chicken' | 'egg';
  text: string;
  timestamp: number;
}

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="glass-card p-6 space-y-4 min-h-[400px] max-h-[600px] overflow-y-auto">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted">
          <p>Debate starting soon...</p>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`message-in flex gap-3 ${
              message.agent === 'chicken' ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-lg ${
                message.agent === 'chicken'
                  ? 'bg-orange-500/20 border border-orange-500/30'
                  : 'bg-yellow-500/20 border border-yellow-500/30'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                    message.agent === 'chicken'
                      ? 'bg-orange-500'
                      : 'bg-yellow-500'
                  }`}
                >
                  {message.agent === 'chicken' ? '🐔' : '🥚'}
                </div>
                <span className="font-semibold text-fg capitalize">
                  {message.agent}
                </span>
              </div>
              <p className="text-fg">{message.text}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
