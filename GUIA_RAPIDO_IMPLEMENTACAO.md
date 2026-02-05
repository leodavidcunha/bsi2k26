# 🚀 GUIA RÁPIDO DE IMPLEMENTAÇÃO - READDY.AI

## 📦 PASSO A PASSO PARA O DESENVOLVEDOR

---

## 1️⃣ SETUP INICIAL (30 min)

### **A) Criar Projeto no Supabase**

```bash
# 1. Acesse supabase.com
# 2. Criar novo projeto
# 3. Copiar as credenciais:
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_ANON_KEY=sua-chave-anon
```

### **B) Executar SQL**

```bash
# No Supabase Dashboard:
# SQL Editor > New Query > Colar database_schema.sql > Run
# SQL Editor > New Query > Colar seed_matrix_ires.sql > Run
```

### **C) Configurar Storage**

```sql
-- No SQL Editor
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false);

-- Policy para upload (contador + agente ESG)
CREATE POLICY "authenticated_upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'documents');

-- Policy para download (mesmo perfil)
CREATE POLICY "own_documents_download"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'documents');
```

---

## 2️⃣ ESTRUTURA DO PROJETO READDY.AI

### **Criar pastas:**

```
src/
├── lib/
│   └── supabase.ts          # Cliente Supabase
├── types/
│   └── database.types.ts    # Types do Supabase
├── components/
│   ├── FIO/                 # Formulário inicial
│   ├── Matrix/              # Tabela Matrix IRES
│   ├── ELE/                 # Formulários ELE
│   ├── ESA/                 # Formulários ESA
│   ├── Validacao/           # Checklists
│   └── Relatorios/          # PDFs
├── hooks/
│   └── useSupabase.ts       # Hooks customizados
└── utils/
    ├── calculations.ts      # Cálculos
    └── fileHash.ts          # SHA256
```

---

## 3️⃣ CONFIGURAÇÃO SUPABASE

### **lib/supabase.ts**

```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper para pegar usuário atual
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  return { ...user, profile };
};
```

---

## 4️⃣ TIPOS DO BANCO (Auto-gerados)

```bash
# Instalar CLI do Supabase
npm install -g supabase

# Gerar tipos
npx supabase gen types typescript \
  --project-id seu-projeto-id \
  > src/types/database.types.ts
```

---

## 5️⃣ COMPONENTES ESSENCIAIS

### **A) Hook useMatrixItems**

```typescript
// hooks/useMatrixItems.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useMatrixItems = (exerciseId: string) => {
  return useQuery({
    queryKey: ['matrix', exerciseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('v_matrix_ires')
        .select('*')
        .eq('fio_exercise_id', exerciseId)
        .order('ordem_exibicao');
      
      if (error) throw error;
      return data;
    }
  });
};
```

### **B) Formulário FIO**

```typescript
// components/FIO/FIOForm.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export const FIOForm = () => {
  const [form, setForm] = useState({
    cnpj: '',
    razao_social: '',
    contador_nome: '',
    contador_crc: '',
    agente_esg_nome: '',
    agente_esg_departamento: ''
  });
  
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!declarationAccepted) {
      alert('É necessário aceitar a declaração NBC T15');
      return;
    }
    
    // 1. Criar organização
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .upsert({
        cnpj: form.cnpj,
        razao_social: form.razao_social
      })
      .select()
      .single();
    
    if (orgError) throw orgError;
    
    // 2. Pegar IP do usuário
    const ip = await fetch('https://api.ipify.org?format=json')
      .then(r => r.json())
      .then(data => data.ip);
    
    // 3. Criar exercício FIO
    const { data: fio } = await supabase
      .from('fio_exercises')
      .insert({
        organization_id: org.id,
        exercise_year: new Date().getFullYear(),
        contador_nome: form.contador_nome,
        contador_crc: form.contador_crc,
        agente_esg_nome: form.agente_esg_nome,
        agente_esg_departamento: form.agente_esg_departamento,
        declaration_accepted: true,
        declaration_accepted_at: new Date().toISOString(),
        declaration_ip_address: ip,
        status: 'aberto'
      })
      .select()
      .single();
    
    // 4. Redirecionar para Matrix IRES
    window.location.href = `/matrix/${fio.id}`;
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">FIO - Formulário de Informações da Organização</h1>
      
      {/* CAMPOS DO FORMULÁRIO */}
      <input
        type="text"
        placeholder="CNPJ"
        value={form.cnpj}
        onChange={e => setForm(f => ({ ...f, cnpj: e.target.value }))}
        className="w-full px-4 py-2 border rounded"
      />
      
      {/* ... outros campos ... */}
      
      {/* DECLARAÇÃO NBC T15 */}
      <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
        <h3 className="font-bold mb-2">Declaração de Responsabilidade Técnica</h3>
        <p className="text-sm mb-4">
          Declaro, na qualidade de Responsável Contador, devidamente registrado no CRC,
          que as informações contábeis apresentadas no âmbito do BSI-BSA...
          {/* texto completo */}
        </p>
        
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={declarationAccepted}
            onChange={e => setDeclarationAccepted(e.target.checked)}
          />
          <span className="font-medium">ACEITO E DECLARO CIÊNCIA</span>
        </label>
      </div>
      
      <button
        type="submit"
        disabled={!declarationAccepted}
        className="w-full py-3 bg-blue-600 text-white rounded font-bold disabled:opacity-50"
      >
        Abrir Exercício
      </button>
    </form>
  );
};
```

