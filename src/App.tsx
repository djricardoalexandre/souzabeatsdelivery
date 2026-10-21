import { useState, type ReactNode } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Headphones,
  Menu,
  MessageCircle,
  Mic2,
  MonitorPlay,
  Music2,
  Play,
  Radio,
  Sparkles,
  Star,
  Volume2,
  X,
  Zap,
} from 'lucide-react';

const WHATSAPP_NUMBER = '5531983532534';
const whatsappUrl = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const plans = [
  {
    name: 'Delivery Start',
    price: '99',
    description: 'O essencial para manter sua rádio em movimento.',
    features: ['8 vinhetas personalizadas por mês', '1 vinhetão musical por mês', '4 intros musicais por mês', '1 vídeo promocional por mês', 'Personalização conforme o estilo da emissora'],
    message: 'Olá! Conheci a Souza Beats Delivery e tenho interesse no plano Start de R$ 99 mensais. Gostaria de saber como contratar.',
  },
  {
    name: 'Delivery Pro',
    price: '149',
    description: 'Mais presença, variedade e ritmo para sua programação.',
    features: ['10 vinhetas personalizadas por mês', '3 vinhetões de sucesso por mês', '12 intros musicais por mês', '2 vídeos promocionais por mês', 'Identidade sonora adaptada à emissora'],
    message: 'Olá! Conheci a Souza Beats Delivery e tenho interesse no plano Pro de R$ 149 mensais. Gostaria de saber como contratar.',
    featured: true,
  },
  {
    name: 'Delivery Premium',
    price: '249',
    description: 'A experiência completa para rádios que querem ir além.',
    features: ['12 vinhetas personalizadas por mês', '4 vinhetões de sucesso por mês', '12 intros musicais por mês', '4 vídeos promocionais por mês', 'Identidade sonora adaptada à emissora', 'Prioridade na fila de produção'],
    message: 'Olá! Conheci a Souza Beats Delivery e tenho interesse no plano Premium de R$ 249 mensais. Gostaria de saber como contratar.',
  },
];

const audioTypes = [
  { title: 'Vinhetas', eyebrow: 'Identidade sonora', description: 'Identidade, personalidade e presença sonora para sua emissora e seus programas.', icon: Mic2, accent: 'yellow', button: 'Ouvir todas as vinhetas', demos: [{ name: 'DEMO VINHETA 1', src: 'https://www.dropbox.com/scl/fi/m9pl9v2x9khedxd1xfl8t/DEMO-VH-1.mp3?rlkey=xqhuklqe2u1tueq0492wku677&st=ppk1i5xg&raw=1' }, { name: 'DEMO VINHETA 2', src: 'https://www.dropbox.com/scl/fi/i56b2dyqscwcdo6tm4gjw/DEMO-VH-2.mp3?rlkey=ln9ee8yqj42h6j6jh24l4j0qg&st=x9fv8j0z&raw=1' }, { name: 'DEMO VINHETA 3', src: 'https://www.dropbox.com/scl/fi/ihi8kbxvh3l2x0haopdvi/DEMO-VH-3.mp3?rlkey=ciz3kz6zt0wc8ep4cs5wqtc4d&st=yeeo28e9&raw=1' }] },
  { title: 'Vinhetões de sucesso', eyebrow: 'Impacto na programação', description: 'Produções sonoras de impacto para valorizar a programação e destacar a personalidade da rádio.', icon: Volume2, accent: 'red', button: 'Ouvir todos os vinhetões', demos: [{ name: 'VINHETÃO 1', src: 'https://www.dropbox.com/scl/fi/jc30bdj2yxntm4qclmao2/VINHETAO-1.mp3?rlkey=ceevqqndyiwvuxlfr1bigqfi0&st=6mb5a9p0&raw=1' }, { name: 'VINHETÃO 2', src: 'https://www.dropbox.com/scl/fi/bqj3b0pwx3m8trd2bdoup/VINHETAO-2.mp3?rlkey=2ghp9y90xi6rwpmui859yjvbj&st=yyt4n31y&raw=1' }, { name: 'VINHETÃO 3', src: 'https://www.dropbox.com/scl/fi/4b8roe1x0u35n8z88wfq6/VINHET-O-3.mp3?rlkey=pdojdz19srpvityh61c0v5tpc&st=m69s9aw5&raw=1' }] },
  { title: 'Intros musicais', eyebrow: 'Aberturas memoráveis', description: 'Aberturas musicais para programas, locuções e chamadas, respeitando o estilo de cada emissora.', icon: Music2, accent: 'white', button: 'Ouvir todas as intros', demos: [{ name: 'INTRO 1', src: 'https://www.dropbox.com/scl/fi/n7pgfbdot9ydu32xc8zvz/INTRO-01.mp3?rlkey=cy9adlvego1d39z8t1pehutrv&st=nrkjv19y&raw=1' }, { name: 'INTRO 2', src: 'https://www.dropbox.com/scl/fi/emc3w7hgt4ve7z5fy6zy3/INTRO-02.mp3?rlkey=eh1wrlvuc45p3yatebb4ndejm&st=2v32z3et&raw=1' }, { name: 'INTRO 3', src: 'https://www.dropbox.com/scl/fi/ly6uq2kuha8y3ouefptxu/INTRO-03.mp3?rlkey=qwa0b340ireaugj3prnnmc1u8&st=rm2vh7hh&raw=1' }] },
];

