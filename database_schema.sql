-- ============================================
-- BSI-BSAM MVP - SCHEMA COMPLETO SUPABASE
-- ============================================

-- EXTENSÕES NECESSÁRIAS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- 1. TABELA DE USUÁRIOS E PERFIS
-- ============================================

CREATE TYPE user_role AS ENUM ('contador', 'agente_esg');
CREATE TYPE exercise_status AS ENUM ('aberto', 'em_andamento', 'fechado', 'auditado');

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  full_name TEXT NOT NULL,
  department TEXT,
  professional_id TEXT, -- CRC, CREA, CRBio, etc
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. ORGANIZAÇÕES E FIO
-- ============================================

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cnpj TEXT UNIQUE NOT NULL,
  razao_social TEXT NOT NULL,
  cnae_principal TEXT,
  area_atuacao TEXT,
  regime_tributario TEXT,
  endereco_completo TEXT,
  municipio TEXT,
  estado TEXT,
  email_contato TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE fio_exercises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  exercise_year INTEGER NOT NULL,
  contador_responsavel_id UUID REFERENCES profiles(id),
  contador_nome TEXT NOT NULL,
  contador_crc TEXT NOT NULL,
  agente_esg_id UUID REFERENCES profiles(id),
  agente_esg_nome TEXT NOT NULL,
  agente_esg_departamento TEXT,
  status exercise_status DEFAULT 'aberto',
  declaration_accepted BOOLEAN DEFAULT FALSE,
  declaration_accepted_at TIMESTAMPTZ,
  declaration_ip_address INET,
  opened_at TIMESTAMPTZ DEFAULT NOW(),
  closed_at TIMESTAMPTZ,
  UNIQUE(organization_id, exercise_year)
);

-- ============================================
-- 3. MATRIX IRES - ESTRUTURA PARAMETRIZADA
-- ============================================

CREATE TYPE eixo_type AS ENUM ('ECONOMICO', 'SOCIAL', 'AMBIENTAL', 'GOVERNANCA');
CREATE TYPE ambito_type AS ENUM ('INTERNO', 'EXTERNO');
CREATE TYPE dado_type AS ENUM ('CONTABIL', 'NAO_CONTABIL');
CREATE TYPE registro_type AS ENUM ('ELE', 'ESA');

CREATE TABLE matrix_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  codigo TEXT UNIQUE NOT NULL, -- Ex: E-01, RH-01, GOV-GO-01
  origem_normativa TEXT NOT NULL, -- NBC T 15, ABNT PR 2030
  requisito TEXT NOT NULL,
  eixo eixo_type NOT NULL,
  ambito ambito_type NOT NULL,
  tipo_dado dado_type NOT NULL,
  tipo_registro registro_type NOT NULL,
  bloco_nome TEXT NOT NULL, -- Ex: "Econômico - DVA"
  ordem_exibicao INTEGER,
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. REGISTROS ELE (ELEMENTOS)
-- ============================================

CREATE TABLE ele_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fio_exercise_id UUID REFERENCES fio_exercises(id) ON DELETE CASCADE,
  matrix_item_id UUID REFERENCES matrix_items(id),
  codigo_registro TEXT NOT NULL, -- Ex: ELE-CON-EEC-I-2025-001
  
  -- Responsabilidade
  departamento TEXT NOT NULL,
  responsavel_nome TEXT NOT NULL,
  responsavel_cargo TEXT NOT NULL,
  responsavel_id UUID REFERENCES profiles(id),
  
  -- Dados Declaratórios (JSONB flexível para cada tipo)
  dados_declaratorios JSONB NOT NULL,
  /*
  Exemplos de estrutura:
  
  DVA: {
    "descricao_origem": "DVA - Pessoal",
    "valor_declarado": 18450000.00,
    "valor_base_calculo": 42000000.00,
    "percentual_derivado": 43.93
  }
  
  SOCIAL: {
    "categorias": [
      {"categoria": "Empregados", "valor": 21800000, "quantidade": 205},
      {"categoria": "Administradores", "valor": 2100000, "quantidade": 7}
    ],
    "segregacoes": {
      "sexo": {"F": 121, "M": 139},
      "faixa_etaria": {"ate_18": 11, "19_35": 109},
      "escolaridade": {...}
    }
  }
  
  GOVERNANCA: {
    "orgaos_governanca": "Conselho, Diretoria",
    "composicao_orgaos": "Internos e independentes",
    "criterios_nomeacao": "Estatuto social",
    ...
  }
  */
  
  -- Validação
  validado BOOLEAN DEFAULT FALSE,
  validado_por_id UUID REFERENCES profiles(id),
  validado_em TIMESTAMPTZ,
  validacao_observacoes TEXT,
  
  -- Classificação automática (positivo/negativo)
  classificacao TEXT, -- 'ativo', 'passivo', 'neutro'
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(fio_exercise_id, matrix_item_id)
);

