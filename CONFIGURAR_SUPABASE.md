# 🔐 Configurar Supabase para bancadosucessoinf.com.br

Este guia mostra como configurar o Supabase para funcionar com o domínio `bancadosucessoinf.com.br`.

## 📋 Passo a Passo

### 1. Acessar Configurações do Supabase

1. Acesse https://app.supabase.com
2. Faça login na sua conta
3. Selecione o projeto **Banca do Sucesso**

### 2. Configurar URLs Permitidas (API)

1. Vá em **Settings** (⚙️) no menu lateral
2. Clique em **API**
3. Na seção **URL Configuration**, localize **Site URL**
4. Adicione ou atualize para:
   ```
   https://bancadosucessoinf.com.br
   ```

5. Na seção **Additional Allowed URLs** (se disponível), adicione:
   ```
   https://bancadosucessoinf.com.br
   https://www.bancadosucessoinf.com.br
   ```

6. Clique em **Save**

### 3. Configurar Redirect URLs (Authentication)

1. No mesmo menu **Settings**, clique em **Authentication**
2. Role até a seção **URL Configuration**
3. Em **Site URL**, adicione:
   ```
   https://bancadosucessoinf.com.br
   ```

4. Em **Redirect URLs**, adicione as seguintes URLs (uma por linha):
   ```
   https://bancadosucessoinf.com.br
   https://bancadosucessoinf.com.br/auth
   https://bancadosucessoinf.com.br/admin
   https://www.bancadosucessoinf.com.br
   https://www.bancadosucessoinf.com.br/auth
   https://www.bancadosucessoinf.com.br/admin
   ```

5. Clique em **Save**

### 4. Verificar CORS (se necessário)

1. Ainda em **Settings** > **API**
2. Verifique se **CORS** está configurado para permitir seu domínio
3. Se houver uma lista de domínios permitidos, adicione:
   ```
   https://bancadosucessoinf.com.br
   https://www.bancadosucessoinf.com.br
   ```

### 5. Testar Configuração

Após configurar, teste:

1. Acesse https://bancadosucessoinf.com.br
2. Tente fazer login como admin
3. Verifique o console do navegador (F12) para erros
4. Teste funcionalidades que usam Supabase:
   - Listagem de produtos
   - Adicionar ao carrinho
   - Checkout
   - Login/Logout

## 🐛 Troubleshooting

### Erro: "Invalid redirect URL"
**Solução:**
- Verifique se adicionou todas as URLs de redirect no Supabase
- Certifique-se de que está usando HTTPS
- Verifique se não há espaços extras nas URLs

### Erro: CORS
**Solução:**
- Verifique se o domínio está na lista de URLs permitidas
- Certifique-se de que está usando HTTPS
- Limpe o cache do navegador

### Erro: "Email not confirmed"
**Solução:**
- Verifique as configurações de email no Supabase
- Verifique se o email de confirmação está sendo enviado
- Verifique a pasta de spam

## ✅ Checklist

- [ ] Site URL configurado no Supabase
- [ ] Redirect URLs adicionadas (com e sem www)
- [ ] CORS configurado (se necessário)
- [ ] Teste de login funcionando
- [ ] Teste de produtos funcionando
- [ ] Console sem erros de CORS

---

**Importante:** Após fazer essas alterações, pode levar alguns minutos para as mudanças serem aplicadas. Aguarde 2-5 minutos e teste novamente.
