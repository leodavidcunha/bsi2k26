// ============================================
// BSI-BSAM - COMPONENTES UI PARTE 2
// ============================================

// ============================================
// 4. MATRIX IRES - VISÃO GERAL
// ============================================

'use client';

import { useState, useMemo } from 'react';
import { 
  DollarSign, Users, Leaf, Shield, 
  Search, Filter, TrendingUp, TrendingDown,
  FileText, CheckCircle, Clock
} from 'lucide-react';

export const MatrixIRES = () => {
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const blocos = [
    {
      nome: 'Econômico',
      codigo: 'ECO',
      icon: DollarSign,
      color: 'blue',
      total: 8,
      validados: 8,
      ativos: 7,
      passivos: 1,
      pendentes: 0
    },
    {
      nome: 'Social',
      codigo: 'SOC',
      icon: Users,
      color: 'pink',
      total: 25,
      validados: 18,
      ativos: 15,
      passivos: 3,
      pendentes: 7
    },
    {
      nome: 'Ambiental',
      codigo: 'AMB',
      icon: Leaf,
      color: 'green',
      total: 14,
      validados: 9,
      ativos: 8,
      passivos: 1,
      pendentes: 5
    },
    {
      nome: 'Governança',
      codigo: 'GOV',
      icon: Shield,
      color: 'purple',
      total: 13,
      validados: 7,
      ativos: 5,
      passivos: 2,
      pendentes: 6
    }
  ];

  const items = [
    {
      codigo: 'E-01',
      requisito: 'Receitas',
      origem: 'NBC T 15 – 15.2.1 / DVA',
      eixo: 'ECONOMICO',
      tipo: 'ELE',
      validado: true,
      classificacao: 'ativo'
    },
    {
      codigo: 'E-05',
      requisito: 'Distribuição do Valor Adicionado – Pessoal',
      origem: 'NBC T 15 – 15.2.1 / DVA',
      eixo: 'ECONOMICO',
      tipo: 'ELE',
      validado: true,
      classificacao: 'ativo'
    },
    {
      codigo: 'RH-01',
      requisito: 'Remuneração bruta segregada',
      origem: 'NBC T 15 – 15.2.2',
      eixo: 'SOCIAL',
      tipo: 'ELE',
      validado: true,
      classificacao: 'ativo'
    },
    {
      codigo: 'RH-14',
      requisito: 'Total de empregados no final do exercício',
      origem: 'NBC T 15 – 15.2.2.4',
      eixo: 'SOCIAL',
      tipo: 'ELE',
      validado: false,
      classificacao: 'neutro'
    },
    {
      codigo: 'AMB-01',
      requisito: 'Investimentos em processos operacionais',
      origem: 'NBC T 15 – 15.2.4',
      eixo: 'AMBIENTAL',
      tipo: 'ELE',
      validado: true,
      classificacao: 'ativo'
    },
    {
      codigo: 'GOV-GO-01',
      requisito: 'Estrutura e composição da governança',
      origem: 'ABNT PR 2030-1',
      eixo: 'GOVERNANCA',
      tipo: 'ELE',
      validado: true,
      classificacao: 'passivo'
    }
  ];

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.requisito.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.codigo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBlock = !selectedBlock || item.eixo.toLowerCase().includes(selectedBlock.toLowerCase());
      const matchesStatus = filterStatus === 'all' ||
                           (filterStatus === 'validados' && item.validado) ||
                           (filterStatus === 'pendentes' && !item.validado) ||
                           (filterStatus === 'ativos' && item.classificacao === 'ativo') ||
                           (filterStatus === 'passivos' && item.classificacao === 'passivo');
      return matchesSearch && matchesBlock && matchesStatus;
    });
  }, [searchTerm, selectedBlock, filterStatus, items]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Matrix IRES</h1>
          <p className="text-gray-500 mt-1">Exercício 2026 • Amazontech Eletroeletrônica</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn btn-outline">
            <FileText size={18} />
            Exportar
          </button>
          <button className="btn btn-primary">
            <CheckCircle size={18} />
            Finalizar Exercício
          </button>
        </div>
      </div>

      {/* BLOCOS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blocos.map((bloco, i) => (
          <button
            key={i}
            onClick={() => setSelectedBlock(selectedBlock === bloco.codigo ? null : bloco.codigo)}
            className={`
              text-left p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg
              ${selectedBlock === bloco.codigo
                ? `border-${bloco.color}-500 bg-${bloco.color}-50 shadow-md`
                : 'border-gray-200 bg-white hover:border-gray-300'
              }
            `}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-${bloco.color}-100 rounded-lg`}>
                <bloco.icon className={`text-${bloco.color}-600`} size={24} />
              </div>
              {bloco.pendentes > 0 && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">
                  {bloco.pendentes} pendentes
                </span>
              )}
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">{bloco.nome}</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total</span>
                <span className="font-semibold">{bloco.total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Validados</span>
                <span className="font-semibold text-blue-600">{bloco.validados}/{bloco.total}</span>
              </div>
              
              {/* PROGRESS BAR */}
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mt-3">
                <div
                  className={`absolute h-full bg-${bloco.color}-500 transition-all duration-500`}
                  style={{ width: `${(bloco.validados / bloco.total) * 100}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <span className="text-green-600 font-medium">↑ {bloco.ativos}</span>
                <span className="text-red-600 font-medium">↓ {bloco.passivos}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* FILTROS E BUSCA */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por código ou requisito..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-12 w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                filterStatus === 'all' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos ({items.length})
            </button>
            <button
              onClick={() => setFilterStatus('validados')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                filterStatus === 'validados' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Validados
            </button>
            <button
              onClick={() => setFilterStatus('pendentes')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                filterStatus === 'pendentes' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pendentes
            </button>
          </div>
        </div>
      </div>

      {/* TABELA */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Código</th>
                <th>Origem Normativa</th>
                <th>Requisito</th>
                <th>Eixo</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Classificação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, i) => (
                <tr key={i} className="hover:bg-primary-50 transition">
                  <td>
                    <span className="font-mono font-semibold text-gray-900">{item.codigo}</span>
                  </td>
                  <td>
                    <span className="text-xs text-gray-600">{item.origem}</span>
                  </td>
                  <td>
                    <span className="text-gray-900">{item.requisito}</span>
                  </td>
                  <td>
                    <span className={`badge badge-${item.eixo.toLowerCase()}`}>
                      {item.eixo}
                    </span>
                  </td>
                  <td>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                      {item.tipo}
                    </span>
                  </td>
                  <td>
                    {item.validado ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle size={16} />
                        <span className="text-sm font-medium">Validado</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-yellow-600">
                        <Clock size={16} />
                        <span className="text-sm font-medium">Pendente</span>
                      </span>
                    )}
                  </td>
                  <td>
                    <div className={`indicador indicador-${item.classificacao}`}>
                      {item.classificacao === 'ativo' ? 'Ativo' :
                       item.classificacao === 'passivo' ? 'Passivo' :
                       'Neutro'}
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary">
                      {item.validado ? 'Ver' : 'Preencher'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


// ============================================
// 5. FORMULÁRIO ELE - DVA
// ============================================

'use client';

import { useState, useMemo } from 'react';
import { DollarSign, Upload, Save, ArrowLeft } from 'lucide-react';

export const ELE_DVA_Form = () => {
  const [form, setForm] = useState({
    departamento: 'Contabilidade',
    responsavel_nome: 'João Ribeiro',
    responsavel_cargo: 'Contador',
    descricao_origem: 'DVA – Pessoal',
    valor_declarado: '18450000',
    valor_base_calculo: '42000000'
  });

  const percentualDerivado = useMemo(() => {
    const valor = parseFloat(form.valor_declarado) || 0;
    const base = parseFloat(form.valor_base_calculo) || 0;
    if (base === 0) return '0.00';
    return ((valor / base) * 100).toFixed(2);
  }, [form.valor_declarado, form.valor_base_calculo]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* BREADCRUMB */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <a href="/matrix" className="hover:text-primary-600">Matrix IRES</a>
        <span>/</span>
        <span className="text-gray-900 font-medium">E-05 - DVA Pessoal</span>
      </div>

      {/* HEADER */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-4 bg-blue-100 rounded-xl">
            <DollarSign className="text-blue-600" size={32} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Distribuição do Valor Adicionado – Pessoal
              </h1>
              <span className="badge badge-economico">ELE</span>
            </div>
            <p className="text-gray-600">NBC T 15 – 15.2.1 / DVA • Código: E-05</p>
            <p className="text-sm text-gray-500 mt-2">
              Parcela do Valor Adicionado destinada à remuneração direta e indireta do pessoal
            </p>
          </div>
        </div>
      </div>

      {/* RESPONSABILIDADE */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <h2 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
          <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
            1
          </span>
          Responsável pelas Informações
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="label">Departamento</label>
            <input
              type="text"
              className="input bg-white"
              value={form.departamento}
              onChange={(e) => setForm({ ...form, departamento: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Nome do Responsável</label>
            <input
              type="text"
              className="input bg-white"
              value={form.responsavel_nome}
              onChange={(e) => setForm({ ...form, responsavel_nome: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Cargo</label>
            <input
              type="text"
              className="input bg-white"
              value={form.responsavel_cargo}
              onChange={(e) => setForm({ ...form, responsavel_cargo: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* VALORES */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm">
            2
          </span>
          Valores Monetários Declarados
        </h2>
        
        <div className="space-y-6">
          <div>
            <label className="label">Descrição da Origem do Valor</label>
            <input
              type="text"
              className="input"
              value={form.descricao_origem}
              onChange={(e) => setForm({ ...form, descricao_origem: e.target.value })}
            />
            <p className="input-helper">
              Identificação resumida da origem contábil do valor (DVA – Pessoal)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="label">Valor Declarado (R$)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  R$
                </span>
                <input
                  type="number"
                  className="input pl-12 font-mono text-lg"
                  value={form.valor_declarado}
                  onChange={(e) => setForm({ ...form, valor_declarado: e.target.value })}
                  placeholder="0,00"
                />
              </div>
              <p className="input-helper">
                Parcela do VA destinada ao Pessoal conforme DVA
              </p>
            </div>

            <div>
              <label className="label">Valor Adicionado Total (R$)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  R$
                </span>
                <input
                  type="number"
                  className="input pl-12 font-mono text-lg"
                  value={form.valor_base_calculo}
                  onChange={(e) => setForm({ ...form, valor_base_calculo: e.target.value })}
                  placeholder="0,00"
                />
              </div>
              <p className="input-helper">
                Total do Valor Adicionado (base de cálculo)
              </p>
            </div>
          </div>

          {/* INDICADOR DERIVADO */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-300">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-green-900">Indicador Derivado (Calculado Automaticamente)</h3>
              <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                AUTO
              </span>
            </div>
            <div className="text-5xl font-bold text-green-700 mb-2">
              {percentualDerivado}%
            </div>
            <p className="text-sm text-green-700">
              Fórmula: (Valor Distribuído ao Pessoal ÷ Valor Adicionado Total) × 100
            </p>
          </div>
        </div>
      </div>

      {/* DOCUMENTOS */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm">
            3
          </span>
          Documentação Comprobatória
        </h2>
        
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-500 transition cursor-pointer">
          <Upload className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="font-medium text-gray-900 mb-2">
            Clique para fazer upload ou arraste arquivos
          </p>
          <p className="text-sm text-gray-500">
            DVA, Demonstrações Financeiras, Balancetes (PDF, XLSX, DOCX - máx 10MB)
          </p>
          <button className="btn btn-outline mt-4">
            Selecionar Arquivos
          </button>
        </div>

        {/* LISTA DE DOCUMENTOS */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded">
                <FileText className="text-green-600" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900">DVA_2025.pdf</p>
                <p className="text-xs text-gray-500">1.2 MB • Enviado há 2 horas</p>
              </div>
            </div>
            <CheckCircle className="text-green-600" size={20} />
          </div>
        </div>
      </div>

      {/* AÇÕES */}
      <div className="flex gap-4">
        <button className="btn btn-outline flex-1">
          <ArrowLeft size={20} />
          Voltar
        </button>
        <button className="btn btn-primary flex-1">
          <Save size={20} />
          Salvar Registro
        </button>
      </div>
    </div>
  );
};


// ============================================
// CONTINUA NO PRÓXIMO ARQUIVO...
// ============================================
