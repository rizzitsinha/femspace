export default function Home() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8EAF6] via-[#D1C4E9] to-[#B39DDB]">
          <section className="hero relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
              <div className="relative z-10">
                  <h1 className="text-5xl md:text-8xl font-bold mb-6 font-montserrat">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7E57C2] to-[#2196F3] drop-shadow-2xl">
                          FemSpace
                      </span>
                  </h1>
                  <p className="text-xl md:text-3xl text-gray-800 font-medium mb-8 max-w-2xl mx-auto tracking-wide">
                      Your Safe Space, Anytime, Anywhere
                  </p>
              </div>
              
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-20">
                  {[...Array(20)].map((_, i) => (
                      <div key={i} className="absolute w-4 h-4 bg-purple-300 rounded-full animate-float"
                           style={{
                               left: `${Math.random() * 100}%`,
                               top: `${Math.random() * 100}%`,
                               animationDelay: `${i * 0.5}s`
                           }}>
                      </div>
                  ))}
              </div>
          </section>

          <section id="about" className="section py-24 bg-white/95 backdrop-blur-lg">
              <div className="max-w-6xl mx-auto px-4">
                  <div className="bg-white rounded-2xl p-8 shadow-2xl transform hover:scale-[1.01] transition-transform duration-300">
                      <h2 className="text-4xl font-bold text-[#7E57C2] mb-8 text-center">About Us</h2>
                      <p className="text-xl text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
                          We aim to provide safe and clean washroom facilities for women across the city, 
                          combining modern technology with compassionate design to create truly welcoming spaces.
                      </p>
                  </div>
              </div>
          </section>

          <section id="contact" className="section py-24 bg-gradient-to-r from-[#EDE7F6] to-[#E3F2FD]">
              <div className="max-w-4xl mx-auto px-4">
                  <div className="text-center space-y-6">
                      <h2 className="text-4xl font-bold text-[#7E57C2] mb-8">Contact</h2>
                      <div className="inline-flex flex-col items-center">
                          <p className="text-lg text-gray-700 mb-4 font-medium">
                              Have questions? Let's connect
                          </p>
                          <a href="mailto:contact@femspace.com" 
                             className="text-xl font-semibold px-8 py-3 rounded-full bg-[#7E57C2] text-white hover:bg-[#673AB7] transition-all duration-300 shadow-lg hover:shadow-xl">
                              contact@femspace.com
                          </a>
                      </div>
                  </div>
              </div>
          </section>
      </div>
  );
}