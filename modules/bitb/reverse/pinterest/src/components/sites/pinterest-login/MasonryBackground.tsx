"use client";
import Image from 'next/image';

type Props = {};

export default function MasonryBackground(_: Props) {
  const images = [
    '/sites/pinterest-login/images/b3416e2688aa4d20f846aeb8127e6b3b.jpg',
    '/sites/pinterest-login/images/23ad5fc40270120b22bea471fe3656aa.jpg',
    '/sites/pinterest-login/images/83391e3103e17a46e2733b09bf154a06.jpg',
    '/sites/pinterest-login/images/87f7b55bc3de78ef95fd36fa3a237172.jpg',
    '/sites/pinterest-login/images/d34907c96950574c15719219e0f0dd69.jpg',
    '/sites/pinterest-login/images/49ad71817c829e8d86ca16fa6508b0c4.jpg',
    '/sites/pinterest-login/images/a87f53ea636966bf24cf279ed2fdc4dc.jpg',
    '/sites/pinterest-login/images/3667b449f3cacaaeef3f68fc9cf609be.jpg',
    '/sites/pinterest-login/images/9d4f43222d4fc694a61f7635f2d42892.jpg',
    '/sites/pinterest-login/images/48d9f0a63ac5c08b1cf2608ceb4a884f.jpg'
  ];

  return (
    <div className="absolute inset-0 grid grid-cols-5 gap-1 opacity-30" style={{ transform: 'translateY(-100px)' }} aria-hidden="true">
      {images.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt=""
          width={236}
          height={354}
          className="object-cover"
          loading="lazy"
        />
      ))}
    </div>
  );
}
