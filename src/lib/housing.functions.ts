import { createServerFn } from '@tanstack/react-start';
import { housingSchema } from './housing-schema';

export const submitHousingRegistration = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => housingSchema.parse(input))
  .handler(async ({ data }) => {
    // This public endpoint only accepts validated, consented leads and never exposes stored data.
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { website: _honeypot, owns_property, ...fields } = data;
    const { error } = await supabaseAdmin.from('housing_registrations').insert({ ...fields, owns_property: owns_property === 'Sim', consent_version: '2026-11-13' });
    if (error) return { success: false, message: 'Não foi possível salvar seu cadastro. Tente novamente em instantes.' };
    return { success: true, message: 'Cadastro recebido com sucesso!' };
  });
