@echo off
REM Script de deploy para Hostinger (Windows)
REM Este script automatiza o processo de build e preparação dos arquivos

echo 🚀 Iniciando processo de deploy...

REM Verifica se o .env existe
if not exist .env (
    echo ⚠️  Arquivo .env não encontrado!
    echo 📝 Crie um arquivo .env com as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY
    pause
    exit /b 1
)

REM Instala dependências
echo 📦 Instalando dependências...
call npm install

REM Faz o build do projeto
echo 🔨 Fazendo build do projeto...
call npm run build

REM Verifica se o build foi bem-sucedido
if not exist "dist" (
    echo ❌ Erro: Pasta dist não foi criada. Verifique os erros acima.
    pause
    exit /b 1
)

REM Verifica se o .htaccess foi copiado
if not exist "dist\.htaccess" (
    echo ⚠️  Copiando .htaccess para dist/...
    copy .htaccess dist\.htaccess >nul 2>&1
    if exist "dist\.htaccess" (
        echo ✅ .htaccess copiado com sucesso!
    ) else (
        echo ⚠️  Não foi possível copiar .htaccess automaticamente. Copie manualmente.
    )
)

echo.
echo ✅ Build concluído com sucesso!
echo.
echo 📤 Próximos passos para upload na Hostinger:
echo.
echo 1. Acesse https://hpanel.hostinger.com
echo 2. Vá em "Gerenciador de Arquivos"
echo 3. Navegue até public_html/ (ou public_html/seu-dominio.com/)
echo 4. Delete arquivos antigos se houver
echo 5. Faça upload de TODOS os arquivos da pasta dist/
echo    (incluindo o .htaccess que já está dentro de dist/)
echo.
echo 📁 Arquivos prontos para upload em: ./dist/
echo.
echo 💡 Dica: Você pode compactar a pasta dist/ em um arquivo .zip
echo    e fazer upload do .zip, depois extrair no servidor.
echo.
pause