const steps = [
  ['01', 'Escolha seu plano', 'A emissora escolhe a assinatura que atende às suas necessidades.'],
  ['02', 'Envie seu pedido', 'Informe o tipo de material, o texto, o estilo e os dados necessários.'],
  ['03', 'Produção personalizada', 'Preparamos o material respeitando a identidade e a linguagem da sua emissora.'],
  ['04', 'Receba seu material', 'O arquivo final é enviado digitalmente, dentro do prazo combinado.'],
];

const styles = ['Sertanejo', 'Rock', 'Forró', 'Pop', 'Popular', 'Adulto contemporâneo'];

function SectionHeading({ eyebrow, title, children, light = false }: { eyebrow: string; title: string; children?: ReactNode; light?: boolean }) {
  return (
    <div className={`section-heading ${light ? 'section-heading-light' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function EmptyMedia({ type }: { type: 'audio' | 'video' }) {
  return (
    <div className={`empty-media ${type === 'video' ? 'empty-video' : ''}`}>
      {type === 'audio' ? <Headphones size={25} /> : <MonitorPlay size={30} />}
      <span>{type === 'audio' ? 'Demonstração em preparação' : 'Demonstrativo em breve'}</span>
      <small>Novas produções estarão disponíveis em breve.</small>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedAudio, setExpandedAudio] = useState<string | null>(null);
  const closeMenu = () => setMenuOpen(false);
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); closeMenu(); };

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Souza Beats Delivery - início">
          <img src="/Logo_Souza_Beats_Delivery_F.png" alt="Souza Beats Delivery" />
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'nav-open' : ''}>
          <button onClick={() => scrollTo('inicio')}>Início</button>
          <button onClick={() => scrollTo('demonstracoes')}>Demonstrações</button>
          <button onClick={() => scrollTo('videos')}>Vídeos</button>
          <button onClick={() => scrollTo('planos')}>Planos e valores</button>
          <button onClick={() => scrollTo('como-funciona')}>Como funciona</button>
          <button onClick={() => scrollTo('contato')}>Contato</button>
          <a className="header-cta" href={whatsappUrl('Olá! Quero assinar a Souza Beats Delivery. Gostaria de saber como contratar.')} target="_blank" rel="noreferrer">Assine agora <ArrowRight size={16} /></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-grid" />
          <div className="hero-content">
            <div className="hero-kicker"><span className="live-dot" /> Conteúdo que coloca sua rádio no ar</div>
            <h1>Sua rádio sempre renovada.<br /><em>Seu som sempre em movimento.</em></h1>
            <p className="hero-copy">Produções de áudio e vídeos promocionais personalizados para emissoras que querem fortalecer sua identidade, renovar a programação e se destacar em cada chamada.</p>
            <div className="hero-actions">
              <button className="button button-yellow" onClick={() => scrollTo('demonstracoes')}>Ouvir demonstrações <Play size={17} fill="currentColor" /></button>
              <button className="button button-ghost" onClick={() => scrollTo('planos')}>Conhecer os planos <ArrowRight size={17} /></button>
            </div>
            <div className="hero-proof"><span><Zap size={16} /> Entrega em até 24h</span><span><Sparkles size={16} /> 100% personalizado</span></div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orb orb-one" /><div className="orb orb-two" />
            <div className="sound-panel"><div className="panel-top"><span>ON AIR / DELIVERY</span><span className="panel-time">00:24</span></div><div className="waveform">{Array.from({ length: 42 }, (_, index) => <i key={index} style={{ height: `${18 + ((index * 17) % 65)}%` }} />)}</div><div className="panel-bottom"><Radio size={16} /> SOUZA BEATS <span className="panel-status">● LIVE SESSION</span></div></div>
          </div>
          <div className="scroll-cue"><span>Role para explorar</span><ChevronDown size={18} /></div>
        </section>

        <section className="trust-strip"><div><span className="trust-number">01</span><span>Uma assinatura.<br /><b>Conteúdo o mês inteiro.</b></span></div><div><span className="trust-number">24<span>h</span></span><span>Agilidade para<br /><b>sua programação.</b></span></div><div><span className="trust-number">∞</span><span>Som com a<br /><b>sua identidade.</b></span></div></section>

        <section className="section demos-section" id="demonstracoes">
          <SectionHeading eyebrow="Experimente a qualidade" title="Ouça as demonstrações"><>Conheça a qualidade das produções Souza Beats Delivery e imagine o próximo som da sua emissora.</></SectionHeading>
          <div className="audio-grid">{audioTypes.map(({ title, eyebrow, description, icon: Icon, accent, button, demos }) => <article className={`audio-card accent-${accent}`} key={title}><div className="card-icon"><Icon size={22} /></div><span className="card-eyebrow">{eyebrow}</span><h3>{title}</h3><p>{description}</p><div className="audio-player-wrap"><div className="audio-demo-list">{demos.map((demo) => <div className="audio-demo" key={demo.name}><div className="audio-demo-label"><span>{demo.name}</span><small>Demonstração</small></div><audio controls preload="metadata" src={demo.src || undefined} /><EmptyMedia type="audio" /></div>)}</div></div><button className="text-button" onClick={() => setExpandedAudio(expandedAudio === title ? null : title)}>{button} <ArrowRight size={16} /></button>{expandedAudio === title && <div className="extra-demos"><div><span>Espaço para nova demonstração</span><small>Arquivo será disponibilizado em breve</small></div></div>}</article>)}</div>
        </section>

        <section className="section video-section" id="videos"><SectionHeading eyebrow="Conteúdo que circula" title="Veja a Souza Beats em ação" light><>Vídeos promocionais criados para fortalecer a presença digital das emissoras de rádio.</></SectionHeading><div className="video-grid"><article className="video-card"><div className="video-placeholder vertical"><video className="demo-video" controls preload="metadata" playsInline src="https://res.cloudinary.com/uapm0xz8/video/upload/v1792583742/9.16_TROPICAL_MIX.mp4">Seu navegador não suporta vídeo HTML5.</video></div><div className="video-info"><span className="card-eyebrow">Redes sociais</span><h3>Vídeos para Instagram</h3><p>Vídeos verticais para Reels e Stories, desenvolvidos para divulgar programas, locutores, promoções e a programação da sua emissora.</p><button className="button button-outline" onClick={() => scrollTo('contato')}>Assista ao demonstrativo <Play size={15} fill="currentColor" /></button></div></article><article className="video-card"><div className="video-placeholder horizontal"><video className="demo-video" controls preload="metadata" playsInline src="https://res.cloudinary.com/uapm0xz8/video/upload/v1792583884/16.9_-_94_FM.mp4">Seu navegador não suporta vídeo HTML5.</video></div><div className="video-info"><span className="card-eyebrow">Presença digital</span><h3>Vídeos para Facebook</h3><p>Vídeos promocionais para divulgar a emissora, destacar programas, anunciar novidades e ampliar a presença da rádio.</p><button className="button button-outline" onClick={() => scrollTo('contato')}>Assista ao demonstrativo <Play size={15} fill="currentColor" /></button></div></article></div></section>

        <section className="section plans-section" id="planos"><SectionHeading eyebrow="Escolha seu ritmo" title="O plano ideal para sua rádio"><>Produção personalizada, renovação sonora e conteúdo promocional com assinatura mensal.</></SectionHeading><div className="plans-grid">{plans.map((plan) => <article className={`plan-card ${plan.featured ? 'plan-featured' : ''}`} key={plan.name}>{plan.featured && <div className="popular-badge"><Star size={13} fill="currentColor" /> Mais escolhido</div>}<span className="plan-label">{plan.name}</span><p className="plan-description">{plan.description}</p><div className="price"><sup>R$</sup>{plan.price}<small>/mês</small></div><div className="plan-divider" /><ul>{plan.features.map((feature) => <li key={feature}><Check size={16} />{feature}</li>)}</ul><a className={`button ${plan.featured ? 'button-yellow' : 'button-dark'}`} href={whatsappUrl(plan.message)} target="_blank" rel="noreferrer">Quero o {plan.name.replace('Delivery ', '')} <ArrowRight size={16} /></a></article>)}</div></section>

        <section className="section process-section" id="como-funciona"><div className="process-intro"><SectionHeading eyebrow="Do pedido à entrega" title="Simples para sua rádio. Organizado para você."><>Você cuida da programação. A gente cuida do som que faz sua audiência reconhecer sua marca.</></SectionHeading><div className="deadline"><Clock3 size={22} /><div><strong>Prazo de até 24 horas</strong><span>Após o recebimento de todos os dados necessários.</span></div></div></div><div className="steps-grid">{steps.map(([number, title, description]) => <div className="step" key={number}><span className="step-number">{number}</span><div><h3>{title}</h3><p>{description}</p></div></div>)}</div></section>

        <section className="style-section"><div className="style-copy"><span className="eyebrow">Uma assinatura, muitos estilos</span><h2>Cada rádio tem sua personalidade.<br /><em>Nossa produção respeita isso.</em></h2><p>Uma rádio sertaneja tem uma linguagem diferente de uma rádio rock. As produções são adaptadas conforme o estilo musical, a linguagem, o público e a identidade de cada emissora.</p><a className="text-button" href={whatsappUrl('Olá! Quero conversar sobre uma produção personalizada para a minha rádio.')} target="_blank" rel="noreferrer">Fale sobre sua rádio <ArrowRight size={16} /></a></div><div className="style-tags">{styles.map((style, index) => <div className={`style-tag tag-${index + 1}`} key={style}><span>{String(index + 1).padStart(2, '0')}</span>{style}</div>)}</div></section>

        <section className="note-section"><div className="note-icon"><Zap size={20} /></div><div><span className="eyebrow">Transparência sempre</span><h2>O que não está incluído</h2><p>Os planos são destinados às quantidades mensais de materiais descritas em cada assinatura. Comerciais publicitários, jingles exclusivos, campanhas especiais, produções extraordinárias e serviços não especificados são contratados separadamente, mediante orçamento.</p></div></section>

        <section className="contact-section" id="contato"><div><span className="eyebrow">Pronto para renovar o som?</span><h2>Vamos colocar sua rádio<br /><em>em movimento.</em></h2></div><a className="button button-yellow" href={whatsappUrl('Olá! Conheci a Souza Beats Delivery e quero assinar. Gostaria de saber como contratar.')} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Quero assinar a Souza Beats Delivery <ArrowRight size={17} /></a></section>
      </main>

      <footer><div className="footer-main"><a className="brand" href="#inicio"><img src="/Logo_Souza_Beats_Delivery_F.png" alt="Souza Beats Delivery" /></a><p>Produção de áudio e vídeos promocionais<br />para emissoras de rádio.</p><div className="footer-links"><button onClick={() => scrollTo('demonstracoes')}>Demonstrações</button><button onClick={() => scrollTo('planos')}>Planos</button><button onClick={() => scrollTo('como-funciona')}>Como funciona</button><a href={whatsappUrl('Olá! Quero falar com a Souza Beats Delivery.')} target="_blank" rel="noreferrer">WhatsApp</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Souza Beats. Todos os direitos reservados.</span><span>Feito para quem vive de rádio.</span></div></footer>
      <a className="whatsapp-float" href={whatsappUrl('Olá! Quero falar com a Souza Beats Delivery.')} target="_blank" rel="noreferrer" aria-label="Falar pelo WhatsApp"><MessageCircle size={24} /></a>
    </div>
  );
}

export default App;
