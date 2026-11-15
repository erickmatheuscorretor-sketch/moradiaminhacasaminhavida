import { describe, it, expect } from 'vitest';
import { housingSchema, incomes, employments, materialPrice, materialCheckoutUrl } from '@/lib/housing-schema';
const valid = {full_name:'Pessoa Teste',birth_date:'1990-01-10',whatsapp:'11999999999',email:'teste@example.com',city:'São Paulo',state:'SP',income:'Até R$ 2.000',employment:'CLT',owns_property:'Não',family_size:3,consent:true,website:''};
describe('Housing rules',()=>{
 it('requires explicit personal-data consent',()=>{expect(housingSchema.safeParse({...valid,consent:false}).success).toBe(false);expect(housingSchema.safeParse(valid).success).toBe(true);});
 it('uses the five requested income bands',()=>{expect(incomes).toEqual(['Até R$ 2.000','R$ 2.001 a R$ 3.000','R$ 3.001 a R$ 4.000','R$ 4.001 a R$ 5.000','Acima de R$ 5.000']);expect(housingSchema.safeParse({...valid,income:'Outra faixa'}).success).toBe(false);});
 it('uses the five requested employment options',()=>{expect(employments).toEqual(['CLT','Autônomo','MEI','Desempregado','Aposentado']);expect(housingSchema.safeParse({...valid,employment:'Outro'}).success).toBe(false);});
 it('sets the demonstrative price to 19 reais',()=>{expect(materialPrice).toBe(19);});
 it('sends guide purchases to the supplied Kiwify checkout',()=>{expect(materialCheckoutUrl).toBe('https://pay.kiwify.com.br/oLZI7gb');});
 it('rejects invalid contact data and impossible dates',()=>{expect(housingSchema.safeParse({...valid,whatsapp:'123'}).success).toBe(false);expect(housingSchema.safeParse({...valid,birth_date:'2026-02-30'}).success).toBe(false);});
});
