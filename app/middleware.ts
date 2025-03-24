import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Determina se a URL é uma URL do Hugging Face
function isHuggingFaceURL(url: string): boolean {
  return url.includes("huggingface.co") || url.includes("hf-mirror.com");
}

// Middleware que intercepta requisições
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Se for uma requisição para o Hugging Face
  if (isHuggingFaceURL(url.pathname) || isHuggingFaceURL(url.href)) {
    console.log("Interceptando requisição para Hugging Face:", url.href);

    // Redireciona para o proxy local
    const proxyURL = new URL(
      "http://localhost:8080/huggingface" + url.pathname + url.search,
    );
    return NextResponse.rewrite(proxyURL);
  }

  // Para outras requisições, adicione cabeçalhos CORS
  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );

  return response;
}

export const config = {
  // Executa o middleware apenas para essas rotas
  matcher: [
    // Rotas do Hugging Face
    "/huggingface/:path*",
    "/hf-mirror/:path*",
    // API routes
    "/api/:path*",
  ],
};
