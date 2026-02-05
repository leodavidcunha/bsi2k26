// ============================================
// BSI-BSAM - COMPONENTES UI COMPLETOS
// ============================================

// ============================================
// 1. LAYOUT PRINCIPAL
// ============================================

'use client';

import { useState } from 'react';
import { 
  FileText, Menu, X, Home, Database, CheckCircle, 
  TrendingUp, User, LogOut, Bell, Settings 
} from 'lucide-react';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user] = useState({
    name: 'João Ribeiro',
    role: 'contador',
    crc: 'CRC-AM 012345/O-6'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TOPBAR */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <FileText className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BSI-BSAM</h1>
                <p className="text-xs text-gray-500">Balanço Socioambiental Monetizado</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* NOTIFICAÇÕES */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* PERFIL */}
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500 capitalize">{user.role}</div>
              </div>
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Settings size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* SIDEBAR */}
        <aside
          className={`
            bg-white border-r border-gray-200 h-[calc(100vh-73px)] sticky top-[73px]
            transition-all duration-300 ease-in-out
            ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}
          `}
        >
          <nav className="p-4 space-y-2">
            <NavItem icon={Home} label="Dashboard" href="/" active />
            <NavItem icon={FileText} label="FIO" href="/fio" />
            <NavItem icon={Database} label="Matrix IRES" href="/matrix" />
            <NavItem icon={CheckCircle} label="Validações" href="/validacoes" badge="3" />
            <NavItem icon={TrendingUp} label="Relatórios" href="/relatorios" />
            
            <div className="pt-4 mt-4 border-t border-gray-200">
              <button className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                <LogOut size={18} />
                <span className="text-sm font-medium">Sair</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'ml-0'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ 
  icon: Icon, 
  label, 
  href, 
  active = false,
  badge 
}: any) => (
  <a
    href={href}
    className={`
      flex items-center justify-between px-4 py-3 rounded-lg transition group
      ${active 
        ? 'bg-primary-50 text-primary-700' 
        : 'text-gray-700 hover:bg-gray-50'
      }
    `}
  >
    <div className="flex items-center gap-3">
      <Icon 
        size={18} 
        className={active ? 'text-primary-600' : 'text-gray-500 group-hover:text-gray-700'} 
      />
      <span className="text-sm font-medium">{label}</span>
    </div>
    {badge && (
      <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
        {badge}
      </span>
    )}
  </a>
);


// ============================================
// 2. DASHBOARD (HOME)
// ============================================

'use client';

import { 
  TrendingUp, TrendingDown, FileText, AlertCircle,
  CheckCircle2, Clock, DollarSign, Users, Leaf, Shield 
} from 'lucide-react';

