# 🎨 BSI-BSAM DESIGN SYSTEM

## 📐 CONCEITO DE DESIGN

### **Direção Estética: "Corporate Sustainability meets Data Transparency"**

**Tom:** Profissional confiável com toques de modernidade sustentável  
**Personalidade:** Sério mas acessível, técnico mas humano  
**Diferencial:** Uso ousado de verde floresta + dados visuais em tempo real

---

## 🎨 PALETA DE CORES

### **Cores Primárias**

```css
:root {
  /* Verde Amazônia (Principal) */
  --primary-50: #f0fdf4;
  --primary-100: #dcfce7;
  --primary-200: #bbf7d0;
  --primary-300: #86efac;
  --primary-400: #4ade80;
  --primary-500: #16a34a;  /* Verde floresta principal */
  --primary-600: #15803d;
  --primary-700: #166534;
  --primary-800: #14532d;
  --primary-900: #052e16;

  /* Azul Contabilidade (Secundário) */
  --secondary-50: #eff6ff;
  --secondary-100: #dbeafe;
  --secondary-200: #bfdbfe;
  --secondary-300: #93c5fd;
  --secondary-400: #60a5fa;
  --secondary-500: #2563eb;  /* Azul NBC T15 */
  --secondary-600: #1d4ed8;
  --secondary-700: #1e40af;
  --secondary-800: #1e3a8a;
  --secondary-900: #172554;

  /* Neutros */
  --gray-50: #fafafa;
  --gray-100: #f5f5f5;
  --gray-200: #e5e5e5;
  --gray-300: #d4d4d4;
  --gray-400: #a3a3a3;
  --gray-500: #737373;
  --gray-600: #525252;
  --gray-700: #404040;
  --gray-800: #262626;
  --gray-900: #171717;

  /* Estados */
  --success: #16a34a;     /* Verde */
  --warning: #f59e0b;     /* Âmbar */
  --error: #dc2626;       /* Vermelho */
  --info: #2563eb;        /* Azul */

  /* Classificações */
  --ativo-bg: #dcfce7;
  --ativo-text: #166534;
  --ativo-border: #86efac;
  
  --passivo-bg: #fee2e2;
  --passivo-text: #991b1b;
  --passivo-border: #fca5a5;
  
  --neutro-bg: #f3f4f6;
  --neutro-text: #6b7280;
  --neutro-border: #d1d5db;
}
```

### **Uso Semântico**

```css
:root {
  /* Backgrounds */
  --bg-primary: #ffffff;
  --bg-secondary: var(--gray-50);
  --bg-tertiary: var(--gray-100);
  --bg-overlay: rgba(0, 0, 0, 0.5);
  
  /* Texto */
  --text-primary: var(--gray-900);
  --text-secondary: var(--gray-600);
  --text-tertiary: var(--gray-500);
  --text-inverse: #ffffff;
  
  /* Bordas */
  --border-primary: var(--gray-200);
  --border-secondary: var(--gray-300);
  --border-focus: var(--primary-500);
  
  /* Sombras */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}
```

---

## ✍️ TIPOGRAFIA

### **Famílias de Fonte**

```css
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');

:root {
  /* Display (Títulos) */
  --font-display: 'Lexend', -apple-system, BlinkMacSystemFont, sans-serif;
  
  /* Body (Texto corrido) */
  --font-body: 'Lexend', -apple-system, BlinkMacSystemFont, sans-serif;
  
  /* Mono (Códigos, números) */
  --font-mono: 'JetBrains Mono', 'Courier New', monospace;
}
```

### **Escala Tipográfica**

```css
:root {
  /* Tamanhos */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */
  --text-6xl: 3.75rem;     /* 60px */

  /* Pesos */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

### **Classes Utilitárias**

```css
/* Headings */
.h1 {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;
}

.h2 {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
}

.h3 {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-normal);
}

.h4 {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
}

/* Body */
.body-lg {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
}

.body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
}

.body-sm {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}

/* Mono */
.mono {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  letter-spacing: -0.01em;
}
```

---

## 📏 ESPAÇAMENTO

```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
}
```

---

## 🔲 COMPONENTES BASE

### **1. Buttons**

```css
.btn {
  font-family: var(--font-body);
  font-weight: var(--font-medium);
  padding: var(--space-3) var(--space-6);
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.btn-primary {
  background: var(--primary-500);
  color: var(--text-inverse);
}

.btn-primary:hover {
  background: var(--primary-600);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background: var(--secondary-500);
  color: var(--text-inverse);
}

.btn-outline {
  background: transparent;
  color: var(--primary-600);
  border: 2px solid var(--primary-500);
}

.btn-ghost {
  background: transparent;
  color: var(--primary-600);
}

.btn-ghost:hover {
  background: var(--primary-50);
}

.btn-lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-lg);
}

.btn-sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
}
```

### **2. Cards**

```css
.card {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: 1rem;
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
  border-color: var(--primary-200);
}

.card-header {
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-primary);
}

.card-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
}

