"use client";

import Image from "next/image";
import Link from 'next/link';
import { BsPersonVcard } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa";
import { FaBox } from "react-icons/fa";

export default function WithSubnavigation() {
  return (
    <nav id="nav" className="z-20 top-0 sticky w-screen h-20 bg-[#FFFFFF] shadow-md flex flex-1 justify-between px-16 place-self-center">
      <Link href="/">
      <Image
        width={140}
        height={140}
        src='/images/ThailandPost_Logo.png'
        className="pl-6 pt-2 place-self-center align-middle"
        alt="logo-navbar"
      />
      </Link>
      <section className="flex mr-4 collapse md:visible place-self-center gap-3">
              <Link className="bg-red-500 rounded-full px-4 py-3 flex flex-row gap-2" href="/new">
                <FaBox size={28} color="#FFFFFF"/>
                <h1 className="text-white font-extrabold">Input Parcels</h1>
              </Link>
              <Link className="bg-red-500 rounded-full px-4 py-3 flex flex-row gap-2" href="/envelope">
                <FaFilePdf size={28} color="#FFFFFF"/>
                <h1 className="text-white font-extrabold">Print Label</h1>
              </Link>
              <Link className="bg-red-500 rounded-full px-4 py-3 flex flex-row gap-2" href="/admin/parcels">
                <BsPersonVcard size={28} color="#FFFFFF"/>
                <h1 className="text-white font-extrabold">Staff Zone</h1>
              </Link>
        </section>
  </nav>
  );
}