export const Dashboard = () => {
  const stats = [
    {
      label: 'Exercício Atual',
      value: '2026',
      change: '+100%',
      trend: 'up',
      icon: FileText,
      color: 'blue'
    },
    {
      label: 'Itens Validados',
      value: '42/60',
      change: '70%',
      trend: 'up',
      icon: CheckCircle2,
      color: 'green'
    },
    {
      label: 'Ativos',
      value: '35',
      change: '+12%',
      trend: 'up',
      icon: TrendingUp,
      color: 'green'
    },
    {
      label: 'Passivos',
      value: '7',
      change: '-3%',
      trend: 'down',
      icon: TrendingDown,
      color: 'red'
    }
  ];

  const blocosProgress = [
    { nome: 'Econômico', total: 8, validados: 8, ativos: 7, passivos: 1, icon: DollarSign, color: 'blue' },
    { nome: 'Social', total: 25, validados: 18, ativos: 15, passivos: 3, icon: Users, color: 'pink' },
    { nome: 'Ambiental', total: 14, validados: 9, ativos: 8, passivos: 1, icon: Leaf, color: 'green' },
    { nome: 'Governança', total: 13, validados: 7, ativos: 5, passivos: 2, icon: Shield, color: 'purple' }
  ];

  const recentActivity = [
    { action: 'ELE-DVA validado', user: 'Ana Carolina', time: 'há 5 min', status: 'success' },
    { action: 'ESA Social criado', user: 'João Ribeiro', time: 'há 12 min', status: 'info' },
    { action: 'Documento pendente', user: 'Sistema', time: 'há 1 hora', status: 'warning' },
    { action: 'ELE Ambiental reprovado', user: 'Ana Carolina', time: 'há 2 horas', status: 'error' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Visão geral do exercício 2026</p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-${stat.color}-50 rounded-lg`}>
                <stat.icon className={`text-${stat.color}-600`} size={24} />
              </div>
              <span className={`
                text-sm font-medium px-2 py-1 rounded-full
                ${stat.trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}
              `}>
                {stat.change}
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* BLOCOS PROGRESS */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Progresso por Bloco</h2>
          <div className="space-y-6">
            {blocosProgress.map((bloco, i) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-${bloco.color}-50 rounded-lg`}>
                      <bloco.icon className={`text-${bloco.color}-600`} size={20} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{bloco.nome}</div>
                      <div className="text-sm text-gray-500">
                        {bloco.validados}/{bloco.total} validados
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-600 font-medium">↑ {bloco.ativos}</span>
                    <span className="text-red-600 font-medium">↓ {bloco.passivos}</span>
                  </div>
                </div>
                
                {/* PROGRESS BAR */}
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500"
                    style={{ width: `${(bloco.validados / bloco.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ATIVIDADE RECENTE */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Atividade Recente</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                <div className={`
                  w-2 h-2 rounded-full mt-2
                  ${activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'error' ? 'bg-red-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'}
                `} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ALERTAS */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 flex items-start gap-4">
        <AlertCircle className="text-yellow-600 flex-shrink-0" size={24} />
        <div>
          <h3 className="font-semibold text-yellow-900">7 itens pendentes de validação</h3>
          <p className="text-sm text-yellow-700 mt-1">
            Existem documentos aguardando validação documental. Acesse a seção de Validações para revisar.
          </p>
          <button className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700 transition">
            Ver Pendências
          </button>
        </div>
      </div>
    </div>
  );
};


// ============================================
// 3. FIO - FORMULÁRIO DE INICIALIZAÇÃO
// ============================================

'use client';

import { useState } from 'react';
import { Building2, User, FileCheck, ArrowRight } from 'lucide-react';

export const FIOForm = () => {
  const [step, setStep] = useState(1);
  const [accepted, setAccepted] = useState(false);
  const [form, setForm] = useState({
    cnpj: '',
    razao_social: '',
    cnae_principal: '',
    area_atuacao: '',
    regime_tributario: '',
    endereco_completo: '',
    municipio: 'Manaus',
    estado: 'Amazonas',
    contador_nome: '',
    contador_crc: '',
    agente_esg_nome: '',
    agente_esg_departamento: ''
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* PROGRESS STEPPER */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-bold
                ${step >= s ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'}
              `}>
                {s}
              </div>
              {s < 3 && (
                <div className={`flex-1 h-1 mx-4 ${step > s ? 'bg-primary-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm">
          <span className={step >= 1 ? 'text-primary-600 font-medium' : 'text-gray-500'}>
            Dados da Organização
          </span>
          <span className={step >= 2 ? 'text-primary-600 font-medium' : 'text-gray-500'}>
            Responsáveis
          </span>
          <span className={step >= 3 ? 'text-primary-600 font-medium' : 'text-gray-500'}>
            Declaração
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary-50 rounded-lg">
                <Building2 className="text-primary-600" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Dados da Organização</h2>
                <p className="text-gray-500 text-sm">Informações cadastrais da empresa</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="label">CNPJ *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="00.000.000/0000-00"
                  value={form.cnpj}
                  onChange={(e) => setForm({ ...form, cnpj: e.target.value })}
                />
              </div>

              <div className="col-span-2">
                <label className="label">Razão Social *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Ex: Amazontech Eletroeletrônica da Amazônia S.A."
                  value={form.razao_social}
                  onChange={(e) => setForm({ ...form, razao_social: e.target.value })}
                />
              </div>

              <div>
                <label className="label">CNAE Principal</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Ex: 2630-2/00"
                  value={form.cnae_principal}
                  onChange={(e) => setForm({ ...form, cnae_principal: e.target.value })}
                />
              </div>

              <div>
                <label className="label">Área de Atuação</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Ex: Indústria de eletroeletrônicos"
                  value={form.area_atuacao}
                  onChange={(e) => setForm({ ...form, area_atuacao: e.target.value })}
                />
              </div>

              <div className="col-span-2">
                <label className="label">Regime Tributário</label>
                <select className="input">
                  <option>Selecione</option>
                  <option>Lucro Real</option>
                  <option>Lucro Presumido</option>
                  <option>Simples Nacional</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="label">Endereço Completo</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Ex: Av. Buriti, 456, CEP 69098-010"
                  value={form.endereco_completo}
                  onChange={(e) => setForm({ ...form, endereco_completo: e.target.value })}
                />
              </div>

              <div>
                <label className="label">Município</label>
                <input type="text" className="input" value={form.municipio} readOnly />
              </div>

              <div>
                <label className="label">Estado</label>
                <input type="text" className="input" value={form.estado} readOnly />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full btn btn-primary btn-lg mt-6"
            >
              Continuar
              <ArrowRight size={20} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-secondary-50 rounded-lg">
                <User className="text-secondary-600" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Responsáveis</h2>
                <p className="text-gray-500 text-sm">Contador e Agente ESG</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Contador Responsável</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Nome Completo *</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Ex: João Ribeiro"
                    value={form.contador_nome}
                    onChange={(e) => setForm({ ...form, contador_nome: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Número do CRC *</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Ex: CRC-AM 012345/O-6"
                    value={form.contador_crc}
                    onChange={(e) => setForm({ ...form, contador_crc: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Agente ESG Responsável</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Nome Completo *</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Ex: Ana Carolina"
                    value={form.agente_esg_nome}
                    onChange={(e) => setForm({ ...form, agente_esg_nome: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Departamento</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Ex: Sustentabilidade"
                    value={form.agente_esg_departamento}
                    onChange={(e) => setForm({ ...form, agente_esg_departamento: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button onClick={() => setStep(1)} className="flex-1 btn btn-outline">
                Voltar
              </button>
              <button onClick={() => setStep(3)} className="flex-1 btn btn-primary">
                Continuar
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <FileCheck className="text-yellow-600" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Declaração NBC T15</h2>
                <p className="text-gray-500 text-sm">Responsabilidade técnica</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 max-h-96 overflow-y-auto">
              <h3 className="font-bold text-yellow-900 mb-4">Declaração de Responsabilidade Técnica e Conformidade Normativa</h3>
              <div className="text-sm text-yellow-800 space-y-4 leading-relaxed">
                <p>
                  Declaro, na qualidade de <strong>Responsável Contador</strong>, devidamente registrado no 
                  Conselho Regional de Contabilidade (CRC), que as informações contábeis apresentadas no 
                  âmbito do <strong>BSI-BSA – BIO SYSTEM IRES – Balanço Social e Ambiental</strong>, 
                  referentes ao exercício informado, são de minha responsabilidade técnica, nos termos da 
                  <strong> NBC T 15</strong>.
                </p>
                <p>
                  Declaro, ainda, que as informações de natureza não contábil registradas no sistema foram 
                  elaboradas com base em dados fornecidos pela organização e por seus responsáveis técnicos, 
                  especialistas com quem compartilho a responsabilidade por essas informações.
                </p>
                <p>
                  Reconheço que a Demonstração de Informações de Natureza Social e Ambiental gerada pelo 
                  BSI-BSA poderá ser objeto de revisão por auditor independente, nos casos em que a entidade 
                  estiver submetida a esse procedimento.
                </p>
                <p>
                  Declaro ciência de que todas as informações registradas no sistema são passíveis de 
                  verificação posterior, assumindo integral responsabilidade técnica pelos relatórios finais 
                  emitidos pelo BSI-BSA no exercício de referência.
                </p>
              </div>
            </div>

            <label className="flex items-start gap-3 p-4 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-500 transition">
              <input
                type="checkbox"
                className="mt-1"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              <span className="font-medium text-gray-900">
                ACEITO E DECLARO CIÊNCIA de todo o conteúdo acima
              </span>
            </label>

            <div className="flex gap-4 mt-6">
              <button onClick={() => setStep(2)} className="flex-1 btn btn-outline">
                Voltar
              </button>
              <button
                disabled={!accepted}
                className="flex-1 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Finalizar e Abrir Exercício
                <FileCheck size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// ============================================
// CONTINUA NO PRÓXIMO ARQUIVO...
// ============================================
