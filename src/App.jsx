import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Monitor, Brain, TrendingUp, Landmark, Activity } from 'lucide-react'

const ROOMS = [
  { id: 'avatar', name: 'Avatar Room', icon: User, items: ['3D Avatar', 'Voice Controls', 'Identity Center'] },
  { id: 'creator', name: 'Creator Room', icon: Monitor, items: ['Studio', 'Render Queue', 'Content Production'] },
  { id: 'kjd', name: 'KJD Desk', icon: Brain, items: ['Tasks', 'AI Agents', 'Mission Control'] },
  { id: 'kingab', name: 'King Ab Room', icon: TrendingUp, items: ['Market Dashboard', 'Analytics', 'Trading Workspace'] },
  { id: 'kendal', name: 'KENDAL Room', icon: Landmark, items: ['Treasury', 'Capital Management', 'Reserves'] },
]

const DATA = {
  avatar: [
    { title: 'Avatar Status', rows: [['Model', 'KJD v1'], ['State', 'Idle'], ['Identity', 'Verified']] },
    { title: 'Voice Status', rows: [['Input', 'Listening'], ['Output', 'Ready'], ['Latency', '120 ms']] },
    { title: 'Animation Controls', rows: [['Gesture', 'Standing'], ['Expression', 'Neutral'], ['Idle loop', 'On']] },
  ],
  creator: [
    { title: 'Active Projects', rows: [['Dynasty Promo', 'Editing'], ['Podcast S2', 'Scripting'], ['App UI Kit', 'Review']] },
    { title: 'Asset Library', rows: [['Videos', '248'], ['Images', '1,204'], ['Audio', '312']] },
    { title: 'Render Progress', rows: [['Promo 4K', '72%'], ['Teaser', '100%'], ['Intro loop', 'Queued']] },
  ],
  kjd: [
    { title: 'Tasks', rows: [['Review contracts', 'High'], ['Publish report', 'Medium'], ['Sync agents', 'Low']] },
    { title: 'Notifications', rows: [['Agent approval needed', '2m'], ['Render complete', '14m'], ['Backup done', '1h']] },
    { title: 'Agent Queue', rows: [['Research agent', 'Running'], ['Treasury agent', 'Waiting'], ['Market agent', 'Running']] },
  ],
  kingab: [
    { title: 'Market Watchlist', rows: [['BTC', '+2.1%'], ['SPY', '+0.4%'], ['GOLD', '-0.2%']] },
    { title: 'Analytics Cards', rows: [['Win rate', '61%'], ['Avg R:R', '2.3'], ['Open positions', '4']] },
    { title: 'Trading Workspace', rows: [['Strategy', 'Trend follow'], ['Risk / trade', '1%'], ['Journal entries', '37']] },
  ],
  kendal: [
    { title: 'Treasury Overview', rows: [['Cash position', '$482,000'], ['Receivables', '$96,500'], ['Debt', '$120,000']] },
    { title: 'Reserve Tracking', rows: [['Operating reserve', '6.2 mo'], ['Emergency fund', '$150,000'], ['Target', '8 mo']] },
    { title: 'Capital Allocation', rows: [['Growth', '40%'], ['Markets', '25%'], ['Reserves', '35%']] },
  ],
}

function Header({ room }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-dyn-gold/30">
      <h1 className="text-2xl font-bold tracking-widest text-dyn-gold">DYNASTY HQ</h1>
      <div className="flex items-center gap-6 text-sm">
        <span className="flex items-center gap-2 text-dyn-holo">
          <Activity size={16} /> System Status: <b className="text-green-400">ONLINE</b>
        </span>
        <span>Current Room: <b className="text-dyn-gold">{room.name}</b></span>
      </div>
    </header>
  )
}

function RoomNavigation({ activeId, onSelect }) {
  return (
    <nav className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-xl">
      {ROOMS.map((r) => {
        const Icon = r.icon
        const active = r.id === activeId
        return (
          <motion.button
            key={r.id}
            onClick={() => onSelect(r.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            aria-pressed={active}
            className={`glass p-3 text-left transition-shadow ${
              active ? 'border-dyn-gold shadow-[0_0_20px_#D4AF37]' : 'hover:shadow-[0_0_16px_#00CFFF]'
            }`}
          >
            <Icon className={active ? 'text-dyn-gold' : 'text-dyn-holo'} size={22} />
            <div className="mt-2 font-semibold text-sm">{r.name}</div>
            <ul className="mt-1 text-xs text-gray-400">
              {r.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
            {active && <motion.div layoutId="door" className="mt-2 h-0.5 bg-dyn-gold" />}
          </motion.button>
        )
      })}
    </nav>
  )
}

function DynastyLobby({ activeId, onSelect }) {
  return (
    <section className="flex flex-col items-center justify-between gap-6 p-6 bg-gradient-to-b from-zinc-900 to-dyn-bg">
      <div className="text-center">
        <div className="text-xs tracking-[0.4em] text-dyn-holo">THE HOUSE OF INHABITANTS</div>
        <div className="text-lg text-dyn-gold">Dynasty Operations Center</div>
      </div>
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 rounded-full border-2 border-dyn-gold bg-dyn-holo/10 shadow-[0_0_30px_#00CFFF] flex items-center justify-center">
          <User size={48} className="text-dyn-holo" />
        </div>
        <div className="w-16 h-32 -mt-2 rounded-t-3xl border-2 border-dyn-gold/70 bg-dyn-holo/10" />
        <div className="text-dyn-gold font-bold tracking-widest mt-2">KJD</div>
      </motion.div>
      <div className="glass px-4 py-2 text-xs text-center">
        Avatar: <span className="text-green-400">Online</span> · Voice: Ready · Agents: 3 active
      </div>
      <RoomNavigation activeId={activeId} onSelect={onSelect} />
    </section>
  )
}

function WorkspacePanel({ room }) {
  return (
    <section className="p-6 overflow-y-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={room.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold text-dyn-gold">{room.name}</h2>
          {DATA[room.id].map((card) => (
            <div key={card.title} className="glass p-4 hover:shadow-[0_0_16px_#00CFFF] transition-shadow">
              <h3 className="mb-2 font-medium text-dyn-holo">{card.title}</h3>
              <dl className="space-y-1 text-sm">
                {card.rows.map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <dt className="text-gray-400">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

function StatusBar({ room }) {
  return (
    <footer className="px-6 py-2 text-xs flex justify-between border-t border-dyn-gold/30 text-gray-400">
      <span>KARMA backend: connected</span>
      <span>Room: {room.name}</span>
    </footer>
  )
}

export default function App() {
  const [activeId, setActiveId] = useState('avatar')
  const room = ROOMS.find((r) => r.id === activeId)
  return (
    <div className="min-h-screen flex flex-col bg-dyn-bg text-gray-200">
      <Header room={room} />
      <main className="flex-1 grid lg:grid-cols-[1fr_1fr]">
        <DynastyLobby activeId={activeId} onSelect={setActiveId} />
        <WorkspacePanel room={room} />
      </main>
      <StatusBar room={room} />
    </div>
  )
}
