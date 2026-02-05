import { EtherealShadow } from '@/components/ui/etheral-shadow';
import { ChatInterface } from '@/components/ChatInterface';
import './index.css';

function App() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <EtherealShadow
          color="rgba(139, 92, 246, 0.4)" // Violeta neon mais sutil
          animation={{ scale: 100, speed: 100 }}
          noise={{ opacity: 0.15, scale: 1 }}
        />
      </div>

      {/* Content Overlay */}
      <ChatInterface />
    </div>
  )
}

export default App
