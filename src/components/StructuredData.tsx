import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const StructuredData = () => {
  const location = useLocation();

  useEffect(() => {
    // Remove script anterior se existir
    const existingScript = document.getElementById('structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Dados da Organização/Loja
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Store",
      "name": "Banca do Sucesso",
      "description": "Loja online com produtos de qualidade e os melhores preços. Material de construção, informática, escritório e muito mais.",
      "url": "https://bancadosucessoinf.com.br",
      "logo": "https://bancadosucessoinf.com.br/logo-banca-sucesso.jpg",
      "image": "https://bancadosucessoinf.com.br/logo-banca-sucesso.jpg",
      "telephone": "+55-91-98275-0788",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "BR",
        "addressRegion": "PA"
      },
      "sameAs": [
        "https://www.instagram.com/bancadosucesso_inf/",
        "https://www.facebook.com/bancadosucesso"
      ],
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://bancadosucessoinf.com.br/products?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };

    // WebSite schema para busca
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Banca do Sucesso",
      "url": "https://bancadosucessoinf.com.br",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://bancadosucessoinf.com.br/products?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };

    // Breadcrumb schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Início",
          "item": "https://bancadosucessoinf.com.br"
        }
      ]
    };

    // Adicionar mais itens ao breadcrumb baseado na rota
    if (location.pathname.includes('/products')) {
      breadcrumbSchema.itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Produtos",
        "item": "https://bancadosucessoinf.com.br/products"
      });
    } else if (location.pathname.includes('/category/')) {
      const categoryName = location.pathname.split('/category/')[1];
      breadcrumbSchema.itemListElement.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Produtos",
        "item": "https://bancadosucessoinf.com.br/products"
      });
      breadcrumbSchema.itemListElement.push({
        "@type": "ListItem",
        "position": 3,
        "name": categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
        "item": `https://bancadosucessoinf.com.br${location.pathname}`
      });
    }

    // Combinar todos os schemas
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        organizationSchema,
        websiteSchema,
        breadcrumbSchema
      ]
    };

    // Adicionar script ao head
    const script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [location]);

  return null;
};
