"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { 
  Search, Home, Tv, Store, Users, Bell, MessageCircle, Menu, 
  MoreHorizontal, Video, Image as ImageIcon, Smile, ThumbsUp, MessageSquare, Share2,
  Clock, Calendar, Heart, Bookmark, Globe
} from "lucide-react";

export default function ProfilPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push("/connexion");
      else { setUser(currentUser); setIsLoading(false); }
    });
    return () => unsubscribe();
  }, [router]);

  if (isLoading || !user) return <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;

  const userInitial = user.displayName ? user.displayName[0].toUpperCase() : "U";

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-black font-sans pb-10">
      {/* 1. TOP NAVBAR (Facebook Style) */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white shadow-sm z-50 flex items-center justify-between px-4">
        {/* L: Logo & Search */}
        <div className="flex items-center gap-2">
           <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 cursor-pointer shadow-md" onClick={() => router.push("/")}>
              <span className="text-white font-black text-2xl -mt-1 font-serif">i</span>
           </div>
           <div className="flex items-center bg-[#f0f2f5] rounded-full px-3 py-2 w-10 xl:w-64 h-10 cursor-pointer">
              <Search size={18} className="text-gray-500 flex-shrink-0" />
              <input type="text" placeholder="Rechercher sur ICC..." className="hidden xl:block bg-transparent outline-none ml-2 text-[15px] placeholder-gray-500 w-full" />
           </div>
        </div>

        {/* C: Navigation Tabs */}
        <div className="hidden md:flex items-center justify-center space-x-2 w-full max-w-[600px] h-full">
           <Link href="/profil" className="flex-1 h-full flex items-center justify-center cursor-pointer relative border-b-[3px] border-blue-600">
             <Home size={28} className="text-blue-600" />
           </Link>
           <Link href="/sermons" className="flex-1 h-full flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-lg m-1 transition-colors group">
             <Tv size={28} className="text-gray-500 group-hover:bg-gray-200 rounded-lg p-1" />
           </Link>
           <Link href="/dons" className="flex-1 h-full flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-lg m-1 transition-colors group">
             <Heart size={28} className="text-gray-500 group-hover:bg-gray-200 rounded-lg p-1" />
           </Link>
           <Link href="/evenements" className="flex-1 h-full flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-lg m-1 transition-colors group">
             <Calendar size={28} className="text-gray-500 group-hover:bg-gray-200 rounded-lg p-1" />
           </Link>
        </div>

        {/* R: User Actions */}
        <div className="flex items-center gap-2">
           <button className="hidden xl:flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
             <Menu size={20} className="text-black" />
           </button>
           <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
             <MessageCircle size={20} className="text-black" />
           </button>
           <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors relative">
             <Bell size={20} className="text-black" />
             <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</div>
           </button>
           <button onClick={() => signOut(auth)} title="Se déconnecter" className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden relative cursor-pointer border border-blue-200 hover:opacity-80 transition-opacity flex items-center justify-center">
             <span className="font-bold text-blue-700 text-lg">{userInitial}</span>
           </button>
        </div>
      </header>

      {/* 2. THREE COLUMN LAYOUT */}
      <div className="pt-[72px] w-full flex justify-center max-w-[1920px] mx-auto px-4">
        
        {/* --- LEFT SIDEBAR --- */}
        <div className="hidden xl:flex flex-col w-[360px] sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto py-2 pl-2 pr-4 scrollbar-hide">
           <div className="flex items-center p-2 rounded-xl hover:bg-gray-200 cursor-pointer transition-colors">
             <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center mr-3 font-bold text-blue-700">{userInitial}</div>
             <span className="font-semibold text-[15px]">{user.displayName || "Utilisateur"}</span>
           </div>

           <Link href="/sermons" className="flex items-center p-2 rounded-xl hover:bg-gray-200 cursor-pointer transition-colors mt-2">
             <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yI/r/kVQWvHEsZqO.png" alt="Sermons" className="w-9 h-9 mr-3 object-cover rounded-full bg-white shadow-sm" />
             <span className="font-medium text-[15px]">Messages & Culte en direct</span>
           </Link>

           <Link href="/evenements" className="flex items-center p-2 rounded-xl hover:bg-gray-200 cursor-pointer transition-colors mt-2">
             <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yA/r/A2tHTy6ibgT.png" alt="Events" className="w-9 h-9 mr-3 object-cover rounded-full bg-white shadow-sm" />
             <span className="font-medium text-[15px]">Agenda ICC</span>
           </Link>

           <Link href="/dons" className="flex items-center p-2 rounded-xl hover:bg-gray-200 cursor-pointer transition-colors mt-2">
             <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/nE_9_I9NmbS.png" alt="Dons" className="w-9 h-9 mr-3 object-cover rounded-full bg-white shadow-sm" />
             <span className="font-medium text-[15px]">Dîmes & Offrandes</span>
           </Link>

           <div className="flex items-center p-2 rounded-xl hover:bg-gray-200 cursor-pointer transition-colors mt-2">
             <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/4B9xRPR0fH5.png" alt="Groupes" className="w-9 h-9 mr-3 object-cover rounded-full bg-white shadow-sm" />
             <span className="font-medium text-[15px]">Ma Cellule</span>
           </div>

           <div className="flex items-center p-2 rounded-xl hover:bg-gray-200 cursor-pointer transition-colors mt-2">
             <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/9BbexBha1_X.png" alt="Souvenirs" className="w-9 h-9 mr-3 object-cover rounded-full bg-white shadow-sm" />
             <span className="font-medium text-[15px]">Témoignages</span>
           </div>
           
           <div className="flex items-center p-2 rounded-xl hover:bg-gray-200 cursor-pointer transition-colors mt-2">
             <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center mr-3"><Menu size={20} className="text-black" /></div>
             <span className="font-medium text-[15px]">Voir plus</span>
           </div>

           <div className="border-b border-gray-300 w-full mt-4 mb-4"></div>
           
           <div className="flex items-center justify-between px-2 mb-2">
              <h3 className="text-[17px] font-semibold text-gray-500">Vos raccourcis</h3>
              <span className="text-blue-600 text-[15px] hover:bg-gray-200 px-2 py-1 rounded cursor-pointer hidden group-hover:block">Modifier</span>
           </div>
           <div className="flex items-center p-2 rounded-xl hover:bg-gray-200 cursor-pointer transition-colors">
             <img src="https://impactcentrechretien.com/wp-content/uploads/2021/03/LOGO-GRIS.png" className="w-9 h-9 rounded-lg bg-white border border-gray-200 mr-3 shrink-0 object-contain p-1" alt="Raccourci" />
             <span className="font-medium text-[15px]">ICC Paris - Équipe d'accueil</span>
           </div>
        </div>


        {/* --- CENTER FEED --- */}
        <div className="flex-1 max-w-[680px] w-full flex flex-col items-center min-w-0">
          
          {/* Stories Carousel */}
          <div className="w-full flex space-x-2 mb-6 overflow-x-auto scrollbar-hide py-1 px-1">
             {/* Create Story */}
             <div className="w-[112px] h-[200px] shrink-0 rounded-xl overflow-hidden shadow-sm bg-white border border-gray-200 relative cursor-pointer hover:opacity-90 transition-opacity">
                <div className="w-full h-[65%] bg-blue-50 flex items-center justify-center">
                    <span className="text-4xl font-bold text-blue-200">{userInitial}</span>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-[55%] w-10 h-10 bg-blue-600 border-4 border-white rounded-full flex items-center justify-center text-white z-10 font-bold text-xl">+</div>
                <div className="w-full h-[35%] flex items-end justify-center pb-3 text-[13px] font-bold text-black leading-tight">Créer une<br/>story</div>
             </div>
             
             {/* Stories List */}
             {[
               { name: "Pasteur Yvan", color: "bg-blue-600" },
               { name: "Cellule 14", color: "bg-pink-600" },
               { name: "Chorale ICC", color: "bg-purple-600" },
               { name: "Témoignage", color: "bg-emerald-600" }
             ].map((story, i) => (
                <div key={i} className={`w-[112px] h-[200px] shrink-0 rounded-xl overflow-hidden shadow-sm ${story.color} relative cursor-pointer hover:opacity-90 transition-opacity`}>
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors"></div>
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-full border-4 border-blue-600 bg-white flex items-center justify-center z-10">
                        <span className="font-bold text-black text-sm">{story.name[0]}</span>
                    </div>
                    <div className="absolute bottom-3 left-3 text-white text-[13px] font-semibold drop-shadow-md z-10 leading-tight pr-2">{story.name}</div>
                </div>
             ))}
          </div>

          {/* Create Post Input */}
          <div className="w-full bg-white rounded-xl shadow-sm mb-4 border border-gray-200">
             <div className="p-4 flex gap-2">
                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-800 shrink-0 cursor-pointer">{userInitial}</div>
                 <div className="bg-[#f0f2f5] hover:bg-gray-200 transition-colors w-full rounded-full h-10 px-4 flex items-center cursor-pointer">
                    <span className="text-gray-500 text-[16px]">Exprimez votre gratitude, {user.displayName?.split(' ')[0] || ""}...</span>
                 </div>
             </div>
             <div className="border-t border-gray-200 px-4"></div>
             <div className="p-2 flex items-center justify-between">
                <button className="flex-1 flex items-center justify-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition-colors text-gray-500 font-semibold text-[15px]">
                  <Video size={24} className="text-red-500 fill-red-500" />
                  <span className="hidden sm:block">Vidéo en direct</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition-colors text-gray-500 font-semibold text-[15px]">
                  <ImageIcon size={24} className="text-green-500 fill-green-500" />
                  <span className="hidden sm:block">Photo/vidéo</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition-colors text-gray-500 font-semibold text-[15px]">
                  <Smile size={24} className="text-yellow-500 fill-yellow-500" />
                  <span className="hidden sm:block">Humeur/Activité</span>
                </button>
             </div>
          </div>

          {/* Posts Feed */}
          
          {/* Post 1 */}
          <div className="w-full bg-white rounded-xl shadow-sm mb-4 border border-gray-200">
            <div className="px-4 pt-4 flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                 <div className="w-10 h-10 rounded-full overflow-hidden relative border border-gray-200 flex items-center justify-center bg-gray-50 cursor-pointer">
                    <Image src="https://impactcentrechretien.com/wp-content/uploads/2021/03/LOGO-GRIS.png" alt="ICC" fill className="object-contain p-1" />
                 </div>
                 <div>
                   <h4 className="font-semibold text-[15px] cursor-pointer hover:underline text-black">ICC Officiel</h4>
                   <div className="flex items-center text-gray-500 text-[13px] hover:underline cursor-pointer">
                      <span>2 h</span><span className="mx-1">·</span><Globe size={12} />
                   </div>
                 </div>
              </div>
              <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
                 <MoreHorizontal size={20} className="text-gray-500" />
              </button>
            </div>
            
            <div className="px-4 pb-2 text-[15px] text-black">
               <p>Soyez richement bénis ! 🙌 Revivez les moments forts de notre culte de dimanche dernier avec le Pasteur Yvan Castanou. Un message puissant sur l'élévation des champions qu'il ne faut pas manquer de réécouter.</p>
               <br />
               <p>Partagez ce post pour bénir une autre vie aujourd'hui ! 👇</p>
            </div>
            
            <div className="w-full relative bg-[#f0f2f5] aspect-video">
                <Image src="https://impactcentrechretien.com/wp-content/uploads/2023/09/IMG_0342-scaled.jpg" alt="Post" fill className="object-cover" />
            </div>
            
            <div className="px-4 py-2 flex items-center justify-between text-gray-500 text-[15px]">
               <div className="flex items-center cursor-pointer">
                 <span className="bg-blue-600 rounded-full p-1 z-10 border border-white"><ThumbsUp size={12} className="text-white fill-white" /></span>
                 <span className="bg-red-500 rounded-full p-1 -ml-1 border border-white"><Heart size={12} className="text-white fill-white" /></span>
                 <span className="ml-2 hover:underline">1,2 K</span>
               </div>
               <div className="flex items-center space-x-3">
                  <span className="hover:underline cursor-pointer">184 commentaires</span>
                  <span className="hover:underline cursor-pointer">45 partages</span>
               </div>
            </div>
            
            <div className="border-t border-gray-200 mx-4"></div>
            
            <div className="px-1 py-1 flex items-center justify-between mx-3 mb-1 mt-1">
                <button className="flex-1 flex items-center justify-center space-x-2 hover:bg-gray-100 py-2 rounded-lg transition-colors text-gray-500 font-semibold text-[15px]">
                  <ThumbsUp size={20} />
                  <span>J'aime</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 hover:bg-gray-100 py-2 rounded-lg transition-colors text-gray-500 font-semibold text-[15px]">
                  <MessageSquare size={20} />
                  <span>Commenter</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 hover:bg-gray-100 py-2 rounded-lg transition-colors text-gray-500 font-semibold text-[15px]">
                  <Share2 size={20} />
                  <span>Partager</span>
                </button>
            </div>
          </div>

        </div>


        {/* --- RIGHT SIDEBAR --- */}
        <div className="hidden lg:flex flex-col w-[360px] sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto py-2 pl-4 pr-2 scrollbar-hide">
           <h3 className="text-[17px] font-semibold text-gray-500 mb-3 px-2">Sponsorisé</h3>
           
           <div className="flex items-start p-2 rounded-xl hover:bg-gray-200 cursor-pointer transition-colors mb-2 gap-3 group">
              <div className="w-[110px] h-[110px] rounded-lg bg-gray-50 overflow-hidden relative shrink-0 border border-gray-200">
                  <Image src="https://impactcentrechretien.com/wp-content/uploads/2021/03/LOGO-GRIS.png" alt="Dons" fill className="object-contain p-2 group-hover:scale-105 transition-transform" />
              </div>
              <div className="mt-1">
                 <h4 className="font-semibold text-[15px] text-black">Bâtissons ensemble</h4>
                 <p className="text-[13px] text-gray-500 mb-1 leading-tight">Soutenez fidèlement l'œuvre de Dieu.</p>
                 <span className="text-[12px] text-gray-400">dons.icc.com</span>
              </div>
           </div>

           <div className="border-b border-gray-300 w-[95%] mx-auto mt-2 mb-4"></div>
           
           <div className="flex items-center justify-between px-2 mb-2">
              <h3 className="text-[17px] font-semibold text-gray-500">Contacts en ligne</h3>
              <div className="flex gap-2 text-gray-500">
                 <Video size={18} className="cursor-pointer hover:bg-gray-200 rounded-full p-0.5" />
                 <Search size={18} className="cursor-pointer hover:bg-gray-200 rounded-full p-0.5" />
                 <MoreHorizontal size={18} className="cursor-pointer hover:bg-gray-200 rounded-full p-0.5" />
              </div>
           </div>

           {["Pasteur Yves", "Ancien Paul", "Leader Sarah", "Membre Cellule 1", "Membre Cellule 2", "Accueil ICC"].map((name, i) => (
             <div key={name} className="flex items-center p-2 rounded-xl hover:bg-gray-200 cursor-pointer transition-colors relative">
               <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-800 mr-3 border border-gray-200">{name[0]}</div>
               <div className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-[#f0f2f5] rounded-full left-[34px] bottom-2 z-10 custom-ring"></div>
               <span className="font-semibold text-[15px] text-black">{name}</span>
             </div>
           ))}
        </div>

      </div>
    {/* Minimal CSS inject for ring and hide scrollbar */}
    <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    `}} />
    </div>
  );
}
