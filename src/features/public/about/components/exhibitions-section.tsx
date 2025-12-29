'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'

// Exhibition images from /public/exhibitions/
const exhibitionImages = [
  '/exhibitions/2022-03-03-11.47.19-578x1024.jpg',
  '/exhibitions/2022-03-03-13.29.21-1024x735.jpg',
  '/exhibitions/2022-07-07-12.21.00-723x1024.jpg',
  '/exhibitions/arte-y-paladar-e1646335000781.jpg',
  '/exhibitions/artisttalk-monica-cover-768x1024.jpeg',
  '/exhibitions/artmagazineum-ig-main.jpg',
  '/exhibitions/braincake-barcelona-jpg.jpg',
  '/exhibitions/colectivaarteemergenteiv-726x1024.jpg',
  '/exhibitions/IMG_3223-1024x1024.jpg',
  '/exhibitions/inmobiliaria-encuentro-1-1024x711.jpg',
  '/exhibitions/media-micasa-1-1024x676.jpg',
  '/exhibitions/media4.jpeg',
  '/exhibitions/media5.jpeg',
  '/exhibitions/media6.jpeg',
  '/exhibitions/media7.jpeg',
  '/exhibitions/Monica-Esgueva-exhibition-1-745x1024.jpg',
  '/exhibitions/photo_2022-04-30-10.44.27-907x1024.jpeg',
  '/exhibitions/photo_2022-06-27-19.58.08-794x1024.jpeg',
  '/exhibitions/photo_2022-07-27-19.27.47-1020x1024.jpeg',
  '/exhibitions/Screenshot-2022-07-27-at-19.32.48-1024x529.png',
]

interface Exhibition {
  venue: string
  type?: 'Solo exhibition' | 'Group show' | 'Group show & auction'
  url?: string
}

interface Publication {
  title: string
  url?: string
}

interface YearData {
  year: number
  exhibitions?: Exhibition[]
  publications?: Publication[]
}

