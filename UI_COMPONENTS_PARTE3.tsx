// ============================================
// BSI-BSAM - COMPONENTES UI PARTE 3 (FINAL)
// ============================================

// ============================================
// 6. VALIDAÇÃO DOCUMENTAL (VD)
// ============================================

'use client';

import { useState } from 'react';
import { AlertTriangle, CheckCircle2, X, FileCheck } from 'lucide-react';

export const ValidacaoDocumental = () => {
  const [checklist, setChecklist] = useState({
    documentos_anexados: false,
    campos_preenchidos: false,
    documentos_integros: false,
    coerencia_dados: false,
    assinatura_presente: false,
    registro_departamento: false,
    exercicio_corresponde: false
  });

  const allApproved = Object.values(checklist).every(v => v === true);
  const someChecked = Object.values(checklist).some(v => v === true);

  const checklistItems = [
    { key: 'documentos_anexados', label: 'Documentos foram anexados corretamente?' },
    { key: 'campos_preenchidos', label: 'Todos os campos obrigatórios foram preenchidos?' },
    { key: 'documentos_integros', label: 'Documentos estão íntegros, legíveis e completos?' },
    { key: 'coerencia_dados', label: 'Há coerência entre dados declarados e documentos?' },
    { key: 'assinatura_presente', label: 'Documentos possuem assinatura do responsável?' },
    { key: 'registro_departamento', label: 'Documentos estão registrados no departamento?' },
    { key: 'exercicio_corresponde', label: 'Exercício dos documentos corresponde ao declarado?' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-4 bg-yellow-100 rounded-xl">
            <FileCheck className="text-yellow-600" size={32} />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Validação Documental (VD)
            </h1>
            <p className="text-gray-600">
              ELE-CON-EEC-I-2025-001 • Distribuição do Valor Adicionado – Pessoal
            </p>
          </div>
        </div>
      </div>

      {/* ALERTA */}
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <AlertTriangle className="text-yellow-600 flex-shrink-0" size={24} />
          <div>
            <h3 className="font-bold text-yellow-900 mb-2">
              Etapa Obrigatória - Gate do Processo
            </h3>
            <p className="text-sm text-yellow-800 leading-relaxed">
              Esta validação é <strong>prévia e obrigatória</strong>. Se <strong>qualquer item</strong> for 
              marcado como <strong>NÃO</strong>, o registro será automaticamente classificado como 
              <strong className="text-red-700"> PASSIVO</strong> e a Validação Informacional (VI) não será liberada.
            </p>
          </div>
        </div>
      </div>

      {/* PREVIEW DOCUMENTOS */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-4">Documentos Anexados</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded">
                <FileCheck className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900">DVA_2025.pdf</p>
                <p className="text-xs text-gray-500">1.2 MB • Enviado em 04/02/2026 às 14:30</p>
              </div>
            </div>
            <button className="btn btn-sm btn-outline">
              Visualizar
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded">
                <FileCheck className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900">Balancete_Dez_2025.xlsx</p>
                <p className="text-xs text-gray-500">850 KB • Enviado em 04/02/2026 às 14:32</p>
              </div>
            </div>
            <button className="btn btn-sm btn-outline">
              Visualizar
            </button>
          </div>
        </div>
      </div>

      {/* CHECKLIST */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-6">Checklist de Validação</h2>
        
        <div className="space-y-4">
          {checklistItems.map((item, i) => (
            <label
              key={item.key}
              className={`
                flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition
                ${checklist[item.key as keyof typeof checklist]
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
                }
              `}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="w-6 h-6 rounded border-2 border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                    checked={checklist[item.key as keyof typeof checklist]}
                    onChange={(e) => setChecklist({
                      ...checklist,
                      [item.key]: e.target.checked
                    })}
                  />
                </div>
                <div>
                  <span className="text-gray-900 font-medium block">{item.label}</span>
                  {checklist[item.key as keyof typeof checklist] && (
                    <span className="text-xs text-green-600 font-medium mt-1 block">
                      ✓ Verificado
                    </span>
                  )}
                </div>
              </div>
              
              {checklist[item.key as keyof typeof checklist] ? (
                <CheckCircle2 className="text-green-600 flex-shrink-0" size={24} />
              ) : (
                <X className="text-gray-300 flex-shrink-0" size={24} />
              )}
            </label>
          ))}
        </div>

        {/* PROGRESS */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progresso</span>
            <span className="text-sm font-bold text-gray-900">
              {Object.values(checklist).filter(v => v).length}/7
            </span>
          </div>
          <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
              style={{ width: `${(Object.values(checklist).filter(v => v).length / 7) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* RESULTADO */}
      {someChecked && (
        <div className={`
          p-6 rounded-xl border-2 animate-fade-in
          ${allApproved
            ? 'bg-green-50 border-green-300'
            : 'bg-red-50 border-red-300'
          }
        `}>
          <div className="flex items-start gap-4">
            {allApproved ? (
              <CheckCircle2 className="text-green-600 flex-shrink-0" size={32} />
            ) : (
              <AlertTriangle className="text-red-600 flex-shrink-0" size={32} />
            )}
            <div className="flex-1">
              <h3 className={`font-bold text-xl mb-2 ${
                allApproved ? 'text-green-900' : 'text-red-900'
              }`}>
                {allApproved
                  ? 'Validação Documental APROVADA'
                  : 'Validação Documental REPROVADA'
                }
              </h3>
              <p className={`text-sm ${
                allApproved ? 'text-green-800' : 'text-red-800'
              }`}>
                {allApproved
                  ? 'Todos os itens foram verificados. A Validação Informacional (VI) foi liberada e o registro pode prosseguir para análise de coerência.'
                  : 'Um ou mais itens não foram aprovados. O registro será automaticamente classificado como PASSIVO e a Validação Informacional (VI) NÃO será liberada.'
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* AÇÕES */}
      <div className="flex gap-4">
        <button className="btn btn-outline flex-1">
          Cancelar
        </button>
        <button
          className={`btn flex-1 ${
            allApproved ? 'btn-primary' : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {allApproved ? 'Aprovar e Liberar VI' : 'Confirmar Reprovação (PASSIVO)'}
        </button>
      </div>
    </div>
  );
};


// ============================================
// 7. FORMULÁRIO ESA - SOCIAL EXTERNO
// ============================================

'use client';

import { useState } from 'react';
import { Users, Plus, Trash2, Save } from 'lucide-react';

export const ESA_SocialExterno = () => {
  const [acoes, setAcoes] = useState([
    {
      tipo: 'Educação técnica',
      descricao: 'Cursos de eletrônica básica com aulas teóricas e práticas',
      valor: '520000',
      publico: '210',
      resultado: '168 certificados emitidos'
    }
  ]);

  const [perfilPublico, setPerfilPublico] = useState({
    faixa_etaria: {
      '15_17': '150',
      '18_24': '270',
      '25_29': '80'
    },
    sexo: {
      'F': '220',
      'M': '280'
    }
  });

  const addAcao = () => {
    setAcoes([...acoes, {
      tipo: '',
      descricao: '',
      valor: '',
      publico: '',
      resultado: ''
    }]);
  };

  const removeAcao = (index: number) => {
    setAcoes(acoes.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-4 bg-pink-100 rounded-xl">
            <Users className="text-pink-600" size={32} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Investimentos em Educação (Comunidade)
              </h1>
              <span className="badge badge-social">ESA</span>
            </div>
            <p className="text-gray-600">NBC T 15 – 15.2.3 • Código: EXT-COM-01</p>
          </div>
        </div>
      </div>

      {/* RESPONSABILIDADE GESTÃO */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <h2 className="font-bold text-blue-900 mb-4">Responsável pela Gestão da Ação</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="label">Departamento</label>
            <input type="text" className="input bg-white" defaultValue="Sustentabilidade" />
          </div>
          <div>
            <label className="label">Nome</label>
            <input type="text" className="input bg-white" defaultValue="Ana Carolina" />
          </div>
          <div>
            <label className="label">Cargo</label>
            <input type="text" className="input bg-white" defaultValue="Gerente ESG" />
          </div>
        </div>
      </div>

      {/* RESPONSABILIDADE TÉCNICA */}
      <div className="bg-green-50 p-6 rounded-xl border border-green-200">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="font-bold text-green-900">Responsável Técnico Profissional</h2>
          <span className="px-2 py-1 bg-green-600 text-white text-xs font-bold rounded">
            OBRIGATÓRIO
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Nome Completo</label>
            <input type="text" className="input bg-white" placeholder="Ex: Juliana Martins" />
          </div>
          <div>
            <label className="label">Formação</label>
            <input type="text" className="input bg-white" placeholder="Ex: Assistente Social" />
          </div>
          <div>
            <label className="label">Conselho Profissional</label>
            <input type="text" className="input bg-white" placeholder="Ex: CRESS" />
          </div>
          <div>
            <label className="label">Número do Registro</label>
            <input type="text" className="input bg-white" placeholder="Ex: CRESS-13 12345" />
          </div>
        </div>
      </div>

      {/* AÇÕES EXECUTADAS */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-gray-900">Ações Executadas</h2>
          <button onClick={addAcao} className="btn btn-sm btn-primary">
            <Plus size={16} />
            Adicionar Ação
          </button>
        </div>

        <div className="space-y-6">
          {acoes.map((acao, i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-xl border border-gray-200 relative">
              <button
                onClick={() => removeAcao(i)}
                className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 size={18} />
              </button>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="label">Tipo de Ação</label>
                  <select className="input">
                    <option>Educação técnica</option>
                    <option>Educação básica</option>
                    <option>Educação profissional</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div>
                  <label className="label">Valor Aplicado (R$)</label>
                  <input
                    type="number"
                    className="input font-mono"
                    value={acao.valor}
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="label">Descrição da Ação Executada</label>
                <textarea
                  className="input min-h-[100px]"
                  value={acao.descricao}
                  placeholder="Descreva detalhadamente a ação realizada..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Público Beneficiado (quantidade)</label>
                  <input
                    type="number"
                    className="input"
                    value={acao.publico}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="label">Resultado Mensurável</label>
                  <input
                    type="text"
                    className="input"
                    value={acao.resultado}
                    placeholder="Ex: 168 certificados emitidos"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PERFIL DO PÚBLICO */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-6">Perfil do Público Beneficiado (Consolidado)</h2>
        
        <div className="grid grid-cols-2 gap-6">
          {/* FAIXA ETÁRIA */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Faixa Etária</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <label className="flex-1 text-sm text-gray-700">15 a 17 anos</label>
                <input type="number" className="input w-24" value={perfilPublico.faixa_etaria['15_17']} />
              </div>
              <div className="flex items-center gap-3">
                <label className="flex-1 text-sm text-gray-700">18 a 24 anos</label>
                <input type="number" className="input w-24" value={perfilPublico.faixa_etaria['18_24']} />
              </div>
              <div className="flex items-center gap-3">
                <label className="flex-1 text-sm text-gray-700">25 a 29 anos</label>
                <input type="number" className="input w-24" value={perfilPublico.faixa_etaria['25_29']} />
              </div>
            </div>
          </div>

          {/* SEXO */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Sexo</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <label className="flex-1 text-sm text-gray-700">Feminino</label>
                <input type="number" className="input w-24" value={perfilPublico.sexo.F} />
              </div>
              <div className="flex items-center gap-3">
                <label className="flex-1 text-sm text-gray-700">Masculino</label>
                <input type="number" className="input w-24" value={perfilPublico.sexo.M} />
              </div>
            </div>
          </div>
        </div>

        {/* TOTAIS */}
        <div className="mt-6 p-4 bg-primary-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900">Total Geral de Beneficiados</span>
            <span className="text-2xl font-bold text-primary-700">
              {parseInt(perfilPublico.sexo.F) + parseInt(perfilPublico.sexo.M)}
            </span>
          </div>
        </div>
      </div>

      {/* AÇÕES */}
      <div className="flex gap-4">
        <button className="btn btn-outline flex-1">
          Cancelar
        </button>
        <button className="btn btn-primary flex-1">
          <Save size={20} />
          Salvar ESA
        </button>
      </div>
    </div>
  );
};


// ============================================
// 8. COMPONENTE DE TOAST/NOTIFICAÇÃO
// ============================================

export const Toast = ({ message, type = 'success' }: any) => {
  const config = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-500',
      text: 'text-green-900',
      icon: CheckCircle2
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      text: 'text-red-900',
      icon: AlertTriangle
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-900',
      icon: FileCheck
    }
  };

  const { bg, border, text, icon: Icon } = config[type];

  return (
    <div className={`
      ${bg} ${text} border-l-4 ${border} p-4 rounded-lg shadow-lg
      flex items-center gap-3 animate-slide-in
    `}>
      <Icon size={20} />
      <p className="font-medium">{message}</p>
    </div>
  );
};