### **C) Matrix IRES (Visão Geral)**

```typescript
// components/Matrix/MatrixIRES.tsx
'use client';

import { useMatrixItems } from '@/hooks/useMatrixItems';
import { useMemo, useState } from 'react';
import { groupBy } from 'lodash';

export const MatrixIRES = ({ exerciseId }: { exerciseId: string }) => {
  const { data: items, isLoading } = useMatrixItems(exerciseId);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  
  const blocks = useMemo(() => {
    if (!items) return [];
    
    const grouped = groupBy(items, 'bloco_nome');
    return Object.entries(grouped).map(([nome, items]) => ({
      nome,
      total: items.length,
      validados: items.filter(i => i.validado).length,
      ativos: items.filter(i => i.classificacao === 'ativo').length,
      passivos: items.filter(i => i.classificacao === 'passivo').length
    }));
  }, [items]);
  
  if (isLoading) return <div>Carregando...</div>;
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Matrix IRES - Exercício 2026</h1>
      
      {/* BLOCOS */}
      <div className="grid grid-cols-5 gap-4">
        {blocks.map(block => (
          <button
            key={block.nome}
            onClick={() => setSelectedBlock(block.nome)}
            className={`p-4 rounded-lg border-2 transition ${
              selectedBlock === block.nome
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-sm font-semibold mb-2">{block.nome}</div>
            <div className="space-y-1 text-xs text-gray-600">
              <div>Total: {block.total}</div>
              <div>Validados: {block.validados}/{block.total}</div>
              <div className="flex gap-2 mt-2">
                <span className="text-green-600 font-medium">↑ {block.ativos}</span>
                <span className="text-red-600 font-medium">↓ {block.passivos}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {/* TABELA */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Código</th>
              <th className="p-3 text-left">Origem Normativa</th>
              <th className="p-3 text-left">Requisito</th>
              <th className="p-3 text-left">Eixo</th>
              <th className="p-3 text-left">Tipo</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {items
              ?.filter(i => !selectedBlock || i.bloco_nome === selectedBlock)
              .map(item => (
                <tr key={item.codigo} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-mono text-sm">{item.codigo}</td>
                  <td className="p-3 text-xs text-gray-600">{item.origem_normativa}</td>
                  <td className="p-3">{item.requisito}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {item.eixo}-{item.ambito}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                      {item.tipo_registro}
                    </span>
                  </td>
                  <td className="p-3">
                    {item.classificacao === 'ativo' && (
                      <span className="text-green-600 font-bold">↑ Ativo</span>
                    )}
                    {item.classificacao === 'passivo' && (
                      <span className="text-red-600 font-bold">↓ Passivo</span>
                    )}
                    {item.classificacao === 'neutro' && (
                      <span className="text-gray-600">— Pendente</span>
                    )}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => window.location.href = `/${item.tipo_registro.toLowerCase()}/${item.id}`}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                    >
                      {item.validado ? 'Ver' : 'Preencher'}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
```

### **D) Formulário ELE + DVA**

```typescript
// components/ELE/ELE_DVA.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export const ELE_DVA = ({ matrixItemId, fioExerciseId }: Props) => {
  const [form, setForm] = useState({
    departamento: '',
    responsavel_nome: '',
    responsavel_cargo: '',
    descricao_origem: '',
    valor_declarado: 0,
    valor_base_calculo: 0
  });
  
  // Cálculo automático do percentual
  const percentualDerivado = useMemo(() => {
    if (!form.valor_base_calculo) return 0;
    return ((form.valor_declarado / form.valor_base_calculo) * 100).toFixed(2);
  }, [form.valor_declarado, form.valor_base_calculo]);
  
  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from('ele_records')
      .insert({
        fio_exercise_id: fioExerciseId,
        matrix_item_id: matrixItemId,
        codigo_registro: `ELE-CON-EEC-I-${new Date().getFullYear()}-001`,
        departamento: form.departamento,
        responsavel_nome: form.responsavel_nome,
        responsavel_cargo: form.responsavel_cargo,
        dados_declaratorios: {
          descricao_origem: form.descricao_origem,
          valor_declarado: form.valor_declarado,
          valor_base_calculo: form.valor_base_calculo,
          percentual_derivado: parseFloat(percentualDerivado)
        }
      });
    
    if (error) throw error;
    alert('Registro salvo com sucesso!');
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">ELE - Distribuição do Valor Adicionado</h2>
      
      {/* RESPONSABILIDADE */}
      <div className="bg-blue-50 p-4 rounded">
        <h3 className="font-bold mb-3">Responsável pelas Informações</h3>
        <input
          type="text"
          placeholder="Departamento"
          value={form.departamento}
          onChange={e => setForm(f => ({ ...f, departamento: e.target.value }))}
          className="w-full px-3 py-2 border rounded mb-2"
        />
        {/* ... outros campos ... */}
      </div>
      
      {/* VALORES */}
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Descrição da Origem do Valor</label>
          <input
            type="text"
            value={form.descricao_origem}
            onChange={e => setForm(f => ({ ...f, descricao_origem: e.target.value }))}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block font-medium mb-1">Valor Declarado (R$)</label>
          <input
            type="number"
            value={form.valor_declarado}
            onChange={e => setForm(f => ({ ...f, valor_declarado: parseFloat(e.target.value) }))}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block font-medium mb-1">Valor Adicionado Total (R$)</label>
          <input
            type="number"
            value={form.valor_base_calculo}
            onChange={e => setForm(f => ({ ...f, valor_base_calculo: parseFloat(e.target.value) }))}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        {/* INDICADOR DERIVADO */}
        <div className="bg-green-50 p-4 rounded">
          <div className="font-medium">Indicador Derivado (Calculado Automaticamente)</div>
          <div className="text-3xl font-bold text-green-600 mt-2">
            {percentualDerivado}%
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Base: Valor Declarado ÷ Valor Total × 100
          </div>
        </div>
      </div>
      
      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-blue-600 text-white rounded font-bold"
      >
        Salvar Registro
      </button>
    </div>
  );
};
```

### **E) Upload de Documentos**

```typescript
// components/Documents/DocumentUpload.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { SHA256 } from 'crypto-js';

export const DocumentUpload = ({ eleRecordId }: Props) => {
  const [uploading, setUploading] = useState(false);
  
  const calculateHash = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
    return SHA256(wordArray).toString();
  };
  
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    
    try {
      // 1. Calcular hash
      const hash = await calculateHash(file);
      
      // 2. Upload para Storage
      const filePath = `${eleRecordId}/${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      // 3. Salvar metadados
      const { error: dbError } = await supabase
        .from('documents')
        .insert({
          ele_record_id: eleRecordId,
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          file_type: file.type,
          file_hash: hash,
          document_type: 'DVA', // ou selecionar
          exercise_year: new Date().getFullYear()
        });
      
      if (dbError) throw dbError;
      
      alert('Documento enviado com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar documento');
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
      <input
        type="file"
        accept=".pdf,.xlsx,.docx"
        onChange={handleUpload}
        disabled={uploading}
        className="block w-full"
      />
      {uploading && <p className="text-sm text-gray-600 mt-2">Enviando...</p>}
    </div>
  );
};
```

### **F) Validação Documental (Checklist)**

```typescript
// components/Validacao/ValidacaoDocumental.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export const ValidacaoDocumental = ({ documentId }: Props) => {
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
  
  const handleSubmit = async () => {
    // 1. Salvar checklist
    await supabase
      .from('validation_checklists')
      .insert({
        document_id: documentId,
        ...checklist
      });
    
    // 2. Atualizar status do documento
    await supabase
      .from('documents')
      .update({
        validation_status: allApproved ? 'aprovado' : 'rejeitado'
      })
      .eq('id', documentId);
    
    // 3. Se reprovado, classificar como passivo
    if (!allApproved) {
      const { data: doc } = await supabase
        .from('documents')
        .select('ele_record_id')
        .eq('id', documentId)
        .single();
      
      await supabase
        .from('ele_records')
        .update({ classificacao: 'passivo' })
        .eq('id', doc.ele_record_id);
    }
    
    alert(allApproved ? 'Validação aprovada!' : 'Validação reprovada - Registro marcado como PASSIVO');
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Validação Documental (VD)</h2>
      
      <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
        <p className="text-sm font-medium">
          ⚠️ Esta etapa é obrigatória e prévia. Se algum item for marcado como "NÃO",
          o registro será automaticamente classificado como PASSIVO.
        </p>
      </div>
      
      <div className="space-y-3">
        {Object.entries(checklist).map(([key, value]) => (
          <label key={key} className="flex items-center gap-3 p-3 bg-white border rounded">
            <input
              type="checkbox"
              checked={value}
              onChange={e => setChecklist(c => ({ ...c, [key]: e.target.checked }))}
              className="w-5 h-5"
            />
            <span className="flex-1">
              {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </label>
        ))}
      </div>
      
      <button
        onClick={handleSubmit}
        className={`w-full py-3 rounded font-bold ${
          allApproved
            ? 'bg-green-600 text-white'
            : 'bg-red-600 text-white'
        }`}
      >
        {allApproved ? 'Aprovar Validação' : 'Reprovar Validação (PASSIVO)'}
      </button>
    </div>
  );
};
```

---

## 6️⃣ DEPLOY NO READDY.AI

### **Passos:**

1. **Conectar repositório Git** no Readdy.AI
2. **Configurar variáveis de ambiente:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
3. **Deploy automático** quando fizer push

---

## 7️⃣ CHECKLIST FINAL

### **Backend (Supabase):**
- [ ] Schema SQL executado
- [ ] Seeders executados
- [ ] Storage configurado
- [ ] RLS habilitado
- [ ] Triggers de audit criados

### **Frontend (Readdy.AI):**
- [ ] Cliente Supabase configurado
- [ ] Tipos gerados
- [ ] FIO funcional
- [ ] Matrix IRES funcional
- [ ] Formulários ELE funcionais
- [ ] Upload de documentos funcional
- [ ] Validação funcional

### **Testes:**
- [ ] Login com Contador
- [ ] Login com Agente ESG
- [ ] Criar FIO
- [ ] Criar ELE
- [ ] Upload documento
- [ ] Validar documento
- [ ] Ver classificação (ativo/passivo)

---

## 🎯 TIMELINE REALISTA

```
Semana 1-2:   Setup + FIO
Semana 3-4:   Matrix IRES + Navegação
Semana 5-8:   Formulários ELE
Semana 9-10:  Formulários ESA
Semana 11:    Upload documentos
Semana 12-13: Validação
Semana 14:    Relatórios
Semana 15:    Testes
Semana 16:    Deploy
```

**Total: 4 meses** 🚀

---

## 💡 DICAS PRO

1. **Use React Query** para cache de dados
2. **Use Zod** para validação de forms
3. **Use TailwindCSS** para styling rápido
4. **Use shadcn/ui** para componentes prontos
5. **Teste RLS no Supabase** antes de implementar no React

---

**ESTÁ PRONTO PARA COMEÇAR! 🎉**
