'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

export default function ContactPage() {
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setStatus('success')
  }

  return (
    <main className="bg-background min-h-screen pt-20">
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16 space-y-6 text-center"
            >
              <h1 className="font-serif text-5xl md:text-7xl">Contact</h1>
              <p className="text-muted-foreground mx-auto max-w-xl text-lg">
                For inquiries about purchasing original works, commissions, or
                exhibitions, please use the form below.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="rounded-sm bg-neutral-50 p-8 shadow-sm md:p-12 dark:bg-neutral-900"
            >
              {status === 'success' ? (
                <div className="space-y-4 py-12 text-center">
                  <h3 className="font-serif text-2xl text-green-600">
                    Message Sent
                  </h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. We will respond shortly.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setStatus('idle')}
                    className="mt-4"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-muted-foreground text-sm tracking-wider uppercase"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        required
                        placeholder="Your Name"
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-muted-foreground text-sm tracking-wider uppercase"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="text-muted-foreground text-sm tracking-wider uppercase"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      required
                      placeholder="Inquiry about..."
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-muted-foreground text-sm tracking-wider uppercase"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Your message..."
                      className="bg-background min-h-[200px] resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full px-12 py-6 text-xs tracking-widest uppercase md:w-auto"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
