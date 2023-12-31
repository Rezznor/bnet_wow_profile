"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const HomeSearchForm = ({ realmListData }) => {
    
    const router = useRouter();
   
    const handleCharacterSearch = () => {
        //console.log(`${region} // ${realm} // ${characterName}`)
        
        router.push(`/characters/${region}/${realm}/${characterName}`);
    }
    
    
    
    return (
        
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Search your character
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">


            </div>
        </div>
        
        // <div className="flex flex-wrap -mx-3 mb-2">
        //     <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        //         <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="realmListForm">Realm</label>
        //         <div className="relative">
        //             <select 
        //                 className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
        //                 onChange={(e) => setRealm(e.target.value)}
        //                 id="realmListForm"
        //             >
        //                 {realmListData.map((realm) => (
        //                     <option key={realm.id} value={realm.slug}>{realm.name}</option>
        //                 ))}
        //             </select>
        //             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        //                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        //         <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="characterNameInput">Character Name</label>
        //         <input 
        //             className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
        //             type="text" 
        //             required
        //             onChange={handleSaveCharacterName}
        //             id="characterNameInput"
        //         />
        //     </div>
        //     <div className="w-full md:w-1/3 px-3 mb-6 mt-6 md:mb-0">
        //         <button 
        //             className="block w-full bg-blizzard-btn text-white border border-blizzard-btn rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500" type="text"
        //             onClick={handleCharacterSearch}
        //         >
        //             Search
        //         </button>
        //     </div>
        // </div>
    )   
}
export default HomeSearchForm