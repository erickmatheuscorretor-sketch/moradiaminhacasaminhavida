import { z } from "zod";

export const incomes = ["Até R$ 2.000", "R$ 2.001 a R$ 3.000", "R$ 3.001 a R$ 4.000", "R$ 4.001 a R$ 5.000", "Acima de R$ 5.000"] as const;
export const employments = ["CLT", "Autônomo", "MEI", "Desempregado", "Aposentado"] as const;
export const states = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"] as const;
export const materialPrice = 19;
export const materialCheckoutUrl = 'https://pay.kiwify.com.br/oLZI7gb';
export const housingSchema = z.object({
  full_name: z.string().trim().min(3, "Informe seu nome completo.").max(120).refine(v => v.includes(" "), "Informe nome e sobrenome."),
  birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Informe uma data válida.").refine(v => { const date = new Date(v + "T00:00:00Z"); return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === v && date <= new Date() && date.getUTCFullYear() >= 1900; }, "Informe uma data de nascimento válida."),
  whatsapp: z.string().max(20).transform(v => v.replace(/\D/g, "")).refine(v => /^[1-9]\d{9,10}$/.test(v), "Informe o WhatsApp com DDD."),
  email: z.string().trim().email("Informe um e-mail válido.").max(254),
  city: z.string().trim().min(2, "Informe sua cidade.").max(100),
  state: z.enum(states, { errorMap: () => ({ message: "Selecione seu estado." }) }),
  income: z.enum(incomes, { errorMap: () => ({ message: "Selecione sua renda familiar." }) }),
  employment: z.enum(employments, { errorMap: () => ({ message: "Selecione sua situação profissional." }) }),
  owns_property: z.enum(["Sim", "Não"], { errorMap: () => ({ message: "Selecione uma opção." }) }),
  family_size: z.coerce.number().int().min(1, "Informe pelo menos uma pessoa.").max(50),
  consent: z.boolean().refine(v => v, "É necessário autorizar o tratamento dos dados para continuar."),
  website: z.string().max(0),
});
export const chapters = ["Como funcionam os programas habitacionais", "Critérios gerais de elegibilidade", "Documentos normalmente solicitados", "Como funciona a análise de financiamento", "Diferenças entre subsídios e financiamento", "Como acompanhar oportunidades na sua cidade"];