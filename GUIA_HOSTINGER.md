# 🚀 Guia Completo de Deploy na Hostinger

Este guia passo a passo vai te ajudar a fazer o deploy do projeto Banca do Sucesso na Hostinger.

## 📋 Pré-requisitos

- ✅ Conta na Hostinger ativa
- ✅ Domínio configurado (ex: bancadosucessoinf.com.br)
- ✅ Credenciais do Supabase configuradas
- ✅ Node.js instalado localmente (versão 18 ou superior)

## 🔧 Passo 1: Configurar Variáveis de Ambiente

1. **Crie um arquivo `.env` na raiz do projeto**

2. **Copie o conteúdo de `env.example.txt` e preencha com suas credenciais:**

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua-chave-publica-aqui
```

**Onde encontrar essas credenciais:**
- Acesse https://app.supabase.com
- Selecione seu projeto
- Vá em **Settings** > **API**
- Copie a **URL** e a chave **anon public**

## 🔨 Passo 2: Fazer o Build do Projeto

### Windows:
```bash
deploy.bat
```

### Linux/Mac:
```bash
chmod +x deploy.sh
./deploy.sh
```

### Ou manualmente:
```bash
npm install
npm run build
```

**O que acontece:**
- ✅ Instala todas as dependências
- ✅ Faz o build otimizado do projeto
- ✅ Copia automaticamente o `.htaccess` para a pasta `dist/`
- ✅ Cria a pasta `dist/` com todos os arquivos prontos para produção

## 📤 Passo 3: Upload para Hostinger

### Opção A: Via Gerenciador de Arquivos (hPanel) - Recomendado

1. **Acesse o hPanel**
   - Vá em https://hpanel.hostinger.com
   - Faça login com suas credenciais

2. **Abra o Gerenciador de Arquivos**
   - No menu lateral, clique em **Gerenciador de Arquivos**
   - Ou procure por "File Manager"

3. **Navegue até a pasta do domínio**
   - Geralmente: `public_html/`
   - Se você tem múltiplos domínios: `public_html/seu-dominio.com/`

4. **Limpe arquivos antigos (se houver)**
   - Selecione todos os arquivos antigos
   - Delete ou mova para uma pasta de backup

5. **Faça upload dos arquivos**
   - Clique em **Upload** ou **Enviar Arquivos**
   - Selecione **TODOS** os arquivos da pasta `dist/`
   - **IMPORTANTE:** Inclua o arquivo `.htaccess` (já está dentro de `dist/`)
   - Aguarde o upload completar

### Opção B: Via FTP (FileZilla ou similar)

1. **Configure a conexão FTP**
   - Host: `ftp.seu-dominio.com` ou IP fornecido pela Hostinger
   - Usuário: seu usuário FTP (geralmente o mesmo do hPanel)
   - Senha: sua senha FTP
   - Porta: `21` (FTP) ou `22` (SFTP)

2. **Conecte e navegue até `public_html/`**

3. **Faça upload**
   - Arraste todos os arquivos da pasta `dist/` para `public_html/`
   - Certifique-se de incluir o `.htaccess`

### Opção C: Upload via ZIP (Mais Rápido)

1. **Compacte a pasta `dist/`**
   - No Windows: Clique com botão direito > Enviar para > Pasta compactada
   - No Linux/Mac: `zip -r dist.zip dist/`

2. **Faça upload do arquivo `.zip`**
   - No hPanel, vá em Gerenciador de Arquivos
   - Faça upload do arquivo `.zip`
   - Clique com botão direito no arquivo e selecione **Extrair**

## ⚙️ Passo 4: Configurar SSL/HTTPS

1. **Acesse SSL no hPanel**
   - Vá em **SSL** ou **Segurança**

2. **Instalar Certificado SSL**
   - Selecione seu domínio
   - Clique em **Instalar Certificado SSL Gratuito**
   - Aguarde alguns minutos para ativação

3. **Forçar HTTPS**
   - Ative a opção **Forçar HTTPS** ou **Redirect HTTP to HTTPS**
   - Isso garante que todos acessem via HTTPS

## 🔐 Passo 5: Configurar Supabase

### 5.1 Adicionar URL Permitida

1. **Acesse o Painel do Supabase**
   - Vá em https://app.supabase.com
   - Selecione seu projeto

2. **Configurar URLs Permitidas**
   - Vá em **Settings** > **API**
   - Na seção **URL Configuration**, adicione:
     ```
     https://seu-dominio.com.br
     https://www.seu-dominio.com.br
     ```
   - Clique em **Save**

### 5.2 Configurar Redirect URLs (Auth)

1. **Vá em Authentication** > **URL Configuration**

2. **Adicione nas Redirect URLs:**
   ```
   https://seu-dominio.com.br
   https://seu-dominio.com.br/auth
   https://www.seu-dominio.com.br
   https://www.seu-dominio.com.br/auth
   ```

3. **Clique em Save**

## ✅ Passo 6: Verificar o Deploy

1. **Acesse seu domínio**
   - Ex: https://seu-dominio.com.br

2. **Teste as funcionalidades:**
   - ✅ Página inicial carrega corretamente
   - ✅ Navegação entre páginas funciona (sem erro 404)
   - ✅ Produtos são listados
   - ✅ Carrinho funciona
   - ✅ Login admin funciona
   - ✅ Checkout funciona

3. **Verifique o console do navegador**
   - Pressione `F12`
   - Vá na aba **Console**
   - Verifique se há erros relacionados ao Supabase

## 🐛 Solução de Problemas

### Problema: Página em branco

**Soluções:**
- ✅ Verifique se o arquivo `.htaccess` está na pasta `public_html/`
- ✅ Verifique se o `index.html` está na raiz de `public_html/`
- ✅ Limpe o cache do navegador (`Ctrl+F5` ou `Cmd+Shift+R`)
- ✅ Verifique se todos os arquivos foram enviados corretamente

### Problema: Erro 404 ao navegar entre páginas

**Soluções:**
- ✅ Verifique se o `.htaccess` está configurado corretamente
- ✅ Certifique-se de que o módulo `mod_rewrite` está habilitado (geralmente já está na Hostinger)
- ✅ Verifique se o `.htaccess` está na mesma pasta que o `index.html`

### Problema: Erro de conexão com Supabase

**Soluções:**
- ✅ Verifique se as variáveis de ambiente estão corretas no `.env`
- ✅ Faça um novo build após alterar o `.env`
- ✅ Verifique se a URL do Supabase está acessível
- ✅ Verifique se a chave pública está correta
- ✅ Verifique se as URLs foram adicionadas no Supabase (Passo 5)

### Problema: Imagens não carregam

**Soluções:**
- ✅ Verifique se as imagens estão na pasta `public/` antes do build
- ✅ Verifique os caminhos das imagens no código
- ✅ Imagens do Supabase Storage devem funcionar normalmente

### Problema: Site não redireciona para HTTPS

**Soluções:**
- ✅ Ative o SSL no hPanel (Passo 4)
- ✅ Ative a opção "Forçar HTTPS" no hPanel
- ✅ O `.htaccess` já tem regras para forçar HTTPS

## 🔄 Atualizações Futuras

Para atualizar o site após fazer alterações:

1. **Faça as alterações no código localmente**

2. **Execute o build novamente:**
   ```bash
   npm run build
   ```
   ou
   ```bash
   deploy.bat  # Windows
   ./deploy.sh  # Linux/Mac
   ```

3. **Faça upload dos novos arquivos**
   - Substitua os arquivos antigos na `public_html/`
   - Ou delete tudo e faça upload novamente

4. **Limpe o cache do navegador**
   - Pressione `Ctrl+F5` ou `Cmd+Shift+R`

## 📝 Checklist Final

Antes de considerar o deploy completo, verifique:

- [ ] Arquivo `.env` criado com credenciais do Supabase
- [ ] Build executado com sucesso (`npm run build`)
- [ ] Pasta `dist/` criada com todos os arquivos
- [ ] Arquivo `.htaccess` está dentro de `dist/`
- [ ] Todos os arquivos de `dist/` enviados para `public_html/`
- [ ] SSL/HTTPS configurado e ativo
- [ ] URLs adicionadas no Supabase
- [ ] Site acessível no domínio
- [ ] Todas as funcionalidades testadas
- [ ] Navegação entre páginas funciona
- [ ] Login admin funciona
- [ ] Produtos aparecem corretamente

## 🎉 Pronto!

Seu site está no ar! 🚀

## 📞 Precisa de Ajuda?

- **Documentação Hostinger:** https://support.hostinger.com
- **Documentação Supabase:** https://supabase.com/docs
- **Suporte Hostinger:** Disponível 24/7 no chat do hPanel

---

**Desenvolvido por Felipe Brunner**
