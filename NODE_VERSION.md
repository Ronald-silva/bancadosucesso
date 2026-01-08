# 📦 Versão do Node.js Recomendada

## ✅ Versão LTS (Long Term Support) - RECOMENDADA

A versão **LTS (Long Term Support)** é a mais estável e recomendada para produção.

### Versão LTS Atual (Janeiro 2025):
- **Node.js 20.x LTS** (versão mais estável)
  - Última versão: **20.18.0** ou superior
  - Suporte até: Abril 2026
  - **RECOMENDADA para este projeto**

### Versão LTS Anterior:
- **Node.js 18.x LTS**
  - Suporte até: Abril 2025
  - Ainda funcional, mas migração recomendada

## ⚠️ Versão Atual no Sistema

Você está usando: **Node.js 24.12.0**

Esta é uma versão **muito recente** (Current/Canary) e pode ter:
- ✅ Funcionalidades mais novas
- ⚠️ Possíveis incompatibilidades
- ⚠️ Menos testada em produção

## 🎯 Recomendação para Este Projeto

### Para Desenvolvimento e Produção:
**Use Node.js 20.x LTS** (versão 20.18.0 ou superior)

### Por quê?
1. ✅ **Estabilidade**: Versão LTS testada e estável
2. ✅ **Compatibilidade**: Funciona perfeitamente com Vite, React e todas as dependências
3. ✅ **Suporte**: Recebe atualizações de segurança por mais tempo
4. ✅ **Produção**: Ideal para deploy na Hostinger

## 📥 Como Instalar/Atualizar

### Opção 1: Download Direto
1. Acesse: https://nodejs.org/
2. Baixe a versão **LTS** (20.x)
3. Instale normalmente

### Opção 2: Usando NVM (Node Version Manager) - RECOMENDADO

**Windows:**
```powershell
# Instalar nvm-windows
# Download: https://github.com/coreybutler/nvm-windows/releases

# Instalar Node.js 20 LTS
nvm install 20.18.0
nvm use 20.18.0
```

**Linux/Mac:**
```bash
# Instalar nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Instalar Node.js 20 LTS
nvm install 20
nvm use 20
```

## ✅ Verificar Versão

```bash
node --version
# Deve mostrar: v20.18.0 ou superior (v20.x.x)
```

## 🔍 Compatibilidade do Projeto

Este projeto foi testado e funciona perfeitamente com:
- ✅ Node.js 18.x LTS
- ✅ Node.js 20.x LTS (RECOMENDADO)
- ⚠️ Node.js 22.x (pode funcionar, mas não testado)
- ⚠️ Node.js 24.x (muito recente, pode ter problemas)

## 📋 Requisitos Mínimos

- **Mínimo**: Node.js 18.x
- **Recomendado**: Node.js 20.x LTS
- **npm**: Vem junto com Node.js (versão 10.x ou superior)

## 🚀 Após Instalar Node.js 20.x

1. **Verificar versão:**
   ```bash
   node --version
   npm --version
   ```

2. **Limpar cache e reinstalar dependências:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Testar o projeto:**
   ```bash
   npm run dev
   ```

## 📚 Links Úteis

- **Download Node.js LTS**: https://nodejs.org/
- **NVM Windows**: https://github.com/coreybutler/nvm-windows
- **NVM Linux/Mac**: https://github.com/nvm-sh/nvm
- **Histórico de Versões**: https://nodejs.org/en/about/releases/

---

**Resumo:** Use **Node.js 20.x LTS** para máxima estabilidade e compatibilidade! 🎯
