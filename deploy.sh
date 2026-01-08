#!/bin/bash

# Script de deploy para Hostinger
# Este script automatiza o processo de build e preparação dos arquivos

echo "🚀 Iniciando processo de deploy..."

# Verifica se o .env existe
if [ ! -f .env ]; then
    echo "⚠️  Arquivo .env não encontrado!"
    echo "📝 Crie um arquivo .env com as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY"
    exit 1
fi

# Instala dependências
echo "📦 Instalando dependências..."
npm install

# Faz o build do projeto
echo "🔨 Fazendo build do projeto..."
npm run build

# Verifica se o build foi bem-sucedido
if [ ! -d "dist" ]; then
    echo "❌ Erro: Pasta dist não foi criada. Verifique os erros acima."
    exit 1
fi

# Verifica se o .htaccess foi copiado e copia se necessário
if [ ! -f "dist/.htaccess" ]; then
    echo "⚠️  Copiando .htaccess para dist/..."
    if [ -f ".htaccess" ]; then
        cp .htaccess dist/.htaccess
        echo "✅ .htaccess copiado com sucesso!"
    else
        echo "⚠️  Arquivo .htaccess não encontrado na raiz do projeto"
    fi
fi

echo ""
echo "✅ Build concluído com sucesso!"
echo ""
echo "📤 Próximos passos para upload na Hostinger:"
echo ""
echo "1. Acesse https://hpanel.hostinger.com"
echo "2. Vá em 'Gerenciador de Arquivos'"
echo "3. Navegue até public_html/ (ou public_html/seu-dominio.com/)"
echo "4. Delete arquivos antigos se houver"
echo "5. Faça upload de TODOS os arquivos da pasta dist/"
echo "   (incluindo o .htaccess que já está dentro de dist/)"
echo ""
echo "📁 Arquivos prontos para upload em: ./dist/"
echo ""
echo "💡 Dica: Você pode compactar a pasta dist/ em um arquivo .zip"
echo "   e fazer upload do .zip, depois extrair no servidor."
