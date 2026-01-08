# 🚀 Guia de Deploy - Banca do Sucesso na Hostinger

Este guia irá te ajudar a fazer o deploy do projeto na Hostinger.

## 📋 Pré-requisitos

1. Conta na Hostinger (qualquer plano)
2. Acesso ao painel hPanel da Hostinger
3. Credenciais do Supabase configuradas
4. Node.js instalado localmente (para fazer o build)

## 🔧 Passo 1: Preparar o Projeto Localmente

### 1.1 Instalar dependências
```bash
npm install
```

### 1.2 Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com suas credenciais do Supabase:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua-chave-publica-aqui
```

**Onde encontrar essas credenciais:**
1. Acesse o [painel do Supabase](https://app.supabase.com)
2. Selecione seu projeto
3. Vá em Settings > API
4. Copie a URL e a chave "anon public"

### 1.3 Fazer o build do projeto
```bash
npm run build
```

Isso criará uma pasta `dist/` com os arquivos otimizados para produção.

## 📤 Passo 2: Upload para Hostinger

### Opção A: Via File Manager (hPanel)

1. **Acesse o hPanel da Hostinger**
   - Faça login em https://hpanel.hostinger.com
   - Vá em "Gerenciador de Arquivos"

2. **Navegue até a pasta do seu domínio**
   - Geralmente: `public_html/` ou `public_html/seu-dominio.com/`

3. **Limpe a pasta (se necessário)**
   - Delete arquivos antigos se houver

4. **Faça upload dos arquivos**
   - Faça upload de TODOS os arquivos da pasta `dist/`
   - Faça upload do arquivo `.htaccess` (já está na raiz do projeto)
   - **IMPORTANTE:** O arquivo `.htaccess` deve estar na mesma pasta que o `index.html`

### Opção B: Via FTP (FileZilla ou similar)

1. **Configure a conexão FTP**
   - Host: ftp.seu-dominio.com (ou IP fornecido pela Hostinger)
   - Usuário: seu-usuario-ftp
   - Senha: sua-senha-ftp
   - Porta: 21 (ou 22 para SFTP)

2. **Conecte e navegue até `public_html/`**

3. **Faça upload**
   - Upload de todos os arquivos da pasta `dist/`
   - Upload do arquivo `.htaccess`

## ⚙️ Passo 3: Configurar Variáveis de Ambiente na Hostinger

Como o projeto usa Vite, as variáveis de ambiente são injetadas no build. Você tem duas opções:

### Opção 1: Build com variáveis (Recomendado)
Faça o build localmente com as variáveis já configuradas no `.env`. As variáveis serão "embutidas" no código JavaScript final.

### Opção 2: Usar arquivo de configuração (Avançado)
Se precisar alterar as variáveis sem refazer o build, você pode criar um arquivo `config.js` que será carregado dinamicamente.

## 🔍 Passo 4: Verificar o Deploy

1. **Acesse seu domínio**
   - Ex: https://seu-dominio.com

2. **Teste as funcionalidades:**
   - ✅ Página inicial carrega
   - ✅ Navegação entre páginas funciona
   - ✅ Produtos são listados
   - ✅ Carrinho funciona
   - ✅ Login admin funciona
   - ✅ Checkout funciona

3. **Verifique o console do navegador**
   - Pressione F12
   - Vá na aba "Console"
   - Verifique se há erros relacionados ao Supabase

## 🐛 Troubleshooting

### Problema: Página em branco
**Solução:**
- Verifique se o arquivo `.htaccess` está na pasta correta
- Verifique se o `index.html` está na raiz de `public_html/`
- Limpe o cache do navegador (Ctrl+F5)

### Problema: Erro 404 ao navegar
**Solução:**
- Verifique se o `.htaccess` está configurado corretamente
- Certifique-se de que o módulo `mod_rewrite` está habilitado (geralmente já está)

### Problema: Erro de conexão com Supabase
**Solução:**
- Verifique se as variáveis de ambiente estão corretas
- Verifique se a URL do Supabase está acessível
- Verifique se a chave pública está correta

### Problema: Imagens não carregam
**Solução:**
- Verifique se as imagens estão na pasta `public/` antes do build
- Verifique os caminhos das imagens no código
- Imagens do Supabase Storage devem funcionar normalmente

## 🔄 Atualizações Futuras

Para atualizar o site:

1. Faça as alterações no código localmente
2. Execute `npm run build`
3. Faça upload dos novos arquivos da pasta `dist/` substituindo os antigos
4. Limpe o cache do navegador

## 📝 Notas Importantes

- ⚠️ **Nunca faça upload da pasta `node_modules/`** - ela não é necessária em produção
- ⚠️ **Nunca faça upload do arquivo `.env`** - as variáveis já estão no build
- ✅ O arquivo `.htaccess` é essencial para o React Router funcionar
- ✅ O Supabase continua funcionando normalmente (está na nuvem)
- ✅ Imagens do Supabase Storage funcionam normalmente

## 🆘 Suporte

Se encontrar problemas:
1. Verifique os logs de erro no hPanel
2. Verifique o console do navegador (F12)
3. Entre em contato com o suporte da Hostinger se necessário

---

**Pronto!** Seu site deve estar funcionando na Hostinger! 🎉
