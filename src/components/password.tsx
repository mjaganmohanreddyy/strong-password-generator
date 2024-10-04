'use client';

import { Button } from "./ui/button";
import { Input } from "@/components/ui/input"
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useEffect } from "react";
import { useState, useCallback } from "react";
import { useCopy } from '@/hooks/use-copy';
import { getSecureRandomInt } from '@/helpers/crypto';
import clsx from "clsx";
import {
    FaRegCopy,
    FaCheck,
  } from 'react-icons/fa6'



export default function Password(){
      const { copy, copying } = useCopy();
      const [password, setPassword] = useState('');
      const [length, setLength] = useLocalStorage('pswd-length', 12);
      const [includeUpper, setIncludeUpper] = useLocalStorage(
        'pswd-include-upper',
        true,
      );
      const [includeLower, setIncludeLower] = useLocalStorage(
        'pswd-include-lower',
        true,
      );
      const [includeNumbers, setIncludeNumbers] = useLocalStorage(
        'pswd-include-numbers',
        true,
      );
      const [includeSymbols, setIncludeSymbols] = useLocalStorage(
        'pswd-include-symbols',
        true,
      );
      const [excludeSimilar, setExcludeSimilar] = useLocalStorage(
        'pswd-exclude-similar',
        false,
      );
      const [customSymbols, setCustomSymbols] = useLocalStorage(
        'pswd-custom-symbols',
        '',
      );
      const [excludeSymbols, setExcludeSymbols] = useLocalStorage(
        'pswd-exclude-symbols',
        '',
      );
    
    
      const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
      const NUMBERS = '0123456789';
      const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
      const SIMILAR_CHARACTERS = 'Il1O0';
    
      const generatePassword = useCallback(() => {
          let characterSet = '';
    
          if (includeUpper) characterSet += UPPERCASE;
          if (includeLower) characterSet += LOWERCASE;
          if (includeNumbers) characterSet += NUMBERS;
          if (includeSymbols) characterSet += SYMBOLS;
    
          if (customSymbols) {
            characterSet += customSymbols;
          }
    
          let toExclude = '';
    
          if (excludeSimilar) {
            toExclude += SIMILAR_CHARACTERS;
          }
    
          if (excludeSymbols) {
            toExclude += excludeSymbols;
          }
    
          if (toExclude) {
            const regex = new RegExp(`[${toExclude}]`, 'g');
    
            characterSet = characterSet.replace(regex, '');
          }
    
          if (characterSet.length === 0) {
            setPassword('');
            return;
          }
    
          const passwordCharacters = [];
          const charsetLength = characterSet.length;
    
          for (let i = 0; i < length; i++) {
            const randomIndex = getSecureRandomInt(charsetLength);
            passwordCharacters.push(characterSet[randomIndex]);
          }
    
          const newPassword = passwordCharacters.join('');
          setPassword(newPassword);
         
        
      }, [
        includeUpper,
        includeLower,
        includeNumbers,
        includeSymbols,
        length,
        excludeSimilar,
        customSymbols,
 
        excludeSymbols,
      ]);
    
      useEffect(() => {
        generatePassword();
      }, [ generatePassword]);
    
    
    
    
    
    return(
<>
<div className=" flex min-h-screen flex-col text-[#bdb3b3] items-center justify-center text-center gap-12 p-8">

<div className=" relative  max-w-screen-md  mx-auto rounded-xl flex w-full flex-col items-center text-center space-y-3 p-5 pb-3 sm:px-0 scroll-smooth">

<Input readOnly 
       className=" bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 text-black mx-auto transition cursor-copy border items-center text-center py-2 pr-10" 
       type={ 'text'}
       value={password}
       width={30}
       height={30}
       />
  <button
    className={clsx(
      "absolute inset-y-0 right-3 mx-auto flex  w-8 items-center justify-center rounded-md transition-all  text-center"
    )}
    onClick={() => copy(password)}
  >
    {copying ? <FaCheck /> : <FaRegCopy />}
  </button>
</div>
<Button 
className=" mx-auto flex items-center justify-center rounded-md transition-all  text-center px-4 bg-slate-700 text-white hover:bg-orange-500"
onClick={() => generatePassword()}
>
    Generate new password
</Button>

<div className="  flex justify-between  mt-1 text-2xl min-h-14 items-center  leading-6 font-bold border-solid border-2 border-gray-600  px-2 py-2">
<>
<label htmlFor="lenth" className=" flex  p-0  text-black gap-1 box-border text-base leading-6 font-bold text-center  items-center mx-2 noto-sans">password length :</label>
<input
id="length"
max="100"
min="6"
type="number"
value={length}
className=" style flex  items-center text-center  border rounded-md border-s-orange-300 mx-2 noto-sans text-black"
onChange={e => setLength(Number(e.target.value))}
/>

<input
  max="100"
 min="6"
type="range"
className=" style flex  items-center text-center mx-2 noto-sans"
value={length}
onChange={e => setLength(Number(e.target.value))}
/>
</>


              
</div>
<div className="flex justify-between  text-2xl min-h-14 items-center  leading-6 font-bold">

<label className=' flex items-center text-center noto-sans text-black mx-2'>
  <input
   checked={includeUpper}
  type="checkbox"
   className=" mx-2"
  onChange={e => setIncludeUpper(e.target.checked)}
    />
   Include Uppercase Letters
  </label>
</div>
<div className="flex justify-between  text-2xl min-h-14 items-center  leading-6 font-bold">

<label className=' flex  items-center text-center noto-sans text-black '>
<input
checked={includeLower}
type="checkbox"
 className=" border-r-4 h-5 w-5 mx-2 cursor-pointer"
onChange={e => setIncludeLower(e.target.checked)}
/>
Include Lowercase Letters
</label>
</div>

<div className="flex justify-between text-2xl min-h-14 items-center  leading-6 font-bold  ">

<label className="flex  items-center text-center justify-between gap-1 mx-2 noto-sans text-black" >
                <input
                  checked={includeNumbers}
                  type="checkbox"
                  onChange={e => setIncludeNumbers(e.target.checked)}
                />
                Include Numbers
              </label>

<label className="flex  items-center text-center justify-between gap-1 mx-2 noto-sans text-black" >
<input
  checked={includeSymbols}
                  type="checkbox"
                  onChange={e => setIncludeSymbols(e.target.checked)}
                />
                Include Symbols
              </label>

              <label className="flex  items-center text-center justify-between gap-1 mx-2 noto-sans text-black">
                <input
                  checked={excludeSimilar}
                  type="checkbox"
                  onChange={e => setExcludeSimilar(e.target.checked)}
                />
                Exclude Similar Characters (e.g., l, 1, O, 0)
              </label>
              </div>
              <div className="flex justify-between  text-2xl min-h-14 items-center  leading-6 font-bold">
        
              <label htmlFor="excludeSymbols" className=" flex  items-center text-center justify-between gap-1 mx-1 noto-sans text-black">Exclude Symbols:
                <input
                  id="excludeSymbols"
                  placeholder="e.g., /\?"
                  type="text"
                  className=" border-solid border-2 border-gray-600 focus-visible:text-gray-700 "
                  value={excludeSymbols}
                  onChange={e => setExcludeSymbols(e.target.value)}
                />
              </label>

                <label htmlFor="customSymbols" className=" flex  items-center text-center justify-between gap-1 mx-2 noto-sans text-black">Custom Symbols:</label>
                <input
                  id="customSymbols"
                  placeholder="e.g., @#$%"
                  type="text"
                  className=" border-solid border-2 border-gray-600 "
                  value={customSymbols}
                  onChange={e => setCustomSymbols(e.target.value)}
                />
              </div>
              </div>

</>
    )
}