-- ============================================
-- 5. REGISTROS ESA (AÇÕES SOCIOAMBIENTAIS)
-- ============================================

CREATE TABLE esa_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fio_exercise_id UUID REFERENCES fio_exercises(id) ON DELETE CASCADE,
  matrix_item_id UUID REFERENCES matrix_items(id),
  codigo_registro TEXT NOT NULL, -- Ex: ESA-NAO-CONTABIL-ESO-E-2026-001
  
  -- Responsabilidade Gestão
  departamento TEXT NOT NULL,
  responsavel_gestao_nome TEXT NOT NULL,
  responsavel_gestao_cargo TEXT NOT NULL,
  responsavel_gestao_id UUID REFERENCES profiles(id),
  
  -- Responsabilidade Técnica Profissional (OBRIGATÓRIO em ESA)
  responsavel_tecnico_nome TEXT NOT NULL,
  responsavel_tecnico_formacao TEXT NOT NULL,
  responsavel_tecnico_conselho TEXT NOT NULL,
  responsavel_tecnico_registro TEXT NOT NULL,
  
  -- Dados das Ações (JSONB)
  acoes JSONB NOT NULL,
  /*
  Exemplo SOCIAL EXTERNO:
  {
    "acoes_executadas": [
      {
        "tipo": "Educação técnica",
        "descricao": "Cursos de eletrônica básica...",
        "valor_aplicado": 520000,
        "publico_beneficiado": 210,
        "resultado_mensuravel": "168 certificados"
      }
    ],
    "perfil_publico": {
      "faixa_etaria": {"15_17": 150, "18_24": 270},
      "sexo": {"F": 220, "M": 280}
    }
  }
  
  Exemplo AMBIENTAL EXTERNO:
  {
    "acoes_ambientais": [
      {
        "tipo": "Conservação biodiversidade",
        "descricao": "Monitoramento áreas naturais...",
        "valor_aplicado": 520000,
        "objeto_beneficiado": "42 ha áreas naturais",
        "resultado_mensuravel": "Áreas monitoradas"
      }
    ],
    "declaracoes_normativas": {
      "nao_compensacao": true,
      "nao_mitigacao_passivos": true,
      "areas_nao_degradadas": true,
      "educacao_separada": true
    }
  }
  */
  
  -- Validação
  validado BOOLEAN DEFAULT FALSE,
  validado_por_id UUID REFERENCES profiles(id),
  validado_em TIMESTAMPTZ,
  validacao_observacoes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. DOCUMENTOS COMPROBATÓRIOS
-- ============================================

CREATE TYPE validation_status AS ENUM ('pendente', 'aprovado', 'rejeitado', 'em_analise');

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Vínculo (pode ser ELE ou ESA)
  ele_record_id UUID REFERENCES ele_records(id) ON DELETE CASCADE,
  esa_record_id UUID REFERENCES esa_records(id) ON DELETE CASCADE,
  
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL, -- Caminho no Supabase Storage
  file_size BIGINT,
  file_type TEXT, -- PDF, XLSX, DOCX, PNG
  file_hash TEXT, -- SHA256 para integridade
  
  -- Metadados
  document_type TEXT NOT NULL, -- "DVA", "Folha Pagamento", "Estatuto"
  exercise_year INTEGER,
  description TEXT,
  
  -- Versionamento MANUAL
  version INTEGER DEFAULT 1,
  parent_document_id UUID REFERENCES documents(id),
  is_latest_version BOOLEAN DEFAULT TRUE,
  
  -- Upload
  uploaded_by_id UUID REFERENCES profiles(id),
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Validação MANUAL ASSISTIDA
  validation_status validation_status DEFAULT 'pendente',
  validated_by_id UUID REFERENCES profiles(id),
  validated_at TIMESTAMPTZ,
  validation_checklist JSONB,
  /*
  {
    "campos_preenchidos": true,
    "documentos_anexados": true,
    "documentos_integros": true,
    "coerencia_dados": true,
    "assinatura_presente": true,
    "exercicio_corresponde": true
  }
  */
  
  CONSTRAINT doc_belongs_to_record CHECK (
    (ele_record_id IS NOT NULL AND esa_record_id IS NULL) OR
    (ele_record_id IS NULL AND esa_record_id IS NOT NULL)
  )
);

-- ============================================
-- 7. AUDIT LOG (TRILHA DE AUDITORIA)
-- ============================================

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Identificação
  user_id UUID REFERENCES profiles(id),
  user_role user_role,
  user_name TEXT,
  
  -- Ação
  action TEXT NOT NULL, -- 'CREATE', 'UPDATE', 'DELETE', 'VALIDATE', 'UPLOAD'
  table_name TEXT NOT NULL,
  record_id UUID,
  
  -- Dados
  old_data JSONB,
  new_data JSONB,
  changes_summary TEXT,
  
  -- Contexto
  ip_address INET,
  user_agent TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  
  -- Referências
  fio_exercise_id UUID REFERENCES fio_exercises(id)
);

