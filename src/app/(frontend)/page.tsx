import Row from '@/components/Accueil/Row';
import Link from 'next/link';
import React from 'react';

export default async function HomePage() {
  return (
    <div className='flex flex-col items-center text-center'>
      <div className='container max-w-[1000px]'>
        <h1 className='text-3xl font-bold mb-6'>Accueil</h1>
        <Row
          imageProperties={{
            src: '/personnes.jpg',
            alt: "Ensemble des membres de l'association lors de Lille aux Jeux",
          }}
          title='Qui sommes nous ?'
          reverse={false}
        >
          <p className='text-justify'>
            Centr’All Games est une association loi 1901 composée d’étudiants de
            l’École Centrale de Lille passionnés par les jeux de société. Notre
            association a pour vocation d’organiser des évènements à la fois à
            l’intérieur de l’École mais aussi des évènements destinés à tout le
            monde.
          </p>
        </Row>
        <Row
          imageProperties={{
            src: '/local-cag.jpg',
            alt: "Image satellite de la résidence léonard de Vinci avec entouré en rouge le local Centr'AllGames",
          }}
          title='Où nous trouver ?'
          reverse={true}
        >
          <p className='text-justify mb-3'>
            Nous somme situés au bâtiment D de la résidence léonard de Vinci.
            Vous pouvez venir nous voir quand vous le souhaitez pour venir
            jouer.
          </p>
          <p className='text-justify'>
            Nous sommes très souvent ouvert, si vous souhaitez venir, vous
            pouvez consulter le nom de la communoté sur Messenger pour vérifier
            si nous sommes bien ouvert. Si vous souhaitez rejoindre la
            communité, vous pouvez contacter un membre de l&apos;association ou
            contacter notre mascotte.
          </p>
        </Row>
        <Row
          imageProperties={{
            src: '/jeux.jpg',
            alt: 'Ensemble de jeux de sociétés disposés sur une table',
          }}
          title='Jeux et emprunts'
          reverse={false}
        >
          <p className='text-justify mb-3'>
            Nous possédons une très grande quantité de jeux pour permettre à
            tous de s&apos;amuser. Si vous le souhaitez, vous pouvez aussi
            emprunter des jeux pour les ramener chez vous. Vous pouvez consulter
            l&apos;ensemble des jeux empruntables sur notre page jeux dédié.
          </p>
          <Link
            href='/games'
            className='inline-block mt-2 px-6 py-2 rounded-full border border-white/30 
             bg-white/10 backdrop-blur-xs text-white font-medium 
             hover:bg-[#ff7d00]/20 hover:border-[#ff7d00]/60 
             transition-all duration-300 shadow-[0_0_15px_rgba(255,125,0,0.1)]'
          >
            Consulter les jeux
          </Link>
        </Row>
        <Row
          imageProperties={{
            src: '/lille-aux-jeux-2025.jpg',
            alt: "Affiche de Lille aux Jeux 2025 avec le logo de l'association, des informations sur les horaires, l'endroit et les activités proposées",
          }}
          title='Lille aux Jeux'
          reverse={true}
        >
          <p className='text-justify'>
            Lille aux Jeux est un événement annuel organisé par Centr’All Games,
            rassemblant des passionnés de jeux de société de toute la région.
            Cet événement vise à promouvoir la culture ludique en offrant un
            espace convivial où les participants peuvent découvrir, apprendre et
            jouer à une vaste sélection de jeux. Pour en savoir plus sur
            l&apos;évènement, vous pouvez directement accéder au site{' '}
            <a
              href='https://laj.centrallgames.fr'
              target='_blank'
              rel='noopener noreferrer'
              className='link underline'
            >
              Lille aux jeux
            </a>
            .
          </p>
        </Row>
      </div>
    </div>
  );
}