.card-description {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-top: var(--space-2);
}
```

### **3. Badges**

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-3);
  border-radius: 9999px;
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.badge-ativo {
  background: var(--ativo-bg);
  color: var(--ativo-text);
  border: 1px solid var(--ativo-border);
}

.badge-passivo {
  background: var(--passivo-bg);
  color: var(--passivo-text);
  border: 1px solid var(--passivo-border);
}

.badge-neutro {
  background: var(--neutro-bg);
  color: var(--neutro-text);
  border: 1px solid var(--neutro-border);
}

.badge-economico {
  background: #dbeafe;
  color: #1e40af;
  border: 1px solid #93c5fd;
}

.badge-social {
  background: #fce7f3;
  color: #9f1239;
  border: 1px solid #fbcfe8;
}

.badge-ambiental {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #86efac;
}

.badge-governanca {
  background: #f3e8ff;
  color: #6b21a8;
  border: 1px solid #d8b4fe;
}
```

### **4. Inputs**

```css
.input {
  font-family: var(--font-body);
  font-size: var(--text-base);
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--border-primary);
  border-radius: 0.5rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: all 0.2s ease;
  width: 100%;
}

.input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.1);
}

.input-error {
  border-color: var(--error);
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
  display: block;
}

.input-helper {
  font-size: var(--text-xs);
  color: var(--text-secondary);
  margin-top: var(--space-1);
}

.input-error-message {
  font-size: var(--text-xs);
  color: var(--error);
  margin-top: var(--space-1);
}
```

### **5. Tables**

```css
.table {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg-primary);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.table thead {
  background: var(--gray-50);
  border-bottom: 2px solid var(--border-primary);
}

.table th {
  padding: var(--space-4) var(--space-4);
  text-align: left;
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.table td {
  padding: var(--space-4) var(--space-4);
  border-bottom: 1px solid var(--border-primary);
  font-size: var(--text-sm);
  color: var(--text-primary);
}

.table tbody tr:hover {
  background: var(--primary-50);
}

.table tbody tr:last-child td {
  border-bottom: none;
}
```

### **6. Indicadores de Classificação**

```css
.indicador {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: 9999px;
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
}

.indicador-ativo {
  background: var(--ativo-bg);
  color: var(--ativo-text);
  border: 2px solid var(--ativo-border);
}

.indicador-ativo::before {
  content: '↑';
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
}

.indicador-passivo {
  background: var(--passivo-bg);
  color: var(--passivo-text);
  border: 2px solid var(--passivo-border);
}

.indicador-passivo::before {
  content: '↓';
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
}

.indicador-neutro {
  background: var(--neutro-bg);
  color: var(--neutro-text);
  border: 2px solid var(--neutro-border);
}

.indicador-neutro::before {
  content: '—';
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
}
```

---

## 🎭 ANIMAÇÕES

```css
/* Fade In */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

/* Slide In */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}

/* Pulse */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Spin */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Scale Up on Hover */
.hover-scale {
  transition: transform 0.2s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}
```

---

## 📐 GRID SYSTEM

```css
.container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
.grid-cols-5 { grid-template-columns: repeat(5, 1fr); }
.grid-cols-6 { grid-template-columns: repeat(6, 1fr); }
.grid-cols-12 { grid-template-columns: repeat(12, 1fr); }

/* Responsive */
@media (max-width: 768px) {
  .grid-cols-1-md { grid-template-columns: repeat(1, 1fr); }
  .grid-cols-2-md { grid-template-columns: repeat(2, 1fr); }
}
```

---

## 🌓 TEMA ESCURO (Opcional)

```css
[data-theme="dark"] {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;
  
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-tertiary: #94a3b8;
  
  --border-primary: #334155;
  --border-secondary: #475569;
  
  --ativo-bg: #14532d;
  --ativo-text: #86efac;
  --ativo-border: #166534;
  
  --passivo-bg: #7f1d1d;
  --passivo-text: #fca5a5;
  --passivo-border: #991b1b;
}
```

---

## 🎨 ÍCONES

**Biblioteca recomendada:** Lucide React

```bash
npm install lucide-react
```

**Ícones principais:**
- `FileText` - Documentos
- `CheckCircle` - Validado
- `AlertCircle` - Atenção
- `TrendingUp` - Ativo
- `TrendingDown` - Passivo
- `Database` - Matrix IRES
- `Users` - Social
- `Leaf` - Ambiental
- `DollarSign` - Econômico
- `Shield` - Governança
- `Upload` - Upload
- `Download` - Download

---

## 📱 RESPONSIVIDADE

```css
/* Breakpoints */
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* Mobile First */
@media (min-width: 640px) {
  /* Tablet */
}

@media (min-width: 1024px) {
  /* Desktop */
}

@media (min-width: 1280px) {
  /* Large Desktop */
}
```

---

## ✨ MICRO-INTERAÇÕES

```css
/* Hover States */
.interactive {
  cursor: pointer;
  transition: all 0.2s ease;
}

.interactive:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.interactive:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

/* Focus States */
.focusable:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* Loading States */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--gray-200) 25%,
    var(--gray-100) 50%,
    var(--gray-200) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## 🎯 GUIDELINES DE USO

### **DO's ✅**

- Use verde para indicadores positivos (ativo, aprovado)
- Use vermelho para alertas e passivos
- Use azul para elementos de navegação e links
- Mantenha consistência nos espaçamentos
- Use mono font para números e códigos
- Adicione animações sutis (0.2s - 0.4s)
- Use sombras para hierarquia visual

### **DON'Ts ❌**

- Não misture paletas de cores
- Não use mais de 3 cores por seção
- Não use animações longas (>0.6s)
- Não ignore estados de hover/focus
- Não use fonte menor que 12px
- Não ignore responsividade

---

**Este Design System garante consistência visual em todo o BSI-BSAM! 🎨**
