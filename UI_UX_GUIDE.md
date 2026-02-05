# 🎨 BSI-BSAM - GUIA COMPLETO DE UI/UX

## 📦 ESTRUTURA DOS ARQUIVOS DE DESIGN

Este pacote contém **TUDO** sobre o design visual e experiência do usuário:

### **1. DESIGN_SYSTEM.md** 
Sistema de design completo com:
- ✅ Paleta de cores (Verde Amazônia + Azul NBC T15)
- ✅ Tipografia (Lexend + JetBrains Mono)
- ✅ Espaçamento e grid system
- ✅ Componentes base (buttons, cards, badges, inputs, tables)
- ✅ Animações e micro-interações
- ✅ Tema escuro (opcional)
- ✅ Guidelines de uso

### **2. UI_COMPONENTS_PARTE1.tsx**
Componentes React prontos:
- ✅ Layout Principal (sidebar + topbar + navegação)
- ✅ Dashboard (home com stats e gráficos)
- ✅ FIO - Formulário de Inicialização (3 steps)

### **3. UI_COMPONENTS_PARTE2.tsx**
Componentes React prontos:
- ✅ Matrix IRES (tabela completa com filtros)
- ✅ Formulário ELE - DVA (com cálculo automático)

### **4. UI_COMPONENTS_PARTE3.tsx**
Componentes React prontos:
- ✅ Validação Documental (checklist VD)
- ✅ Formulário ESA - Social Externo
- ✅ Toast de notificações

---

## 🎨 CONCEITO VISUAL

### **Direção Estética**
**"Corporate Sustainability meets Data Transparency"**

**Características:**
- 🟢 Verde Amazônia como cor primária (conexão com sustentabilidade)
- 🔵 Azul NBC T15 como secundária (profissionalismo contábil)
- 📊 Dados visuais em tempo real (progress bars, indicadores)
- 🎯 Interface limpa mas rica em informação
- ✨ Micro-interações sutis (hover, transitions)

---

## 📐 WIREFRAMES EM TEXTO

### **TELA 1: DASHBOARD**

```
┌────────────────────────────────────────────────────────────────┐
│ [☰] BSI-BSAM                          [🔔] [👤 João Ribeiro] │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Dashboard                                                      │
│  Visão geral do exercício 2026                                │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ 📄 2026  │  │ ✓ 42/60  │  │ ↑ 35     │  │ ↓ 7      │      │
│  │ Exercício│  │ Validados│  │ Ativos   │  │ Passivos │      │
│  │ +100%    │  │ 70%      │  │ +12%     │  │ -3%      │      │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘      │
│                                                                 │
│  ┌─────────────────────────────────────┬───────────────────┐  │
│  │ Progresso por Bloco                 │ Atividade Recente │  │
│  │                                     │                    │  │
│  │ 💵 Econômico    ████████ 100%       │ • ELE-DVA válido  │  │
│  │    ↑ 7  ↓ 1                         │   há 5 min        │  │
│  │                                     │                    │  │
│  │ 👥 Social       █████░░░ 72%        │ • ESA criado      │  │
│  │    ↑ 15 ↓ 3                         │   há 12 min       │  │
│  │                                     │                    │  │
│  │ 🌿 Ambiental    ██████░░ 64%        │ • Doc pendente    │  │
│  │    ↑ 8  ↓ 1                         │   há 1h           │  │
│  │                                     │                    │  │
│  │ 🛡️  Governança   ████░░░░ 54%        │ • ELE reprovado   │  │
│  │    ↑ 5  ↓ 2                         │   há 2h           │  │
│  └─────────────────────────────────────┴───────────────────┘  │
│                                                                 │
│  ⚠️  7 itens pendentes de validação                            │
│     [Ver Pendências]                                           │
└────────────────────────────────────────────────────────────────┘
```

---

### **TELA 2: MATRIX IRES**