-- ============================================
-- 8. VALIDAÇÃO DOCUMENTAL (CHECKLIST MANUAL)
-- ============================================

CREATE TABLE validation_checklists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  validator_id UUID REFERENCES profiles(id),
  
  -- Checklist (estrutura fixa para VD)
  documentos_anexados BOOLEAN DEFAULT FALSE,
  campos_preenchidos BOOLEAN DEFAULT FALSE,
  documentos_integros BOOLEAN DEFAULT FALSE,
  coerencia_dados BOOLEAN DEFAULT FALSE,
  assinatura_presente BOOLEAN DEFAULT FALSE,
  registro_departamento BOOLEAN DEFAULT FALSE,
  exercicio_corresponde BOOLEAN DEFAULT FALSE,
  
  -- VI (Validação Informacional)
  validacao_informacional JSONB,
  /*
  Campos customizados por tipo de registro:
  {
    "coerencia_acoes_valores": true,
    "responsavel_tecnico_valido": true,
    "resultados_mensurados": true
  }
  */
  
  observacoes TEXT,
  validated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 9. FÓRMULAS DE CÁLCULO (PARAMETRIZADAS)
-- ============================================

CREATE TABLE calculation_formulas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  matrix_item_id UUID REFERENCES matrix_items(id),
  
  formula_name TEXT NOT NULL, -- "Percentual DVA Pessoal"
  formula_expression TEXT NOT NULL, -- "(valor_pessoal / valor_total) * 100"
  
  -- Mapeamento de variáveis
  variable_mapping JSONB,
  /*
  {
    "valor_pessoal": "dados_declaratorios->>'valor_declarado'",
    "valor_total": "dados_declaratorios->>'valor_base_calculo'"
  }
  */
  
  result_field TEXT, -- Campo onde salvar resultado
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 10. CAMPOS DECLARATÓRIOS PARAMETRIZADOS
-- ============================================

CREATE TABLE matrix_item_fields (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  matrix_item_id UUID REFERENCES matrix_items(id) ON DELETE CASCADE,
  
  field_name TEXT NOT NULL,
  field_label TEXT NOT NULL,
  field_type TEXT NOT NULL, -- 'text', 'number', 'date', 'select', 'file'
  field_options JSONB, -- Para selects
  is_required BOOLEAN DEFAULT FALSE,
  validation_rules JSONB,
  ordem INTEGER,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 11. DOCUMENTOS OBRIGATÓRIOS POR ITEM
-- ============================================

CREATE TABLE matrix_item_required_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  matrix_item_id UUID REFERENCES matrix_items(id) ON DELETE CASCADE,
  
  document_type TEXT NOT NULL, -- "Estatuto Social", "DVA", etc
  description TEXT,
  is_mandatory BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 12. RLS (ROW LEVEL SECURITY)
-- ============================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE fio_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE ele_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE esa_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Policies para CONTADOR (acesso total)
CREATE POLICY "contador_full_access_fio"
ON fio_exercises FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'contador'
  )
);

CREATE POLICY "contador_full_access_ele"
ON ele_records FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'contador'
  )
);

-- Policies para AGENTE ESG (acesso limitado)
CREATE POLICY "agente_esg_read_fio"
ON fio_exercises FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'agente_esg'
  )
);

CREATE POLICY "agente_esg_validate_only"
ON ele_records FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'agente_esg'
  )
)
WITH CHECK (
  -- Agente ESG só pode atualizar validação, não dados
  NEW.dados_declaratorios = OLD.dados_declaratorios
);

CREATE POLICY "agente_esg_full_access_esa"
ON esa_records FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'agente_esg'
  )
);

-- Audit logs (todos podem inserir, só admin pode ler tudo)
CREATE POLICY "all_can_insert_audit"
ON audit_logs FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "contador_read_all_audit"
ON audit_logs FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'contador'
  )
);

-- ============================================
-- 13. TRIGGERS PARA AUDIT LOG
-- ============================================

CREATE OR REPLACE FUNCTION log_audit_trail()
RETURNS TRIGGER AS $$
DECLARE
  current_user_role user_role;
  current_user_name TEXT;
