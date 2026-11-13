import { createFileRoute } from '@tanstack/react-router';
import { Benefits } from '@/components/housing-sections';
import { BottomCTA, metadata } from '@/components/housing-layout';
export const Route = createFileRoute('/beneficios')({head:()=>metadata('Benefícios de estar bem informado', 'Entenda critérios, documentos, subsídios e oportunidades habitacionais.'),component:Page});
function Page(){return <><Benefits/><BottomCTA/></>;}
