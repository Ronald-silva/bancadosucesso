/**
 * Centralized error mapping utility to prevent information leakage
 * Maps database and authentication errors to user-friendly messages
 */

export const mapDatabaseError = (error: any): string => {
  const msg = error?.message?.toLowerCase() || '';
  
  // Auth errors
  if (msg.includes('invalid login') || msg.includes('invalid credentials')) {
    return 'Email ou senha incorretos.';
  }
  if (msg.includes('email not confirmed')) {
    return 'Por favor, confirme seu email.';
  }
  if (msg.includes('user already registered') || msg.includes('duplicate')) {
    return 'Este email já está cadastrado.';
  }
  if (msg.includes('password') && msg.includes('weak')) {
    return 'A senha é muito fraca. Use uma senha mais forte.';
  }
  
  // Database errors
  if (msg.includes('violates check constraint') || msg.includes('check_')) {
    return 'Os dados fornecidos não são válidos.';
  }
  if (msg.includes('foreign key') || msg.includes('fkey')) {
    return 'Erro ao processar solicitação.';
  }
  if (msg.includes('permission denied') || msg.includes('rls') || msg.includes('policy')) {
    return 'Você não tem permissão para esta ação.';
  }
  if (msg.includes('unique constraint') || msg.includes('unique_')) {
    return 'Este registro já existe.';
  }
  
  // Storage errors
  if (msg.includes('storage') || msg.includes('bucket')) {
    return 'Erro ao processar arquivo.';
  }
  if (msg.includes('file') && (msg.includes('size') || msg.includes('large'))) {
    return 'O arquivo é muito grande.';
  }
  if (msg.includes('mime') || msg.includes('type')) {
    return 'Tipo de arquivo não permitido.';
  }
  
  // Network errors
  if (msg.includes('network') || msg.includes('fetch') || msg.includes('connection')) {
    return 'Erro de conexão. Verifique sua internet e tente novamente.';
  }
  if (msg.includes('timeout')) {
    return 'A operação demorou muito. Tente novamente.';
  }
  
  // Generic fallback - never expose raw error messages
  return 'Ocorreu um erro inesperado. Tente novamente.';
};
