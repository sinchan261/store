import { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [activeLink, setActiveLink] = useState(null);
  const [bar,setbar]=useState(true)
 const navLinks = [
    { id: 'home', label: '_home' },
    { id: 'about', label: '_about' },
    { id: 'portfolio', label: '_portfolio' },
    { id: 'services', label: '_services' },
    { id: 'resume', label: '_resume' },
    { id: 'contact', label: '_contact' },
  ];

  const baseColor = 'rgb(230, 219, 116)';
  const hoverColor = 'rgb(154,153,255)';
  const activeColor = 'rgb(47, 203, 239)';

  const handleClick = (id) => {
    setActiveLink(id);
  };
  return (
    <div style={{ fontFamily: 'VT323',backgroundColor:'#150E1F'}} className="min-h-screen  text-white font-vt323">
      <nav className="flex justify-between items-start p-6 w-[100%]">
        {/* Left side */}



        {/* left side navigation */}
 <div className="flex flex-col w-[30%] ">
          <p
            className=" font-normal sm:text-sm md:text-2xl"
            style={{
              color: 'white',
              transition: '0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.color = hoverColor)}
            onMouseLeave={(e) => (e.target.style.color = 'white')}
          >
            // saikat sinchan ghosh
          </p>
          <p className=" font-normal sm:text-sm md:text-2xl xs:text-sm">// Backend_Developer</p>
        </div>

        {/* Right side navigation */}
<div  className="w-[70%] flex">

        <div className="hidden xs:hidden md:flex  w-[100%] text-2xl justify-between  ">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => handleClick(link.id)}
              style={{
                color: activeLink === link.id ? activeColor : baseColor,
                transition: '0.3s',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                if (activeLink !== link.id) {
                  e.target.style.color = hoverColor;
                }
              }}
              onMouseLeave={(e) => {
                if (activeLink !== link.id) {
                  e.target.style.color = baseColor;
                }
              }}
            >
              {link.label}
            </a>
          ))}
</div>
<div className="  xs:flex md:hidden  relative w-[100%]  transition-all duration-300 ease-in-out transform ">
  <div>
       {bar===true?<FontAwesomeIcon className=" border px-10 py-5 border-dashed absolute right-0 cursor-pointer"onClick={()=>setbar(false)}icon={faBars} style={{ color: "rgb(47, 203, 239)",fontSize:'23px' }} />:<FontAwesomeIcon className=" border px-10 py-5 border-dashed absolute right-0 cursor-pointer " icon={faXmark} onClick={()=>setbar(true)}style={{ color: "rgb(47, 203, 239)", fontSize:'26px'}} />
}
  </div>


</div>



        </div>


<div>

</div>

      </nav>
      {!bar&&
<div className="flex flex-col absolute  top-25 w-[100%] md:hidden text-2xl">
 
            {navLinks.map((link) => (
            <a className={`bottom-0 border-dashed    border-y border-white py-5 ` }
              key={link.id}
              href={`#${link.id}`}
              onClick={() => handleClick(link.id)}
              style={{
                color: activeLink === link.id ? activeColor : baseColor,
                   backgroundColor: activeLink === link.id ? 'rgba(255, 255, 255, 0.3)' : '#150E1F',
                   boxShadow: activeLink === link.id ?'0 0 10px rgba(255, 255, 255, 0.2)':"",
                   backdropFilter:activeLink === link.id ?'blur(2px)':"",
                transition: '0.3s',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                if (activeLink !== link.id) {
                  e.target.style.color = hoverColor;
                   e.target.style.backgroundColor='#150E1F'
                }
              }}
              onMouseLeave={(e) => {
                if (activeLink !== link.id) {
                  e.target.style.color = baseColor;
                }
              }}
            >
              {link.label}
            </a>
          ))}
  </div>

}
    </div>
  );
}

export default App;

// <div style={{ fontFamily: 'VT323'}}>