```
┌────────────────────────────────────────────────────────────────┐
│ Matrix IRES                                    [📄 Exportar]   │
│ Exercício 2026 • Amazontech                   [✓ Finalizar]   │
│                                                                 │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ │
│  │ 💵 Econômico│ │ 👥 Social  │ │ 🌿 Ambiental│ │ 🛡️ Governança│ │
│  │ 8/8 ✓      │ │ 18/25      │ │ 9/14       │ │ 7/13       │ │
│  │ ████████   │ │ █████░░░   │ │ ██████░░   │ │ ████░░░░   │ │
│  │ ↑7  ↓1     │ │ ↑15 ↓3     │ │ ↑8  ↓1     │ │ ↑5  ↓2     │ │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘ │
│                                                                 │
│  [🔍 Buscar...]                [Todos] [Validados] [Pendentes] │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ Código │ Origem      │ Requisito        │ Eixo │ Status   ││
│  ├────────┼─────────────┼──────────────────┼──────┼──────────┤│
│  │ E-01   │ NBC T 15... │ Receitas         │ ECO  │ ↑ Ativo  ││
│  │ E-05   │ NBC T 15... │ DVA - Pessoal    │ ECO  │ ↑ Ativo  ││
│  │ RH-01  │ NBC T 15... │ Remuneração      │ SOC  │ ↑ Ativo  ││
│  │ RH-14  │ NBC T 15... │ Total empregados │ SOC  │ — Neutro ││
│  │ AMB-01 │ NBC T 15... │ Invest. processos│ AMB  │ ↑ Ativo  ││
│  │ GOV-01 │ ABNT PR...  │ Governança org.  │ GOV  │ ↓ Passivo││
│  └────────────────────────────────────────────────────────────┘│
└────────────────────────────────────────────────────────────────┘
```

---

### **TELA 3: FORMULÁRIO ELE (DVA)**

```
┌────────────────────────────────────────────────────────────────┐
│ ← Matrix IRES / E-05 - DVA Pessoal                             │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ 💵  Distribuição do Valor Adicionado – Pessoal       [ELE] ││
│  │     NBC T 15 – 15.2.1 / DVA • Código: E-05                 ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                 │
│  ┌─ ① Responsável pelas Informações ─────────────────────────┐│
│  │ Departamento: [Contabilidade___]                           ││
│  │ Responsável:  [João Ribeiro____]  Cargo: [Contador_____]  ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                 │
│  ┌─ ② Valores Monetários Declarados ─────────────────────────┐│
│  │ Descrição: [DVA - Pessoal_____________________________]    ││
│  │                                                             ││
│  │ Valor Declarado:        R$ [18.450.000,00_____________]    ││
│  │ Valor Adicionado Total: R$ [42.000.000,00_____________]    ││
│  │                                                             ││
│  │ ┌─ Indicador Derivado (Auto) ────────────────────────┐    ││
│  │ │         43.93%                            [AUTO]    │    ││
│  │ │ (Valor Pessoal ÷ VA Total) × 100                   │    ││
│  │ └─────────────────────────────────────────────────────┘    ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                 │
│  ┌─ ③ Documentação Comprobatória ────────────────────────────┐│
│  │  [📤 Clique ou arraste arquivos]                           ││
│  │                                                             ││
│  │  ✓ DVA_2025.pdf (1.2 MB)                          [Ver]    ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                 │
│  [← Voltar]                                 [💾 Salvar Registro]│
└────────────────────────────────────────────────────────────────┘
```

---

### **TELA 4: VALIDAÇÃO DOCUMENTAL**

