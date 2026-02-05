-- ============================================
-- SEED DATA - MATRIX IRES COMPLETA
-- ============================================

-- ============================================
-- BLOCO ECONÔMICO (DVA)
-- ============================================

INSERT INTO matrix_items (codigo, origem_normativa, requisito, eixo, ambito, tipo_dado, tipo_registro, bloco_nome, ordem_exibicao) VALUES
('E-01', 'NBC T 15 – 15.2.1 / DVA', 'Receitas', 'ECONOMICO', 'INTERNO', 'CONTABIL', 'ELE', 'Econômico - Geração e Distribuição de Riqueza', 1),
('E-02', 'NBC T 15 – 15.2.1 / DVA', 'Insumos adquiridos de terceiros', 'ECONOMICO', 'INTERNO', 'CONTABIL', 'ELE', 'Econômico - Geração e Distribuição de Riqueza', 2),
('E-03', 'NBC T 15 – 15.2.1 / DVA', 'Valor Adicionado Bruto', 'ECONOMICO', 'INTERNO', 'CONTABIL', 'ELE', 'Econômico - Geração e Distribuição de Riqueza', 3),
('E-04', 'NBC T 15 – 15.2.1 / DVA', 'Valor Adicionado Líquido', 'ECONOMICO', 'INTERNO', 'CONTABIL', 'ELE', 'Econômico - Geração e Distribuição de Riqueza', 4),
('E-05', 'NBC T 15 – 15.2.1 / DVA', 'Distribuição do Valor Adicionado – Pessoal', 'ECONOMICO', 'INTERNO', 'CONTABIL', 'ELE', 'Econômico - Geração e Distribuição de Riqueza', 5),
('E-06', 'NBC T 15 – 15.2.1 / DVA', 'Distribuição do Valor Adicionado – Tributos', 'ECONOMICO', 'INTERNO', 'CONTABIL', 'ELE', 'Econômico - Geração e Distribuição de Riqueza', 6),
('E-07', 'NBC T 15 – 15.2.1 / DVA', 'Distribuição do Valor Adicionado – Capitais de Terceiros', 'ECONOMICO', 'INTERNO', 'CONTABIL', 'ELE', 'Econômico - Geração e Distribuição de Riqueza', 7),
('E-08', 'NBC T 15 – 15.2.1 / DVA', 'Distribuição do Valor Adicionado – Capitais Próprios', 'ECONOMICO', 'INTERNO', 'CONTABIL', 'ELE', 'Econômico - Geração e Distribuição de Riqueza', 8);

-- ============================================
-- BLOCO SOCIAL - RECURSOS HUMANOS
-- ============================================

