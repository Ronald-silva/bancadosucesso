# 🌐 Configurar Domínio bancadosucessoinf.com.br na Hostinger

Este guia irá te ajudar a configurar o domínio `bancadosucessoinf.com.br` na Hostinger e no projeto.

## 📋 Pré-requisitos

1. Domínio `bancadosucessoinf.com.br` registrado
2. Acesso ao painel hPanel da Hostinger
3. Acesso ao painel do Supabase (para configurar URLs permitidas)

## 🔧 Passo 1: Configurar Domínio na Hostinger

### 1.1 Adicionar Domínio no hPanel

1. **Acesse o hPanel**
   - Faça login em https://hpanel.hostinger.com
   - Vá em **Domínios** > **Gerenciar Domínios**

2. **Adicionar Domínio**
   - Clique em **Adicionar Domínio**
   - Digite: `bancadosucessoinf.com.br`
   - Selecione a opção **Usar os nameservers da Hostinger** (recomendado)

3. **Configurar DNS (se necessário)**
   - Se o domínio já está apontado para a Hostinger, pule esta etapa
   - Caso contrário, configure os nameservers no seu registrador:
     ```
     ns1.dns-parking.com
     ns2.dns-parking.com
     ```
   - Ou use os nameservers específicos fornecidos pela Hostinger

### 1.2 Configurar Pasta do Domínio

1. **Acesse Gerenciador de Arquivos**
   - No hPanel, vá em **Gerenciador de Arquivos**

2. **Criar/Escolher Pasta**
   - Se o domínio é o principal: use `public_html/`
   - Se é um domínio adicional: crie uma pasta específica ou use `public_html/bancadosucessoinf.com.br/`
   - **Nota:** A Hostinger geralmente cria automaticamente a pasta quando você adiciona o domínio

3. **Verificar Configuração**
   - Vá em **Domínios** > **Configurações do Domínio**
   - Certifique-se de que `bancadosucessoinf.com.br` está apontando para a pasta correta

## 🔧 Passo 2: Configurar SSL/HTTPS

### 2.1 Ativar SSL Gratuito (Let's Encrypt)

1. **Acesse SSL no hPanel**
   - Vá em **SSL** ou **Segurança**

2. **Instalar Certificado SSL**
   - Selecione o domínio `bancadosucessoinf.com.br`
   - Clique em **Instalar Certificado SSL Gratuito**
   - Aguarde alguns minutos para a ativação

3. **Forçar HTTPS (Recomendado)**
   - Ative a opção **Forçar HTTPS** ou **Redirect HTTP to HTTPS**
   - Isso garante que todos acessem via HTTPS

## 🔧 Passo 3: Configurar Supabase

### 3.1 Adicionar URL Permitida no Supabase

1. **Acesse o Painel do Supabase**
   - Vá em https://app.supabase.com
   - Selecione seu projeto

2. **Configurar URLs Permitidas**
   - Vá em **Settings** > **API**
   - Na seção **URL Configuration**, adicione:
     ```
     https://bancadosucessoinf.com.br
     https://www.bancadosucessoinf.com.br
     ```
   - Clique em **Save**

3. **Configurar Redirect URLs (Auth)**
   - Vá em **Authentication** > **URL Configuration**
   - Adicione nas **Redirect URLs**:
     ```
     https://bancadosucessoinf.com.br
     https://bancadosucessoinf.com.br/auth
     https://www.bancadosucessoinf.com.br
     https://www.bancadosucessoinf.com.br/auth
     ```
   - Clique em **Save**

## 🔧 Passo 4: Atualizar Arquivos do Projeto

### 4.1 Verificar Arquivo .env

Certifique-se de que o arquivo `.env` está configurado corretamente:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua-chave-publica-aqui
```

### 4.2 Fazer Build com Domínio Atualizado

O arquivo `index.html` já foi atualizado com o novo domínio. Agora faça o build:

```bash
npm run build
```

## 📤 Passo 5: Upload dos Arquivos

1. **Acesse Gerenciador de Arquivos**
   - No hPanel, vá em **Gerenciador de Arquivos**
   - Navegue até a pasta do domínio (geralmente `public_html/`)

2. **Fazer Upload**
   - Faça upload de **TODOS** os arquivos da pasta `dist/`
   - Faça upload do arquivo `.htaccess`

3. **Verificar Estrutura**
   - Certifique-se de que `index.html` está na raiz da pasta
   - Certifique-se de que `.htaccess` está na mesma pasta

## ✅ Passo 6: Verificar Configuração

### 6.1 Testar Acesso

1. **Acesse o domínio**
   - Abra: https://bancadosucessoinf.com.br
   - Verifique se a página carrega

2. **Testar HTTPS**
   - Certifique-se de que está acessando via HTTPS
   - Verifique o cadeado no navegador

3. **Testar Funcionalidades**
   - ✅ Página inicial carrega
   - ✅ Navegação funciona
   - ✅ Login admin funciona
   - ✅ Produtos carregam
   - ✅ Checkout funciona

### 6.2 Verificar Console do Navegador

1. **Abrir DevTools**
   - Pressione F12
   - Vá na aba **Console**

2. **Verificar Erros**
   - Não deve haver erros relacionados ao Supabase
   - Não deve haver erros de CORS
   - Não deve haver erros de autenticação

## 🔄 Passo 7: Configurar WWW (Opcional)

Se quiser que `www.bancadosucessoinf.com.br` também funcione:

### 7.1 Adicionar Subdomínio WWW

1. **No hPanel**
   - Vá em **Domínios** > **Subdomínios**
   - Adicione subdomínio: `www`
   - Aponte para a mesma pasta do domínio principal

2. **Configurar SSL para WWW**
   - Instale certificado SSL também para `www.bancadosucessoinf.com.br`

3. **Redirecionar WWW para Não-WWW (ou vice-versa)**
   - No `.htaccess`, adicione (se quiser redirecionar www para não-www):
   ```apache
   RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
   RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
   ```

## 🐛 Troubleshooting

### Problema: Domínio não carrega
**Solução:**
- Verifique se o DNS está apontando corretamente
- Aguarde até 24-48 horas para propagação DNS
- Verifique se o domínio está ativo no hPanel

### Problema: Erro de SSL
**Solução:**
- Aguarde alguns minutos após instalar o SSL
- Verifique se o certificado está ativo no hPanel
- Limpe o cache do navegador

### Problema: Erro de CORS no Supabase
**Solução:**
- Verifique se adicionou a URL no Supabase (Passo 3)
- Certifique-se de que está usando HTTPS
- Verifique se a URL está exatamente como configurada

### Problema: Erro 404 ao navegar
**Solução:**
- Verifique se o `.htaccess` está na pasta correta
- Verifique se todos os arquivos foram enviados
- Teste acessar diretamente: `https://bancadosucessoinf.com.br/index.html`

## 📝 Checklist Final

- [ ] Domínio adicionado no hPanel
- [ ] DNS configurado corretamente
- [ ] SSL instalado e ativo
- [ ] URL adicionada no Supabase (API Settings)
- [ ] Redirect URLs adicionadas no Supabase (Auth)
- [ ] Build feito com domínio atualizado
- [ ] Arquivos enviados para a pasta correta
- [ ] `.htaccess` enviado
- [ ] Site acessível via HTTPS
- [ ] Funcionalidades testadas
- [ ] Console sem erros

## 🎉 Pronto!

Seu domínio `bancadosucessoinf.com.br` está configurado e funcionando!

---

**Nota:** A propagação DNS pode levar até 24-48 horas. Se o domínio não funcionar imediatamente, aguarde algumas horas e tente novamente.
