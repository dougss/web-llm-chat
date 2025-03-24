const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 8080;

// Configurar CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Proxy para o Hugging Face
app.use('/huggingface', createProxyMiddleware({
  target: 'https://huggingface.co',
  changeOrigin: true,
  pathRewrite: {
    '^/huggingface': ''
  },
  onProxyRes: function(proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  }
}));

// Proxy para o espelho do Hugging Face
app.use('/hf-mirror', createProxyMiddleware({
  target: 'https://hf-mirror.com',
  changeOrigin: true,
  pathRewrite: {
    '^/hf-mirror': ''
  },
  onProxyRes: function(proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  }
}));

app.listen(PORT, () => {
  console.log(`Proxy CORS rodando em http://localhost:${PORT}`);
}); 