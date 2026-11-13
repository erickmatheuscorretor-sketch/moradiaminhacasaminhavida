import { createFileRoute } from '@tanstack/react-router';
import { HowItWorks } from '@/components/housing-sections';
import { BottomCTA, metadata } from '@/components/housing-layout';
export const Route = createFileRoute('/como-funciona')({head:()=>metadata('Como funciona', 'Conheça as etapas para receber informações sobre seu perfil habitacional.'),component:Page});
function Page(){return <><HowItWorks/><BottomCTA/></>;}
