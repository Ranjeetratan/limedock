export default function Hero() {
  return (
    <section className="relative flex flex-col items-center pt-36 pb-20 w-full bg-background overflow-hidden">
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 text-center">
        <h1 className="text-4xl md:text-[86px] font-extrabold tracking-tight text-foreground leading-none mb-8 max-w-5xl mx-auto" style={{ fontFamily: "'Mona Sans', sans-serif" }}>
          <span 
            className="relative inline px-1"
            style={{
              backgroundImage: 'linear-gradient(var(--highlight), var(--highlight))',
              backgroundSize: '100% 35%',
              backgroundPosition: '0 88%',
              backgroundRepeat: 'no-repeat',
              WebkitBoxDecorationBreak: 'clone',
              boxDecorationBreak: 'clone'
            }}
          >
            We build, launch & scale
          </span>
          <br />
          digital products
        </h1>
        
        <p 
          className="text-xl md:text-[24px] font-medium leading-tight tracking-normal text-foreground/80 max-w-3xl mx-auto mb-12 text-center"
          style={{ fontFamily: "'Mona Sans', sans-serif" }}
        >
          A modern tech agency helping teams design, develop, and grow
          digital products — end to end or alongside in-house teams.
        </p>

        <div className="flex flex-col items-center gap-6">
          <button className="flex items-center gap-3 group cursor-pointer mt-4">
            <span className="text-[14px] font-bold tracking-widest text-black uppercase">
              BOOK AN INTRO CALL
            </span>
            <div className="flex -space-x-6 group-hover:-space-x-2 transition-all duration-500 ease-out items-center">
               <div className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-gray-200 relative z-10 transition-all duration-500">
                  <img src="/ranjeet-profile-pic.jpeg" alt="Ranjeet" className="w-full h-full object-cover" />
               </div>
               <div className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-gray-200 relative z-20 transition-all duration-500">
                  <img src="/dipit-profile-pic.jpeg" alt="Dipit" className="w-full h-full object-cover" />
               </div>
               <div className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-gray-200 relative z-30 transition-all duration-500">
                  <img src="/aman-profile-pic.jpeg" alt="Aman" className="w-full h-full object-cover" />
               </div>
               <div className="w-8 h-8 rounded-full border-2 border-background bg-black flex items-center justify-center relative z-40 transition-all duration-500">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.26-.26.35-.63.24-1.01a17.93 17.93 0 0 1-.56-3.53c-.05-.53-.5-.94-1.04-.94H4.51c-.55 0-1.02.44-1.03.99C3.59 13.9 10.1 20.41 19.01 20.41c.55-.01.99-.48.99-1.03v-3.41c0-.54-.41-.99-.94-1.04z"/>
                  </svg>
               </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}