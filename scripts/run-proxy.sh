#!/bin/sh

# Script para executar o proxy CORS para acessar o Hugging Face
# Este script permite que o WebLLM faça requisições para o Hugging Face sem problemas de CORS
# Execute este script em uma janela de terminal separada antes de iniciar o projeto

echo "Iniciando o proxy CORS na porta 8080..."
echo "Este proxy permite que o WebLLM acesse o Hugging Face sem problemas de CORS"
echo "Mantenha esta janela aberta enquanto usa o WebLLM Chat"
echo "Para encerrar, pressione Ctrl+C"
echo "---------------------------------------------"

node ./scripts/cors-proxy.js 