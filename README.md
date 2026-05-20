# Projeto Módulo 3 – Low Code/No Code/Vibecode

📌 Desafio Escolhido

O desenvolvedor criou um aplicativo focado em economia circular e sustentabilidade chamado EcoResgate.

O objetivo do projeto foi criar uma aplicação funcional capaz de conectar comércios locais (como padarias, mercados e feiras) que possuem excedente de comida boa a moradores e ONGs da região, utilizando o suporte de Inteligência Artificial para aceleração de código (Vibecode).

O sistema permite:

Escolha de perfil entre Consumidor/ONG e Estabelecimento Comercial.

Visualização de uma vitrine interativa com filtros por categorias.

Cadastro de novos lotes de excedentes de alimentos pelo comerciante.

Atualização do estoque em tempo real ao realizar reservas.

Geração automática de cupom com código único e QR Code para retirada física.

🖥️ Protótipo

Link do Protótipo: [Cole aqui o link do seu Bolt.new, StackBlitz ou Vercel]

Painel

Breve explicação: O usuário acessa o painel e pode ver o que está disponível perto dele. Ao clicar em reservar, o estoque da "Sacola Surpresa" diminui na hora e o sistema gera um cupom de retirada exclusivo. Se o usuário mudar o perfil para "Estabelecimento", ele pode simular o cadastro de um novo lote de comida que aparece instantaneamente no feed graças ao salvamento reativo.

⚙️ Plataforma Utilizada

Plataforma: * Gemini (IA) + StackBlitz / Bolt.new (Vibe-coding)

Justificativa da escolha:
A abordagem de Vibe-coding foi escolhida por permitir o desenvolvimento de uma interface web 100% personalizada e responsiva em tempo recorde. Usando React e Tailwind CSS com o auxílio da inteligência artificial, foi possível construir um app interativo e funcional que roda direto no navegador, sem as limitações visuais de ferramentas No-code engessadas e sem qualquer custo de publicação.

✅ Vantagens Identificadas

Desenvolvimento ágil e solo: Permitiu que um único aluno criasse um protótipo dinâmico completo em pouquíssimo tempo.

Liberdade de design: Interface moderna, limpa e com excelente usabilidade (UX).

Interatividade reativa: O estoque diminui na tela de verdade e gera cupons dinâmicos.

Custo zero: Ferramentas gratuitas para hospedagem e demonstração.

⚠️ Limitações Encontradas

Dados locais temporários: As informações ficam salvas apenas no navegador do usuário atual (LocalStorage). Se limpar o cache, as novas sacolas cadastradas somem.

Sem pagamento real: O pagamento real e a entrega dependem da ida do usuário à loja (limitando a necessidade de integrações financeiras complexas para o protótipo).

Dependência de IA para ajustes técnicos: Fazer mudanças profundas no código React exige suporte contínuo da IA para quem não domina a linguagem a fundo.

📚 Reflexão Crítica

O desenvolvimento individual deste projeto provou que o modelo de Vibe-coding dá "superpoderes" para que uma única pessoa consiga tirar ideias do papel com a mesma velocidade de um grupo inteiro.

Para contornar as limitações e focar na entrega exigida pela professora, foram adotadas as seguintes estratégias:

Foco no Caminho Feliz: Simplificação do fluxo de checkout (focado em cupom e pagamento presencial).

Uso de LocalStorage: Simulação de banco de dados reativo de forma rápida e eficiente para o teste em sala de aula.

IA como assistente de arquitetura: Uso estratégico da IA para criar a estrutura do layout em Tailwind CSS e corrigir a lógica de redução de estoque.

👥 Colaboração

Desenvolvimento 100% Individual: Por se tratar de um projeto solo, todas as atividades de planejamento, design, programação com assistência de IA, controle de qualidade (testes) e documentação foram realizadas pelo próprio aluno de forma integrada.

📝 Registro da Aula

Data: 18/05/2026

Atividade: Discussão crítica + miniprojeto de aplicação

Local: Laboratório de informática / Quadro branco

Professor(a): Kadidja Valéria

🚀 Próximos Passos

Melhorias sugeridas:

Adaptar o design para uma versão mobile ainda mais refinada.

Implementar um sistema real de login e senha para usuários e lojas.

Integrar um banco de dados real na nuvem (como Firebase ou Supabase) para que as sacolas criadas fiquem salvas para todos os usuários.

Adicionar mapa interativo (Google Maps) para localizar as lojas parceiras.

Evoluções futuras para o Projeto Final:

Sistema de notificações por WhatsApp/E-mail avisando quando novas sacolas forem cadastradas perto do usuário.

Dashboard para o comerciante acompanhar a quantidade de comida salva do lixo e os custos recuperados no mês.
