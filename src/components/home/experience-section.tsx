export function ExperienceSection() {
    return (
      <section className="py-32 bg-primary text-primary-foreground text-center relative overflow-hidden">
        {/* Background texture or gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-black opacity-50" />
        
        <div className="container relative z-10 px-6 max-w-3xl mx-auto space-y-12">
          <h2 className="text-4xl md:text-5xl font-serif">How to Receive the Transmission</h2>
          
          <p className="text-xl md:text-2xl font-light italic opacity-90">
            "These works are not meant to be consumed quickly. They are meant to be felt."
          </p>
  
          <div className="flex flex-col gap-6 text-lg tracking-wide opacity-80">
             <p>Take a breath.</p>
             <p>Soften your gaze.</p>
             <p>Let the painting meet you.</p>
             <p>Notice what shifts — in your breath, your emotions, your field.</p>
          </div>
  
          <p className="text-2xl font-serif pt-8">
            This is communion. Every communion is different.
          </p>
        </div>
      </section>
    )
  }