```
┌────────────────────────────────────────────────────────────────┐
│  ✅ Validação Documental (VD)                                  │
│     ELE-CON-EEC-I-2025-001 • DVA Pessoal                      │
│                                                                 │
│  ⚠️  Etapa Obrigatória - Gate do Processo                      │
│     Se QUALQUER item = NÃO → PASSIVO automático               │
│                                                                 │
│  ┌─ Documentos Anexados ────────────────────────────────────┐ │
│  │ 📄 DVA_2025.pdf (1.2 MB)                          [Ver]   │ │
│  │ 📊 Balancete_Dez_2025.xlsx (850 KB)              [Ver]   │ │
│  └────────────────────────────────────────────────────────────┘│
│                                                                 │
│  ┌─ Checklist de Validação ─────────────────────────────────┐ │
│  │                                                            │ │
│  │ ☑️ Documentos foram anexados?                    ✓        │ │
│  │ ☑️ Campos obrigatórios preenchidos?              ✓        │ │
│  │ ☑️ Documentos íntegros e legíveis?               ✓        │ │
│  │ ☑️ Coerência entre dados e documentos?           ✓        │ │
│  │ ☑️ Assinatura do responsável presente?           ✓        │ │
│  │ ☑️ Documentos registrados no depto?              ✓        │ │
│  │ ☑️ Exercício corresponde ao declarado?           ✓        │ │
│  │                                                            │ │
│  │ Progresso: ████████████████████████████ 7/7               │ │
│  └────────────────────────────────────────────────────────────┘│
│                                                                 │
│  ✅ Validação Documental APROVADA                              │
│     VI liberada. Registro pode prosseguir.                    │
│                                                                 │
│  [Cancelar]                    [✓ Aprovar e Liberar VI]        │
└────────────────────────────────────────────────────────────────┘
```

---

## 🎨 PALETA DE CORES VISUAL

```
VERDE AMAZÔNIA (Primária)
██ #f0fdf4  ██ #dcfce7  ██ #bbf7d0  ██ #86efac  ██ #16a34a
50          100         200         300         500 ⭐

AZUL NBC T15 (Secundária)
██ #eff6ff  ██ #dbeafe  ██ #bfdbfe  ██ #60a5fa  ██ #2563eb
50          100         200         400         500 ⭐

NEUTROS
██ #fafafa  ██ #f5f5f5  ██ #e5e5e5  ██ #737373  ██ #171717
50          100         200         500         900

CLASSIFICAÇÕES
✅ Ativo:   ██ #dcfce7 bg  ██ #166534 text  ██ #86efac border
❌ Passivo: ██ #fee2e2 bg  ██ #991b1b text  ██ #fca5a5 border
⏸️  Neutro:  ██ #f3f4f6 bg  ██ #6b7280 text  ██ #d1d5db border
```

---

## ✍️ TIPOGRAFIA

```
DISPLAY (Títulos)
Lexend - Bold (700)
━━━━━━━━━━━━━━━━━━
Grande Título (48px)
Título Página (36px)
Subtítulo (24px)

BODY (Texto)
Lexend - Regular (400)
──────────────────────
Parágrafo normal (16px)
Texto pequeno (14px)
Caption (12px)

MONO (Números/Códigos)
JetBrains Mono
▂▃▄▅▆▇█▇▆▅▄▃▂
R$ 18.450.000,00
E-05, RH-01, AMB-06
```

---

## 🎯 COMPONENTES CHAVE

### **1. Indicador de Classificação**

```
┌─────────────────────┐
│ ↑ Ativo            │  Verde
│ (Impacto Positivo) │
└─────────────────────┘

┌─────────────────────┐
│ ↓ Passivo          │  Vermelho
│ (Requer Atenção)   │
└─────────────────────┘

┌─────────────────────┐
│ — Neutro           │  Cinza
│ (Aguardando)       │
└─────────────────────┘
```

### **2. Badge de Eixo**

```
[ECONOMICO]  Azul
[SOCIAL]     Rosa
[AMBIENTAL]  Verde
[GOVERNANCA] Roxo
```

### **3. Progress Bar**

```
Validação: ████████████░░░░ 75%
           15/20 validados
```

### **4. Card de Bloco**

```
┌──────────────────────┐
│ 💵 Econômico    [3]  │  ← Badge pendentes
│                      │
│ Total: 8             │
│ Validados: 8/8       │
│ ████████████ 100%    │  ← Progress bar
│                      │
│ ↑ 7      ↓ 1        │  ← Ativos/Passivos
└──────────────────────┘
```

