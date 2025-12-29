'use client'

import { motion } from 'framer-motion'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Textarea } from '@/components/atoms/textarea'
import { submitContactForm } from '@/features/public/contact/actions/contact'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type="submit"
      size="lg"
      className="w-full px-12 py-6 text-xs tracking-widest uppercase md:w-auto"
      disabled={pending}
    >
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  )
}

export default function ContactPage() {
  const [state, action] = useActionState(submitContactForm, undefined)

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
              {state?.success ? (
                <div className="space-y-4 py-12 text-center">
                  <h3 className="font-serif text-2xl text-green-600">
                    Message Sent
                  </h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. We will respond shortly.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                    className="mt-4"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form action={action} className="space-y-8">
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
                        name="name"
                        required
                        placeholder="Your Name"
                        className="bg-background"
                      />
                      {state?.errors?.name && (
                        <p className="text-sm text-red-500">{state.errors.name}</p>
                      )}
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
                        name="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="bg-background"
                      />
                      {state?.errors?.email && (
                        <p className="text-sm text-red-500">{state.errors.email}</p>
                      )}
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
                      name="subject"
                      required
                      placeholder="Inquiry about..."
                      className="bg-background"
                    />
                    {state?.errors?.subject && (
                      <p className="text-sm text-red-500">{state.errors.subject}</p>
                    )}
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
                      name="message"
                      required
                      placeholder="Your message..."
                      className="bg-background min-h-[200px] resize-none"
                    />
                    {state?.errors?.message && (
                      <p className="text-sm text-red-500">{state.errors.message}</p>
                    )}
                  </div>

                  {state?.message && (
                    <p className="text-sm text-red-500">{state.message}</p>
                  )}

                  <SubmitButton />
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