BEGIN
  -- Buscar dados do usuário
  SELECT role, full_name INTO current_user_role, current_user_name
  FROM profiles WHERE id = auth.uid();
  
  -- Inserir log
  INSERT INTO audit_logs (
    user_id,
    user_role,
    user_name,
    action,
    table_name,
    record_id,
    old_data,
    new_data,
    ip_address
  ) VALUES (
    auth.uid(),
    current_user_role,
    current_user_name,
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END,
    inet_client_addr()
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Aplicar trigger nas tabelas críticas
CREATE TRIGGER audit_fio_exercises
AFTER INSERT OR UPDATE OR DELETE ON fio_exercises
FOR EACH ROW EXECUTE FUNCTION log_audit_trail();

CREATE TRIGGER audit_ele_records
AFTER INSERT OR UPDATE OR DELETE ON ele_records
FOR EACH ROW EXECUTE FUNCTION log_audit_trail();

CREATE TRIGGER audit_esa_records
AFTER INSERT OR UPDATE OR DELETE ON esa_records
FOR EACH ROW EXECUTE FUNCTION log_audit_trail();

CREATE TRIGGER audit_documents
AFTER INSERT OR UPDATE OR DELETE ON documents
FOR EACH ROW EXECUTE FUNCTION log_audit_trail();

-- ============================================
-- 14. FUNÇÃO PARA CALCULAR INDICADORES
-- ============================================

CREATE OR REPLACE FUNCTION calculate_indicator(
  p_ele_record_id UUID,
  p_formula_id UUID
)
RETURNS NUMERIC AS $$
DECLARE
  v_formula TEXT;
  v_mapping JSONB;
  v_result NUMERIC;
  v_sql TEXT;
BEGIN
  -- Buscar fórmula
  SELECT formula_expression, variable_mapping
  INTO v_formula, v_mapping
  FROM calculation_formulas
  WHERE id = p_formula_id;
  
  -- Construir SQL dinâmico (SIMPLIFICADO - em produção usar parser)
  v_sql := format(
    'SELECT %s FROM ele_records WHERE id = %L',
    v_formula,
    p_ele_record_id
  );
  
  EXECUTE v_sql INTO v_result;
  
  RETURN v_result;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 15. VIEWS PARA RELATÓRIOS
-- ============================================

-- View consolidada de Matrix IRES
CREATE VIEW v_matrix_ires AS
SELECT 
  mi.codigo,
  mi.origem_normativa,
  mi.requisito,
  mi.eixo,
  mi.ambito,
  mi.tipo_dado,
  mi.tipo_registro,
  fe.exercise_year,
  o.razao_social,
  COALESCE(er.dados_declaratorios, esa.acoes) as dados,
  COALESCE(er.validado, esa.validado) as validado,
  COALESCE(er.classificacao, 'neutro') as classificacao
FROM matrix_items mi
CROSS JOIN fio_exercises fe
CROSS JOIN organizations o
LEFT JOIN ele_records er ON er.matrix_item_id = mi.id AND er.fio_exercise_id = fe.id
LEFT JOIN esa_records esa ON esa.matrix_item_id = mi.id AND esa.fio_exercise_id = fe.id
WHERE fe.organization_id = o.id
ORDER BY mi.ordem_exibicao;

-- View de documentos pendentes
CREATE VIEW v_documents_pending AS
SELECT 
  d.*,
  COALESCE(mi_ele.codigo, mi_esa.codigo) as matrix_code,
  o.razao_social,
  fe.exercise_year
FROM documents d
LEFT JOIN ele_records er ON d.ele_record_id = er.id
LEFT JOIN esa_records esa ON d.esa_record_id = esa.id
LEFT JOIN matrix_items mi_ele ON er.matrix_item_id = mi_ele.id
LEFT JOIN matrix_items mi_esa ON esa.matrix_item_id = mi_esa.id
LEFT JOIN fio_exercises fe ON COALESCE(er.fio_exercise_id, esa.fio_exercise_id) = fe.id
LEFT JOIN organizations o ON fe.organization_id = o.id
WHERE d.validation_status = 'pendente';

-- ============================================
-- 16. ÍNDICES PARA PERFORMANCE
-- ============================================

CREATE INDEX idx_ele_records_fio ON ele_records(fio_exercise_id);
CREATE INDEX idx_ele_records_matrix ON ele_records(matrix_item_id);
CREATE INDEX idx_esa_records_fio ON esa_records(fio_exercise_id);
CREATE INDEX idx_documents_validation ON documents(validation_status);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);

-- ============================================
-- 17. COMENTÁRIOS NA DOCUMENTAÇÃO
-- ============================================

COMMENT ON TABLE matrix_items IS 'Catálogo parametrizado de todos os itens NBC T15 + ABNT PR 2030';
COMMENT ON TABLE ele_records IS 'Registros contábeis e declaratórios (ELE)';
COMMENT ON TABLE esa_records IS 'Registros de ações socioambientais (ESA)';
COMMENT ON TABLE documents IS 'Documentos comprobatórios com versionamento manual';
COMMENT ON TABLE audit_logs IS 'Trilha de auditoria imutável de todas as ações';
COMMENT ON TABLE validation_checklists IS 'Checklists de validação manual assistida';