---

## 🔄 FLUXOS DE NAVEGAÇÃO

### **FLUXO 1: Criar FIO**

```
Login → Dashboard → [Criar FIO] → 
  Step 1: Dados Org → 
  Step 2: Responsáveis → 
  Step 3: Declaração → 
  ✅ FIO Aberto → Matrix IRES
```

### **FLUXO 2: Preencher ELE**

```
Matrix IRES → Selecionar Item → 
  Formulário ELE → 
  Upload Docs → 
  💾 Salvar → 
  Aguardar Validação
```

### **FLUXO 3: Validar ELE**

```
Matrix IRES → Item Pendente → 
  Ver Documentos → 
  Validação VD (Checklist) → 
  ✅ Aprovado → Libera VI → 
  Validação VI → 
  ✅ Classificação: ATIVO
```

### **FLUXO 4: Criar ESA**

```
Matrix IRES → Item ESA → 
  Formulário ESA → 
  Adicionar Ações → 
  Resp. Técnico → 
  Upload Docs → 
  💾 Salvar → 
  Aguardar Validação
```

---

## 📱 RESPONSIVIDADE

### **Desktop (1440px+)**
- Sidebar fixa visível
- Grid 4 colunas para stats
- Tabela completa

### **Tablet (768px - 1024px)**
- Sidebar colapsável
- Grid 2 colunas para stats
- Tabela com scroll horizontal

### **Mobile (< 768px)**
- Menu hamburguer
- Grid 1 coluna
- Cards stacked
- Tabela → Cards mobile

---

## 🎬 ANIMAÇÕES

### **Entrada de Tela**
```css
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
```

### **Hover em Cards**
```css
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px rgba(0,0,0,0.1);
}
```

### **Progress Bars**
```css
.progress {
  transition: width 0.5s ease-out;
}
```

---

## 🎨 EXEMPLOS DE USO

### **Botão Primário**
```tsx
<button className="btn btn-primary">
  <Save size={20} />
  Salvar Registro
</button>
```

### **Badge de Status**
```tsx
<span className="indicador indicador-ativo">
  Ativo
</span>
```

### **Card de Informação**
```tsx
<div className="card">
  <div className="card-header">
    <h3 className="card-title">Econômico</h3>
  </div>
  <div className="card-body">
    <!-- conteúdo -->
  </div>
</div>
```

---

## 📦 COMO USAR

### **1. Importe o Design System**
```tsx
import './DESIGN_SYSTEM.css'
```

### **2. Use os Componentes**
```tsx
import { Dashboard } from './UI_COMPONENTS_PARTE1'
import { MatrixIRES } from './UI_COMPONENTS_PARTE2'
import { ValidacaoDocumental } from './UI_COMPONENTS_PARTE3'
```

### **3. Aplique as Classes**
```tsx
<div className="container">
  <h1 className="h1">Título</h1>
  <p className="body">Texto</p>
  <button className="btn btn-primary">Ação</button>
</div>
```

---

## ✨ DIFERENCIAIS DO DESIGN

1. **Verde Amazônia** - Conexão com sustentabilidade regional
2. **Lexend** - Fonte moderna e legível (não-genérica)
3. **Indicadores Visuais** - ↑ ↓ — para classificação instantânea
4. **Gradientes Sutis** - Progress bars e badges
5. **Micro-animações** - Feedback visual em todas as interações
6. **Dados em Tempo Real** - Sempre visível (stats, progress)
7. **Profissional + Acessível** - Sério mas não intimidador

---

## 🎯 PRINCÍPIOS DE DESIGN

1. **Clareza** - Informação direta sem ruído visual
2. **Hierarquia** - Tamanhos e cores guiam o olhar
3. **Consistência** - Padrões repetidos em todo o sistema
4. **Feedback** - Toda ação tem resposta visual
5. **Eficiência** - Menos cliques, mais resultados
6. **Acessibilidade** - Contraste WCAG AA, foco visível

---

**Design System completo e pronto para implementação! 🎨**
