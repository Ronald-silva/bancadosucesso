import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  type?: 'website' | 'product' | 'article';
}

export const SEOHead = ({
  title = 'Banca do Sucesso - Melhor Preço da Loja Online | Compre Agora',
  description = 'Encontre tudo o que precisa na Banca do Sucesso. Produtos de qualidade com os melhores preços do Brasil. Entrega rápida, pagamento seguro e garantia de satisfação.',
  keywords = 'loja online, compras online, melhores preços, produtos qualidade, entrega rápida, Brasil, material construção, informática, escritório, armarinho',
  ogImage = 'https://bancadosucessoinf.com.br/logo-banca-sucesso.jpg',
  canonicalUrl = 'https://bancadosucessoinf.com.br',
  type = 'website'
}: SEOHeadProps) => {

  useEffect(() => {
    // Atualizar título
    document.title = title;

    // Atualizar ou criar meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Meta tags básicas
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:site_name', 'Banca do Sucesso', true);
    updateMetaTag('og:locale', 'pt_BR', true);

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:site', '@bancadosucesso_inf');

    // Atualizar canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

  }, [title, description, keywords, ogImage, canonicalUrl, type]);

  return null;
};
