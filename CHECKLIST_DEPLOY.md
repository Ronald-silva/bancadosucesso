# ✅ Checklist de Deploy - Hostinger

Use este checklist para garantir que tudo está pronto antes do deploy.

## 📋 Pré-Deploy

### Configuração do Projeto
- [ ] Arquivo `.env` criado e configurado com:
  - [ ] `VITE_SUPABASE_URL` (URL do seu projeto Supabase)
  - [ ] `VITE_SUPABASE_PUBLISHABLE_KEY` (Chave pública anon)
- [ ] Dependências instaladas (`npm install`)
- [ ] Build testado localmente (`npm run build`)
- [ ] Pasta `dist/` criada com sucesso

### Arquivos Necessários
- [ ] Arquivo `.htaccess` criado (já está na raiz do projeto)
- [ ] Arquivo `index.html` na pasta `dist/` após o build
- [ ] Todos os assets (CSS, JS, imagens) na pasta `dist/`

## 📤 Deploy na Hostinger

### Upload de Arquivos
- [ ] Acesso ao hPanel da Hostinger obtido
- [ ] Gerenciador de Arquivos acessado
- [ ] Pasta `public_html/` localizada
- [ ] Arquivos antigos removidos (se necessário)
- [ ] **TODOS** os arquivos da pasta `dist/` enviados
- [ ] Arquivo `.htaccess` enviado para `public_html/`

### Verificação Pós-Deploy
- [ ] Site acessível no domínio principal
- [ ] Página inicial carrega corretamente
- [ ] Navegação entre páginas funciona (sem erro 404)
- [ ] Produtos são listados corretamente
- [ ] Imagens dos produtos carregam
- [ ] Carrinho de compras funciona
- [ ] Login admin funciona (se aplicável)
- [ ] Checkout funciona
- [ ] Console do navegador sem erros críticos

## 🔧 Troubleshooting

Se algo não funcionar, verifique:

### Página em Branco
- [ ] Arquivo `.htaccess` está na pasta correta?
- [ ] `index.html` está na raiz de `public_html/`?
- [ ] Cache do navegador limpo?

### Erro 404 ao Navegar
- [ ] `.htaccess` está configurado corretamente?
- [ ] Todos os arquivos foram enviados?
- [ ] Módulo `mod_rewrite` está habilitado no servidor?

### Erro de Conexão Supabase
- [ ] Variáveis de ambiente estão corretas no `.env`?
- [ ] Build foi feito após configurar o `.env`?
- [ ] URL do Supabase está acessível?

### Imagens Não Carregam
- [ ] Imagens do Supabase Storage estão públicas?
- [ ] Caminhos das imagens estão corretos?

## 📝 Notas Finais

- ✅ O Supabase continua funcionando normalmente (está na nuvem)
- ✅ Não é necessário migrar o banco de dados
- ✅ Imagens do Supabase Storage funcionam normalmente
- ⚠️ Nunca faça upload da pasta `node_modules/`
- ⚠️ Nunca faça upload do arquivo `.env`

## 🎉 Pronto!

Se todos os itens acima estão marcados, seu site está funcionando na Hostinger!