const exhibitionsData: YearData[] = [
  {
    year: 2024,
    exhibitions: [
      { venue: 'Museo Marítimo del Cantábrico, Spain' },
    ],
  },
  {
    year: 2023,
    exhibitions: [
      { venue: 'Galeria Alemi, León, Spain', url: 'https://www.facebook.com/people/Galer%C3%ADa-de-Arte-Alemi/100050367109220/?locale=it_IT' },
      { venue: 'China Cultural Center Madrid, Spain', type: 'Group show', url: 'https://ccchinamadrid.org/actividad/ellas-exposicion-de-artistas-contemporaneas-chinas-y-espanolas/' },
      { venue: '100 mujeres 100, Tres Cantos, Madrid', type: 'Group show', url: 'https://360y5.es/events/exposicion-tricantinas-en-el-arte-cien-mujeres-cien/' },
      { venue: 'Art Gallery Inmobiliarias Encuentro, Madrid, Spain', type: 'Solo exhibition', url: 'https://iencuentro.es/evento/monica-esgueva/' },
      { venue: 'Museo de Arte Contemporáneo Mayte Spínola, Jaén, Spain', type: 'Solo exhibition' },
    ],
  },
  {
    year: 2022,
    exhibitions: [
      { venue: '8th Toronto Visionary Art Exhibition, Canada', type: 'Group show', url: 'https://monicaesguevaart.com/news/monica-esgueva-featured-in-the-8th-toronto-visionary-art-exhibition' },
      { venue: 'Art Number 23 Gallery, Athens, Greece', type: 'Group show', url: 'https://monicaesguevaart.com/monica-esgueva-featured-in-art-number23-athens-gallery' },
      { venue: 'Palazzo Ducale Genova, Italy', type: 'Group show', url: 'https://monicaesguevaart.com/monica-esgueva-at-palazzo-ducale-genova-italy-may-2022' },
      { venue: 'Galería Galicca, Santiago de Compostela, Spain', type: 'Group show', url: 'https://pintura.galicca.com/catalogo-de-autores/C/monica-esgueva-62714e4e71c6e/' },
      { venue: 'LibrosArte Gallery "Journey Within" Exhibition, Madrid, Spain', type: 'Mini solo show', url: 'https://monicaesguevaart.com/monica-esgueva-at-librosarte-journey-within-exhibition-april-2022' },
      { venue: 'Southern California Open Regional Exhibitions, USA', type: 'Group show', url: 'https://sfvacc.org/call-of-the-wild-2022' },
      { venue: 'LibrosArte Gallery Charity Exhibition, Madrid, Spain', type: 'Group show', url: 'https://monicaesguevaart.com/monica-esgueva-at-librosarte-charity-exhibition-april-2022' },
      { venue: 'Colors of Humanity Gallery, Pennsylvania, USA', type: 'Group show', url: 'https://www.smugmug.com/gallery/n-bFnzZk/' },
      { venue: 'Contemporary Art Gallery, Delaware, USA', type: 'Group show', url: 'https://www.smugmug.com/gallery/n-HngJJ2' },
      { venue: 'BRAIN CAKE at Gaudi Room Casa Mila "La Pedrera", Barcelona, Spain', type: 'Group show', url: 'https://www.madsgallery.art/item/e654cbc5-3b4f-4ea8-bdd1-b2c35a8a2897/event/brain-cake' },
      { venue: 'La Laguna Art Gallery, California', type: 'Group show' },
      { venue: 'M.A.D.S. Gallery, Milan, Italy', type: 'Group show', url: 'https://www.madsgallery.art/item/09ddf957-01ed-4424-ada7-6d62b3812e46/artist/monica-esgueva' },
      { venue: 'Arte & Paladar, Madrid, Spain', type: 'Solo Exhibition', url: 'https://www.mundoarti.com/magazine/noticia/monica-esgueva-en-arte-paladar-madrid/' },
      { venue: 'XI Exposición Internacional Museo Virtual Mundoarti', type: 'Group show' },
      { venue: 'Mombó Art Gallery. Seville, Spain.', type: 'Group show' },
    ],
    publications: [
      { title: 'Imagine Magazine Vol. 2, 5/22. USA', url: 'https://monicaesguevaart.com/monica-esgueva-featured-on-imagine-vol-2-5-22' },
      { title: 'Cover on Artist Talk Magazine & 6 plus page interview. Issue #21. UK', url: 'https://monicaesguevaart.com/news/monica-esgueva-featured-on-the-cover-of-artist-talk-magazine-issue-21' },
      { title: 'Cover on Hello ICON Magazine, issue 12 dedicated to Art & Spirituality, USA', url: 'https://monicaesguevaart.com/monica-featured-on-hello-icon-issue-12-dedicated-to-art-spirituality' },
      { title: 'Forget Me Not Press, Issue #3 "Nothing Gold Can Stay", USA', url: 'https://www.forgetmenotpress.net/issue-3' },
      { title: 'ArterNet Art on the "World Famous Artists", New Zealand', url: 'https://monicaesguevaart.com/monica-esgueva-is-the-featured-artist-on-world-famous-on-arternet-art' },
      { title: 'International Magazine COLLECT ART spring issue #04, Europe', url: 'https://monicaesguevaart.com/monica-esgueva-featured-at-collect-art-spring-issue-2022' },
      { title: 'ARTMAGAZINEUM Magazine, issue #15, Europe', url: 'https://monicaesguevaart.com/monica-esgueva-featured-in-artmagazineium-issue-15-may-2022' },
      { title: 'The Bagel Hole, Literary & Art Journal issue #6, USA', url: 'https://monicaesguevaart.com/the-purposeful-mayonnaise-monica-esgueva-artist-interview' },
      { title: 'Artist Talk Magazine issue #19, UK', url: 'https://monicaesguevaart.com/artist-talk-magazine-why-visionary-art-is-important-for-this-world-by-monica-esgueva' },
      { title: 'Trendy Art Ideas stage Gallery, USA', url: 'https://monicaesguevaart.com/trendy-art-ideas-oceans-as-a-way-to-freedom%ef%bf%bc-exclusive-interview-with-visionary-artist-monica-esgueva' },
      { title: 'Gritty Vibes exclusive interview. USA', url: 'https://monicaesguevaart.com/news/gritty-vibes-the-worldly-artist-speaks-her-truth-exclusive-interview-with-visionary-artist-monica-esgueva' },
    ],
  },
  {
    year: 2019,
    exhibitions: [
      { venue: 'Thyssen-Bornemisza Nacional Museum.', type: 'Group show & auction', url: 'https://www.euromundoglobal.com/noticia/421050/cultura/-subastas-de-venus-de-smylife-colecction-beauty-art-en-el-museo-thyssen-bornemisza.html' },
      { venue: 'Asociación Cultural La Guajira, Almería, Spain.', type: 'Solo exhibition', url: 'https://ocioalmeria.es/event-pro/exposicion-a-favor-de-asoc-indakana-con-obra-de-monica-esgueva/' },
      { venue: 'Aeropuerto de Almería, Spain.', type: 'Solo exhibition', url: 'https://www.teleprensa.com/articulo/cultura/el-aeropuerto-de-almeria-acoge-en-el-vestibulo-de-salidas-una-exposicion-de-pintura-de-la-asociacion-indakana/20190429144011188647.html' },
    ],
  },
  {
    year: 2006,
    exhibitions: [
      { venue: 'Santa Cruz Monastery, Segovia, Spain.', type: 'Solo exhibition' },
    ],
  },
  {
    year: 2005,
    exhibitions: [
      { venue: 'Galería Maes, Madrid, Spain.', type: 'Solo exhibition' },
      { venue: 'Museo Casa Orduña, Alicante, Spain.', type: 'Solo exhibition' },
      { venue: 'Artacasa Gallery, Amsterdam, Holland.', type: 'Group show' },
      { venue: 'Ingo Fincke Gallery, London, Great Britain.', type: 'Group show' },
    ],
  },
  {
    year: 2004,
    exhibitions: [
      { venue: 'Autumn Salon, Fontainebleau, France.', type: 'Group show' },
      { venue: 'Karen Taylor Gallery, London, Great Britain.', type: 'Group show' },
      { venue: 'Galería Ansorena, Madrid, Spain.', type: 'Solo exhibition' },
      { venue: 'Galería Gaudí, Madrid, Spain.', type: 'Solo exhibition' },
      { venue: 'Salon Bois le Roi, France.', type: 'Group show' },
      { venue: 'Salon Samois sur Seine, France.', type: 'Group show' },
    ],
  },
  {
    year: 2003,
    exhibitions: [
      { venue: "Galerie Art' et Miss, Paris, France.", type: 'Group show' },
      { venue: 'Hewlett-Packard Foundation, Paris, France.', type: 'Solo exhibition' },
      { venue: 'Salon Bourron-Marlotte, France.', type: 'Group show' },
      { venue: 'Autumn Salon Fontainebleau, France.', type: 'Group show' },
      { venue: "Salon d'été Moret-sur-Loing, France.", type: 'Group show' },
      { venue: 'Salon Samois sur Seine, France.', type: 'Group show' },
      { venue: 'Salon Bois le Roi, France.', type: 'Group show' },
      { venue: 'XIII Salon de Grand format Beaux Arts SNHF, Paris, France.', type: 'Group show' },
    ],
  },
  {
    year: 2002,
    exhibitions: [
      { venue: 'Puna Contemporary Art, Hawaii, USA.', type: 'Group show' },
      { venue: "Salon d'art Nature et Animaux, Paris, France.", type: 'Group show' },
      { venue: 'Galería María Oliver, Madrid, Spain.', type: 'Group show' },
    ],
  },
  {
    year: 2001,
    exhibitions: [
      { venue: 'Galerie Hérouet, Paris, France.', type: 'Solo exhibition' },
      { venue: 'Galerie Art Présent, Paris, France.', type: 'Solo exhibition' },
      { venue: 'Salon Fleurs petit format Beaux Arts SNHF, Paris, France.', type: 'Group show' },
    ],
  },
  {
    year: 2000,
    exhibitions: [
      { venue: 'Galerie Thuillier, Paris, France.', type: 'Group show' },
    ],
  },
  {
    year: 1999,
    exhibitions: [
      { venue: 'Galería Café de Otoño, Madrid, Spain.', type: 'Solo exhibition' },
    ],
  },
  {
    year: 1997,
    exhibitions: [
      { venue: 'Centro Cultural La Vaguada. Madrid, Spain.', type: 'Solo exhibition' },
      { venue: 'Women in Arts. San José, Costa Rica.', type: 'Group show' },
    ],
  },
]

