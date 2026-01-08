# ⚡ Deploy Rápido - Hostinger

## 🚀 3 Passos Simples

### 1️⃣ Configurar e Build
```bash
# Windows
deploy.bat

# Linux/Mac
chmod +x deploy.sh
./deploy.sh
```

**Antes de executar:** Certifique-se de ter o arquivo `.env` configurado com suas credenciais do Supabase.

### 2️⃣ Upload
1. Acesse https://hpanel.hostinger.com
2. Vá em **Gerenciador de Arquivos**
3. Navegue até `public_html/`
4. Faça upload de **TODOS** os arquivos da pasta `dist/`

### 3️⃣ Verificar
Acesse seu domínio e teste se está funcionando!

---

## 📋 Checklist Rápido

- [ ] Arquivo `.env` criado
- [ ] Build executado (`npm run build` ou `deploy.bat`)
- [ ] Arquivos de `dist/` enviados para `public_html/`
- [ ] SSL/HTTPS ativado no hPanel
- [ ] URLs configuradas no Supabase

---

## 📖 Guia Completo

Para instruções detalhadas, consulte: **GUIA_HOSTINGER.md**

---

**Desenvolvido por Felipe Brunner**
