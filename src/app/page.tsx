import Chat from '@/components/chat';

export default function Home() {
  return (
    <div className="page">
      <header className="header">
        <h1>🤖 AI Чатбот</h1>
        <p>Спросите меня о чем угодно</p>
      </header>
      <main className="main">
        <Chat />
      </main>
    </div>
  );
}