INSERT INTO matrix_items (codigo, origem_normativa, requisito, eixo, ambito, tipo_dado, tipo_registro, bloco_nome, ordem_exibicao) VALUES
('RH-01', 'NBC T 15 – 15.2.2', 'Remuneração bruta segregada por empregados, administradores, terceirizados e autônomos', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Recursos Humanos', 10),
('RH-02', 'NBC T 15 – 15.2.2', 'Relação entre a maior e a menor remuneração da entidade', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Recursos Humanos', 11),
('RH-03', 'NBC T 15 – 15.2.2', 'Gastos com encargos sociais', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Recursos Humanos', 12),
('RH-04', 'NBC T 15 – 15.2.2', 'Gastos com alimentação', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Recursos Humanos', 13),
('RH-05', 'NBC T 15 – 15.2.2', 'Gastos com transporte', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Recursos Humanos', 14),
('RH-06', 'NBC T 15 – 15.2.2', 'Gastos com previdência privada', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Recursos Humanos', 15),
('RH-07', 'NBC T 15 – 15.2.2', 'Gastos com saúde', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Recursos Humanos', 16),
('RH-08', 'NBC T 15 – 15.2.2', 'Gastos com segurança e medicina do trabalho', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Recursos Humanos', 17),
('RH-09', 'NBC T 15 – 15.2.2', 'Gastos com educação (exceto educação ambiental)', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Recursos Humanos', 18),
('RH-10', 'NBC T 15 – 15.2.2', 'Gastos com cultura', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Recursos Humanos', 19),
('RH-11', 'NBC T 15 – 15.2.2', 'Gastos com capacitação e desenvolvimento profissional', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Recursos Humanos', 20),
('RH-12', 'NBC T 15 – 15.2.2', 'Gastos com creches ou auxílio-creches', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Recursos Humanos', 21),
('RH-13', 'NBC T 15 – 15.2.2', 'Participação nos lucros ou resultados', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Recursos Humanos', 22);

-- ============================================
-- BLOCO SOCIAL - COMPOSIÇÃO FUNCIONAL
-- ============================================

INSERT INTO matrix_items (codigo, origem_normativa, requisito, eixo, ambito, tipo_dado, tipo_registro, bloco_nome, ordem_exibicao) VALUES
('RH-14', 'NBC T 15 – 15.2.2.4', 'Total de empregados no final do exercício', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Composição do Corpo Funcional', 30),
('RH-15', 'NBC T 15 – 15.2.2.4', 'Total de admissões no exercício', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Composição do Corpo Funcional', 31),
('RH-16', 'NBC T 15 – 15.2.2.4', 'Total de demissões no exercício', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Composição do Corpo Funcional', 32),
('RH-17', 'NBC T 15 – 15.2.2.4', 'Total de estagiários no final do exercício', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Composição do Corpo Funcional', 33),
('RH-18', 'NBC T 15 – 15.2.2.4', 'Total de empregados portadores de necessidades especiais', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Composição do Corpo Funcional', 34),
('RH-19', 'NBC T 15 – 15.2.2.4', 'Total de prestadores de serviços terceirizados', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Composição do Corpo Funcional', 35),
('RH-20', 'NBC T 15 – 15.2.2.4', 'Total de empregados por sexo', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Composição do Corpo Funcional', 36),
('RH-21', 'NBC T 15 – 15.2.2.4', 'Total de empregados por faixa etária', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Composição do Corpo Funcional', 37),
('RH-22', 'NBC T 15 – 15.2.2.4', 'Total de empregados por nível de escolaridade', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Composição do Corpo Funcional', 38),
('RH-23', 'NBC T 15 – 15.2.2.4', 'Percentual de ocupantes de cargos de chefia por sexo', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Composição do Corpo Funcional', 39);

-- ============================================
-- BLOCO SOCIAL - AÇÕES TRABALHISTAS
-- ============================================

INSERT INTO matrix_items (codigo, origem_normativa, requisito, eixo, ambito, tipo_dado, tipo_registro, bloco_nome, ordem_exibicao) VALUES
('RH-24', 'NBC T 15 – 15.2.2.5', 'Número de processos trabalhistas movidos contra a entidade', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Ações Trabalhistas', 40),
('RH-25', 'NBC T 15 – 15.2.2.5 / 15.2.2.6', 'Número de processos trabalhistas julgados procedentes (inclui acordos e parciais)', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Ações Trabalhistas', 41),
('RH-26', 'NBC T 15 – 15.2.2.5', 'Número de processos trabalhistas julgados improcedentes', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Ações Trabalhistas', 42),
('RH-27', 'NBC T 15 – 15.2.2.5', 'Valor total de indenizações e multas trabalhistas', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Ações Trabalhistas', 43);

-- ============================================
-- BLOCO SOCIAL - COMUNIDADE (ESA)
-- ============================================

INSERT INTO matrix_items (codigo, origem_normativa, requisito, eixo, ambito, tipo_dado, tipo_registro, bloco_nome, ordem_exibicao) VALUES
('EXT-COM-01', 'NBC T 15 – 15.2.3', 'Investimentos em educação (exceto educação ambiental)', 'SOCIAL', 'EXTERNO', 'NAO_CONTABIL', 'ESA', 'Social - Interação com a Comunidade', 50),
('EXT-COM-02', 'NBC T 15 – 15.2.3', 'Investimentos em cultura', 'SOCIAL', 'EXTERNO', 'NAO_CONTABIL', 'ESA', 'Social - Interação com a Comunidade', 51),
('EXT-COM-03', 'NBC T 15 – 15.2.3', 'Investimentos em saúde e saneamento', 'SOCIAL', 'EXTERNO', 'NAO_CONTABIL', 'ESA', 'Social - Interação com a Comunidade', 52),
('EXT-COM-04', 'NBC T 15 – 15.2.3', 'Investimentos em esporte e lazer (não publicitário)', 'SOCIAL', 'EXTERNO', 'NAO_CONTABIL', 'ESA', 'Social - Interação com a Comunidade', 53),
('EXT-COM-05', 'NBC T 15 – 15.2.3', 'Investimentos em alimentação', 'SOCIAL', 'EXTERNO', 'NAO_CONTABIL', 'ESA', 'Social - Interação com a Comunidade', 54);

-- ============================================
-- BLOCO SOCIAL - CLIENTES
-- ============================================

INSERT INTO matrix_items (codigo, origem_normativa, requisito, eixo, ambito, tipo_dado, tipo_registro, bloco_nome, ordem_exibicao) VALUES
('EXT-CLI-01', 'NBC T 15 – 15.2.3', 'Reclamações recebidas diretamente na entidade', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Interação com Clientes', 60),
('EXT-CLI-02', 'NBC T 15 – 15.2.3', 'Reclamações recebidas por órgãos de defesa do consumidor', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Interação com Clientes', 61),
('EXT-CLI-03', 'NBC T 15 – 15.2.3', 'Reclamações recebidas por meio da Justiça', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Interação com Clientes', 62),
('EXT-CLI-04', 'NBC T 15 – 15.2.3', 'Reclamações atendidas em cada instância', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Interação com Clientes', 63),
('EXT-CLI-05', 'NBC T 15 – 15.2.3', 'Multas e indenizações a clientes', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Interação com Clientes', 64),
('EXT-CLI-06', 'NBC T 15 – 15.2.3', 'Ações para sanar ou minimizar causas das reclamações', 'SOCIAL', 'INTERNO', 'CONTABIL', 'ELE', 'Social - Interação com Clientes', 65);

-- ============================================
-- BLOCO SOCIAL - FORNECEDORES (ESA)
-- ============================================

INSERT INTO matrix_items (codigo, origem_normativa, requisito, eixo, ambito, tipo_dado, tipo_registro, bloco_nome, ordem_exibicao) VALUES
('EXT-FOR-01', 'NBC T 15 – 15.2.3', 'Utilização de critérios de responsabilidade social na seleção de fornecedores', 'SOCIAL', 'EXTERNO', 'NAO_CONTABIL', 'ESA', 'Social - Interação com Fornecedores', 70);

-- ============================================
-- BLOCO AMBIENTAL - INTERNO
-- ============================================

INSERT INTO matrix_items (codigo, origem_normativa, requisito, eixo, ambito, tipo_dado, tipo_registro, bloco_nome, ordem_exibicao) VALUES
('AMB-01', 'NBC T 15 – 15.2.4', 'Investimentos e gastos com manutenção nos processos operacionais para melhoria do meio ambiente', 'AMBIENTAL', 'INTERNO', 'CONTABIL', 'ELE', 'Ambiental - Meio Ambiente Interno', 80),
('AMB-02', 'NBC T 15 – 15.2.4', 'Investimentos e gastos com preservação e/ou recuperação de ambientes degradados', 'AMBIENTAL', 'INTERNO', 'CONTABIL', 'ELE', 'Ambiental - Meio Ambiente Interno', 81),
('AMB-03', 'NBC T 15 – 15.2.4', 'Investimentos e gastos com educação ambiental para empregados, terceirizados, autônomos e administradores', 'AMBIENTAL', 'INTERNO', 'CONTABIL', 'ELE', 'Ambiental - Meio Ambiente Interno', 82);

-- ============================================
-- BLOCO AMBIENTAL - PASSIVOS
-- ============================================

INSERT INTO matrix_items (codigo, origem_normativa, requisito, eixo, ambito, tipo_dado, tipo_registro, bloco_nome, ordem_exibicao) VALUES
('AMB-06', 'NBC T 15 – 15.2.4', 'Quantidade de processos ambientais administrativos e judiciais', 'AMBIENTAL', 'INTERNO', 'CONTABIL', 'ELE', 'Ambiental - Processos, Multas e Passivos', 90),
('AMB-07', 'NBC T 15 – 15.2.4', 'Valor das multas e indenizações ambientais', 'AMBIENTAL', 'INTERNO', 'CONTABIL', 'ELE', 'Ambiental - Processos, Multas e Passivos', 91),
('AMB-08', 'NBC T 15 – 15.2.4', 'Passivos e contingências ambientais', 'AMBIENTAL', 'INTERNO', 'CONTABIL', 'ELE', 'Ambiental - Processos, Multas e Passivos', 92);

-- ============================================
-- BLOCO AMBIENTAL - EXTERNO
-- ============================================

INSERT INTO matrix_items (codigo, origem_normativa, requisito, eixo, ambito, tipo_dado, tipo_registro, bloco_nome, ordem_exibicao) VALUES
('AMB-04', 'NBC T 15 – 15.2.4', 'Investimentos e gastos com educação ambiental para a comunidade', 'AMBIENTAL', 'EXTERNO', 'CONTABIL', 'ELE', 'Ambiental - Meio Ambiente ao Entorno', 100),
('AMB-05', 'NBC T 15 – 15.2.4', 'Conservação e uso sustentável da biodiversidade local', 'AMBIENTAL', 'EXTERNO', 'CONTABIL', 'ELE', 'Ambiental - Meio Ambiente ao Entorno', 101);

-- ============================================
-- BLOCO GOVERNANÇA
-- ============================================

INSERT INTO matrix_items (codigo, origem_normativa, requisito, eixo, ambito, tipo_dado, tipo_registro, bloco_nome, ordem_exibicao) VALUES
('GOV-GO-01', 'ABNT PR 2030-1', 'Estrutura e composição da governança organizacional', 'GOVERNANCA', 'INTERNO', 'CONTABIL', 'ELE', 'Governança - Governança Organizacional', 110),
('GOV-GO-02', 'ABNT PR 2030-1', 'Propósito e estratégia organizacional alinhados à sustentabilidade', 'GOVERNANCA', 'INTERNO', 'CONTABIL', 'ELE', 'Governança - Governança Organizacional', 111),
('GOV-CE-01', 'ABNT PR 2030-1', 'Compliance, integridade e práticas anticorrupção', 'GOVERNANCA', 'INTERNO', 'CONTABIL', 'ELE', 'Governança - Conduta Empresarial', 120),
('GOV-CE-02', 'ABNT PR 2030-1', 'Práticas antitruste e concorrência leal', 'GOVERNANCA', 'INTERNO', 'CONTABIL', 'ELE', 'Governança - Conduta Empresarial', 121),
('GOV-CE-03', 'ABNT PR 2030-1', 'Engajamento das partes interessadas', 'GOVERNANCA', 'INTERNO', 'CONTABIL', 'ELE', 'Governança - Conduta Empresarial', 122),
('GOV-PCG-01', 'ABNT PR 2030-1', 'Gestão de riscos do negócio', 'GOVERNANCA', 'INTERNO', 'CONTABIL', 'ELE', 'Governança - Processos de Controle e Gestão', 130),
('GOV-PCG-02', 'ABNT PR 2030-1', 'Controles internos', 'GOVERNANCA', 'INTERNO', 'CONTABIL', 'ELE', 'Governança - Processos de Controle e Gestão', 131),
('GOV-PCG-03', 'ABNT PR 2030-1', 'Auditorias interna e externa', 'GOVERNANCA', 'INTERNO', 'CONTABIL', 'ELE', 'Governança - Processos de Controle e Gestão', 132),
('GOV-PCG-04', 'ABNT PR 2030-1', 'Conformidade com o ambiente legal e regulatório', 'GOVERNANCA', 'INTERNO', 'CONTABIL', 'ELE', 'Governança - Processos de Controle e Gestão', 133),
('GOV-PCG-05', 'ABNT PR 2030-1', 'Segurança da informação', 'GOVERNANCA', 'INTERNO', 'CONTABIL', 'ELE', 'Governança - Processos de Controle e Gestão', 134),
('GOV-PCG-06', 'ABNT PR 2030-1', 'Privacidade de dados pessoais', 'GOVERNANCA', 'INTERNO', 'CONTABIL', 'ELE', 'Governança - Processos de Controle e Gestão', 135),
('GOV-TG-01', 'ABNT PR 2030-1', 'Prestação de contas e accountability', 'GOVERNANCA', 'INTERNO', 'CONTABIL', 'ELE', 'Governança - Transparência e Gestão', 140),
('GOV-TG-02', 'ABNT PR 2030-1', 'Relatórios ESG / sustentabilidade', 'GOVERNANCA', 'INTERNO', 'CONTABIL', 'ELE', 'Governança - Transparência e Gestão', 141);

-- ============================================
-- FÓRMULAS DE CÁLCULO (Econômico)
-- ============================================

INSERT INTO calculation_formulas (matrix_item_id, formula_name, formula_expression, variable_mapping, result_field) VALUES
(
  (SELECT id FROM matrix_items WHERE codigo = 'E-05'),
  'Percentual DVA Pessoal',
  '(valor_pessoal / valor_total) * 100',
  '{"valor_pessoal": "dados_declaratorios->>''valor_declarado''", "valor_total": "dados_declaratorios->>''valor_base_calculo''"}'::jsonb,
  'percentual_derivado'
);

-- Adicionar mais fórmulas conforme necessário
