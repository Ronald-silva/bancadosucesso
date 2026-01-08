# 🚀 Deploy na Hostinger - Guia Rápido

## ⚡ Passo a Passo Simplificado

### 1️⃣ Preparar o Projeto

```bash
# Instalar dependências
npm install

# Criar arquivo .env com suas credenciais do Supabase
# Copie o conteúdo de env.example.txt e preencha com seus dados
```

**Arquivo `.env` necessário:**
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua-chave-publica-aqui
```

### 2️⃣ Fazer o Build

**Windows:**
```bash
deploy.bat
```

**Linux/Mac:**
```bash
chmod +x deploy.sh
./deploy.sh
```

**Ou manualmente:**
```bash
npm run build
```

### 3️⃣ Upload para Hostinger

1. Acesse https://hpanel.hostinger.com
2. Vá em **Gerenciador de Arquivos**
3. Navegue até `public_html/`
4. **Faça upload de TODOS os arquivos** da pasta `dist/`
5. **Faça upload do arquivo `.htaccess`** (está na raiz do projeto)

### 4️⃣ Verificar

Acesse seu domínio e teste:
- ✅ Página inicial carrega
- ✅ Navegação funciona
- ✅ Produtos aparecem
- ✅ Login admin funciona

## 📋 Checklist de Deploy

- [ ] Arquivo `.env` criado com credenciais do Supabase
- [ ] Build executado com sucesso (`npm run build`)
- [ ] Pasta `dist/` criada
- [ ] Arquivos da pasta `dist/` enviados para `public_html/`
- [ ] Arquivo `.htaccess` enviado para `public_html/`
- [ ] Site acessível no domínio
- [ ] Funcionalidades testadas

## 🆘 Problemas Comuns

### Página em branco
- Verifique se o `.htaccess` está na pasta correta
- Limpe o cache do navegador (Ctrl+F5)

### Erro 404 ao navegar
- Verifique se o `.htaccess` está configurado
- Certifique-se de que todos os arquivos foram enviados

### Erro de conexão Supabase
- Verifique as variáveis no `.env`
- Faça um novo build após alterar o `.env`

## 📞 Precisa de Ajuda?

Consulte o arquivo `DEPLOY_HOSTINGER.md` para um guia mais detalhado.