export function ExhibitionsSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageClick = (src: string) => {
    setSelectedImage(src)
  }

  const handleClose = () => {
    setSelectedImage(null)
  }

  // Close on ESC key and prevent body scroll when modal is open
  useEffect(() => {
    if (!selectedImage) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  return (
    <section className="bg-background py-12 md:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="font-serif text-4xl md:text-5xl">Exhibitions & Publications</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Mosaic Gallery - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div 
              className="gap-2 sm:gap-3"
              style={{
                columnCount: 2,
                columnGap: '0.75rem',
              }}
            >
              {exhibitionImages.map((src, index) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.03 }}
                  className="relative w-full mb-2 sm:mb-3 break-inside-avoid overflow-hidden rounded-sm cursor-pointer"
                  onClick={() => handleImageClick(src)}
                >
                  <div className="relative w-full">
                    <Image
                      src={src}
                      alt={`Exhibition ${index + 1}`}
                      width={600}
                      height={900}
                      className="w-full h-auto transition-transform hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 50vw"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Exhibitions & Publications List - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            {exhibitionsData.map((yearData) => (
              <div key={yearData.year} className="space-y-4">
                <h3 className="font-serif text-2xl md:text-3xl text-foreground">
                  {yearData.year}
                </h3>

                {yearData.exhibitions && yearData.exhibitions.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
                      Exhibitions
                    </h4>
                    <ul className="text-muted-foreground space-y-2 text-base leading-relaxed">
                      {yearData.exhibitions.map((exhibition, idx) => (
                        <li key={idx} className="flex flex-col">
                          {exhibition.url ? (
                            <Link
                              href={exhibition.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
                            >
                              {exhibition.venue}
                            </Link>
                          ) : (
                            <span>{exhibition.venue}</span>
                          )}
                          {exhibition.type && (
                            <span className="text-muted-foreground/70 text-sm italic">
                              ({exhibition.type})
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {yearData.publications && yearData.publications.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
                      Publications
                    </h4>
                    <ul className="text-muted-foreground space-y-2 text-base leading-relaxed">
                      {yearData.publications.map((publication, idx) => (
                        <li key={idx}>
                          {publication.url ? (
                            <Link
                              href={publication.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
                            >
                              {publication.title}
                            </Link>
                          ) : (
                            publication.title
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Image Lightbox Dialog */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute -top-12 right-0 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="relative h-full w-full">
                <Image
                  src={selectedImage}
                  alt="Exhibition image"
                  width={1920}
                  height={1080}
                  className="max-h-[90vh] max-w-[90vw] object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

